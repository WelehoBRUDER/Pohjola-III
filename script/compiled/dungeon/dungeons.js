"use strict";
const dungeons = [
    {
        id: "vithail_dungeon",
        beat_stage_to_unlock: "tomb_of_the_mage",
        rooms: [
            new Room({
                id: "vithail_dungeon_1",
                foes: [],
                isBoss: false,
                loot: [],
                position: { x: 60, y: 110 },
                connections: { east: "vithail_dungeon_2" },
                escapeChance: 1,
            }),
            new Room({
                id: "vithail_dungeon_2",
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton)],
                isBoss: false,
                loot: [],
                relative_to: "vithail_dungeon_1",
                position: { x: 20, y: 0 },
                connections: { west: "vithail_dungeon_1", north: "vithail_dungeon_4", east: "vithail_dungeon_3" },
                escapeChance: 0.5,
            }),
            new Room({
                id: "vithail_dungeon_3",
                foes: [new Enemy(enemies.skeleton)],
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
                foes: [new Enemy(enemies.skeleton)],
                isBoss: false,
                loot: [],
                relative_to: "vithail_dungeon_2",
                position: { x: 0, y: -20 },
                connections: { south: "vithail_dungeon_2" },
                escapeChance: 0.33,
            }),
        ],
    },
];
//# sourceMappingURL=dungeons.js.map