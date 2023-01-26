"use strict";
class Character {
    name;
    stats;
    defences;
    resistances;
    abilities;
    critRate;
    critPower;
    traits;
    statuses;
    perks;
    skills;
    allModifiers;
    dead;
    getDamage;
    getDefences;
    addStatus;
    getSpellPower;
    calculateCombatPower;
    constructor(char) {
        this.id = char.id;
        this.name = char.name;
        this.stats = { ...char.stats };
        this.defences = { ...char.defences };
        this.resistances = { ...char.resistances };
        this.abilities = char.abilities.map((abi) => new Ability(abi));
        this.traits = char.traits ? [...char.traits] : [];
        this.statuses = char.statuses ? [...char.statuses] : [];
        this.perks = char.perks ? [...char.perks] : [];
        this.skills = char.skills ? [...char.skills.map((ski) => new Skill(ski))] : [];
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
                let modifier = this.allModifiers[key + "DefenceP"] ?? 1;
                let boost = this.allModifiers[key + "DefenceV"] ?? 0;
                modifier += this.allModifiers["defenceP"] ?? 0;
                boost += this.allModifiers["defenceV"] ?? 0;
                boost += ((this.level - 1) | 0) * 0.15; // Level resistance boost
                if (this.equipment) {
                    Object.entries(this.equipment).forEach(([slot, item]) => {
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
            const mods = {};
            Object.entries(this.allModifiers).forEach(([key, value]) => {
                if (key.startsWith("ability_")) {
                    key = key.replace("ability_", "");
                    if (mods[key]) {
                        Object.entries(value).forEach(([k, v]) => {
                            mods[key][k] = v;
                        });
                    }
                    else {
                        mods[key] = value;
                    }
                }
            });
            return mods;
        };
        this.getSpellPower = () => {
            const stats = this.getStats({ dontUpdateModifiers: true });
            if (this instanceof Enemy) {
                return (60 + stats.int + stats.atk / 2) / 100;
            }
            else {
                if (this.equipment?.weapon?.spell_scale) {
                    return this.equipment.weapon.getSpellScale() / 100;
                }
                else
                    return (50 + stats.atk / 2 + stats.int / 2) / 100;
            }
        };
        this.getSpeed = () => {
            let base = 0.4;
            if (this.equipment)
                base += this.getEquipmentSpeed();
            const speed = +(1 * (base + this.getStats({ dontUpdateModifiers: true }).agi / 100) * this.allModifiers.speedP).toFixed(2);
            return speed > 0 ? speed : 0;
        };
        this.getEquipmentSpeed = () => {
            let speed = 0;
            if (this.equipment) {
                Object.values(this.equipment).forEach((equip) => {
                    speed += equip?.speed || 0;
                });
            }
            return speed / 100;
        };
        this.getStats = (options) => {
            if (!options?.dontUpdateModifiers)
                this.updateAllModifiers();
            const stats = { ...this.stats };
            Object.entries(stats).forEach(([key, value]) => {
                if (key.startsWith("hp") || key.startsWith("mp"))
                    return;
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
            // Calculate max mp
            const mpIncrease = this.allModifiers["mpMaxV"] ?? 0;
            const mpModifier = this.allModifiers["mpMaxP"] ?? 1;
            const mpBoost = ((this.level - 1) | 0) * 0.5; // Level mana boost
            stats["mpMax"] = Math.round((stats["mpMax"] + mpBoost + mpIncrease + stats["int"] * 2 + stats["spi"] * 2) * mpModifier);
            return stats;
        };
        this.getCrit = () => {
            const crit = { critRate: this.critRate, critPower: this.critPower };
            Object.entries(crit).forEach(([key, value]) => {
                const increase = this.allModifiers[key + "V"] ?? 0;
                crit[key] = value + increase;
            });
            crit["critRate"] += this.getStats().agi / 5;
            return crit;
        };
        this.restore = () => {
            const { hpMax, mpMax } = this.getStats();
            this.stats.hp = hpMax;
            this.stats.mp = mpMax;
        };
        this.updateAllModifiers();
        this.getDamage = () => {
            return this.getStats().atk;
        };
        this.addStatus = (status, user, key) => {
            const index = this.statuses.findIndex((s) => s.id === status.id);
            const effect = new Effect(status);
            if (index === -1) {
                effect.init(user.allModifiers?.[key]?.["effect_" + status.id]);
                effect.lasts = effect.duration;
                effect.inflictTimer = 0;
                this.statuses.push(effect);
            }
            else {
                effect.init(user.allModifiers?.[key]?.["effect_" + status.id]);
                this.statuses[index].lasts = effect.duration;
            }
            this.updateAllModifiers();
        };
        this.inflict = (status) => {
            const values = status.inflict;
            if (values?.damagePercent || values?.damageFlat) {
                let damage = 0;
                if (values?.damagePercent)
                    damage = Math.round(this.getStats({ dontUpdateModifiers: true }).hpMax * values.damagePercent);
                if (values?.damageFlat)
                    damage += values.damageFlat;
                const resist = this.getResistances()[status.type];
                damage = Math.round(damage * (1 - resist / 100)); // This can actually heal the target
                const location = this.isEnemy ? this.card.main : tools;
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
                    }
                    else {
                        this.stats.hp -= damage;
                        stats.total_damage_taken += damage;
                        if (stats.most_damage_taken < damage) {
                            stats.most_damage_taken = damage;
                        }
                    }
                    createDroppingText(damage.toString(), location, status.type);
                }
                else if (damage < 0) {
                    damage = Math.abs(damage);
                    if (this.isEnemy) {
                        this.heal(damage);
                    }
                    else {
                        this.stats.hp += damage;
                        stats.total_healing += damage;
                    }
                    createDroppingText(damage.toString(), location, "heal");
                }
            }
            else if (values?.healingFlat || values?.healingPercent) {
                let healing = 0;
                if (values?.healingPercent)
                    healing = Math.round(this.getStats({ dontUpdateModifiers: true }).hpMax * values.healingPercent);
                if (values?.healingFlat)
                    healing += values.healingFlat;
                if (this.isEnemy) {
                    this.heal(healing);
                }
                else {
                    this.stats.hp += healing;
                    stats.total_healing += healing;
                }
                const location = this.isEnemy ? this.card.main : tools;
                createDroppingText(healing.toString(), location, status.type);
            }
        };
        // Calculate a rough power level of an enemy / the player
        // IT'S OVER 9000!
        this.calculateCombatPower = () => {
            const powerPerStat = {
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
            let powerLevel = 0;
            const stats = this.getStats();
            const crit = this.getCrit();
            const defence = this.getDefences();
            const speed = this.getSpeed();
            Object.entries(stats).forEach(([key, value]) => {
                powerLevel += value * (powerPerStat[key] || 0);
            });
            Object.entries(crit).forEach(([key, value]) => {
                powerLevel += value * (powerPerStat[key] || 0);
            });
            Object.entries(defence).forEach(([key, value]) => {
                powerLevel += value * (powerPerStat[key] || 0);
            });
            Object.entries(speed).forEach(([key, value]) => {
                powerLevel += value * (powerPerStat[key] || 0);
            });
            if (this.isEnemy) {
                powerLevel *= 1.2;
            }
            return Math.floor(powerLevel);
        };
    }
    updateAllModifiers() {
        this.allModifiers = this.getModifiers();
        this.abilities.forEach((abi) => {
            abi.updateStats(this);
            if (this instanceof Player) {
                const slot = slots.querySelector(`[data-ability="${abi.id}"]`);
                if (slot) {
                    updateTooltip(slot, abi.tooltip({ owner: this }));
                }
            }
        });
        this.removeDuplicateAbilities();
    }
    removeDuplicateAbilities() {
        const abilities = [];
        this.abilities.forEach((abi) => {
            const index = abilities.findIndex((a) => a.id === abi.id);
            if (index === -1) {
                abilities.push(abi);
            }
        });
        this.abilities = abilities;
    }
}
//# sourceMappingURL=character.js.map