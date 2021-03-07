let combatTimer = setInterval(Update, 1000 / 60);
let enemiesVanquished = [];

function Update() {
  // Updates the combat 60 times per second.
  // All code within this function will be executed.

  // Player bars & numbers
  if (player.stats.hp < 0) {
    player.stats.hp = 0;
    global.isCombatPaused = true;
    endScreenFadeIn("defeat");
  }
  if (player.stats.ap <= 99.99 && !global.isCombatPaused) player.stats.ap += player.actionFill() > 2.66 ? 2.66 : player.actionFill();
  $(".playerHpNum").textContent = player.stats.hp + " / " + player.stats.FhpMax();
  $(".playerHpFill").style.width = (player.stats.hp / player.stats.FhpMax()) * 100 + '%';
  $(".playerHpLate").style.width = (player.stats.hp / player.stats.FhpMax()) * 100 + '%';
  $(".playerMpNum").textContent = player.stats.mp + " / " + player.stats.FmpMax();
  $(".playerMpFill").style.width = (player.stats.mp / player.stats.FmpMax()) * 100 + '%';
  if (+$(".playerMpFill").style.width.substring(0, $(".playerMpFill").style.width.length - 1) < 0) $(".playerMpFill").style.width = "0%";
  $(".playerActionNum").textContent = Math.floor(player.stats.ap) + "%";
  $(".playerActionFill").style.width = player.stats.ap + '%';
  if (global.isCombatPaused && player.stats.ap <= 99.99) $(".playerActionFill").style.filter = "grayscale(1)";
  else if (player.stats.ap >= 99.99) $(".playerActionFill").style.filter = "grayscale(0)";
  else $(".playerActionFill").style.filter = "hue-rotate(-45deg)";
  player.stats.hp > player.stats.FhpMax() ? player.stats.hp = player.stats.FhpMax() : player.stats.hp = Math.floor(player.stats.hp);
  player.stats.mp > player.stats.FmpMax() ? player.stats.mp = player.stats.FmpMax() : player.stats.mp = Math.floor(player.stats.mp);
  if (player.stats.ap > 99.99 && !global.isCombatPaused) {
    if (global.settings.turn_based_combat) global.isCombatPaused = true;
  };
  if (!global.isCombatPaused) {
    for (let i = 0; i < player.statuses.length; i++) {
      let stat = player.statuses[i];
      if (!stat.permanent) stat.lastFor -= 1 / 60;
      if (stat.hasDamaged) stat.hasDamaged -= 1 / 60;
      if (!stat.permanent && stat.lastFor <= 0) player.statuses.splice(i, 1);
      player.updateStat(i);
    }
  }
  for (let ability in player.abilities) {
    if (global.isCombatPaused) return;
    let abi = player.abilities[ability];
    if (abi.onCooldown > 0) {
      let container = $(".playerAbilities .abilityContainer");
      let slot = container.querySelector(".abilitySlot" + ability.substring(ability.length - 1));
      let number = slot.querySelector(".cooldown");
      abi.onCooldown -= 1 / 60;
      if (abi.onCooldown <= 0) {
        abi.onCooldown = 0;
        number.remove();
      } else {
        if (number) {
          number.textContent = Math.ceil(abi.onCooldown) + "s";
        } else {
          let cd = create("p");
          cd.textContent = Math.ceil(abi.onCooldown) + "s";
          cd.classList.add("cooldown");
          slot.append(cd);
        }
      }
    }
    if (abi.mpCost > player.stats.mp || abi.onCooldown > 0) {
      let container = $(".playerAbilities .abilityContainer");
      let slot = container.querySelector(".abilitySlot" + ability.substring(ability.length - 1));
      let dark = slot.querySelector(".darkened");
      if (dark) continue;
      else {
        let dk = create("div");
        dk.classList.add("darkened");
        slot.append(dk);
      }
    } else {
      let container = $(".playerAbilities .abilityContainer");
      let slot = container.querySelector(".abilitySlot" + ability.substring(ability.length - 1));
      let dark = slot.querySelector(".darkened");
      if (dark) dark.remove();
    }
  }


  // Enemy bars & numbers
  for (let i = 0; i < enemiesCombat.length; i++) {
    let enemy = enemiesCombat[i];
    let frame = $("#" + enemy.id + "§" + i);
    if (enemy.dead) continue;
    if (enemy.stats.ap <= 99.99 && !global.isCombatPaused) enemy.stats.ap += enemy.actionFill() > 1.6 ? 1.6 : enemy.actionFill();
    if (enemy.stats.ap > 99.99 && !global.isCombatPaused) {
      if (global.settings.turn_based_combat) global.isCombatPaused = true;
      enemyTurn(enemy);
    };
    if (enemy.stats.hp <= 0) {
      enemy.kill();
      continue;
    }
    if (!global.isCombatPaused) enemy.abilities.forEach(a => a.onCooldown > 0 ? a.onCooldown -= 1 / 60 : a.onCooldown = 0);
    if (global.isCombatPaused && enemy.stats.ap <= 99.99) frame.querySelector(".enemyActionFill").style.filter = "grayscale(1)";
    else if (enemy.stats.ap >= 99.99) frame.querySelector(".enemyActionFill").style.filter = "grayscale(0)";
    else frame.querySelector(".enemyActionFill").style.filter = "hue-rotate(-45deg)";
    enemy.stats.hp > enemy.stats.FhpMax() ? enemy.stats.hp = enemy.stats.FhpMax() : enemy.stats.hp = Math.floor(enemy.stats.hp);
    enemy.stats.mp > enemy.stats.FmpMax() ? enemy.stats.mp = enemy.stats.FmpMax() : enemy.stats.mp = Math.floor(enemy.stats.mp);
    frame.querySelector(".enemyHpNumber").textContent = enemy.stats.hp + " / " + enemy.stats.FhpMax();
    frame.querySelector(".enemyHpFill").style.width = (enemy.stats.hp / enemy.stats.FhpMax()) * 100 + '%';
    frame.querySelector(".enemyHpLate").style.width = (enemy.stats.hp / enemy.stats.FhpMax()) * 100 + '%';
    frame.querySelector(".enemyMpNumber").textContent = enemy.stats.mp + " / " + enemy.stats.FmpMax();
    frame.querySelector(".enemyMpFill").style.width = (enemy.stats.mp / enemy.stats.FmpMax()) * 100 + '%';
    frame.querySelector(".enemyMpLate").style.width = (enemy.stats.mp / enemy.stats.FmpMax()) * 100 + '%';
    frame.querySelector(".enemyActionNumber").textContent = Math.floor(enemy.stats.ap) + "%";
    frame.querySelector(".enemyActionFill").style.width = enemy.stats.ap + '%';
    if (!global.isCombatPaused) {
      for (const i in enemy.statuses) {
        let stat = enemy.statuses[i];
        if (!stat.permanent) stat.lastFor -= 1 / 60;
        if (stat.hasDamaged) stat.hasDamaged -= 1 / 60;
        if (!stat.permanent && stat.lastFor <= 0) enemy.statuses.splice(i, 1);
        enemy.updateStat(i);
      }
    }
  }
}

let enemiesCombat = [];

function startCombatDebug() {
  hotkey({key: "Escape"});
  enemiesCombat = [];
  enemiesCombat.push(new EnemyClass({ ...Enemies.skeleton_warrior, index: 0, level: { lvl: 5 } }));
  enemiesCombat.push(new EnemyClass({ ...Enemies.skeleton_warrior, index: 1, level: { lvl: 5 } }));
  enemiesCombat.push(new EnemyClass({...Enemies.skeleton_archer, index: 2, level: {lvl: 5}}));
  //enemiesCombat.push(new EnemyClass({...Enemies.skeleton_knight, index: 3, level: {lvl: 1}}));
  drawEnemies(enemiesCombat);
  slotAbilities();
  global.inCombat = true;
  combatTimer = setInterval(Update, 1000 / 60);
  enemiesCombat.forEach(e => e.init());
}

function drawEnemies(array) {
  $(".enemiesFlex").textContent = "";
  array.forEach(e => {
    if (!e.dead) {
      const enemyFrame = create("div");
      enemyFrame.classList.add("enemyFrame");
      enemyFrame.id = e.id + "§" + e.index;
      const idle = create("img");
      const attack_start = create("img");
      const attack_finish = create("img");
      const death = create("img");
      idle.classList.add("idle");
      attack_start.classList.add("attack_start");
      attack_finish.classList.add("attack_finish");
      death.classList.add("death");
      idle.src = e.sprites + "/idle.png";
      attack_start.src = e.sprites + "/attack_start.png";
      attack_finish.src = e.sprites + "/attack_finish.png";
      death.src = e.sprites + "/death.png";
      // HP & MP BARS
      const hpbar = create("div");
      const mpbar = create("div");
      hpbar.classList.add("enemyHpBar");
      mpbar.classList.add("enemyMpBar");
      const hpbarFill = create("div");
      const mpbarFill = create("div");
      hpbarFill.classList.add("enemyHpFill");
      mpbarFill.classList.add("enemyMpFill");
      const hpbarLate = create("div");
      const mpbarLate = create("div");
      hpbarLate.classList.add("enemyHpLate");
      mpbarLate.classList.add("enemyMpLate");
      const hpNum = create("p");
      const mpNum = create("p");
      hpNum.classList.add("enemyHpNumber");
      mpNum.classList.add("enemyMpNumber");
      hpbar.append(hpbarLate, hpbarFill, hpNum);
      mpbar.append(mpbarLate, mpbarFill, mpNum);
      // NAME & LVL
      const name = create("p");
      name.textContent = e.name + " | LVL " + e.level.lvl;
      name.classList.add("enemyName");
      // ACTION BAR
      const actionBar = create("div");
      const actionFill = create("div");
      const actionNumber = create("p");
      actionBar.classList.add("enemyActionBar");
      actionFill.classList.add("enemyActionFill");
      actionNumber.classList.add("enemyActionNumber");
      actionBar.append(actionFill, actionNumber);
      // FIX DROPPING STRING
      const dropString = create("div");
      dropString.classList.add("enemyDroppingString");
      // STATUS EFFECTS APPEAR HERE
      const statusArea = create("div");
      statusArea.classList.add("enemyStatusArea");
      enemyFrame.onclick = a => targetEnemy(e.index);
      enemyFrame.append(idle, attack_start, attack_finish, death, hpbar, mpbar, name, actionBar, dropString, statusArea);
      // ENEMY HOVERS
      const health = `<bcss>line-height: 1.25<bcss><c>red<c> <f>24px<f> <v>enemiesCombat[${e.index}].name<v>'s Health§
      <v>enemiesCombat[${e.index}].name<v>'s health represents
      the amount of hits it can take
      before being§ <c>crimson<c>defeated. §
      - Maximum health is §<c>red<c><v>enemiesCombat[${e.index}].stats.FhpMax()<v>hp §
      - Current health is §<c>red<c><v>enemiesCombat[${e.index}].stats.hp<v>hp §
      - Remaining health is §<c>red<c><v>((enemiesCombat[${e.index}].stats.hp/enemiesCombat[${e.index}].stats.FhpMax())*100).toFixed(1)<v>%`;
      addHoverBox(hpbar, health, "");
      const mana = `<bcss>line-height: 1.25<bcss><c>#4287f5<c> <f>24px<f> <v>enemiesCombat[${e.index}].name<v>'s Mana§
      <v>enemiesCombat[${e.index}].name<v>'s mana represents
      how many abilities that require it,
      the character can use before running dry.
      - Maximum mana is §<c>#4287f5<c><v>enemiesCombat[${e.index}].stats.FmpMax()<v>mp §
      - Current mana is §<c>#4287f5<c><v>enemiesCombat[${e.index}].stats.mp<v>mp §
      - Remaining mana is §<c>#4287f5<c><v>((enemiesCombat[${e.index}].stats.mp/enemiesCombat[${e.index}].stats.FmpMax())*100).toFixed(1)<v>%`;
      addHoverBox(mpbar, mana, "");
      const action = `<bcss>line-height: 1.25<bcss><c>#59e04a<c> <f>24px<f> <v>enemiesCombat[${e.index}].name<v>'s Action§
      <v>enemiesCombat[${e.index}].name<v>'s action represents
      how quickly it gets its turn. Once the bar
      is filled, its turn will begin.
      - Current fillrate is §<c>#59e04a<c><v>(enemiesCombat[${e.index}].actionFill()*60).toFixed(1)<v>%§/s`;
      addHoverBox(actionBar, action, "");
      $(".enemiesFlex").append(enemyFrame);
      e.idle();
    }
  })
}

function createDroppingString(string, start, text_class) {
  let text = create("p");
  text.textContent = string;
  text.classList.add(text_class);
  text.classList.add("dropping");
  text.style.transition = "1.4s";
  text.style.left = (start.getBoundingClientRect().left + random(400, 200)) + "px";
  text.style.top = (start.getBoundingClientRect().top - random(150, 30)) + "px";
  text.style.fontSize = random(84, 61) + "px";
  setTimeout(flyRandomly, 25);
  const currentLeft = +text.style.left.substring(0, text.style.left.length - 2);
  function flyRandomly() {
    text.style.left = (currentLeft + random(200, -200)) + "px";
  }
  $(".combatScreen").append(text);
  setTimeout(e => text.remove(), 1800);
}

function hasStatus(status, char) {
  for(let stat of char.statuses) {
    if(stat.id == status.id) return true;
  }
  return false;
}

function enemyTurn(enemy) {
  let ability = enemy.decideMove();
  if (ability == "heal") {
    for (let i = 0; i < enemy.inventory.length; i++) {
      let itm = enemy.inventory[i];
      if (itm.healsUser && itm.amount > 0) {
        itm.amount--;
        for (let effect of itm.statusEffects) {
          enemy.statuses.push(new statusEffect(statusEffects[effect.effect]));
        }
        if (itm.healAmount) {
          enemy.stats.hp += itm.healAmount;
          createDroppingString(itm.healAmount, $(enemy.id + "§" + enemy.index), "health");
        }
        if (itm.amount <= 0) {
          enemy.inventory.splice(i, 1);
        }
      }
      enemy.selfBuffAnimation();
      setTimeout(e => { enemy.stats.ap = 0; global.isCombatPaused = false }, 1050);
    }
  }
  else if (ability.id == "regular_attack") {
    let dmg = enemy.regularAttack();
    if (dmg.num <= 0) dmg.num = 1;
    enemy.attackAnimation(dmg.num, dmg.blocked, dmg.dodged, dmg.crit);
    setTimeout(e => { enemy.stats.ap = 0; global.isCombatPaused = false }, 1050);
  } else if (!ability.doesNotUseWeapon) {
    let dmg = enemy.regularAttack();
    dmg.num = Math.round(dmg.num * ability.powerMultiplier);
    if (dmg.num <= 0) dmg.num = 1;
    enemy.attackAnimation(dmg.num, dmg.blocked, dmg.dodged, dmg.crit);
    ability.onCooldown = ability.cooldown;
    enemy.stats.mp -= ability.mpCost;
    for (let stat of ability.status_effects) {
      if (dmg.blocked || dmg.dodged) break;
      setTimeout(s => {
        if (noDuplicateStatus(player, stat.status)) player.statuses.push(new statusEffect({ ...statusEffects[stat.status], hasDamaged: 1 }));
      }, 800);
    };
    setTimeout(e => { enemy.stats.ap = 0; global.isCombatPaused = false }, 1050);
  }
}

function togetherWeCanKill(index) {
  let playerHP = player.stats.hp;
  for (let i = index; i < enemiesCombat.length; i++) {
    let ability = enemiesCombat[i].strongestAttack();
    console.log(ability);
    let dmg = Math.round(enemiesCombat[i].regularAttack().num * ability.powerMultiplier);
    playerHP -= dmg;
  }
  return !(playerHP > 0);
}

function noDuplicateStatus(char, status) {
  for (let stat of char.statuses) {
    if (stat.id == status) return false;
  } return true;
}

function statusSyntax(status, fontSize = 14) {
  let text = "";
  if (status.damageOT > 0) text += `\t<f>${fontSize}px<f>HP §<f>${fontSize}px<f><c>red<c>▼ down§<f>${fontSize}px<f> by ${status.damageOT} every second\n`;
  else if (status.damageOT < 0) text += `\t<f>${fontSize}px<f>HP §<f>${fontSize}px<f><c>green<c>▲ up§<f>${fontSize}px<f> by ${Math.abs(status.damageOT)} every second\n`;
  for (let effect in status.effects) {
    let stat = effect.substring(0, effect.length - 1);
    const perc = effect.substring(effect.length - 1);
    switch (stat) {
      case "actionFill":
        stat = "Action fillrate";
        break;
      case "str":
        stat = "Strength";
        break;
      case "agi":
        stat = "Agility";
        break;
      case "vit":
        stat = "Vitality";
        break;
      case "int":
        stat = "Intelligence";
        break;
      case "wis":
        stat = "Wisdom";
        break;
      case "elementalDamage":
        stat = "Elemental damage";
        break;
      case "physicalDamage":
        stat = "Physical damage";
        break;
      case "magicalDamage":
        stat = "Magical damage";
        break;
      case "elementalArmor":
        stat = "Elemental armor";
        break;
      case "physicalArmor":
        stat = "Physical armor";
        break;
      case "magicalArmor":
        stat = "Magical armor";
        break;
      case "armorer":
        stat = "Armorer skill";
        break;
      case "shield":
        stat = "Shield skill";
        break;
      case "light_weapons":
        stat = "Light Weapons skill";
        break;
      case "heavy_weapons":
        stat = "Heavy Weapons skill";
        break;
      case "dodge":
        stat = "Dodge skill";
        break;
      case "blockChance":
        stat = "Block chance";
        break;
      case "defense":
        stat = "Defense";
        break;
      case "attack":
        stat = "Attack";
        break;
      case "hp": 
        stat = "Max HP";
        break;
      case "mp":
        stat = "Max MP";
        break;
      case "critChance":
        stat = "Crit Chance";
        break;
      case "critDmg":
        stat = "Crit Damage";
        break;
    }
    if (status.effects?.[effect] > 0 && perc == "V") text += `\t<f>${fontSize}px<f>${stat} §<f>${fontSize}px<f><c>green<c>▲ up§<f>${fontSize}px<f> by ${status.effects[effect]}${stat.includes("Crit") ? "%" : ""}\n`;
    else if (status.effects?.[effect] > 0 && perc == "P") text += `\t<f>${fontSize}px<f>${stat} §<f>${fontSize}px<f><c>green<c>▲ up§<f>${fontSize}px<f> by ${Math.floor(status.effects[effect])}%\n`;
    else if (status.effects?.[effect] < 0 && perc == "V") text += `\t<f>${fontSize}px<f>${stat} §<f>${fontSize}px<f><c>red<c>▼ down§<f>${fontSize}px<f> by ${Math.abs(status.effects[effect])}${stat.includes("Crit") ? "%" : ""}\n`;
    else if (status.effects?.[effect] < 0 && perc == "P") text += `\t<f>${fontSize}px<f>${stat} §<f>${fontSize}px<f><c>red<c>▼ down§<f>${fontSize}px<f> by ${Math.abs(Math.floor(status.effects[effect]))}%\n`;
  }
  return text;
}

document.addEventListener("keydown", hotkey);

function regularAttack() {
  if (global.isCombatPaused && player.stats.ap >= 100) {
    global.targeting = true;
    enemiesCombat.forEach(e => {
      if (!e.dead) {
        let bg = $("#" + e.id + "§" + e.index);
        global.ability = "regular";
        removeSelection();
        $(".regularAttack").classList.add("selected");
        bg.classList.add("canBeTargeted");
      }
    });
    if (Only1Enemy()) aliveEnemy().index;
  }
}

function removeSelection() {
  let selected = document.querySelectorAll(".selected");
  if (selected) Array.from(selected).forEach(e => e.classList.remove("selected"));
}

function Only1Enemy() {
  let alive = enemiesCombat.length;
  enemiesCombat.forEach(e => {
    if (e.dead) alive--;
  });
  return alive == 1 ? true : false;
}

function targetEnemy(index) {
  let enemy = enemiesCombat[index];
  let enemyFrame = $(("#" + enemy.id + "§" + enemy.index) + " .enemyDroppingString");
  if (!global.isCombatPaused || !global.targeting) return;
  if (global.ability == "regular") {
    let dmg = player.regularAttack(enemy);
    if (!dmg.blocked && !dmg.dodged) createDroppingString(dmg.num, enemyFrame, "damage");
    else if (dmg.blocked && !dmg.dodged) createDroppingString("🛡" + dmg.num, enemyFrame, "damage");
    else if (!dmg.blocked && dmg.dodged) createDroppingString("MISS", enemyFrame, "neutral");
    if (!dmg.dodged) enemy.stats.hp -= dmg.num;
    if (enemy.stats.hp <= 0) enemy.kill();
    if (dmg.crit > 1) createDroppingString("CRIT!", enemyFrame, "crit");
    player.stats.ap = 0;
    global.targeting = false;
    global.targetingSelf = false;
    global.ability = "";
    removeSelection();
    enemiesCombat.forEach(e => {
      if (!e.dead) {
        let bg = $("#" + e.id + "§" + e.index);
        global.ability = "";
        bg.classList.remove("canBeTargeted");
      }
    })
    if (!dmg.dodged) enemy.hurtAnimation();
    setTimeout(a => {
      global.isCombatPaused = false;
    }, 300)
  } else {
    let dmg;
    if (global.ability.baseDamages) dmg = player.spellAttack(enemy, global.ability);
    else dmg = player.regularAttack(enemy);
    dmg.num = Math.round(dmg.num * (global.ability.powerMultiplier || 1));
    if (!dmg.blocked && !dmg.dodged) createDroppingString(dmg.num, enemyFrame, "damage");
    else if (dmg.blocked && !dmg.dodged) createDroppingString("🛡" + dmg.num, enemyFrame, "damage");
    else if (!dmg.blocked && dmg.dodged) createDroppingString("MISS", enemyFrame, "neutral");
    if (dmg.crit > 1) createDroppingString("CRIT!", enemyFrame, "crit");
    if (!dmg.dodged) enemy.stats.hp -= dmg.num;
    if (enemy.stats.hp <= 0) enemy.kill();
    if (global.ability.mpCost) player.stats.mp -= global.ability.mpCost;
    if (global.ability.hpCost) player.stats.hp -= global.ability.hpCost;
    global.ability.onCooldown = global.ability.cooldown;
    if (global.ability.status_effects) {
      for (let stat of global.ability.status_effects) {
        if (dmg.blocked || dmg.dodged) break;
        if (noDuplicateStatus(enemy, stat.status)) enemy.statuses.push(new statusEffect({ ...statusEffects[stat.status], hasDamaged: 1 }));
      };
    }
    player.stats.ap = 0;
    global.targeting = false;
    global.targetingSelf = false;
    global.ability = "";
    removeSelection();
    enemiesCombat.forEach(e => {
      if (!e.dead) {
        let bg = $("#" + e.id + "§" + e.index);
        global.ability = "";
        bg.classList.remove("canBeTargeted");
      }
    })
    if (!dmg.dodged) enemy.hurtAnimation();
    setTimeout(a => {
      global.isCombatPaused = false;
    }, 300)
  }
}

function slotAbilities() {
  let container = $(".playerAbilities .abilityContainer");
  $(".abilitySlot1").textContent = "";
  $(".abilitySlot2").textContent = "";
  $(".abilitySlot3").textContent = "";
  $(".abilitySlot4").textContent = "";
  $(".abilitySlot5").textContent = "";
  for (let ability in player.abilities) {
    let abi = player.abilities[ability];
    if (abi?.id) {
      $(".abilitySlot" + ability.substring(ability.length - 1)).append(createAbilitySlot(abi));
    }
  }
}

function factorial(num) {
  let total = "";
  if(num <= 0) return 0;
  for(let i = num; i>0; i--) {
   if(i > 1) total += i + " * ";
   else total += i;
  }
  return `${num}'s factorial is: ${total} = ${eval(total)}`;
}

function playerUseAbility(index) {
  let ability = player.abilities["slot" + index];
  if (ability?.id) {
    if (ability.requiresShield && !player.equipment.shield?.id) return;
    if (ability.mpCost > player.stats.mp) return;
    if (ability.onCooldown > 0) return;
    if (global.isCombatPaused && player.stats.ap >= 100) {
      removeSelection();
      $(".abilitySlot" + index).classList.add("selected");
      if (ability.type == "buff") {
        global.targetingSelf = true;
        global.ability = ability;
      }
      else {
        global.targeting = true;
        enemiesCombat.forEach(e => {
          if (!e.dead) {
            let bg = $("#" + e.id + "§" + e.index);
            global.ability = ability;
            bg.classList.add("canBeTargeted");
          }
        });
        if (Only1Enemy()) aliveEnemy().index;
      }
    }
  }
}

function aliveEnemy() {
  for (let enemy of enemiesCombat) { if (!enemy.dead) return enemy };
}

function createAbilitySlot(abi) {
  const div = create("div");
  const img = create("img");
  div.classList.add("charAbility");
  img.src = abi.img;
  div.append(img);
  if (abi.requiresShield && !player.equipment.shield?.id) {
    const disabled = create("span");
    disabled.textContent = "X";
    div.append(disabled);
  }
  addHoverBox(div, abilityHover(abi), "");
  return div;
}

function endScreenFadeIn(condition) {
  let bg = $(".battleEndScreen");
  let con = bg.querySelector(".battleEndContainer")
  clearInterval(combatTimer);
  if (bg.classList.contains("invisible")) bg.classList.remove("invisible");
  setTimeout(a => con.classList.remove("scaled"), 350);
  con.querySelector(".endingText").textContent = "";
  global.isCombatPaused = true;
  if (condition == "win") {
    con.querySelector(".title").classList = "title win";
    con.querySelector(".title").textContent = "VICTORY";
    con.querySelector(".endingText").append(textSyntax(texts.win_text));
    con.querySelector(".okbutton").addEventListener("click", e => toLobbyLoot());
    global.inCombat = false;
  } else if (condition == "defeat") {
    con.querySelector(".title").classList = "title loss";
    con.querySelector(".title").textContent = "VANQUISHED";
    con.querySelector(".endingText").append(textSyntax(texts.defeat_text));
  }
}

$(".combatScreen").addEventListener("click", e => useBuff());

function useBuff() {
  let ability = global.ability;
  if (global.targetingSelf) {
    if (ability.healAmount) player.stats.hp += ability.healAmount;
    for (let stat of ability.status_effects) {
      if (noDuplicateStatus(player, stat.status)) player.statuses.push(new statusEffect({ ...statusEffects[stat.status], hasDamaged: 1 }));
    }
    player.stats.ap = 0;
    if (ability.mpCost) player.stats.mp -= ability.mpCost;
    if (ability.hpCost) player.stats.hp -= ability.hpCost;
    if (ability.cooldown) ability.onCooldown = ability.cooldown;
    if (global.targeting) {
      enemiesCombat.forEach(e => {
        if (!e.dead) {
          let bg = $("#" + e.id + "§" + e.index);
          bg.classList.remove("canBeTargeted");
        }
      });
    };
    global.isCombatPaused = false;
    global.targeting = false;
    global.targetingSelf = false;
    global.ability = "";
    removeSelection();
  }
}

//startCombatDebug();
clearInterval(combatTimer);