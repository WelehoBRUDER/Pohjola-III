/*
  Cost means how much mana or health it takes to use the weapon
  By default there's no cost to it.
*/

interface WeaponObject extends ItemObject {
  [cost: string]: any;
  speed: number;
  atk: number;
  slot?: string;
}

class Weapon extends Item {
  [cost: string]: any;
  speed: number;
  atk: number;
  slot: string;
  constructor(weapon: WeaponObject) {
    super(weapon);
    this.type = "weapon";
    this.cost = weapon.cost;
    this.speed = weapon.speed;
    this.atk = weapon.atk;
    this.slot = "weapon";
  }
}
