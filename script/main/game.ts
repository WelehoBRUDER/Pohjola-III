interface GameState {
  paused: boolean;
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
    combat.createCombat([new Enemy({ ...enemies.skeleton })]);
  }

  pause() {
    this.state.paused = true;
    clearInterval(this.tick);
  }

  resume() {
    this.state.paused = false;
    this.tick = setInterval(update, 1000 / game.settings.tick_speed);
  }

  getLocalizedString(id: string) {
    let string: string = id;
    if (this.language[id]) {
      string = this.language[id];
    }
    return string;
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
    this.animation_speed = settings?.animation_speed || 1;
  }
}

const game = new Game();
