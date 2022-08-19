"use strict";
class Character {
    constructor(char) {
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
            return +(1 *
                (1 + this.stats.agi / 100) *
                this.allModifiers.speedP).toFixed(2);
        };
        this.updateAllModifiers();
    }
}
//# sourceMappingURL=character.js.map