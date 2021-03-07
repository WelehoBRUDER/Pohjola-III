function openInventory(when = "lobby") {
  $("#inventoryWindow").style.marginLeft = "-464px";
  $("#inventoryWindow").style.left = "50%";
  $("#inventoryWindow").style.top = "48px";
  if (when == "combat") {
    if (global.isCombatPaused && player.stats.ap >= 99.9) {
      global.invOpen = !global.invOpen;
      $("#inventoryWindow").classList.toggle("hidden");
      createInventory("combat");
    }
  } else if (when == "lobby") {
    global.invOpen = !global.invOpen;
    $("#inventoryWindow").classList.toggle("hidden");
    createInventory();
  } else if (when == "store") {
    global.invOpen = !global.invOpen;
    $("#inventoryWindow").classList.toggle("hidden");
    createInventory("store")
  }
}

draggableElement($("#inventoryWindow"));
draggableElement($("#characterWindow"));
draggableElement($("#perkWindow"));

function createInventory(when = "lobby") {
  createCharacter(player);
  $(".itemsArea").textContent = "";
  $(".armorValues").textContent = "";
  $(".armorValues").append(textSyntax(`<f>20px<f><ff>Roboto<ff>
  <c>gray<c>Physical<c>white<c> Armor: ${player.stats.FphysicalArmor()}
  <c>cyan<c>Magical<c>white<c> Armor: ${player.stats.FmagicalArmor()}
  <c>lightgreen<c>Elemental<c>white<c> Armor: ${player.stats.FelementalArmor()}
  `))
  if (when == "combat") {
    for (const i in player.inventory) {
      let itm = player.inventory[i];
      if (itm.type != "consumable") continue;
      const item = createItem(itm);
      const container = create("div");
      item.addEventListener("click", e => itemMenu(e, i, options.sell_from_inv));
      container.append(item);
      $(".itemsArea").append(container);
    }
    for (let eq in player.equipment) {
      $(".equipmentSlot§" + eq).innerHTML = "";
      let item = player.equipment[eq];
      if (item?.id) {
        $(".equipmentSlot§" + eq).append(createItem(item));
      }
    }
  } else if (when == "lobby") {
    for (const i in player.inventory) {
      let itm = player.inventory[i];
      const item = createItem(itm);
      const container = create("div");
      if (itm.type == "equipment") {
        item.addEventListener("click", e => itemMenu(e, i, options.sell_from_inv));
      }
      container.append(item);
      $(".itemsArea").append(container);
    }
    for (let eq in player.equipment) {
      $(".equipmentSlot§" + eq).innerHTML = "";
      let item = player.equipment[eq];
      if (item?.id) {
        $(".equipmentSlot§" + eq).append(createItem(item));
      }
    }
  } else if (when == "store") {
    for (const i in player.inventory) {
      let itm = player.inventory[i];
      const item = createItem(itm, true);
      const container = create("div");
      item.addEventListener("click", e => itemMenu(e, i, options.sell_from_inv));
      container.append(item);
      $(".itemsArea").append(container);
    }
    for (let eq in player.equipment) {
      $(".equipmentSlot§" + eq).innerHTML = "";
      let item = player.equipment[eq];
      if (item?.id) {
        $(".equipmentSlot§" + eq).append(createItem(item, true));
      }
    }
  }
}

function itemMenu(e, index, options) {
  const item = player.inventory[index];
  if(!global.itemMenu) {
    $("#ItemUseMenu").classList.toggle("hidden");
    global.itemMenu = true;
  }  
  $("#ItemUseMenu").style.left = e.x + "px";
  $("#ItemUseMenu").style.top = e.y + "px";
  $("#ItemUseMenu").textContent = "";
  for(const [key, opt] of Object.entries(options)) {
    if(!eval(opt.show_if)) continue;
    const option = create("p");
    option.textContent = opt.title;
    option.id = opt.id;
    option.addEventListener("mouseup", eval(opt.onClick));
    $("#ItemUseMenu").append(option);
  }
  // PLACEHOLDER
  // if(global.inCombat) combatItem(index);
  // else equipItem(index);
}

function sellItem(index) {
  let item = player.inventory[index];
  useMultipleBox("item", item, "sell", index);
}

const options = {
  "sell_from_inv": {
    "sell": {
      id: "sell",
      show_if: "1>0",
      title: "Sell Item(s)",
      onClick: "e=>sellItem(index)"
    },
    "equip": {
      id: "equip",
      show_if: "player.inventory[index].type == 'equipment'",
      title: "Equip Item",
      onClick: "e=>equipItem(index)"
    }
  }
}

let useMultiple = {
  amount: 0,
  item: {},
  action: "",
  index: 0
}

function changeAmount(num) {
  useMultiple.amount += num;
  if(useMultiple.amount > useMultiple.item.amount) useMultiple.amount = useMultiple.item.amount;
  if(useMultiple.amount < 0) useMultiple.amount = 0;
  $("#useMultiple .amount").textContent = useMultiple.amount;
  if(useMultiple.action == "sell") $("#useMultiple .totalPrice").textContent = "¤" + Math.ceil(useMultiple.item.price * player.barterBonus()) * useMultiple.amount;
}

function useMultipleBox(type, object, action, index) {
  useMultiple.amount = 0;
  useMultiple.item = {};
  $("#useMultiple .title").textContent = "";
  if(global.itemMenu) {
    global.itemMenu = false;
    $("#ItemUseMenu").classList.toggle("hidden");

  }
  if(type == "item") {
    useMultiple.item = object;
    useMultiple.amount = 1;
    useMultiple.action = action;
    useMultiple.index = index;
    $("#useMultiple").classList.toggle("hidden");
    const title = `<bcss>line-height: 1.1<bcss><c>white<c><f>20px<f>Choose how many <c>yellow<c>${object.name}s<c>white<c> to ${action}.`;
    $("#useMultiple .title").append(textSyntax(title));
    $("#useMultiple .amount").textContent = useMultiple.amount;
    if(useMultiple.action == "sell") $("#useMultiple .totalPrice").textContent = "¤" + Math.ceil(useMultiple.item.price * player.barterBonus())
  }
}

function cancelSelection() {
  useMultiple.item = {};
  useMultiple.amount = 0;
  useMultiple.action = "";
  useMultiple.index = 0;
  $("#useMultiple").classList.toggle("hidden");
}

function confirmSelection() {
  if(useMultiple.action == "sell") {
    player.inventory[useMultiple.index].amount -= useMultiple.amount;
    player.gold += Math.ceil(useMultiple.item.price * player.barterBonus()) * useMultiple.amount;
    if(player.inventory[useMultiple.index].amount <= 0) player.inventory.splice(useMultiple.index, 1);
    cancelSelection();
    createInventory();
  }
}

function equipItem(index) {
  if(global.itemMenu) {
    global.itemMenu = false;
    $("#ItemUseMenu").classList.toggle("hidden");
  }
  let itm = player.inventory[index];
  if (itm.weaponType == "heavy") {
    unequip("weapon");
    unequip("shield");
    player.equipment.weapon = new Item(itm);
  }
  else if (itm.equipmentSlot == "shield" && player.equipment?.weapon?.weaponType == "heavy") {
    unequip("weapon");
    unequip("shield");
    player.equipment.shield = new Item(itm);

  }
  else {
    unequip(itm.equipmentSlot);
    player.equipment[itm.equipmentSlot] = new Item(itm);
  }
  player.inventory.splice(index, 1);
  createInventory();
}

function unequip(slot) {
  if (player.equipment[slot]?.id) player.inventory.push(new Item(player.equipment[slot]));
  player.equipment[slot] = {};
  createInventory();
}

function createItem(itm, playerInvStore=false) {
  const div = create("div");
  const img = create("img");
  img.src = itm.img;
  div.classList.add(itemTiers[itm.tier].class);
  div.append(img);
  if (itm.amount > 1) {
    const num = create("p");
    num.textContent = itm.amount;
    div.append(num);
  }
  if(!playerInvStore) addHoverBox(div, itemHover(itm), "");
  else addHoverBox(div, itemHover(itm, true), "");
  return div;
}

function combatItem(index) {
  if (!global.inCombat) return;
  let item = player.inventory[index];
  item.amount--;
  if (item.healAmount) player.stats.hp += item.healAmount;
  if (item.statusEffects) {
    for (let status of item.statusEffects) {
      if (noDuplicateStatus(player, status.effect)) player.statuses.push(new statusEffect({ ...statusEffects[status.effect], hasDamaged: 1 }));
      else player.statuses[player.statuses.findIndex(e => e.id == status.effect)].lastFor = statusEffects[status.effect].lastFor;
    }
  }
  if (item.amount <= 0) player.inventory.splice(index, 1);
  openInventory("combat");
  player.stats.ap = 0;
  global.isCombatPaused = false;
}