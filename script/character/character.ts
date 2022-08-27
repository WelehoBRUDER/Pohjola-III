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
  stun: number;
  bleed: number;
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
    this.abilities = char.abilities.map((abi: Ability) => new Ability(abi));
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

    this.getResistances = () => {
      this.updateAllModifiers();
      const resistances = { ...this.resistances };
      Object.entries(resistances).map(([key, value]) => {
        let modifier = this.allModifiers[key + "_resistanceP"] ?? 1;
        let boost = this.allModifiers[key + "_resistanceV"] ?? 0;
        resistances[key] = Math.floor((value + boost) * modifier);
      });
      return resistances;
    };

    this.getAbilityModifiers = () => {
      const mods: any = {};
      Object.entries(this.allModifiers).forEach(([key, value]: [string, any]) => {
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
      });
      return mods;
    };

    this.updateAllModifiers = () => {
      this.allModifiers = this.getModifiers();
      this.abilities.forEach((abi: Ability) => {
        abi.updateStats(this);
        if (this.id === "player") {
          const slot: HTMLDivElement = slots.querySelector(`[data-ability="${abi.id}"]`)!;
          if (slot) {
            updateTooltip(slot, abi.tooltip({ owner: this }));
          }
        }
      });
    };

    this.getSpeed = () => {
      const speed = +(1 * (0.4 + this.stats.agi / 100) * this.allModifiers.speedP).toFixed(2);
      return speed > 0 ? speed : 0;
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
        const flat = value + increase;
        if (flat < 0) {
          // If flat value is negative and modifier is less than 1, it will actually increase the value
          // So we need to make sure that the modifier is at least 1
          if (modifier < 1) {
            modifier = 1 + (1 - modifier);
          }
        }
        stats[key] = flat * modifier;
      });
      // Calculate max hp
      const hpIncrease = this.allModifiers["hpMaxV"] ?? 0;
      const hpModifier = this.allModifiers["hpMaxP"] ?? 1;
      stats["hpMax"] = (stats["hpMax"] + hpIncrease + stats["vit"] * 5) * hpModifier;
      // Calculate max mp
      const mpIncrease = this.allModifiers["mpMaxV"] ?? 0;
      const mpModifier = this.allModifiers["mpMaxP"] ?? 1;
      stats["mpMax"] = (stats["mpMax"] + mpIncrease + stats["int"] * 3) * mpModifier;
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

    this.addStatus = (status: Effect, user: Player | Enemy, key: string): void => {
      const index = this.statuses.findIndex((s: any) => s.id === status.id);
      const effect = new Effect(status);
      if (index === -1) {
        effect.init(user.allModifiers?.[key]?.["effect_" + status.id]);
        effect.lasts = effect.duration;
        effect.inflictTimer = 0;
        this.statuses.push(effect);
      } else {
        effect.init(user.allModifiers?.[key]?.["effect_" + status.id]);
        this.statuses[index].lasts = effect.duration;
      }
      this.updateAllModifiers();
    };

    this.inflict = (status: Effect) => {
      const values = status.inflict;
      if (values?.damagePercent || values?.damageFlat) {
        let damage: number = 0;
        if (values?.damagePercent) damage = Math.round(this.getStats({ dontUpdateModifiers: true }).hpMax * values.damagePercent);
        if (values?.damageFlat) damage += values.damageFlat;
        const resist = this.getResistances()[status.type];
        damage = Math.round(damage * (1 - resist / 100)); // This can actually heal the target
        const location: HTMLElement = this.isEnemy ? this.card.main : tools;
        if (damage === 0) {
          return createDroppingText("RESIST!", location, "resisted");
        }
        if (damage > 0) {
          if (this.isEnemy) {
            this.harm(damage);
          } else this.stats.hp -= damage;
          createDroppingText(damage.toString(), location, status.type);
        } else if (damage < 0) {
          damage = Math.abs(damage);
          if (this.isEnemy) {
            this.heal(damage);
          } else this.stats.hp += damage;
          createDroppingText(damage.toString(), location, "heal");
        }
      } else if (values?.healingFlat || values?.healingPercent) {
        let healing: number = 0;
        if (values?.healingPercent) healing = Math.round(this.getStats({ dontUpdateModifiers: true }).hpMax * values.healingPercent);
        if (values?.healingFlat) healing += values.healingFlat;
        if (this.isEnemy) {
          this.heal(healing);
        } else this.stats.hp += healing;
        const location: HTMLElement = this.isEnemy ? this.card.main : tools;
        createDroppingText(healing.toString(), location, status.type);
      }
    };
  }
}
