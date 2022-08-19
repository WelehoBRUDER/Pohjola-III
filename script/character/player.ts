interface I_Equipment {
  weapon: Weapon;
  armor: Armor;
  helmet: Armor;
  legs: Armor;
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
  constructor(char: Character) {
    super(char);
    this.race = new Race(char.race) ?? new Race(races.human);
    this.equipment = char.equipment ?? defaultEquipment;
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
    hp: 10,
    mp: 10,
    hpMax: 10,
    mpMax: 10,
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
  traits: [],
  statuses: [],
  perks: [],
});
