interface GameState {
  paused: boolean;
  targeting: boolean;
  selected_ability: Ability | null;
}

class Game {
  state: GameState;
  settings: Settings;
  language: any;
  tick: any;
  playing: boolean;
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

  initCombat(foes: Enemy[]) {
    combatScreen.classList.remove("no-display");
    createActionSlots();
    player.updateAllModifiers();
    const enemies = foes.map((foe: any) => {
      return new Enemy({ ...foe });
    });

    combat.createCombat(enemies);
  }

  pause(options?: { disableSkills?: boolean }) {
    this.state.paused = true;
    if (options?.disableSkills) combatScreen.classList.add("paused");
    clearInterval(this.tick);
  }

  resume() {
    clearInterval(this.tick);
    this.state.paused = false;
    combatScreen.classList.remove("paused");
    this.tick = setInterval(update, 1000 / game.settings.tick_speed);
  }

  startTargeting(ability: Ability) {
    this.state.targeting = true;
    this.state.selected_ability = ability;
    combatScreen.classList.add("targeting");
    const slot = slots.querySelector(`.action-slot[data-ability="${ability.id}"]`);

    if (slot) slot.classList.add("selected");
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

  getLocalizedString(id: string) {
    let string: string = id;
    if (this.language[id] !== undefined) {
      string = this.language[id];
    }
    return string;
  }

  controls(e: KeyboardEvent) {
    if (e.key === "§") return devConsole.toggle();
    if (devConsole.open && e.key !== "Escape") return;
    if (e.key === "p") {
      if (this.state.paused) {
        this.resume();
      } else {
        this.pause({ disableSkills: true });
      }
    } else if (e.key === "Shift") {
      displayExtraText();
    }
    hotkeys.forEach((hotkey: string) => {
      if (e.code === this.settings[hotkey]) {
        useAbility(hotkey);
      }
    });
  }

  controlsUp(e: KeyboardEvent) {
    if (e.key === "Shift") {
      hideExtraText();
    }
  }

  executeCommand(command: string, value: any) {
    if (command === "add_ability") {
      let playerHasAbility = player.abilities.findIndex((ability) => ability.id === value.id) !== -1;
      if (!playerHasAbility) {
        player.addAbility(value);
      }
    }
  }

  beginCombat(foes: Enemy[]) {
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

  randomShake(num: number) {
    // Randomly generate  shake animations using translate
    let shakes: string = "";
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
  [hotkey_ability_1: string]: any;
  hotkey_ability_2: string;
  hotkey_ability_3: string;
  hotkey_ability_4: string;
  hotkey_ability_5: string;
  hotkey_ability_6: string;
  tick_speed: number;
  animation_speed: number;
  constructor(settings?: Settings) {
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

function challenge(id: string, options?: { score: false }): any {
  if (typeof challenges[id] === "number") {
    if (options?.score) {
      return challengeValues[id][challenges[id]].score;
    } else {
      return challengeValues[id][challenges[id]].value;
    }
  } else return challenges[id];
}

const challengeValues: any = {
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
  [work_around: string]: any;
  real_time_combat: boolean;
  no_after_combat_recovery: boolean;
  hardcore: boolean;
  no_grinding: boolean;
  enemy_damage: number;
  enemy_health: number;
  healing_weakness: number;
  mana_regen_debuff: number;
  constructor(challenges?: Challenges) {
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
  total_damage: number;
  total_damage_taken: number;
  total_healing: number;
  total_kills: number;
  total_deaths: number;
  total_turns: number;
  total_combat_time: number;
  total_xp_gained: number;
  total_gold_gained: number;
  time_played: number;
  most_damage: number;
  most_healing: number;
  most_damage_taken: number;
  most_turns: number;
  most_combat_time: number;
  constructor(stats?: Statistics) {
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
