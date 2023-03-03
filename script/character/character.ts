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

interface CharacterObject {
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
  perks?: Perk[];
  skills?: Skill[];
  allModifiers?: any;
  dead?: boolean;
  getDamage?: any;
  getDefences?: any;
  addStatus?: any;
  calculateCombatPower?: any;
  regenProc?: number;
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
  perks?: Perk[];
  skills?: Skill[];
  allModifiers?: any;
  dead?: boolean;
  getDamage?: any;
  getDefences?: any;
  addStatus?: any;
  getSpellPower?: any;
  calculateCombatPower?: any;
  regenProc: number;
  constructor(char: CharacterObject) {
    this.id = char.id;
    this.name = char.name;
    this.stats = { ...char.stats };
    this.defences = { ...char.defences };
    this.resistances = { ...char.resistances };
    this.abilities = char.abilities.map((abi: Ability) => new Ability(abi));
    this.traits = char.traits ? [...char.traits] : [];
    this.statuses = char.statuses ? [...char.statuses] : [];
    this.perks = char.perks ? [...char.perks] : [];
    this.skills = char.skills ? [...char.skills.map((ski: Skill) => new Skill(ski))] : [];
    this.allModifiers = { ...char.allModifiers } ?? {};
    this.dead = char.dead ?? false;
    this.critRate = char.critRate ?? 0;
    this.critPower = char.critPower ?? 0;
    this.regenProc = 0;

    this.perks.forEach((perk: Perk) => {
      if (!perk.level) {
        perk.level = 1;
      }
    });

    this.getModifiers = () => {
      return getAllModifiers(this);
    };

    this.getDefences = () => {
      this.updateAllModifiers();
      const defences = { ...this.defences };
      Object.entries(defences).map(([key, value]) => {
        let modifier = this.allModifiers[key + "DefenceP"] ?? 1;
        let boost = this.allModifiers[key + "DefenceV"] ?? 0;
        modifier += this.allModifiers["defenceP"] ?? 0;
        boost += this.allModifiers["defenceV"] ?? 0;
        boost += ((this.level - 1) | 0) * 0.15; // Level resistance boost
        if (this.equipment) {
          Object.entries(this.equipment).forEach(([slot, item]: any) => {
            if (item?.defence) {
              boost += item.defence[key] ?? 0;
            }
          });
        }
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
        boost += ((this.level - 1) | 0) * 0.2; // Level resistance boost
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

    this.getSpellPower = () => {
      const stats = this.getStats({ dontUpdateModifiers: true });
      if (this instanceof Enemy) {
        return (60 + stats.int * 3 + stats.atk / 2) / 100;
      } else {
        if (this.equipment?.weapon?.spell_scale) {
          return this.equipment.weapon.getSpellScale() / 100;
        } else return (50 + stats.atk / 2 + stats.int / 2) / 100;
      }
    };

    this.getSpeed = () => {
      let base = 0.4;
      if (this.equipment) base += this.getEquipmentSpeed();
      const speed = +(1 * (base + this.getStats({ dontUpdateModifiers: true }).agi / 100) * this.allModifiers.speedP).toFixed(2);
      return speed > 0 ? speed : 0;
    };

    this.getEquipmentSpeed = (): number => {
      let speed: number = 0;
      if (this.equipment) {
        Object.values(this.equipment).forEach((equip: any) => {
          speed += equip?.speed || 0;
        });
      }
      return speed / 100;
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
        if (key === "atk") {
          if (this.equipment?.weapon) {
            increase += this.equipment.weapon.atk;
          }
          increase += (this.level - 1 || 0) * 0.25;
        }
        const flat = value + increase;
        if (flat < 0) {
          // If flat value is negative and modifier is less than 1, it will actually increase the value
          // So we need to make sure that the modifier is at least 1
          if (modifier < 1) {
            modifier = 1 + (1 - modifier);
          }
        }
        stats[key] = Math.round(flat * modifier);
      });
      // Calculate max hp
      const hpIncrease = this.allModifiers["hpMaxV"] ?? 0;
      const hpModifier = this.allModifiers["hpMaxP"] ?? 1;
      const hpBoost = ((this.level - 1) | 0) * 2; // Level health boost
      stats["hpMax"] = Math.round((stats["hpMax"] + hpBoost + hpIncrease + stats["vit"] * 5) * hpModifier);
      if (this instanceof Enemy) {
        stats["hpMax"] = Math.round(stats["hpMax"] * challenge("enemy_health"));
      }
      // Calculate max mp
      const mpIncrease = this.allModifiers["mpMaxV"] ?? 0;
      const mpModifier = this.allModifiers["mpMaxP"] ?? 1;
      const mpBoost = ((this.level - 1) | 0) * 0.5; // Level mana boost
      stats["mpMax"] = Math.round((stats["mpMax"] + mpBoost + mpIncrease + stats["int"] * 2 + stats["spi"] * 2) * mpModifier);
      return stats;
    };

    this.getCrit = () => {
      const crit: any = { critRate: this.critRate, critPower: this.critPower };
      Object.entries(crit).forEach(([key, value]) => {
        const increase = this.allModifiers[key + "V"] ?? 0;
        crit[key] = value + increase;
      });
      crit["critRate"] += this.getStats().agi / 5;
      crit["critPower"] += this.getStats().str / 2;
      return crit;
    };

    this.restore = (): void => {
      if (this instanceof Player && challenge("no_after_combat_recovery")) {
        if (this.stats.hp < 1) this.stats.hp = 1;
        return;
      }
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
            stats.total_damage += damage;
            if (stats.most_damage < damage) {
              stats.most_damage = damage;
            }
          } else {
            this.stats.hp -= damage;
            stats.total_damage_taken += damage;
            if (stats.most_damage_taken < damage) {
              stats.most_damage_taken = damage;
            }
          }

          createDroppingText(damage.toString(), location, status.type);
        } else if (damage < 0) {
          damage = Math.abs(damage);
          if (this.isEnemy) {
            this.heal(damage);
          } else {
            this.stats.hp += damage;
            stats.total_healing += damage;
          }

          createDroppingText(damage.toString(), location, "heal");
        }
      } else if (values?.healingFlat || values?.healingPercent) {
        let healing: number = 0;
        if (values?.healingPercent) healing = Math.round(this.getStats({ dontUpdateModifiers: true }).hpMax * values.healingPercent);
        if (values?.healingFlat) healing += values.healingFlat;
        if (this.isEnemy) {
          this.heal(healing);
        } else {
          this.stats.hp += healing;
          stats.total_healing += healing;
        }
        const location: HTMLElement = this.isEnemy ? this.card.main : tools;
        createDroppingText(healing.toString(), location, status.type);
      }
    };

    // Calculate a rough power level of an enemy / the player
    // IT'S OVER 9000!
    this.calculateCombatPower = (): number => {
      const powerPerStat: any = {
        atk: 0.5,
        str: 0.2,
        agi: 0.2,
        vit: 0.2,
        int: 0.2,
        spi: 0.2,
        hpMax: 0.04,
        mpMax: 0.04,
        critRate: 0.1,
        critPower: 0.025,
        physical: 0.2,
        magical: 0.2,
        elemental: 0.2,
        speed: 1,
      };

      let powerLevel: number = 0;
      const stats = this.getStats();
      const crit = this.getCrit();
      const defence = this.getDefences();
      const speed = this.getSpeed();
      Object.entries(stats).forEach(([key, value]: any) => {
        powerLevel += value * (powerPerStat[key] || 0);
      });
      Object.entries(crit).forEach(([key, value]: any) => {
        powerLevel += value * (powerPerStat[key] || 0);
      });
      Object.entries(defence).forEach(([key, value]: any) => {
        powerLevel += value * (powerPerStat[key] || 0);
      });
      Object.entries(speed).forEach(([key, value]: any) => {
        powerLevel += value * (powerPerStat[key] || 0);
      });

      if (this.isEnemy) {
        powerLevel *= 1.2;
      }

      return Math.floor(powerLevel);
    };
  }

  getDodge(): number {
    const agi = this.getStats({ dontUpdateModifiers: true }).agi;
    const dodgeFromAgiMulti = (this.allModifiers?.["dodgeFromAgiP"] || 0) + 0.5;
    const dodge = this.allModifiers?.["dodge"] || 0;
    const dodgeFromAgi = agi * dodgeFromAgiMulti;
    const value = dodge + dodgeFromAgi;
    return Math.max(0, Math.min(90, parseFloat(value.toFixed(1))));
  }

  dodge(): boolean {
    const dodge = this.getDodge();
    const random = Math.random() * 100;
    return random < dodge;
  }

  regen(): void {
    this.regenProc += 1 / 60;
    if (this.regenProc >= 1) {
      this.regenProc = 0;
      this.recoverMana(this.getManaRegen());
    }
  }

  getManaRegen(): number {
    const stats = this.getStats({ dontUpdateModifiers: true });
    const mpRegenMulti = this.allModifiers?.["mpRegenP"] || 1;
    const mpRegenFlat = this.allModifiers?.["mpRegenV"] || 0;
    const mpRegenFromInt = this.allModifiers?.["mpRegenFromIntV"] * stats.int || 0;
    const mpRegenFromSpi = this.allModifiers?.["mpRegenFromSpiV"] * stats.spi || 0;
    return Math.floor((1 + mpRegenFlat + mpRegenFromInt + mpRegenFromSpi) * mpRegenMulti * challenge("mana_regen_debuff"));
  }

  updateAllModifiers(): void {
    this.allModifiers = this.getModifiers();
    this.abilities.forEach((abi: Ability) => {
      abi.updateStats(this);
      if (this instanceof Player) {
        const slot: HTMLDivElement = slots.querySelector(`[data-ability="${abi.id}"]`)!;
        if (slot) {
          updateTooltip(slot, abi.tooltip({ owner: this }));
        }
      }
    });
    this.removeDuplicateAbilities();
  }

  removeDuplicateAbilities(): void {
    const abilities: Ability[] = [];
    this.abilities.forEach((abi: Ability) => {
      const index = abilities.findIndex((a: Ability) => a.id === abi.id);
      if (index === -1) {
        abilities.push(abi);
      }
    });
    this.abilities = abilities;
  }
}
