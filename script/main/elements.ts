const combatScreen: HTMLDivElement = document.querySelector(".combat")!;
const uiScreen: HTMLDivElement = combatScreen.querySelector(".ui")!;
const toolbarElement: HTMLDivElement = uiScreen.querySelector(".toolbar")!;
/* Player UI related elements */
const playerHPBar: HTMLDivElement = uiScreen.querySelector(".player-hp")!;
const playerMPBar: HTMLDivElement = uiScreen.querySelector(".player-mp")!;
const playerActionBar: HTMLDivElement =
  uiScreen.querySelector(".player-action")!;
const playerHP: HTMLDivElement = playerHPBar.querySelector(".value")!;
const playerMP: HTMLDivElement = playerMPBar.querySelector(".value")!;
const playerAction: HTMLDivElement = playerActionBar.querySelector(".value")!;
const playerHPFill = playerHPBar.querySelector(".fill")!;
const playerMPFill = playerMPBar.querySelector(".fill")!;
const playerActionFill = playerActionBar.querySelector(".fill")!;
const playerHPLate = playerHPBar.querySelector(".late")!;
const playerMPLate = playerMPBar.querySelector(".late")!;
