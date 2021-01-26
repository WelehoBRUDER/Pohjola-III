let Enemies = {
  "skeleton_warrior": {
    id: "skeleton_warrior",
    name: "Skeleton Warrior",
    sprites: "gfx/enemies/skeleton_warrior",
    stats: {
      str: 1,
      vit: 3,
      agi: 1,
      int: 1,
      wis: 1,
      ap: 0,
      hp: 0,
      mp: 0
    },
    skills: {
      armorer: 5,
      heavy_weapons: 0,
      light_weapons: 5,
      shield: 5,
      dodge: 0,
      dexterity: 0
    },
    inventory: [],
    equipment: {
      weapon: new Item(items.rusty_short_sword),
      shield: new Item(items.wooden_shield),
      head: {},
      body: {},
      legs: {},
      ring: {}
    },
    abilities: [
      new Ability(Abilities.regular_attack),
      new Ability(Abilities.sharp_stroke)
    ],
    level: {
      lvl: 1,
      pointsPerLvl: 3,
      xpGive: 10
    },
    stat_template: "defender"
  },
  "skeleton_archer": {
    id: "skeleton_archer",
    name: "Skeleton Archer",
    sprites: "gfx/enemies/skeleton_archer",
    stats: {
      str: 3,
      vit: 1,
      agi: 3,
      int: 1,
      wis: 1,
      ap: 0,
      hp: 0,
      mp: 0
    },
    skills: {
      armorer: 0,
      heavy_weapons: 0,
      light_weapons: 0,
      shield: 0,
      dodge: 0,
      dexterity: 0
    },
    inventory: [],
    equipment: {
      weapon: new Item(items.broken_dagger),
      shield: {},
      head: {},
      body: {},
      legs: {},
      ring: {}
    },
    level: {
      lvl: 1,
      pointsPerLvl: 3,
      xpGive: 15
    },
    stat_template: "ranger"
  },
  "skeleton_knight": {
    id: "skeleton_knight",
    name: "Skeleton Knight",
    sprites: "gfx/enemies/skeleton_knight",
    stats: {
      str: 8,
      vit: 6,
      agi: 6,
      int: 1,
      wis: 1,
      ap: 0,
      hp: 0,
      mp: 0
    },
    skills: {
      armorer: 10,
      heavy_weapons: 10,
      light_weapons: 0,
      shield: 0,
      dodge: 0,
      dexterity: 0
    },
    inventory: [],
    equipment: {
      weapon: new Item(items.rusty_large_axe),
      shield: {},
      head: {},
      body: {},
      legs: {},
      ring: {}
    },
    level: {
      lvl: 1,
      pointsPerLvl: 3,
      xpGive: 180
    },
    stat_template: "warrior"
  }
}