"use strict";
class Enemy extends Character {
    card;
    index;
    isEnemy;
    loot;
    xp;
    spawnWithEffects;
    constructor(enemy) {
        super(enemy);
        this.index = enemy.index ?? -1;
        this.sprite = enemy.sprite;
        this.card = enemy.card ? { ...enemy.card } : null;
        this.loot = enemy.loot ? [...enemy.loot] : [];
        this.isEnemy = true;
        this.xp = enemy.xp ?? 0;
        this.spawnWithEffects = enemy.spawnWithEffects ? [...enemy.spawnWithEffects] : [];
    }
    init(index) {
        this.restore();
        this.index = index;
        this.abilities.map((ability) => {
            return (ability = new Ability({ ...ability }));
        });
        if (this.spawnWithEffects) {
            this.spawnWithEffects.map((effect) => {
                this.addStatus(effect, this);
            });
        }
        createBattlecard(this);
    }
    getRandomMove() {
        const usables = this.abilities.filter((ability) => {
            return ability.canUse(this) && (ability.type === "heal" ? this.stats.hp / this.getStats().hpMax < 0.5 : true);
        });
        if (usables.length === 0) {
            // @ts-ignore
            usables.push(new Ability({ ...abilities.player_base_attack }));
        }
        return usables[Math.floor(Math.random() * usables.length)];
    }
    shake() {
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
    die() {
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
                    const viableTargets = combat.getLivingEnemies();
                    if (viableTargets.length === 0) {
                        combat.end();
                    }
                    if (game.settings.lock_on_targeting) {
                        combat.target = viableTargets[0].index || 0;
                        viableTargets[0].updateCard();
                    }
                }
            }, 3000 / game.settings.animation_speed);
        }
    }
    hurt(dmg, crit = false) {
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
    harm(dmg) {
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
    heal(amount) {
        this.stats.hp += amount;
        if (this.stats.hp > this.getStats().hpMax) {
            this.stats.hp = this.getStats().hpMax;
        }
        this.updateCard();
    }
    recoverMana(amount) {
        this.stats.mp += amount;
        if (this.stats.mp > this.getStats().mpMax) {
            this.stats.mp = this.getStats().mpMax;
        }
        this.updateCard();
    }
    updateStatusEffects() {
        this.statuses.forEach((status) => {
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
                const statusElem = this.card?.status_effects.querySelector(".status-effect[data-id='" + this.statuses[i].id + "']");
                if (statusElem) {
                    statusElem.remove();
                }
                this.statuses.splice(i, 1);
            }
        }
    }
    dropLoot() {
        const loot = [];
        if (this.loot) {
            this.loot.forEach((item) => {
                if (item.gold) {
                    loot.push({ gold: random(item.gold[0], item.gold[1]) });
                }
                else if (Math.random() <= item.chance) {
                    loot.push({ item: { ...item.item }, amount: random(item.amount[0], item.amount[1]) });
                }
            });
        }
        return loot;
    }
    act() {
        game.pause();
        const move = this.getRandomMove();
        if (move.type === "attack") {
            this.attackAnimation(move);
        }
        else if (move.type === "heal" || move.type === "buff") {
            this.healingAnimation(move, this);
        }
    }
    updateCard() {
        if (this.card) {
            const stats = this.getStats();
            if (this.stats.hp < 0)
                this.stats.hp = 0;
            if (game.settings.lock_on_targeting) {
                if (combat.target === this.index) {
                    this.card.main.classList.add("target");
                }
                else {
                    this.card.main.classList.remove("target");
                }
            }
            const hpRemain = (this.stats.hp / stats.hpMax) * 100;
            const { main, ap_fill, ap_value, hp_fill, hp_late, hp_value } = this.card;
            ap_value.innerText = this.stats.ap.toFixed(1) + "%";
            hp_value.innerText = this.stats.hp + "/" + stats.hpMax;
            ap_fill.style.width = `${this.stats.ap}%`;
            hp_fill.style.width = `${hpRemain}%`;
            hp_late.style.width = `${hpRemain}%`;
            this.statuses.forEach((status) => {
                const statusElem = this.card?.status_effects.querySelector(".status-effect[data-id='" + status.id + "']");
                if (!statusElem) {
                    const statusElement = createStatusIcon(status);
                    this.card?.status_effects.appendChild(statusElement);
                }
                else if (statusElem) {
                    const dur = statusElem.querySelector(".duration");
                    if (dur) {
                        dur.innerText = status.isInfinite ? "∞" : status.lasts.toFixed(1) + "s";
                    }
                }
            });
        }
    }
    attack() {
        let ability = this.abilities[0];
        this.attackAnimation(ability);
    }
    attackAnimation(ability) {
        if (this.dead || !this.card)
            return;
        if (this.card) {
            this.card.main.style.animation = "none";
            this.card.main.style.offsetHeight; // trigger reflow
            this.card.main.style.animation = null;
            this.card.main.classList.add("attack");
            this.card.main.style.animationDuration = `${1000 / game.settings.animation_speed}ms`;
            this.card.main.style.animationName = "attack";
            setTimeout(() => {
                if (!this.dead) {
                    ability.use(this, [player]);
                }
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
    healingAnimation(ability, target) {
        if (this.dead || !this.card)
            return;
        if (this.card) {
            this.card.main.style.animation = "none";
            this.card.main.style.offsetHeight; // trigger reflow
            this.card.main.style.animation = null;
            this.card.main.classList.add("heal");
            this.card.main.style.animationDuration = `${1000 / game.settings.animation_speed}ms`;
            this.card.main.style.animationName = "heal";
            setTimeout(() => {
                if (!this.dead) {
                    ability.use(this, [target]);
                }
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
function createBattlecard(enemy) {
    const battlecard = document.createElement("div");
    battlecard.classList.add("battlecard");
    battlecard.classList.add("enemy");
    if (enemy.index) {
        battlecard.setAttribute("enemy-data-index", enemy.index.toString());
    }
    battlecard.addEventListener("click", () => {
        if (game.settings.lock_on_targeting) {
            combat.target = enemy.index || 0;
            combat.updateCards();
            return;
        }
        if (combatScreen.classList.contains("paused"))
            return;
        if (game.state.targeting && game.state.selected_ability) {
            game.pause();
            game.state.selected_ability.use(player, [enemy]);
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
        hp_fill: battlecard.querySelector(".hp-fill"),
        hp_late: battlecard.querySelector(".hp-late"),
        hp_value: battlecard.querySelector(".hp-value"),
        ap_fill: battlecard.querySelector(".ap-fill"),
        ap_value: battlecard.querySelector(".ap-value"),
        status_effects: battlecard.querySelector(".status-effects"),
    };
}
function getEnemyPowerText(en, pw) {
    const { level, color } = getDangerLevel(pw);
    const power = level < 2 ? pw : "💀";
    return `<c>${color}<c>${game.getLocalizedString(en.id)}, <c>white<c>${game.getLocalizedString("power")}: <c>${color}<c>${power}\n`;
}
function getTotalPowerText(pw) {
    const { level, color } = getDangerLevel(pw);
    return `<c>white<c>${game.getLocalizedString("total_danger")}: <c>${color}<c>${level < 2 ? pw : "💀"}\n`;
}
//# sourceMappingURL=enemy.js.map