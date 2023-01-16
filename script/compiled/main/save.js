"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var SaveController = /** @class */ (function () {
    function SaveController() {
        this.saveSlots = this.getSaves({ update: true });
    }
    SaveController.prototype.sortSaves = function () {
        this.saveSlots.sort(function (a, b) { return b.lastSaved.getTime() - a.lastSaved.getTime(); });
    };
    SaveController.prototype.getSaves = function (options) {
        var saves = JSON.parse(localStorage.getItem("PohjolaIII_saved_games") || "[]");
        if (options === null || options === void 0 ? void 0 : options.update) {
            saves.map(function (save) {
                save.lastSaved = new Date(save.lastSaved);
                save.created = new Date(save.created);
            });
        }
        return saves;
    };
    SaveController.prototype.saveGame = function (name, id, file) {
        // @ts-ignore
        var saveFile = file ? new SaveFile(file) : new SaveFile({ id: id, name: name });
        if (JSON.stringify(saveFile).length > 100000) {
            alert("Save file is too large. How did you do this?!!.");
            return;
        }
        var index = this.saveSlots.findIndex(function (save) { return save.id === id; });
        if (index !== -1) {
            this.saveSlots[index] = saveFile;
        }
        else {
            this.saveSlots.push(saveFile);
        }
        localStorage.setItem("PohjolaIII_saved_games", JSON.stringify(this.saveSlots));
        closeConfirmationWindow();
        createSaves();
    };
    SaveController.prototype.saveOver = function (id) {
        var _this = this;
        var save = this.saveSlots.find(function (save) { return save.id === id; });
        if (save) {
            var text = "<c>white<c>" + game.getLocalizedString("save_over") + " <c>goldenrod<c>" + save.name + "<c>white<c>?";
            confirmationWindow(text, function () { return _this.saveGame(save.name, id, save); });
        }
    };
    SaveController.prototype.loadSave = function (id, options) {
        var _this = this;
        var save = this.saveSlots.find(function (save) { return save.id === id; });
        if (save) {
            if (options === null || options === void 0 ? void 0 : options.confirm) {
                var text = "<c>white<c>" + game.getLocalizedString("load") + " <c>goldenrod<c>" + save.name + "<c>white<c>?";
                confirmationWindow(text, function () { return _this.loadSave(id); });
            }
            else {
                closeConfirmationWindow();
                var _a = save.saveData, loadedPlayer = _a.player, loadedStats = _a.stats, loadedChallenges = _a.challenges;
                player = new Player(__assign({}, loadedPlayer));
                Object.assign(stats, new Statistics(__assign({}, loadedStats)));
                Object.assign(challenges, new Challenges(__assign({}, loadedChallenges)));
                player.restoreClasses();
                sideBarDetails();
                createInventory();
            }
        }
    };
    SaveController.prototype.deleteSave = function (id) {
        var _this = this;
        var save = this.saveSlots.find(function (save) { return save.id === id; });
        if (save) {
            var text = "<c>white<c>" + game.getLocalizedString("delete") + " <c>goldenrod<c>" + save.name + "<c>white<c>?";
            confirmationWindow(text, function () {
                _this.saveSlots = _this.saveSlots.filter(function (save) { return save.id !== id; });
                localStorage.setItem("PohjolaIII_saved_games", JSON.stringify(_this.saveSlots));
                closeConfirmationWindow();
                createSaves();
            });
        }
    };
    SaveController.prototype.saveToFile = function () {
        // @ts-ignore
        var save = JSON.stringify(new SaveFile({ name: saveName }));
        var blob = new Blob([save], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = "PohjolaIII_" + saveName + "_save_" + new Date().toLocaleTimeString() + ".txt";
        link.click();
    };
    SaveController.prototype.loadFromFile = function () {
        var _this = this;
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".txt";
        fileInput.onchange = function () {
            var _a;
            var file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                var reader_1 = new FileReader();
                reader_1.onload = function () {
                    var save = JSON.parse(reader_1.result);
                    _this.saveGame(save.name, save.id, save);
                };
                reader_1.readAsText(file);
            }
        };
        fileInput.click();
    };
    return SaveController;
}());
var SaveFile = /** @class */ (function () {
    function SaveFile(saveFile) {
        if (saveFile === null || saveFile === void 0 ? void 0 : saveFile.id) {
            this.id = saveFile.id;
        }
        else {
            var id_1 = this.createID();
            while (saveController.saveSlots.find(function (save) { return save.id === id_1; })) {
                id_1 = this.createID();
            }
            this.id = id_1;
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
    SaveFile.prototype.createID = function () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };
    return SaveFile;
}());
var SaveData = /** @class */ (function () {
    function SaveData() {
        this.player = this.stripPlayer();
        this.stats = stats;
        this.challenges = challenges;
    }
    SaveData.prototype.stripPlayer = function () {
        var stripped = JSON.parse(JSON.stringify(player));
        stripped.inventory = stripped.inventory.map(function (item) { return ({
            id: item.id,
            type: item.type,
            amount: item.amount
        }); });
        stripped.equipment = {};
        Object.entries(player.equipment).map(function (_a) {
            var slot = _a[0], item = _a[1];
            return item
                ? (stripped.equipment[slot] = {
                    id: item.id,
                    type: item.type,
                    amount: item.amount
                })
                : (stripped.equipment[slot] = null);
        });
        stripped.abilities = stripped.abilities.map(function (ability) { return ({
            id: ability.id
        }); });
        stripped.abilities_total = stripped.abilities_total.map(function (ability) { return ({
            id: ability.id
        }); });
        stripped.skills = stripped.skills.map(function (skill) { return ({
            id: skill.id,
            currentLevel: skill.currentLevel,
            isOwned: true
        }); });
        return stripped;
    };
    return SaveData;
}());
var saveController = new SaveController();
var saveName = "";
function createSaves() {
    saveName = "";
    saveController.sortSaves();
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    var saveScreen = document.createElement("div");
    saveScreen.classList.add("saves");
    saveScreen.innerHTML = "\n    <div class=\"save-header\">\n      <input type=\"text\" id=\"save-name\" onKeyUp=\"saveName = this.value\" placeholder=\"" + game.getLocalizedString("save_name") + "\">\n      <button class=\"save-button\" onClick=\"saveController.saveGame(saveName)\">" + game.getLocalizedString("save") + "</button>\n      <button class=\"save-button\" onClick=\"saveController.saveToFile()\">" + game.getLocalizedString("save_to_file") + "</button>\n      <button class=\"save-button\" onClick=\"saveController.loadFromFile()\">" + game.getLocalizedString("load_from_file") + "</button>\n    </div>\n  ";
    saveController.saveSlots.forEach(function (save) {
        var progress = calculateProgress(save.saveData.player);
        var size = JSON.stringify(save).length;
        var saveSlot = document.createElement("div");
        saveSlot.classList.add("save-slot");
        saveSlot.innerHTML = "\n    <div class=\"save-data\">\n      <div class=\"slot-name\">" + save.name + "</div>\n      <div class=\"line\">|</div>\n      <div class=\"last-saved\">" + game.getLocalizedString("last_saved") + ": " + save.lastSaved.toLocaleDateString("fi-FI") + " @ " + save.lastSaved.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit"
        }) + "</div>\n    <div class=\"line\">|</div>\n        <div class=\"game-progress\">" + game.getLocalizedString("progress") + ": " + progress + "%</div>\n        <div class=\"line\">|</div>\n        <div class=\"player-level\">" + game.getLocalizedString("player_level") + ": " + save.saveData.player.level + "</div>\n        <div class=\"line\">|</div>\n        <div class=\"created-at\">" + game.getLocalizedString("created_at") + ": " + save.created.toLocaleDateString("fi-FI") + " @ " + save.created.toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit"
        }) + "</div>\n    <div class=\"line\">|</div>\n        <div class=\"size\">" + (size / 1000).toFixed(2) + " kb</div>\n        <div class=\"line\">|</div>\n        <div class=\"ver\">" + game.getLocalizedString("version") + ": " + save.version + "</div>\n      </div>\n      <div class=\"save-buttons\">\n        <button class=\"save-over\" onclick=\"saveController.saveOver('" + save.id + "')\">Save</button>\n        <button class=\"load-save\" onclick=\"saveController.loadSave('" + save.id + "', { confirm: true })\">Load</button>\n        <button class=\"delete-save\" onclick=\"saveController.deleteSave('" + save.id + "')\">Delete</button>\n      </div>\n    ";
        saveScreen.appendChild(saveSlot);
    });
    lobbyContent.append(saveScreen);
}
//# sourceMappingURL=save.js.map