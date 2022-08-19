interface I_Equipment {
  weapon: Weapon | null;
  armor: Armor | null;
  helmet: Armor | null;
  legs: Armor | null;
}

const defaultEquipment = {
  weapon: null,
  armor: null,
  helmet: null,
  legs: null,
};

const races = {
  human: {
    id: "human",
    modifiers: {
      expGainP: 5,
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

class Player extends Character {
  [race: string]: any;
  equipment: I_Equipment;
  abilities_total: Ability[];
  constructor(char: Player) {
    super(char);
    this.race = new Race(char.race) ?? new Race(races.human);
    this.equipment = char.equipment ?? defaultEquipment;
    this.abilities_total = char.abilities_total ?? [];

    this.updateAllModifiers();
  }
}

const player = new Player({
  id: "player",
  name: "Player",
  race: races.human,
  stats: {
    vit: 10,
    agi: 10,
    int: 10,
    spi: 10,
    hp: 25,
    mp: 15,
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
  abilities_total: [],
  traits: [],
  statuses: [],
  perks: [],
});

game.initCombat();
