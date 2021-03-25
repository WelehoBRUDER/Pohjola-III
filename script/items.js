
const itemTiers = {
  "common": {
    color: "#bad6db",
    class: "common",
    artifactLevelV: 3,
    artifactLevelP: 9,
    artifactEffectsMin: 2,
    artifactEffectsMax: 3
  },
  "uncommon": {
    color: "#9cd0d9",
    class: "uncommon",
    artifactLevelV: 7,
    artifactLevelP: 15,
    artifactEffectsMin: 3,
    artifactEffectsMax: 4
  },
  "rare": {
    color: "#72cbdb",
    class: "rare",
    artifactLevelV: 10,
    artifactLevelP: 21,
    artifactEffectsMin: 4,
    artifactEffectsMax: 5
  },
  "unusual": {
    color: "#35c2db",
    class: "unusual",
    artifactLevelV: 14,
    artifactLevelP: 27,
    artifactEffectsMin: 4,
    artifactEffectsMax: 6
  },
  "mythical": {
    color: "#7d35db",
    class: "mythical",
    artifactLevelV: 20,
    artifactLevelP: 35,
    artifactEffectsMin: 5,
    artifactEffectsMax: 8
  },
}

function itemHover(itm, storePlayerInv=false) {
  let text = `<f>20px<f><ff>RobotoBold<ff><c>gray<c>${itm.name}§`;
  if(itm.amount > 1) text += `\n<f>14px<f>Amount: ${itm.amount}`;
  if(itm.price && !global.inStore) text += `\n<f>14px<f>Value: §<f>14px<f><c>yellow<c>${itm.price}¤§`;
  else if(itm.price && global.inStore && storePlayerInv) text += `\n<f>14px<f>Price: §<f>14px<f><c>yellow<c>${Math.ceil(itm.price * player.barterBonus())}¤§`;
  else if(itm.price && global.inStore && !storePlayerInv) text += `\n<f>14px<f>Price: §<f>14px<f><c>yellow<c>${Math.ceil(itm.price / player.barterBonus())}¤§`;
  if(itm.tier) text += `\n<f>14px<f>Tier: §<f>14px<f><c>${itemTiers[itm.tier].color}<c>${itm.tier}§`;
  if(itm.itemSpeed > 0) text += `\n<f>14px<f>Action speed:§<f>14px<f><c>green<c> ${(itm.itemSpeed * 60).toFixed(1)}%§`;
  if(itm.itemSpeed < 0) text += `\n<f>14px<f>Action speed:§<f>14px<f><c>red<c> ${(itm.itemSpeed * 60).toFixed(1)}%§`;
  if(itm.level > -1) text += `\n<f>14px<f>Level: ${itm.level}/5`;
  if(itm.healAmount) text += `\n<f>14px<f>Heals: §<f>14px<f><c>red<c>${itm.healAmount}hp`;
  if(itm.weaponType) text += `\n<f>14px<f>Weapon type: ${itm.weaponType}`;
  if(itm.armorType) text += `\n<f>14px<f>Armor type: ${itm.armorType}`;
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