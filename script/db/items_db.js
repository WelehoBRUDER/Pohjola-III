const items = {
  "weak_healing_gem": {
    id: "weak_healing_gem",
    name: "Gem of Weak Healing",
    amount: 1,
    type: "consumable",
    statusEffects: [
      {effect: "regenI"}
    ],
    healsUser: true,
    useLobby: false,
    level: 0,
    price: 80,
    img: "gfx/items/weak_heal_gem.png",
    tier: "common"
  },
  "healing_gem": {
    id: "healing_gem",
    name: "Gem of Healing",
    amount: 1,
    type: "consumable",
    statusEffects: [
      {effect: "regenII"}
    ],
    healsUser: true,
    useLobby: false,
    level: 0,
    price: 300,
    img: "gfx/items/heal_gem.png",
    tier: "uncommon"
  },
  "worn_gem_pendant": {
    id: "worn_gem_pendant",
    name: "Worn Gem Pendant",
    amount: 1,
    type: "equipment",
    equipmentSlot: "amulet",
    effects: {
      critChanceV: 5
    },
    artifact: true,
    level: 0,
    itemSpeed: 0,
    price: 240,
    img: "gfx/items/gem-pendant.png",
    tier: "common"
  },
  "talisman_of_virtue": {
    id: "talisman_of_virtue",
    name: "Talisman of Virtue",
    amount: 1,
    type: "equipment",
    equipmentSlot: "talisman",
    artifact: true,
    level: 0,
    itemSpeed: 0,
    price: 240,
    img: "gfx/items/generic-talisman.png",
    tier: "common"
  },
  "ring_of_woes": {
    id: "ring_of_woes",
    name: "Ring of Woes",
    amount: 1,
    type: "equipment",
    equipmentSlot: "ring",
    artifact: true,
    level: 0,
    itemSpeed: 0,
    price: 240,
    img: "gfx/items/ring.png",
    tier: "common"
  },
  "old_wool_shirt": {
    id: "old_wool_shirt",
    name: "Old Wool Shirt",
    amount: 1,
    type: "equipment",
    equipmentSlot: "body",
    level: 0,
    armors: {
      physical: 3,
      magical: 2,
      elemental: 2
    },
    itemSpeed: -0.02,
    skillBonus: "armorer",
    armorType: "light",
    price: 5,
    img: "gfx/items/breastplate.png",
    tier: "common"
  },
  "old_wool_cap": {
    id: "old_wool_cap",
    name: "Old Wool Cap",
    amount: 1,
    type: "equipment",
    equipmentSlot: "head",
    level: 0,
    armors: {
      physical: 1,
      magical: 1,
      elemental: 1
    },
    itemSpeed: -0.01,
    skillBonus: "armorer",
    armorType: "light",
    price: 2,
    img: "gfx/items/visored-helm.png",
    tier: "common"
  },
  "old_wool_leggings": {
    id: "old_wool_leggings",
    name: "Old Wool Leggings",
    amount: 1,
    type: "equipment",
    equipmentSlot: "legs",
    level: 0,
    armors: {
      physical: 2,
      magical: 3,
      elemental: 1
    },
    itemSpeed: -0.02,
    skillBonus: "armorer",
    armorType: "light",
    price: 3,
    img: "gfx/items/leg-armor.png",
    tier: "common"
  },
  "wooden_shield": {
    id: "wooden_shield",
    name: "Wooden Shield",
    amount: 1,
    type: "equipment",
    equipmentSlot: "shield",
    level: 0,
    armors: {
      physical: 1,
      magical: 2,
      elemental: -1
    },
    blockAmount: {
      physical: 40,
      magical: 49,
      elemental: 17
    },
    itemSpeed: -0.01,
    skillBonus: "shield",
    armorType: "heavy",
    price: 1,
    crafting: {
      requires: [
        {item: "broken_dagger", amount: 2}
      ]
    },
    img: "gfx/items/round-shield.png",
    tier: "common"
  },
  "broken_dagger": {
    id: "broken_dagger",
    name: "Broken Dagger",
    amount: 1,
    type: "equipment",
    equipmentSlot: "weapon",
    weaponType: "light",
    level: 0,
    damages: {
      physicalMin: 3,
      physicalMax: 5
    },
    itemSpeed: 0.02,
    skillBonus: "light_weapons",
    price: 5,
    img: "gfx/items/plain-dagger.png",
    tier: "common"
  },
  "bent_wooden_bow": {
    id: "bent_wooden_bow",
    name: "Bent Wooden Bow",
    amount: 1,
    type: "equipment",
    equipmentSlot: "weapon",
    weaponType: "heavy",
    level: 0,
    damages: {
      physicalMin: 7,
      physicalMax: 11
    },
    itemSpeed: 0.04,
    skillBonus: "heavy_weapons",
    price: 8,
    img: "gfx/items/bow-arrow.png",
    tier: "common"
  },
  "magician_orb_staff": {
    id: "magician_orb_staff",
    name: "Magician's Orb Staff",
    amount: 1,
    type: "equipment",
    equipmentSlot: "weapon",
    weaponType: "heavy",
    level: 0,
    damages: {
      physicalMin: 2,
      physicalMax: 5,
      magicalMin: 5,
      magicalMax: 8
    },
    effects: {
      magicalDamageP: 10,
      mpV: 5,
    },
    itemSpeed: 0.02,
    skillBonus: "heavy_weapons",
    price: 80,
    img: "gfx/items/orb-wand.png",
    tier: "common"
  },
  "rusty_large_axe": {
    id: "rusty_large_axe",
    name: "Rusty Large Axe",
    amount: 1,
    type: "equipment",
    equipmentSlot: "weapon",
    weaponType: "heavy",
    level: 0,
    damages: {
      physicalMin: 5,
      physicalMax: 8,
    },
    itemSpeed: -0.05,
    skillBonus: "heavy_weapons",
    price: 7,
    img: "gfx/items/war-axe.png",
    tier: "common"
  },
  "rusty_short_sword": {
    id: "rusty_short_sword",
    name: "Rusty Short Sword",
    amount: 1,
    type: "equipment",
    equipmentSlot: "weapon",
    weaponType: "light",
    level: 0,
    damages: {
      physicalMin: 6,
      physicalMax: 9,
    },
    itemSpeed: 0.02,
    skillBonus: "light_weapons",
    price: 7,
    img: "gfx/items/broadsword.png",
    tier: "common"
  },
}