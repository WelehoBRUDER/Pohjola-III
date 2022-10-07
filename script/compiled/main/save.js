"use strict";
class SaveController {
    constructor() {
        this.saveSlots = this.getSaves({ update: true });
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
                const { player: loadedPlayer, stats: loadedStats } = save.saveData;
                Object.assign(player, new Player(loadedPlayer));
                Object.assign(stats, new Statistics(loadedStats));
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
        return stripped;
    }
}
const saveController = new SaveController();
function createSaves() {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    const saveScreen = document.createElement("div");
    saveScreen.classList.add("saves");
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