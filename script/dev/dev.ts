interface DevTools {
  [ENABLED: string]: boolean;
  ONE_PUNCH: boolean;
  NO_CD: boolean;
  FREE_CAST: boolean;
  GOD: boolean;
}

const DEVTOOLS: DevTools = {
  ENABLED: false,
  ONE_PUNCH: false,
  NO_CD: false,
  FREE_CAST: false,
  GOD: false,
};

if (localStorage.getItem("devtools") === "true") DEVTOOLS.ENABLED = true;

const gameVersion = "0.1.1";

// Skip main menu
if (DEVTOOLS.ENABLED) {
  lobbyScreen.classList.remove("no-display");
  mainMenuElement.classList.add("no-display");
  lobby.current_view = "perks";
  createLobby();
  //dungeonController.enterDungeon(dungeons[0]);
}

function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

document.title = `Pohjola III - v${gameVersion}`;
