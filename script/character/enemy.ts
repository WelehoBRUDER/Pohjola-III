class Enemy extends Character {
  [sprite: string]: any;
  constructor(enemy: Enemy) {
    super(enemy);
    this.sprite = enemy.sprite;
  }
}
