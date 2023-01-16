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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var Character = /** @class */ (function () {
    function Character(char) {
        var _this = this;
        var _a, _b, _c, _d;
        this.id = char.id;
        this.name = char.name;
        this.stats = __assign({}, char.stats);
        this.defences = __assign({}, char.defences);
        this.resistances = __assign({}, char.resistances);
        this.abilities = char.abilities.map(function (abi) { return new Ability(abi); });
        this.traits = char.traits ? __spreadArray([], char.traits) : [];
        this.statuses = char.statuses ? __spreadArray([], char.statuses) : [];
        this.perks = char.perks ? __spreadArray([], char.perks) : [];
        this.skills = char.skills ? __spreadArray([], char.skills.map(function (ski) { return new Skill(ski); })) : [];
        this.allModifiers = (_a = __assign({}, char.allModifiers)) !== null && _a !== void 0 ? _a : {};
        this.dead = (_b = char.dead) !== null && _b !== void 0 ? _b : false;
        this.critRate = (_c = char.critRate) !== null && _c !== void 0 ? _c : 0;
        this.critPower = (_d = char.critPower) !== null && _d !== void 0 ? _d : 0;
        this.getModifiers = function () {
            return getAllModifiers(_this);
        };
        this.getDefences = function () {
            _this.updateAllModifiers();
            var defences = __assign({}, _this.defences);
            Object.entries(defences).map(function (_a) {
                var _b, _c, _d, _e;
                var key = _a[0], value = _a[1];
                var modifier = (_b = _this.allModifiers[key + "DefenceP"]) !== null && _b !== void 0 ? _b : 1;
                var boost = (_c = _this.allModifiers[key + "DefenceV"]) !== null && _c !== void 0 ? _c : 0;
                modifier += (_d = _this.allModifiers["defenceP"]) !== null && _d !== void 0 ? _d : 0;
                boost += (_e = _this.allModifiers["defenceV"]) !== null && _e !== void 0 ? _e : 0;
                boost += (_this.level | 0) * 0.15; // Level resistance boost
                if (_this.equipment) {
                    Object.entries(_this.equipment).forEach(function (_a) {
                        var _b;
                        var slot = _a[0], item = _a[1];
                        if (item === null || item === void 0 ? void 0 : item.defence) {
                            boost += (_b = item.defence[key]) !== null && _b !== void 0 ? _b : 0;
                        }
                    });
                }
                defences[key] = Math.floor((value + boost) * modifier);
            });
            return defences;
        };
        this.getResistances = function () {
            _this.updateAllModifiers();
            var resistances = __assign({}, _this.resistances);
            Object.entries(resistances).map(function (_a) {
                var _b, _c;
                var key = _a[0], value = _a[1];
                var modifier = (_b = _this.allModifiers[key + "_resistanceP"]) !== null && _b !== void 0 ? _b : 1;
                var boost = (_c = _this.allModifiers[key + "_resistanceV"]) !== null && _c !== void 0 ? _c : 0;
                boost += (_this.level | 0) * 0.2; // Level resistance boost
                resistances[key] = Math.floor((value + boost) * modifier);
            });
            return resistances;
        };
        this.getAbilityModifiers = function () {
            var mods = {};
            Object.entries(_this.allModifiers).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (key.startsWith("ability_")) {
                    key = key.replace("ability_", "");
                    if (mods[key]) {
                        Object.entries(value).forEach(function (_a) {
                            var k = _a[0], v = _a[1];
                            mods[key][k] = v;
                        });
                    }
                    else {
                        mods[key] = value;
                    }
                }
            });
            return mods;
        };
        this.getSpeed = function () {
            var base = 0.4;
            if (_this.equipment)
                base += _this.getEquipmentSpeed();
            var speed = +(1 * (base + _this.getStats({ dontUpdateModifiers: true }).agi / 100) * _this.allModifiers.speedP).toFixed(2);
            return speed > 0 ? speed : 0;
        };
        this.getEquipmentSpeed = function () {
            var speed = 0;
            if (_this.equipment) {
                Object.values(_this.equipment).forEach(function (equip) {
                    speed += (equip === null || equip === void 0 ? void 0 : equip.speed) || 0;
                });
            }
            return speed / 100;
        };
        this.getStats = function (options) {
            var _a, _b, _c, _d;
            if (!(options === null || options === void 0 ? void 0 : options.dontUpdateModifiers))
                _this.updateAllModifiers();
            var stats = __assign({}, _this.stats);
            Object.entries(stats).forEach(function (_a) {
                var _b, _c, _d;
                var key = _a[0], value = _a[1];
                if (key.startsWith("hp") || key.startsWith("mp"))
                    return;
                var increase = (_b = _this.allModifiers[key + "V"]) !== null && _b !== void 0 ? _b : 0;
                var modifier = (_c = _this.allModifiers[key + "P"]) !== null && _c !== void 0 ? _c : 1;
                if (key === "atk") {
                    if ((_d = _this.equipment) === null || _d === void 0 ? void 0 : _d.weapon) {
                        increase += _this.equipment.weapon.atk;
                    }
                    increase += (_this.level || 0) * 0.25;
                }
                var flat = value + increase;
                if (flat < 0) {
                    // If flat value is negative and modifier is less than 1, it will actually increase the value
                    // So we need to make sure that the modifier is at least 1
                    if (modifier < 1) {
                        modifier = 1 + (1 - modifier);
                    }
                }
                stats[key] = Math.round(flat * modifier);
            });
            // Calculate max hp
            var hpIncrease = (_a = _this.allModifiers["hpMaxV"]) !== null && _a !== void 0 ? _a : 0;
            var hpModifier = (_b = _this.allModifiers["hpMaxP"]) !== null && _b !== void 0 ? _b : 1;
            var hpBoost = (_this.level | 0) * 2; // Level health boost
            stats["hpMax"] = Math.round((stats["hpMax"] + hpBoost + hpIncrease + stats["vit"] * 5) * hpModifier);
            // Calculate max mp
            var mpIncrease = (_c = _this.allModifiers["mpMaxV"]) !== null && _c !== void 0 ? _c : 0;
            var mpModifier = (_d = _this.allModifiers["mpMaxP"]) !== null && _d !== void 0 ? _d : 1;
            var mpBoost = (_this.level | 0) * 0.5; // Level mana boost
            stats["mpMax"] = Math.round((stats["mpMax"] + mpBoost + mpIncrease + stats["int"] * 2 + stats["spi"] * 2) * mpModifier);
            return stats;
        };
        this.getCrit = function () {
            var crit = { critRate: _this.critRate, critPower: _this.critPower };
            Object.entries(crit).forEach(function (_a) {
                var _b;
                var key = _a[0], value = _a[1];
                var increase = (_b = _this.allModifiers[key + "V"]) !== null && _b !== void 0 ? _b : 0;
                crit[key] = value + increase;
            });
            crit["critRate"] += _this.getStats().agi / 5;
            return crit;
        };
        this.restore = function () {
            var _a = _this.getStats(), hpMax = _a.hpMax, mpMax = _a.mpMax;
            _this.stats.hp = hpMax;
            _this.stats.mp = mpMax;
        };
        this.updateAllModifiers();
        this.getDamage = function () {
            return _this.getStats().atk;
        };
        this.addStatus = function (status, user, key) {
            var _a, _b, _c, _d;
            var index = _this.statuses.findIndex(function (s) { return s.id === status.id; });
            var effect = new Effect(status);
            if (index === -1) {
                effect.init((_b = (_a = user.allModifiers) === null || _a === void 0 ? void 0 : _a[key]) === null || _b === void 0 ? void 0 : _b["effect_" + status.id]);
                effect.lasts = effect.duration;
                effect.inflictTimer = 0;
                _this.statuses.push(effect);
            }
            else {
                effect.init((_d = (_c = user.allModifiers) === null || _c === void 0 ? void 0 : _c[key]) === null || _d === void 0 ? void 0 : _d["effect_" + status.id]);
                _this.statuses[index].lasts = effect.duration;
            }
            _this.updateAllModifiers();
        };
        this.inflict = function (status) {
            var values = status.inflict;
            if ((values === null || values === void 0 ? void 0 : values.damagePercent) || (values === null || values === void 0 ? void 0 : values.damageFlat)) {
                var damage = 0;
                if (values === null || values === void 0 ? void 0 : values.damagePercent)
                    damage = Math.round(_this.getStats({ dontUpdateModifiers: true }).hpMax * values.damagePercent);
                if (values === null || values === void 0 ? void 0 : values.damageFlat)
                    damage += values.damageFlat;
                var resist = _this.getResistances()[status.type];
                damage = Math.round(damage * (1 - resist / 100)); // This can actually heal the target
                var location_1 = _this.isEnemy ? _this.card.main : tools;
                if (damage === 0) {
                    return createDroppingText("RESIST!", location_1, "resisted");
                }
                if (damage > 0) {
                    if (_this.isEnemy) {
                        _this.harm(damage);
                        stats.total_damage += damage;
                        if (stats.most_damage < damage) {
                            stats.most_damage = damage;
                        }
                    }
                    else {
                        _this.stats.hp -= damage;
                        stats.total_damage_taken += damage;
                        if (stats.most_damage_taken < damage) {
                            stats.most_damage_taken = damage;
                        }
                    }
                    createDroppingText(damage.toString(), location_1, status.type);
                }
                else if (damage < 0) {
                    damage = Math.abs(damage);
                    if (_this.isEnemy) {
                        _this.heal(damage);
                    }
                    else {
                        _this.stats.hp += damage;
                        stats.total_healing += damage;
                    }
                    createDroppingText(damage.toString(), location_1, "heal");
                }
            }
            else if ((values === null || values === void 0 ? void 0 : values.healingFlat) || (values === null || values === void 0 ? void 0 : values.healingPercent)) {
                var healing = 0;
                if (values === null || values === void 0 ? void 0 : values.healingPercent)
                    healing = Math.round(_this.getStats({ dontUpdateModifiers: true }).hpMax * values.healingPercent);
                if (values === null || values === void 0 ? void 0 : values.healingFlat)
                    healing += values.healingFlat;
                if (_this.isEnemy) {
                    _this.heal(healing);
                }
                else {
                    _this.stats.hp += healing;
                    stats.total_healing += healing;
                }
                var location_2 = _this.isEnemy ? _this.card.main : tools;
                createDroppingText(healing.toString(), location_2, status.type);
            }
        };
        // Calculate a rough power level of an enemy / the player
        // IT'S OVER 9000!
        this.calculateCombatPower = function () {
            var powerPerStat = {
                atk: 0.5,
                str: 0.2,
                agi: 0.2,
                vit: 0.2,
                int: 0.2,
                spi: 0.2,
                hpMax: 0.04,
                mpMax: 0.04,
                critRate: 0.1,
                critPower: 0.025,
                physical: 0.2,
                magical: 0.2,
                elemental: 0.2,
                speed: 1
            };
            var powerLevel = 0;
            var stats = _this.getStats();
            var crit = _this.getCrit();
            var defence = _this.getDefences();
            var speed = _this.getSpeed();
            Object.entries(stats).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                powerLevel += value * (powerPerStat[key] || 0);
            });
            Object.entries(crit).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                powerLevel += value * (powerPerStat[key] || 0);
            });
            Object.entries(defence).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                powerLevel += value * (powerPerStat[key] || 0);
            });
            Object.entries(speed).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                powerLevel += value * (powerPerStat[key] || 0);
            });
            if (_this.isEnemy) {
                powerLevel *= 1.2;
            }
            return Math.floor(powerLevel);
        };
    }
    Character.prototype.updateAllModifiers = function () {
        var _this = this;
        this.allModifiers = this.getModifiers();
        this.abilities.forEach(function (abi) {
            abi.updateStats(_this);
            if (_this instanceof Player) {
                var slot = slots.querySelector("[data-ability=\"" + abi.id + "\"]");
                if (slot) {
                    updateTooltip(slot, abi.tooltip({ owner: _this }));
                }
            }
        });
        this.removeDuplicateAbilities();
    };
    Character.prototype.removeDuplicateAbilities = function () {
        var abilities = [];
        this.abilities.forEach(function (abi) {
            var index = abilities.findIndex(function (a) { return a.id === abi.id; });
            if (index === -1) {
                abilities.push(abi);
            }
        });
        this.abilities = abilities;
    };
    return Character;
}());
//# sourceMappingURL=character.js.map