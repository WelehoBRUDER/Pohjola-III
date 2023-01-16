const consoleElement = document.querySelector(".console") as HTMLDivElement;
const consoleInput = consoleElement.querySelector("#console-input") as HTMLInputElement;
const consoleLog = consoleElement.querySelector(".log") as HTMLDivElement;

class DeveloperConsole {
  commandHistory: string[];
  commandsHistory: string[];
  command: number;
  open: boolean;
  constructor() {
    this.commandHistory = [];
    this.commandsHistory = [];
    this.command = 0;
    this.open = false;
  }

  executeCommand(command: string) {
    const commandArr: string[] = command.split(" ");
    const [commandName, ...commandValue] = commandArr;
    const commandFunction = developerCommands.find((command: any) => command.name === commandName);
    if (commandFunction) {
      if (commandFunction.isCheat && !DEVTOOLS.ENABLED) {
        consoleLog.innerHTML += `<p>Command ${commandName} is a cheat command and is disabled.<br>Type "dev" if you wish to access cheats.</p>`;
      } else {
        commandFunction.execute(commandValue);
        consoleLog.innerHTML += `<p>${this.commandHistory.at(-1)}</p>`;
      }
    } else {
      consoleLog.innerHTML += `<p>Command ${commandName} does not exist, type "help" to see all available commands.</p>`;
    }
    this.commandsHistory.push(command);
    this.command = this.commandsHistory.length;
  }

  toggle() {
    this.open = !this.open;
    if (this.open) {
      consoleElement.style.display = "flex";
      consoleInput.focus();
    } else {
      consoleElement.style.display = "none";
    }
  }
}
function typeToConsole(e: KeyboardEvent) {
  if (consoleInput.value === "§") consoleInput.value = "";
  if (e.key === "§") {
    return (consoleInput.value = "");
  }
  if (!devConsole.open) return (consoleInput.value = "");
  if (e.key === "ArrowUp") {
    devConsole.command--;
    if (devConsole.command < 0) devConsole.command = devConsole.commandsHistory.length - 1;
    consoleInput.value = devConsole.commandsHistory[devConsole.command] || "";
  }
  if (e.key === "ArrowDown") {
    devConsole.command++;
    if (devConsole.command >= devConsole.commandsHistory.length) devConsole.command = 0;
    consoleInput.value = devConsole.commandsHistory[devConsole.command] || "";
  }
  const value = consoleInput.value;
  if (e.key === "Enter") {
    consoleInput.value = "";
    if (value.replaceAll(" ", "") === "") return;
    devConsole.executeCommand(value);
  }
}

function clearBadSymbols() {
  if (consoleInput.value.includes("§")) {
    consoleInput.value = consoleInput.value.replaceAll("§", "");
  }
}

const devConsole = new DeveloperConsole();
