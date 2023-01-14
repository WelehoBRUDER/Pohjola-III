"use strict";
class Potion extends Item {
    constructor(potion) {
        super(potion);
        // @ts-ignore
        const base = items[potion.id];
        this.type = "potion";
        this.heal = base.heal;
        this.manaRecover = base.manaRecover;
    }
    drink(user) {
        if (this.heal)
            user.heal(this.heal);
        if (this.manaRecover)
            user.recoverMana(this.manaRecover);
        if (isInCombat()) {
            if (this.heal) {
                if (user instanceof Player) {
                    createDroppingText(`+${this.heal} HP`, tools, "heal");
                }
            }
            if (this.manaRecover) {
                if (user instanceof Player) {
                    createDroppingText(`+${this.manaRecover} MP`, tools, "mana");
                }
            }
            user.stats.ap = 0;
            game.resume();
        }
    }
}
//# sourceMappingURL=potion.js.map