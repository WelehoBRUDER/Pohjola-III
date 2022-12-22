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
    if (level > 0.5 && level < 1) {
        color = "white";
    }
    if (level > 1 && level < 1.5) {
        color = "yellow";
    }
    if (level > 1.5 && level < 2) {
        color = "orange";
    }
    if (level >= 2) {
        color = "red";
    }
    return { level, color };
}
class Stage {
    constructor({ id, foes }) {
        if (!id)
            throw new Error("Stage must have an id");
        if (!foes)
            throw new Error("How could you forget the foes?");
        this.id = id;
        this.foes = [...foes];
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
            }),
        ],
    },
    {
        id: "floor_2",
        map: "southern_plains",
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
            }),
        ],
    },
];
let currentStage = "";
function createFloors() {
    lobbyContent.innerHTML = "<div class='floors'></div>";
    const floorsElement = document.querySelector(".floors");
    floors.forEach((floor) => {
        const stageElement = document.createElement("div");
        stageElement.classList.add("stage");
        stageElement.innerText = game.getLocalizedString(floor.id);
        stageElement.onclick = () => {
            createStages(floor.stages);
        };
        floorsElement.append(stageElement);
    });
}
function createStages(stages) {
    lobbyContent.innerHTML = "<div class='stages'></div>";
    const stagesElement = document.querySelector(".stages");
    stages.forEach((stage) => {
        const stageElement = document.createElement("div");
        stageElement.classList.add("stage");
        stageElement.innerText = game.getLocalizedString(stage.id);
        if (player.completed_stages.includes(stage.id)) {
            stageElement.classList.add("complete");
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