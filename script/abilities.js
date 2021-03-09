
function abilityHover(abi) {
  let text = `<f>20px<f><ff>RobotoBold<ff><c>gray<c>${abi.name}§`;
  if(abi.cooldown) text += `\n<f>14px<f><c>white<c>Cooldown: <c>#ccb983<c>${abi.cooldown}s`;
  if(abi.powerMultiplier) text += `\n<f>14px<f><c>white<c>DMG multiplier: <c>#cc8883<c>${abi.powerMultiplier}x`;
  if(abi.type) text += `\n<f>14px<f><c>white<c>Type: <c>#b0b0b0<c>${abi.type}`;
  if(abi.mpCost) text += `\n<f>14px<f><c>white<c>Mana cost: §<f>14px<f><c>cyan<c>${abi.mpCost}mp`;
  if(abi.hpCost) text += `\n<f>14px<f><c>white<c>Health cost: §<f>14px<f><c>red<c>${abi.hpCost}hp`;
  if(abi.healAmount) text += `\n<f>14px<f><c>white<c>Heals: §<f>14px<f><c>red<c>${abi.healAmount}hp`;
  if(abi.requiresShield) text += `\n<f>14px<f><c>yellow<c>[REQUIRES SHIELD]`;
  if(abi.baseDamages) {
    text += `\n\n<f>16px<f><c>white<c>Base damages:§<f>12px<f>`;
    if(abi.baseDamages?.physical > 0) text += `\n\t<c>gray<c>Physical: <c>white<c>${abi.baseDamages.physical}`;
    if(abi.baseDamages?.magical > 0) text += `\n\t<c>cyan<c>Magical: <c>white<c>${abi.baseDamages.magical}`;
    if(abi.baseDamages?.elemental > 0) text += `\n\t<c>lightgreen<c>Elemental: <c>white<c>${abi.baseDamages.elemental}`;
  }
  if(abi.status_effects.length > 0) {
    if(abi.type == "debuff") text += `\n\n<f>16px<f><c>white<c>Effects on target: §`;
    else text += `\n\n<f>16px<f><c>white<c>Effects on you: §`;
    for(let status of abi.status_effects) {
      text += statusEffectText(statusEffects[status.status]);
    }
   
  }
  return text;
}

function abilityHoverTiny(abi) {
  let text = `\t<f>14px<f><ff>RobotoBold<ff><c>gray<c>${abi.name}§`;
  if(abi.cooldown) text += `\n\t<f>12px<f><c>white<c>Cooldown: <c>#ccb983<c>${abi.cooldown}s`;
  if(abi.powerMultiplier) text += `\n\t<f>12px<f><c>white<c>DMG multiplier: <c>#cc8883<c>${abi.powerMultiplier}x`;
  if(abi.type) text += `\n\t<f>12px<f><c>white<c>Type: <c>#b0b0b0<c>${abi.type}`;
  if(abi.mpCost) text += `\n\t<f>12px<f><c>white<c>Mana cost: §<f>12px<f><c>cyan<c>${abi.mpCost}mp`;
  if(abi.hpCost) text += `\n\t<f>12px<f><c>white<c>Health cost: §<f>12px<f><c>red<c>${abi.hpCost}hp`;
  if(abi.healAmount) text += `\n\t<f>12px<f><c>white<c>Heals: §<f>12px<f><c>red<c>${abi.healAmount}hp`;
  if(abi.requiresShield) text += `\n\t<f>12px<f><c>yellow<c>[REQUIRES SHIELD]`;
  if(abi.baseDamages) {
    text += `\n\n\t<f>16px<f><c>white<c>Base damages:§<f>12px<f>`;
    if(abi.baseDamages?.physical > 0) text += `\n\t\t<c>gray<c>Physical: <c>white<c>${abi.baseDamages.physical}`;
    if(abi.baseDamages?.magical > 0) text += `\n\t\t<c>cyan<c>Magical: <c>white<c>${abi.baseDamages.magical}`;
    if(abi.baseDamages?.elemental > 0) text += `\n\t\t<c>lightgreen<c>Elemental: <c>white<c>${abi.baseDamages.elemental}`;
  }
  if(abi.status_effects.length > 0) {
    if(abi.type == "debuff") text += `\n\n\t<f>12px<f><c>white<c>Effects on target: §`;
    else text += `\n\n\t<f>12px<f><c>white<c>Effects on you: §`;
    for(let status of abi.status_effects) {
      text += statusEffectTextTiny(statusEffects[status.status]);
    }
   
  }
  return text;
}