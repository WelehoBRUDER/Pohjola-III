/* Main menu */
const mainMenuElement: HTMLDivElement = document.querySelector(".main-menu")!;

/* Tooltip box */
const tooltipBox: HTMLDivElement = document.querySelector("#tooltip")!;

/* Context menu */
const contextMenu: HTMLDivElement = document.querySelector("#context-menu")!;

/* Effects */
const bloodyScreen: HTMLDivElement = document.querySelector("#bloody-screen")!;
const healingScreen: HTMLDivElement = document.querySelector("#healing-screen")!;

/* Item prompt */
const itemPrompt: HTMLDivElement = document.querySelector("#item-amount-prompt")!;
const itemPromptAmount: HTMLParagraphElement = itemPrompt.querySelector(".amount-text")!;
const itemPromptSlider: HTMLInputElement = itemPrompt.querySelector(".slider")!;
const itemPromptPrice: HTMLDivElement = itemPrompt.querySelector(".price")!;
const itemPromptTitle: HTMLElement = itemPrompt.querySelector(".title")!;

/* Confirmation prompt */
const confirmPrompt: HTMLDivElement = document.querySelector("#confirm-action")!;
const confirmPromptText: HTMLDivElement = confirmPrompt.querySelector(".text")!;
const confirmPromptYesButton: HTMLDivElement = confirmPrompt.querySelector(".confirm")!;
const confirmPromptNoButton: HTMLDivElement = confirmPrompt.querySelector(".cancel")!;

/* Multi option prompt */
const multiOptionPrompt: HTMLDivElement = document.querySelector("#multi-option-prompt")!;
const multiOptionPromptTitle: HTMLDivElement = multiOptionPrompt.querySelector(".title")!;
const multiOptionPromptText: HTMLDivElement = multiOptionPrompt.querySelector(".text")!;
const multiOptionPromptButtons: HTMLDivElement = multiOptionPrompt.querySelector(".buttons")!;

/* Notifications screen */
const notificationsScreen: HTMLDivElement = document.querySelector("#notifications")!;

/* Combat */
const combatScreen: HTMLDivElement = document.querySelector(".combat")!;
const uiScreen: HTMLDivElement = combatScreen.querySelector(".ui")!;
const pouchBackground: HTMLDivElement = combatScreen.querySelector(".potion-pouch-frame")!;
const enemyContainer: HTMLDivElement = combatScreen.querySelector(".enemies")!;
const toolbarElement: HTMLDivElement = uiScreen.querySelector(".toolbar")!;
const tools: HTMLDivElement = toolbarElement.querySelector(".tools")!;
const slots: HTMLDivElement = tools.querySelector(".action-slots")!;
const potionPouch: HTMLDivElement = tools.querySelector(".potion-pouch")!;
const combatTime: HTMLDivElement = uiScreen.querySelector(".combat-time")!;

/* Combat summary */
const combatSummaryBackground: HTMLDivElement = combatScreen.querySelector(".combat-summary-background")!;
const combatSummary: HTMLDivElement = combatSummaryBackground.querySelector(".combat-summary")!;
const combatSummaryTitle: HTMLDivElement = combatSummary.querySelector(".header")!;
const combatSummaryText: HTMLDivElement = combatSummary.querySelector(".summary-text")!;
const combatSummaryButtons: HTMLDivElement = combatSummary.querySelector(".options")!;

/* Player UI related elements */
const playerStatuses: HTMLDivElement = tools.querySelector(".status-effects")!;
const playerHPBar: HTMLDivElement = uiScreen.querySelector(".player-hp")!;
const playerMPBar: HTMLDivElement = uiScreen.querySelector(".player-mp")!;
const playerActionBar: HTMLDivElement = uiScreen.querySelector(".player-action")!;
const playerHP: HTMLDivElement = playerHPBar.querySelector(".value")!;
const playerMP: HTMLDivElement = playerMPBar.querySelector(".value")!;
const playerAction: HTMLDivElement = playerActionBar.querySelector(".value")!;
const playerHPFill: HTMLDivElement = playerHPBar.querySelector(".fill")!;
const playerMPFill: HTMLDivElement = playerMPBar.querySelector(".fill")!;
const playerActionFill: HTMLDivElement = playerActionBar.querySelector(".fill")!;
const playerHPLate: HTMLDivElement = playerHPBar.querySelector(".late")!;
const playerMPLate: HTMLDivElement = playerMPBar.querySelector(".late")!;

/* Lobby elements */
const lobbyScreen: HTMLDivElement = document.querySelector(".lobby")!;
const lobbyHeader: HTMLDivElement = lobbyScreen.querySelector(".lobby-header")!;
const lobbyHeaderButtons: HTMLDivElement = lobbyHeader.querySelector(".lobby-buttons")!;
// Lobby sidebar
const lobbySidebar: HTMLDivElement = lobbyScreen.querySelector(".side-bar")!;
// Lobby content
const lobbyView: HTMLDivElement = lobbyScreen.querySelector(".lobby-view")!;
const lobbyContent: HTMLDivElement = lobbyScreen.querySelector(".lobby-content")!;
const dungeonScreen: HTMLDivElement = lobbyScreen.querySelector(".dungeon")!;
const dungeonContent: HTMLDivElement = dungeonScreen.querySelector(".dungeon-content")!;

/* World log */
const worldLog: HTMLDivElement = document.querySelector("#world-log")!;

const screens: any = {
  skills: {
    scroll: 0,
  },
  class: {
    scroll: 0,
  },
} as const;

function toggleableCustomSelect(
  id: string,
  content: any[],
  style: { color: string; dark: string; hover: string } = { color: "rgb(21, 21, 206)", dark: "rgb(8, 8, 128)", hover: "silver" },
  defaultSelected: string = "toggle_select",
  options?: { multiSelect?: boolean },
  callback?: any
) {
  const select = document.createElement("div");
  const selectContent = document.createElement("div");
  const selectOptions = document.createElement("div");
  const selectText = document.createElement("p");
  const selectArrow = document.createElement("span");

  const properties: any = {
    open: false,
    selected: [],
    mode: [],
  };

  // Set classes and styles
  select.id = id;
  select.classList.add("toggleable-select");
  select.style.setProperty("--color", style.color);
  select.style.setProperty("--dark", style.dark);
  select.style.setProperty("--hover", style.hover);
  selectContent.classList.add("select-content");
  selectOptions.classList.add("select-options");
  selectOptions.classList.add("hidden");
  selectText.classList.add("text");
  selectArrow.classList.add("arrow");

  // Set default selected
  selectText.textContent = game.getLocalizedString(defaultSelected);
  selectText.setAttribute("data-value", defaultSelected);
  selectArrow.textContent = "<";

  selectContent.onclick = () => {
    toggle();
    setTimeout(() => {
      window.addEventListener(
        "click",
        (e) => {
          // @ts-expect-error
          if (!e.target?.closest(`#${id}`)) {
            close();
          }
        },
        { once: true }
      );
    }, 0);
  };

  content.forEach((option: string) => {
    // Create elements
    const optionElement = document.createElement("div");
    const optionValue = document.createElement("div");
    const optionName = document.createElement("div");
    const cancel = document.createElement("div");

    // Set classes and styles
    optionElement.classList.add("option");
    optionValue.classList.add("value");
    optionName.classList.add("text");
    cancel.classList.add("cancel");

    // Set text & attributes
    optionName.textContent = game.getLocalizedString(option);
    optionName.setAttribute("data-value", option);
    cancel.textContent = "X";

    // Set onclick
    optionElement.onclick = (e) => {
      // @ts-expect-error
      if (e.target?.classList.contains("cancel")) return;
      if (options?.multiSelect) {
        if (!properties.selected.includes(option)) {
          properties.selected.push(option);
          properties.mode.push(0);
        }
      } else {
        unselectAll();
        properties.selected = [option];
        properties.mode = [0];
      }
      selectOptionElements();
    };
    cancel.onclick = () => {
      unselectAll();
      if (properties.selected.includes(option)) {
        properties.selected.splice(properties.selected.indexOf(option), 1);
        properties.mode.splice(properties.mode.indexOf(option), 1);
      }
      selectOptionElements();
    };

    optionElement.append(optionValue, optionName, cancel);
    selectOptions.append(optionElement);
  });

  selectContent.append(selectText, selectArrow);
  select.append(selectContent, selectOptions);
  return select;

  function toggle() {
    properties.open = !properties.open;
    openClose();
  }

  function close() {
    properties.open = false;
    openClose();
  }

  function openClose() {
    if (properties.open) {
      selectOptions.classList.remove("hidden");
      selectArrow.classList.add("up");
    } else {
      selectOptions.classList.add("hidden");
      selectArrow.classList.remove("up");
    }
  }

  function unselectAll() {
    selectOptions.querySelectorAll(".option").forEach((option) => {
      option.classList.remove("selected");
    });
  }

  function selectOptionElements() {
    properties.selected.forEach((option: string) => {
      // @ts-expect-error
      selectOptions.querySelector(`.option .text[data-value="${option}"]`).closest(".option").classList.add("selected");
    });
  }
}
