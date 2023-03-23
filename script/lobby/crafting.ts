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
  const craftableItems: Item[] = Object.values(items)
    .filter((item: any) => item.toCraft)
    .sort((a, b) => a.tier.level - b.tier.level)
    .map((item: any) => {
      const _item: Item = new Item(item as ItemObject);
      return _item.updateClass();
    });
  lobbyContent.append(
    inventoryController.buildInventoryScreen({
      inventory: craftableItems,
      mode: "crafting",
      offsetPercent: 35,
      class: "craft",
    })
  );
}

function buildBasicInventory() {
  const invScreen = document.createElement("div");
  const invContainer = document.createElement("div");
  invScreen.classList.add("crafting");
  invContainer.classList.add("crafting-container");
  invScreen.append(invContainer);
  player.inventory.forEach((item: Item) => {
    const slot = createSlot(item);
    invContainer.append(slot);
  });
  return invScreen;
}
