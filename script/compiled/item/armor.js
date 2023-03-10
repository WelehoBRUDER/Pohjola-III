"use strict";
class Armor extends Item {
    speed;
    defence;
    slot;
    constructor(armor) {
        // @ts-ignore
        if (!items[armor.id])
            throw new Error(`${armor.id} is not a valid item id.`);
        super(armor);
        this.type = "armor";
        this.armor = armor.armor;
        this.defence = armor.defence;
        this.speed = armor.speed;
        this.slot = armor.slot;
    }
}
//# sourceMappingURL=armor.js.map