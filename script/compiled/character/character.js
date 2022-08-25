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
        };
        this.getSpeed = () => {
            return +(1 *
                (0.4 + this.stats.agi / 100) *
                this.allModifiers.speedP).toFixed(2);
        };
        this.getStats = () => {
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
        this.addStatus = (status) => {
            const index = this.statuses.findIndex((s) => s.id === status.id);
            const effect = new Effect(status);
            if (index === -1) {
                effect.lasts = effect.duration;
                this.statuses.push(new Effect(status));
            }
            else {
                this.statuses[index].lasts = effect.duration;
            }
        };
    }
}
//# sourceMappingURL=character.js.map