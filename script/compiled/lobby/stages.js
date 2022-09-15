"use strict";
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
        let text = "<f>1.5rem<f>";
        text += `<c>goldenrod<c>${game.getLocalizedString(this.id)}\n`;
        text += "<f>1.25rem<f>";
        text += `<c>white<c>${game.getLocalizedString("foes")}\n`;
        this.foes.forEach((foe) => {
            text += `<c>silver<c>${game.getLocalizedString(foe.id)}\n`;
        });
        return text;
    }
    start() {
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
        ],
    },
];
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
        tooltip(stageElement, stage.tooltip());
        stageElement.onclick = () => {
            stage.start();
        };
        stagesElement.append(stageElement);
    });
}
//# sourceMappingURL=stages.js.map