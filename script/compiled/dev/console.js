"use strict";
var consoleElement = document.querySelector(".console");
var consoleInput = consoleElement.querySelector("#console-input");
var consoleLog = consoleElement.querySelector(".log");
var DeveloperConsole = /** @class */ (function () {
    function DeveloperConsole() {
        this.commandHistory = [];
        this.commandsHistory = [];
        this.command = 0;
        this.open = false;
    }
    DeveloperConsole.prototype.executeCommand = function (command) {
        var commandArr = command.split(" ");
        var commandName = commandArr[0], commandValue = commandArr.slice(1);
        var commandFunction = developerCommands.find(function (command) { return command.name === commandName; });
        if (commandFunction) {
            if (commandFunction.isCheat && !DEVTOOLS.ENABLED) {
                consoleLog.innerHTML += "<p>Command " + commandName + " is a cheat command and is disabled.<br>Type \"dev\" if you wish to access cheats.</p>";
            }
            else {
                commandFunction.execute(commandValue);
                consoleLog.innerHTML += "<p>" + this.commandHistory.at(-1) + "</p>";
            }
        }
        else {
            consoleLog.innerHTML += "<p>Command " + commandName + " does not exist, type \"help\" to see all available commands.</p>";
        }
        this.commandsHistory.push(command);
        this.command = this.commandsHistory.length;
    };
    DeveloperConsole.prototype.toggle = function () {
        this.open = !this.open;
        if (this.open) {
            consoleElement.style.display = "flex";
            consoleInput.focus();
        }
        else {
            consoleElement.style.display = "none";
        }
    };
    return DeveloperConsole;
}());
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
    var value = consoleInput.value;
    if (e.key === "Enter") {
        consoleInput.value = "";
        if (value.replaceAll(" ", "") === "")
            return;
        devConsole.executeCommand(value);
    }
}
function clearBadSymbols() {
    if (consoleInput.value.includes("§")) {
        consoleInput.value = consoleInput.value.replaceAll("§", "");
    }
}
var devConsole = new DeveloperConsole();
//# sourceMappingURL=console.js.map