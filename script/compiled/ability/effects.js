"use strict";
/* Possible effect types */
const effect_types = [
    "curse",
    "divine",
    "fire",
    "ice",
    "poison",
    "thunder",
    "bleed",
    "stun",
    "heal",
];
// ability_sharp_strike: {
//   // This is a nested object to demonstrate how abilities can be modified using effects
//   powerV: 0.25,
//   penetrationV: 0.05,
//   cooldownP: -10,
//   effect_wounded: {
//     durationP: 10,
//   },
// },
const effects = {
    wounded: {
        id: "wounded",
        icon: "gfx/status/blood.png",
        duration: 6,
        type: "bleed",
        inflict: {
            damagePercent: 0.05,
        },
        modifiers: {
            atkP: -10,
            strP: -10,
            agiP: -10,
        },
    },
    burning: {
        id: "burning",
        icon: "gfx/status/flamer.png",
        duration: 8,
        type: "fire",
        inflict: {
            damageFlat: 4,
        },
        modifiers: {
            atkP: -15,
            agiP: -15,
        },
    },
    dazed: {
        id: "dazed",
        icon: "gfx/status/stoned-skull.png",
        duration: 5,
        type: "stun",
        modifiers: {
            speedP: -1000,
        },
    },
    regeneration_1: {
        id: "regeneration_1",
        icon: "gfx/status/heart-plus.png",
        duration: 6,
        type: "heal",
        inflict: {
            healingPercent: 0.05,
        },
    },
};
//# sourceMappingURL=effects.js.map