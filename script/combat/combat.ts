function update() {
  const stats = player.getStats();
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

  if (game.state.paused) return;
  const speed = player.getSpeed();
  player.stats.ap += speed;

  if (player.stats.ap > 100) {
    player.stats.ap = 100;
    if (game.settings.pause_on_player_turn) {
      game.pause({ disableSkills: false });
    }
  }

  combat.enemies.forEach((enemy: Enemy) => {
    if (enemy.dead || game.state.paused) return;
    enemy.stats.ap += enemy.getSpeed();
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
    const cooldownValue = slot.querySelector(
      ".cooldown-number"
    ) as HTMLParagraphElement;
    cooldown.style.height = `${(ability.onCooldown / ability.cooldown) * 100}%`;
    if (ability.onCooldown > 0) {
      cooldownValue.innerText = ability.onCooldown.toFixed(1) + "s";
    } else {
      cooldownValue.innerText = "";
    }
    if (ability.onCooldown <= 0 && !ability.canUse()) {
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
    const slot = document.createElement("div");
    const image = document.createElement("img");
    slot.classList.add("action-slot");
    slot.setAttribute("data-index", i.toString());

    if (player.abilities[i]) {
      const ability = player.abilities[i];
      slot.setAttribute("data-ability", ability.id);
      image.src = ability.icon;
      const cooldown = document.createElement("div");
      const cooldownValue = document.createElement("p");
      cooldown.classList.add("cooldown");
      cooldownValue.classList.add("cooldown-number");
      slot.append(image, cooldown, cooldownValue);
      tooltip(slot, ability.tooltip());
      slot.addEventListener("click", () => useAbility(null, i));
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
  if (!ability.canUse() || player.stats.ap < 100) return;
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
  combatScreen.style.animationDuration = `${
    200 / game.settings.animation_speed
  }ms`;
  combatScreen.style.animationName = "shake" + shake;
  setTimeout(() => {
    combatScreen.style.animation = "none";
    bloodyScreen.classList.remove("show");
  }, 200 / game.settings.animation_speed);
}

class Combat {
  [id: string]: any;
  enemies: Enemy[] = [];
  constructor() {
    this.init();
    this.id = "combat";
  }

  init() {}

  getLivingEnemies() {
    return this.enemies.filter((enemy) => !enemy.dead);
  }

  createCombat(enemies: Enemy[]) {
    this.enemies = enemies;
    this.enemies.forEach((enemy) => {
      // @ts-ignore
      enemy.init();
    });
    game.resume();
  }
}

const combat = new Combat();
