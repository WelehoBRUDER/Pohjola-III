function update(options?: { updatePlayerOnly: boolean }) {
  if (player.stats.hp < 0) {
    player.stats.hp = 0;
    combat.end();
  }

  if (player.stats.mp < 0) {
    player.stats.mp = 0;
  }

  const stats = player.getStats({ dontUpdateModifiers: true });
  if (player.stats.hp > stats.hpMax) player.stats.hp = stats.hpMax;
  if (player.stats.mp > stats.mpMax) player.stats.mp = stats.mpMax;

  const PlayerHealthRemaining = (player.stats.hp / stats.hpMax) * 100;
  const PlayerManaRemaining = (player.stats.mp / stats.mpMax) * 100;

  playerActionFill.style.width = `${player.stats.ap}%`;
  playerHPFill.style.width = `${PlayerHealthRemaining}%`;
  playerMPFill.style.width = `${PlayerManaRemaining}%`;
  playerHPLate.style.width = `${PlayerHealthRemaining}%`;
  playerMPLate.style.width = `${PlayerManaRemaining}%`;
  playerAction.innerText = player.stats.ap.toFixed(1) + "%";
  playerHP.innerText = player.stats.hp + "/" + stats.hpMax;
  playerMP.innerText = player.stats.mp + "/" + stats.mpMax;
  player.update();

  if (options?.updatePlayerOnly) return;

  combat.time += 1 / game.settings.tick_speed;
  combatTime.textContent = `${combat.time.toFixed(1)}s`;

  if (game.state.paused) return;
  const speed = player.getSpeed();
  player.stats.ap += speed;

  if (player.stats.ap > 100) {
    player.stats.ap = 100;
    update({ updatePlayerOnly: true });
    if (game.settings.pause_on_player_turn) {
      game.pause({ disableSkills: false });
    }
  }

  combat.enemies.forEach((enemy: Enemy) => {
    if (enemy.dead || game.state.paused) return;
    enemy.updateStatusEffects();
    enemy.stats.ap += enemy.getSpeed();
    enemy.abilities.forEach((ability: Ability) => {
      ability.doCooldown();
    });
    if (enemy.stats.ap > 100) {
      enemy.stats.ap = 100;
      enemy.act();
    }
    enemy.updateCard();
  });

  player.abilities.forEach((ability, index) => {
    ability.doCooldown();
    const slot = slots.children[index] as HTMLDivElement;
    const cooldown = slot.querySelector(".cooldown") as HTMLDivElement;
    const cooldownValue = slot.querySelector(".cooldown-number") as HTMLParagraphElement;
    cooldown.style.height = `${(ability.onCooldown / ability.cooldown) * 100}%`;
    if (ability.onCooldown > 0) {
      cooldownValue.innerText = ability.onCooldown.toFixed(1) + "s";
    } else {
      cooldownValue.innerText = "";
    }
    if (ability.onCooldown <= 0 && !ability.canUse(player)) {
      if (!slot.classList.contains("disabled")) {
        slot.classList.add("disabled");
      }
    } else {
      if (slot.classList.contains("disabled")) {
        slot.classList.remove("disabled");
      }
    }
  });
}

function createActionSlots() {
  slots.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    let slot;
    if (player.abilities[i]) {
      const ability = player.abilities[i];
      slot = createAbilitySlot(ability, { manage: false }, i);
    } else {
      slot = createAbilitySlot(undefined, { manage: false }, i);
    }
    slots.appendChild(slot);
  }
}

function useAbility(hotkey: string | null, index?: number | null) {
  game.endTargeting();
  let _index = index;
  if (hotkey) {
    // Last char in the string is the index
    _index = +hotkey.substring(hotkey.length - 1) as number;
    _index--;
  }
  if (_index === null || _index === undefined) return;
  const ability = player.abilities[_index];
  if (!ability.canUse(player) || player.stats.ap < 100) return;
  if (ability.type === "attack") {
    const targets: Enemy[] = combat.getLivingEnemies();
    if (targets.length === 1) {
      ability.use(player, targets[0]);
    } else {
      console.log("You have multiple targets, please select one");
      game.startTargeting(ability);
    }
  } else {
    ability.use(player, player);
  }
}

function shakeScreen() {
  let shake = Math.ceil(Math.random() * 9);
  bloodyScreen.classList.add("show");
  combatScreen.style.animation = "none";
  // @ts-ignore
  combatScreen.style.offsetHeight; // trigger reflow
  // @ts-ignore
  combatScreen.style.animation = null;
  combatScreen.style.animationDuration = `${200 / game.settings.animation_speed}ms`;
  combatScreen.style.animationName = "shake" + shake;
  setTimeout(() => {
    combatScreen.style.animation = "none";
    bloodyScreen.classList.remove("show");
  }, 200 / game.settings.animation_speed);
}

function createStatusIcon(status: Effect) {
  const statusElement = document.createElement("div");
  const statusIcon = document.createElement("img");
  const statusDuration = document.createElement("p");
  statusElement.classList.add("status-effect");
  statusIcon.classList.add("icon");
  statusDuration.classList.add("duration");
  statusElement.setAttribute("data-id", status.id);
  statusIcon.src = status.icon;
  statusDuration.innerText = status.lasts.toFixed(1) + "s";
  statusElement.append(statusIcon, statusDuration);
  tooltip(statusElement, status.tooltip());
  return statusElement;
}

function attack() {
  if (player.stats.ap < 100) return;
  const ability = new Ability({ ...abilities.player_base_attack });
  game.endTargeting();
  const targets: Enemy[] = combat.getLivingEnemies();
  if (targets.length === 1) {
    ability.use(player, targets[0]);
  } else {
    console.log("You have multiple targets, please select one");
    game.startTargeting(ability);
  }
}

function pass() {
  if (player.stats.ap >= 100) {
    player.stats.ap = 0;
    game.state.selected_ability = null;
    game.endTargeting();
    if (game.settings.pause_on_player_turn) {
      game.resume();
    }
  }
}

function defeatedEnemies(): HTMLPreElement {
  let text: string = "";
  text += `<f>2rem<f><c>goldenrod<c>${game.getLocalizedString("defeated_enemies")}:<f>1.5rem<f><c>silver<c>\n`;
  combat.loot = lootEnemies(combat.enemies);
  combat.enemies.forEach((enemy) => {
    text += `${game.getLocalizedString(enemy.id)}\n`;
  });
  text += `\n<f>2rem<f><c>goldenrod<c>${game.getLocalizedString("loot_gained")}:<f>1.5rem<f><c>silver<c>\n`;
  combat.loot.forEach((item) => {
    text += `${item.amount}x ${game.getLocalizedString(item.item.id)}\n`;
  });
  text += `${combat.gold}<c>gold<c> ${game.getLocalizedString("gold")}\n`;
  text += `<c>silver<c>${combat.xp}<c>lime<c> ${game.getLocalizedString("xp")}`;
  return textSyntax(text);
}

function lootEnemies(enemies: Enemy[]) {
  let total: any[] = [];
  let loot: any[] = [];
  enemies.forEach((enemy) => {
    combat.xp += enemy.xp || 0;
    enemy.dropLoot().forEach((item) => {
      total.push(item);
    });
  });
  total.forEach((item) => {
    if (item.gold) combat.gold += item.gold;
    else {
      if (!loot.find((i) => i.item.id === item.item.id)) {
        loot.push(item);
      } else {
        const index = loot.findIndex((i) => i.item.id === item.item.id);
        loot[index].amount += item.amount;
      }
    }
  });
  return loot;
}

class Combat {
  [id: string]: any;
  enemies: Enemy[] = [];
  time: number;
  loot: any[];
  gold: number;
  xp: number;
  defeat: boolean;
  constructor() {
    this.init();
    this.id = "combat";
    this.time = 0;
    this.loot = [];
    this.gold = 0;
    this.xp = 0;
    this.defeat = false;
  }

  init() {}

  getLivingEnemies() {
    return this.enemies.filter((enemy) => !enemy.dead);
  }

  createCombat(enemies: Enemy[]) {
    this.time = 0;
    this.enemies = enemies;
    this.loot = [];
    this.gold = 0;
    this.xp = 0;
    this.defeat = false;
    enemyContainer.innerHTML = "";
    combatSummaryBackground.classList.add("hide");
    this.enemies.forEach((enemy) => {
      // @ts-ignore
      enemy.init();
    });
    game.resume();
  }

  end() {
    game.pause({ disableSkills: true });
    combatSummaryBackground.classList.remove("hide");
    combatSummaryButtons.innerHTML = "";
    combatSummaryText.innerHTML = "";
    if (this.getLivingEnemies().length === 0) {
      combatSummaryTitle.innerText = game.getLocalizedString("combat_victory");
      combatSummaryTitle.classList.value = "header victory";
      combatSummaryText.append(defeatedEnemies());
      combatSummaryButtons.innerHTML = `<button class="main-button" onclick="combat.finish_combat()">${game.getLocalizedString(
        "continue"
      )}</button>`;
    } else {
      this.defeat = true;
      combatSummaryTitle.innerText = game.getLocalizedString("combat_defeat");
      combatSummaryTitle.classList.value = "header defeat";
      combatSummaryText.append(game.getLocalizedString("combat_defeat_text"));
      combatSummaryButtons.innerHTML = `<button class="main-button" onclick="combat.finish_combat()">${game.getLocalizedString(
        "continue"
      )}</button>`;
    }
  }

  finish_combat() {
    player.addGold(this.gold);
    player.addXP(this.xp);
    this.loot.forEach((item) => {
      player.addItem(new Item({ ...item.item }), item.amount);
    });
    this.gold = 0;
    this.xp = 0;
    this.loot = [];
    if (this.defeat) {
      player.xp -= Math.ceil(player.xp * (random(50, 70) / 100));
    }
    combatSummaryBackground.classList.add("hide");
    game.endCombatAndGoToLobby();
  }
}

const combat = new Combat();

// game.initCombat([new Enemy({ ...enemies.skeleton }), new Enemy({ ...enemies.skeleton }), new Enemy({ ...enemies.skeleton })]);
