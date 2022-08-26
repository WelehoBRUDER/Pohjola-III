"use strict";
class Character {
    constructor(char) {
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
        this.updateAllModifiers = () => {
            this.allModifiers = this.getModifiers();
            this.abilities.forEach((abi) => {
                abi.updateStats(this);
                if (this.id === "player") {
                    const slot = slots.querySelector(`[data-ability="${abi.id}"]`);
                    if (slot) {
                        updateTooltip(slot, abi.tooltip({ owner: this }));
                    }
                }
            });
        };
        this.getSpeed = () => {
            return +(1 *
                (0.4 + this.stats.agi / 100) *
                this.allModifiers.speedP).toFixed(2);
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
                    damage = Math.round(this.getStats({ dontUpdateModifiers: true }).hpMax *
                        values.damagePercent);
                if (values?.damageFlat)
                    damage += values.damageFlat;
                if (this.isEnemy) {
                    this.harm(damage);
                }
                else
                    this.stats.hp -= damage;
                const location = this.isEnemy ? this.card.main : tools;
                createDroppingText(damage.toString(), location, status.type);
            }
            else if (values?.healingFlat || values?.healingPercent) {
                let healing = 0;
                if (values?.healingPercent)
                    healing = Math.round(this.getStats({ dontUpdateModifiers: true }).hpMax *
                        values.healingPercent);
                if (values?.healingFlat)
                    healing += values.healingFlat;
                if (this.isEnemy) {
                    this.heal(healing);
                }
                else
                    this.stats.hp += healing;
                const location = this.isEnemy ? this.card.main : tools;
                createDroppingText(healing.toString(), location, status.type);
            }
        };
    }
}
//# sourceMappingURL=character.js.map