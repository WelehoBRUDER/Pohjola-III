"use strict";
class Game {
    state;
    settings;
    language;
    tick;
    playing;
    constructor() {
        this.state = {
            paused: false,
            targeting: false,
            selected_ability: null,
        };
        this.settings = new Settings();
        this.language = english;
        this.playing = false;
        this.init();
    }
    init() {
        const savedSettings = JSON.parse(localStorage.getItem("PohjolaIII_settings") || "{}");
        this.settings = new Settings(savedSettings);
        console.log("Game initialized");
    }
    initCombat(foes) {
        combatScreen.classList.remove("no-display");
        createActionSlots();
        player.updateAllModifiers();
        const enemies = foes.map((foe) => {
            return new Enemy({ ...foe });
        });
        combat.createCombat(enemies);
    }
    startGame() {
        this.playing = true;
        console.log("Game started");
        const aspect = startingAspects[player.starting_aspect];
        if (aspect.items) {
            aspect.items.forEach((item) => {
                // @ts-ignore
                player.addItem(new Item(items[item.item]), item.amount);
            });
        }
        startingChallenges.forEach((challenge) => {
            if (challenge.enabled) {
                if (challenge.type === "boolean") {
                    challenges[challenge.id] = true;
                }
                else if (challenge.type === "number") {
                    const valueIndex = challengeValues[challenge.id].findIndex((value) => value.value === challenge.value);
                    challenges[challenge.id] = valueIndex;
                }
            }
        });
        mainMenuElement.classList.add("no-display");
        lobbyScreen.classList.remove("no-display");
        player = new Player({ ...player });
        player.restoreClasses();
        player.perks?.push(new Perk(perks[0]));
        lobby.current_view = "char";
        createLobby();
        createCharView();
        sideBarDetails();
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
        hotkeys.forEach((hotkey) => {
            if (e.code === this.settings[hotkey]) {
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
    saveSettings() {
        localStorage.setItem("PohjolaIII_settings", JSON.stringify(this.settings));
    }
}
const hotkeys = ["hotkey_ability_1", "hotkey_ability_2", "hotkey_ability_3", "hotkey_ability_4", "hotkey_ability_5", "hotkey_ability_6"];
class Settings {
    hotkey_ability_2;
    hotkey_ability_3;
    hotkey_ability_4;
    hotkey_ability_5;
    hotkey_ability_6;
    tick_speed;
    animation_speed;
    constructor(settings) {
        this.hotkey_ability_1 = settings?.hotkey_ability_1 || "Digit1";
        this.hotkey_ability_2 = settings?.hotkey_ability_2 || "Digit2";
        this.hotkey_ability_3 = settings?.hotkey_ability_3 || "Digit3";
        this.hotkey_ability_4 = settings?.hotkey_ability_4 || "Digit4";
        this.hotkey_ability_5 = settings?.hotkey_ability_5 || "Digit5";
        this.hotkey_ability_6 = settings?.hotkey_ability_6 || "Digit6";
        this.tick_speed = settings?.tick_speed || 60;
        this.animation_speed = settings?.animation_speed || 2;
    }
}
function challenge(id, options) {
    if (typeof challenges[id] === "number") {
        if (options?.score) {
            return challengeValues[id][challenges[id]].score;
        }
        else {
            return challengeValues[id][challenges[id]].value;
        }
    }
    else
        return challenges[id];
}
const challengeValues = {
    enemy_damage: [
        { value: 1, score: 0 },
        { value: 1.2, score: 1 },
        { value: 1.4, score: 2 },
        { value: 1.6, score: 3 },
        { value: 1.8, score: 4 },
        { value: 2, score: 5 },
    ],
    enemy_health: [
        { value: 1, score: 0 },
        { value: 1.2, score: 1 },
        { value: 1.5, score: 2 },
        { value: 1.75, score: 3 },
        { value: 2, score: 4 },
        { value: 2.5, score: 5 },
    ],
    healing_weakness: [
        { value: 1, score: 0 },
        { value: 0.75, score: 1 },
        { value: 0.5, score: 2 },
        { value: 0.25, score: 3 },
    ],
    mana_regen_debuff: [
        { value: 1, score: 0 },
        { value: 0.5, score: 2 },
        { value: 0, score: 3 },
    ],
};
class Challenges {
    real_time_combat;
    no_after_combat_recovery;
    hardcore;
    no_grinding;
    enemy_damage;
    enemy_health;
    healing_weakness;
    mana_regen_debuff;
    constructor(challenges) {
        this.real_time_combat = challenges?.real_time_combat || false;
        this.no_after_combat_recovery = challenges?.no_after_combat_recovery || false;
        this.hardcore = challenges?.hardcore || false;
        this.no_grinding = challenges?.no_grinding || false;
        this.enemy_damage = challenges?.enemy_damage || 0;
        this.enemy_health = challenges?.enemy_health || 0;
        this.healing_weakness = challenges?.healing_weakness || 0;
        this.mana_regen_debuff = challenges?.mana_regen_debuff || 0;
    }
}
class Statistics {
    total_damage;
    total_damage_taken;
    total_healing;
    total_kills;
    total_deaths;
    total_turns;
    total_combat_time;
    total_xp_gained;
    total_gold_gained;
    time_played;
    most_damage;
    most_healing;
    most_damage_taken;
    most_turns;
    most_combat_time;
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
tooltip(potionPouch, game.getLocalizedString("potion_pouch_tt"));
//# sourceMappingURL=game.js.map