interface StageObject {
  [work_around: string]: any;
  id: string;
  foes: Enemy[];
}

function getDangerLevel(pl: number): { level: number; color: string } {
  let level: number = 0;
  let color: string = "white";
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
  [work_around: string]: any;
  id: string;
  foes: Enemy[];
  isBoss: boolean;
  constructor({ id, foes, isBoss }: StageObject) {
    if (!id) throw new Error("Stage must have an id");
    if (!foes) throw new Error("How could you forget the foes?");
    this.id = id;
    this.foes = [...foes];
    this.isBoss = isBoss;
  }

  tooltip(): string {
    let totalPower: number = 0;
    let text: string = "<f>1.5rem<f>";
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

  start(): void {
    if (player.completed_stages.includes(this.id)) {
      if (challenges.no_grinding) {
        return;
      }
    }
    currentStage = this.id;
    game.beginCombat(this.foes);
  }
}

const floors: any = [
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
    key_item_to_unlock: "vithail_lord_insignia",
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

function calculateFloorPower(stages: Stage[]): { danger: string; color: string } {
  let power = 0;
  stages.forEach((stage: Stage) => {
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

let currentStage: string = "";

function isFloorUnlocked(floor: any): boolean {
  if (DEVTOOLS.ENABLED) return true;
  let unlocked = true;
  if (floor.beat_stage_to_unlock && floor.beat_stage_to_unlock !== "") {
    unlocked = player.completed_stages.includes(floor.beat_stage_to_unlock);
  }
  if (floor.key_item_to_unlock && floor.key_item_to_unlock !== "") {
    unlocked = player.hasKeyItem(floor.key_item_to_unlock);
  }
  return unlocked;
}

function isDungeonUnlocked(dungeon: any) {
  return player.completed_stages.includes(dungeon.beat_stage_to_unlock);
}

function createFloors() {
  lobbyContent.innerHTML = `
    <div class="stages-upper">
      <h1>${game.getLocalizedString("floors")}</h1>
    </div>
    <div class="floors"></div>
    <div class="dungeons"></div>
    `;
  const floorsElement = document.querySelector(".floors")!;
  const dungeonsElement = document.querySelector(".dungeons")!;
  floors.forEach((floor: any) => {
    const stageElement = document.createElement("div");
    stageElement.classList.add("stage");
    let floorTooltip = `<f>1.25rem<f><c>goldenrod<c>${game.getLocalizedString(floor.id)}\n<f>1rem<f><c>silver<c>"${game.getLocalizedString(
      floor.id + "_desc"
    )}"\n\n<c>white<c>`;
    if (!isFloorUnlocked(floor)) {
      stageElement.classList.add("locked");

      if (floor.key_item_to_unlock) {
        floorTooltip += `<c>white<c>${game.getLocalizedString("key_item_to_unlock")}: <c>yellow<c>${game.getLocalizedString(
          floor.key_item_to_unlock
        )}\n`;
      }
      if (floor.beat_stage_to_unlock) {
        floorTooltip += `<c>white<c>${game.getLocalizedString("beat_stage_to_unlock")}: <c>yellow<c>${game.getLocalizedString(
          floor.beat_stage_to_unlock
        )}\n`;
      }
    } else {
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
  dungeons.forEach((dungeon: any) => {
    const dungeonElement = document.createElement("div");
    dungeonElement.classList.add("stage");
    dungeonElement.innerText = game.getLocalizedString(dungeon.id);
    let dungeonTooltip = `<f>1.25rem<f><c>goldenrod<c>${game.getLocalizedString(
      dungeon.id
    )}\n<f>1rem<f><c>silver<c>"${game.getLocalizedString(dungeon.id + "_desc")}"\n\n<c>white<c>`;

    dungeonTooltip += game.getLocalizedString("dungeon_warn");

    if (!isDungeonUnlocked(dungeon)) {
      dungeonElement.classList.add("locked");
      dungeonTooltip += `<c>white<c>${game.getLocalizedString("beat_stage_to_unlock")}: <c>yellow<c>${game.getLocalizedString(
        dungeon.beat_stage_to_unlock
      )}\n`;
    } else {
      dungeonElement.onclick = () => {
        const txt = `<c>white<c>${game.getLocalizedString("enter_dungeon_1")} <c>goldenrod<c>${game.getLocalizedString(
          dungeon.id
        )}<c>white<c>?`;
        confirmationWindow(txt, () => {
          dungeonController.enterDungeon(dungeon);
        });
      };
    }
    tooltip(dungeonElement, dungeonTooltip);
    dungeonsElement.append(dungeonElement);
  });
}

function createStages(stages: Stage[]) {
  lobbyContent.innerHTML = `
    <div class="stages-upper">
      <button class="back-button" onclick="createFloors()">${game.getLocalizedString("back")}</button>
    </div>
    <div class="stages"></div>
    `;
  const stagesElement = document.querySelector(".stages")!;
  stages.forEach((stage: Stage) => {
    const stageElement = document.createElement("div");
    stageElement.classList.add("stage");
    stageElement.innerText = game.getLocalizedString(stage.id);
    if (player.completed_stages.includes(stage.id)) {
      stageElement.classList.add("complete");
    } else if (stage.isBoss) {
      stageElement.classList.add("boss");
    }
    tooltip(stageElement, stage.tooltip());
    stageElement.onclick = () => {
      stage.start();
    };
    stagesElement.append(stageElement);
  });
}

function calculateProgress(player: PlayerObject): number {
  let totalStages: number = 0;
  let completedStages: number = 0;
  floors.forEach((floor: any) => {
    totalStages += floor.stages.length;
    floor.stages.forEach((stage: Stage) => {
      if (player.completed_stages.includes(stage.id)) {
        completedStages++;
      }
    });
  });
  return Math.floor((completedStages / totalStages) * 100);
}
