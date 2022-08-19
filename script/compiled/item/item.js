"use strict";
const itemTiers = {
    common: {
        id: "common",
        level: 1,
        color: "#ffffff",
    },
    uncommon: {
        id: "uncommon",
        level: 2,
        color: "#00ff00",
    },
    rare: {
        id: "rare",
        level: 3,
        color: "#0000ff",
    },
    epic: {
        id: "epic",
        level: 4,
        color: "#ff0000",
    },
    legendary: {
        id: "legendary",
        level: 5,
        color: "#ffff00",
    },
};
const itemTypes = ["weapon", "armor", "consumable", "material"];
class Item {
    constructor(item) {
        this.id = item.id;
        this.price = item.price;
        this.amount = item.amount ?? 1;
        this.stackable = item.stackable ?? false;
        this.unique = item.unique ?? false;
        this.tier = item.tier;
        this.type = item.type;
        this.modifiers = item.modifiers || {};
    }
}
//# sourceMappingURL=item.js.map