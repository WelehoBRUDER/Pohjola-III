"use strict";
function createStore(options) {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    const storeScreen = document.createElement("div");
    const buyingSelling = document.createElement("div");
    const storeContainer = document.createElement("div");
    storeScreen.classList.add("inventory");
    storeScreen.classList.add("store");
    buyingSelling.classList.add("options");
    storeContainer.classList.add("inventory-container");
    const storeGrid = document.createElement("div");
    storeContainer.append(storeGrid);
    storeGrid.classList.add("inventory-flex");
    sellingOptions.forEach((option) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("lobby-button");
        optionElement.innerText = game.getLocalizedString(option.id);
        optionElement.onclick = option.onClick;
        if ((option.selling && options?.selling) || (!option.selling && !options?.selling)) {
            optionElement.classList.add("selected");
        }
        buyingSelling.append(optionElement);
    });
    if (!options?.selling) {
        const inventory = merchant.inventoryDefault;
        inventory.forEach((merchantItem) => {
            let item = new Item({ ...merchantItem.item, price: merchantItem.price });
            item = item.updateClass();
            const slot = createSlot(item, { buy: true });
            storeGrid.append(slot);
        });
    }
    storeContainer.append(storeGrid);
    storeScreen.append(buyingSelling, storeContainer);
    lobbyContent.append(storeScreen);
}
const sellingOptions = [
    {
        id: "buying",
        selling: false,
        onClick: () => createStore({ selling: false }),
    },
    {
        id: "selling",
        selling: true,
        onClick: () => createStore({ selling: true }),
    },
];
function buyItem(item) {
    if (item.price > player.gold) {
        return;
    }
    player.addGold(-item.price);
    player.addItem(item);
    sideBarDetails();
}
//# sourceMappingURL=store.js.map