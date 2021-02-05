let Abilities = {
  "regular_attack": {
    id: "regular_attack",
    name: "regularattack",
    cooldown: 0,
    powerMultiplier: 1,
    ai_want: 10,
    type: "regular"
  },
  "sharp_stroke": {
    id: "sharp_stroke",
    name: "Sharp Stroke",
    cooldown: 18,
    powerMultiplier: 1.25,
    mpCost: 5,
    status_effects: [
      {status: "bleedI"},
    ],
    ai_want: 20,
    type: "debuff",
    img: "gfx/abilities/pointy-sword.png"
  },
  "shield_bash": {
    id: "shield_bash",
    name: "Shield Bash",
    cooldown: 15,
    powerMultiplier: 0.75,
    mpCost: 0,
    status_effects: [
      {status: "stunI"},
    ],
    requiresShield: true,
    ai_want: 20,
    type: "debuff",
    img: "gfx/abilities/shield-bash.png"
  }
}

function abilityHover(abi) {
  let text = `<f>20px<f><ff>RobotoBold<ff><c>gray<c>${abi.name}§`;
  if(abi.cooldown) text += `\n<f>14px<f>Cooldown: ${abi.cooldown}s`;
  if(abi.powerMultiplier) text += `\n<f>14px<f>DMG multiplier: ${abi.powerMultiplier}x`;
  if(abi.mpCost) text += `\n<f>14px<f>Mana cost: §<f>14px<f><c>cyan<c>${abi.mpCost}mp`;
  if(abi.hpCost) text += `\n<f>14px<f>Health cost: §<f>14px<f><c>red<c>${abi.hpCost}hp`;
  if(abi.healAmount) text += `\n<f>14px<f>Heals: §<f>14px<f><c>red<c>${abi.healAmount}hp`;
  if(abi.requiresShield) text += `\n<f>14px<f><c>yellow<c>[REQUIRES SHIELD]`;
  if(abi.status_effects.length > 0) {
    text += `\n<f>16px<f><c>lightgray<c>Effects: §`;
    for(let status of abi.status_effects) {
      text += statusEffectText(statusEffects[status.status]);
    }
   
  }
  return text;
}