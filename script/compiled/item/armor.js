"use strict";
class Armor extends Item {
    constructor(armor) {
        super(armor);
        this.type = "armor";
        this.armor = armor.armor;
        this.defence = armor.defence;
        this.speed = armor.speed;
        this.slot = armor.slot;
    }
}
//# sourceMappingURL=armor.js.map