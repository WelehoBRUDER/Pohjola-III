interface StageObject {
  [work_around: string]: any;
  id: string;
  foes: Enemy[];
}

class Stage {
  [work_around: string]: any;
  id: string;
  foes: Enemy[];
  constructor({ id, foes }: StageObject) {
    this.id = id;
    this.foes = [...foes];
  }

  tooltip(): string {
    let text: string = "<f>1.5rem<f>";
    text += `<c>goldenrod<c>${game.getLocalizedString(this.id)}\n`;
    text += "<f>1.25rem<f>";
    text += `<c>white<c>${game.getLocalizedString("foes")}\n`;
    this.foes.forEach((foe) => {
      text += `<c>silver<c>${game.getLocalizedString(foe.id)}\n`;
    });
    return text;
  }

  start(): void {
    game.beginCombat(this.foes);
  }
}

const floors: any = [
  {
    id: "floor_1",
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
    ],
  },
];

function createFloors() {
  lobbyContent.innerHTML = "";
  floors.forEach((floor: any) => {
    const stageElement = document.createElement("div");
    stageElement.classList.add("stage");
    stageElement.innerText = game.getLocalizedString(floor.id);
    stageElement.onclick = () => {
      createStages(floor.stages);
    };
    lobbyContent.append(stageElement);
  });
}

function createStages(stages: Stage[]) {
  lobbyContent.innerHTML = "";
  stages.forEach((stage: Stage) => {
    const stageElement = document.createElement("div");
    stageElement.classList.add("stage");
    stageElement.innerText = game.getLocalizedString(stage.id);
    tooltip(stageElement, stage.tooltip());
    stageElement.onclick = () => {
      stage.start();
    };
    lobbyContent.append(stageElement);
  });
}
