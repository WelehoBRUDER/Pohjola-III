interface DungeonObject {
  id: string;
  rooms: RoomObject[];
  beat_stage_to_unlock: string;
}

class Dungeon {
  [key: string]: any;
  id: string;
  rooms: Room[];
  beat_stage_to_unlock: string;
  constructor(dungeon: DungeonObject) {
    this.id = dungeon.id;
    this.rooms = dungeon.rooms.map((room) => new Room(room));
    this.beat_stage_to_unlock = dungeon.beat_stage_to_unlock;
  }
}

interface Loot {
  id: string;
  item: string;
  amount: number;
}

interface RoomObject {
  id: string;
  foes: EnemyBase[];
  isBoss: boolean;
  loot: Loot[];
  relative_to?: string;
  position: { x: number; y: number };
  connections: { west?: string; east?: string; north?: string; south?: string };
  keyNeeded?: string;
}

class Room {
  [key: string]: any;
  id: string;
  foes: Enemy[];
  isBoss: boolean;
  loot: Loot[];
  relative_to?: string;
  position: { x: number; y: number };
  connections: { west?: string; east?: string; north?: string; south?: string };
  keyNeeded?: string;
  constructor(room: RoomObject) {
    this.id = room.id;
    this.foes = room.foes.map((foe: any) => new Enemy(foe));
    this.isBoss = room.isBoss;
    this.loot = room.loot.map((loot: any) => {
      return {
        id: loot.id,
        item: loot.item,
        amount: loot.amount,
      };
    });
    this.relative_to = room.relative_to;
    this.position = room.position;
    this.connections = { ...room.connections };
    this.keyNeeded = room.keyNeeded;
  }
}

function buildDungeon() {
  if (!dungeonController.currentDungeon) return;
  dungeonController.currentDungeon.rooms.forEach((room) => {
    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room");
    roomDiv.id = room.id;
    if (room.id === dungeonController?.currentRoom?.id) {
      roomDiv.classList.add("current-room");
    }
    if (room.isBoss) {
      roomDiv.classList.add("boss-room");
    }
    if (room.keyNeeded) {
      roomDiv.classList.add("locked-room");
    }
    if (room.foes.length > 0) {
      roomDiv.classList.add("foe-room");
    }
    if (room.loot.length > 0) {
      roomDiv.classList.add("loot-room");
    }
    if (room.connections.west) {
      roomDiv.classList.add("west-connection");
    }
    if (room.connections.east) {
      roomDiv.classList.add("east-connection");
    }
    if (room.connections.north) {
      roomDiv.classList.add("north-connection");
    }
    if (room.connections.south) {
      roomDiv.classList.add("south-connection");
    }
    roomDiv.style.position = "absolute";
    if (room.relative_to) {
      const relativeRoom = dungeonScreen.querySelector(`#${room.relative_to}`);
      if (relativeRoom) {
        const relativeRoomRect = relativeRoom.getBoundingClientRect();
        roomDiv.style.left = `${relativeRoomRect.left + room.position.x * 16}px`;
        roomDiv.style.top = `${relativeRoomRect.top + room.position.y * 16}px`;
      }
    } else {
      roomDiv.style.left = `${room.position.x * 16}px`;
      roomDiv.style.top = `${room.position.y * 16}px`;
    }
    dungeonScreen.appendChild(roomDiv);
  });
}

class DungeonController {
  [key: string]: any;
  id: string;
  currentRoom: Room | null;
  currentDungeon: Dungeon | null;
  keys: string[] = [];
  constructor() {
    this.id = "dungeon_controller";
    this.currentRoom = null;
    this.currentDungeon = null;
    this.keys = [];
  }

  reset() {
    this.currentRoom = null;
    this.currentDungeon = null;
    this.keys = [];
  }

  enterDungeon(dungeon: Dungeon) {
    closeConfirmationWindow();
    this.reset();
    lobbyView.classList.add("no-display");
    dungeonScreen.classList.remove("no-display");
    this.currentDungeon = dungeon;
    this.currentRoom = dungeon.rooms[0];
    buildDungeon();
  }
}

const dungeonController = new DungeonController();
