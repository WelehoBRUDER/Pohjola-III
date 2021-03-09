const Abilities = {
  "regular_attack": {
    id: "regular_attack",
    name: "regularattack",
    cooldown: 0,
    powerMultiplier: 1,
    ai_want: 10,
    type: "regular"
  },
  "mana_blast": {
    id: "mana_blast",
    name: "manablast",
    cooldown: 0,
    baseDamages: {
      magical: 10,
      elemental: 5
    },
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
  "battle_stance": {
    id: "battle_stance",
    name: "Battle Stance",
    cooldown: 30,
    mpCost: 20,
    status_effects: [
      {status: "warriorI"}
    ],
    ai_want: 25,
    type: "buff",
    img: "gfx/abilities/battle-gear.png"
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
    ai_want: 25,
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