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
    compare(item) {
        if (!item)
            return false;
        let text = "";
        text += `<c>goldenrod<c>${game.getLocalizedString("effective_change")}:\n`;
        if (this.atk) {
            const value = this.atk - item.atk;
            const color = value > 0 ? "lime" : value === 0 ? "white" : "red";
            text += `<i>${icons.atk}<i><c>white<c> ${game.getLocalizedString("atk")}: <c>${color}<c>${value}\n`;
        }
        if (this.defence) {
            Object.entries(this.defence).forEach(([key, value]) => {
                const _value = value - item.defence[key];
                const color = _value > 0 ? "lime" : _value === 0 ? "white" : "red";
                text += `<i>${icons[key]}<i><c>white<c> ${game.getLocalizedString(key)}: <c>${color}<c>${_value}\n`;
            });
        }
        if (this.speed !== undefined) {
            const value = this.speed - item.speed;
            const color = value > 0 ? "lime" : value === 0 ? "white" : "red";
            text += `<i>${icons.speed}<i><c>white<c> ${game.getLocalizedString("speed")}: <c>${color}<c>${value}\n`;
        }
        if (this.modifiers && item?.modifiers) {
            const mods = mergeObjects(item.modifiers, this.modifiers, { subtract: true });
            Object.entries(mods).map(([key, value]) => {
                return (text += " " + effectSyntax(key, value));
            });
        }
        return text;
    }
    tooltip() {
        let tooltip = "<f>1.5rem<f>";
        tooltip += `<c>${this.tier.color}<c>${game.getLocalizedString(this.id)}\n`;
        tooltip += "<f>1.25rem<f><c>white<c>";
        tooltip += `${game.getLocalizedString("tier")}: <c>${this.tier.color}<c>${game.getLocalizedString(this.tier.id)}\n`;
        tooltip += "<c>white<c>";
        if (this.type === "weapon") {
            tooltip += `<i>${icons.atk}<i> Attack: ${this.atk}\n`;
        }
        if (this.defence) {
            tooltip += `${game.getLocalizedString("defences")}:\n`;
            Object.entries(this.defence).forEach(([key, value]) => {
                tooltip += `<i>${icons[key]}<i> ${game.getLocalizedString(key)}: ${value}\n`;
            });
            tooltip += "\n";
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