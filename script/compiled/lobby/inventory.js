"use strict";
function createInventory() {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    var invScreen = document.createElement("div");
    var inventoryContainer = document.createElement("div");
    var inventoryEquipment = document.createElement("div");
    invScreen.classList.add("inventory");
    inventoryContainer.classList.add("inventory-container");
    inventoryEquipment.classList.add("inventory-equipment");
    var inventory = player.inventory;
    var inventoryGrid = document.createElement("div");
    inventoryContainer.append(inventoryGrid);
    inventoryGrid.classList.add("inventory-flex");
    inventory.forEach(function (item) {
        var slot = createSlot(item);
        //slot.addEventListener("click", () => useItem(null, i));
        slot.addEventListener("mouseover", function () {
            hoverEquipSlot(item);
        });
        slot.addEventListener("mouseleave", function () {
            removeHoverEquipSlot(item);
        });
        inventoryGrid.append(slot);
    });
    Object.entries(player.equipment).forEach(function (_a) {
        var slot = _a[0], item = _a[1];
        var slotElement = createSlot(item, { isEquipped: true, slot: slot });
        slotElement.classList.add("equip");
        slotElement.setAttribute("data-item-slot", slot);
        inventoryEquipment.append(slotElement);
    });
    window.onresize = function () {
        resizeInventoryContainer();
    };
    function resizeInventoryContainer() {
        var width = lobbyContent.offsetWidth - 270;
        var slotSize = 90;
        var slotsPerRow = Math.floor(width / slotSize) > 2 ? Math.floor(width / slotSize) : 2;
        width = slotsPerRow * slotSize;
        inventoryContainer.style.width = width + "px";
        inventoryGrid.style.width = width + "px";
        inventoryEquipment.style.width = lobbyContent.offsetWidth - width + "px";
    }
    invScreen.append(inventoryContainer, inventoryEquipment);
    lobbyContent.append(invScreen);
    resizeInventoryContainer();
}
function isInCombat() {
    return combat.enemies.length !== 0;
}
function isPlayerTurn() {
    return player.stats.ap >= 100;
}
function createSlot(item, options) {
    var _a, _b, _c;
    var slot = document.createElement("div");
    slot.classList.add("inventory-slot");
    if (isInCombat() && !isPlayerTurn()) {
        slot.classList.add("disabled");
    }
    if (item) {
        slot.setAttribute("data-item", item.id);
        slot.classList.add(item.tier.id);
        var image = document.createElement("img");
        image.src = (_a = item.icon) !== null && _a !== void 0 ? _a : icons.placeholder;
        slot.append(image);
        if ((item.amount && item.amount > 1) || (options === null || options === void 0 ? void 0 : options.buy)) {
            var amount = document.createElement("div");
            amount.classList.add("amount");
            amount.innerText = ((_b = item === null || item === void 0 ? void 0 : item.amount) === null || _b === void 0 ? void 0 : _b.toString()) || "";
            if (options === null || options === void 0 ? void 0 : options.buy) {
                amount.innerText = compactNumber(item.price);
                amount.classList.add("price");
            }
            slot.append(amount);
        }
        if (options === null || options === void 0 ? void 0 : options.buy) {
            slot.onclick = function (e) {
                clickItem(item, {
                    shift: e.shiftKey,
                    pos: { x: e.clientX, y: e.clientY },
                    buy: true
                });
            };
        }
        else if (options === null || options === void 0 ? void 0 : options.sell) {
            slot.onclick = function (e) {
                clickItem(item, {
                    shift: e.shiftKey,
                    pos: { x: e.clientX, y: e.clientY },
                    sell: true
                });
            };
        }
        else if (options === null || options === void 0 ? void 0 : options.isEquipped) {
            slot.onclick = function (e) {
                clickItem(item, {
                    shift: e.shiftKey,
                    equipped: true,
                    pos: { x: e.clientX, y: e.clientY }
                });
            };
        }
        else {
            slot.onclick = function (e) {
                clickItem(item, { shift: e.shiftKey, pos: { x: e.clientX, y: e.clientY } });
            };
        }
        var compare = item.compare(player.equipment[(_c = item === null || item === void 0 ? void 0 : item.slot) !== null && _c !== void 0 ? _c : ""]);
        tooltip(slot, item.tooltip(), compare ? compare : undefined);
    }
    else if (options === null || options === void 0 ? void 0 : options.isEquipped) {
        var image = document.createElement("img");
        image.src = icons[options.slot || "placeholder"];
        image.style.opacity = "0.25";
        slot.append(image);
    }
    return slot;
}
function clickItem(item, options) {
    if (isInCombat() && !isPlayerTurn())
        return;
    if ((options === null || options === void 0 ? void 0 : options.shift) && !options.buy && !options.sell && !isInCombat()) {
        if (item.type !== "potion" && item.type !== "material") {
            if (options === null || options === void 0 ? void 0 : options.equipped) {
                player.unequip(item.slot);
                createInventory();
            }
            else {
                player.equip(item, { removeFromInventory: true });
                createInventory();
            }
        }
    }
    else if ((options === null || options === void 0 ? void 0 : options.shift) && item.type === "potion" && isInCombat() && !options.buy && !options.sell) {
        player.drinkPotion(item);
        createInventory();
        if (pouchState.open) {
            closePouch();
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.pos) {
        var buttons = [];
        if (options === null || options === void 0 ? void 0 : options.buy) {
            buttons.push({
                text: "buy_item",
                action: function () {
                    buyItem(item);
                }
            });
            buttons.push({
                text: "buy_multiple_item",
                action: function () {
                    createAmountPrompt(item, 100);
                }
            });
        }
        else if (options === null || options === void 0 ? void 0 : options.sell) {
            buttons.push({
                text: "sell_item",
                action: function () {
                    sellItem(item);
                }
            });
            buttons.push({
                text: "sell_multiple_item",
                action: function () {
                    createAmountPrompt(item, item.amount || 1, "selling");
                }
            });
        }
        else if (options === null || options === void 0 ? void 0 : options.equipped) {
            buttons.push({
                text: "unequip_item",
                action: function () {
                    player.unequip(item.slot);
                    createInventory();
                }
            });
        }
        else if (item.type !== "potion" && item.type !== "material") {
            buttons.push({
                text: "equip_item",
                action: function () {
                    player.equip(item, { removeFromInventory: true });
                    createInventory();
                }
            });
        }
        if (item.type === "potion") {
            buttons.push({
                text: "drink_potion",
                action: function () {
                    player.drinkPotion(item);
                    createInventory();
                    if (pouchState.open) {
                        closePouch();
                    }
                }
            });
        }
        createContextMenu(buttons, options.pos);
    }
}
function hoverEquipSlot(item) {
    var slot = document.querySelector("[data-item-slot=" + item.slot + "]");
    if (slot) {
        slot.classList.add("hover");
    }
}
function removeHoverEquipSlot(item) {
    var slot = document.querySelector("[data-item-slot=" + item.slot + "]");
    if (slot) {
        slot.classList.remove("hover");
    }
}
function createContextMenu(options, pos) {
    contextMenu.innerHTML = "";
    setTimeout(function () {
        options.forEach(function (option) {
            console.log(option);
            var menuOption = document.createElement("div");
            menuOption.classList.add("option");
            menuOption.innerText = game.getLocalizedString(option.text);
            menuOption.onclick = function () {
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