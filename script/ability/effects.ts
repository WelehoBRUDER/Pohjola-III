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
  } as EffectObject,
  poison_1: {
    id: "poison_1",
    icon: "gfx/status/poison-gas.png",
    duration: 18,
    type: "poison",
    buffDebuff: "debuff",
    inflict: {
      damageFlat: 2,
      damagePercent: 0.02,
    },
    modifiers: {
      healPowerP: -50,
    },
  } as EffectObject,
  gored: {
    id: "gored",
    icon: "gfx/status/blood.png",
    duration: 7,
    type: "bleed",
    buffDebuff: "debuff",
    inflict: {
      damagePercent: 0.02,
    },
  } as EffectObject,
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
      healReceivedP: -33,
    },
  } as EffectObject,
  burning_2: {
    id: "burning_2",
    icon: "gfx/status/flamer.png",
    duration: 7,
    type: "fire",
    buffDebuff: "debuff",
    inflict: {
      damagePercent: 0.04,
    },
    modifiers: {
      damageP: -20,
      critRateV: -10,
      healReceivedP: -50,
    },
  } as EffectObject,
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
      healReceivedP: -25,
    },
  } as EffectObject,
  dazed: {
    id: "dazed",
    icon: "gfx/status/stoned-skull.png",
    duration: 4,
    type: "stun",
    buffDebuff: "debuff",
    modifiers: {
      speedP: -100,
      healReceivedP: -75,
    },
  } as EffectObject,
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
      healReceivedP: -50,
    },
  } as EffectObject,
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
      healReceivedP: -40,
    },
  } as EffectObject,
  regeneration_1: {
    id: "regeneration_1",
    icon: "gfx/status/heart-plus.png",
    duration: 8,
    type: "heal",
    buffDebuff: "buff",
    inflict: {
      healingFlat: 5,
    },
  } as EffectObject,
  regeneration_2: {
    id: "regeneration_2",
    icon: "gfx/status/heart-plus.png",
    duration: 8,
    type: "heal",
    buffDebuff: "buff",
    inflict: {
      healingFlat: 10,
      healingPercent: 0.03,
    },
  } as EffectObject,
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
  } as EffectObject,
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
  } as EffectObject,
  king_aura: {
    id: "king_aura",
    icon: "gfx/icons/totem-head.png",
    duration: 0,
    isInfinite: true,
    type: "heal",
    buffDebuff: "buff",
    inflict: {
      healingFlat: 5,
    },
    modifiers: {
      healReceivedP: 10,
      mpRegenV: 2,
    },
  } as EffectObject,
  enchanted_body: {
    id: "enchanted_body",
    icon: "gfx/icons/totem-head.png",
    duration: 0,
    isInfinite: true,
    type: "buff",
    buffDebuff: "buff",
    modifiers: {
      healReceivedP: 10,
      hpMaxFromIntV: 2.5,
      hpMaxFromSpiV: 2.5,
      mpRegenFromIntV: 0.02,
      spellPowerP: -15,
    },
  } as EffectObject,
  boss_effect: {
    id: "boss_effect",
    icon: "gfx/icons/brute.png",
    duration: 0,
    isInfinite: true,
    type: "buff",
    buffDebuff: "buff",
    modifiers: {
      stunResistanceV: 50,
      bleedResistanceV: 50,
      poisonResistanceV: 50,
    },
  } as EffectObject,
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
  } as EffectObject,
  attack_1: {
    id: "attack_1",
    icon: "gfx/icons/crossed-swords.png",
    duration: 7.5,
    type: "buff",
    buffDebuff: "buff",
    modifiers: {
      damageP: 10,
    },
  } as EffectObject,
  haste_1: {
    id: "haste_1",
    icon: "gfx/icons/running-ninja.png",
    duration: 7,
    type: "buff",
    buffDebuff: "buff",
    modifiers: {
      speedP: 10,
      dodgeV: 10,
    },
  } as EffectObject,
  bull_rage: {
    id: "bull_rage",
    icon: "gfx/status/absolute_berserk.png",
    duration: 18,
    type: "heal",
    buffDebuff: "buff",
    inflict: {
      healingPercent: 0.03,
    },
    modifiers: {
      speedP: 20,
      damageP: 20,
      hpMaxP: 20,
      physicalDefenceV: -30,
      magicalDefenceV: -30,
      elementalDefenceV: -30,
    },
  } as EffectObject,
} as const;
