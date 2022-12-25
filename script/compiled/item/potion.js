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
    }
}
//# sourceMappingURL=potion.js.map