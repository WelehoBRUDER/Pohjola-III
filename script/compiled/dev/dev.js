"use strict";
const DEVTOOLS = {
    ENABLED: false,
    ONE_PUNCH: false,
    NO_CD: false,
    FREE_CAST: false,
    GOD: false,
};
if (localStorage.getItem("devtools") === "true")
    DEVTOOLS.ENABLED = true;
// Skip main menu
if (DEVTOOLS.ENABLED) {
    lobbyScreen.classList.remove("no-display");
    mainMenuElement.classList.add("no-display");
    lobby.current_view = "perks";
    createLobby();
    dungeonController.enterDungeon(dungeons[0]);
}
function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
//# sourceMappingURL=dev.js.map