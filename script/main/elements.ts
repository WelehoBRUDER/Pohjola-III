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

const screens: any = {
  skills: {
    scroll: 0,
  },
} as const;
