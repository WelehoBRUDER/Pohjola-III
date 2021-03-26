const dungeons = {
  cave_of_beginning: {
    title: "Cave of Beginning",
    rooms: [
      {
        title: "Entrance",
        id: "start",
        connections: {
          left: "room0",
          right: "room2",
          up: "room5"
        },
        start: true,
        x: 0,
        y: -12,
      },
      {
        title: "Hallway",
        id: "room0",
        connections: {
          right: "start",
        },
        parent: "start",
        x: -5,
        y: 0
      },
      {
        title: "Hallway",
        id: "room2",
        connections: {
          left: "start",
        },
        has_key: "dungeon_start_key0",
        parent: "start",
        x: 5,
        y: 0
      },
      {
        title: "Hallway",
        id: "room5",
        connections: {
          down: "start",
          up: "room6"
        },
        parent: "start",
        x: 0,
        y: -5,
        requires_key: "dungeon_start_key0"
      },
      {
        title: "Den of the Dweller",
        id: "room6",
        connections: {
          down: "room5",
          up: "room7"
        },
        parent: "room5",
        x: 0,
        y: -5,
        enemies: [
         {
           id: "skeleton_knight",
           level: 5
         }
        ]
      },
      {
        title: "Den of the Dweller2",
        id: "room7",
        connections: {
          down: "room6",
          up: "room8"
        },
        parent: "room6",
        x: 0,
        y: -5,
        enemies: [
         {
           id: "skeleton_knight",
           level: 5
         }
        ]
      },
      {
        title: "Den of the Dweller3",
        id: "room8",
        connections: {
          down: "room7",
        },
        parent: "room7",
        x: 0,
        y: -5,
        enemies: [
         {
           id: "skeleton_knight",
           level: 5
         }
        ]
      }
    ]
  }
}