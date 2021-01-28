const statusEffects = {
  "strengthI": {
    id: "strengthI",
    name: "Strength I",
    lastFor: 15,
    effects: {
      strP: 25,
      strV: 5
    },
    img: "gfx/status/biceps.png"
  },
  "bleedI": {
    id: "bleedI",
    name: "Bleed I",
    lastFor: 3,
    effectType: "bleeding",
    img: "gfx/status/blood.png",
    damageOT: 3,
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
  }
}