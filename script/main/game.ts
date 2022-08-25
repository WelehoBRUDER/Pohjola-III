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

  initCombat() {
    console.log("Combat initialized");
    createActionSlots();
    // for testing
    combat.createCombat([
      //new Enemy({ ...enemies.skeleton }),
      new Enemy({ ...enemies.skeleton_brute }),
      //new Enemy({ ...enemies.skeleton }),
    ]);
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
    const slot = slots.querySelector(
      `.action-slot[data-ability="${ability.id}"]`
    );

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
    if (this.language[id]) {
      string = this.language[id];
    }
    return string;
  }

  controls(e: KeyboardEvent) {
    if (e.key === "p") {
      if (this.state.paused) {
        this.resume();
      } else {
        this.pause();
      }
    }
    hotkeys.forEach((hotkey: string) => {
      if (e.code === this.settings[hotkey]) {
        console.log("Hotkey pressed: " + hotkey);
        useAbility(hotkey);
      }
    });
  }

  randomShake() {
    // Randomly generate a shake animation using margins
    return console.log(`
      @keyframes shake {
        0% {
          margin-left: 0;
          margin-top: 0;
        }
        20% {
          margin-left: ${Math.round(Math.random() * 10)}px;
          margin-top: ${Math.round(Math.random() * 10)}px;
        }
        40% {
          margin-left: -${Math.round(Math.random() * 10)}px;
          margin-top: -${Math.round(Math.random() * 10)}px;
        }
        60% {
          margin-left: ${Math.round(Math.random() * 10)}px;
          margin-top: ${Math.round(Math.random() * 10)}px;
        }
        80% {
          margin-left: -${Math.round(Math.random() * 10)}px;
          margin-top: -${Math.round(Math.random() * 10)}px;
        }
        100% {
          margin-left: 0px;
          margin-top: 0px;
        }
      }
    `);
  }
}

const hotkeys = [
  "hotkey_ability_1",
  "hotkey_ability_2",
  "hotkey_ability_3",
  "hotkey_ability_4",
  "hotkey_ability_5",
  "hotkey_ability_6",
];

class Settings {
  [hotkey_ability_1: string]: any;
  hotkey_ability_2: string;
  hotkey_ability_3: string;
  hotkey_ability_4: string;
  hotkey_ability_5: string;
  hotkey_ability_6: string;
  tick_speed: number;
  animation_speed: number;
  pause_on_player_turn: boolean;
  constructor(settings?: Settings) {
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

const game = new Game();

document.addEventListener("keydown", (e) => game.controls(e));
