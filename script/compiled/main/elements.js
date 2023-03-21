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
/* Multi option prompt */
const multiOptionPrompt = document.querySelector("#multi-option-prompt");
const multiOptionPromptTitle = multiOptionPrompt.querySelector(".title");
const multiOptionPromptText = multiOptionPrompt.querySelector(".text");
const multiOptionPromptButtons = multiOptionPrompt.querySelector(".buttons");
/* Notifications screen */
const notificationsScreen = document.querySelector("#notifications");
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
/* World log */
const worldLog = document.querySelector("#world-log");
const screens = {
    skills: {
        scroll: 0,
    },
    class: {
        scroll: 0,
    },
};
function toggleableCustomSelect(content, style = { color: "rgb(21, 21, 206)", dark: "rgb(8, 8, 128)" }, defaultSelected = "toggle_select", callback) {
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
    content.forEach((option) => {
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
//# sourceMappingURL=elements.js.map