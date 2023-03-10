"use strict";
/*
  Cost means how much mana or health it takes to use the weapon
  By default there's no cost to it.
*/
class Weapon extends Item {
    speed;
    atk;
    spell_scale;
    scaling;
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
        this.spell_scale = weapon.spell_scale;
        this.scaling = weapon.scaling;
        this.slot = "weapon";
    }
    getSpellScale() {
        if (!this.spell_scale || !this.scaling)
            return 60;
        const playerBoost = player.getStats({ dontUpdateModifiers: true })[this.scaling];
        return Math.floor(this.spell_scale * (1 + playerBoost / 50) + player.getStats({ dontUpdateModifiers: true }).atk);
    }
}
//# sourceMappingURL=weapon.js.map