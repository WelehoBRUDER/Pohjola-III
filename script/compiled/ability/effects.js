"use strict";
/* Possible effect types */
const effect_types = ["curse", "poison", "bleed", "stun", "heal"];
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
};
//# sourceMappingURL=effects.js.map