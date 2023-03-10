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
    isBoss;
    constructor({ id, foes, isBoss }) {
        if (!id)
            throw new Error("Stage must have an id");
        if (!foes)
            throw new Error("How could you forget the foes?");
        this.id = id;
        this.foes = [...foes];
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
            const { level, color } = getDangerLevel(pw);
            const power = level < 2 ? pw : "💀";
            totalPower += pw;
            text += `<c>${color}<c>${game.getLocalizedString(en.id)}, <c>white<c>${game.getLocalizedString("power")}: <c>${color}<c>${power}\n`;
        });
        text += "<f>1.25rem<f>";
        const { level, color } = getDangerLevel(totalPower);
        text += `<c>white<c>${game.getLocalizedString("total_danger")}: <c>${color}<c>${level < 2 ? totalPower : "💀"}\n`;
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
        currentStage = this.id;
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
                foes: [new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "graveyard_expedition",
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "undead_menace",
                foes: [new Enemy(enemies.skeleton_brute)],
            }),
            new Stage({
                id: "stage_4",
                foes: [new Enemy(enemies.skeleton_brute), new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "stage_5",
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton_brute), new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "stage_6",
                foes: [new Enemy(enemies.skeleton_brute), new Enemy(enemies.skeleton_brute)],
            }),
            new Stage({
                id: "stage_7",
                foes: [new Enemy(enemies.skeleton_knight)],
            }),
            new Stage({
                id: "stage_8",
                foes: [new Enemy(enemies.skeleton_knight), new Enemy(enemies.skeleton_brute)],
            }),
            new Stage({
                id: "stage_9",
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton_knight), new Enemy(enemies.skeleton)],
            }),
            new Stage({
                id: "tomb_of_the_mage",
                foes: [new Enemy(enemies.skeleton_mage)],
                isBoss: true,
            }),
        ],
    },
    {
        id: "floor_2",
        map: "southern_plains",
        beat_stage_to_unlock: "tomb_of_the_mage",
        stages: [
            new Stage({
                id: "stage_11",
                foes: [new Enemy(enemies.goblin)],
            }),
            new Stage({
                id: "stage_12",
                foes: [new Enemy(enemies.orc)],
            }),
            new Stage({
                id: "stage_13",
                foes: [new Enemy(enemies.goblin), new Enemy(enemies.orc)],
            }),
            new Stage({
                id: "stage_14",
                foes: [new Enemy(enemies.goblin), new Enemy(enemies.orc), new Enemy(enemies.goblin)],
            }),
            new Stage({
                id: "stage_15",
                foes: [new Enemy(enemies.orc_berserker)],
            }),
            new Stage({
                id: "stage_16",
                foes: [new Enemy(enemies.orc_berserker), new Enemy(enemies.orc)],
            }),
            new Stage({
                id: "stage_17",
                foes: [new Enemy(enemies.orc_berserker), new Enemy(enemies.orc_berserker)],
            }),
            new Stage({
                id: "stage_18",
                foes: [new Enemy(enemies.orc), new Enemy(enemies.orc_berserker), new Enemy(enemies.orc)],
            }),
            new Stage({
                id: "stage_19",
                foes: [new Enemy(enemies.orc_berserker), new Enemy(enemies.orc_berserker), new Enemy(enemies.goblin)],
            }),
            new Stage({
                id: "stage_20",
                foes: [new Enemy(enemies.troll)],
                isBoss: true,
            }),
        ],
    },
    {
        id: "floor_3",
        map: "southern_plains",
        beat_stage_to_unlock: "stage_20",
        stages: [
            new Stage({
                id: "stage_21",
                foes: [new Enemy(enemies.minotaur)],
            }),
            new Stage({
                id: "stage_22",
                foes: [new Enemy(enemies.minotaur_warrior)],
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
let currentStage = "";
function createFloors() {
    lobbyContent.innerHTML = `
    <div class="stages-upper">
      <h1>${game.getLocalizedString("floors")}</h1>
    </div>
    <div class="floors"></div>
    <div class="dungeons"></div>
    `;
    const floorsElement = document.querySelector(".floors");
    const dungeonsElement = document.querySelector(".dungeons");
    floors.forEach((floor) => {
        const stageElement = document.createElement("div");
        stageElement.classList.add("stage");
        let floorTooltip = `<f>1.25rem<f><c>goldenrod<c>${game.getLocalizedString(floor.id)}\n<f>1rem<f><c>silver<c>"${game.getLocalizedString(floor.id + "_desc")}"\n\n<c>white<c>`;
        if (!player.completed_stages.includes(floor.beat_stage_to_unlock) && floor.beat_stage_to_unlock !== "" && !DEVTOOLS.ENABLED) {
            stageElement.classList.add("locked");
            floorTooltip += `<c>white<c>${game.getLocalizedString("beat_stage_to_unlock")}: <c>yellow<c>${game.getLocalizedString(floor.beat_stage_to_unlock)}`;
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
        const dungeonElement = document.createElement("div");
        dungeonElement.classList.add("stage");
        dungeonElement.innerText = game.getLocalizedString(dungeon.id);
        dungeonElement.onclick = () => {
            const txt = `<c>white<c>${game.getLocalizedString("enter_dungeon_1")} <c>goldenrod<c>${game.getLocalizedString(dungeon.id)}<c>white<c>?`;
            confirmationWindow(txt, () => {
                dungeonController.enterDungeon(dungeon);
            });
        };
        dungeonsElement.append(dungeonElement);
    });
}
function createStages(stages) {
    lobbyContent.innerHTML = `
    <div class="stages-upper">
      <button class="back-button" onclick="createFloors()">${game.getLocalizedString("back")}</button>
    </div>
    <div class="stages"></div>
    `;
    const stagesElement = document.querySelector(".stages");
    stages.forEach((stage) => {
        const stageElement = document.createElement("div");
        stageElement.classList.add("stage");
        stageElement.innerText = game.getLocalizedString(stage.id);
        if (player.completed_stages.includes(stage.id)) {
            stageElement.classList.add("complete");
        }
        else if (stage.isBoss) {
            stageElement.classList.add("boss");
        }
        tooltip(stageElement, stage.tooltip());
        stageElement.onclick = () => {
            stage.start();
        };
        stagesElement.append(stageElement);
    });
}
function calculateProgress(player) {
    let totalStages = 0;
    let completedStages = 0;
    floors.forEach((floor) => {
        totalStages += floor.stages.length;
        floor.stages.forEach((stage) => {
            if (player.completed_stages.includes(stage.id)) {
                completedStages++;
            }
        });
    });
    return Math.floor((completedStages / totalStages) * 100);
}
//# sourceMappingURL=stages.js.map