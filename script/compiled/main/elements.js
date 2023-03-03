"use strict";
/* Main menu */
const mainMenuElement = document.querySelector(".main-menu");
/* Tooltip box */
const tooltipBox = document.querySelector("#tooltip");
/* Context menu */
const contextMenu = document.querySelector("#context-menu");
/* Effects */
const bloodyScreen = document.querySelector("#bloody-screen");
const healingScreen = document.querySelector("#healing-screen");
/* Item prompt */
const itemPrompt = document.querySelector("#item-amount-prompt");
const itemPromptAmount = itemPrompt.querySelector(".amount-text");
const itemPromptSlider = itemPrompt.querySelector(".slider");
const itemPromptPrice = itemPrompt.querySelector(".price");
const itemPromptTitle = itemPrompt.querySelector(".title");
/* Confirmation prompt */
const confirmPrompt = document.querySelector("#confirm-action");
const confirmPromptText = confirmPrompt.querySelector(".text");
const confirmPromptYesButton = confirmPrompt.querySelector(".confirm");
const confirmPromptNoButton = confirmPrompt.querySelector(".cancel");
/* Combat */
const combatScreen = document.querySelector(".combat");
const uiScreen = combatScreen.querySelector(".ui");
const pouchBackground = combatScreen.querySelector(".potion-pouch-frame");
const enemyContainer = combatScreen.querySelector(".enemies");
const toolbarElement = uiScreen.querySelector(".toolbar");
const tools = toolbarElement.querySelector(".tools");
const slots = tools.querySelector(".action-slots");
const potionPouch = tools.querySelector(".potion-pouch");
const combatTime = uiScreen.querySelector(".combat-time");
/* Combat summary */
const combatSummaryBackground = combatScreen.querySelector(".combat-summary-background");
const combatSummary = combatSummaryBackground.querySelector(".combat-summary");
const combatSummaryTitle = combatSummary.querySelector(".header");
const combatSummaryText = combatSummary.querySelector(".summary-text");
const combatSummaryButtons = combatSummary.querySelector(".options");
/* Player UI related elements */
const playerStatuses = tools.querySelector(".status-effects");
const playerHPBar = uiScreen.querySelector(".player-hp");
const playerMPBar = uiScreen.querySelector(".player-mp");
const playerActionBar = uiScreen.querySelector(".player-action");
const playerHP = playerHPBar.querySelector(".value");
const playerMP = playerMPBar.querySelector(".value");
const playerAction = playerActionBar.querySelector(".value");
const playerHPFill = playerHPBar.querySelector(".fill");
const playerMPFill = playerMPBar.querySelector(".fill");
const playerActionFill = playerActionBar.querySelector(".fill");
const playerHPLate = playerHPBar.querySelector(".late");
const playerMPLate = playerMPBar.querySelector(".late");
/* Lobby elements */
const lobbyScreen = document.querySelector(".lobby");
const lobbyHeader = lobbyScreen.querySelector(".lobby-header");
const lobbyHeaderButtons = lobbyHeader.querySelector(".lobby-buttons");
// Lobby sidebar
const lobbySidebar = lobbyScreen.querySelector(".side-bar");
// Lobby content
const lobbyView = lobbyScreen.querySelector(".lobby-view");
const lobbyContent = lobbyScreen.querySelector(".lobby-content");
const dungeonScreen = lobbyScreen.querySelector(".dungeon");
const dungeonContent = dungeonScreen.querySelector(".dungeon-content");
const screens = {
    skills: {
        scroll: 0,
    },
};
//# sourceMappingURL=elements.js.map