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
        this.getModifiers = () => {
            return getAllModifiers(this);
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
        this.restore = () => {
            const { hpMax, mpMax } = this.getStats();
            this.stats.hp = hpMax;
            this.stats.mp = mpMax;
        };
        this.updateAllModifiers();
    }
}
//# sourceMappingURL=character.js.map