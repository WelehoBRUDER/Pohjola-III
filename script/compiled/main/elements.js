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
function closeSelectGeneric(id, close) {
    setTimeout(() => {
        window.addEventListener("click", (e) => {
            // @ts-expect-error
            if (!e.target?.closest(`#${id}`)) {
                close();
            }
        }, { once: true });
    }, 0);
}
function toggleableCustomSelect(id, content, style = { color: "rgb(21, 21, 206)", dark: "rgb(8, 8, 128)", hover: "silver" }, defaultSelected = "toggle_select", options, callback) {
    const select = document.createElement("div");
    const selectContent = document.createElement("div");
    const selectOptions = document.createElement("div");
    const selectValue = document.createElement("div");
    const selectText = document.createElement("p");
    const selectArrow = document.createElement("span");
    const properties = {
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
    selectValue.classList.add("value");
    selectText.classList.add("text");
    selectArrow.classList.add("arrow");
    // Set default selected
    selectText.textContent = game.getLocalizedString(defaultSelected);
    selectText.setAttribute("data-value", defaultSelected);
    selectArrow.textContent = "<";
    selectContent.onclick = (e) => {
        // @ts-expect-error
        if (e.target.classList.contains("cancel"))
            return;
        toggle();
        setTimeout(() => {
            window.addEventListener("click", (e) => {
                // @ts-expect-error
                if (!e.target?.closest(`#${id}`)) {
                    close();
                }
                else {
                    closeSelectGeneric(id, close);
                }
            }, { once: true });
        }, 0);
    };
    content.forEach((option) => {
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
            if (e.target?.classList.contains("cancel"))
                return;
            const index = properties.selected.indexOf(option);
            if (options?.multiSelect) {
                if (index === -1) {
                    properties.selected.push(option);
                    properties.mode.push(0);
                }
                else {
                    properties.mode[index] = properties.mode[index] === 0 ? 1 : 0;
                }
            }
            else if (index === -1) {
                unselectAll();
                properties.selected = [option];
                properties.mode = [0];
            }
            else {
                properties.mode = [properties.mode[0] === 0 ? 1 : 0];
            }
            selectOptionElements();
            if (callback) {
                callback(properties);
            }
        };
        selectArrow.onclick = (e) => {
            e.stopPropagation();
            if (selectArrow.textContent === "X") {
                close();
                cancelAll();
            }
        };
        cancel.onclick = () => {
            unselectAll();
            if (properties.selected.includes(option)) {
                properties.selected.splice(properties.selected.indexOf(option), 1);
                properties.mode.splice(properties.mode.indexOf(option), 1);
            }
            selectOptionElements();
            setValue();
            if (callback) {
                callback(properties);
            }
        };
        optionElement.append(optionValue, optionName, cancel);
        selectOptions.append(optionElement);
    });
    selectContent.append(selectValue, selectText, selectArrow);
    select.append(selectContent, selectOptions);
    return select;
    function cancelAll() {
        properties.selected = [];
        properties.mode = [];
        if (callback) {
            callback(properties);
        }
        unselectAll();
    }
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
        }
        else {
            selectOptions.classList.add("hidden");
            selectArrow.classList.remove("up");
        }
    }
    function setValue() {
        if (properties.selected.length === 0) {
            selectValue.textContent = "";
            selectText.textContent = game.getLocalizedString(defaultSelected);
            selectArrow.textContent = "<";
            selectArrow.classList.remove("cancel");
        }
        else if (properties.selected.length === 1) {
            selectValue.textContent = properties.mode[0] === 0 ? "+" : "-";
            selectText.textContent = game.getLocalizedString(properties.selected[0]);
            selectArrow.textContent = "X";
            selectArrow.classList.add("cancel");
        }
        else {
            selectValue.textContent = properties.mode.length;
            selectText.textContent = "Filters active";
            selectArrow.textContent = "X";
            selectArrow.classList.add("cancel");
        }
    }
    function unselectAll() {
        selectOptions.querySelectorAll(".option").forEach((option) => {
            const value = option.querySelector(".value");
            option.classList.remove("selected");
            value.textContent = "";
        });
        setValue();
    }
    function selectOptionElements() {
        properties.selected.forEach((option) => {
            // @ts-expect-error
            const optionElem = selectOptions.querySelector(`.option .text[data-value="${option}"]`).closest(".option");
            if (optionElem) {
                const value = optionElem.querySelector(".value");
                optionElem.classList.add("selected");
                value.textContent = properties.mode[properties.selected.indexOf(option)] === 0 ? "+" : "-";
            }
        });
        setValue();
    }
}
//# sourceMappingURL=elements.js.map