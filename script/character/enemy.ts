interface Card {
  [main: string]: any;
  hp_fill: HTMLDivElement;
  hp_late: HTMLDivElement;
  hp_value: HTMLParagraphElement;
  ap_fill: HTMLDivElement;
  ap_value: HTMLParagraphElement;
}

class Enemy extends Character {
  [sprite: string]: any;
  card?: Card;
  index?: number;
  init?: (index: number) => void;

  constructor(enemy: Enemy) {
    super(enemy);
    this.index = enemy.index ?? -1;
    this.sprite = enemy.sprite;
    this.card = enemy.card;

    this.init = (index: number) => {
      this.restore();
      this.index = index;
      createBattlecard(this);
    };
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
        <p class="ap-value">${enemy.stats.ap.toFixed(2)}%</p>
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
