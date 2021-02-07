let loot = [];
let selectedLoot = [];
let totalGold = 0;

function toLobbyLoot() {
  $(".combatScreen").classList.toggle("hidden");
  let bg = $(".battleEndScreen");
  let con = bg.querySelector(".battleEndContainer")
  bg.classList.add("invisible");
  setTimeout(a => con.classList.add("scaled"), 350);
  openLootWindow();
  for (let enemy of enemiesVanquished) {
    let table = lootTables[enemy.lootTable];
    for (let item of table) {
      if (Math.random() >= (1 - item.chance / 100)) {
        if (item.item == "gold") {
          totalGold += random(item.amount[1], item.amount[0]);
          continue;
        }
        let itm = new Item(items[item.item]);
        if (item.amount) {
          itm.amount = random(item.amount[1], item.amount[0]);
        }
        itm.selected = false;
        let found = false;
        for (let lot of loot) {
          if (lot.id == itm.id && itm.type != "equipment") {
            lot.amount += itm.amount;
            found = true;
          }
        }
        if (!found) loot.push(itm);
      }
    }
  }
  $(".goldNumber").textContent = totalGold + " gold";
  genLoot();
}

function genLoot() {
  $(".lootArea").textContent = "";
  for (let i = 0; i < loot.length; i++) {
    let itm = loot[i];
    const container = create("div");
    const item = createItem(itm);
    container.append(item);
    container.addEventListener("click", a => addLoot(i));
    if (itm.selected) container.classList.add("selected");
    $(".lootArea").append(container);
  }
}

function closeLootWindow() {
  $(".lootWindow").classList.add("hidden");
  for (let item of loot) {
    if (item.selected) {
      let found = false;
      for (let itm of player.inventory) {
        if (itm.id == item.id && item.type != "equipment") {
          itm.amount += item.amount;
          found = true;
        }
      }
      if (!found) {
        player.inventory.push(item);
      }
    }
  }
  player.gold += totalGold;
  totalGold = 0;
  textBoxRemove();
  loot = [];
}

function openLootWindow() {
  $(".lootWindow").classList.remove("hidden");
  loot = [];
}

function addLoot(index) {
  loot[index].selected = !loot[index].selected;
  genLoot();
}