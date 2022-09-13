"use strict";
function createInventory() {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    const invScreen = document.createElement("div");
    const inventoryContainer = document.createElement("div");
    const inventoryEquipment = document.createElement("div");
    invScreen.classList.add("inventory");
    inventoryContainer.classList.add("inventory-container");
    inventoryEquipment.classList.add("inventory-equipment");
    const inventory = player.inventory;
    const inventoryGrid = document.createElement("div");
    inventoryContainer.append(inventoryGrid);
    inventoryGrid.classList.add("inventory-flex");
    inventory.forEach((item) => {
        const slot = createSlot(item);
        //slot.addEventListener("click", () => useItem(null, i));
        slot.addEventListener("mouseover", () => {
            hoverEquipSlot(item);
        });
        slot.addEventListener("mouseleave", () => {
            removeHoverEquipSlot(item);
        });
        inventoryGrid.append(slot);
    });
    Object.entries(player.equipment).forEach(([slot, item]) => {
        const slotElement = createSlot(item, { isEquipped: true, slot: slot });
        slotElement.classList.add("equip");
        slotElement.setAttribute("data-item-slot", slot);
        inventoryEquipment.append(slotElement);
    });
    window.onresize = () => {
        resizeInventoryContainer();
    };
    function resizeInventoryContainer() {
        let width = lobbyContent.offsetWidth - 270;
        const slotSize = 90;
        const slotsPerRow = Math.floor(width / slotSize) > 2 ? Math.floor(width / slotSize) : 2;
        width = slotsPerRow * slotSize;
        inventoryContainer.style.width = width + "px";
        inventoryGrid.style.width = width + "px";
        inventoryEquipment.style.width = lobbyContent.offsetWidth - width + "px";
    }
    invScreen.append(inventoryContainer, inventoryEquipment);
    lobbyContent.append(invScreen);
    resizeInventoryContainer();
}
function createSlot(item, options) {
    const slot = document.createElement("div");
    slot.classList.add("inventory-slot");
    if (item) {
        slot.setAttribute("data-item", item.id);
        slot.classList.add(item.tier.id);
        const image = document.createElement("img");
        image.src = item.icon ?? icons.placeholder;
        slot.append(image);
        if ((item.amount && item.amount > 1) || options?.buy) {
            const amount = document.createElement("div");
            amount.classList.add("amount");
            amount.innerText = item?.amount?.toString() || "";
            if (options?.buy) {
                amount.innerText = item.price.toString();
                amount.classList.add("price");
            }
            slot.append(amount);
        }
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
                clickItem(item, { shift: e.shiftKey, pos: { x: e.clientX, y: e.clientY } });
            };
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
    if (options?.shift && !options.buy && !options.sell) {
        if (options?.equipped) {
            player.unequip(item.slot);
            createInventory();
        }
        else {
            player.equip(item, { removeFromInventory: true });
            createInventory();
        }
    }
    else if (options?.pos) {
        const buttons = [];
        if (options?.buy) {
            buttons.push({
                text: "buy_item",
                action: () => {
                    buyItem(item);
                },
            });
            buttons.push({
                text: "buy_multiple_item",
                action: () => {
                    createAmountPrompt(item, 100);
                },
            });
        }
        else if (options?.sell) {
            buttons.push({
                text: "sell_item",
                action: () => {
                    sellItem(item);
                },
            });
            buttons.push({
                text: "sell_multiple_item",
                action: () => {
                    createAmountPrompt(item, item.amount || 1, "selling");
                },
            });
        }
        else if (options?.equipped) {
            buttons.push({
                text: "unequip_item",
                action: () => {
                    player.unequip(item.slot);
                    createInventory();
                },
            });
        }
        else {
            buttons.push({
                text: "equip_item",
                action: () => {
                    player.equip(item, { removeFromInventory: true });
                    createInventory();
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
            console.log(option);
            const menuOption = document.createElement("div");
            menuOption.classList.add("option");
            menuOption.innerText = game.getLocalizedString(option.text);
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