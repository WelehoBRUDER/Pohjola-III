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
    current_view: "skills",
};
function createLobby() {
    player.updateAllModifiers();
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
    const sortedStats = Object.assign({
        most_damage: 0,
        most_damage_taken: 0,
        total_damage: 0,
        total_damage_taken: 0,
        most_healing: 0,
        total_healing: 0,
        total_kills: 0,
        total_deaths: 0,
        total_xp_gained: 0,
        total_gold_gained: 0,
        most_turns: 0,
        total_turns: 0,
        most_combat_time: 0,
        total_combat_time: 0,
    }, stats);
    Object.entries(sortedStats).forEach(([stat, value]) => {
        const statElement = document.createElement("div");
        statElement.classList.add("stat");
        statElement.innerHTML = `<div class="stat-name">${game.getLocalizedString(stat)}</div><div class="stat-value">${getStatValue(value, stat)}</div>`;
        statsScreen.append(statElement);
    });
    lobbyContent.append(statsScreen);
}
function getStatValue(value, stat) {
    let returnValue = Math.round(value);
    if (stat.includes("time")) {
        return getTimeString(returnValue);
    }
    return returnValue.toString();
}
function getTimeString(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;
    return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
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
const genericDragDetails = {
    lastX: 0,
    lastY: 0,
    dragging: false,
    bgPosX: 0,
    bgPosY: 0,
};
function addDragToScroll(elem) {
    const dragDetails = Object.assign({}, genericDragDetails);
    /* Scroll by dragging */
    function dragElem(e) {
        const offsetX = e.clientX - dragDetails.lastX;
        const offsetY = e.clientY - dragDetails.lastY;
        if (dragDetails.dragging) {
            elem.scrollTo(dragDetails.bgPosX - offsetX, dragDetails.bgPosY - offsetY);
        }
    }
    if (elem) {
        elem.onmousedown = (e) => {
            dragDetails.dragging = true;
            dragDetails.lastX = e.clientX;
            dragDetails.lastY = e.clientY;
            dragDetails.bgPosX = elem.scrollLeft;
            dragDetails.bgPosY = elem.scrollTop;
            elem.onmouseup = () => {
                dragDetails.dragging = false;
                elem.onmouseup = null;
                elem.onmousemove = null;
            };
            elem.onmousemove = (e) => dragElem(e);
        };
    }
}
createLobby();
//# sourceMappingURL=lobby.js.map