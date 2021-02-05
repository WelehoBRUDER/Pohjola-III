function openInventory(when="lobby") {
  if(when == "combat") {
    if(global.isCombatPaused && player.stats.ap >= 99.9) {
      $("#inventoryWindow").classList.toggle("hidden");
      createInventory("combat");
    }
  }
}

function createInventory(when="lobby") {
  $(".itemsArea").textContent = "";
  if(when == "combat") {
    for(let i=0; i<player.inventory.length; i++) {
      let itm = player.inventory[i];
      if(itm.type != "consumable") continue;
      const item = createItem(itm);
      item.addEventListener("click", e=>combatItem(i));
      $(".itemsArea").append(item);
    }
  }
}

function createItem(itm) {
  const div = create("div");
  const img = create("img");
  img.src = itm.img;
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
    }
  }
  if(item.amount <= 0) player.inventory.splice(index, 1);
  openInventory("combat");
  player.stats.ap = 0;
  global.isCombatPaused = false;
}