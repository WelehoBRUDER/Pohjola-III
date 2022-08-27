/* Tooltip box */
const tooltipBox: HTMLDivElement = document.querySelector("#tooltip")!;

const bloodyScreen: HTMLDivElement = document.querySelector("#bloody-screen")!;
const healingScreen: HTMLDivElement =
  document.querySelector("#healing-screen")!;
const combatScreen: HTMLDivElement = document.querySelector(".combat")!;
const uiScreen: HTMLDivElement = combatScreen.querySelector(".ui")!;
const enemyContainer: HTMLDivElement = combatScreen.querySelector(".enemies")!;
const toolbarElement: HTMLDivElement = uiScreen.querySelector(".toolbar")!;
const tools: HTMLDivElement = toolbarElement.querySelector(".tools")!;
const slots: HTMLDivElement = tools.querySelector(".action-slots")!;
const combatTime: HTMLDivElement = uiScreen.querySelector(".combat-time")!;
/* Player UI related elements */
const playerStatuses: HTMLDivElement = tools.querySelector(".status-effects")!;
const playerHPBar: HTMLDivElement = uiScreen.querySelector(".player-hp")!;
const playerMPBar: HTMLDivElement = uiScreen.querySelector(".player-mp")!;
const playerActionBar: HTMLDivElement =
  uiScreen.querySelector(".player-action")!;
const playerHP: HTMLDivElement = playerHPBar.querySelector(".value")!;
const playerMP: HTMLDivElement = playerMPBar.querySelector(".value")!;
const playerAction: HTMLDivElement = playerActionBar.querySelector(".value")!;
const playerHPFill: HTMLDivElement = playerHPBar.querySelector(".fill")!;
const playerMPFill: HTMLDivElement = playerMPBar.querySelector(".fill")!;
const playerActionFill: HTMLDivElement =
  playerActionBar.querySelector(".fill")!;
const playerHPLate: HTMLDivElement = playerHPBar.querySelector(".late")!;
const playerMPLate: HTMLDivElement = playerMPBar.querySelector(".late")!;
