const statusEffects = {
  "strengthI": {
    id: "strengthI",
    name: "Strength I",
    lastFor: 12,
    effects: {
      strV: 10,
      physicalDamageP: 18
    },
    img: "gfx/status/biceps.png"
  },
  "bleedI": {
    id: "bleedI",
    name: "Bleed I",
    lastFor: 3,
    effects: {
      agiV: -5
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
      elementalArmorP: -25
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
    effectType: "buff",
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
    effectType: "buff",
    img: "gfx/status/ward.png",
    effects: {
      physicalArmorV: 10,
      magicalArmorV: 10,
      elementalArmorV: 10
    },
    hasDamaged: 0,
  }
}

function statusEffectText(status) {
  let text = `\n <f>14px<f><c>orange<c>${status.name}§\n`;
  text += `<f>12px<f>${statusSyntax(status, 12)}`;
  text += `<f>12px<f>\tLasts for: ${status.lastFor}s`;
  return text;
}

const permanentEffects = {
  // # CLASSES # // 
  "warrior_class": {
    id: "warrior_class",
    name: "Warrior",
    desc: "You have received training as a warrior, making you stronger and more adept at close quarters combat.",
    class: {
      color: "#d1461b",
      img: "gfx/icons/swords-power.png"
    },
    effects: {
      physicalDamageP: 5,
      strV: 5,
      vitV: 4,
      agiV: 2,
      hpV: 20,
    },
    category: "class"
  },
  "mage_class": {
    id: "mage_class",
    name: "Mage",
    desc: "You have magical talent within you, and have decided to master its usage, becoming a mage capable of unnatural deeds.",
    class: {
      color: "#1bb3d1",
      img: "gfx/icons/wizard-face.png"
    },
    effects: {
      magicalDamageP: 5,
      vitV: 2,
      intV: 5,
      wisV: 4,
      mpV: 15,
    },
    category: "class"
  },
  "elementalist_class": {
    id: "elementalist_class",
    name: "Elementalist",
    desc: "You are deeply connected to the harmony of the elements, and make great use of the world's very essence in combat.",
    class: {
      color: "#1ed11b",
      img: "gfx/icons/triple-yin.png"
    },
    effects: {
      elementalDamageP: 5,
      vitV: 4,
      intV: 2,
      wisV: 4,
      mpV: 10,
      hpV: 10
    },
    category: "class"
  },
  // # PERKS # // 
  "battle_exp": {
    id: "battle_exp",
    name: "Battle Experience",
    effects: [
      {
        // level 1
        effects: {
          physicalDamageP: 3,
          physicalArmorP: 3,
          hpV: 10,
        }
      },
      {
        // level 2
        effects: {
          physicalDamageP: 6,
          physicalArmorP: 6,
          hpV: 15,
        }
      },
      {
        // level 3
        effects: {
          physicalDamageP: 10,
          physicalArmorP: 10,
          defenseP: 5,
          hpV: 25,
        }
      }
    ],
    level: 0,
    category: "perk"
  },
  "atk_perk": {
    id: "atk_perk",
    name: "Art of Attack",
    effects: [
      {
        // level 1
        effects: {
          physicalDamageP: 5,
          critChanceV: 3,
          strV: 3
        }
      },
      {
        // level 2
        effects: {
          physicalDamageP: 8,
          attackP: 5,
          critChanceV: 5,
          strV: 5
        }
      }
    ],
    level: 0,
    category: "perk"
  },
  "def_perk": {
    id: "def_perk",
    name: "Defensive Maneuvers",
    effects: [
      {
        // level 1
        effects: {
          physicalArmorP: 5,
          hpV: 10,
          vitV: 2
        }
      },
      {
        // level 2
        effects: {
          physicalArmorP: 7,
          hpV: 12,
          vitV: 3,
          hpP: 3
        }
      }
    ],
    level: 0,
    category: "perk"
  },
  // MAGE PERKS // 
  "path_learning": {
    id: "path_learning",
    name: "Path of Learning",
    effects: [
      {
        // level 1
        effects: {
          magicalDamageP: 5,
          magicalArmorP: 3,
          mpV: 5,
        }
      },
      {
        // level 2
        effects: {
          magicalDamageP: 8,
          magicalArmorP: 5,
          mpV: 10,
          intV: 2,
          wisV: 2
        }
      },
      {
        // level 3
        effects: {
          magicalDamageP: 10,
          magicalArmorP: 8,
          mpV: 20,
          mpP: 5,
          intV: 4,
          wisV: 4
        }
      }
    ],
    level: 0,
    category: "perk"
  },
  "power_perk": {
    id: "power_perk",
    name: "Path of Power",
    effects: [
      {
        // level 1
        effects: {
          magicalDamageP: 8,
          magicalDamageV: 2,
          intV: 3
        }
      },
      {
        // level 2
        effects: {
          magicalDamageP: 15,
          magicalDamageV: 5,
          intV: 5
        }
      }
    ],
    level: 0,
    category: "perk"
  },
  "reserve_perk": {
    id: "reserve_perk",
    name: "Path of Knowledge",
    effects: [
      {
        // level 1
        effects: {
          magicalArmorV: 5,
          mpV: 10,
          wisV: 2
        }
      },
      {
        // level 2
        effects: {
          magicalArmorV: 10,
          mpP: 5,
          mpV: 25,
          wisV: 3
        }
      }
    ],
    level: 0,
    category: "perk"
  }
}