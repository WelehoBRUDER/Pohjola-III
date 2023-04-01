"use strict";
const craftScreen = {
    width: 0,
};
function createCrafting() {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    craftScreen.width;
    lobbyContent.append(buildBasicInventory());
    // Crafting screen
    const craftableItems = Object.values(items)
        .filter((item) => item.toCraft)
        .sort((a, b) => a.tier.level - b.tier.level)
        .map((item) => {
        const _item = new Item(item);
        return _item.updateClass();
    });
    lobbyContent.append(inventoryController.buildInventoryScreen({
        inventory: craftableItems,
        mode: "crafting",
        offsetPercent: 35,
        class: "craft",
    }));
}
function buildBasicInventory() {
    const invScreen = document.createElement("div");
    const invContainer = document.createElement("div");
    invScreen.classList.add("crafting");
    invContainer.classList.add("crafting-container");
    invScreen.append(invContainer);
    player.inventory.forEach((item) => {
        const slot = createSlot(item);
        invContainer.append(slot);
    });
    return invScreen;
}
//# sourceMappingURL=crafting.js.map