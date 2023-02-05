const dungeons: Dungeon[] = [
  {
    id: "vithail_dungeon",
    beat_stage_to_unlock: "tomb_of_the_mage",
    rooms: [
      {
        id: "vithail_dungeon_1",
        foes: [],
        isBoss: false,
        loot: [],
        position: { x: 2, y: 50 },
        connections: { east: "vithail_dungeon_2" },
      },
      {
        id: "vithail_dungeon_2",
        foes: [new Enemy(enemies.skeleton)],
        isBoss: false,
        loot: [],
        relative_to: "vithail_dungeon_1",
        position: { x: 3, y: 0 },
        connections: { west: "vithail_dungeon_1", east: "vithail_dungeon_3" },
      },
      {
        id: "vithail_dungeon_3",
        foes: [new Enemy(enemies.skeleton)],
        isBoss: false,
        loot: [],
        relative_to: "vithail_dungeon_2",
        position: { x: 3, y: 0 },
        connections: { west: "vithail_dungeon_2" },
      },
    ],
  },
];
