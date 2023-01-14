"use strict";
const developerCommands = [
    {
        name: "help",
        description: "List all available commands",
        execute: () => {
            let text = "Available commands:";
            developerCommands.forEach((command) => {
                text += `<br>${command.name}: ${command.description}`;
            });
            devConsole.commandHistory.push(text);
        },
    },
    {
        name: "clear",
        description: "Clear the console",
        execute: () => {
            devConsole.commandHistory = [""];
            consoleLog.innerHTML = "";
        },
    },
    {
        name: "dev",
        description: "Enable developer mode",
        execute: (args) => {
            DEVTOOLS.ENABLED = !DEVTOOLS.ENABLED;
            const saveToLocalStorage = args[0] === "save";
            if (saveToLocalStorage) {
                localStorage.setItem("devtools", DEVTOOLS.ENABLED.toString());
            }
            else {
                localStorage.removeItem("devtools");
            }
            devConsole.commandHistory.push(`Developer mode ${DEVTOOLS.ENABLED ? "enabled" : "disabled"}`);
        },
    },
    {
        name: "onepunch",
        description: "Deal massive damage with every attack",
        isCheat: true,
        execute: () => {
            DEVTOOLS.ONE_PUNCH = !DEVTOOLS.ONE_PUNCH;
            devConsole.commandHistory.push(`${DEVTOOLS.ONE_PUNCH ? "You have become ONE" : "Your power has been taken away"}`);
        },
    },
    {
        name: "nocd",
        description: "Remove cooldowns from all abilities",
        isCheat: true,
        execute: () => {
            DEVTOOLS.NO_CD = !DEVTOOLS.NO_CD;
            devConsole.commandHistory.push(`Skills are now ${DEVTOOLS.NO_CD ? "instant" : "lethargic"}`);
        },
    },
    {
        name: "freecast",
        description: "Cast abilities without spending mana",
        isCheat: true,
        execute: () => {
            DEVTOOLS.FREE_CAST = !DEVTOOLS.FREE_CAST;
            devConsole.commandHistory.push(`Your mana is now ${DEVTOOLS.FREE_CAST ? "infinite" : "very much finite"}`);
        },
    },
    {
        name: "god",
        description: "Become invincible",
        isCheat: true,
        execute: () => {
            DEVTOOLS.GOD = !DEVTOOLS.GOD;
            devConsole.commandHistory.push(`Invincibility ${DEVTOOLS.GOD ? "granted" : "taken away"}`);
        },
    },
    {
        name: "item",
        description: "[item] [amount] Adds specified quantity of items to your inventory",
        isCheat: true,
        execute: (args) => {
            const item = args[0];
            const quantity = args[1] ? parseInt(args[1]) : 1;
            if (item) {
                // @ts-ignore
                const itemObject = items[item];
                if (itemObject) {
                    const newItem = new Item(itemObject);
                    newItem.quantity = quantity || 1;
                    player.addItem(newItem, quantity);
                    devConsole.commandHistory.push(`Added ${quantity} ${item} to your inventory`);
                }
                else {
                    devConsole.commandHistory.push(`Item ${item} not found`);
                }
            }
            else {
                devConsole.commandHistory.push("Too few arguments, expected: item [item] [amount]");
            }
        },
    },
    {
        name: "gold",
        description: "Add gold",
        isCheat: true,
        execute: (args) => {
            const amount = args[0] ? parseInt(args[0]) : 100;
            player.addGold(amount);
            devConsole.commandHistory.push(`Added ${amount} gold`);
        },
    },
    {
        name: "xp",
        description: "Add experience points",
        isCheat: true,
        execute: (args) => {
            const xp = args[0] ? parseInt(args[0]) : 0;
            player.addXP(xp);
            devConsole.commandHistory.push(`Added ${xp} experience points`);
        },
    },
];
//# sourceMappingURL=commands.js.map