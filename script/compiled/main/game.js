"use strict";
class Game {
    constructor() {
        this.init();
        this.state = {
            paused: false,
            targeting: false,
            selected_ability: null,
        };
        this.settings = new Settings();
        this.language = english;
    }
    init() {
        console.log("Game initialized");
    }
    initCombat(foes) {
        console.log("Combat initialized");
        combatScreen.classList.remove("no-display");
        createActionSlots();
        player.updateAllModifiers();
        const enemies = foes.map((foe) => {
            return new Enemy({ ...foe });
        });
        combat.createCombat(enemies);
    }
    pause(options) {
        this.state.paused = true;
        if (options?.disableSkills)
            combatScreen.classList.add("paused");
        clearInterval(this.tick);
    }
    resume() {
        clearInterval(this.tick);
        this.state.paused = false;
        combatScreen.classList.remove("paused");
        this.tick = setInterval(update, 1000 / game.settings.tick_speed);
    }
    startTargeting(ability) {
        this.state.targeting = true;
        this.state.selected_ability = ability;
        combatScreen.classList.add("targeting");
        const slot = slots.querySelector(`.action-slot[data-ability="${ability.id}"]`);
        if (slot)
            slot.classList.add("selected");
    }
    endTargeting() {
        this.state.targeting = false;
        this.state.selected_ability = null;
        combatScreen.classList.remove("targeting");
        const slotsArr = document.querySelectorAll(".action-slot");
        slotsArr.forEach((slot) => {
            slot.classList.remove("selected");
        });
    }
    getLocalizedString(id) {
        let string = id;
        if (this.language[id] !== undefined) {
            string = this.language[id];
        }
        return string;
    }
    controls(e) {
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
        hotkeys.forEach((hotkey) => {
            if (e.code === this.settings[hotkey]) {
                console.log("Hotkey pressed: " + hotkey);
                useAbility(hotkey);
            }
        });
    }
    controlsUp(e) {
        if (e.key === "Shift") {
            hideExtraText();
        }
    }
    executeCommand(command, value) {
        if (command === "add_ability") {
            let playerHasAbility = player.abilities.findIndex((ability) => ability.id === value.id) !== -1;
            if (!playerHasAbility) {
                player.addAbility(value);
            }
        }
    }
    beginCombat(foes) {
        lobbyScreen.classList.add("no-display");
        combatScreen.classList.remove("no-display");
        player.reset();
        this.initCombat(foes);
    }
    endCombatAndGoToLobby() {
        lobbyScreen.classList.remove("no-display");
        combatScreen.classList.add("no-display");
        sideBarDetails();
    }
    randomShake(num) {
        // Randomly generate  shake animations using translate
        let shakes = "";
        for (let i = 1; i <= num; i++) {
            shakes += `
      @keyframes shake${i} {
        0% {
          left: 0rem;
          top: 0rem;
        }
        20% {
          left: ${(Math.random() - 0.5).toFixed(1)}rem;
          top: ${(Math.random() - 0.5).toFixed(1)}rem;
        }
        40% {
          left: ${(Math.random() - 0.5).toFixed(1)}rem;
          top: ${(Math.random() - 0.5).toFixed(1)}rem;
        }
        60% {
          left: ${(Math.random() - 0.5).toFixed(1)}rem;
          top: ${(Math.random() - 0.5).toFixed(1)}rem;
        }
        80% {
          left: ${(Math.random() - 0.5).toFixed(1)}rem;
          top: ${(Math.random() - 0.5).toFixed(1)}rem;
        }
        100% {
          left: 0rem;
          top: 0rem;
        }
      }
    `;
        }
        console.log(shakes);
    }
}
const hotkeys = ["hotkey_ability_1", "hotkey_ability_2", "hotkey_ability_3", "hotkey_ability_4", "hotkey_ability_5", "hotkey_ability_6"];
class Settings {
    constructor(settings) {
        this.hotkey_ability_1 = settings?.hotkey_ability_1 || "Digit1";
        this.hotkey_ability_2 = settings?.hotkey_ability_2 || "Digit2";
        this.hotkey_ability_3 = settings?.hotkey_ability_3 || "Digit3";
        this.hotkey_ability_4 = settings?.hotkey_ability_4 || "Digit4";
        this.hotkey_ability_5 = settings?.hotkey_ability_5 || "Digit5";
        this.hotkey_ability_6 = settings?.hotkey_ability_6 || "Digit6";
        this.tick_speed = settings?.tick_speed || 60;
        this.animation_speed = settings?.animation_speed || 2;
        this.pause_on_player_turn = settings?.pause_on_player_turn || true;
    }
}
class Challenges {
    constructor(challenges) {
        this.real_time_combat = challenges?.real_time_combat || false;
        this.no_after_combat_recovery = challenges?.no_after_combat_recovery || false;
        this.hardcore = challenges?.hardcore || false;
        this.no_grinding = challenges?.no_grinding || false;
        this.enemy_strength_multiplier = challenges?.enemy_strength_multiplier || 1;
    }
}
class Statistics {
    constructor(stats) {
        this.total_damage = stats?.total_damage || 0;
        this.total_damage_taken = stats?.total_damage_taken || 0;
        this.total_healing = stats?.total_healing || 0;
        this.total_kills = stats?.total_kills || 0;
        this.total_deaths = stats?.total_deaths || 0;
        this.total_turns = stats?.total_turns || 0;
        this.total_combat_time = stats?.total_combat_time || 0;
        this.total_xp_gained = stats?.total_xp_gained || 0;
        this.total_gold_gained = stats?.total_gold_gained || 0;
        this.time_played = stats?.time_played || 0;
        this.most_damage = stats?.most_damage || 0;
        this.most_healing = stats?.most_healing || 0;
        this.most_damage_taken = stats?.most_damage_taken || 0;
        this.most_turns = stats?.most_turns || 0;
        this.most_combat_time = stats?.most_combat_time || 0;
    }
}
const game = new Game();
const stats = new Statistics();
const challenges = new Challenges();
document.addEventListener("keydown", (e) => game.controls(e));
document.addEventListener("keyup", (e) => game.controlsUp(e));
//# sourceMappingURL=game.js.map