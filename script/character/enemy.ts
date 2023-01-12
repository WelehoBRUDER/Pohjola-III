interface Card {
  [main: string]: any;
  hp_fill: HTMLDivElement;
  hp_late: HTMLDivElement;
  hp_value: HTMLParagraphElement;
  ap_fill: HTMLDivElement;
  ap_value: HTMLParagraphElement;
  status_effects: HTMLDivElement;
}

interface EnemyBase extends CharacterObject {
  [sprite: string]: any;
  card?: Card;
  index?: number;
  loot?: any[];
  xp?: number;
}

class Enemy extends Character {
  [sprite: string]: any;
  card?: Card | null;
  index?: number;
  isEnemy?: boolean;
  loot?: any[];
  xp?: number;
  spawnWithEffects?: any[];
  constructor(enemy: EnemyBase) {
    super(enemy);
    this.index = enemy.index ?? -1;
    this.sprite = enemy.sprite;
    this.card = enemy.card ? { ...enemy.card } : null;
    this.loot = enemy.loot ? [...enemy.loot] : [];
    this.isEnemy = true;
    this.xp = enemy.xp ?? 0;
    this.spawnWithEffects = enemy.spawnWithEffects ? [...enemy.spawnWithEffects] : [];
  }

  init(index: number): void {
    this.restore();
    this.index = index;
    this.abilities.map((ability: Ability) => {
      return (ability = new Ability({ ...ability }));
    });
    if (this.spawnWithEffects) {
      this.spawnWithEffects.map((effect: any) => {
        console.log(effect);
        this.addStatus(effect, this);
      });
    }
    createBattlecard(this);
  }

  getRandomMove(): Ability {
    const usables = this.abilities.filter((ability: Ability) => {
      return ability.canUse(this) && (ability.type === "heal" ? this.stats.hp / this.getStats().hpMax < 0.5 : true);
    });
    if (usables.length === 0) {
      usables.push(new Ability({ ...abilities.player_base_attack }));
    }
    return usables[Math.floor(Math.random() * usables.length)];
  }

  shake(): void {
    let shake = Math.ceil(Math.random() * 9);
    if (this.card) {
      this.card.main.style.animation = "none";
      this.card.main.style.offsetHeight; // trigger reflow
      this.card.main.style.animation = null;
      this.card.main.style.animationDuration = `${250 / game.settings.animation_speed}ms`;
      this.card.main.style.animationName = "shake" + shake;
      setTimeout(() => {
        if (this.card) {
          this.card.main.style.animation = "none";
        }
      }, 250 / game.settings.animation_speed);
    }
  }

  die(): void {
    stats.total_kills += 1;
    this.stats.hp = 0;
    this.dead = true;
    if (this.card) {
      this.card.main.style.animation = "none";
      this.card.main.style.offsetHeight; // trigger reflow
      this.card.main.style.animation = null;
      this.card.main.style.transition = `all ${300 / game.settings.animation_speed}ms`;
      this.card.main.style.animationDuration = `${3000 / game.settings.animation_speed}ms`;
      this.card.main.style.animationName = "die";

      setTimeout(() => {
        if (this.card) {
          //this.card.main.remove();
          this.card.main.classList.add("dead");
        }
      }, 2700 / game.settings.animation_speed);
      setTimeout(() => {
        if (this.card) {
          this.card.main.remove();
          if (combat.getLivingEnemies().length === 0) {
            combat.end();
          }
        }
      }, 3000 / game.settings.animation_speed);
    }
  }

  hurt(dmg: number, crit: boolean = false): void {
    this.stats.hp -= dmg;
    stats.total_damage += dmg;
    if (stats.most_damage < dmg) {
      stats.most_damage = dmg;
    }
    if (this.card) {
      createDroppingText(dmg.toString(), this.card.main);
      if (crit) {
        createDroppingText("CRIT!", this.card.main, "crit");
      }
    }
    this.updateCard();
    this.shake();
    if (this.stats.hp <= 0) {
      setTimeout(() => this.die(), 250 / game.settings.animation_speed);
    }
  }

  harm(dmg: number): void {
    this.stats.hp -= dmg;
    stats.total_damage += dmg;
    if (stats.most_damage < dmg) {
      stats.most_damage = dmg;
    }
    this.updateCard();
    if (this.stats.hp <= 0) {
      this.die();
    }
  }

  heal(amount: number): void {
    this.stats.hp += amount;
    if (this.stats.hp > this.getStats().hpMax) {
      this.stats.hp = this.getStats().hpMax;
    }
    this.updateCard();
  }

  recoverMana(amount: number): void {
    this.stats.mp += amount;
    if (this.stats.mp > this.getStats().mpMax) {
      this.stats.mp = this.getStats().mpMax;
    }
    this.updateCard();
  }

  updateStatusEffects(): void {
    this.statuses.forEach((status: Effect) => {
      if (status.inflict) {
        status.inflictTimer += 1 / 60;
        if (status.inflictTimer >= 1) {
          status.inflictTimer = 0;
          this.inflict(status);
        }
      }
      if (!status.isInfinite) {
        status.lasts -= 1 / 60;
      }
    });
    for (let i = this.statuses.length - 1; i >= 0; i--) {
      if (this.statuses[i].lasts <= 0 && !this.statuses[i].isInfinite) {
        const statusElem: HTMLDivElement = this.card?.status_effects.querySelector(
          ".status-effect[data-id='" + this.statuses[i].id + "']"
        )!;
        if (statusElem) {
          statusElem.remove();
        }
        this.statuses.splice(i, 1);
      }
    }
  }

  dropLoot(): any[] {
    const loot: any[] = [];
    if (this.loot) {
      this.loot.forEach((item: any) => {
        if (item.gold) {
          loot.push({ gold: random(item.gold[0], item.gold[1]) });
        } else if (Math.random() <= item.chance) {
          loot.push({ item: { ...item.item }, amount: random(item.amount[0], item.amount[1]) });
        }
      });
    }
    return loot;
  }

  act(): void {
    game.pause();
    const move = this.getRandomMove();
    if (move.type === "attack") {
      this.attackAnimation(move);
    } else if (move.type === "heal" || move.type === "buff") {
      this.healingAnimation(move, this);
    }
  }

  updateCard(): void {
    if (this.card) {
      const stats = this.getStats();
      if (this.stats.hp < 0) this.stats.hp = 0;
      const hpRemain = (this.stats.hp / stats.hpMax) * 100;
      const { main, ap_fill, ap_value, hp_fill, hp_late, hp_value } = this.card;
      ap_value.innerText = this.stats.ap.toFixed(1) + "%";
      hp_value.innerText = this.stats.hp + "/" + stats.hpMax;
      ap_fill.style.width = `${this.stats.ap}%`;
      hp_fill.style.width = `${hpRemain}%`;
      hp_late.style.width = `${hpRemain}%`;
      this.statuses.forEach((status: Effect) => {
        const statusElem = this.card?.status_effects.querySelector(".status-effect[data-id='" + status.id + "']");
        if (!statusElem) {
          const statusElement = createStatusIcon(status);
          this.card?.status_effects.appendChild(statusElement);
        } else if (statusElem) {
          const dur: HTMLParagraphElement = statusElem.querySelector(".duration")!;
          if (dur) {
            dur.innerText = status.isInfinite ? "∞" : status.lasts.toFixed(1) + "s";
          }
        }
      });
    }
  }

  attack(): void {
    let ability: Ability = this.abilities[0];
    this.attackAnimation(ability);
  }

  attackAnimation(ability: Ability): void {
    if (this.card) {
      this.card.main.style.animation = "none";
      this.card.main.style.offsetHeight; // trigger reflow
      this.card.main.style.animation = null;
      this.card.main.classList.add("attack");
      this.card.main.style.animationDuration = `${1000 / game.settings.animation_speed}ms`;
      this.card.main.style.animationName = "attack";
      setTimeout(() => {
        ability.use(this, player);
      }, 800 / game.settings.animation_speed);
      setTimeout(() => {
        if (this.card) {
          this.card.main.classList.remove("attack");
          this.card.main.style.animation = "none";
        }
      }, 1050 / game.settings.animation_speed);
      setTimeout(() => {
        game.resume();
      }, 1100 / game.settings.animation_speed);
    }
  }

  healingAnimation(ability: Ability, target: Enemy): void {
    if (this.card) {
      this.card.main.style.animation = "none";
      this.card.main.style.offsetHeight; // trigger reflow
      this.card.main.style.animation = null;
      this.card.main.classList.add("heal");
      this.card.main.style.animationDuration = `${1000 / game.settings.animation_speed}ms`;
      this.card.main.style.animationName = "heal";
      setTimeout(() => {
        ability.use(this, target);
      }, 600 / game.settings.animation_speed);
      setTimeout(() => {
        if (this.card) {
          this.card.main.classList.remove("heal");
          this.card.main.style.animation = "none";
        }
      }, 1050 / game.settings.animation_speed);
      setTimeout(() => {
        game.resume();
      }, 1100 / game.settings.animation_speed);
    }
  }
}

function createBattlecard(enemy: Enemy) {
  const battlecard = document.createElement("div");
  battlecard.classList.add("battlecard");
  battlecard.classList.add("enemy");
  if (enemy.index) {
    battlecard.setAttribute("enemy-data-index", enemy.index.toString());
  }
  battlecard.addEventListener("click", () => {
    if (combatScreen.classList.contains("paused")) return;
    if (game.state.targeting && game.state.selected_ability) {
      game.pause();
      game.state.selected_ability.use(player, enemy);
      game.endTargeting();
    }
  });
  battlecard.innerHTML = `
    <div class="status-effects"></div>
    <div class="card">
      <div class="name">${enemy.name}</div>
      <div class="hp-background">
        <div class="hp-fill gradient-shine"></div>
        <div class="hp-late"></div>
        <p class="hp-value">${enemy.stats.hp}/${enemy.getStats().hpMax}</p>
      </div>
      <div class="sprite"><img src="./gfx/enemies/${enemy.sprite}"></div>
      <div class="ap-background">
          <div class="ap-fill gradient-shine">
          </div>
          <p class="ap-value">${enemy.stats.ap.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  `;
  enemyContainer.appendChild(battlecard);
  enemy.card = {
    main: battlecard,
    hp_fill: battlecard.querySelector(".hp-fill") as HTMLDivElement,
    hp_late: battlecard.querySelector(".hp-late") as HTMLDivElement,
    hp_value: battlecard.querySelector(".hp-value") as HTMLParagraphElement,
    ap_fill: battlecard.querySelector(".ap-fill") as HTMLDivElement,
    ap_value: battlecard.querySelector(".ap-value") as HTMLParagraphElement,
    status_effects: battlecard.querySelector(".status-effects") as HTMLDivElement,
  };
}
