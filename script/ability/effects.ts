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

const effects: any = {
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
  } as EffectObject,
  burning: {
    id: "burning",
    icon: "gfx/status/flamer.png",
    duration: 6,
    type: "fire",
    inflict: {
      damageFlat: 2,
    },
    modifiers: {
      atkP: -15,
      agiP: -15,
    },
  } as EffectObject,
  dazed: {
    id: "dazed",
    icon: "gfx/status/stoned-skull.png",
    duration: 4,
    type: "stun",
    modifiers: {
      speedP: -1000,
    },
  } as EffectObject,
  regeneration_1: {
    id: "regeneration_1",
    icon: "gfx/status/heart-plus.png",
    duration: 8,
    type: "heal",
    inflict: {
      healingFlat: 5,
    },
  } as EffectObject,
  holy_grace: {
    id: "holy_grace",
    icon: "gfx/status/great-heart.png",
    duration: 6,
    type: "heal",
    inflict: {
      healingPercent: 0.04,
    },
  } as EffectObject,
  attack_1: {
    id: "attack_1",
    icon: "gfx/icons/crossed-swords.png",
    duration: 7.5,
    type: "buff",
    modifiers: {
      atkP: 20,
    },
  } as EffectObject,
};
