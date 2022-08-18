interface I_Stats {
  [str: string]: number;
  vit: number;
  agi: number;
  int: number;
  spi: number;
  hp: number;
  mp: number;
  hpMax: number;
  mpMax: number;
}

interface I_Defences {
  [physical: string]: number;
  magical: number;
  elemental: number;
}

interface I_Resistances {
  [fire: string]: number;
  ice: number;
  thunder: number;
  curse: number;
  poison: number;
  divine: number;
}

class Character {
  [id: string]: any;
  name: string;
  stats: I_Stats;
  defences: I_Defences;
  resistances: I_Resistances;
  traits: any;
  statuses: any;
  perks?: any;
  allModifiers?: any;
  constructor(char: Character) {
    this.id = char.id;
    this.name = char.name;
    this.stats = char.stats;
    this.defences = char.defences;
    this.resistances = char.resistances;
    this.traits = char.traits ?? [];
    this.statuses = char.statuses ?? [];
    this.perks = char.perks ?? [];
    this.allModifiers = char.allModifiers ?? {};

    this.getModifiers = () => {
      return getAllModifiers(this);
    };

    this.updateAllModifiers = () => {
      this.allModifiers = this.getModifiers();
    };

    this.getSpeed = () => {
      return +(
        1 *
        (1 + this.stats.agi / 100) *
        this.allModifiers.speedP
      ).toFixed(2);
    };

    this.updateAllModifiers();
  }
}
