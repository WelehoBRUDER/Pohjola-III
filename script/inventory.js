function openInventory(when="lobby") {
  if(when == "combat") {
    if(global.isCombatPaused && player.stats.ap >= 99.9) {
      global.invOpen = !global.invOpen;
      $("#inventoryWindow").classList.toggle("hidden");
      createInventory("combat");
    }
  } else if(when == "lobby") {
    global.invOpen = !global.invOpen;
    $("#inventoryWindow").classList.toggle("hidden");
    createInventory();
  }
}

function createInventory(when="lobby") {
  $(".itemsArea").textContent = "";
  if(when == "combat") {
    for(const i in player.inventory) {
      let itm = player.inventory[i];
      if(itm.type != "consumable") continue;
      const item = createItem(itm);
      const container = create("div");
      item.addEventListener("click", e=>combatItem(i));
      container.append(item);
      $(".itemsArea").append(container);
    }
    for(let eq in player.equipment) {
      $(".equipmentSlot§" + eq).innerHTML = "";
      let item = player.equipment[eq];
      if(item?.id) { 
        $(".equipmentSlot§" + eq).append(createItem(item));
      }
    }
  } else if(when == "lobby") {
    for(const i in player.inventory) {
      let itm = player.inventory[i];
      const item = createItem(itm);
      const container = create("div");
      item.addEventListener("click", e=>combatItem(i));
      container.append(item);
      $(".itemsArea").append(container);
    }
    for(let eq in player.equipment) {
      $(".equipmentSlot§" + eq).innerHTML = "";
      let item = player.equipment[eq];
      if(item?.id) { 
        $(".equipmentSlot§" + eq).append(createItem(item));
      }
    }
  }
}

function createItem(itm) {
  const div = create("div");
  const img = create("img");
  img.src = itm.img;
  div.classList.add(itemTiers[itm.tier].class);
  div.append(img);
  if(itm.amount > 1) {
    const num = create("p");
    num.textContent = itm.amount;
    div.append(num);
  }
  addHoverBox(div, itemHover(itm), "");
  return div;
}

function combatItem(index) {
  let item = player.inventory[index];
  item.amount--;
  if(item.healAmount) player.stats.hp += item.healAmount;
  if(item.statusEffects) {
    for(let status of item.statusEffects) {
      if(noDuplicateStatus(player, status.effect)) player.statuses.push(new statusEffect({...statusEffects[status.effect], hasDamaged: 1}));
      else player.statuses[player.statuses.findIndex(e=>e.id == status.effect)].lastFor = statusEffects[status.effect].lastFor;
    }
  }
  if(item.amount <= 0) player.inventory.splice(index, 1);
  openInventory("combat");
  player.stats.ap = 0;
  global.isCombatPaused = false;
}