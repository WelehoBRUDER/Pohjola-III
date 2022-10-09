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
  [work_around: string]: any;
  id: string;
  foes: Enemy[];
  constructor({ id, foes }: StageObject) {
    if (!id) throw new Error("Stage must have an id");
    if (!foes) throw new Error("How could you forget the foes?");
    this.id = id;
    this.foes = [...foes];
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
      const { level, color } = getDangerLevel(pw);
      const power = level < 2 ? pw : "💀";
      totalPower += pw;
      text += `<c>${color}<c>${game.getLocalizedString(en.id)}, <c>white<c>${game.getLocalizedString(
        "power"
      )}: <c>${color}<c>${power}\n`;
    });
    text += "<f>1.25rem<f>";
    const { level, color } = getDangerLevel(totalPower);
    text += `<c>white<c>${game.getLocalizedString("total_danger")}: <c>${color}<c>${level < 2 ? totalPower : "💀"}\n`;
    if (player.completed_stages.includes(this.id)) {
      text += `<c>lime<c>${game.getLocalizedString("completed")}`;
    }
    return text;
  }

  start(): void {
    currentStage = this.id;
    game.beginCombat(this.foes);
  }
}

const floors: any = [
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
];

let currentStage: string = "";

function createFloors() {
  lobbyContent.innerHTML = "<div class='floors'></div>";
  const floorsElement = document.querySelector(".floors")!;
  floors.forEach((floor: any) => {
    const stageElement = document.createElement("div");
    stageElement.classList.add("stage");
    stageElement.innerText = game.getLocalizedString(floor.id);
    stageElement.onclick = () => {
      createStages(floor.stages);
    };
    floorsElement.append(stageElement);
  });
}

function createStages(stages: Stage[]) {
  lobbyContent.innerHTML = "<div class='stages'></div>";
  const stagesElement = document.querySelector(".stages")!;
  stages.forEach((stage: Stage) => {
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
