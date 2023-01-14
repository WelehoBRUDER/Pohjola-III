"use strict";
const consoleElement = document.querySelector(".console");
const consoleInput = consoleElement.querySelector("#console-input");
const consoleLog = consoleElement.querySelector(".log");
class DeveloperConsole {
    constructor() {
        this.commandHistory = [];
        this.commandsHistory = [];
        this.command = 0;
        this.open = true;
    }
    executeCommand(command) {
        const commandArr = command.split(" ");
        const commandName = commandArr[0];
        const commandValue = commandArr.slice(1);
        const commandFunction = developerCommands.find((command) => command.name === commandName);
        if (commandFunction) {
            if (commandFunction.isCheat && !DEVTOOLS.ENABLED) {
                consoleLog.innerHTML += `<p>Command ${commandName} is a cheat command and is disabled.<br>Type "dev" if you wish to access cheats.</p>`;
                this.commandsHistory.push(command);
                this.command = this.commandsHistory.length;
            }
            else {
                commandFunction.execute(commandValue);
                consoleLog.innerHTML += `<p>${this.commandHistory[this.commandHistory.length - 1]}</p>`;
                this.commandsHistory.push(command);
                this.command = this.commandsHistory.length;
            }
        }
        else {
            consoleLog.innerHTML += `<p>Command ${commandName} does not exist, type "help" to see all available commands.</p>`;
            this.commandsHistory.push(command);
            this.command = this.commandsHistory.length;
        }
    }
    toggle() {
        this.open = !this.open;
        if (this.open) {
            consoleElement.style.display = "flex";
            consoleInput.focus();
            consoleInput.value = "";
        }
        else {
            consoleElement.style.display = "none";
            consoleInput.value = "";
        }
        if (consoleInput.value === "§")
            consoleInput.value = "";
    }
}
function typeToConsole(e) {
    if (consoleInput.value === "§")
        consoleInput.value = "";
    if (e.key === "§") {
        return (consoleInput.value = "");
    }
    if (!devConsole.open)
        return (consoleInput.value = "");
    if (e.key === "ArrowUp") {
        devConsole.command--;
        if (devConsole.command < 0)
            devConsole.command = devConsole.commandsHistory.length - 1;
        consoleInput.value = devConsole.commandsHistory[devConsole.command] || "";
    }
    if (e.key === "ArrowDown") {
        devConsole.command++;
        if (devConsole.command >= devConsole.commandsHistory.length)
            devConsole.command = 0;
        consoleInput.value = devConsole.commandsHistory[devConsole.command] || "";
    }
    const value = consoleInput.value;
    if (e.key === "Enter") {
        consoleInput.value = "";
        devConsole.executeCommand(value);
    }
}
const devConsole = new DeveloperConsole();
//# sourceMappingURL=console.js.map