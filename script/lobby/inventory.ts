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
  const inventory: any = player.inventory;
  const inventoryGrid = document.createElement("div");
  inventoryContainer.append(inventoryGrid);
  inventoryGrid.classList.add("inventory-flex");
  inventory.forEach((item: any) => {
    const slot = createSlot(item);
    //slot.addEventListener("click", () => useItem(null, i));
    inventoryGrid.append(slot);
  });

  Object.entries(player.equipment).forEach(([slot, item]: [string, Item]) => {
    const slotElement = createSlot(item, { isEquipped: true, slot: slot });
    slotElement.classList.add("equip");
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

function createSlot(item: Item, options?: { isEquipped?: boolean; slot?: string }) {
  const slot = document.createElement("div");
  slot.classList.add("inventory-slot");
  if (item) {
    slot.setAttribute("data-item", item.id);
    slot.classList.add(item.tier.id);
    const image = document.createElement("img");
    image.src = item.icon ?? icons.placeholder;
    slot.append(image);
    if (item.amount && item.amount > 1) {
      const amount = document.createElement("div");
      amount.classList.add("amount");
      amount.innerText = item.amount.toString();
      slot.append(amount);
    }
    if (options?.isEquipped) {
      slot.onclick = () => {
        player.unequip(item.slot);
        createInventory();
      };
    } else {
      slot.onclick = () => {
        player.equip(item as any, { removeFromInventory: true });
        createInventory();
      };
    }
    tooltip(slot, item.tooltip());
  } else if (options?.isEquipped) {
    const image = document.createElement("img");
    image.src = icons[options.slot || "placeholder"];
    image.style.opacity = "0.25";
    slot.append(image);
  }
  return slot;
}
