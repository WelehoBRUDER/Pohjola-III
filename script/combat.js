let combatTimer = setInterval(Update, 1000 / 60);

function Update() {
  // Updates the combat 60 times per second.
  // All code within this function will be executed.

  console.log("Oh no!");

  // Player bars & numbers
  if(player.stats.ap <= 99.99) player.stats.ap += player.actionFill();
  $(".playerHpNum").textContent = player.stats.hp + " / " + player.stats.FhpMax();
  $(".playerHpFill").style.width = (player.stats.hp  / player.stats.FhpMax()) * 100 + '%';
  $(".playerHpLate").style.width = (player.stats.hp / player.stats.FhpMax()) * 100 + '%';
  $(".playerMpNum").textContent = player.stats.mp + " / " + player.stats.FmpMax();
  $(".playerMpFill").style.width = (player.stats.mp  / player.stats.FmpMax()) * 100 + '%';
  $(".playerActionNum").textContent = Math.floor(player.stats.ap) + "%";
  $(".playerActionFill").style.width = player.stats.ap + '%';
  player.stats.hp > player.stats.FhpMax() ? player.stats.hp = player.stats.FhpMax() : player.stats.hp = Math.floor(player.stats.hp);
  player.stats.mp > player.stats.FmpMax() ? player.stats.mp = player.stats.FmpMax() : player.stats.mp = Math.floor(player.stats.mp);

  // Enemy bars & numbers
  for(let i = 0; i<enemiesCombat.length; i++) {
    let enemy = enemiesCombat[i];
    let frame = $("#" + enemy.id + "§" + i);
    if(enemy.stats.ap <= 99.99) enemy.stats.ap += enemy.actionFill();
    if(enemy.stats.ap > 99.99) {enemy.attackAnimation(); enemy.stats.ap = 0;};
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
  enemiesCombat.push(new EnemyClass({...Enemies.skeleton_warrior, index: 0, level: {lvl: 20}}));
  enemiesCombat.push(new EnemyClass({...Enemies.skeleton_archer, index: 1}));
  enemiesCombat.push(new EnemyClass({...Enemies.skeleton_knight, index: 2}));
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
    enemyFrame.append(idle, attack_start, attack_finish, death, hpbar, mpbar, name, actionBar);
    $(".enemiesFlex").append(enemyFrame);
  })
}

startCombatDebug();