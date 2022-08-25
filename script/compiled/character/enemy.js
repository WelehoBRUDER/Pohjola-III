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
    hurt(dmg) {
        this.stats.hp -= dmg;
        if (this.card) {
            createDroppingText(dmg.toString(), this.card.main);
        }
        this.updateCard();
        this.shake();
        if (this.stats.hp <= 0) {
            setTimeout(() => this.die(), 250 / game.settings.animation_speed);
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
            game.state.selected_ability.use(player, enemy);
            game.endTargeting();
        }
    });
    battlecard.innerHTML = `
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
    };
}
//# sourceMappingURL=enemy.js.map