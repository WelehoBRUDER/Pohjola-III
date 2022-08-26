"use strict";
class Enemy extends Character {
    constructor(enemy) {
        super(enemy);
        this.index = enemy.index ?? -1;
        this.sprite = enemy.sprite;
        this.card = enemy.card ? { ...enemy.card } : null;
        this.isEnemy = true;
    }
    init(index) {
        this.restore();
        this.index = index;
        createBattlecard(this);
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
                    this.card.main.classList.add("dead");
                }
            }, 2700 / game.settings.animation_speed);
        }
    }
    hurt(dmg, crit = false) {
        this.stats.hp -= dmg;
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
    updateStatusEffects() {
        this.statuses.forEach((status) => {
            status.lasts -= 1 / 60;
            if (status.inflict) {
                status.inflictTimer += 1 / 60;
                if (status.inflictTimer >= 1) {
                    status.inflictTimer = 0;
                    this.inflict(status);
                }
            }
        });
        for (let i = this.statuses.length - 1; i >= 0; i--) {
            if (this.statuses[i].lasts <= 0) {
                const statusElem = this.card?.status_effects.querySelector(".status-effect[data-id='" + this.statuses[i].id + "']");
                if (statusElem) {
                    statusElem.remove();
                }
                this.statuses.splice(i, 1);
            }
        }
    }
    act() {
        game.pause();
        console.log("I take action, ok?");
        this.attack();
    }
    updateCard() {
        if (this.card) {
            const stats = this.getStats();
            if (this.stats.hp < 0)
                this.stats.hp = 0;
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
                        dur.innerText = status.lasts.toFixed(1) + "s";
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
        if (this.card) {
            this.card.main.style.animation = "none";
            this.card.main.style.offsetHeight; // trigger reflow
            this.card.main.style.animation = null;
            this.card.main.classList.add("attack");
            this.card.main.style.animationDuration = `${1000 / game.settings.animation_speed}ms`;
            this.card.main.style.animationName = "attack";
            setTimeout(() => {
                ability.use(this, player);
                // player.stats.hp -= dmg;
                // createDroppingText(dmg.toString(), tools);
                // update();
                // shakeScreen();
            }, 800 / game.settings.animation_speed);
            setTimeout(() => {
                if (this.card) {
                    this.card.main.classList.remove("shake");
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
        if (combatScreen.classList.contains("paused"))
            return;
        if (game.state.targeting && game.state.selected_ability) {
            game.pause();
            game.state.selected_ability.use(player, enemy);
            game.endTargeting();
        }
    });
    battlecard.innerHTML = `
    <div class="status-effects"></div>
    <div class="name">${enemy.name}</div>
    <div class="hp-background">
      <div class="hp-fill gradient-shine"></div>
      <div class="hp-late"></div>
      <p class="hp-value">${enemy.stats.hp}/${enemy.getStats().hpMax}</p>
    </div>
    <div class="sprite"><img src="/gfx/enemies/${enemy.sprite}"></div>
    <div class="ap-background">
        <div class="ap-fill gradient-shine">
        </div>
        <p class="ap-value">${enemy.stats.ap.toFixed(1)}%</p>
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
//# sourceMappingURL=enemy.js.map