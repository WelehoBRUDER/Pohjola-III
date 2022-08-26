interface I_Stats {
  [str: string]: number;
  vit: number;
  agi: number;
  int: number;
  spi: number;
  atk: number;
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
  critRate?: number;
  critPower?: number;
  traits?: any;
  statuses?: any;
  perks?: any;
  allModifiers?: any;
  dead?: boolean;
  getDamage?: any;
  getDefences?: any;
  addStatus?: any;
  constructor(char: Character) {
    this.id = char.id;
    this.name = char.name;
    this.stats = { ...char.stats };
    this.defences = { ...char.defences };
    this.resistances = { ...char.resistances };
    this.abilities = [...char.abilities];
    this.traits = char.traits ? [...char.traits] : [];
    this.statuses = char.statuses ? [...char.statuses] : [];
    this.perks = char.perks ? [...char.perks] : [];
    this.allModifiers = { ...char.allModifiers } ?? {};
    this.dead = char.dead ?? false;
    this.critRate = char.critRate ?? 0;
    this.critPower = char.critPower ?? 0;

    this.getModifiers = () => {
      return getAllModifiers(this);
    };

    this.getDefences = () => {
      this.updateAllModifiers();
      const defences = { ...this.defences };
      Object.entries(defences).map(([key, value]) => {
        let modifier = this.allModifiers[key + "_defenceP"] ?? 1;
        let boost = this.allModifiers[key + "_defenceV"] ?? 0;
        modifier += this.allModifiers["defenceP"] ?? 0;
        boost += this.allModifiers["defenceV"] ?? 0;
        defences[key] = Math.floor((value + boost) * modifier);
      });
      return defences;
    };

    this.getAbilityModifiers = () => {
      const mods: any = {};
      Object.entries(this.allModifiers).forEach(
        ([key, value]: [string, any]) => {
          if (key.startsWith("ability_")) {
            key = key.replace("ability_", "");
            if (mods[key]) {
              Object.entries(value).forEach(([k, v]) => {
                mods[key][k] = v;
              });
            } else {
              mods[key] = value;
            }
          }
        }
      );
      return mods;
    };

    this.updateAllModifiers = () => {
      this.allModifiers = this.getModifiers();
      this.abilities.forEach((abi: Ability) => {
        abi.updateStats(this);
        if (this.id === "player") {
          const slot: HTMLDivElement = slots.querySelector(
            `[data-ability="${abi.id}"]`
          )!;
          if (slot) {
            updateTooltip(slot, abi.tooltip());
          }
        }
      });
    };

    this.getSpeed = () => {
      return +(
        1 *
        (0.4 + this.stats.agi / 100) *
        this.allModifiers.speedP
      ).toFixed(2);
    };

    interface statsOptions {
      dontUpdateModifiers?: boolean;
    }

    this.getStats = (options?: statsOptions) => {
      if (!options?.dontUpdateModifiers) this.updateAllModifiers();
      const stats = { ...this.stats };
      Object.entries(stats).forEach(([key, value]) => {
        if (key.startsWith("hp") || key.startsWith("mp")) return;
        let increase = this.allModifiers[key + "V"] ?? 0;
        let modifier = this.allModifiers[key + "P"] ?? 1;
        if (key === "atk" && this.equipment?.weapon) {
          increase += this.equipment.weapon.atk;
        }
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

    this.getCrit = () => {
      const crit: any = { critRate: this.critRate, critPower: this.critPower };
      Object.entries(crit).forEach(([key, value]) => {
        const increase = this.allModifiers[key + "V"] ?? 0;
        crit[key] = value + increase;
      });
      crit["critRate"] += this.getStats().agi / 5;
      return crit;
    };

    this.restore = (): void => {
      const { hpMax, mpMax } = this.getStats();
      this.stats.hp = hpMax;
      this.stats.mp = mpMax;
    };

    this.updateAllModifiers();

    this.getDamage = (): number => {
      return this.getStats().atk;
    };

    this.addStatus = (
      status: Effect,
      user: Player | Enemy,
      key: string
    ): void => {
      const index = this.statuses.findIndex((s: any) => s.id === status.id);
      const effect = new Effect(status);
      if (index === -1) {
        effect.init(user.allModifiers?.[key]?.["effect_" + status.id]);
        effect.lasts = effect.duration;
        this.statuses.push(effect);
      } else {
        this.statuses[index].init(
          user.allModifiers?.[key]["effect_" + status.id]
        );
        this.statuses[index].lasts = effect.duration;
      }
      this.updateAllModifiers();
    };
  }
}
