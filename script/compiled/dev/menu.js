"use strict";
const mainMenuButtons = [
    {
        id: "continue",
        enable: () => {
            return game.playing;
        },
        click: () => {
            game.resume(); // Placeholder
        },
    },
    {
        id: "new_game",
        click: () => {
            game.initCombat([]); // Placeholder
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
    },
];
function createMenu() {
    const menu = document.createElement("div");
    menu.classList.add("menu");
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
        menu.append(buttonElement);
    });
    return menu;
}
function mainMenu() {
    const menu = createMenu();
    window.onkeyup = (e) => {
        if (e.key === "Escape") {
            return mainMenu();
        }
    };
    mainMenuElement.innerHTML = "";
    mainMenuElement.append(menu);
}
function savesInMenu() {
    const savesMenu = document.createElement("div");
    savesMenu.classList.add("saves-menu");
    savesMenu.append(saveScreen(true));
    mainMenuElement.append(savesMenu);
}
mainMenu();
//# sourceMappingURL=menu.js.map