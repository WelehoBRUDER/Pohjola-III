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
    price: 80,
    img: "gfx/items/weak_heal_gem.png"
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
    price: 5
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
    price: 2
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
    price: 3
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
    price: 1,
    crafting: {
      requires: [
        {item: "broken_dagger", amount: 2}
      ]
    }
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
    price: 5
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
    price: 8
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
      physicalMax: 8
    },
    itemSpeed: -0.05,
    skillBonus: "heavy_weapons",
    price: 7
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
    price: 7
  },
}