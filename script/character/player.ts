interface I_Equipment {
  weapon: Weapon | null;
  armor: Armor | null;
  helmet: Armor | null;
  legs: Armor | null;
}

const defaultEquipment = {
  weapon: { ...items.broken_sword },
  armor: null,
  helmet: null,
  legs: null,
};

const races = {
  human: {
    id: "human",
    modifiers: {
      expGainP: 5,
      ability_sharp_strike: {
        powerV: 0.25,
        effect_wounded: {
          durationP: 20,
        },
      },
    },
  },
};

class Race {
  [id: string]: any;
  modifiers: any;
  constructor(race: Race) {
    this.id = race.id;
    this.modifiers = race.modifiers;
  }
}

interface PlayerObject extends Character {
  [race: string]: any;
  equipment: I_Equipment;
  abilities_total: Ability[];
}

class Player extends Character {
  [race: string]: any;
  equipment: I_Equipment;
  abilities_total: Ability[];
  constructor(char: PlayerObject) {
    super(char);
    this.race = new Race(char.race) ?? new Race(races.human);
    this.equipment = char.equipment ?? defaultEquipment;
    this.abilities_total = char.abilities_total ?? [];

    this.updateAllModifiers();
  }

  update() {
    this.statuses.forEach((status: Effect) => {
      status.lasts -= 1 / 60;
      if (status.inflict) {
        status.inflictTimer += 1 / 60;
        if (status.inflictTimer >= 1) {
          status.inflictTimer = 0;
          this.inflict(status);
        }
      }

      const statusElem = playerStatuses.querySelector(
        ".status-effect[data-id='" + status.id + "']"
      );
      if (!statusElem) {
        const statusElement = createStatusIcon(status);
        playerStatuses.appendChild(statusElement);
      } else if (statusElem) {
        const dur: HTMLParagraphElement =
          statusElem.querySelector(".duration")!;
        if (dur) {
          dur.innerText = status.lasts.toFixed(1) + "s";
        }
      }
    });
  }
}

const player = new Player({
  id: "player",
  name: "Player",
  race: races.human,
  stats: {
    str: 10,
    vit: 10,
    agi: 10,
    int: 10,
    spi: 10,
    hp: 50,
    mp: 30,
    atk: 5,
    hpMax: 0,
    mpMax: 0,
    ap: 0,
  },
  defences: {
    physical: 10,
    magical: 10,
    elemental: 10,
  },
  resistances: {
    fire: 10,
    ice: 10,
    thunder: 10,
    curse: 10,
    poison: 10,
    divine: 10,
  },
  equipment: defaultEquipment,
  abilities: [
    new Ability(abilities.sharp_strike),
    new Ability(abilities.heavy_attack),
  ],
  critRate: 3,
  critPower: 50,
  abilities_total: [],
  traits: [],
  statuses: [],
  perks: [],
});

player.updateAllModifiers();
player.abilities.forEach((abi) => abi.updateStats(player));

game.initCombat();
