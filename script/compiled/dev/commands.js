"use strict";
const developerCommands = [
    {
        name: "help",
        description: "List all available commands",
        help: "help [command] - List all available commands. If a command is specified, the help text for that command will be displayed.",
        list: [],
        execute: (args) => {
            const command = args[0];
            if (command) {
                const commandObject = developerCommands.find((c) => c.name === command);
                if (commandObject) {
                    devConsole.commandHistory.push(commandObject.help);
                    return;
                }
                devConsole.commandHistory.push(`Command ${command} not found, type "help" to see all available commands`);
                return;
            }
            else {
                let text = "Available commands:";
                developerCommands.forEach((command) => {
                    text += `<br>${command.name}: ${command.description}`;
                });
                devConsole.commandHistory.push(text);
            }
        },
    },
    {
        name: "clear",
        description: "Clear the console",
        help: "Clears the console, while keeping the command history.",
        list: [],
        execute: () => {
            devConsole.commandHistory = [""]; // This only clears the logs, not the actual command history
            consoleLog.innerHTML = "";
        },
    },
    {
        name: "dev",
        description: "Enable developer mode",
        help: "dev [save] - Enable developer mode. If 'save' is specified, the setting will be saved to local storage.<br>Use 'dev' again to disable developer mode.<br>Developer mode enables cheat commands and removes certain limitations.",
        list: [[{ id: "save" }]],
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
        help: "onepunch - Deal massive damage with every attack.<br>Use 'onepunch' again to disable this cheat.",
        isCheat: true,
        list: [],
        execute: () => {
            DEVTOOLS.ONE_PUNCH = !DEVTOOLS.ONE_PUNCH;
            devConsole.commandHistory.push(`${DEVTOOLS.ONE_PUNCH ? "You have become ONE" : "Your power has been taken away"}`);
        },
    },
    {
        name: "nocd",
        description: "Remove cooldowns from all abilities",
        help: "nocd - Remove cooldowns from all abilities.<br>Use 'nocd' again to disable this cheat.",
        isCheat: true,
        list: [],
        execute: () => {
            DEVTOOLS.NO_CD = !DEVTOOLS.NO_CD;
            devConsole.commandHistory.push(`Skills are now ${DEVTOOLS.NO_CD ? "instant" : "lethargic"}`);
        },
    },
    {
        name: "freecast",
        description: "Cast abilities without spending mana",
        help: "freecast - Cast abilities without spending mana.<br>Use 'freecast' again to disable this cheat.",
        isCheat: true,
        list: [],
        execute: () => {
            DEVTOOLS.FREE_CAST = !DEVTOOLS.FREE_CAST;
            devConsole.commandHistory.push(`Your mana is now ${DEVTOOLS.FREE_CAST ? "infinite" : "very much finite"}`);
        },
    },
    {
        name: "god",
        description: "Become invincible",
        help: "god - All damage dealt to you will be 0, and you are immune to debuffs.<br>Use 'god' again to disable this cheat.",
        isCheat: true,
        list: [],
        execute: () => {
            DEVTOOLS.GOD = !DEVTOOLS.GOD;
            devConsole.commandHistory.push(`Invincibility ${DEVTOOLS.GOD ? "granted" : "taken away"}`);
        },
    },
    {
        name: "fight",
        description: "[enemy] [amount] Fight an enemy",
        help: "fight [enemy] [amount] - Fight an enemy. Specify amount for group battle.<br>Example: fight skeleton 2",
        isCheat: true,
        list: [Object.values(enemies), [{ id: "amount - number", onSelect: "1" }]],
        execute: (args) => {
            const enemy = args[0];
            const amount = args[1] ? parseInt(args[1]) : 1;
            if (enemy) {
                // @ts-ignore
                if (enemies[enemy]) {
                    // @ts-ignore
                    const enemiesList = new Array(amount).fill(0).map(() => new Enemy(enemies[enemy]));
                    game.beginCombat(enemiesList);
                }
                else {
                    devConsole.commandHistory.push(`Enemy "${enemy}" not found`);
                }
            }
            else {
                devConsole.commandHistory.push("Too few arguments, expected: fight [enemy] [amount");
            }
        },
    },
    {
        name: "killall",
        description: "Kill all enemies in the current fight.",
        help: "killall - Kill all enemies in the current fight.",
        isCheat: true,
        list: [],
        execute: () => {
            const _enemies = combat.getLivingEnemies();
            if (_enemies.length > 0) {
                _enemies.forEach((enemy) => {
                    enemy.stats.hp = 0;
                    update();
                    enemy.die();
                });
                devConsole.commandHistory.push("All enemies killed");
            }
            else {
                devConsole.commandHistory.push("No enemies to kill");
            }
        },
    },
    {
        name: "item",
        description: "[item] [amount] Adds specified quantity of items to your inventory",
        help: "item [item] [amount] - Adds specified quantity of items to your inventory.<br>Example: item small_healing_potion 3",
        isCheat: true,
        list: [Object.values(items), [{ id: "amount - number", onSelect: "5" }]],
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
                    devConsole.commandHistory.push(`Item "${item}" not found`);
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
        help: "gold [amount] - Add gold to your inventory.<br>Example: gold 100",
        isCheat: true,
        list: [[{ id: "amount - number", onSelect: "100" }]],
        execute: (args) => {
            const amount = args[0] ? parseInt(args[0]) : 100;
            player.addGold(amount);
            devConsole.commandHistory.push(`Added ${amount} gold`);
        },
    },
    {
        name: "xp",
        description: "Add experience points",
        help: "xp [amount] - Add experience points.<br>Example: xp 100",
        isCheat: true,
        list: [[{ id: "amount - number", onSelect: "50" }]],
        execute: (args) => {
            const xp = args[0] ? parseInt(args[0]) : 0;
            player.addXP(xp);
            devConsole.commandHistory.push(`Added ${xp} experience points`);
        },
    },
    {
        name: "sp",
        description: "Add skill points",
        help: "sp [amount] - Add skill points.<br>Example: sp 5",
        isCheat: true,
        list: [[{ id: "amount - number", onSelect: "5" }]],
        execute: (args) => {
            const sp = args[0] ? parseInt(args[0]) : 0;
            player.skill_points += sp;
            sideBarDetails();
            devConsole.commandHistory.push(`Added ${sp} skill points`);
        },
    },
    {
        name: "pp",
        description: "Add perk points",
        help: "pp [amount] - Add perk points.<br>Example: pp 5",
        isCheat: true,
        list: [[{ id: "amount - number", onSelect: "5" }]],
        execute: (args) => {
            const sp = args[0] ? parseInt(args[0]) : 0;
            player.perk_points += sp;
            sideBarDetails();
            devConsole.commandHistory.push(`Added ${sp} perk points`);
        },
    },
];
//# sourceMappingURL=commands.js.map