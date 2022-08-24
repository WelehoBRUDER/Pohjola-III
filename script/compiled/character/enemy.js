"use strict";
class Enemy extends Character {
    constructor(enemy) {
        super(enemy);
        this.index = enemy.index ?? -1;
        this.sprite = enemy.sprite;
        this.damages = { ...enemy.damages };
        this.card = enemy.card;
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
    act() {
        game.pause();
        console.log("I take action, ok?");
        this.attack();
    }
    attack() {
        let dmg = calculateDamage(this, player, this.abilities[0]);
        this.attackAnimation(dmg);
    }
    attackAnimation(dmg) {
        if (this.card) {
            this.card.main.style.animation = "none";
            this.card.main.style.offsetHeight; // trigger reflow
            this.card.main.style.animation = null;
            this.card.main.classList.add("attack");
            this.card.main.style.animationDuration = `${1000 / game.settings.animation_speed}ms`;
            this.card.main.style.animationName = "attack";
            setTimeout(() => {
                player.stats.hp -= dmg;
                update();
                shakeScreen();
            }, 800 / game.settings.animation_speed);
            setTimeout(() => {
                if (this.card) {
                    this.card.main.classList.remove("shake");
                    this.card.main.style.animation = "none";
                }
            }, 1000 / game.settings.animation_speed);
            setTimeout(() => {
                this.stats.ap = 0;
                game.resume();
            }, 1050 / game.settings.animation_speed);
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
        <p class="ap-value">${enemy.stats.ap.toFixed(2)}%</p>
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