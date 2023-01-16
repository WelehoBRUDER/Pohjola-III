"use strict";
/*
  Cost means how much mana or health it takes to use the weapon
  By default there's no cost to it.
*/
class Weapon extends Item {
    speed;
    atk;
    slot;
    constructor(weapon) {
        // @ts-ignore
        if (!items[weapon.id])
            throw new Error(`${weapon.id} is not a valid item id.`);
        super(weapon);
        this.type = "weapon";
        this.cost = weapon.cost;
        this.speed = weapon.speed;
        this.atk = weapon.atk;
        this.slot = "weapon";
    }
}
//# sourceMappingURL=weapon.js.map