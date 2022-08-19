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
  ap: number;
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
  abilities: Ability[];
  traits?: any;
  statuses?: any;
  perks?: any;
  allModifiers?: any;
  constructor(char: Character) {
    this.id = char.id;
    this.name = char.name;
    this.stats = char.stats;
    this.defences = char.defences;
    this.resistances = char.resistances;
    this.abilities = char.abilities;
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
        (0.9 + this.stats.agi / 100) *
        this.allModifiers.speedP
      ).toFixed(2);
    };

    this.getStats = () => {
      this.updateAllModifiers();
      const stats = { ...this.stats };
      Object.entries(stats).forEach(([key, value]) => {
        if (key.startsWith("hp") || key.startsWith("mp")) return;
        const increase = this.allModifiers[key + "V"] ?? 0;
        const modifier = this.allModifiers[key + "P"] ?? 1;
        stats[key] = (value + increase) * modifier;
      });
      // Calculate max hp
      const hpIncrease = this.allModifiers["hpMaxV"] ?? 0;
      const hpModifier = this.allModifiers["hpMaxP"] ?? 1;
      stats["hpMax"] =
        (stats["hpMax"] + hpIncrease + stats["vit"] * 5) * hpModifier;
      // Calculate max mp
      const mpIncrease = this.allModifiers["mpMaxV"] ?? 0;
      const mpModifier = this.allModifiers["mpMaxP"] ?? 1;
      stats["mpMax"] =
        (stats["mpMax"] + mpIncrease + stats["int"] * 3) * mpModifier;
      return stats;
    };

    this.updateAllModifiers();
  }
}
