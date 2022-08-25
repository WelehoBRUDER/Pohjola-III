interface Card {
  [main: string]: any;
  hp_fill: HTMLDivElement;
  hp_late: HTMLDivElement;
  hp_value: HTMLParagraphElement;
  ap_fill: HTMLDivElement;
  ap_value: HTMLParagraphElement;
}

interface EnemyBase extends Character {
  [sprite: string]: any;
  damages: I_Damage;
  card?: Card;
  index?: number;
}

class Enemy extends Character {
  [sprite: string]: any;
  damages: I_Damage;
  card?: Card;
  index?: number;

  constructor(enemy: EnemyBase) {
    super(enemy);
    this.index = enemy.index ?? -1;
    this.sprite = enemy.sprite;
    this.damages = { ...enemy.damages };
    this.card = enemy.card;
  }

  init(index: number): void {
    this.restore();
    this.index = index;
    createBattlecard(this);
  }

  shake(): void {
    let shake = Math.ceil(Math.random() * 9);
    if (this.card) {
      this.card.main.style.animation = "none";
      this.card.main.style.offsetHeight; // trigger reflow
      this.card.main.style.animation = null;
      this.card.main.style.animationDuration = `${
        250 / game.settings.animation_speed
      }ms`;
      this.card.main.style.animationName = "shake" + shake;
      setTimeout(() => {
        if (this.card) {
          this.card.main.style.animation = "none";
        }
      }, 250 / game.settings.animation_speed);
    }
  }

  act(): void {
    game.pause();
    console.log("I take action, ok?");
    this.attack();
  }

  attack(): void {
    let dmg = calculateDamage(this, player, this.abilities[0]);
    this.attackAnimation(dmg);
  }

  attackAnimation(dmg: number): void {
    if (this.card) {
      this.card.main.style.animation = "none";
      this.card.main.style.offsetHeight; // trigger reflow
      this.card.main.style.animation = null;
      this.card.main.classList.add("attack");
      this.card.main.style.animationDuration = `${
        1000 / game.settings.animation_speed
      }ms`;
      this.card.main.style.animationName = "attack";
      setTimeout(() => {
        player.stats.hp -= dmg;
        createDroppingText(dmg.toString(), tools);
        update();
        shakeScreen();
      }, 800 / game.settings.animation_speed);
      setTimeout(() => {
        if (this.card) {
          this.card.main.classList.remove("shake");
          this.card.main.style.animation = "none";
        }
      }, 1050 / game.settings.animation_speed);
      setTimeout(() => {
        this.stats.ap = 0;
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
    hp_fill: battlecard.querySelector(".hp-fill") as HTMLDivElement,
    hp_late: battlecard.querySelector(".hp-late") as HTMLDivElement,
    hp_value: battlecard.querySelector(".hp-value") as HTMLParagraphElement,
    ap_fill: battlecard.querySelector(".ap-fill") as HTMLDivElement,
    ap_value: battlecard.querySelector(".ap-value") as HTMLParagraphElement,
  };
}
