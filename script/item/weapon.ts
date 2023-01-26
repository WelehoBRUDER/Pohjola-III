/*
  Cost means how much mana or health it takes to use the weapon
  By default there's no cost to it.
*/

interface WeaponObject extends ItemObject {
  [cost: string]: any;
  speed: number;
  atk: number;
  spell_scale?: number;
  scaling?: string;
  slot?: string;
}

class Weapon extends Item {
  [cost: string]: any;
  speed: number;
  atk: number;
  spell_scale?: number;
  scaling?: string;
  slot: string;
  constructor(weapon: WeaponObject) {
    // @ts-ignore
    if (!items[weapon.id]) throw new Error(`${weapon.id} is not a valid item id.`);
    super(weapon);
    this.type = "weapon";
    this.cost = weapon.cost;
    this.speed = weapon.speed;
    this.atk = weapon.atk;
    this.spell_scale = weapon.spell_scale;
    this.scaling = weapon.scaling;
    this.slot = "weapon";
  }

  getSpellScale(): number {
    if (!this.spell_scale || !this.scaling) return 60;
    const playerBoost = player.getStats({ dontUpdateModifiers: true })[this.scaling];
    return this.spell_scale * (1 + playerBoost / 50) + player.getStats({ dontUpdateModifiers: true }).atk;
  }
}
