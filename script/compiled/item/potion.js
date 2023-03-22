"use strict";
class Potion extends Item {
    constructor(potion) {
        // @ts-ignore
        if (!items[potion.id])
            throw new Error(`${potion.id} is not a valid item id.`);
        super(potion);
        // @ts-ignore
        const base = items[potion.id];
        this.type = "potion";
        this.heal = base.heal;
        this.manaRecover = base.manaRecover;
        this.effectsToSelf = base.effectsToSelf;
    }
    drink(user) {
        if (this.heal)
            user.heal(Math.floor(this.heal * (user.allModifiers["healReceivedP"] || 1)));
        if (this.manaRecover)
            user.recoverMana(this.manaRecover, { log: true });
        if (this.effectsToSelf)
            this.effectsToSelf.forEach((effect) => user.addStatus(effect, user));
        if (isInCombat()) {
            if (this.heal) {
                if (user instanceof Player) {
                    createDroppingText(`+${Math.floor(this.heal * (user.allModifiers["healReceivedP"] || 1))} HP`, tools, "heal");
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