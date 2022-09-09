"use strict";
const lobbyButtons = [
    {
        id: "char_view",
    },
    {
        id: "perks_view",
    },
    {
        id: "skills_view",
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
];
const lobby = {
    current_view: "inventory",
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
    if (lobby.current_view === "char_view") {
        createCharView();
    }
    else if (lobby.current_view === "perks_view") {
        createPerks();
    }
    else if (lobby.current_view === "skills_view") {
        createSkills();
    }
    else if (lobby.current_view === "inventory") {
        createInventory();
    }
    else if (lobby.current_view === "stages") {
        createFloors();
    }
}
function lobbyView(id) {
    if (lobby.current_view === id)
        return;
    lobby.current_view = id;
    createLobby();
}
createLobby();
//# sourceMappingURL=lobby.js.map