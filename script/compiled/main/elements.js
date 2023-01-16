"use strict";
/* Tooltip box */
var tooltipBox = document.querySelector("#tooltip");
/* Context menu */
var contextMenu = document.querySelector("#context-menu");
/* Effects */
var bloodyScreen = document.querySelector("#bloody-screen");
var healingScreen = document.querySelector("#healing-screen");
/* Item prompt */
var itemPrompt = document.querySelector("#item-amount-prompt");
var itemPromptAmount = itemPrompt.querySelector(".amount-text");
var itemPromptSlider = itemPrompt.querySelector(".slider");
var itemPromptPrice = itemPrompt.querySelector(".price");
var itemPromptTitle = itemPrompt.querySelector(".title");
/* Confirmation prompt */
var confirmPrompt = document.querySelector("#confirm-action");
var confirmPromptText = confirmPrompt.querySelector(".text");
var confirmPromptYesButton = confirmPrompt.querySelector(".confirm");
var confirmPromptNoButton = confirmPrompt.querySelector(".cancel");
/* Combat */
var combatScreen = document.querySelector(".combat");
var uiScreen = combatScreen.querySelector(".ui");
var pouchBackground = combatScreen.querySelector(".potion-pouch-frame");
var enemyContainer = combatScreen.querySelector(".enemies");
var toolbarElement = uiScreen.querySelector(".toolbar");
var tools = toolbarElement.querySelector(".tools");
var slots = tools.querySelector(".action-slots");
var potionPouch = tools.querySelector(".potion-pouch");
var combatTime = uiScreen.querySelector(".combat-time");
/* Combat summary */
var combatSummaryBackground = combatScreen.querySelector(".combat-summary-background");
var combatSummary = combatSummaryBackground.querySelector(".combat-summary");
var combatSummaryTitle = combatSummary.querySelector(".header");
var combatSummaryText = combatSummary.querySelector(".summary-text");
var combatSummaryButtons = combatSummary.querySelector(".options");
/* Player UI related elements */
var playerStatuses = tools.querySelector(".status-effects");
var playerHPBar = uiScreen.querySelector(".player-hp");
var playerMPBar = uiScreen.querySelector(".player-mp");
var playerActionBar = uiScreen.querySelector(".player-action");
var playerHP = playerHPBar.querySelector(".value");
var playerMP = playerMPBar.querySelector(".value");
var playerAction = playerActionBar.querySelector(".value");
var playerHPFill = playerHPBar.querySelector(".fill");
var playerMPFill = playerMPBar.querySelector(".fill");
var playerActionFill = playerActionBar.querySelector(".fill");
var playerHPLate = playerHPBar.querySelector(".late");
var playerMPLate = playerMPBar.querySelector(".late");
/* Lobby elements */
var lobbyScreen = document.querySelector(".lobby");
var lobbyHeader = lobbyScreen.querySelector(".lobby-header");
var lobbyHeaderButtons = lobbyHeader.querySelector(".lobby-buttons");
// Lobby sidebar
var lobbySidebar = lobbyScreen.querySelector(".side-bar");
// Lobby content
var lobbyContent = lobbyScreen.querySelector(".lobby-content");
//# sourceMappingURL=elements.js.map