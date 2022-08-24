"use strict";
/* Tooltip box */
const tooltipBox = document.querySelector("#tooltip");
const bloodyScreen = document.querySelector("#bloody-screen");
const combatScreen = document.querySelector(".combat");
const uiScreen = combatScreen.querySelector(".ui");
const enemyContainer = combatScreen.querySelector(".enemies");
const toolbarElement = uiScreen.querySelector(".toolbar");
const tools = toolbarElement.querySelector(".tools");
const slots = tools.querySelector(".action-slots");
/* Player UI related elements */
const playerHPBar = uiScreen.querySelector(".player-hp");
const playerMPBar = uiScreen.querySelector(".player-mp");
const playerActionBar = uiScreen.querySelector(".player-action");
const playerHP = playerHPBar.querySelector(".value");
const playerMP = playerMPBar.querySelector(".value");
const playerAction = playerActionBar.querySelector(".value");
const playerHPFill = playerHPBar.querySelector(".fill");
const playerMPFill = playerMPBar.querySelector(".fill");
const playerActionFill = playerActionBar.querySelector(".fill");
const playerHPLate = playerHPBar.querySelector(".late");
const playerMPLate = playerMPBar.querySelector(".late");
//# sourceMappingURL=elements.js.map