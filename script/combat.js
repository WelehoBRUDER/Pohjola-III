let combatTimer = setInterval(Update, 1000 / 60);

function Update() {
  // Updates the combat 60 times per second.
  // All code within this function will be executed.

  // Player bars & numbers
  if(player.stats.ap <= 99.99  && !global.isCombatPaused) player.stats.ap += player.actionFill() > 2.66 ? 2.66 : player.actionFill();
  $(".playerHpNum").textContent = player.stats.hp + " / " + player.stats.FhpMax();
  $(".playerHpFill").style.width = (player.stats.hp  / player.stats.FhpMax()) * 100 + '%';
  if(player.stats.hp < 0) {
    $(".playerHpFill").style.width = "0%";
    $(".playerHpLate").style.width = "0%";
  } 
  $(".playerHpLate").style.width = (player.stats.hp / player.stats.FhpMax()) * 100 + '%';
  $(".playerMpNum").textContent = player.stats.mp + " / " + player.stats.FmpMax();
  $(".playerMpFill").style.width = (player.stats.mp  / player.stats.FmpMax()) * 100 + '%';
  if(+$(".playerMpFill").style.width.substring(0, $(".playerMpFill").style.width.length-1) < 0) $(".playerMpFill").style.width = "0%";
  $(".playerActionNum").textContent = Math.floor(player.stats.ap) + "%";
  $(".playerActionFill").style.width = player.stats.ap + '%';
  if(global.isCombatPaused && player.stats.ap <= 99.99)  $(".playerActionFill").style.filter = "grayscale(1)";
  else if(player.stats.ap >= 99.99) $(".playerActionFill").style.filter = "grayscale(0)";
  else $(".playerActionFill").style.filter = "hue-rotate(-45deg)";
  player.stats.hp > player.stats.FhpMax() ? player.stats.hp = player.stats.FhpMax() : player.stats.hp = Math.floor(player.stats.hp);
  player.stats.mp > player.stats.FmpMax() ? player.stats.mp = player.stats.FmpMax() : player.stats.mp = Math.floor(player.stats.mp);
  if(!global.isCombatPaused) {
    for(let i = 0; i<player.statuses.length; i++) {
      let stat = player.statuses[i];
      if(!stat.permanent) stat.lastFor -= 1/60;
      if(stat.hasDamaged) stat.hasDamaged -= 1/60;
      if(!stat.permanent && stat.lastFor <= 0) player.statuses.splice(i, 1);
      player.updateStat(i);
    }
  }


  // Enemy bars & numbers
  for(let i = 0; i<enemiesCombat.length; i++) {
    let enemy = enemiesCombat[i];
    let frame = $("#" + enemy.id + "§" + i);
    if(enemy.stats.ap <= 99.99 && !global.isCombatPaused) enemy.stats.ap += enemy.actionFill() > 1.6 ? 1.6 : enemy.actionFill();
    if(enemy.stats.ap > 99.99  && !global.isCombatPaused) {
      //enemy.attackAnimation();
      //enemy.stats.ap = 0;
      if(global.settings.turn_based_combat) global.isCombatPaused = true;
      //if(global.settings.turn_based_combat) setTimeout(unpause=>global.isCombatPaused = false, 1050);
      enemyTurn(enemy);
    };
    if(!global.isCombatPaused) enemy.abilities.forEach(a=>a.onCooldown > 0 ? a.onCooldown -= 1/60 : a.onCooldown = 0);
    if(global.isCombatPaused  && enemy.stats.ap <= 99.99) frame.querySelector(".enemyActionFill").style.filter = "grayscale(1)";
    else if(enemy.stats.ap >= 99.99) frame.querySelector(".enemyActionFill").style.filter = "grayscale(0)";
    else frame.querySelector(".enemyActionFill").style.filter = "hue-rotate(-45deg)";
    enemy.stats.hp > enemy.stats.FhpMax() ? enemy.stats.hp = enemy.stats.FhpMax() : enemy.stats.hp = Math.floor(enemy.stats.hp);
    enemy.stats.mp > enemy.stats.FmpMax() ? enemy.stats.mp = enemy.stats.FmpMax() : enemy.stats.mp = Math.floor(enemy.stats.mp);
    frame.querySelector(".enemyHpNumber").textContent = enemy.stats.hp + " / " + enemy.stats.FhpMax();
    frame.querySelector(".enemyHpFill").style.width = (enemy.stats.hp  / enemy.stats.FhpMax()) * 100 + '%';
    frame.querySelector(".enemyHpLate").style.width = (enemy.stats.hp / enemy.stats.FhpMax()) * 100 + '%';
    frame.querySelector(".enemyMpNumber").textContent = enemy.stats.mp + " / " + enemy.stats.FmpMax();
    frame.querySelector(".enemyMpFill").style.width = (enemy.stats.mp  / enemy.stats.FmpMax()) * 100 + '%';
    frame.querySelector(".enemyMpLate").style.width = (enemy.stats.mp / enemy.stats.FmpMax()) * 100 + '%';
    frame.querySelector(".enemyActionNumber").textContent = Math.floor(enemy.stats.ap) + "%";
    frame.querySelector(".enemyActionFill").style.width = enemy.stats.ap + '%';
  }
}

let enemiesCombat = [];

function startCombatDebug() {
  enemiesCombat.push(new EnemyClass({...Enemies.skeleton_warrior, index: 0}));
  //enemiesCombat.push(new EnemyClass({...Enemies.skeleton_archer, index: 1}));
  //enemiesCombat.push(new EnemyClass({...Enemies.skeleton_knight, index: 2}));
  drawEnemies(enemiesCombat);
  enemiesCombat.forEach(e=>{e.init()});
}

function drawEnemies(array) {
  array.forEach(e=>{
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
    enemyFrame.onclick = a=>{e.hurtAnimation(); e.stats.hp -= random(5, 1)};
    enemyFrame.append(idle, attack_start, attack_finish, death, hpbar, mpbar, name, actionBar);
    $(".enemiesFlex").append(enemyFrame);
  })
}

function createDroppingString(string, start, text_class) {
  let text = create("p");
  text.textContent = string;
  text.classList.add(text_class);
  text.classList.add("dropping");
  text.style.transition = "2.4s";
  text.style.left = (start.getBoundingClientRect().left + random(400, 200)) + "px";
  text.style.top = (start.getBoundingClientRect().top - random(150, 30)) + "px";
  text.style.fontSize = random(84, 61) + "px";
  setTimeout(flyRandomly, 25);
  const currentLeft = +text.style.left.substring(0, text.style.left.length-2);
  function flyRandomly() {
    text.style.left = (currentLeft + random(200, -200)) + "px";
  }
  $(".combatScreen").append(text);
}

function enemyTurn(enemy) {
  let ability = enemy.decideMove();
  console.log(ability);
  if(ability.id == "regular_attack") {
    let dmg = Math.round(enemy.regularAttack());
    if(dmg <= 0) dmg = 1;
    enemy.attackAnimation(dmg);
    setTimeout(e=>{enemy.stats.ap = 0; global.isCombatPaused = false}, 1050);
  } else if(!ability.doesNotUseWeapon) {
    let dmg = Math.round(enemy.regularAttack() * ability.powerMultiplier);
    if(dmg <= 0) dmg = 1;
    enemy.attackAnimation(dmg);
    ability.onCooldown = ability.cooldown;
    enemy.stats.mp -= ability.mpCost;
    for(let stat of ability.status_effects) {
      setTimeout(s=>{
        if(noDuplicateStatus(player, stat.status)) player.statuses.push(new statusEffect({...statusEffects[stat.status], hasDamaged: 1}));
      }, 800);
    };
    setTimeout(e=>{enemy.stats.ap = 0; global.isCombatPaused = false}, 1050);
  }
}

function noDuplicateStatus(char, status) {
  for(let stat of char.statuses) {
    if(stat.id == status) return false;
  } return true;
}

startCombatDebug();