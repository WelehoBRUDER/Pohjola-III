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
                this.allModifiers.speed).toFixed(2);
        };
        this.updateAllModifiers();
    }
}
const player = new Character({
    id: "player",
    name: "Player",
    stats: {
        vit: 10,
        agi: 10,
        int: 10,
        spi: 10,
        hp: 10,
        mp: 10,
        hpMax: 10,
        mpMax: 10,
    },
    defences: {
        physical: 10,
        magical: 10,
        elemental: 10,
    },
    resistances: {
        fire: 10,
        ice: 10,
        thunder: 10,
        curse: 10,
        poison: 10,
        divine: 10,
    },
    traits: [],
    statuses: [],
    perks: [],
});
//# sourceMappingURL=character.js.map