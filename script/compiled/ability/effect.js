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
var Effect = /** @class */ (function () {
    function Effect(effect) {
        this.id = effect.id;
        this.icon = effect.icon;
        this.duration = effect.duration;
        this.type = effect.type;
        this.modifiers = effect.modifiers ? __assign({}, effect.modifiers) : {};
        this.inflict = effect.inflict ? __assign({}, effect.inflict) : {};
        this.isInfinite = effect.isInfinite || false;
    }
    Effect.prototype.tooltip = function (options) {
        var _this = this;
        var tooltip = "";
        if (options === null || options === void 0 ? void 0 : options.container)
            tooltip += "<ct>effect-container<ct>";
        tooltip += "<f>1.5rem<f><c>goldenrod<c><i>" + this.icon + "[medium]<i> " + game.getLocalizedString(this.id) + "\n";
        tooltip += "<f>1.2rem<f><c>white<c>";
        if (this.inflict) {
            Object.entries(this.inflict).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                tooltip += "" + game.getLocalizedString(key + "_first");
                tooltip += " " + (key.includes("Percent") ? value * 100 + "%" : value) + " ";
                tooltip += game.getLocalizedString(key + "_last").replace("[TYPE]", game.getLocalizedString(_this.type)) + "\n";
            });
        }
        // tooltip += `${game.getLocalizedString("type")}: ${game.getLocalizedString(
        //   this.type
        // )}\n`;
        if (!this.isInfinite) {
            tooltip += "<i>" + icons.cooldown + "<i>" + game.getLocalizedString("duration") + ": " + this.duration + "s\n";
        }
        if (this.modifiers && Object.keys(this.modifiers).length > 0) {
            tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
            Object.entries(this.modifiers).map(function (_a) {
                var key = _a[0], value = _a[1];
                tooltip += " " + effectSyntax(key, value);
            });
        }
        return tooltip;
    };
    Effect.prototype.init = function (bonuses) {
        var _this = this;
        if (!bonuses)
            bonuses = {};
        Object.entries(this).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (typeof value === "number") {
                var bonus = (bonuses === null || bonuses === void 0 ? void 0 : bonuses[key + "V"]) || 0;
                var modifier = 1 + ((bonuses === null || bonuses === void 0 ? void 0 : bonuses[key + "P"]) / 100 || 0);
                _this[key] = +((value + bonus) * modifier).toFixed(2);
            }
            else if (typeof value === "object") {
                Object.entries(value).forEach(function (_a) {
                    var _b, _c;
                    var _key = _a[0], _value = _a[1];
                    if (typeof _value === "number") {
                        var bonus = ((_b = bonuses === null || bonuses === void 0 ? void 0 : bonuses[key]) === null || _b === void 0 ? void 0 : _b[_key + "V"]) || 0;
                        var modifier = 1 + (((_c = bonuses === null || bonuses === void 0 ? void 0 : bonuses[key]) === null || _c === void 0 ? void 0 : _c[_key + "P"]) / 100 || 0);
                        _this[key][_key] = +((_value + bonus) * modifier).toFixed(2);
                    }
                    else
                        updateObjectWithoutReturn(_key, _value, bonuses[key]);
                });
            }
        });
        return this;
    };
    return Effect;
}());
//# sourceMappingURL=effect.js.map