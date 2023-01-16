"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function createStore(options) {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    var storeScreen = document.createElement("div");
    var buyingSelling = document.createElement("div");
    var storeContainer = document.createElement("div");
    storeScreen.classList.add("inventory");
    storeScreen.classList.add("store");
    buyingSelling.classList.add("options");
    storeContainer.classList.add("inventory-container");
    var storeGrid = document.createElement("div");
    storeContainer.append(storeGrid);
    storeGrid.classList.add("inventory-flex");
    sellingOptions.forEach(function (option) {
        var optionElement = document.createElement("div");
        optionElement.classList.add("lobby-button");
        optionElement.innerText = game.getLocalizedString(option.id);
        optionElement.onclick = option.onClick;
        if ((option.selling && (options === null || options === void 0 ? void 0 : options.selling)) || (!option.selling && !(options === null || options === void 0 ? void 0 : options.selling))) {
            optionElement.classList.add("selected");
        }
        buyingSelling.append(optionElement);
    });
    if (!(options === null || options === void 0 ? void 0 : options.selling)) {
        var inventory = merchant.inventoryDefault;
        inventory.forEach(function (merchantItem) {
            var item = new Item(__assign(__assign({}, merchantItem.item), { price: merchantItem.price }));
            item = item.updateClass();
            var slot = createSlot(item, { buy: true });
            if (item.price > player.gold) {
                slot.classList.add("disabled");
            }
            storeGrid.append(slot);
        });
    }
    else {
        var inventory = player.inventory;
        inventory.forEach(function (item) {
            item = item.updateClass();
            var slot = createSlot(item, { sell: true });
            storeGrid.append(slot);
        });
    }
    storeContainer.append(storeGrid);
    storeScreen.append(buyingSelling, storeContainer);
    lobbyContent.append(storeScreen);
}
var sellingOptions = [
    {
        id: "buying",
        selling: false,
        onClick: function () { return createStore({ selling: false }); }
    },
    {
        id: "selling",
        selling: true,
        onClick: function () { return createStore({ selling: true }); }
    },
];
function buyItem(item, amount) {
    if (amount === void 0) { amount = 1; }
    if (item.price * amount > player.gold) {
        return;
    }
    player.addGold(-item.price * amount);
    player.addItem(item, amount);
    createStore({ selling: false });
}
function sellItem(item, amount) {
    if (amount === void 0) { amount = 1; }
    player.addGold(item.price * amount);
    player.removeItem(item, amount);
    createStore({ selling: true });
}
var promptValues = {
    itemAmount: 1,
    itemMax: 99,
    mode: "buying",
    item: null
};
function updateAmount(amount) {
    var _a;
    if (amount > promptValues.itemMax)
        amount = promptValues.itemMax;
    promptValues.itemAmount = amount;
    if (promptValues.itemAmount < 1) {
        promptValues.itemAmount = 1;
    }
    itemPromptAmount.innerText = promptValues.itemAmount.toString();
    itemPromptSlider.value = promptValues.itemAmount.toString();
    itemPromptPrice.innerText = compactNumber(promptValues.itemAmount * (((_a = promptValues === null || promptValues === void 0 ? void 0 : promptValues.item) === null || _a === void 0 ? void 0 : _a.price) || 0));
}
function increaseAmount() {
    updateAmount(promptValues.itemAmount + 1);
}
function decreaseAmount() {
    updateAmount(promptValues.itemAmount - 1);
}
function createAmountPrompt(item, maxAmount, mode) {
    if (mode === void 0) { mode = "buying"; }
    itemPrompt.classList.remove("disabled");
    promptValues.itemAmount = 1;
    itemPromptSlider.max = maxAmount.toString();
    promptValues.itemMax = maxAmount;
    promptValues.item = item;
    promptValues.mode = mode;
    itemPromptTitle.innerText = game.getLocalizedString(item.id);
    updateAmount(1);
}
function destroyAmountPrompt() {
    itemPrompt.classList.add("disabled");
    promptValues.itemAmount = 1;
}
function cancelAmount() {
    destroyAmountPrompt();
}
function confirmAmount() {
    if (promptValues.item) {
        if (promptValues.mode === "buying") {
            buyItem(promptValues.item, promptValues.itemAmount);
        }
        else {
            sellItem(promptValues.item, promptValues.itemAmount);
        }
    }
    destroyAmountPrompt();
}
//# sourceMappingURL=store.js.map