"use strict";
const lobbyButtons = [
    {
        id: "char",
    },
    {
        id: "perks",
    },
    {
        id: "skills",
    },
    {
        id: "inventory",
    },
    {
        id: "store",
    },
    {
        id: "stages",
    },
    {
        id: "statistics",
    },
    {
        id: "saves",
    },
];
const lobby = {
    current_view: "saves",
};
function createLobby() {
    lobbyHeaderButtons.innerHTML = "";
    lobbyButtons.forEach((button) => {
        const buttonElement = document.createElement("button");
        buttonElement.classList.add("lobby-button");
        buttonElement.innerText = game.getLocalizedString(button.id);
        buttonElement.onclick = () => lobbyView(button.id);
        if (lobby.current_view === button.id) {
            buttonElement.classList.add("selected");
        }
        lobbyHeaderButtons.append(buttonElement);
    });
    lobbyContent.onwheel = null;
    if (lobby.current_view === "char") {
        createCharView();
    }
    else if (lobby.current_view === "perks") {
        createPerks();
    }
    else if (lobby.current_view === "skills") {
        createSkills();
    }
    else if (lobby.current_view === "inventory") {
        createInventory();
    }
    else if (lobby.current_view === "store") {
        createStore();
    }
    else if (lobby.current_view === "stages") {
        createFloors();
    }
    else if (lobby.current_view === "statistics") {
        createStats();
    }
    else if (lobby.current_view === "saves") {
        createSaves();
    }
}
function lobbyView(id) {
    if (lobby.current_view === id)
        return;
    lobby.current_view = id;
    createLobby();
}
function createStats() {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    const statsScreen = document.createElement("div");
    statsScreen.classList.add("stats");
    Object.entries(stats).forEach(([stat, value]) => {
        const statElement = document.createElement("div");
        statElement.classList.add("stat");
        statElement.innerHTML = `<div class="stat-name">${game.getLocalizedString(stat)}</div><div class="stat-value">${Math.round(value)}</div>`;
        statsScreen.append(statElement);
    });
    lobbyContent.append(statsScreen);
}
function confirmationWindow(text, onConfirm, onCancel) {
    confirmPrompt.classList.add("active");
    confirmPromptText.textContent = "";
    confirmPromptText.append(textSyntax(text));
    confirmPromptYesButton.onclick = onConfirm;
    if (onCancel) {
        confirmPromptNoButton.onclick = onCancel;
    }
    else {
        confirmPromptNoButton.onclick = () => {
            confirmPrompt.classList.remove("active");
        };
    }
}
function closeConfirmationWindow() {
    confirmPrompt.classList.remove("active");
}
createLobby();
//# sourceMappingURL=lobby.js.map