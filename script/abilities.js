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
    ai_want_modifiers: [
      {
        execute_if: "player.statuses.forEach(e=>e.id == 'bleedI')",
        value: -20
      }
    ],
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
    ai_want_modifiers: [
      {
        execute_if: "player.statuses.forEach(e=>e.id == 'shield_bash')",
        value: -20
      }
    ],
    type: "debuff",
    img: "gfx/abilities/shield-bash.png"
  },
  "adrenaline_strength": {
    id: "adrenaline_strength",
    name: "Adrenaline Strength",
    cooldown: 25,
    mpCost: 10,
    status_effects: [
      {status: "strengthI"}
    ],
    ai_want: 15,
    type: "buff",
    img: "gfx/abilities/strong.png"
  },
  "flame_hand": {
    id: "flame_hand",
    name: "Flame Hand",
    cooldown: 8,
    mpCost: 25,
    status_effects: [
      {status: "burningI"}
    ],
    baseDamages: {
      magical: 6,
      elemental: 10
    },
    ai_want: 15,
    type: "debuff",
    img: "gfx/abilities/fire-spell-cast.png"
  },
  "magical_ward": {
    id: "magical_ward",
    name: "Magical Warding",
    cooldown: 14,
    mpCost: 20,
    status_effects: [
      {status: "wardI"}
    ],
    ai_want: 15,
    type: "buff",
    img: "gfx/abilities/magic-shield.png"
  }
}

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