"use strict";
function getDangerLevel(pl) {
    let level = 0;
    let color = "white";
    const playerPower = player.calculateCombatPower();
    const enemyPower = pl;
    level = enemyPower / playerPower;
    if (level < 0.5) {
        color = "green";
    }
    if (level >= 0.5 && level < 1) {
        color = "white";
    }
    if (level >= 1 && level < 1.5) {
        color = "yellow";
    }
    if (level >= 1.5 && level < 2) {
        color = "orange";
    }
    if (level >= 2) {
        color = "red";
    }
    return { level, color };
}
class Stage {
    id;
    foes;
    score;
    isBoss;
    constructor({ id, score, foes, isBoss }) {
        if (!id)
            throw new Error("Stage must have an id");
        if (!foes)
            throw new Error("How could you forget the foes?");
        this.id = id;
        this.foes = [...foes];
        this.score = score || 0;
        this.isBoss = isBoss;
    }
    tooltip() {
        let totalPower = 0;
        let text = "<f>1.5rem<f>";
        text += `<c>goldenrod<c>${game.getLocalizedString(this.id)}\n`;
        text += "<f>1.25rem<f>";
        text += `<c>white<c>${game.getLocalizedString("foes")}\n`;
        this.foes.forEach((foe) => {
            // @ts-ignore
            const en = new Enemy(enemies[foe.id]);
            const pw = en.calculateCombatPower();
            text += getEnemyPowerText(en, pw);
            totalPower += pw;
        });
        text += "<f>1.25rem<f>";
        text += getTotalPowerText(totalPower);
        if (player.completed_stages.includes(this.id)) {
            if (challenges.no_grinding) {
                text += `<c>orange<c>${game.getLocalizedString("already_completed")}\n`;
            }
            text += `<c>lime<c>${game.getLocalizedString("completed")}`;
        }
        if (this.isBoss) {
            text += `\n<c>crimson<c>${game.getLocalizedString("boss")}`;
        }
        return text;
    }
    start() {
        if (player.completed_stages.includes(this.id)) {
            if (challenges.no_grinding) {
                return;
            }
        }
        currentStage = { ...this };
        game.beginCombat(this.foes);
    }
}
const floors = [
    {
        id: "floor_1",
        map: "southern_plains",
        beat_stage_to_unlock: "",
        stages: [
            new Stage({
                id: "tutorial",
                score: 10,
                foes: [new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "graveyard_expedition",
                score: 20,
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "undead_menace",
                score: 25,
                foes: [new Enemy(enemies.skeleton_brute)],
            }),
            new Stage({
                id: "stage_4",
                score: 35,
                foes: [new Enemy(enemies.skeleton_brute), new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "stage_5",
                score: 45,
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton_brute), new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "stage_6",
                score: 50,
                foes: [new Enemy(enemies.skeleton_brute), new Enemy(enemies.skeleton_brute)],
            }),
            new Stage({
                id: "stage_7",
                score: 60,
                foes: [new Enemy(enemies.skeleton_knight)],
            }),
            new Stage({
                id: "stage_8",
                score: 75,
                foes: [new Enemy(enemies.skeleton_knight), new Enemy(enemies.skeleton_brute)],
            }),
            new Stage({
                id: "stage_9",
                score: 80,
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton_knight), new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "tomb_of_the_mage",
                score: 100,
                foes: [new Enemy(enemies.skeleton_mage)],
                isBoss: true,
            }),
        ],
    },
    {
        id: "floor_2",
        map: "southern_plains",
        key_item_to_unlock: "vithail_lord_insignia",
        stages: [
            new Stage({
                id: "stage_11",
                score: 30,
                foes: [new Enemy(enemies.goblin)],
            }),
            new Stage({
                id: "stage_12",
                score: 60,
                foes: [new Enemy(enemies.orc)],
            }),
            new Stage({
                id: "stage_13",
                score: 90,
                foes: [new Enemy(enemies.goblin), new Enemy(enemies.orc)],
            }),
            new Stage({
                id: "stage_14",
                score: 120,
                foes: [new Enemy(enemies.goblin), new Enemy(enemies.orc), new Enemy(enemies.goblin)],
            }),
            new Stage({
                id: "stage_15",
                score: 150,
                foes: [new Enemy(enemies.orc_berserker)],
            }),
            new Stage({
                id: "stage_16",
                score: 210,
                foes: [new Enemy(enemies.orc_berserker), new Enemy(enemies.orc)],
            }),
            new Stage({
                id: "stage_17",
                score: 300,
                foes: [new Enemy(enemies.orc_berserker), new Enemy(enemies.orc_berserker)],
            }),
            new Stage({
                id: "stage_18",
                score: 270,
                foes: [new Enemy(enemies.orc), new Enemy(enemies.orc_berserker), new Enemy(enemies.orc)],
            }),
            new Stage({
                id: "stage_19",
                score: 330,
                foes: [new Enemy(enemies.orc_berserker), new Enemy(enemies.orc_berserker), new Enemy(enemies.goblin)],
            }),
            new Stage({
                id: "stage_20",
                score: 500,
                foes: [new Enemy(enemies.troll)],
                isBoss: true,
            }),
        ],
    },
    {
        id: "floor_3",
        map: "southern_plains",
        key_item_to_unlock: "orc_chief_tusk",
        stages: [
            new Stage({
                id: "stage_21",
                score: 200,
                foes: [new Enemy(enemies.minotaur)],
            }),
            new Stage({
                id: "stage_22",
                score: 280,
                foes: [new Enemy(enemies.minotaur_warrior)],
            }),
            new Stage({
                id: "stage_23",
                score: 400,
                foes: [new Enemy(enemies.minotaur), new Enemy(enemies.minotaur)],
            }),
            new Stage({
                id: "stage_24",
                score: 480,
                foes: [new Enemy(enemies.minotaur_warrior), new Enemy(enemies.minotaur)],
            }),
            new Stage({
                id: "stage_25",
                score: 550,
                foes: [new Enemy(enemies.minotaur_sage)],
            }),
            new Stage({
                id: "stage_26",
                score: 560,
                foes: [new Enemy(enemies.minotaur_warrior), new Enemy(enemies.minotaur_warrior)],
            }),
            new Stage({
                id: "stage_27",
                score: 750,
                foes: [new Enemy(enemies.minotaur_sage), new Enemy(enemies.minotaur)],
            }),
            new Stage({
                id: "stage_28",
                score: 680,
                foes: [new Enemy(enemies.minotaur), new Enemy(enemies.minotaur_warrior), new Enemy(enemies.minotaur)],
            }),
            new Stage({
                id: "stage_29",
                score: 950,
                foes: [new Enemy(enemies.minotaur), new Enemy(enemies.minotaur_sage), new Enemy(enemies.minotaur)],
            }),
            new Stage({
                id: "stage_30",
                score: 1000,
                foes: [new Enemy(enemies.minotaur_captain)],
            }),
        ],
    },
];
function calculateFloorPower(stages) {
    let power = 0;
    stages.forEach((stage) => {
        let stagePower = 0;
        stage.foes.forEach((foe) => {
            // @ts-ignore
            const en = new Enemy(enemies[foe.id]);
            const pw = en.calculateCombatPower();
            stagePower += pw;
        });
        power += stagePower;
    });
    const pw = Math.round(power / stages.length);
    const { color } = getDangerLevel(pw);
    const danger = Math.floor(pw * 0.65).toString();
    return { danger, color };
}
let currentStage = {};
function isFloorUnlocked(floor) {
    if (DEVTOOLS.ENABLED)
        return true;
    let unlocked = true;
    if (floor.beat_stage_to_unlock && floor.beat_stage_to_unlock !== "") {
        unlocked = player.completed_stages.includes(floor.beat_stage_to_unlock);
    }
    if (floor.key_item_to_unlock && floor.key_item_to_unlock !== "") {
        unlocked = player.hasKeyItem(floor.key_item_to_unlock);
    }
    return unlocked;
}
function isDungeonUnlocked(dungeon) {
    return player.completed_stages.includes(dungeon.beat_stage_to_unlock);
}
function createFloors() {
    lobbyContent.innerHTML = `
    <div class="stages-upper">
      <h1>${game.getLocalizedString("floors")}</h1>
    </div>
    <div class="floors"></div>
    <div class="dungeons-title"><h1>${game.getLocalizedString("dungeons")}</h1></div>
    <div class="dungeons"></div>
    `;
    const floorsElement = document.querySelector(".floors");
    const dungeonsElement = document.querySelector(".dungeons");
    floors.forEach((floor) => {
        const stageElement = document.createElement("div");
        stageElement.classList.add("stage");
        let floorTooltip = `<f>1.25rem<f><c>goldenrod<c>${game.getLocalizedString(floor.id)}\n<f>1rem<f><c>silver<c>"${game.getLocalizedString(floor.id + "_desc")}"\n\n<c>white<c>`;
        if (!isFloorUnlocked(floor)) {
            stageElement.classList.add("locked");
            if (floor.key_item_to_unlock) {
                floorTooltip += `<c>white<c>${game.getLocalizedString("key_item_to_unlock")}: <c>yellow<c>${game.getLocalizedString(floor.key_item_to_unlock)}\n`;
            }
            if (floor.beat_stage_to_unlock) {
                floorTooltip += `<c>white<c>${game.getLocalizedString("beat_stage_to_unlock")}: <c>yellow<c>${game.getLocalizedString(floor.beat_stage_to_unlock)}\n`;
            }
        }
        else {
            stageElement.onclick = () => {
                createStages(floor.stages);
            };
        }
        const { danger, color } = calculateFloorPower(floor.stages);
        floorTooltip += `<c>white<c>${game.getLocalizedString("average_power")}: <c>${color}<c>${danger}`;
        tooltip(stageElement, floorTooltip);
        stageElement.innerText = game.getLocalizedString(floor.id);
        floorsElement.append(stageElement);
    });
    dungeons.forEach((dungeon) => {
        const dungeonElement = createDungeonElement(dungeon);
        dungeonsElement.append(dungeonElement);
    });
}
function createDungeonElement(dungeon) {
    const dungeonElement = document.createElement("div");
    dungeonElement.classList.add("stage");
    dungeonElement.innerText = game.getLocalizedString(dungeon.id);
    let dungeonTooltip = `<f>1.25rem<f><c>goldenrod<c>${game.getLocalizedString(dungeon.id)}\n<f>1rem<f><c>silver<c>"${game.getLocalizedString(dungeon.id + "_desc")}"\n\n<c>white<c>`;
    dungeonTooltip += game.getLocalizedString("dungeon_warn");
    if (!isDungeonUnlocked(dungeon) && !DEVTOOLS.ENABLED) {
        dungeonElement.classList.add("locked");
        dungeonTooltip += `<c>white<c>${game.getLocalizedString("beat_stage_to_unlock")}: <c>yellow<c>${game.getLocalizedString(dungeon.beat_stage_to_unlock)}\n`;
    }
    else {
        dungeonElement.onclick = () => {
            const txt = `<c>white<c>${game.getLocalizedString("enter_dungeon_1")} <c>goldenrod<c>${game.getLocalizedString(dungeon.id)}<c>white<c>?`;
            confirmationWindow(txt, () => {
                dungeonController.enterDungeon(dungeon);
            });
        };
    }
    tooltip(dungeonElement, dungeonTooltip);
    return dungeonElement;
}
function createStages(stages) {
    lobbyContent.innerHTML = `
    <div class="stages-upper">
      <h1>${game.getLocalizedString("stages")}</h1>
      <button class="back-button" onclick="createFloors()">${game.getLocalizedString("back")}</button>
    </div>
    <div class="stages"></div>
    <div class="dungeons-title"><h1>${game.getLocalizedString("dungeon")}</h1></div>
    <div class="dungeons"></div>
    `;
    const stagesElement = document.querySelector(".stages");
    const dungeonsElement = document.querySelector(".dungeons");
    let dungeon;
    stages.forEach((stage) => {
        const stageElement = document.createElement("div");
        stageElement.classList.add("stage");
        stageElement.innerText = game.getLocalizedString(stage.id);
        if (player.completed_stages.includes(stage.id)) {
            stageElement.classList.add("complete");
        }
        else if (stage.isBoss) {
            stageElement.classList.add("boss");
            dungeon = dungeons.find((dungeon) => dungeon.beat_stage_to_unlock === stage.id);
        }
        tooltip(stageElement, stage.tooltip());
        stageElement.onclick = () => {
            stage.start();
        };
        stagesElement.append(stageElement);
    });
    if (dungeon) {
        const dungeonElement = createDungeonElement(dungeon);
        dungeonsElement.append(dungeonElement);
    }
}
function calculateProgress(player) {
    let totalNeed = 0;
    let completed = 0;
    floors.forEach((floor) => {
        totalNeed += floor.stages.length;
        floor.stages.forEach((stage) => {
            if (player.completed_stages.includes(stage.id)) {
                completed++;
            }
        });
    });
    totalNeed += keyItems.length;
    completed += player.key_items?.length || 0;
    return Math.floor((completed / totalNeed) * 100);
}
//# sourceMappingURL=stages.js.map