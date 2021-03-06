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
  loot.sort(sortingByPrice);
  $(".goldNumber").textContent = totalGold + " gold";
  genLoot();
}

function genLoot() {
  $(".lootArea").textContent = "";
  for (const i in loot) {
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

function openChar() {
  $("#characterWindow").style.marginLeft = "-464px";
  $("#characterWindow").style.left = "50%";
  $("#characterWindow").style.top = "48px";
  global.charOpen = !global.charOpen;
  $("#characterWindow").classList.toggle("hidden");
  createCharacter(player);
}

function openPerk() {
  $("#perkWindow").style.marginLeft = "-664px";
  $("#perkWindow").style.left = "50%";
  $("#perkWindow").style.top = "48px";
  global.perkOpen = !global.perkOpen;
  $("#perkWindow").classList.toggle("hidden");
  createPerks();
}

function createCharacter(char) {
  const bg = $("#characterWindow .contentArea");
  bg.textContent = "";
  const portrait = create("img");
  portrait.src = char.charClass().class.img;
  portrait.classList.add("portrait");
  portrait.classList.add(char.charClass().id);
  const name = create("div");
  name.classList.add("name");
  name.append(textSyntax(`<ff>Roboto<ff><c>white<c>\t<f>36px<f>${char.name}\n\t<f>24px<f>Lvl ${char.level.lvl} ${char.charClass().name}`));
  const xpBar = create("div");
  const barFill = create("div");
  const barNum = create("p");
  barNum.classList.add("barNum");
  xpBar.classList.add("xpBar");
  barFill.classList.add("barFill");
  barFill.style.width = (char.level.xp / char.level.xpNeed) * 100 + "%";
  barNum.textContent = char.level.xp + "/" + char.level.xpNeed + " EXP";
  xpBar.append(barFill, barNum);
  const hpBar = create("div");
  const mpBar = create("div");
  const hpFill = create("div");
  const mpFill = create("div");
  const hpNum = create("p");
  const mpNum = create("p");
  hpBar.classList.add("hpBar");
  mpBar.classList.add("mpBar");
  hpNum.textContent = char.stats.hp + "/" + char.stats.FhpMax() + " HP";
  mpNum.textContent = char.stats.mp + "/" + char.stats.FmpMax() + " MP";
  hpFill.style.width = char.stats.hp / char.stats.FhpMax() * 100 + "%";
  mpFill.style.width = char.stats.mp / char.stats.FmpMax() * 100 + "%";
  hpBar.append(hpFill, hpNum);
  mpBar.append(mpFill, mpNum);
  const baseStats = create("div");
  baseStats.classList.add("baseStats");
  let text = "<bcss>line-height: 1; text-shadow: 0px 0px 2px black;<bcss><ff>RobotoBold<ff><f>28px<f><c>silver<c>Stats <f>18px<f><c>white<c><ff>Roboto<ff>";
  for(let stat in char.stats) {
    if(!stat.startsWith("F")) continue;
    if(stat.includes("Max") || stat.includes("Armor")) continue;
    let value = player.stats[stat]();
    let txt = loc[stat.substring(1)];
    if(!stat.toLowerCase().includes("max") && !stat.toLowerCase().includes("armor")) {
      if(player.level.statPoints > 0 && !stat.toLowerCase().includes("crit")) {
        text += `\n§<f>18px<f><c>white<c><ff>Roboto<ff>• ${txt}: <c>yellow<c>${value} §<ff>Roboto<ff><f>18px<f><c>green<c><v>selectedSpan.addEventListener("click", (e)=>{upStat("${stat.substring(1)}", e)})<v>[+]§`;
      } else text += `\n§<f>18px<f><c>white<c><ff>Roboto<ff>• ${txt}: <c>yellow<c>${value}${stat.toLowerCase().includes("crit") ? "%" : ""}`;
    }
    else text += `\n§<f>18px<f><c>white<c><ff>Roboto<ff>• ${txt}: <c>yellow<c>${value}`;
  }
  baseStats.append(textSyntax(text));
  const baseSkills = create("div");
  baseSkills.classList.add("baseSkills");
  let text2 = "<bcss>line-height: 1; text-shadow: 0px 0px 2px black;<bcss><ff>RobotoBold<ff><f>28px<f><c>silver<c>Skills <f>18px<f><c>white<c><ff>Roboto<ff>";
  for(let stat in char.skills) {
    if(!stat.startsWith("F")) continue;
    let value = player.skills[stat]();
    let txt = loc[stat.substring(1)];
      if(player.level.skillPoints > 0) {
        text2 += `\n§<f>18px<f><c>white<c><ff>Roboto<ff>• ${txt}: <c>yellow<c>${value} §<ff>Roboto<ff><f>18px<f><c>green<c><v>selectedSpan.addEventListener("click", (e)=>{upSkill("${stat.substring(1)}", e)})<v>[+]§`;
      } else text2 += `\n§<f>18px<f><c>white<c><ff>Roboto<ff>• ${txt}: <c>yellow<c>${value}`;
    }
  baseSkills.append(textSyntax(text2));
  bg.append(portrait, name, xpBar, hpBar, mpBar, baseStats, baseSkills);
}

function upStat(stat, e) {
  if(e.shiftKey) {
    for(let i = 5; i > 0; i--) {
      if(player.level.statPoints > 0) {
        player.level.statPoints--;
        player.stats[stat]++;
      }
    }
  } else if(e.ctrlKey) {
    for(let i = 25; i > 0; i--) {
      if(player.level.statPoints > 0) {
        player.level.statPoints--;
        player.stats[stat]++;
      }
    }
  } else {
    if(player.level.statPoints > 0) {
      player.level.statPoints--;
      player.stats[stat]++;
    }
  }
  createCharacter(player);
}

function upSkill(skill, e) {
  if(e.shiftKey) {
    for(let i = 5; i > 0; i--) {
      if(player.level.skillPoints > 0) {
        player.level.skillPoints--;
        player.skills[skill]++;
      }
    }
  } else if(e.ctrlKey) {
    for(let i = 25; i > 0; i--) {
      if(player.level.skillPoints > 0) {
        player.level.skillPoints--;
        player.skills[skill]++;
      }
    }
  } else {
    if(player.level.skillPoints > 0) {
      player.level.skillPoints--;
      player.skills[skill]++;
    }
  }
  createCharacter(player);
}