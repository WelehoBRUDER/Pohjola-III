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
  current_view: "store",
};

function createLobby() {
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
  const sortedStats = Object.assign(
    {
      most_damage: 0,
      most_damage_taken: 0,
      total_damage: 0,
      total_damage_taken: 0,
      most_healing: 0,
      total_healing: 0,
      total_kills: 0,
      total_deaths: 0,
      total_xp_gained: 0,
      total_gold_gained: 0,
      most_turns: 0,
      total_turns: 0,
      most_combat_time: 0,
      total_combat_time: 0,
    },
    stats
  );
  Object.entries(sortedStats).forEach(([stat, value]) => {
    const statElement = document.createElement("div");
    statElement.classList.add("stat");
    statElement.innerHTML = `<div class="stat-name">${game.getLocalizedString(stat)}</div><div class="stat-value">${getStatValue(
      value,
      stat
    )}</div>`;
    statsScreen.append(statElement);
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
  player.addItem(new Item({ ...items.small_healing_potion }), 2);
  player.addItem(new Item({ ...items.small_mana_potion }), 1);
  player.perks?.push(new Perk({ ...perks[0], level: 1 }));
  createLobby();
});
