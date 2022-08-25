/*
  Cost means how much mana or health it takes to use the weapon
  By default there's no cost to it.
*/

class Weapon extends Item {
  [cost: string]: any;
  speed: number;
  atk: number;
  constructor(weapon: Weapon) {
    super(weapon);
    this.type = "weapon";
    this.cost = weapon.cost;
    this.speed = weapon.speed;
    this.atk = weapon.atk;
  }
}
