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
    exit;
    end;
    getKeys;
    relative_to;
    score;
    position;
    connections;
    keysNeeded;
    escapeChance;
    restore;
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
        this.exit = room.exit;
        this.end = room.end;
        this.escapeChance = room.escapeChance || 0.5;
        this.getKeys = room.getKeys || [];
        this.relative_to = room.relative_to;
        this.score = room.score || 0;
        this.position = room.position;
        this.connections = { ...room.connections };
        this.keysNeeded = room.keysNeeded || [];
        this.restore = room.restore || undefined;
    }
    enter() {
        if (this.foes.length > 0) {
            let text = `<c>crimson<c>You have encountered foes!\n`;
            let totalPower = 0;
            this.foes.forEach((foe) => {
                // @ts-ignore
                const en = new Enemy(enemies[foe.id]);
                const pw = en.calculateCombatPower();
                text += getEnemyPowerText(en, pw);
                totalPower += pw;
            });
            text += getTotalPowerText(totalPower);
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
                        if (Math.random() < this.escapeChance) {
                            // @ts-ignore
                            const dir = Object.entries(this.connections).find(([dir, id]) => id === dungeonController.prevRoom?.id)[0];
                            dungeonController.move(dir, { force: true });
                            dungeonController.canMove = true;
                            log.write(game.getLocalizedString("escape_success"));
                            log.createNotification(game.getLocalizedString("escape_success"));
                        }
                        else {
                            game.beginCombat(this.foes);
                            log.write(game.getLocalizedString("escape_failure"));
                            log.createNotification(game.getLocalizedString("escape_failure"));
                        }
                    },
                },
            ]);
        }
        else {
            if (!player.hasCompletedRoom(this.id)) {
                player.completed_rooms.push(this.id);
                if (this.loot.length > 0) {
                    const lootNames = this.loot.map((loot) => {
                        if (loot.item === "gold") {
                            return `${loot.amount} ${game.getLocalizedString("gold")}`;
                        }
                        else {
                            // @ts-ignore
                            const col = items[loot.item].tier.color;
                            return `<c>white<c><c>${col}<c>${game.getLocalizedString(loot.item)}<c>white<c> (${loot.amount}) `;
                        }
                    });
                    log.write(game.getLocalizedString("loot_found") + `: ${lootNames.join(", ")}`);
                    this.loot.forEach((loot) => {
                        if (loot.item === "gold") {
                            player.addGold(loot.amount);
                        }
                        else {
                            // @ts-ignore
                            player.addItem(new Item(items[loot.item]), loot.amount);
                        }
                    });
                    log.createNotification(game.getLocalizedString("loot_found") + `: ${lootNames.join(", ")}`);
                }
                if ((this.getKeys?.length || 0) > 0) {
                    this.getKeys?.forEach((key) => {
                        player.addKeyItem(key);
                    });
                    const keyNames = dungeonController.getKeyNames(this.getKeys || []);
                    log.write(game.getLocalizedString("keys_found") + `: ${keyNames.join(", ")}`);
                    log.createNotification(game.getLocalizedString("keys_found") + `: ${keyNames.join(", ")}`);
                }
            }
            if (this.end) {
                if (!player.hasCompletedDungeon(dungeonController.currentDungeon?.id || "")) {
                    player.completed_dungeons.push(dungeonController.currentDungeon?.id || "");
                }
                multiOptionWindow({
                    title: "END",
                    text: game.getLocalizedString(`${dungeonController.currentDungeon?.id}_end`),
                }, [
                    {
                        text: "Leave",
                        click: () => {
                            closeMultiOptionWindow();
                            dungeonController.leaveDungeon();
                        },
                    },
                    {
                        text: "Stay",
                        click: () => {
                            closeMultiOptionWindow();
                            dungeonController.canMove = true;
                        },
                    },
                ]);
            }
            if (this.exit) {
                multiOptionWindow({
                    title: "EXIT",
                    text: "You are standing at the exit of the dungeon.",
                }, [
                    {
                        text: "Leave",
                        click: () => {
                            closeMultiOptionWindow();
                            dungeonController.leaveDungeon();
                        },
                    },
                    {
                        text: "Stay",
                        click: () => {
                            closeMultiOptionWindow();
                            dungeonController.canMove = true;
                        },
                    },
                ]);
            }
            else if (this.restore) {
                multiOptionWindow({
                    title: "RESTORATION",
                    text: "You found a shrine that can restore your health and mana!",
                }, [
                    {
                        text: "Use it!",
                        click: () => {
                            player.restore();
                            log.write(game.getLocalizedString("restored"));
                            log.createNotification(game.getLocalizedString("restored_in_dungeon"));
                            closeMultiOptionWindow();
                            this.restore = false;
                            dungeonController.canMove = true;
                        },
                    },
                    {
                        text: "Leave it",
                        click: () => {
                            closeMultiOptionWindow();
                            dungeonController.canMove = true;
                        },
                    },
                ]);
            }
            else if (this.restore === false) {
                log.write(game.getLocalizedString("restore_depleted"));
                dungeonController.canMove = true;
            }
            else {
                dungeonController.canMove = true;
            }
            sideBarDetails();
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
        if (room.restore) {
            roomIcons.push(createRoomIcon("gfx/icons/shrine-enabled.png"));
        }
        else if (room.restore === false) {
            roomIcons.push(createRoomIcon("gfx/icons/shrine-disabled.png"));
        }
        if ((room.keysNeeded?.length || 0) > 0) {
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
        if ((room.getKeys?.length || 0) > 0) {
            roomIcons.push(createRoomIcon("gfx/icons/key.png"));
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
    leaveDungeon() {
        this.prevScroll = { x: dungeonContent.scrollLeft, y: dungeonContent.scrollTop };
        this.prevRoom = null;
        this.reset();
        dungeonScreen.classList.add("no-display");
        lobbyView.classList.remove("no-display");
        dungeonContent.innerHTML = "";
    }
    enterDungeon(dungeon) {
        closeConfirmationWindow();
        this.reset();
        lobbyView.classList.add("no-display");
        dungeonScreen.classList.remove("no-display");
        dungeonContent.innerHTML = "";
        this.currentDungeon = new Dungeon(JSON.parse(JSON.stringify(dungeon)));
        this.currentRoom = this.currentDungeon.rooms[0];
        this.canMove = true;
        buildDungeon();
    }
    hasKey(key) {
        return player.key_items.includes(key);
    }
    hasKeysNeeded(room) {
        return room.keysNeeded?.every((key) => this.hasKey(key));
    }
    getKeyNames(keys) {
        return keys.map((key) => game.getLocalizedString(key));
    }
    move(direction, options) {
        if (!this.currentRoom || (!this.canMove && !options?.force))
            return;
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
        if (nextRoom.keysNeeded && !this.hasKeysNeeded(nextRoom)) {
            log.createNotification(`${game.getLocalizedString("keys_needed")}: ${dungeonController.getKeyNames(nextRoom.keysNeeded).join(", ")}`);
            return;
        }
        this.prevRoom = this.currentRoom;
        this.currentRoom = nextRoom;
        if (this.currentRoom.foes.length > 0 || this.currentRoom.restore) {
            this.canMove = false;
        }
        dungeonContent.innerHTML = "";
        buildDungeon();
        setTimeout(() => {
            nextRoom.enter();
        }, 330);
    }
}
const dungeonController = new DungeonController();
//# sourceMappingURL=dungeon.js.map