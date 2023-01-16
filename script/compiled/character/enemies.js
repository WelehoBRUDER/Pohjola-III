"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var enemies = {
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
            ap: 0
        },
        defences: {
            physical: 0,
            magical: 0,
            elemental: 0
        },
        resistances: {
            fire: 0,
            ice: 25,
            thunder: 0,
            curse: 200,
            poison: 100,
            bleed: 100,
            divine: -50,
            stun: 0
        },
        critRate: 3,
        critPower: 50,
        sprite: "skeleton_type/skeleton_warrior.png",
        abilities: [__assign({}, abilities.physical_attack)],
        loot: [
            {
                gold: [7, 13]
            },
            {
                item: items.bone,
                chance: 0.5,
                amount: [1, 3]
            },
        ],
        xp: 10
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
            ap: 0
        },
        defences: {
            physical: 15,
            magical: 10,
            elemental: 15
        },
        resistances: {
            fire: 0,
            ice: 25,
            thunder: 0,
            curse: 200,
            poison: 100,
            bleed: 100,
            divine: -50,
            stun: 0
        },
        critRate: 3,
        critPower: 50,
        sprite: "skeleton_type/skeleton_brute.png",
        abilities: [__assign({}, abilities.physical_attack)],
        loot: [
            {
                gold: [14, 27]
            },
            {
                item: items.bone,
                chance: 0.75,
                amount: [1, 4]
            },
        ],
        xp: 30
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
            ap: 0
        },
        defences: {
            physical: 20,
            magical: 15,
            elemental: 20
        },
        resistances: {
            fire: 0,
            ice: 25,
            thunder: 0,
            curse: 200,
            poison: 100,
            bleed: 100,
            divine: -50,
            stun: 0
        },
        critRate: 4,
        critPower: 50,
        sprite: "skeleton_type/skeleton_knight.png",
        abilities: [__assign({}, abilities.physical_attack), __assign({}, abilities.disorienting_blow)],
        loot: [
            {
                gold: [28, 61]
            },
            {
                item: items.bone,
                chance: 0.8,
                amount: [2, 6]
            },
        ],
        xp: 100
    },
    skeleton_mage: {
        id: "skeleton_mage",
        name: "Skeleton Mage",
        stats: {
            str: 10,
            vit: 30,
            agi: 0,
            int: 20,
            spi: 10,
            atk: 15,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0
        },
        defences: {
            physical: 5,
            magical: 25,
            elemental: 25
        },
        resistances: {
            fire: 0,
            ice: 25,
            thunder: 0,
            curse: 200,
            poison: 100,
            bleed: 100,
            divine: -50,
            stun: 0
        },
        critRate: 5,
        critPower: 50,
        sprite: "skeleton_type/skeleton_mage.png",
        abilities: [__assign({}, abilities.magical_attack), __assign({}, abilities.flame)],
        loot: [
            {
                gold: [200, 300]
            },
            {
                item: items.bone,
                chance: 1,
                amount: [3, 7]
            },
        ],
        xp: 400
    },
    goblin: {
        id: "goblin",
        name: "Goblin",
        stats: {
            str: 8,
            vit: 20,
            agi: 15,
            int: 0,
            spi: 0,
            atk: 14,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0
        },
        defences: {
            physical: 0,
            magical: 0,
            elemental: 0
        },
        resistances: {
            fire: 0,
            ice: 0,
            thunder: 0,
            curse: 0,
            poison: 50,
            bleed: 0,
            divine: 0,
            stun: 0
        },
        critRate: 8,
        critPower: 50,
        sprite: "greenskin_type/goblin.jpg",
        abilities: [__assign({}, abilities.physical_attack)],
        loot: [
            {
                gold: [27, 53]
            },
        ],
        xp: 90
    },
    orc: {
        id: "orc",
        name: "Orc",
        stats: {
            str: 15,
            vit: 30,
            agi: 10,
            int: 0,
            spi: 0,
            atk: 15,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0
        },
        defences: {
            physical: 10,
            magical: 5,
            elemental: 5
        },
        resistances: {
            fire: 10,
            ice: 0,
            thunder: 10,
            curse: 0,
            poison: 50,
            bleed: 0,
            divine: 0,
            stun: 0
        },
        critRate: 4,
        critPower: 50,
        sprite: "greenskin_type/orc.png",
        abilities: [__assign({}, abilities.physical_attack)],
        loot: [
            {
                gold: [50, 100]
            },
        ],
        xp: 250
    },
    orc_berserker: {
        id: "orc_berserker",
        name: "Orc Berserker",
        stats: {
            str: 20,
            vit: 35,
            agi: 15,
            int: 0,
            spi: 0,
            atk: 25,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0
        },
        defences: {
            physical: 10,
            magical: 5,
            elemental: 5
        },
        resistances: {
            fire: 10,
            ice: 0,
            thunder: 10,
            curse: 0,
            poison: 50,
            bleed: 0,
            divine: 0,
            stun: 0
        },
        critRate: 4,
        critPower: 50,
        sprite: "greenskin_type/orc_berserker.png",
        abilities: [__assign({}, abilities.physical_attack), __assign({}, abilities.battle_aura)],
        loot: [
            {
                gold: [120, 200]
            },
        ],
        xp: 750
    },
    troll: {
        id: "troll",
        name: "Troll",
        stats: {
            str: 30,
            vit: 90,
            agi: 5,
            int: 0,
            spi: 0,
            atk: 20,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0
        },
        defences: {
            physical: 30,
            magical: 25,
            elemental: 10
        },
        resistances: {
            fire: -25,
            ice: 0,
            thunder: 0,
            curse: 0,
            poison: 50,
            bleed: 50,
            divine: 0,
            stun: 50
        },
        critRate: 4,
        critPower: 50,
        sprite: "greenskin_type/troll.jpg",
        abilities: [__assign({}, abilities.physical_attack), __assign({}, abilities.disorienting_blow)],
        loot: [
            {
                gold: [250, 400]
            },
        ],
        spawnWithEffects: [__assign({}, effects.troll_regen)],
        xp: 2000
    },
    minotaur: {
        id: "minotaur",
        name: "Minotaur",
        stats: {
            str: 40,
            vit: 40,
            agi: 10,
            int: 0,
            spi: 0,
            atk: 18,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0
        },
        defences: {
            physical: 35,
            magical: 50,
            elemental: 15
        },
        resistances: {
            fire: -10,
            ice: 25,
            thunder: 0,
            curse: 0,
            poison: 0,
            bleed: 30,
            divine: 0,
            stun: 10
        },
        critRate: 8,
        critPower: 60,
        sprite: "monster_type/minotaur.png",
        abilities: [__assign({}, abilities.physical_attack), __assign({}, abilities.bull_rush), __assign({}, abilities.gore)],
        loot: [
            {
                gold: [175, 290]
            },
        ],
        xp: 950
    },
    minotaur_warrior: {
        id: "minotaur_warrior",
        name: "Minotaur Warrior",
        stats: {
            str: 50,
            vit: 60,
            agi: 5,
            int: 0,
            spi: 0,
            atk: 21,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0
        },
        defences: {
            physical: 35,
            magical: 50,
            elemental: 15
        },
        resistances: {
            fire: -10,
            ice: 25,
            thunder: 0,
            curse: 0,
            poison: 0,
            bleed: 40,
            divine: 0,
            stun: 20
        },
        critRate: 8,
        critPower: 70,
        sprite: "monster_type/minotaur_warrior.png",
        abilities: [__assign({}, abilities.physical_attack), __assign({}, abilities.bull_rush), __assign({}, abilities.gore)],
        loot: [
            {
                gold: [300, 400]
            },
        ],
        xp: 1600
    }
};
//# sourceMappingURL=enemies.js.map