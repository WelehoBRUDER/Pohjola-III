"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var itemTiers = {
    common: {
        id: "common",
        level: 1,
        color: "#ffffff"
    },
    uncommon: {
        id: "uncommon",
        level: 2,
        color: "#00ff00"
    },
    rare: {
        id: "rare",
        level: 3,
        color: "#006aff"
    },
    epic: {
        id: "epic",
        level: 4,
        color: "#903fe0"
    },
    legendary: {
        id: "legendary",
        level: 5,
        color: "#ffff00"
    },
    perfect: {
        id: "perfect",
        level: 6,
        color: "#ed11ab"
    }
};
var itemTypes = ["weapon", "armor", "consumable", "material"];
var Item = /** @class */ (function () {
    function Item(item) {
        var _a, _b, _c;
        this.id = item.id;
        this.price = item.price;
        this.amount = (_a = item.amount) !== null && _a !== void 0 ? _a : 1;
        this.stackable = (_b = item.stackable) !== null && _b !== void 0 ? _b : false;
        this.unique = (_c = item.unique) !== null && _c !== void 0 ? _c : false;
        this.tier = item.tier;
        this.type = item.type;
        this.modifiers = item.modifiers ? __assign({}, item.modifiers) : {};
        if (item.icon)
            this.icon = item.icon;
    }
    /* Using @ts-ignore because intellisense can't deal with typed object lists */
    Item.prototype.updateClass = function (price) {
        if (this.type === "weapon") {
            return new Weapon(__assign(__assign({}, items[this.id]), { amount: this.amount, price: price !== null && price !== void 0 ? price : this.price }));
        }
        else if (this.type === "armor") {
            return new Armor(__assign(__assign({}, items[this.id]), { amount: this.amount, price: price !== null && price !== void 0 ? price : this.price }));
        }
        else if (this.type === "material") {
            return new Material(__assign(__assign({}, items[this.id]), { amount: this.amount, price: price !== null && price !== void 0 ? price : this.price }));
        }
        else if (this.type === "potion") {
            return new Potion(__assign(__assign({}, items[this.id]), { amount: this.amount, price: price !== null && price !== void 0 ? price : this.price }));
        }
        return this;
    };
    Item.prototype.compare = function (item) {
        var _this = this;
        var _a, _b;
        if (((_b = (_a = player.equipment) === null || _a === void 0 ? void 0 : _a[this.slot]) === null || _b === void 0 ? void 0 : _b.id) === this.id)
            return false;
        if (!item)
            return false;
        var text = "";
        text += "<c>goldenrod<c>" + game.getLocalizedString(this.id) + "\n";
        if (this.atk) {
            var value = this.atk - item.atk;
            if (value !== 0) {
                var color = value > 0 ? "lime" : "red";
                text += "<i>" + icons.atk + "<i><c>white<c> " + game.getLocalizedString("atk") + ": <c>" + color + "<c>" + value + "\n";
            }
        }
        if (this.defence) {
            Object.entries(this.defence).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                var _value = value - item.defence[key];
                if (_value !== 0) {
                    var color = _value > 0 ? "lime" : "red";
                    text += "<i>" + icons[key] + "<i><c>white<c> " + game.getLocalizedString(key) + ": <c>" + color + "<c>" + _value + "%\n";
                }
            });
        }
        if (this.speed !== undefined) {
            var value = this.speed - item.speed;
            if (value !== 0) {
                var color = value > 0 ? "lime" : "red";
                text += "<i>" + icons.speed + "<i><c>white<c> " + game.getLocalizedString("speed") + ": <c>" + color + "<c>" + value + "\n";
            }
        }
        if (this.modifiers && (item === null || item === void 0 ? void 0 : item.modifiers)) {
            var mods = mergeObjects(this.modifiers, item.modifiers, { subtract: true });
            Object.entries(mods).map(function (_a) {
                var key = _a[0], value = _a[1];
                if (!_this.modifiers[key])
                    value = -value;
                if (value === 0)
                    return;
                return (text += " " + effectSyntax(key, value));
            });
        }
        return text;
    };
    Item.prototype.tooltip = function () {
        var tooltip = "<f>1.5rem<f>";
        tooltip += "<c>" + this.tier.color + "<c>" + game.getLocalizedString(this.id) + "\n";
        tooltip += "<f>1.25rem<f><c>white<c>";
        tooltip += game.getLocalizedString("tier") + ": <c>" + this.tier.color + "<c>" + game.getLocalizedString(this.tier.id) + "\n";
        tooltip += "<c>white<c>";
        if (this.type === "weapon") {
            tooltip += "<i>" + icons.atk + "<i> Attack: <c>yellow<c>" + this.atk + "<c>white<c>\n";
        }
        if (this.defence) {
            tooltip += game.getLocalizedString("defences") + ":\n";
            Object.entries(this.defence).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                var color = value < 0 ? "red" : typeColors[key];
                tooltip += "<i>" + icons[key] + "<i> " + game.getLocalizedString(key) + ": <c>" + color + "<c>" + value + "%<c>white<c>\n";
            });
            tooltip += "\n";
        }
        if (this.speed !== undefined) {
            tooltip += "<i>" + icons.speed + "<i> Speed: <c>cyan<c>" + this.speed + "<c>white<c>\n";
        }
        if (this.heal) {
            tooltip += "<i>" + icons.heal + "<i> Heal: <c>green<c>" + this.heal + "<c>white<c>\n";
        }
        if (this.manaRecover) {
            tooltip += "<i>" + icons.manaRecover + "<i> Mana Recover: <c>blue<c>" + this.manaRecover + "<c>white<c>\n";
        }
        tooltip += "Price: <c>gold<c>" + compactNumber(this.price) + "\n";
        if (this.modifiers && Object.keys(this.modifiers).length > 0) {
            tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
            Object.entries(this.modifiers).map(function (_a) {
                var key = _a[0], value = _a[1];
                tooltip += " " + effectSyntax(key, value);
            });
        }
        return tooltip;
    };
    return Item;
}());
var typeColors = {
    physical: "#EEC049",
    magical: "#49CDEE",
    elemental: "#49EE52"
};
//# sourceMappingURL=item.js.map