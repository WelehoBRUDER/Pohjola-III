"use strict";
class SaveController {
    saveSlots;
    currentSave;
    constructor() {
        this.saveSlots = this.getSaves({ update: true });
        this.currentSave = "";
    }
    sortSaves() {
        this.saveSlots.sort((a, b) => b.lastSaved.getTime() - a.lastSaved.getTime());
    }
    getSaves(options) {
        const saves = JSON.parse(localStorage.getItem("PohjolaIII_saved_games") || "[]");
        if (options?.update) {
            saves.map((save) => {
                save.lastSaved = new Date(save.lastSaved);
                save.created = new Date(save.created);
                if (save.version === "1") {
                    save.version = (0.09).toFixed(2);
                }
            });
        }
        return saves;
    }
    saveGame(name, id, file, options) {
        // @ts-ignore
        const saveFile = file ? new SaveFile(file) : new SaveFile({ id, name });
        this.currentSave = saveFile.id;
        if (JSON.stringify(saveFile).length > 100000) {
            alert("Save file is too large. How did you do this?!!.");
            return;
        }
        const index = this.saveSlots.findIndex((save) => save.id === id);
        saveFile.version = gameVersion;
        console.log(file, saveFile);
        if (index !== -1) {
            this.saveSlots[index] = saveFile;
        }
        else {
            this.saveSlots.push(saveFile);
        }
        localStorage.setItem("PohjolaIII_saved_games", JSON.stringify(this.saveSlots));
        if (!options?.auto) {
            closeConfirmationWindow();
            createSaves();
        }
    }
    saveOver(id, options) {
        const save = this.saveSlots.find((save) => save.id === id);
        if (save) {
            if (options?.auto) {
                return this.saveGame(save.name, id, save, { auto: true });
            }
            const text = `<c>white<c>${game.getLocalizedString("save_over")} <c>goldenrod<c>${save.name}<c>white<c>?`;
            confirmationWindow(text, () => this.saveGame(save.name, id, save));
        }
    }
    loadSave(id, options) {
        const save = this.saveSlots.find((save) => save.id === id);
        if (save) {
            if (options?.confirm) {
                const text = `<c>white<c>${game.getLocalizedString("load")} <c>goldenrod<c>${save.name}<c>white<c>?`;
                confirmationWindow(text, () => this.loadSave(id));
            }
            else {
                try {
                    console.log("loaded save:", save);
                    closeConfirmationWindow();
                    mainMenuElement.classList.add("no-display");
                    lobbyScreen.classList.remove("no-display");
                    const { player: loadedPlayer, stats: loadedStats, challenges: loadedChallenges } = save.saveData;
                    player = new Player({ ...loadedPlayer });
                    Object.assign(stats, new Statistics({ ...loadedStats }));
                    Object.assign(challenges, new Challenges({ ...loadedChallenges }));
                    player.restoreClasses();
                    this.currentSave = id;
                    lobby.current_view = "char";
                    createLobby();
                    createCharView();
                    sideBarDetails();
                    log.createNotification(`Loaded save file: ${save.name}`, -1);
                    log.write(`<c>white<c>Loaded save file: <c>goldenrod<c>${save.name}`);
                }
                catch (err) {
                    log.createNotification("Could not load save file.", -1);
                    log.write(`<c>red<c>Error loading save file: ${err}`);
                    console.error(err);
                }
            }
        }
    }
    deleteSave(id, options) {
        const save = this.saveSlots.find((save) => save.id === id);
        if (save) {
            if (options?.force) {
                this.saveSlots = this.saveSlots.filter((save) => save.id !== id);
                localStorage.setItem("PohjolaIII_saved_games", JSON.stringify(this.saveSlots));
            }
            else {
                const text = `<c>white<c>${game.getLocalizedString("delete")} <c>goldenrod<c>${save.name}<c>white<c>?`;
                confirmationWindow(text, () => {
                    this.saveSlots = this.saveSlots.filter((save) => save.id !== id);
                    localStorage.setItem("PohjolaIII_saved_games", JSON.stringify(this.saveSlots));
                    closeConfirmationWindow();
                    createSaves();
                });
            }
        }
    }
    saveToFile() {
        // @ts-ignore
        const save = JSON.stringify(new SaveFile({ name: saveName }));
        const blob = new Blob([save], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `PohjolaIII_${saveName}_save_${new Date().toLocaleTimeString()}.txt`;
        link.click();
    }
    loadFromFile() {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".txt";
        fileInput.onchange = () => {
            const file = fileInput.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const save = JSON.parse(reader.result);
                    this.saveGame(save.name, save.id, save);
                    this.loadSave(save.id, { confirm: false });
                };
                reader.readAsText(file);
            }
        };
        fileInput.click();
    }
}
class SaveFile {
    name;
    version;
    saveData;
    lastSaved;
    created;
    constructor(saveFile) {
        console.log("saveFile:", saveFile);
        if (saveFile?.id) {
            this.id = saveFile.id;
        }
        else {
            let id = this.createID();
            while (saveController.saveSlots.find((save) => save.id === id)) {
                id = this.createID();
            }
            this.id = id;
        }
        this.name = saveFile.name || "New Game";
        this.version = saveFile.version ?? gameVersion;
        this.saveData = saveFile ? new SaveData(saveFile.saveData) : new SaveData();
        this.lastSaved = new Date();
        if (!saveFile.created) {
            this.created = new Date();
        }
        else {
            this.created = new Date(saveFile.created);
        }
    }
    createID() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
class SaveData {
    player;
    stats;
    challenges;
    constructor(file) {
        this.player = file ? file.player : this.stripPlayer();
        this.stats = file ? file.stats : stats;
        this.challenges = file ? file.challenges : challenges;
    }
    stripPlayer() {
        const stripped = JSON.parse(JSON.stringify(player));
        stripped.inventory = stripped.inventory.map((item) => ({
            id: item.id,
            type: item.type,
            amount: item.amount,
        }));
        stripped.equipment = {};
        Object.entries(player.equipment).map(([slot, item]) => item
            ? (stripped.equipment[slot] = {
                id: item.id,
                type: item.type,
                amount: item.amount,
            })
            : (stripped.equipment[slot] = null));
        stripped.abilities = stripped.abilities.map((ability) => ({
            id: ability.id,
        }));
        stripped.abilities_total = stripped.abilities_total.map((ability) => ({
            id: ability.id,
        }));
        stripped.skills = stripped.skills.map((skill) => ({
            id: skill.id,
            currentLevel: skill.currentLevel,
            isOwned: true,
        }));
        return stripped;
    }
}
const saveController = new SaveController();
let saveName = "";
function createSaves() {
    saveName = "";
    saveController.sortSaves();
    lobbyContent.innerHTML = "";
    hideHover();
    lobbyContent.append(saveScreen());
}
function saveScreen(menu = false) {
    const saveScreen = document.createElement("div");
    saveScreen.classList.add("saves");
    const hardcore = challenge("hardcore");
    if (menu) {
        saveScreen.innerHTML = `
    <div class="save-header">
      <button class="save-button" onClick="saveController.loadFromFile()">${game.getLocalizedString("load_from_file")}</button>
      <button class="save-button" onClick="mainMenu()">${game.getLocalizedString("back_to_menu")}</button>
    </div>
    `;
    }
    else {
        saveScreen.innerHTML = `
      <div class="save-header">
        <input type="text" id="save-name" onKeyUp="saveName = this.value" class="${hardcore && "disabled"}" placeholder="${game.getLocalizedString("save_name")}">
        <button class="save-button ${hardcore && "disabled"}" onClick="saveController.saveGame(saveName)">${game.getLocalizedString("save")}</button>
        <button class="save-button ${hardcore && "disabled"}" onClick="saveController.saveToFile()">${game.getLocalizedString("save_to_file")}</button>
        <button class="save-button" onClick="saveController.loadFromFile()">${game.getLocalizedString("load_from_file")}</button>
      </div>
    `;
    }
    saveController.saveSlots.forEach((save) => {
        const progress = calculateProgress(save.saveData.player);
        const size = JSON.stringify(save).length;
        const saveSlot = document.createElement("div");
        const hardcoreSave = save.saveData?.challenges?.hardcore;
        saveSlot.classList.add("save-slot");
        saveSlot.innerHTML = `
    <div class="save-data">
      <div class="slot-name">${save.name}</div>
      <div class="line">|</div>
      <div class="last-saved">${game.getLocalizedString("last_saved")}: ${save.lastSaved.toLocaleDateString("fi-FI")} @ ${save.lastSaved.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit",
        })}</div>
    <div class="line">|</div>
        <div class="game-progress">${game.getLocalizedString("progress")}: ${progress}%</div>
        <div class="line">|</div>
        <div class="player-level">${game.getLocalizedString("player_level")}: ${save.saveData.player.level}</div>
        <div class="line">|</div>
        <div class="created-at">${game.getLocalizedString("created_at")}: ${save.created.toLocaleDateString("fi-FI")} @ ${save.created.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit",
        })}</div>
    <div class="line">|</div>
        <div class="size">${(size / 1000).toFixed(2)} kb</div>
        <div class="line">|</div>
        <div class="ver">${game.getLocalizedString("version")}: ${gameVersionText(save.version)}</div>

        ${DEVTOOLS.ENABLED
            ? `
        <div class="line">|</div>
        <div class="id">${game.getLocalizedString("id")}: ${save.id}</div>
        `
            : ""}
      </div>
      <div class="save-specials">
        ${(hardcoreSave && `<p class="hardcore">${game.getLocalizedString("hardcore_emphasis")}</p>`) || ""}
      </div>
      <div class="save-buttons">
        ${!menu
            ? `<button class="save-over ${hardcore && "disabled"}" onclick="saveController.saveOver('${save.id}')">${game.getLocalizedString("save")}</button>`
            : ""}
        <button class="load-save" onclick="saveController.loadSave('${save.id}', { confirm: true })">${game.getLocalizedString("load")}</button>
        <button class="delete-save" onclick="saveController.deleteSave('${save.id}')">${game.getLocalizedString("delete")}</button>
      </div>
    `;
        saveScreen.appendChild(saveSlot);
    });
    return saveScreen;
}
//# sourceMappingURL=save.js.map