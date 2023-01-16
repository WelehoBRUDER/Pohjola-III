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
var Game = /** @class */ (function () {
    function Game() {
        this.init();
        this.state = {
            paused: false,
            targeting: false,
            selected_ability: null
        };
        this.settings = new Settings();
        this.language = english;
    }
    Game.prototype.init = function () {
        console.log("Game initialized");
    };
    Game.prototype.initCombat = function (foes) {
        console.log("Combat initialized");
        combatScreen.classList.remove("no-display");
        createActionSlots();
        player.updateAllModifiers();
        var enemies = foes.map(function (foe) {
            return new Enemy(__assign({}, foe));
        });
        combat.createCombat(enemies);
    };
    Game.prototype.pause = function (options) {
        this.state.paused = true;
        if (options === null || options === void 0 ? void 0 : options.disableSkills)
            combatScreen.classList.add("paused");
        clearInterval(this.tick);
    };
    Game.prototype.resume = function () {
        clearInterval(this.tick);
        this.state.paused = false;
        combatScreen.classList.remove("paused");
        this.tick = setInterval(update, 1000 / game.settings.tick_speed);
    };
    Game.prototype.startTargeting = function (ability) {
        this.state.targeting = true;
        this.state.selected_ability = ability;
        combatScreen.classList.add("targeting");
        var slot = slots.querySelector(".action-slot[data-ability=\"" + ability.id + "\"]");
        if (slot)
            slot.classList.add("selected");
    };
    Game.prototype.endTargeting = function () {
        this.state.targeting = false;
        this.state.selected_ability = null;
        combatScreen.classList.remove("targeting");
        var slotsArr = document.querySelectorAll(".action-slot");
        slotsArr.forEach(function (slot) {
            slot.classList.remove("selected");
        });
    };
    Game.prototype.getLocalizedString = function (id) {
        var string = id;
        if (this.language[id] !== undefined) {
            string = this.language[id];
        }
        return string;
    };
    Game.prototype.controls = function (e) {
        var _this = this;
        if (e.key === "§")
            return devConsole.toggle();
        if (devConsole.open && e.key !== "Escape")
            return;
        if (e.key === "p") {
            if (this.state.paused) {
                this.resume();
            }
            else {
                this.pause({ disableSkills: true });
            }
        }
        else if (e.key === "Shift") {
            displayExtraText();
        }
        hotkeys.forEach(function (hotkey) {
            if (e.code === _this.settings[hotkey]) {
                console.log("Hotkey pressed: " + hotkey);
                useAbility(hotkey);
            }
        });
    };
    Game.prototype.controlsUp = function (e) {
        if (e.key === "Shift") {
            hideExtraText();
        }
    };
    Game.prototype.executeCommand = function (command, value) {
        if (command === "add_ability") {
            var playerHasAbility = player.abilities.findIndex(function (ability) { return ability.id === value.id; }) !== -1;
            if (!playerHasAbility) {
                player.addAbility(value);
            }
        }
    };
    Game.prototype.beginCombat = function (foes) {
        lobbyScreen.classList.add("no-display");
        combatScreen.classList.remove("no-display");
        player.reset();
        this.initCombat(foes);
    };
    Game.prototype.endCombatAndGoToLobby = function () {
        lobbyScreen.classList.remove("no-display");
        combatScreen.classList.add("no-display");
        sideBarDetails();
    };
    Game.prototype.randomShake = function (num) {
        // Randomly generate  shake animations using translate
        var shakes = "";
        for (var i = 1; i <= num; i++) {
            shakes += "\n      @keyframes shake" + i + " {\n        0% {\n          left: 0rem;\n          top: 0rem;\n        }\n        20% {\n          left: " + (Math.random() - 0.5).toFixed(1) + "rem;\n          top: " + (Math.random() - 0.5).toFixed(1) + "rem;\n        }\n        40% {\n          left: " + (Math.random() - 0.5).toFixed(1) + "rem;\n          top: " + (Math.random() - 0.5).toFixed(1) + "rem;\n        }\n        60% {\n          left: " + (Math.random() - 0.5).toFixed(1) + "rem;\n          top: " + (Math.random() - 0.5).toFixed(1) + "rem;\n        }\n        80% {\n          left: " + (Math.random() - 0.5).toFixed(1) + "rem;\n          top: " + (Math.random() - 0.5).toFixed(1) + "rem;\n        }\n        100% {\n          left: 0rem;\n          top: 0rem;\n        }\n      }\n    ";
        }
        console.log(shakes);
    };
    return Game;
}());
var hotkeys = ["hotkey_ability_1", "hotkey_ability_2", "hotkey_ability_3", "hotkey_ability_4", "hotkey_ability_5", "hotkey_ability_6"];
var Settings = /** @class */ (function () {
    function Settings(settings) {
        this.hotkey_ability_1 = (settings === null || settings === void 0 ? void 0 : settings.hotkey_ability_1) || "Digit1";
        this.hotkey_ability_2 = (settings === null || settings === void 0 ? void 0 : settings.hotkey_ability_2) || "Digit2";
        this.hotkey_ability_3 = (settings === null || settings === void 0 ? void 0 : settings.hotkey_ability_3) || "Digit3";
        this.hotkey_ability_4 = (settings === null || settings === void 0 ? void 0 : settings.hotkey_ability_4) || "Digit4";
        this.hotkey_ability_5 = (settings === null || settings === void 0 ? void 0 : settings.hotkey_ability_5) || "Digit5";
        this.hotkey_ability_6 = (settings === null || settings === void 0 ? void 0 : settings.hotkey_ability_6) || "Digit6";
        this.tick_speed = (settings === null || settings === void 0 ? void 0 : settings.tick_speed) || 60;
        this.animation_speed = (settings === null || settings === void 0 ? void 0 : settings.animation_speed) || 2;
        this.pause_on_player_turn = (settings === null || settings === void 0 ? void 0 : settings.pause_on_player_turn) || true;
    }
    return Settings;
}());
var Challenges = /** @class */ (function () {
    function Challenges(challenges) {
        this.real_time_combat = (challenges === null || challenges === void 0 ? void 0 : challenges.real_time_combat) || false;
        this.no_after_combat_recovery = (challenges === null || challenges === void 0 ? void 0 : challenges.no_after_combat_recovery) || false;
        this.hardcore = (challenges === null || challenges === void 0 ? void 0 : challenges.hardcore) || false;
        this.no_grinding = (challenges === null || challenges === void 0 ? void 0 : challenges.no_grinding) || false;
        this.enemy_strength_multiplier = (challenges === null || challenges === void 0 ? void 0 : challenges.enemy_strength_multiplier) || 1;
    }
    return Challenges;
}());
var Statistics = /** @class */ (function () {
    function Statistics(stats) {
        this.total_damage = (stats === null || stats === void 0 ? void 0 : stats.total_damage) || 0;
        this.total_damage_taken = (stats === null || stats === void 0 ? void 0 : stats.total_damage_taken) || 0;
        this.total_healing = (stats === null || stats === void 0 ? void 0 : stats.total_healing) || 0;
        this.total_kills = (stats === null || stats === void 0 ? void 0 : stats.total_kills) || 0;
        this.total_deaths = (stats === null || stats === void 0 ? void 0 : stats.total_deaths) || 0;
        this.total_turns = (stats === null || stats === void 0 ? void 0 : stats.total_turns) || 0;
        this.total_combat_time = (stats === null || stats === void 0 ? void 0 : stats.total_combat_time) || 0;
        this.total_xp_gained = (stats === null || stats === void 0 ? void 0 : stats.total_xp_gained) || 0;
        this.total_gold_gained = (stats === null || stats === void 0 ? void 0 : stats.total_gold_gained) || 0;
        this.time_played = (stats === null || stats === void 0 ? void 0 : stats.time_played) || 0;
        this.most_damage = (stats === null || stats === void 0 ? void 0 : stats.most_damage) || 0;
        this.most_healing = (stats === null || stats === void 0 ? void 0 : stats.most_healing) || 0;
        this.most_damage_taken = (stats === null || stats === void 0 ? void 0 : stats.most_damage_taken) || 0;
        this.most_turns = (stats === null || stats === void 0 ? void 0 : stats.most_turns) || 0;
        this.most_combat_time = (stats === null || stats === void 0 ? void 0 : stats.most_combat_time) || 0;
    }
    return Statistics;
}());
var game = new Game();
var stats = new Statistics();
var challenges = new Challenges();
document.addEventListener("keydown", function (e) { return game.controls(e); });
document.addEventListener("keyup", function (e) { return game.controlsUp(e); });
tooltip(potionPouch, game.getLocalizedString("potion_pouch_tt"));
//# sourceMappingURL=game.js.map