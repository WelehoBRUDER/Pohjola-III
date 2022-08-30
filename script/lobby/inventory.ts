function createInventory() {
  lobbyContent.innerHTML = "";
  const inventoryContainer = document.createElement("div");
  inventoryContainer.classList.add("inventory-container");
  const inventory: any = player.inventory;
  const inventoryGrid = document.createElement("div");
  inventoryContainer.append(inventoryGrid);
  inventoryGrid.classList.add("inventory-flex");
  inventory.forEach((item: any, index: number) => {
    const slot = document.createElement("div");
    slot.classList.add("inventory-slot");
    slot.setAttribute("data-index", index.toString());
    slot.setAttribute("data-item", item.id);
    const image = document.createElement("img");
    image.src = item.icon ?? icons.placeholder;
    slot.append(image);
    //tooltip(slot, item.tooltip());
    //slot.addEventListener("click", () => useItem(null, i));
    inventoryGrid.append(slot);
  });
  window.onresize = () => {
    resizeInventoryContainer();
  };
  function resizeInventoryContainer() {
    let width = lobbyContent.offsetWidth - 400;
    const slotSize = 90;
    const slotsPerRow = Math.floor(width / slotSize) > 2 ? Math.floor(width / slotSize) : 2;
    inventoryContainer.style.width = slotSize * slotsPerRow + "px";
    inventoryGrid.style.width = slotSize * slotsPerRow + "px";
  }
  lobbyContent.append(inventoryContainer);
  resizeInventoryContainer();
}
