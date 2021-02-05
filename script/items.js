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
    price: 5,
    img: "gfx/items/breastplate.png"
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
    img: "gfx/items/visored-helm.png"
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
    img: "gfx/items/leg-armor.png"
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
    img: "gfx/items/round-shield.png"
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
    img: "gfx/items/plain-dagger.png"
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
    img: "gfx/items/bow-arrow.png"
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
    img: "gfx/items/war-axe.png"
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
    img: "gfx/items/broadsword.png"
  },
}

function itemHover(itm) {
  let text = `<f>20px<f><ff>RobotoBold<ff><c>gray<c>${itm.name}§`;
  if(itm.amount > 1) text += `\n<f>14px<f>Amount: ${itm.amount}`;
  if(itm.price) text += `\n<f>14px<f>Value: §<f>14px<f><c>yellow<c>${itm.price}¤§`;
  if(itm.itemSpeed >= 0) text += `\n<f>14px<f>Action speed:§<f>14px<f><c>green<c> ${(itm.itemSpeed * 60).toFixed(1)}%§`;
  if(itm.itemSpeed < 0) text += `\n<f>14px<f>Action speed:§<f>14px<f><c>red<c> ${(itm.itemSpeed * 60).toFixed(1)}%§`;
  if(itm.level > -1) text += `\n<f>14px<f>Level: ${itm.level}/5`;
  if(itm.healAmount) text += `\n<f>14px<f>Heals: §<f>14px<f><c>red<c>${itm.healAmount}hp`;
  if(itm.weaponType) text += `\n<f>14px<f>Weapon type: ${itm.weaponType}`;
  if(itm.minDmg() > 0) {
    text += `§\n<f>14px<f><c>darkred<c>Damage values:§ <f>12px<f>`;
    if(itm.damages.physicalMin > 0) text += `\n\t<c>gray<c>Physical: <c>white<c>${itm.damages.physicalMin}-${itm.damages.physicalMax}`;
    if(itm.damages.magicalMin > 0) text += `\n\t<c>cyan<c>Magical: <c>white<c>${itm.damages.magicalMin}-${itm.damages.magicalMax}`;
    if(itm.damages.elementalMin > 0) text += `\n\t<c>lightgreen<c>Elemental: <c>white<c>${itm.damages.elementalMin}-${itm.damages.elementalMax}`;
  } 
  if(itm.hasArmor()) {
    text += `§\n<f>14px<f><c>orange<c>Armor values:§ <f>12px<f>`;
    if(itm.armors.physical > 0) text += `\n\t<c>gray<c>Physical:<c>white<c> ${itm.armors.physical}`;
    if(itm.armors.magical > 0) text += `\n\t<c>cyan<c>Magical:<c>white<c> ${itm.armors.magical}`;
    if(itm.armors.elemental > 0) text += `\n\t<c>lightgreen<c>Elemental:<c>white<c> ${itm.armors.elemental}`;
  }
  if(itm.hasBlock()) {
    text += `§\n<f>14px<f><c>orange<c>Block values:§ <f>12px<f>`;
    if(itm.blockAmount.physical > 0) text += `\n\t<c>gray<c>Physical:<c>white<c> ${itm.blockAmount.physical}%`;
    if(itm.blockAmount.magical > 0) text += `\n\t<c>cyan<c>Magical: <c>white<c> ${itm.blockAmount.magical}%`;
    if(itm.blockAmount.elemental > 0) text += `\n\t<c>lightgreen<c>Elemental: <c>white<c> ${itm.blockAmount.elemental}%`;
  }
  if(itm.skillBonus) text += `\n<f>14px<f>Uses skill: ${itm.skillBonus}`;
  if(itm.statusEffects?.length > 0) {
    text += `\n<f>16px<f><c>lightgray<c>Effects: §`;
    for(let status of itm.statusEffects) {
      text += statusEffectText(statusEffects[status.effect]);
    }
   
  }
  return text;
}