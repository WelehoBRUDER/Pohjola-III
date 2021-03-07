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
      magicalMin: 2,
      magicalMax: 5
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

const itemTiers = {
  "common": {
    color: "#bad6db",
    class: "common",
    artifactLevelV: 5,
    artifactLevelP: 11,
    artifactEffectsMin: 1,
    artifactEffectsMax: 3
  },
  "uncommon": {
    color: "#9cd0d9",
    class: "uncommon",
    artifactLevelV: 9,
    artifactLevelP: 17,
    artifactEffectsMin: 2,
    artifactEffectsMax: 4
  },
  "rare": {
    color: "#72cbdb",
    class: "rare",
    artifactLevelV: 14,
    artifactLevelP: 26,
    artifactEffectsMin: 2,
    artifactEffectsMax: 5
  },
  "unusual": {
    color: "#35c2db",
    class: "unusual",
    artifactLevelV: 18,
    artifactLevelP: 31,
    artifactEffectsMin: 3,
    artifactEffectsMax: 7
  },
}

function itemHover(itm, storePlayerInv=false) {
  let text = `<f>20px<f><ff>RobotoBold<ff><c>gray<c>${itm.name}§`;
  if(itm.amount > 1) text += `\n<f>14px<f>Amount: ${itm.amount}`;
  if(itm.price && !global.inStore) text += `\n<f>14px<f>Value: §<f>14px<f><c>yellow<c>${itm.price}¤§`;
  else if(itm.price && global.inStore && storePlayerInv) text += `\n<f>14px<f>Price: §<f>14px<f><c>yellow<c>${Math.ceil(itm.price * player.barterBonus())}¤§`;
  else if(itm.price && global.inStore && !storePlayerInv) text += `\n<f>14px<f>Price: §<f>14px<f><c>yellow<c>${Math.ceil(itm.price / player.barterBonus())}¤§`;
  if(itm.tier) text += `\n<f>14px<f>Tier: §<f>14px<f><c>${itemTiers[itm.tier].color}<c>${itm.tier}§`;
  if(itm.itemSpeed >= 0) text += `\n<f>14px<f>Action speed:§<f>14px<f><c>green<c> ${(itm.itemSpeed * 60).toFixed(1)}%§`;
  if(itm.itemSpeed < 0) text += `\n<f>14px<f>Action speed:§<f>14px<f><c>red<c> ${(itm.itemSpeed * 60).toFixed(1)}%§`;
  if(itm.level > -1) text += `\n<f>14px<f>Level: ${itm.level}/5`;
  if(itm.healAmount) text += `\n<f>14px<f>Heals: §<f>14px<f><c>red<c>${itm.healAmount}hp`;
  if(itm.weaponType) text += `\n<f>14px<f>Weapon type: ${itm.weaponType}`;
  if(itm.equipmentSlot) text += `\n<f>14px<f>Equipment slot: ${itm.equipmentSlot}`;
  if(itm.effects) {
    text += `\n<f>16px<f><c>gray<c>Effects:§`;
    text += `\n${statusSyntax(itm, 12)}`;
  }
  if(itm.minDmg() > 0) {
    text += `§\n<f>14px<f><c>darkred<c>Damage values:§ <f>12px<f>`;
    if(itm.damages.physicalMin > 0) text += `\n\t<c>gray<c>Physical: <c>white<c>${itm.damages.physicalMin.toFixed(1)}-${itm.damages.physicalMax.toFixed(1)}`;
    if(itm.damages.magicalMin > 0) text += `\n\t<c>cyan<c>Magical: <c>white<c>${itm.damages.magicalMin.toFixed(1)}-${itm.damages.magicalMax.toFixed(1)}`;
    if(itm.damages.elementalMin > 0) text += `\n\t<c>lightgreen<c>Elemental: <c>white<c>${itm.damages.elementalMin.toFixed(1)}-${itm.damages.elementalMax.toFixed(1)}`;
  } 
  if(itm.hasArmor()) {
    text += `§\n<f>14px<f><c>orange<c>Armor values:§ <f>12px<f>`;
    if(itm.armors.physical > 0) text += `\n\t<c>gray<c>Physical:<c>white<c> ${itm.armors.physical.toFixed(1)}`;
    if(itm.armors.magical > 0) text += `\n\t<c>cyan<c>Magical:<c>white<c> ${itm.armors.magical.toFixed(1)}`;
    if(itm.armors.elemental > 0) text += `\n\t<c>lightgreen<c>Elemental:<c>white<c> ${itm.armors.elemental.toFixed(1)}`;
  }
  if(itm.hasBlock()) {
    text += `§\n<f>14px<f><c>orange<c>Block values:§ <f>12px<f>`;
    if(itm.blockAmount.physical > 0) text += `\n\t<c>gray<c>Physical:<c>white<c> ${itm.blockAmount.physical.toFixed(1)}%`;
    if(itm.blockAmount.magical > 0) text += `\n\t<c>cyan<c>Magical: <c>white<c> ${itm.blockAmount.magical.toFixed(1)}%`;
    if(itm.blockAmount.elemental > 0) text += `\n\t<c>lightgreen<c>Elemental: <c>white<c> ${itm.blockAmount.elemental.toFixed(1)}%`;
  }
  if(itm.statusEffects?.length > 0) {
    text += `\n<f>16px<f><c>lightgray<c>Effects: §`;
    for(let status of itm.statusEffects) {
      text += statusEffectText(statusEffects[status.effect]);
    }
  }
  if(itm.skillBonus) text += `\n<f>14px<f>Uses skill:<c>yellow<c> ${loc[itm.skillBonus]}`;
  return text;
}