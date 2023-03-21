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
  content: any[],
  style: { color: string; dark: string } = { color: "rgb(21, 21, 206)", dark: "rgb(8, 8, 128)" },
  defaultSelected: string = "toggle_select",
  callback?: any
) {
  const select = document.createElement("div");
  const selectContent = document.createElement("div");
  const selectOptions = document.createElement("div");
  const selectText = document.createElement("p");
  const selectArrow = document.createElement("span");

  // Set classes and styles
  select.classList.add("toggleable-select");
  select.style.setProperty("--color", style.color);
  select.style.setProperty("--dark", style.dark);
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
    selectOptions.classList.toggle("hidden");
    selectArrow.classList.toggle("up");
  };

  content.forEach((option: string) => {
    const optionElement = document.createElement("div");
    const optionValue = document.createElement("div");
    const optionName = document.createElement("div");
    const cancel = document.createElement("div");
    optionElement.classList.add("option");
    optionValue.classList.add("value");
    optionName.classList.add("text");
    cancel.classList.add("cancel");
    optionName.textContent = game.getLocalizedString(option);
    optionName.setAttribute("data-value", option);
    cancel.textContent = "X";
    optionElement.append(optionValue, optionName, cancel);
    selectOptions.append(optionElement);
  });

  selectContent.append(selectText, selectArrow);
  select.append(selectContent, selectOptions);
  return select;
}
