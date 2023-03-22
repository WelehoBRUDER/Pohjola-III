const keyItems = [
  "ruby_key_vithail",
  "lord_key_vithail",
  "vithail_lord_insignia",
  "abandoned_fort_jail_key",
  "abandoned_fort_keep_key",
  "orc_chief_tusk",
];
const dungeons: Dungeon[] = [
  {
    id: "vithail_dungeon",
    beat_stage_to_unlock: "tomb_of_the_mage",
    rooms: [
      new Room({
        id: "vithail_dungeon_1",
        foes: [],
        exit: true,
        isBoss: false,
        loot: [],
        position: { x: 110, y: 110 },
        connections: { east: "vithail_dungeon_2" },
        escapeChance: 1,
      }),
      new Room({
        id: "vithail_dungeon_2",
        foes: [new Enemy(enemies.skeleton) as EnemyBase, new Enemy(enemies.skeleton) as EnemyBase],
        isBoss: false,
        loot: [],
        relative_to: "vithail_dungeon_1",
        position: { x: 20, y: 0 },
        connections: { west: "vithail_dungeon_1", north: "vithail_dungeon_4", east: "vithail_dungeon_3" },
        escapeChance: 0.5,
      }),
      new Room({
        id: "vithail_dungeon_3",
        foes: [new Enemy(enemies.skeleton_brute) as EnemyBase, new Enemy(enemies.skeleton_brute) as EnemyBase],
        isBoss: false,
        loot: [],
        getKeys: ["ruby_key_vithail"],
        relative_to: "vithail_dungeon_2",
        position: { x: 20, y: 0 },
        connections: { west: "vithail_dungeon_2" },
        escapeChance: 0.5,
      }),
      new Room({
        id: "vithail_dungeon_4",
        foes: [new Enemy(enemies.skeleton_knight) as EnemyBase],
        isBoss: false,
        loot: [],
        keysNeeded: ["ruby_key_vithail"],
        relative_to: "vithail_dungeon_2",
        position: { x: 0, y: -20 },
        connections: { south: "vithail_dungeon_2", north: "vithail_dungeon_center_shrine" },
        escapeChance: 0.33,
      }),
      new Room({
        id: "vithail_dungeon_center_shrine",
        foes: [],
        isBoss: false,
        loot: [],
        keysNeeded: [],
        relative_to: "vithail_dungeon_4",
        position: { x: 0, y: -20 },
        connections: { west: "vithail_dungeon_western_corridor", east: "vithail_dungeon_eastern_corridor", south: "vithail_dungeon_4" },
        escapeChance: 1,
        restore: true,
      }),
      new Room({
        id: "vithail_dungeon_western_corridor",
        foes: [new Enemy(enemies.skeleton_knight) as EnemyBase, new Enemy(enemies.skeleton_brute) as EnemyBase],
        isBoss: false,
        loot: [],
        keysNeeded: [],
        relative_to: "vithail_dungeon_center_shrine",
        position: { x: -20, y: 0 },
        connections: { west: "vithail_dungeon_armory", east: "vithail_dungeon_center_shrine" },
        escapeChance: 0.75,
      }),
      new Room({
        id: "vithail_dungeon_armory",
        foes: [],
        isBoss: false,
        loot: [{ id: "", item: "vithail_cursed_sword", amount: 1 }],
        keysNeeded: [],
        relative_to: "vithail_dungeon_western_corridor",
        position: { x: -20, y: 0 },
        connections: { east: "vithail_dungeon_western_corridor", north: "vithail_dungeon_commander_chamber" },
        escapeChance: 1,
      }),
      new Room({
        id: "vithail_dungeon_commander_chamber",
        foes: [new Enemy(enemies.skeleton_mage) as EnemyBase],
        isBoss: false,
        loot: [{ id: "", item: "gold", amount: 300 }],
        getKeys: ["lord_key_vithail"],
        keysNeeded: [],
        relative_to: "vithail_dungeon_armory",
        position: { x: 0, y: -20 },
        connections: { south: "vithail_dungeon_armory" },
        escapeChance: 1,
      }),
      new Room({
        id: "vithail_dungeon_eastern_corridor",
        foes: [new Enemy(enemies.skeleton_brute) as EnemyBase, new Enemy(enemies.skeleton_brute) as EnemyBase],
        isBoss: false,
        loot: [],
        keysNeeded: [],
        relative_to: "vithail_dungeon_center_shrine",
        position: { x: 20, y: 0 },
        connections: { west: "vithail_dungeon_center_shrine", east: "vithail_dungeon_waiting_chamber", south: "vithail_dungeon_treasury" },
        escapeChance: 0.75,
      }),
      new Room({
        id: "vithail_dungeon_treasury",
        foes: [],
        isBoss: false,
        loot: [{ id: "", item: "gold", amount: 200 }],
        keysNeeded: [],
        relative_to: "vithail_dungeon_eastern_corridor",
        position: { x: 0, y: 20 },
        connections: { north: "vithail_dungeon_eastern_corridor" },
        escapeChance: 1,
      }),
      new Room({
        id: "vithail_dungeon_waiting_chamber",
        foes: [new Enemy(enemies.skeleton_knight) as EnemyBase, new Enemy(enemies.skeleton_knight) as EnemyBase],
        isBoss: false,
        loot: [{ id: "", item: "gold", amount: 1000 }],
        keysNeeded: ["lord_key_vithail"],
        relative_to: "vithail_dungeon_eastern_corridor",
        position: { x: 20, y: 0 },
        connections: { west: "vithail_dungeon_eastern_corridor", north: "vithail_dungeon_castle_proper" },
        escapeChance: 0.5,
      }),
      new Room({
        id: "vithail_dungeon_castle_proper",
        foes: [new Enemy(enemies.skeleton_lord) as EnemyBase],
        isBoss: true,
        end: true,
        loot: [{ id: "", item: "gold", amount: 2000 }],
        getKeys: ["vithail_lord_insignia"],
        keysNeeded: [],
        relative_to: "vithail_dungeon_waiting_chamber",
        position: { x: 0, y: -20 },
        connections: { south: "vithail_dungeon_waiting_chamber" },
        escapeChance: 1,
      }),
    ],
  },
  {
    id: "abandoned_fort",
    beat_stage_to_unlock: "stage_20",
    rooms: [
      new Room({
        id: "abandoned_fort_outer_gate",
        foes: [],
        exit: true,
        isBoss: false,
        loot: [],
        position: { x: 110, y: 160 },
        connections: { north: "abandoned_fort_courtyard" },
        escapeChance: 1,
      }),
      new Room({
        id: "abandoned_fort_courtyard",
        foes: [],
        isBoss: false,
        loot: [{ id: "", item: "gold", amount: 50 }],
        relative_to: "abandoned_fort_outer_gate",
        position: { x: 0, y: -20 },
        connections: {
          west: "abandoned_fort_servant_quarters",
          east: "abandoned_fort_cells",
          south: "abandoned_fort_outer_gate",
          north: "abandoned_fort_inner_gate",
        },
        escapeChance: 1,
      }),
      new Room({
        id: "abandoned_fort_servant_quarters",
        foes: [new Enemy(enemies.goblin) as EnemyBase, new Enemy(enemies.goblin) as EnemyBase, new Enemy(enemies.goblin) as EnemyBase],
        isBoss: false,
        loot: [{ id: "", item: "gold", amount: 200 }],
        relative_to: "abandoned_fort_courtyard",
        position: { x: -20, y: 0 },
        connections: { west: "abandoned_fort_captains_room", east: "abandoned_fort_courtyard" },
        escapeChance: 0.66,
      }),
      new Room({
        id: "abandoned_fort_captains_room",
        foes: [new Enemy(enemies.orc) as EnemyBase, new Enemy(enemies.orc) as EnemyBase],
        isBoss: false,
        loot: [{ id: "", item: "gold", amount: 300 }],
        getKeys: ["abandoned_fort_jail_key"],
        relative_to: "abandoned_fort_servant_quarters",
        position: { x: -20, y: 0 },
        connections: { east: "abandoned_fort_servant_quarters" },
        escapeChance: 0.5,
      }),
      new Room({
        id: "abandoned_fort_cells",
        foes: [new Enemy(enemies.orc_berserker) as EnemyBase, new Enemy(enemies.orc_berserker) as EnemyBase],
        isBoss: false,
        loot: [{ id: "", item: "orcish_berserker_axes", amount: 1 }],
        keysNeeded: ["abandoned_fort_jail_key"],
        getKeys: ["abandoned_fort_keep_key"],
        relative_to: "abandoned_fort_courtyard",
        position: { x: 30, y: 0 },
        connections: { west: "abandoned_fort_courtyard" },
        escapeChance: 0.5,
      }),
      new Room({
        id: "abandoned_fort_inner_gate",
        foes: [],
        isBoss: false,
        loot: [],
        keysNeeded: ["abandoned_fort_keep_key"],
        relative_to: "abandoned_fort_courtyard",
        position: { x: 0, y: -20 },
        connections: { south: "abandoned_fort_courtyard", north: "abandoned_fort_keep" },
        escapeChance: 1,
      }),
      new Room({
        id: "abandoned_fort_keep",
        foes: [],
        isBoss: false,
        restore: true,
        loot: [],
        keysNeeded: [],
        relative_to: "abandoned_fort_inner_gate",
        position: { x: 0, y: -20 },
        connections: {
          west: "abandoned_fort_old_armory",
          east: "abandoned_fort_chamber_pot",
          south: "abandoned_fort_inner_gate",
          north: "abandoned_fort_main_hall",
        },
        escapeChance: 1,
      }),
      new Room({
        id: "abandoned_fort_old_armory",
        foes: [new Enemy(enemies.troll) as EnemyBase, new Enemy(enemies.goblin) as EnemyBase],
        isBoss: true,
        loot: [
          { id: "", item: "orc_chief_armor", amount: 1 },
          { id: "", item: "gold", amount: 1000 },
        ],
        keysNeeded: [],
        relative_to: "abandoned_fort_keep",
        position: { x: -30, y: 0 },
        connections: { east: "abandoned_fort_keep" },
        escapeChance: 1,
      }),
      new Room({
        id: "abandoned_fort_chamber_pot",
        foes: [],
        isBoss: false,
        loot: [{ id: "", item: "gold", amount: 2 }],
        keysNeeded: [],
        relative_to: "abandoned_fort_keep",
        position: { x: 30, y: 0 },
        connections: { west: "abandoned_fort_keep" },
        escapeChance: 1,
      }),
      new Room({
        id: "abandoned_fort_main_hall",
        foes: [new Enemy(enemies.orc_chieftain) as EnemyBase],
        isBoss: true,
        end: true,
        loot: [
          { id: "", item: "orc_chief_headdress", amount: 1 },
          { id: "", item: "gold", amount: 2500 },
        ],
        getKeys: ["orc_chief_tusk"],
        keysNeeded: [],
        relative_to: "abandoned_fort_keep",
        position: { x: 0, y: -20 },
        connections: { south: "abandoned_fort_keep" },
        escapeChance: 1,
      }),
    ],
  },
  {
    id: "fortress_minor",
    beat_stage_to_unlock: "stage_30",
    rooms: [],
  },
];
