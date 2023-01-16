"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function getDangerLevel(pl) {
    var level = 0;
    var color = "white";
    var playerPower = player.calculateCombatPower();
    var enemyPower = pl;
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
    return { level: level, color: color };
}
var Stage = /** @class */ (function () {
    function Stage(_a) {
        var id = _a.id, foes = _a.foes, isBoss = _a.isBoss;
        if (!id)
            throw new Error("Stage must have an id");
        if (!foes)
            throw new Error("How could you forget the foes?");
        this.id = id;
        this.foes = __spreadArray([], foes);
        this.isBoss = isBoss;
    }
    Stage.prototype.tooltip = function () {
        var totalPower = 0;
        var text = "<f>1.5rem<f>";
        text += "<c>goldenrod<c>" + game.getLocalizedString(this.id) + "\n";
        text += "<f>1.25rem<f>";
        text += "<c>white<c>" + game.getLocalizedString("foes") + "\n";
        this.foes.forEach(function (foe) {
            // @ts-ignore
            var en = new Enemy(enemies[foe.id]);
            var pw = en.calculateCombatPower();
            var _a = getDangerLevel(pw), level = _a.level, color = _a.color;
            var power = level < 2 ? pw : "💀";
            totalPower += pw;
            text += "<c>" + color + "<c>" + game.getLocalizedString(en.id) + ", <c>white<c>" + game.getLocalizedString("power") + ": <c>" + color + "<c>" + power + "\n";
        });
        text += "<f>1.25rem<f>";
        var _a = getDangerLevel(totalPower), level = _a.level, color = _a.color;
        text += "<c>white<c>" + game.getLocalizedString("total_danger") + ": <c>" + color + "<c>" + (level < 2 ? totalPower : "💀") + "\n";
        if (player.completed_stages.includes(this.id)) {
            if (challenges.no_grinding) {
                text += "<c>orange<c>" + game.getLocalizedString("already_completed") + "\n";
            }
            text += "<c>lime<c>" + game.getLocalizedString("completed");
        }
        if (this.isBoss) {
            text += "\n<c>crimson<c>" + game.getLocalizedString("boss");
        }
        return text;
    };
    Stage.prototype.start = function () {
        if (player.completed_stages.includes(this.id)) {
            if (challenges.no_grinding) {
                return;
            }
        }
        currentStage = this.id;
        game.beginCombat(this.foes);
    };
    return Stage;
}());
var floors = [
    {
        id: "floor_1",
        map: "southern_plains",
        beat_stage_to_unlock: "",
        stages: [
            new Stage({
                id: "tutorial",
                foes: [new Enemy(enemies.skeleton)]
            }),
            new Stage({
                id: "graveyard_expedition",
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton)]
            }),
            new Stage({
                id: "undead_menace",
                foes: [new Enemy(enemies.skeleton_brute)]
            }),
            new Stage({
                id: "stage_4",
                foes: [new Enemy(enemies.skeleton_brute), new Enemy(enemies.skeleton)]
            }),
            new Stage({
                id: "stage_5",
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton_brute), new Enemy(enemies.skeleton)]
            }),
            new Stage({
                id: "stage_6",
                foes: [new Enemy(enemies.skeleton_brute), new Enemy(enemies.skeleton_brute)]
            }),
            new Stage({
                id: "stage_7",
                foes: [new Enemy(enemies.skeleton_knight)]
            }),
            new Stage({
                id: "stage_8",
                foes: [new Enemy(enemies.skeleton_knight), new Enemy(enemies.skeleton_brute)]
            }),
            new Stage({
                id: "stage_9",
                foes: [new Enemy(enemies.skeleton), new Enemy(enemies.skeleton_knight), new Enemy(enemies.skeleton)]
            }),
            new Stage({
                id: "tomb_of_the_mage",
                foes: [new Enemy(enemies.skeleton_mage)],
                isBoss: true
            }),
        ]
    },
    {
        id: "floor_2",
        map: "southern_plains",
        beat_stage_to_unlock: "tomb_of_the_mage",
        stages: [
            new Stage({
                id: "stage_11",
                foes: [new Enemy(enemies.goblin)]
            }),
            new Stage({
                id: "stage_12",
                foes: [new Enemy(enemies.orc)]
            }),
            new Stage({
                id: "stage_13",
                foes: [new Enemy(enemies.goblin), new Enemy(enemies.orc)]
            }),
            new Stage({
                id: "stage_14",
                foes: [new Enemy(enemies.goblin), new Enemy(enemies.orc), new Enemy(enemies.goblin)]
            }),
            new Stage({
                id: "stage_15",
                foes: [new Enemy(enemies.orc_berserker)]
            }),
            new Stage({
                id: "stage_16",
                foes: [new Enemy(enemies.orc_berserker), new Enemy(enemies.orc)]
            }),
            new Stage({
                id: "stage_17",
                foes: [new Enemy(enemies.orc_berserker), new Enemy(enemies.orc_berserker)]
            }),
            new Stage({
                id: "stage_18",
                foes: [new Enemy(enemies.orc), new Enemy(enemies.orc_berserker), new Enemy(enemies.orc)]
            }),
            new Stage({
                id: "stage_19",
                foes: [new Enemy(enemies.orc_berserker), new Enemy(enemies.orc_berserker), new Enemy(enemies.goblin)]
            }),
            new Stage({
                id: "stage_20",
                foes: [new Enemy(enemies.troll)],
                isBoss: true
            }),
        ]
    },
    {
        id: "floor_3",
        map: "southern_plains",
        beat_stage_to_unlock: "stage_20",
        stages: [
            new Stage({
                id: "stage_21",
                foes: [new Enemy(enemies.minotaur)]
            }),
            new Stage({
                id: "stage_22",
                foes: [new Enemy(enemies.minotaur_warrior)]
            }),
        ]
    },
];
var currentStage = "";
function createFloors() {
    lobbyContent.innerHTML = "\n    <div class=\"stages-upper\">\n      <h1>" + game.getLocalizedString("floors") + "</h1>\n    </div>\n    <div class=\"floors\"></div>\n    ";
    var floorsElement = document.querySelector(".floors");
    floors.forEach(function (floor) {
        var stageElement = document.createElement("div");
        stageElement.classList.add("stage");
        if (!player.completed_stages.includes(floor.beat_stage_to_unlock) && floor.beat_stage_to_unlock !== "" && !DEVTOOLS.ENABLED) {
            stageElement.classList.add("locked");
            tooltip(stageElement, "<c>white<c>" + game.getLocalizedString("beat_stage_to_unlock") + ": <c>yellow<c>" + game.getLocalizedString(floor.beat_stage_to_unlock));
        }
        else {
            stageElement.onclick = function () {
                createStages(floor.stages);
            };
        }
        stageElement.innerText = game.getLocalizedString(floor.id);
        floorsElement.append(stageElement);
    });
}
function createStages(stages) {
    lobbyContent.innerHTML = "\n    <div class=\"stages-upper\">\n      <button class=\"back-button\" onclick=\"createFloors()\">" + game.getLocalizedString("back") + "</button>\n    </div>\n    <div class=\"stages\"></div>\n    ";
    var stagesElement = document.querySelector(".stages");
    stages.forEach(function (stage) {
        var stageElement = document.createElement("div");
        stageElement.classList.add("stage");
        stageElement.innerText = game.getLocalizedString(stage.id);
        if (player.completed_stages.includes(stage.id)) {
            stageElement.classList.add("complete");
        }
        else if (stage.isBoss) {
            stageElement.classList.add("boss");
        }
        tooltip(stageElement, stage.tooltip());
        stageElement.onclick = function () {
            stage.start();
        };
        stagesElement.append(stageElement);
    });
}
function calculateProgress(player) {
    var totalStages = 0;
    var completedStages = 0;
    floors.forEach(function (floor) {
        totalStages += floor.stages.length;
        floor.stages.forEach(function (stage) {
            if (player.completed_stages.includes(stage.id)) {
                completedStages++;
            }
        });
    });
    return Math.floor((completedStages / totalStages) * 100);
}
//# sourceMappingURL=stages.js.map