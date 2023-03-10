"use strict";
class Dungeon {
    id;
    rooms;
    beat_stage_to_unlock;
    constructor(dungeon) {
        this.id = dungeon.id;
        this.rooms = dungeon.rooms.map((room) => new Room(room));
        this.beat_stage_to_unlock = dungeon.beat_stage_to_unlock;
    }
}
class Room {
    id;
    foes;
    isBoss;
    loot;
    getKeys;
    relative_to;
    position;
    connections;
    keysNeeded;
    escapeChance;
    constructor(room) {
        this.id = room.id;
        this.foes = room.foes.map((foe) => new Enemy(foe)) || [];
        this.isBoss = room.isBoss;
        this.loot = room.loot.map((loot) => {
            return {
                id: loot.id,
                item: loot.item,
                amount: loot.amount,
            };
        });
        this.escapeChance = room.escapeChance || 0.5;
        this.getKeys = room.getKeys || [];
        this.relative_to = room.relative_to;
        this.position = room.position;
        this.connections = { ...room.connections };
        this.keyNeeded = room.keysNeeded || [];
    }
    enter() {
        if (this.foes.length > 0) {
            let text = `<c>crimson<c>You have encountered foes!\n`;
            let totalPower = 0;
            this.foes.forEach((foe) => {
                // @ts-ignore
                const en = new Enemy(enemies[foe.id]);
                const pw = en.calculateCombatPower();
                const { level, color } = getDangerLevel(pw);
                const power = level < 2 ? pw : "💀";
                totalPower += pw;
                text += `<c>${color}<c>${game.getLocalizedString(en.id)}, <c>white<c>${game.getLocalizedString("power")}: <c>${color}<c>${power}\n`;
            });
            const { level, color } = getDangerLevel(totalPower);
            text += `<c>white<c>${game.getLocalizedString("total_danger")}: <c>${color}<c>${level < 2 ? totalPower : "💀"}\n`;
            multiOptionWindow({
                title: "BATTLE!",
                text: text,
            }, [
                {
                    text: "Fight",
                    click: () => {
                        game.beginCombat(this.foes);
                        closeMultiOptionWindow();
                    },
                },
                {
                    text: "Escape" + ` (${this.escapeChance * 100}%)`,
                    click: () => {
                        closeMultiOptionWindow();
                        if (Math.random() < this.escapeChance * 2) {
                            // @ts-ignore
                            const dir = Object.entries(this.connections).find(([dir, id]) => id === dungeonController.prevRoom?.id)[0];
                            dungeonController.move(dir, { force: true });
                            dungeonController.canMove = true;
                            log.write(game.getLocalizedString("escape_success"));
                        }
                        else {
                            game.beginCombat(this.foes);
                            log.write(game.getLocalizedString("escape_failure"));
                        }
                    },
                },
            ]);
        }
    }
}
function createRoomIcon(src) {
    const icon = document.createElement("img");
    icon.src = src;
    icon.classList.add("room-icon");
    return icon;
}
function buildDungeon() {
    if (!dungeonController.currentDungeon)
        return;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    dungeonController.currentDungeon.rooms.forEach((room) => {
        const roomIcons = [];
        const roomDiv = document.createElement("div");
        roomDiv.classList.add("room");
        roomDiv.id = room.id;
        if (room.id === dungeonController?.currentRoom?.id) {
            roomDiv.classList.add("current-room");
            roomIcons.push(createRoomIcon("gfx/icons/barbarian.png"));
        }
        if (room.keysNeeded) {
            if (dungeonController.hasKeysNeeded(room)) {
                roomIcons.push(createRoomIcon("gfx/icons/open-gate.png"));
            }
            else {
                roomIcons.push(createRoomIcon("gfx/icons/closed-doors.png"));
            }
        }
        if (room.isBoss) {
            roomDiv.classList.add("boss-room");
            roomIcons.push(createRoomIcon("gfx/icons/brute.png"));
        }
        else if (room.foes.length > 0 && !room.isBoss) {
            roomIcons.push(createRoomIcon("gfx/icons/crossed-swords.png"));
        }
        if (room.loot.length > 0) {
            roomIcons.push(createRoomIcon("gfx/icons/chest.png"));
        }
        roomIcons.forEach((icon, index) => {
            if (index === 0)
                icon.classList.add("first-icon");
            roomDiv.appendChild(icon);
        });
        roomDiv.style.position = "absolute";
        if (room.relative_to) {
            const relativeRoom = dungeonContent.querySelector(`#${room.relative_to}`);
            if (relativeRoom) {
                const relativeLeft = +relativeRoom.style.left.replace("px", "");
                const relativeTop = +relativeRoom.style.top.replace("px", "");
                roomDiv.style.left = `${Math.round(relativeLeft + room.position.x * 10)}px`;
                roomDiv.style.top = `${Math.round(relativeTop + room.position.y * 10)}px`;
            }
        }
        else {
            roomDiv.style.left = `${Math.round(room.position.x * 10)}px`;
            roomDiv.style.top = `${Math.round(room.position.y * 10)}px`;
        }
        dungeonContent.appendChild(roomDiv);
    });
    const lineSize = convertRemToPixels(3);
    const lineWidth = 6;
    // Draw lines between perks
    dungeonController.currentDungeon.rooms.forEach((_room) => {
        let room = dungeonContent.querySelector(`#${_room.id}`);
        Object.entries(_room.connections).forEach(([value, key]) => {
            let found = dungeonContent.querySelector(`#${key}`);
            let color = "rgb(65, 65, 65)";
            let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            //if (_perk.owned()) color = "gold";
            //else if (!_perk.available()) color = "rgb(40, 40, 40)";
            line.setAttribute("x1", `${+room.style.left.replace(/\D/g, "") + lineSize}px`);
            line.setAttribute("y1", `${+room.style.top.replace(/\D/g, "") + lineSize}px`);
            line.setAttribute("x2", `${+found.style.left.replace(/\D/g, "") + lineSize}px`);
            line.setAttribute("y2", `${+found.style.top.replace(/\D/g, "") + lineSize}px`);
            line.setAttribute("stroke", color);
            line.setAttribute("stroke-width", `${lineWidth}px`);
            svg.appendChild(line);
        });
    });
    svg.setAttribute("width", "4000");
    svg.setAttribute("height", "4000");
    dungeonContent.appendChild(svg);
    dungeonContent.scrollTo(dungeonController.prevScroll.x, dungeonController.prevScroll.y);
    const found = dungeonContent.querySelector(`#${dungeonController.currentRoom?.id}`);
    const posX = found.offsetLeft - window.innerWidth / 2 + found.offsetWidth * 3;
    const posY = found.offsetTop - window.innerHeight / 2 + found.offsetHeight;
    dungeonContent.scrollTo({ top: posY, left: posX, behavior: "smooth" });
}
addDragToScroll(dungeonContent);
class DungeonController {
    id;
    currentRoom;
    currentDungeon;
    canMove;
    prevScroll;
    prevRoom;
    constructor() {
        this.id = "dungeon_controller";
        this.currentRoom = null;
        this.currentDungeon = null;
        this.canMove = true;
        this.prevScroll = { x: 0, y: 0 };
        this.prevRoom = null;
    }
    reset() {
        this.currentRoom = null;
        this.currentDungeon = null;
    }
    enterDungeon(dungeon) {
        closeConfirmationWindow();
        this.reset();
        lobbyView.classList.add("no-display");
        dungeonScreen.classList.remove("no-display");
        dungeonContent.innerHTML = "";
        this.currentDungeon = dungeon;
        this.currentRoom = dungeon.rooms[0];
        buildDungeon();
    }
    hasKey(key) {
        return player.key_items.includes(key);
    }
    hasKeysNeeded(room) {
        return room.keysNeeded?.every((key) => this.hasKey(key));
    }
    move(direction, options) {
        if (!this.currentRoom || (!this.canMove && !options?.force))
            return;
        this.canMove = false;
        const found = dungeonContent.querySelector(`#${this.currentRoom?.id}`);
        const posX = found.offsetLeft - window.innerWidth / 2 + found.offsetWidth * 3;
        const posY = found.offsetTop - window.innerHeight / 2 + found.offsetHeight;
        this.prevScroll = { x: posX, y: posY };
        const nextRoomId = this.currentRoom.connections[direction];
        if (!nextRoomId)
            return;
        const nextRoom = this.currentDungeon?.rooms.find((room) => room.id === nextRoomId);
        if (!nextRoom)
            return;
        if (nextRoom.keysNeeded && !this.hasKeysNeeded(nextRoom))
            return;
        this.prevRoom = this.currentRoom;
        this.currentRoom = nextRoom;
        dungeonContent.innerHTML = "";
        buildDungeon();
        setTimeout(() => {
            nextRoom.enter();
        }, 330);
    }
}
const dungeonController = new DungeonController();
//# sourceMappingURL=dungeon.js.map