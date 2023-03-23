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
                gold: [7, 13],
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
            atk: 12,
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
                gold: [14, 27],
            },
            {
                item: items.bone,
                chance: 0.75,
                amount: [1, 4],
            },
            {
                item: items.skull,
                chance: 0.1,
                amount: [1, 1],
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
            atk: 16,
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
                gold: [28, 61],
            },
            {
                item: items.bone,
                chance: 0.8,
                amount: [2, 6],
            },
            {
                item: items.skull,
                chance: 0.25,
                amount: [1, 1],
            },
        ],
        xp: 100,
    },
    skeleton_mage: {
        id: "skeleton_mage",
        name: "Skeleton Mage",
        stats: {
            str: 10,
            vit: 30,
            agi: 0,
            int: 30,
            spi: 10,
            atk: 18,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 30,
            magical: 40,
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
            {
                item: items.skull,
                chance: 0.75,
                amount: [1, 2],
            },
        ],
        xp: 400,
    },
    skeleton_lord: {
        id: "skeleton_lord",
        name: "Skeleton Lord",
        stats: {
            str: 20,
            vit: 55,
            agi: 5,
            int: 20,
            spi: 10,
            atk: 23,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 30,
            magical: 40,
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
        critRate: 5,
        critPower: 50,
        sprite: "skeleton_type/skeleton_lord.png",
        abilities: [{ ...abilities.physical_attack }, { ...abilities.magical_attack }, { ...abilities.flame }],
        loot: [
            {
                gold: [400, 500],
            },
            {
                item: items.bone,
                chance: 1,
                amount: [5, 10],
            },
            {
                item: items.skull,
                chance: 1,
                amount: [1, 1],
            },
        ],
        xp: 400,
        spawnWithEffects: [{ ...effects.lordly_presence }, { ...effects.boss_effect }],
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
            atk: 16,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 5,
            magical: 5,
            elemental: 0,
        },
        resistances: {
            fire: 0,
            ice: 0,
            thunder: 0,
            curse: 0,
            poison: 50,
            bleed: 0,
            divine: 0,
            stun: 0,
        },
        critRate: 8,
        critPower: 50,
        sprite: "greenskin_type/goblin.jpg",
        abilities: [{ ...abilities.physical_attack }],
        loot: [
            {
                gold: [27, 53],
            },
            {
                item: items.scrap,
                chance: 0.75,
                amount: [1, 3],
            },
        ],
        xp: 90,
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
            atk: 23,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 15,
            magical: 5,
            elemental: 5,
        },
        resistances: {
            fire: 10,
            ice: 0,
            thunder: 10,
            curse: 0,
            poison: 50,
            bleed: 0,
            divine: 0,
            stun: 0,
        },
        critRate: 4,
        critPower: 50,
        sprite: "greenskin_type/orc.png",
        abilities: [{ ...abilities.physical_attack }],
        loot: [
            {
                gold: [50, 100],
            },
            {
                item: items.scrap,
                chance: 0.75,
                amount: [2, 5],
            },
            {
                item: items.orc_tusk,
                chance: 0.5,
                amount: [1, 1],
            },
        ],
        xp: 250,
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
            atk: 36,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 20,
            magical: 5,
            elemental: 5,
        },
        resistances: {
            fire: 10,
            ice: 0,
            thunder: 10,
            curse: 0,
            poison: 50,
            bleed: 0,
            divine: 0,
            stun: 0,
        },
        critRate: 4,
        critPower: 50,
        sprite: "greenskin_type/orc_berserker.png",
        abilities: [{ ...abilities.physical_attack }, { ...abilities.battle_aura }],
        loot: [
            {
                gold: [120, 200],
            },
            {
                item: items.scrap,
                chance: 0.7,
                amount: [2, 5],
            },
            {
                item: items.orc_tusk,
                chance: 0.7,
                amount: [1, 2],
            },
        ],
        xp: 750,
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
            atk: 38,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 40,
            magical: 20,
            elemental: 25,
        },
        resistances: {
            fire: -25,
            ice: 0,
            thunder: 0,
            curse: 0,
            poison: 50,
            bleed: 50,
            divine: 0,
            stun: 25,
        },
        critRate: 4,
        critPower: 50,
        sprite: "greenskin_type/troll.jpg",
        abilities: [{ ...abilities.physical_attack }, { ...abilities.disorienting_blow }],
        loot: [
            {
                gold: [250, 400],
            },
            {
                item: items.troll_fat,
                chance: 1,
                amount: [1, 4],
            },
            {
                item: items.troll_fang,
                chance: 0.3,
                amount: [1, 1],
            },
        ],
        spawnWithEffects: [{ ...effects.troll_regen }],
        xp: 2000,
    },
    orc_chieftain: {
        id: "orc_chieftain",
        name: "Orc Chieftain",
        stats: {
            str: 40,
            vit: 80,
            agi: 15,
            int: 0,
            spi: 0,
            atk: 37,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 60,
            magical: 40,
            elemental: 40,
        },
        resistances: {
            fire: -15,
            ice: 0,
            thunder: 0,
            curse: 0,
            poison: 0,
            bleed: 0,
            divine: 0,
            stun: 0,
        },
        critRate: 4,
        critPower: 50,
        sprite: "greenskin_type/orc_chieftain.png",
        abilities: [{ ...abilities.physical_attack }, { ...abilities.bull_rush }, { ...abilities.sharp_strike }],
        loot: [
            {
                gold: [500, 800],
            },
            {
                item: items.troll_fat,
                chance: 1,
                amount: [1, 4],
            },
            {
                item: items.troll_fang,
                chance: 0.3,
                amount: [1, 1],
            },
        ],
        spawnWithEffects: [{ ...effects.lordly_presence }, { ...effects.boss_effect }],
        xp: 3000,
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
            atk: 30,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 55,
            magical: 35,
            elemental: 15,
        },
        resistances: {
            fire: -10,
            ice: 25,
            thunder: 0,
            curse: 0,
            poison: 0,
            bleed: 30,
            divine: 0,
            stun: 10,
        },
        critRate: 8,
        critPower: 60,
        sprite: "monster_type/minotaur.png",
        abilities: [{ ...abilities.physical_attack }, { ...abilities.bull_rush }, { ...abilities.gore }],
        loot: [
            {
                gold: [175, 290],
            },
            {
                item: items.minotaur_horns,
                chance: 0.5,
                amount: [1, 1],
            },
            {
                item: items.minotaur_hide,
                chance: 0.25,
                amount: [1, 1],
            },
        ],
        xp: 950,
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
            atk: 35,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 55,
            magical: 40,
            elemental: 20,
        },
        resistances: {
            fire: -10,
            ice: 25,
            thunder: 0,
            curse: 0,
            poison: 0,
            bleed: 40,
            divine: 0,
            stun: 20,
        },
        critRate: 8,
        critPower: 70,
        sprite: "monster_type/minotaur_warrior.png",
        abilities: [{ ...abilities.physical_attack }, { ...abilities.bull_rush }, { ...abilities.gore }],
        loot: [
            {
                gold: [300, 400],
            },
            {
                item: items.minotaur_horns,
                chance: 0.75,
                amount: [1, 1],
            },
            {
                item: items.minotaur_hide,
                chance: 0.33,
                amount: [1, 1],
            },
        ],
        xp: 1600,
    },
    minotaur_sage: {
        id: "minotaur_sage",
        name: "Minotaur Sage",
        stats: {
            str: 25,
            vit: 15,
            agi: 10,
            int: 60,
            spi: 20,
            atk: 20,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 25,
            magical: 50,
            elemental: 30,
        },
        resistances: {
            fire: -10,
            ice: 25,
            thunder: 0,
            curse: 0,
            poison: 0,
            bleed: 40,
            divine: 0,
            stun: 10,
        },
        critRate: 8,
        critPower: 70,
        sprite: "monster_type/minotaur_sage.png",
        abilities: [
            { ...abilities.magical_attack },
            { ...abilities.fireball },
            { ...abilities.ice_bolt },
            { ...abilities.regeneration_spell },
        ],
        loot: [
            {
                gold: [400, 500],
            },
            {
                item: items.minotaur_horns,
                chance: 0.8,
                amount: [1, 2],
            },
            {
                item: items.minotaur_hide,
                chance: 0.5,
                amount: [1, 2],
            },
        ],
        spawnWithEffects: [{ ...effects.enchanted_body }],
        xp: 2500,
    },
    minotaur_captain: {
        id: "minotaur_captain",
        name: "Minotaur Captain",
        stats: {
            str: 60,
            vit: 100,
            agi: 5,
            int: 0,
            spi: 0,
            atk: 40,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 50,
            magical: 50,
            elemental: 40,
        },
        resistances: {
            fire: -10,
            ice: 25,
            thunder: 0,
            curse: 0,
            poison: 0,
            bleed: 0,
            divine: 0,
            stun: 0,
        },
        critRate: 8,
        critPower: 70,
        sprite: "monster_type/minotaur_captain.png",
        abilities: [
            { ...abilities.physical_attack },
            { ...abilities.bull_rush },
            { ...abilities.gore },
            { ...abilities.bull_rage },
        ],
        loot: [
            {
                gold: [1200, 1800],
            },
            {
                item: items.minotaur_horns,
                chance: 1,
                amount: [1, 2],
            },
            {
                item: items.minotaur_hide,
                chance: 1,
                amount: [2, 4],
            },
            {
                item: items.minotaur_skull,
                chance: 0.5,
                amount: [1, 1],
            },
        ],
        spawnWithEffects: [{ ...effects.boss_effect }],
        xp: 5000,
    },
    minotaur_king: {
        id: "minotaur_king",
        name: "Minotaur King",
        stats: {
            str: 70,
            vit: 150,
            agi: 5,
            int: 20,
            spi: 30,
            atk: 43,
            hp: 0,
            mp: 0,
            hpMax: 0,
            mpMax: 0,
            ap: 0,
        },
        defences: {
            physical: 50,
            magical: 50,
            elemental: 40,
        },
        resistances: {
            fire: -10,
            ice: 25,
            thunder: 0,
            curse: 0,
            poison: 0,
            bleed: 0,
            divine: 0,
            stun: 0,
        },
        critRate: 8,
        critPower: 70,
        sprite: "monster_type/minotaur_king.png",
        abilities: [
            { ...abilities.physical_attack },
            { ...abilities.bull_rush },
            { ...abilities.gore },
            { ...abilities.fireball },
            { ...abilities.bull_rage },
        ],
        loot: [
            {
                gold: [4000, 7000],
            },
            {
                item: items.minotaur_horns,
                chance: 1,
                amount: [2, 2],
            },
            {
                item: items.minotaur_hide,
                chance: 1,
                amount: [3, 5],
            },
            {
                item: items.minotaur_skull,
                chance: 1,
                amount: [1, 1],
            },
        ],
        spawnWithEffects: [{ ...effects.king_aura }, { ...effects.boss_effect }],
        xp: 10000,
    },
};
//# sourceMappingURL=enemies.js.map