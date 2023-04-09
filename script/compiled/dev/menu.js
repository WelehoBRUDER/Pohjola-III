"use strict";
const mainMenuButtons = [
    {
        id: "resume",
        enable: () => {
            return game.playing;
        },
        click: () => {
            leaveMainMenu();
        },
    },
    {
        id: "continue",
        enable: () => {
            return saveController.saveSlots.length > 0;
        },
        click: () => {
            saveController.loadSave(saveController.saveSlots[0].id);
        },
    },
    {
        id: "new_game",
        click: () => {
            createNewGame();
        },
    },
    {
        id: "load_game",
        click: () => {
            savesInMenu();
        },
    },
    {
        id: "settings",
        click: () => {
            createSettings();
        },
    },
    {
        id: "credits",
        click: () => {
            log.createNotification(`
        Lead developer: WelehoBRUDER
        Icons: https://game-icons.net
        Art: pixabay.com and Midjourney
        `, 3600);
        },
    },
];
function createMenu() {
    const menu = document.createElement("div");
    const title = document.createElement("div");
    menu.classList.add("menu");
    title.classList.add("menu-title");
    title.innerText = "Pohjola III";
    menu.append(title);
    mainMenuButtons.forEach((button) => {
        const buttonElement = document.createElement("div");
        buttonElement.classList.add("menu-button");
        buttonElement.id = button.id;
        buttonElement.innerText = game.getLocalizedString(button.id);
        if (button.click) {
            buttonElement.addEventListener("click", button.click);
        }
        if (button.enable) {
            if (!button.enable()) {
                buttonElement.classList.add("disabled");
            }
        }
        const buttonTooltip = game.getLocalizedString(button.id + "_tt");
        if (buttonTooltip !== button.id + "_tt") {
            tooltip(buttonElement, buttonTooltip);
        }
        menu.append(buttonElement);
    });
    return menu;
}
function gotoMainMenu() {
    lobbyScreen.classList.add("no-display");
    mainMenuElement.classList.remove("no-display");
    mainMenu();
}
function leaveMainMenu() {
    mainMenuElement.classList.add("no-display");
    lobbyScreen.classList.remove("no-display");
    game.inMenu = false;
}
function mainMenu() {
    const menu = createMenu();
    game.inMenu = true;
    mainMenuElement.innerHTML = "";
    mainMenuElement.append(menu);
}
function savesInMenu() {
    const savesMenu = document.createElement("div");
    savesMenu.append(createExitButton());
    savesMenu.classList.add("saves-menu");
    savesMenu.append(saveScreen(true));
    mainMenuElement.append(savesMenu);
}
function createExitButton() {
    const exitButton = document.createElement("div");
    exitButton.classList.add("exit-button");
    exitButton.innerText = "X";
    exitButton.addEventListener("click", () => {
        closeEverything();
    });
    return exitButton;
}
mainMenu();
//# sourceMappingURL=menu.js.map