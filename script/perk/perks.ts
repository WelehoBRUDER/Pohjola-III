const perks: PerkObject[] = [
  {
    id: "foundation_of_power",
    desc: "foundation_of_power_desc",
    pos: { x: 10, y: 6 },
    icon: "gfx/icons/skills.png",
    modifiers: {
      atkV: 1,
      strV: 1,
      vitV: 1,
      agiV: 1,
      intV: 1,
      spiV: 1,
    },
    class: "adventure",
  },
  // Power related
  {
    id: "power_1",
    desc: "power_desc",
    pos: { x: -1.5, y: -2.5 },
    icon: "gfx/icons/crossed-swords.png",
    modifiers: {
      atkP: 5,
    },
    commands: {
      add_ability: { ...abilities.sharp_strike },
    },
    class: "power",
    relative_to: "foundation_of_power",
    requires: ["foundation_of_power"],
  },
  // strength related
  {
    id: "strength_1",
    desc: "strength_desc",
    pos: { x: 1.5, y: -2.5 },
    icon: "gfx/status/biceps.png",
    modifiers: {
      strV: 3,
    },
    class: "strength",
    relative_to: "foundation_of_power",
    requires: ["foundation_of_power"],
  },
  // agility related
  {
    id: "agility_1",
    desc: "agility_desc",
    pos: { x: 3, y: 0 },
    icon: "gfx/status/acrobatic.png",
    modifiers: {
      agiV: 3,
    },
    class: "agility",
    relative_to: "foundation_of_power",
    requires: ["foundation_of_power"],
  },
  // Tough related
  {
    id: "tough_1",
    desc: "tough_desc",
    pos: { x: 1.5, y: 2.5 },
    icon: "gfx/status/heart-plus.png",
    modifiers: {
      hpMaxV: 10,
      vitV: 1,
    },
    commands: {
      add_ability: { ...abilities.healing_light },
    },
    class: "tough",
    relative_to: "foundation_of_power",
    requires: ["foundation_of_power"],
  },
  // Intelligence related
  {
    id: "smart_1",
    desc: "smart_desc",
    pos: { x: -1.5, y: 2.5 },
    icon: "gfx/status/brain.png",
    modifiers: {
      intV: 3,
    },
    class: "smart",
    relative_to: "foundation_of_power",
    requires: ["foundation_of_power"],
  },
  // Spirit related
  {
    id: "will_1",
    desc: "will_desc",
    pos: { x: -3, y: 0 },
    icon: "gfx/status/wisdom.png",
    modifiers: {
      spiV: 3,
    },
    class: "will",
    relative_to: "foundation_of_power",
    requires: ["foundation_of_power"],
  },
];
