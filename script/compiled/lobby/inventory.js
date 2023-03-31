"use strict";
function createInventory() {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    lobbyContent.append(inventoryController.buildInventoryScreen({
        inventory: player.inventory,
        equipment: player.equipment,
        mode: "inventory",
        offset: 270,
    }));
}
function isInCombat() {
    return combat.enemies.length !== 0;
}
function isPlayerTurn() {
    return player.stats.ap >= 100;
}
class InventoryController {
    fullInventory;
    inventory;
    equipment;
    mode;
    inventoryElement;
    inventoryGridElement;
    inventoryEquipmentElement;
    tools;
    constructor() {
        this.fullInventory = [];
        this.inventory = [];
        this.equipment = null;
        this.mode = "inventory";
        this.inventoryElement = null;
        this.inventoryGridElement = null;
        this.inventoryEquipmentElement = null;
        this.tools = {
            search: "",
            filter: {
                include: [],
                exclude: [],
            },
            sort: {
                name: "none",
                reverse: false,
            },
        };
    }
    setFullInventory(fullInventory) {
        fullInventory.forEach((item, index) => {
            if (!(item instanceof Item)) {
                // @ts-ignore
                return (fullInventory[index] = new Item({ ...items[item.item.id], price: item.price }));
            }
        });
        fullInventory.forEach((item, index) => {
            fullInventory[index] = item.updateClass(item.price);
        });
        this.fullInventory = fullInventory;
    }
    setInventory(inventory) {
        this.inventory = [...inventory];
    }
    setEquipment(equipment) {
        this.equipment = equipment;
    }
    setMode(mode) {
        this.mode = mode;
    }
    buildInventoryScreen(options) {
        // Set properties
        this.setFullInventory(options?.inventory || this.inventory);
        this.setInventory([...this.fullInventory]);
        this.setMode(options?.mode || this.mode);
        if (options?.equipment)
            this.setEquipment(options?.equipment);
        // Create elements and add classes
        const inventoryScreen = document.createElement("div");
        const inventoryContainer = document.createElement("div");
        const inventoryGrid = document.createElement("div");
        const inventoryEquipment = document.createElement("div");
        inventoryScreen.classList.add("inventory");
        if (options?.class)
            inventoryScreen.classList.add(options?.class);
        inventoryContainer.classList.add("inventory-container");
        inventoryGrid.classList.add("inventory-flex");
        inventoryEquipment.classList.add("inventory-equipment");
        // Set more properties
        this.inventoryElement = inventoryScreen;
        this.inventoryGridElement = inventoryGrid;
        // Append elements
        inventoryContainer.append(this.createFilterTools(), inventoryGrid);
        inventoryScreen.append(inventoryContainer);
        if (options?.equipment) {
            this.inventoryEquipmentElement = inventoryEquipment;
            inventoryScreen.append(inventoryEquipment);
        }
        // Handle resizing the screen
        window.onresize = () => {
            resizeInventoryContainer();
        };
        function resizeInventoryContainer() {
            const offset = options?.offsetPercent ? lobbyContent.offsetWidth * (options?.offsetPercent / 100 ?? 0) : options?.offset ?? 0;
            let width = lobbyContent.offsetWidth - offset;
            const slotSize = 90;
            const slotsPerRow = Math.floor(width / slotSize) > 2 ? Math.floor(width / slotSize) : 2;
            width = slotsPerRow * slotSize;
            inventoryContainer.style.width = width + "px";
            inventoryGrid.style.width = width + "px";
            inventoryEquipment.style.width = lobbyContent.offsetWidth - width + "px";
        }
        // if (this.mode === "crafting") {
        //   this.setInventory(this.fullInventory.filter((item: Item) => item.type === "material"));
        // }
        resizeInventoryContainer();
        this.buildItems();
        if (options?.equipment)
            this.buildEquipment();
        return inventoryScreen;
    }
    buildEquipment() {
        if (this.inventoryEquipmentElement === null)
            return;
        this.inventoryEquipmentElement.innerHTML = "";
        Object.entries(player.equipment).forEach(([slot, item]) => {
            const slotElement = createSlot(item, { isEquipped: true, slot: slot });
            slotElement.classList.add("equip");
            slotElement.setAttribute("data-item-slot", slot);
            this.inventoryEquipmentElement.append(slotElement);
        });
    }
    buildItems() {
        if (this.inventoryGridElement === null)
            return;
        this.inventoryGridElement.innerHTML = "";
        this.inventory.forEach((item) => {
            let options = {
                buy: this.mode === "buy",
                sell: this.mode === "sell",
                craft: this.mode === "crafting",
                material: item.type === "material",
            };
            if (options.craft) {
                // Create container for crafting
                const container = document.createElement("div");
                const recipe = document.createElement("div");
                const materials = document.createElement("div");
                const icon = createSlot(item, { noClick: true });
                const name = document.createElement("div");
                const craftButton = createSlot(item, { craft: true });
                // Add classes
                container.classList.add("craft-container");
                container.classList.add(`${item.canCraft() ? "enabled" : "disabled"}`);
                name.classList.add("craft-name");
                recipe.classList.add("craft-recipe");
                materials.classList.add("craft-materials");
                name.textContent = game.getLocalizedString(item.id);
                // Add materials
                item.toCraft?.forEach((material) => {
                    // @ts-ignore
                    const mat = new Item({ ...items[material.item], amount: material.amount })?.updateClass();
                    const materialSlot = createSlot(mat, { material: true, craft: true });
                    materials.append(materialSlot);
                });
                container.onclick = () => {
                    container.classList.toggle("open");
                };
                recipe.append(craftButton, materials);
                container.append(icon, name, recipe);
                this.inventoryGridElement.append(container);
            }
            else {
                const slot = createSlot(item, options);
                // Add highlight to slot if equipment is shown
                if (this.equipment) {
                    slot.addEventListener("mouseover", () => {
                        hoverEquipSlot(item);
                    });
                    slot.addEventListener("mouseleave", () => {
                        removeHoverEquipSlot(item);
                    });
                }
                this.inventoryGridElement.append(slot); // This has already been checked at the start
            }
        });
    }
    updateInventory() {
        this.inventory = [...this.fullInventory];
        if (this.tools.search.length > 0) {
            this.inventory = this.inventory.filter((item) => {
                const name = game.getLocalizedString(item.id);
                return name.toLowerCase().includes(this.tools.search.toLowerCase());
            });
        }
        if (this.tools.filter.include.length > 0 || this.tools.filter.exclude.length > 0) {
            const types = ["weapon", "armor", "talisman", "material", "potion"];
            this.inventory = this.inventory.filter((item) => {
                let passed = 0;
                const include = this.tools.filter.include;
                const exclude = this.tools.filter.exclude;
                include.forEach((filter) => {
                    if (types.includes(filter)) {
                        if (item.type === filter)
                            passed++;
                    }
                    else {
                        if (item[filter] !== undefined)
                            passed++;
                    }
                });
                exclude.forEach((filter) => {
                    if (types.includes(filter)) {
                        if (item.type === filter)
                            passed--;
                    }
                    else {
                        if (item[filter] !== undefined)
                            passed--;
                    }
                });
                return passed === include.length;
            });
        }
        if (this.tools.sort.name !== "none") {
            const sort = this.tools.sort.name;
            const reverse = this.tools.sort.reverse;
            if (sort === "tier") {
                this.inventory.sort((a, b) => {
                    const aTier = itemTiers[a.tier.id].level;
                    const bTier = itemTiers[b.tier.id].level;
                    return reverse ? bTier - aTier : aTier - bTier;
                });
            }
            if (sort.includes("Defence")) {
                const type = sort.split("Defence")[0].toLowerCase();
                this.inventory.sort((a, b) => {
                    const aProp = a.defence?.[type] || a.modifiers?.[sort + "V"] || -1;
                    const bProp = b.defence?.[type] || b.modifiers?.[sort + "V"] || -1;
                    if (aProp === -1 && bProp === -1)
                        return 0;
                    if (aProp === -1)
                        return 1;
                    if (bProp === -1)
                        return -1;
                    return reverse ? bProp - aProp : aProp - bProp;
                });
            }
            else if (sort.endsWith("P") || sort.endsWith("V")) {
                this.inventory.sort((a, b) => {
                    const aProp = a.modifiers[sort] || -1;
                    const bProp = b.modifiers[sort] || -1;
                    if (aProp === -1 && bProp === -1)
                        return 0;
                    if (aProp === -1)
                        return 1;
                    if (bProp === -1)
                        return -1;
                    return reverse ? bProp - aProp : aProp - bProp;
                });
            }
            else {
                this.inventory.sort((a, b) => {
                    const aProp = a[sort] || -1;
                    const bProp = b[sort] || -1;
                    if (aProp === -1 && bProp === -1)
                        return 0;
                    if (aProp === -1)
                        return 1;
                    if (bProp === -1)
                        return -1;
                    return reverse ? bProp - aProp : aProp - bProp;
                });
            }
        }
        this.buildItems();
    }
    createFilterTools() {
        // Create elements
        const toolBar = document.createElement("div");
        const search = document.createElement("input");
        const sortArr = [
            "tier",
            "price",
            "atk",
            "spell_scale",
            "speed",
            "slot",
            "heal",
            "manaRecover",
            "physicalDefence",
            "magicalDefence",
            "elementalDefence",
            "hpMaxV",
            "hpMaxP",
            "mpMaxV",
            "mpMaxP",
        ];
        const filterArr = ["weapon", "armor", "talisman", "material", "potion", "speed", "atk", "spell_scale"];
        const sort = toggleableCustomSelect("sort", sortArr, { color: "rgb(46, 46, 46)", dark: "rgb(20, 20, 20)", hover: "rgb(60, 60, 60)" }, "Sort items", null, this.sortCallback);
        const filter = toggleableCustomSelect("filter", filterArr, { color: "rgb(76, 76, 76)", dark: "rgb(40, 40, 40)", hover: "rgb(90, 90, 90)" }, "Filter items", {
            multiSelect: true,
        }, this.filterCallback);
        // Add classes
        toolBar.classList.add("inventory-toolbar");
        search.classList.add("search");
        search.placeholder = game.getLocalizedString("search");
        toolBar.append(search, sort, filter);
        search.oninput = () => {
            this.tools.search = search.value;
            this.updateInventory();
        };
        search.onfocus = () => {
            game.typing = true;
        };
        search.onblur = () => {
            game.typing = false;
        };
        return toolBar;
    }
    sortCallback(properties) {
        inventoryController.tools.sort.name = properties.selected.length > 0 ? properties.selected[0] : "none";
        inventoryController.tools.sort.reverse = properties.mode.length > 0 ? properties.mode[0] === 0 : false;
        inventoryController.updateInventory();
    }
    filterCallback(properties) {
        inventoryController.tools.filter.include = [];
        inventoryController.tools.filter.exclude = [];
        if (properties.selected.length > 0) {
            properties.selected.forEach((crit, index) => {
                const excluded = properties.mode[index] === 1;
                if (excluded) {
                    inventoryController.tools.filter.exclude.push(crit);
                }
                else {
                    inventoryController.tools.filter.include.push(crit);
                }
            });
        }
        inventoryController.updateInventory();
    }
}
const inventoryController = new InventoryController();
function createSlot(item, options) {
    const slot = document.createElement("div");
    slot.classList.add("inventory-slot");
    if (options?.material && options?.craft) {
        slot.classList.add("material");
        if (player.hasItem(item.id, item.amount)) {
            slot.classList.add("enough");
        }
        else {
            slot.classList.add("not-enough");
        }
    }
    if ((isInCombat() && !isPlayerTurn()) || (options?.craft && !item.canCraft())) {
        slot.classList.add("disabled");
    }
    if (item) {
        slot.setAttribute("data-item", item.id);
        slot.classList.add(item.tier?.id ?? "ERROR;_WRONG_TIER_ID");
        const image = document.createElement("img");
        image.src = item.icon ?? icons.placeholder;
        slot.append(image);
        if ((item.amount && item.amount > 1) || options?.buy) {
            const amount = document.createElement("div");
            amount.classList.add("amount");
            amount.innerText = item?.amount?.toString() || "";
            if (options?.buy) {
                amount.innerText = compactNumber(item.price);
                amount.classList.add("price");
            }
            slot.append(amount);
        }
        if (!options?.material && !options?.noClick) {
            if (options?.buy) {
                slot.onclick = (e) => {
                    clickItem(item, {
                        shift: e.shiftKey,
                        pos: { x: e.clientX, y: e.clientY },
                        buy: true,
                    });
                };
            }
            else if (options?.sell) {
                slot.onclick = (e) => {
                    clickItem(item, {
                        shift: e.shiftKey,
                        pos: { x: e.clientX, y: e.clientY },
                        sell: true,
                    });
                };
            }
            else if (options?.isEquipped) {
                slot.onclick = (e) => {
                    clickItem(item, {
                        shift: e.shiftKey,
                        equipped: true,
                        pos: { x: e.clientX, y: e.clientY },
                    });
                };
            }
            else {
                slot.onclick = (e) => {
                    clickItem(item, { shift: e.shiftKey, pos: { x: e.clientX, y: e.clientY }, craft: options?.craft });
                };
            }
        }
        const compare = item.compare(player.equipment[item?.slot ?? ""]);
        tooltip(slot, item.tooltip(), compare ? compare : undefined);
    }
    else if (options?.isEquipped) {
        const image = document.createElement("img");
        image.src = icons[options.slot || "placeholder"];
        image.style.opacity = "0.25";
        slot.append(image);
    }
    return slot;
}
function clickItem(item, options) {
    if (isInCombat() && !isPlayerTurn())
        return;
    if (options?.shift && !options.buy && !options.sell && !isInCombat()) {
        if (item.type !== "potion" && item.type !== "material") {
            if (options?.equipped) {
                player.unequip(item.slot);
                createInventory();
            }
            else {
                player.equip(item, { removeFromInventory: true });
                createInventory();
            }
        }
    }
    else if (options?.shift && item.type === "potion" && isInCombat() && !options.buy && !options.sell) {
        player.drinkPotion(item);
        createInventory();
        if (pouchState.open) {
            closePouch();
        }
    }
    else if (options?.pos) {
        const buttons = [];
        if (options?.buy) {
            buttons.push({
                text: `${game.getLocalizedString("buy_item")}`,
                action: () => {
                    buyItem(item);
                },
            });
            buttons.push({
                text: `${game.getLocalizedString("buy_multiple_item")}`,
                action: () => {
                    createAmountPrompt(item, 100);
                },
            });
        }
        else if (options?.sell) {
            buttons.push({
                text: game.getLocalizedString("sell_item"),
                action: () => {
                    sellItem(item);
                },
            });
            buttons.push({
                text: `${game.getLocalizedString("sell_multiple_item")}`,
                action: () => {
                    createAmountPrompt(item, item.amount || 1, "selling");
                },
            });
        }
        else if (options?.equipped) {
            buttons.push({
                text: `${game.getLocalizedString("unequip_item")}`,
                action: () => {
                    player.unequip(item.slot);
                    createInventory();
                },
            });
        }
        else if (item.type !== "potion" && item.type !== "material") {
            if (!options?.craft) {
                buttons.push({
                    text: `${game.getLocalizedString("equip_item")}`,
                    action: () => {
                        player.equip(item, { removeFromInventory: true });
                        createInventory();
                    },
                });
            }
            else if (options?.craft) {
                buttons.push({
                    text: `${game.getLocalizedString("craft_item")}${item.canCraft() ? "" : " (too few mats)"}`,
                    action: () => {
                        item.craft();
                        createCrafting();
                    },
                });
            }
        }
        if (item.type === "potion" && !options?.buy) {
            buttons.push({
                text: `${game.getLocalizedString("drink_potion")}`,
                action: () => {
                    player.drinkPotion(item);
                    createInventory();
                    if (pouchState.open) {
                        closePouch();
                    }
                },
            });
        }
        createContextMenu(buttons, options.pos);
    }
}
function hoverEquipSlot(item) {
    const slot = document.querySelector(`[data-item-slot=${item.slot}]`);
    if (slot) {
        slot.classList.add("hover");
    }
}
function removeHoverEquipSlot(item) {
    const slot = document.querySelector(`[data-item-slot=${item.slot}]`);
    if (slot) {
        slot.classList.remove("hover");
    }
}
function createContextMenu(options, pos) {
    contextMenu.innerHTML = "";
    setTimeout(() => {
        options.forEach((option) => {
            const menuOption = document.createElement("div");
            menuOption.classList.add("option");
            menuOption.innerText = option.text;
            menuOption.onclick = () => {
                option.action();
                removeContextMenu();
            };
            contextMenu.append(menuOption);
        });
        contextMenu.style.top = pos.y + "px";
        contextMenu.style.left = pos.x + "px";
    });
}
function removeContextMenu() {
    contextMenu.innerHTML = "";
}
window.addEventListener("click", removeContextMenu);
//# sourceMappingURL=inventory.js.map