const statusEffects = {
  "strengthI": {
    id: "strengthI",
    name: "Strength I",
    lastFor: 12,
    effects: {
      strV: 10,
      physicalDamageP: 18
    },
    effectType: "power",
    img: "gfx/status/biceps.png"
  },
  "warriorI": {
    id: "warriorI",
    name: "Battle Stance I",
    lastFor: 14,
    effects: {
      physicalDamageP: 15,
      physicalArmorP: 15,
      stunResistV: 10
    },
    effectType: "power",
    img: "gfx/status/battle-gear.png"
  },
  "bleedI": {
    id: "bleedI",
    name: "Bleed I",
    lastFor: 3,
    effects: {
      agiV: -5,
      stunResistP: -15
    },
    effectType: "bleeding",
    img: "gfx/status/blood.png",
    damageOT: 3,
    hasDamaged: 0,
  },
  "burningI": {
    id: "burningI",
    name: "Burning I",
    lastFor: 4,
    effects: {
      strV: -3,
      elementalArmorP: -25,
      freezingResistP: 20
    },
    effectType: "burning",
    img: "gfx/status/flamer.png",
    damageOT: 4,
    hasDamaged: 0,
  },
  "berserk": {
    id: "berserk",
    name: "Berserk",
    lastFor: 17,
    effects: {
      attackP: 25,
      actionFillP: 15,
      defenseP: -50
    },
    effectType: "power",
    img: "gfx/status/flamer.png",
    damageOT: 1,
    hasDamaged: 0,
  },
  "stunI": {
    id: "stunI",
    name: "Stun I",
    lastFor: 4,
    effectType: "stun",
    img: "gfx/status/stoned-skull.png",
    effects: {
      actionFillP: -1000
    },
    hasDamaged: 0,
  },
  "regenI": {
    id: "regenI",
    name: "Regeneration I",
    lastFor: 10,
    effectType: "regen",
    img: "gfx/status/heart-plus.png",
    damageOT: -2,
    hasDamaged: 0,
  },
  "regenII": {
    id: "regenII",
    name: "Regeneration II",
    lastFor: 8,
    effectType: "regen",
    img: "gfx/status/heart-plus.png",
    damageOT: -5,
    hasDamaged: 0,
  },
  "wardI": {
    id: "wardI",
    name: "Warding I",
    lastFor: 10,
    effectType: "defense",
    img: "gfx/status/ward.png",
    effects: {
      physicalArmorV: 10,
      magicalArmorV: 10,
      elementalArmorV: 10
    },
    hasDamaged: 0,
  }
}