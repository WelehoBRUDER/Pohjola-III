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
    type: "debuff"
  },
  "shield_bash": {
    id: "shield_bash",
    name: "Sharp Stroke",
    cooldown: 15,
    powerMultiplier: 0.75,
    mpCost: 0,
    status_effects: [
      {status: "stunI"},
    ],
    ai_want: 20,
    type: "debuff"
  }
}