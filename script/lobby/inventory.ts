function createInventory() {
  lobbyContent.innerHTML = "";
  hideHover();
  sideBarDetails();
  lobbyContent.append(buildInventoryScreen({ includeEquipment: true, offset: 270 }));
}

function isInCombat() {
  return combat.enemies.length !== 0;
}

function isPlayerTurn() {
  return player.stats.ap >= 100;
}

function buildInventoryScreen(options?: {
  includeEquipment?: boolean;
  offset?: number;
  offsetPercent?: number;
  filter?: string;
  class?: string;
}) {
  const invScreen = document.createElement("div");
  const inventoryContainer = document.createElement("div");
  invScreen.classList.add("inventory");
  if (options?.class) invScreen.classList.add(options?.class);
  inventoryContainer.classList.add("inventory-container");
  const inventory: any = player.inventory;
  const inventoryGrid = document.createElement("div");
  inventoryContainer.append(inventoryGrid);
  inventoryGrid.classList.add("inventory-flex");
  inventory.forEach((item: any) => {
    if (options?.filter) {
      if (options?.filter === "crafting") {
        if (item.type === "potion") return;
      }
    }
    const slot = createSlot(item);
    if (options?.includeEquipment) {
      slot.addEventListener("mouseover", () => {
        hoverEquipSlot(item);
      });
      slot.addEventListener("mouseleave", () => {
        removeHoverEquipSlot(item);
      });
    }
    inventoryGrid.append(slot);
  });

  const inventoryEquipment = document.createElement("div");
  if (options?.includeEquipment) {
    inventoryEquipment.classList.add("inventory-equipment");
    Object.entries(player.equipment).forEach(([slot, item]: [string, Item]) => {
      const slotElement = createSlot(item, { isEquipped: true, slot: slot });
      slotElement.classList.add("equip");
      slotElement.setAttribute("data-item-slot", slot);
      inventoryEquipment.append(slotElement);
    });
  }

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
  invScreen.append(inventoryContainer);
  if (options?.includeEquipment) {
    invScreen.append(inventoryEquipment);
  }
  resizeInventoryContainer();
  return invScreen;
}

function createSlot(
  item: Item,
  options?: { isEquipped?: boolean; slot?: string; buy?: boolean; sell?: boolean; craft?: boolean; material?: boolean }
) {
  const slot = document.createElement("div");
  slot.classList.add("inventory-slot");
  if (options?.material) {
    slot.classList.add("material");
    if (player.hasItem(item.id, item.amount)) {
      slot.classList.add("enough");
    } else {
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
    if (!options?.material) {
      if (options?.buy) {
        slot.onclick = (e) => {
          clickItem(item, {
            shift: e.shiftKey,
            pos: { x: e.clientX, y: e.clientY },
            buy: true,
          });
        };
      } else if (options?.sell) {
        slot.onclick = (e) => {
          clickItem(item, {
            shift: e.shiftKey,
            pos: { x: e.clientX, y: e.clientY },
            sell: true,
          });
        };
      } else if (options?.isEquipped) {
        slot.onclick = (e) => {
          clickItem(item, {
            shift: e.shiftKey,
            equipped: true,
            pos: { x: e.clientX, y: e.clientY },
          });
        };
      } else {
        slot.onclick = (e) => {
          clickItem(item, { shift: e.shiftKey, pos: { x: e.clientX, y: e.clientY }, craft: options?.craft });
        };
      }
    }
    const compare = item.compare(player.equipment[item?.slot ?? ""]);
    tooltip(slot, item.tooltip(), compare ? (compare as string) : undefined);
  } else if (options?.isEquipped) {
    const image = document.createElement("img");
    image.src = icons[options.slot || "placeholder"];
    image.style.opacity = "0.25";
    slot.append(image);
  }
  return slot;
}

function clickItem(
  item: Item,
  options?: {
    shift?: boolean;
    equipped?: boolean;
    pos?: { x: number; y: number };
    buy?: boolean;
    sell?: boolean;
    craft?: boolean;
  }
) {
  if (isInCombat() && !isPlayerTurn()) return;
  if (options?.shift && !options.buy && !options.sell && !isInCombat()) {
    if (item.type !== "potion" && item.type !== "material") {
      if (options?.equipped) {
        player.unequip(item.slot);
        createInventory();
      } else {
        player.equip(item as any, { removeFromInventory: true });
        createInventory();
      }
    }
  } else if (options?.shift && item.type === "potion" && isInCombat() && !options.buy && !options.sell) {
    player.drinkPotion(item);
    createInventory();
    if (pouchState.open) {
      closePouch();
    }
  } else if (options?.pos) {
    const buttons: any[] = [];
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
    } else if (options?.sell) {
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
    } else if (options?.equipped) {
      buttons.push({
        text: `${game.getLocalizedString("unequip_item")}`,
        action: () => {
          player.unequip(item.slot);
          createInventory();
        },
      });
    } else if (item.type !== "potion" && item.type !== "material") {
      if (!options?.craft) {
        buttons.push({
          text: `${game.getLocalizedString("equip_item")}`,
          action: () => {
            player.equip(item as any, { removeFromInventory: true });
            createInventory();
          },
        });
      } else if (options?.craft) {
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

function hoverEquipSlot(item: Item) {
  const slot = document.querySelector(`[data-item-slot=${item.slot}]`);
  if (slot) {
    slot.classList.add("hover");
  }
}

function removeHoverEquipSlot(item: Item) {
  const slot = document.querySelector(`[data-item-slot=${item.slot}]`);
  if (slot) {
    slot.classList.remove("hover");
  }
}

function createContextMenu(options: any[], pos: { x: number; y: number }) {
  contextMenu.innerHTML = "";
  setTimeout(() => {
    options.forEach((option: any) => {
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
