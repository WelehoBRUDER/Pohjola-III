const Enemies = {
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
      mp: 0,
      healL: 40,
      critChance: 5,
      critDmg: 50
    },
    resistances: {
      burning: 0,
      bleeding: 0,
      stun: 0,
      power: 0,
      defense: 0,
      freezing: 0
    },
    skills: {
      armorer: 5,
      heavy_weapons: 0,
      light_weapons: 5,
      shield: 5,
      dodge: 0,
      dexterity: 0
    },
    inventory: [
      new Item({...items.weak_healing_gem})
    ],
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
      new Ability(Abilities.shield_bash),
    ],
    level: {
      lvl: 1,
      pointsPerLvl: 3,
      xpGive: 10
    },
    statuses: [
    ],
    stat_template: "defender",
    ai_prefers: {
      regular: 25,
      debuff: 0
    },
    lootTable: "skeleton1"
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
      mp: 0,
      healL: 30,
      critChance: 10,
      critDmg: 75
    },
    resistances: {
      burning: 0,
      bleeding: 0,
      stun: 0,
      power: 0,
      defense: 0,
      freezing: 0
    },
    skills: {
      armorer: 0,
      heavy_weapons: 10,
      light_weapons: 0,
      shield: 0,
      dodge: 0,
      dexterity: 0
    },
    inventory: [
      new Item({...items.weak_healing_gem})
    ],
    equipment: {
      weapon: new Item(items.bent_wooden_bow),
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
    abilities: [
      new Ability(Abilities.regular_attack),
      new Ability(Abilities.sharp_stroke)
    ],
    statuses: [],
    stat_template: "ranger",
    ai_prefers: {
      regular: 0,
      debuff: 50
    },
    lootTable: "skeleton2"
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
      mp: 0,
      healL: 35,
      critChance: 5,
      critDmg: 50
    },
    resistances: {
      burning: 0,
      bleeding: 0,
      stun: 0,
      power: 0,
      defense: 0,
      freezing: 0
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
    abilities: [
      new Ability(Abilities.regular_attack),
      new Ability(Abilities.sharp_stroke)
    ],
    statuses: [],
    stat_template: "warrior",
    ai_prefers: {
      regular: 25,
      debuff: 0
    },
    lootTable: "skeleton3"
  },
  "skeleton_mage": {
    id: "skeleton_mage",
    name: "Skeleton Mage",
    sprites: "gfx/enemies/skeleton_mage",
    stats: {
      str: 3,
      vit: 4,
      agi: 8,
      int: 5,
      wis: 5,
      ap: 0,
      hp: 0,
      mp: 0,
      healL: 45,
      critChance: 7,
      critDmg: 55
    },
    resistances: {
      burning: 10,
      bleeding: 0,
      stun: 10,
      power: 0,
      defense: 0,
      freezing: 10
    },
    skills: {
      armorer: 0,
      heavy_weapons: 0,
      light_weapons: 5,
      shield: 0,
      dodge: 5,
      dexterity: 0
    },
    inventory: [],
    equipment: {
      weapon: new Item(items.magician_orb_staff),
      shield: {},
      head: {},
      body: {},
      legs: {},
      ring: {}
    },
    level: {
      lvl: 1,
      pointsPerLvl: 3,
      xpGive: 200
    },
    abilities: [
      new Ability(Abilities.mana_blast),
      new Ability(Abilities.flame_hand)
    ],
    statuses: [],
    stat_template: "mage",
    ai_prefers: {
      regular: 0,
      debuff: 25
    },
    lootTable: "skeleton3"
  }
}

const lootTables = {
  skeleton1: [
    {item: "wooden_shield", chance: 37},
    {item: "rusty_short_sword", chance: 41},
    {item: "weak_healing_gem", chance: 26, amount: [1, 2]},
    {item: "gold", chance: 100, amount: [7, 13]}
  ],
  skeleton2: [
    {item: "bent_wooden_bow", chance: 38},
    {item: "weak_healing_gem", chance: 28, amount: [1, 2]},
    {item: "gold", chance: 100, amount: [11, 22]}
  ],
  skeleton3: [
    {item: "rusty_large_axe", chance: 43},
    {item: "ring_of_woes", chance: 12},
    {item: "weak_healing_gem", chance: 28, amount: [1, 3]},
    {item: "gold", chance: 100, amount: [23, 37]}
  ]
}