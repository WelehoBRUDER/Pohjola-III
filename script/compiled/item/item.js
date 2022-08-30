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
        color: "#7d35db",
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
        this.modifiers = item.modifiers ? { ...item.modifiers } : {};
    }
    updateClass() {
        if (this.type === "weapon") {
            return new Weapon({ ...items[this.id], amount: this.amount });
        }
        else if (this.type === "armor") {
            return new Armor({ ...items[this.id], amount: this.amount });
        }
        else if (this.type === "material") {
            return new Material({ ...items[this.id], amount: this.amount });
        }
        return this;
    }
    tooltip() {
        let tooltip = "<f>1.5rem<f>";
        tooltip += `<c>${this.tier.color}<c>${game.getLocalizedString(this.id)}\n`;
        tooltip += "<f>1.25rem<f><c>white<c>";
        if (this.type === "weapon") {
            tooltip += `<i>${icons.atk}<i> Attack: ${this.atk}\n`;
        }
        else if (this.type === "armor") {
            tooltip += `Armor: ${this.armor}\n`;
        }
        if (this.speed !== undefined) {
            tooltip += `<i>${icons.speed}<i> Speed: ${this.speed}\n`;
        }
        tooltip += `Price: ${this.price}`;
        if (this.modifiers && Object.keys(this.modifiers).length > 0) {
            tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
            Object.entries(this.modifiers).map(([key, value]) => {
                tooltip += " " + effectSyntax(key, value);
            });
        }
        return tooltip;
    }
}
//# sourceMappingURL=item.js.map