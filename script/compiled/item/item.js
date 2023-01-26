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
        color: "#006aff",
    },
    epic: {
        id: "epic",
        level: 4,
        color: "#903fe0",
    },
    legendary: {
        id: "legendary",
        level: 5,
        color: "#ffff00",
    },
    perfect: {
        id: "perfect",
        level: 6,
        color: "#ed11ab",
    },
};
const itemTypes = ["weapon", "armor", "consumable", "material"];
class Item {
    price;
    amount;
    stackable;
    unique;
    tier;
    type;
    icon;
    modifiers;
    constructor(item) {
        // @ts-ignore
        if (!items[item.id])
            throw new Error(`${item.id} is not a valid item id.`);
        this.id = item.id;
        this.price = item.price;
        this.amount = item.amount ?? 1;
        this.stackable = item.stackable ?? false;
        this.unique = item.unique ?? false;
        this.tier = item.tier;
        this.type = item.type;
        this.modifiers = item.modifiers ? { ...item.modifiers } : {};
        if (item.icon)
            this.icon = item.icon;
    }
    /* Using @ts-ignore because intellisense can't deal with typed object lists */
    updateClass(price) {
        if (this.type === "weapon") {
            return new Weapon({
                // @ts-ignore
                ...items[this.id],
                amount: this.amount,
                price: price ?? this.price,
            });
        }
        else if (this.type === "armor") {
            return new Armor({
                // @ts-ignore
                ...items[this.id],
                amount: this.amount,
                price: price ?? this.price,
            });
        }
        else if (this.type === "material") {
            return new Material({
                // @ts-ignore
                ...items[this.id],
                amount: this.amount,
                price: price ?? this.price,
            });
        }
        else if (this.type === "potion") {
            return new Potion({
                // @ts-ignore
                ...items[this.id],
                amount: this.amount,
                price: price ?? this.price,
            });
        }
        else if (this.type === "talisman") {
            return new Talisman({
                // @ts-ignore
                ...items[this.id],
                amount: this.amount,
                price: price ?? this.price,
            });
        }
        return this;
    }
    compare(item) {
        if (player.equipment?.[this.slot]?.id === this.id)
            return false;
        if (!item)
            return false;
        let text = "";
        text += `<c>goldenrod<c>${game.getLocalizedString(this.id)}\n`;
        if (this.atk) {
            const value = this.atk - item.atk;
            if (value !== 0) {
                const color = value > 0 ? "lime" : "red";
                text += `<i>${icons.atk}<i><c>white<c> ${game.getLocalizedString("atk")}: <c>${color}<c>${value}\n`;
            }
        }
        if (this.spell_scale) {
            const value = this.getSpellScale() - item.getSpellScale();
            if (value !== 0) {
                const color = value > 0 ? "lime" : "red";
                text += `<i>${icons.spell_scale}<i><c>white<c> ${game.getLocalizedString("spell_scale")}: <c>${color}<c>${value}\n`;
            }
        }
        if (this.defence) {
            Object.entries(this.defence).forEach(([key, value]) => {
                const _value = value - item.defence[key];
                if (_value !== 0) {
                    const color = _value > 0 ? "lime" : "red";
                    text += `<i>${icons[key]}<i><c>white<c> ${game.getLocalizedString(key)}: <c>${color}<c>${_value}%\n`;
                }
            });
        }
        if (this.speed !== undefined) {
            const value = this.speed - item.speed;
            if (value !== 0) {
                const color = value > 0 ? "lime" : "red";
                text += `<i>${icons.speed}<i><c>white<c> ${game.getLocalizedString("speed")}: <c>${color}<c>${value}\n`;
            }
        }
        if (this.modifiers && item?.modifiers) {
            const mods = mergeObjects(this.modifiers, item.modifiers, { subtract: true });
            Object.entries(mods).map(([key, value]) => {
                if (!this.modifiers[key])
                    value = -value;
                if (value === 0)
                    return;
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
            tooltip += `<i>${icons.atk}<i> Attack: <c>yellow<c>${this.atk}<c>white<c>\n`;
            if (this.spell_scale) {
                tooltip += `<i>${icons.scaling}<i> Scaling: <c>yellow<c><i>${icons[this.scaling]}<i>${this.scaling}<c>white<c>\n`;
                tooltip += `<i>${icons.spell_scale}<i> Spell Scale: <c>yellow<c>${this.getSpellScale()}<c>white<c>\n`;
            }
        }
        if (this.defence) {
            tooltip += `${game.getLocalizedString("defences")}:\n`;
            Object.entries(this.defence).forEach(([key, value]) => {
                const color = value < 0 ? "red" : typeColors[key];
                tooltip += `<i>${icons[key]}<i> ${game.getLocalizedString(key)}: <c>${color}<c>${value}%<c>white<c>\n`;
            });
            tooltip += "\n";
        }
        if (this.speed !== undefined) {
            tooltip += `<i>${icons.speed}<i> Speed: <c>cyan<c>${this.speed}<c>white<c>\n`;
        }
        if (this.heal) {
            tooltip += `<i>${icons.heal}<i> Heal: <c>green<c>${this.heal}<c>white<c>\n`;
        }
        if (this.manaRecover) {
            tooltip += `<i>${icons.manaRecover}<i> Mana Recover: <c>blue<c>${this.manaRecover}<c>white<c>\n`;
        }
        tooltip += `Price: <c>gold<c>${compactNumber(this.price)}\n`;
        if (this.modifiers && Object.keys(this.modifiers).length > 0) {
            tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
            Object.entries(this.modifiers).map(([key, value]) => {
                tooltip += " " + effectSyntax(key, value);
            });
        }
        if (this.effectsToSelf) {
            tooltip += `<c>white<c>${game.getLocalizedString("effects_to_self")}: \n`;
            this.effectsToSelf.forEach((effect) => {
                const displayEffect = new Effect(effect);
                tooltip += displayEffect.tooltip({ container: true });
            });
        }
        return tooltip;
    }
}
const typeColors = {
    physical: "#EEC049",
    magical: "#49CDEE",
    elemental: "#49EE52",
};
//# sourceMappingURL=item.js.map