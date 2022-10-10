"use strict";
class SaveController {
    constructor() {
        this.saveSlots = this.getSaves({ update: true });
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
            });
        }
        return saves;
    }
    saveGame(name, id, file) {
        // @ts-ignore
        const saveFile = file ? new SaveFile(file) : new SaveFile({ id, name });
        if (JSON.stringify(saveFile).length > 100000) {
            alert("Save file is too large. How did you do this?!!.");
            return;
        }
        const index = this.saveSlots.findIndex((save) => save.id === id);
        if (index !== -1) {
            this.saveSlots[index] = saveFile;
        }
        else {
            this.saveSlots.push(saveFile);
        }
        localStorage.setItem("PohjolaIII_saved_games", JSON.stringify(this.saveSlots));
        closeConfirmationWindow();
        createSaves();
    }
    saveOver(id) {
        const save = this.saveSlots.find((save) => save.id === id);
        if (save) {
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
                closeConfirmationWindow();
                const { player: loadedPlayer, stats: loadedStats, challenges: loadedChallenges } = save.saveData;
                Object.assign(player, new Player(loadedPlayer));
                Object.assign(stats, new Statistics(loadedStats));
                Object.assign(challenges, new Challenges(loadedChallenges));
                player.restoreClasses();
                sideBarDetails();
                createInventory();
            }
        }
    }
    deleteSave(id) {
        const save = this.saveSlots.find((save) => save.id === id);
        if (save) {
            const text = `<c>white<c>${game.getLocalizedString("delete")} <c>goldenrod<c>${save.name}<c>white<c>?`;
            confirmationWindow(text, () => {
                this.saveSlots = this.saveSlots.filter((save) => save.id !== id);
                localStorage.setItem("PohjolaIII_saved_games", JSON.stringify(this.saveSlots));
                closeConfirmationWindow();
                createSaves();
            });
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
                };
                reader.readAsText(file);
            }
        };
        fileInput.click();
    }
}
class SaveFile {
    constructor(saveFile) {
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
        this.version = "1";
        this.saveData = new SaveData();
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
    constructor() {
        this.player = this.stripPlayer();
        this.stats = stats;
        this.challenges = challenges;
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
    sideBarDetails();
    const saveScreen = document.createElement("div");
    saveScreen.classList.add("saves");
    saveScreen.innerHTML = `
    <div class="save-header">
      <input type="text" id="save-name" onKeyUp="saveName = this.value" placeholder="${game.getLocalizedString("save_name")}">
      <button class="save-button" onClick="saveController.saveGame(saveName)">${game.getLocalizedString("save")}</button>
      <button class="save-button" onClick="saveController.saveToFile()">${game.getLocalizedString("save_to_file")}</button>
      <button class="save-button" onClick="saveController.loadFromFile()">${game.getLocalizedString("load_from_file")}</button>
    </div>
  `;
    saveController.saveSlots.forEach((save) => {
        const progress = calculateProgress(save.saveData.player);
        const size = JSON.stringify(save).length;
        const saveSlot = document.createElement("div");
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
        <div class="ver">${game.getLocalizedString("version")}: ${save.version}</div>
      </div>
      <div class="save-buttons">
        <button class="save-over" onclick="saveController.saveOver('${save.id}')">Save</button>
        <button class="load-save" onclick="saveController.loadSave('${save.id}', { confirm: true })">Load</button>
        <button class="delete-save" onclick="saveController.deleteSave('${save.id}')">Delete</button>
      </div>
    `;
        saveScreen.appendChild(saveSlot);
    });
    lobbyContent.append(saveScreen);
}
//# sourceMappingURL=save.js.map