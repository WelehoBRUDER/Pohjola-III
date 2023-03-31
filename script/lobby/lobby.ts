const lobbyButtons = [
  {
    id: "char",
    icon: "gfx/icons/skills.png",
    click: createCharView,
  },
  {
    id: "perks",
    icon: "gfx/icons/orb-direction.png",
    click: createPerks,
  },
  {
    id: "class",
    icon: "gfx/icons/embrassed-energy.png",
    click: createClassView,
  },
  {
    id: "skills",
    icon: "gfx/icons/swords-power.png",
    click: createSkills,
  },
  {
    id: "inventory",
    icon: "gfx/icons/hand-bag.png",
    click: createInventory,
  },
  {
    id: "store",
    icon: "gfx/icons/coins-pile.png",
    click: createStore,
  },
  {
    id: "crafting",
    icon: "gfx/icons/sword-smithing.png",
    click: createCrafting,
  },
  {
    id: "stages",
    icon: "gfx/icons/dungeon-gate.png",
    click: createFloors,
  },
  {
    id: "statistics",
    icon: "gfx/icons/papers.png",
    click: createStats,
  },
  {
    id: "saves",
    icon: "gfx/icons/save.png",
    click: createSaves,
  },
];

const lobby = {
  current_view: "saves",
};

function createLobby() {
  stats.updateTimePlayed();
  player.updateAllModifiers();
  if (challenge("hardcore")) {
    saveController.saveOver(saveController.currentSave, { auto: true });
  }
  lobbyHeaderButtons.innerHTML = "";
  lobbyButtons.forEach((button) => {
    const buttonElement = document.createElement("button");
    const buttonIcon = document.createElement("img");
    const buttonText = document.createElement("span");
    buttonElement.classList.add("lobby-button");
    buttonIcon.classList.add("lobby-button-icon");
    buttonText.innerText = game.getLocalizedString(button.id);
    buttonElement.onclick = () => {
      lobby.current_view = button.id;
      createLobby();
      button.click();
    };
    buttonIcon.src = button.icon;
    if (lobby.current_view === button.id) {
      buttonElement.classList.add("selected");
    }
    buttonElement.append(buttonIcon, buttonText);
    lobbyHeaderButtons.append(buttonElement);
  });
  lobbyContent.onwheel = null;
  lobbyButtons.find((button) => button.id === lobby.current_view)?.click();
}

function createStats() {
  lobbyContent.innerHTML = "";
  hideHover();
  sideBarDetails();
  const statsScreen = document.createElement("div");
  statsScreen.classList.add("stats");
  const statBlocks: any[] = [
    {
      id: "damage",
      stats: ["most_damage", "total_damage", "most_damage_taken", "total_damage_taken"],
    },
    {
      id: "healing",
      stats: ["most_healing", "total_healing"],
    },
    {
      id: "combat",
      stats: ["total_kills", "total_deaths"],
    },
    {
      id: "resources",
      stats: ["total_xp_gained", "total_gold_gained", "total_items_gained", "total_gold_spent", "total_xp_lost"],
    },
    {
      id: "turns",
      stats: ["most_turns", "total_turns"],
    },
    {
      id: "time",
      stats: ["most_combat_time", "total_combat_time", "time_played"],
    },
    {
      id: "completion",
      stats: ["UNIQUE_progress", "UNIQUE_score"],
    },
  ];
  statBlocks.forEach((block) => {
    const blockElement = document.createElement("div");
    blockElement.classList.add("stat-block");
    blockElement.innerHTML = `<div class="stat-block-title">${game.getLocalizedString(block.id)}</div>`;
    block.stats.forEach((stat: string) => {
      const statElement = document.createElement("div");
      const statName = document.createElement("div");
      const statValue = document.createElement("div");
      statElement.classList.add("stat");
      statName.classList.add("stat-name");
      statValue.classList.add("stat-value");
      let value = getStatValue(stats[stat], stat);
      if (stat.startsWith("UNIQUE_")) {
        stat = stat.replace("UNIQUE_", "");
        if (player[stat] !== undefined) {
          value = player[stat];
        } else {
          value = `${calculateProgress(player).toString()}%`;
        }
      }
      const statTT = game.getLocalizedString(`${stat}_tt`);
      if (statTT !== `${stat}_tt`) {
        tooltip(statName, statTT);
      }
      statName.innerText = game.getLocalizedString(stat);
      statValue.innerText = value;
      statElement.append(statName, statValue);
      blockElement.append(statElement);
    });
    statsScreen.append(blockElement);
  });
  lobbyContent.append(statsScreen);
}

function getStatValue(value: number, stat: string): string {
  let returnValue = Math.round(value);
  if (stat.includes("time")) {
    return getTimeString(returnValue);
  }
  return returnValue.toString();
}

function getTimeString(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - hours * 3600 - minutes * 60;
  return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
}

function confirmationWindow(text: string, onConfirm: () => void, onCancel?: () => void) {
  confirmPrompt.classList.add("active");
  confirmPromptText.textContent = "";
  confirmPromptText.append(textSyntax(text));
  confirmPromptYesButton.onclick = onConfirm;
  if (onCancel) {
    confirmPromptNoButton.onclick = onCancel;
  } else {
    confirmPromptNoButton.onclick = () => {
      confirmPrompt.classList.remove("active");
    };
  }
}

function closeConfirmationWindow() {
  confirmPrompt.classList.remove("active");
}

interface OptionButton {
  text: string;
  click: () => void;
}

function multiOptionWindow({ title, text }: { title: string; text: string }, buttons: OptionButton[]) {
  multiOptionPrompt.classList.add("active");
  multiOptionPromptTitle.textContent = title;
  multiOptionPromptText.textContent = "";
  console.log(text);
  multiOptionPromptText.append(textSyntax(text));
  multiOptionPromptButtons.innerHTML = "";
  buttons.forEach((button) => {
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("multi-option-button");
    buttonElement.textContent = button.text;
    buttonElement.onclick = button.click;
    multiOptionPromptButtons.append(buttonElement);
  });
}

function closeMultiOptionWindow() {
  multiOptionPrompt.classList.remove("active");
}

const genericDragDetails = {
  lastX: 0,
  lastY: 0,
  dragging: false,
  bgPosX: 0,
  bgPosY: 0,
};

function addDragToScroll(elem: HTMLElement) {
  const dragDetails = Object.assign({}, genericDragDetails);

  /* Scroll by dragging */
  function dragElem(e: MouseEvent) {
    const offsetX = e.clientX - dragDetails.lastX;
    const offsetY = e.clientY - dragDetails.lastY;
    if (dragDetails.dragging) {
      elem.scrollTo(dragDetails.bgPosX - offsetX, dragDetails.bgPosY - offsetY);
    }
  }
  if (elem) {
    elem.onmousedown = (e: MouseEvent) => {
      dragDetails.dragging = true;
      dragDetails.lastX = e.clientX;
      dragDetails.lastY = e.clientY;
      dragDetails.bgPosX = elem.scrollLeft;
      dragDetails.bgPosY = elem.scrollTop;
      elem.onmouseup = () => {
        dragDetails.dragging = false;
        elem.onmouseup = null;
        elem.onmousemove = null;
      };
      elem.onmousemove = (e) => dragElem(e);
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  player.updateAllModifiers();
  player.abilities.forEach((abi) => abi.updateStats(player));
  player.addItem(new Item({ ...items.small_healing_potion }), 2, { dontCount: true });
  player.addItem(new Item({ ...items.small_mana_potion }), 1, { dontCount: true });
  player.perks?.push(new Perk({ ...perks[0], level: 1 }));
  createLobby();
});
