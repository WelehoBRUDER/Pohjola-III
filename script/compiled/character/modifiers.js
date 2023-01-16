"use strict";
/* Contains functions used to get all status modifiers */
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
var defaultModifiers = {
    expGainP: 1,
    goldGainP: 1,
    luckP: 1,
    physicalDamageP: 1,
    magicalDamageP: 1,
    elementalDamageP: 1,
    speedP: 1,
    allCooldownP: 1,
    physicalDefenceP: 1,
    magicalDefenceP: 1,
    elementalDefenceP: 1,
    physicalDefenceV: 0,
    magicalDefenceV: 0,
    elementalDefenceV: 0
};
function getAllModifiers(char) {
    var _a, _b, _c;
    var modifiers = __assign({}, defaultModifiers);
    char.traits.forEach(function (trait) {
        if (trait.modifiers) {
            Object.entries(trait.modifiers).forEach(function (modifier) {
                applyModifierToTotal(modifier, modifiers);
            });
        }
    });
    (_a = char.perks) === null || _a === void 0 ? void 0 : _a.forEach(function (perk) {
        if (perk.modifiers) {
            Object.entries(perk.modifiers).forEach(function (modifier) {
                applyModifierToTotal(modifier, modifiers);
            });
        }
    });
    (_b = char.skills) === null || _b === void 0 ? void 0 : _b.forEach(function (skill) {
        var mods = skill.getCurrentLevel({ increment: true });
        if (mods === null || mods === void 0 ? void 0 : mods.modifiers) {
            Object.entries(mods.modifiers).forEach(function (modifier) {
                applyModifierToTotal(modifier, modifiers);
            });
        }
    });
    char.statuses.forEach(function (status) {
        if (status.modifiers) {
            Object.entries(status.modifiers).forEach(function (modifier) {
                applyModifierToTotal(modifier, modifiers);
            });
        }
    });
    if ((_c = char.race) === null || _c === void 0 ? void 0 : _c.modifiers) {
        Object.entries(char.race.modifiers).forEach(function (modifier) {
            applyModifierToTotal(modifier, modifiers);
        });
    }
    if (char.equipment) {
        Object.values(char.equipment).forEach(function (item) {
            if (item === null || item === void 0 ? void 0 : item.modifiers) {
                Object.entries(item.modifiers).forEach(function (modifier) {
                    applyModifierToTotal(modifier, modifiers);
                });
            }
        });
    }
    return modifiers;
}
function applyModifierToTotal(modifier, total) {
    var key = modifier[0];
    var value = modifier[1];
    if (!(total === null || total === void 0 ? void 0 : total[key])) {
        total[key] = value;
        if (typeof value === "number") {
            if (key.endsWith("P")) {
                total[key] = 1 + total[key] / 100;
            }
        }
    }
    else if (typeof value === "number") {
        if (key.endsWith("P"))
            total[key] += value / 100;
        else if (key.endsWith("V"))
            total[key] += value;
    }
    else {
        total[key] = mergeObjects(total[key], value);
    }
}
// This function was found here:
// https://stackoverflow.com/a/53509503
var mergeObjects = function (obj1, obj2, options) {
    return Object.entries(obj1).reduce(function (prev, _a) {
        var key = _a[0], value = _a[1];
        if (typeof value === "number") {
            if (options === null || options === void 0 ? void 0 : options.subtract) {
                prev[key] = value - (prev[key] || 0);
                if (!prev[key])
                    prev[key] = value;
            }
            else {
                prev[key] = value + (prev[key] || 0);
            }
        }
        else {
            if (obj2 === undefined)
                obj2 = {};
            prev[key] = mergeObjects(value, obj2[key]);
        }
        return prev;
    }, __assign({}, obj2)); // spread to avoid mutating obj2
};
var updateObject = function (key, object, mods) {
    return Object.entries(object).map(function (_a) {
        var _b, _c, _d;
        var _key = _a[0], value = _a[1];
        if (typeof value === "number") {
            var bonus = (_c = (_b = mods === null || mods === void 0 ? void 0 : mods[key]) === null || _b === void 0 ? void 0 : _b[_key + "V"]) !== null && _c !== void 0 ? _c : 0;
            var modifier = 1 + (((_d = mods === null || mods === void 0 ? void 0 : mods[key]) === null || _d === void 0 ? void 0 : _d[_key + "P"]) / 100 || 0);
            return +(((value || 0) + bonus) * modifier).toFixed(2);
        }
        else if (typeof value === "object") {
            return updateObject(_key, value, mods === null || mods === void 0 ? void 0 : mods[key]);
        }
    });
};
var updateObjectWithoutReturn = function (key, object, mods) {
    return Object.entries(object).map(function (_a) {
        var _b, _c, _d;
        var _key = _a[0], value = _a[1];
        if (typeof value === "number") {
            var bonus = (_c = (_b = mods === null || mods === void 0 ? void 0 : mods[key]) === null || _b === void 0 ? void 0 : _b[_key + "V"]) !== null && _c !== void 0 ? _c : 0;
            var modifier = 1 + (((_d = mods === null || mods === void 0 ? void 0 : mods[key]) === null || _d === void 0 ? void 0 : _d[_key + "P"]) / 100 || 0);
            object[_key] + (((value || 0) + bonus) * modifier).toFixed(2);
        }
        else if (typeof value === "object") {
            return updateObject(_key, value, mods === null || mods === void 0 ? void 0 : mods[key]);
        }
    });
};
//# sourceMappingURL=modifiers.js.map