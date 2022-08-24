"use strict";
const enemies = {
    skeleton: {
        id: "skeleton",
        name: "Skeleton",
        stats: {
            str: 5,
            vit: 5,
            agi: 0,
            int: 0,
            spi: 0,
            hp: 5,
            mp: 5,
            hpMax: 5,
            mpMax: 5,
            ap: 0,
        },
        damages: {
            physical: 4,
        },
        defences: {
            physical: 10,
            magical: 10,
            elemental: 10,
        },
        resistances: {
            fire: 0,
            ice: 0,
            thunder: 0,
            curse: 100,
            poison: 200,
            divine: -50,
        },
        sprite: "skeleton_knight/idle.png",
        abilities: [new Ability(abilities.sharp_strike)],
    },
};
//# sourceMappingURL=enemies.js.map