"use strict";
const lobbyButtons = [
    {
        id: "char_view",
    },
    {
        id: "perks_view",
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
    current_view: "perks_view",
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
    if (lobby.current_view === "perks_view") {
        createPerks();
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