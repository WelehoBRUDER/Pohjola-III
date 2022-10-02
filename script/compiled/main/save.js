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
    saveGame(name, id) {
        // @ts-ignore
        const saveFile = new SaveFile({ id, name });
        console.log(JSON.stringify(saveFile).length);
        if (JSON.stringify(saveFile).length > 100000) {
            alert("Save file is too large. Please remove some items from your inventory.");
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
        stripped.equipment = Object.values(stripped.equipment).map((item) => item
            ? {
                id: item.id,
                type: item.type,
                amount: item.amount,
            }
            : null);
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
    console.log(saveController.saveSlots);
    saveController.saveSlots.forEach((save) => {
        const saveSlot = document.createElement("div");
        saveSlot.classList.add("save-slot");
        saveSlot.innerHTML = `
      <div class="save-slot-name">${save.name}</div>
      <div class="save-slot-date">${save.lastSaved.toDateString()}</div>
      <div class="save-slot-time">${save.lastSaved.toLocaleTimeString()}</div>
      <div class="save-slot-created">${save.created.toDateString()}</div>
      <div class="save-slot-created-time">${save.created.toLocaleTimeString()}</div>
      <div class="save-slot-delete" onclick="deleteSave('${save.id}')">Delete</div>
      <div class="save-slot-load" onclick="loadSave('${save.id}')">Load</div>
    `;
        saveScreen.appendChild(saveSlot);
    });
    lobbyContent.append(saveScreen);
}
//# sourceMappingURL=save.js.map