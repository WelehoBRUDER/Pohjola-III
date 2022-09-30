"use strict";
const enemies = {
    skeleton: {
        id: "skeleton",
        name: "Skeleton",
        stats: {
            str: 5,
            vit: 5,
            agi: 0,
            int: 5,
            spi: 0,
            atk: 5,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 0,
            magical: 0,
            elemental: 0,
        },
        resistances: {
            fire: 0,
            ice: 25,
            thunder: 0,
            curse: 200,
            poison: 100,
            bleed: 100,
            divine: -50,
            stun: 0,
        },
        critRate: 3,
        critPower: 50,
        sprite: "skeleton_type/skeleton_warrior.png",
        abilities: [{ ...abilities.physical_attack }],
        loot: [
            {
                gold: [1, 5],
            },
            {
                item: items.bone,
                chance: 0.5,
                amount: [1, 3],
            },
        ],
        xp: 10,
    },
    skeleton_brute: {
        id: "skeleton_brute",
        name: "Skeleton Brute",
        stats: {
            str: 10,
            vit: 10,
            agi: -5,
            int: 0,
            spi: 0,
            atk: 10,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 15,
            magical: 10,
            elemental: 15,
        },
        resistances: {
            fire: 0,
            ice: 25,
            thunder: 0,
            curse: 200,
            poison: 100,
            bleed: 100,
            divine: -50,
            stun: 0,
        },
        critRate: 3,
        critPower: 50,
        sprite: "skeleton_type/skeleton_brute.png",
        abilities: [{ ...abilities.physical_attack }],
        loot: [
            {
                gold: [5, 10],
            },
            {
                item: items.bone,
                chance: 0.75,
                amount: [1, 4],
            },
        ],
        xp: 30,
    },
    skeleton_knight: {
        id: "skeleton_knight",
        name: "Skeleton Knight",
        stats: {
            str: 10,
            vit: 20,
            agi: -10,
            int: 0,
            spi: 0,
            atk: 15,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 20,
            magical: 15,
            elemental: 20,
        },
        resistances: {
            fire: 0,
            ice: 25,
            thunder: 0,
            curse: 200,
            poison: 100,
            bleed: 100,
            divine: -50,
            stun: 0,
        },
        critRate: 4,
        critPower: 50,
        sprite: "skeleton_type/skeleton_knight.png",
        abilities: [{ ...abilities.physical_attack }, { ...abilities.disorienting_blow }],
        loot: [
            {
                gold: [30, 50],
            },
            {
                item: items.bone,
                chance: 0.8,
                amount: [2, 6],
            },
        ],
        xp: 100,
    },
    skeleton_mage: {
        id: "skeleton_mage",
        name: "Skeleton Mage",
        stats: {
            str: 10,
            vit: 25,
            agi: 0,
            int: 20,
            spi: 10,
            atk: 15,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 5,
            magical: 25,
            elemental: 25,
        },
        resistances: {
            fire: 0,
            ice: 25,
            thunder: 0,
            curse: 200,
            poison: 100,
            bleed: 100,
            divine: -50,
            stun: 0,
        },
        critRate: 5,
        critPower: 50,
        sprite: "skeleton_type/skeleton_mage.png",
        abilities: [{ ...abilities.magical_attack }, { ...abilities.flame }],
        loot: [
            {
                gold: [200, 300],
            },
            {
                item: items.bone,
                chance: 1,
                amount: [3, 7],
            },
        ],
        xp: 400,
    },
};
//# sourceMappingURL=enemies.js.map