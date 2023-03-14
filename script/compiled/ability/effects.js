"use strict";
/* Possible effect types */
const effect_types = ["curse", "divine", "fire", "ice", "poison", "thunder", "bleed", "stun", "heal"];
// ability_sharp_strike: {
//   // This is a nested object to demonstrate how abilities can be modified using effects
//   powerV: 0.25,
//   penetrationV: 0.05,
//   cooldownP: -10,
//   effect_wounded: {
//     durationP: 10,
//   },
// },
// type ImportantObject<T> = {
//   id: T;
//   important_data: "something";
//   important_data2: 5;
// };
// type ImportantObjects<T> = {
//   [K in keyof T]: ImportantObject<K>;
// };
// const important_objects: ImportantObjects<{ a: string; b: string; c: string }> = {
//   a: {
//     id: "a",
//     important_data: "something",
//     important_data2: 5,
//   },
//   b: {
//     id: "b",
//     important_data: "something",
//     important_data2: 5,
//   },
//   c: {
//     id: "c",
//     important_data: "something",
//     important_data2: 5,
//   },
// };
// const differentObject = {
//   id: "a",
// };
// const important_object = important_objects[differentObject.id];
const effects = {
    wounded: {
        id: "wounded",
        icon: "gfx/status/blood.png",
        duration: 6,
        type: "bleed",
        buffDebuff: "debuff",
        inflict: {
            damagePercent: 0.05,
        },
        modifiers: {
            atkP: -10,
            strP: -10,
            agiP: -10,
        },
    },
    gored: {
        id: "gored",
        icon: "gfx/status/blood.png",
        duration: 7,
        type: "bleed",
        buffDebuff: "debuff",
        inflict: {
            damagePercent: 0.02,
        },
    },
    burning: {
        id: "burning",
        icon: "gfx/status/flamer.png",
        duration: 6,
        type: "fire",
        buffDebuff: "debuff",
        inflict: {
            damageFlat: 2,
        },
        modifiers: {
            atkP: -15,
            agiP: -15,
        },
    },
    frozen: {
        id: "frozen",
        icon: "gfx/status/snowflake-2.png",
        duration: 5,
        type: "ice",
        buffDebuff: "debuff",
        inflict: {
            damageFlat: 3,
        },
        modifiers: {
            speedP: -50,
        },
    },
    dazed: {
        id: "dazed",
        icon: "gfx/status/stoned-skull.png",
        duration: 4,
        type: "stun",
        buffDebuff: "debuff",
        modifiers: {
            speedP: -100,
        },
    },
    stunned: {
        id: "stunned",
        icon: "gfx/status/stoned-skull.png",
        duration: 7,
        type: "stun",
        buffDebuff: "debuff",
        modifiers: {
            speedP: -30,
            atkP: -15,
            physicalDefenceV: -15,
        },
    },
    binding_thorns: {
        id: "binding_thorns",
        icon: "gfx/abilities/light-thorny-triskelion.png",
        duration: 8,
        type: "stun",
        buffDebuff: "debuff",
        modifiers: {
            agiP: -55,
            speedP: -25,
            physicalDefenceV: -10,
            magicalDefenceV: -10,
            elementalDefenceV: -10,
        },
    },
    regeneration_1: {
        id: "regeneration_1",
        icon: "gfx/status/heart-plus.png",
        duration: 8,
        type: "heal",
        buffDebuff: "buff",
        inflict: {
            healingFlat: 5,
        },
    },
    holy_grace: {
        id: "holy_grace",
        icon: "gfx/status/great-heart.png",
        duration: 6,
        type: "heal",
        buffDebuff: "buff",
        inflict: {
            healingPercent: 0.04,
            healingFlat: 10,
        },
    },
    lordly_presence: {
        id: "lordly_presence",
        icon: "gfx/icons/totem-head.png",
        duration: 0,
        isInfinite: true,
        type: "heal",
        buffDebuff: "buff",
        inflict: {
            healingFlat: 1,
        },
        modifiers: {
            mpRegenV: 1,
        },
    },
    boss_effect: {
        id: "boss_effect",
        icon: "gfx/icons/brute.png",
        duration: 0,
        isInfinite: true,
        type: "heal",
        buffDebuff: "buff",
        modifiers: {
            stunResistanceV: 20,
            bleedResistanceV: 20,
            poisonResistanceV: 20,
        },
    },
    troll_regen: {
        id: "troll_regen",
        icon: "gfx/status/great-heart.png",
        duration: 0,
        isInfinite: true,
        type: "heal",
        buffDebuff: "buff",
        inflict: {
            healingPercent: 0.01,
        },
    },
    attack_1: {
        id: "attack_1",
        icon: "gfx/icons/crossed-swords.png",
        duration: 7.5,
        type: "buff",
        buffDebuff: "buff",
        modifiers: {
            damageP: 10,
        },
    },
};
//# sourceMappingURL=effects.js.map