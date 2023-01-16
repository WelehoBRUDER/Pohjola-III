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
var Ability = /** @class */ (function () {
    function Ability(ability) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.id = ability.id;
        this.icon = ability.icon;
        this.mpCost = (_a = ability.mpCost) !== null && _a !== void 0 ? _a : 0;
        this.hpCost = (_b = ability.hpCost) !== null && _b !== void 0 ? _b : 0;
        this.type = ability.type;
        this.weight = (_c = ability.weight) !== null && _c !== void 0 ? _c : 1;
        this.cooldown = (_d = ability.cooldown) !== null && _d !== void 0 ? _d : 0;
        this.onCooldown = (_e = ability.onCooldown) !== null && _e !== void 0 ? _e : 0;
        this.damageType = ability.damageType;
        this.damage = (_f = ability.damage) !== null && _f !== void 0 ? _f : 0;
        this.power = (_g = ability.power) !== null && _g !== void 0 ? _g : 0;
        this.penetration = (_h = ability.penetration) !== null && _h !== void 0 ? _h : 0;
        this.healFlat = (_j = ability.healFlat) !== null && _j !== void 0 ? _j : 0;
        this.healPercent = (_k = ability.healPercent) !== null && _k !== void 0 ? _k : 0;
        if (ability.effectsToEnemy) {
            this.effectsToEnemy = [];
            ability.effectsToEnemy.map(function (effect) {
                // This can't be undefined since we have assigned it above!
                _this.effectsToEnemy.push(new Effect(effects[effect.id]));
            });
        }
        if (ability.effectsToSelf) {
            this.effectsToSelf = [];
            ability.effectsToSelf.map(function (effect) {
                // This can't be undefined since we have assigned it above!
                _this.effectsToSelf.push(new Effect(effects[effect.id]));
            });
        }
        this.doCooldown = function () {
            if (!_this.onCooldown)
                return;
            if (_this.onCooldown > 0) {
                _this.onCooldown -= 1 / 60;
            }
            else if (_this.onCooldown < 0) {
                _this.onCooldown = 0;
            }
        };
        this.setCooldown = function () {
            _this.onCooldown = _this.cooldown;
        };
        this.canUse = function (user) {
            if (_this.onCooldown > 0)
                return false;
            if (_this.mpCost && user.stats.mp < _this.mpCost)
                return false;
            if (_this.hpCost && user.stats.hp < _this.hpCost)
                return false;
            return true;
        };
        this.use = function (user, target) {
            user.stats.ap = 0;
            _this.setCooldown();
            if (_this.mpCost)
                user.stats.mp -= _this.mpCost;
            if (_this.hpCost)
                user.stats.hp -= _this.hpCost;
            if (_this.type === "attack") {
                var _a = user.getCrit(), critRate = _a.critRate, critPower = _a.critPower;
                var damage = calculateDamage(user, target, _this);
                var didCrit = Math.random() < critRate / 100;
                if (didCrit)
                    damage = Math.floor(damage * (1 + critPower / 100));
                if (target.isEnemy) {
                    target.hurt(damage, didCrit);
                }
                else {
                    stats.total_damage_taken += damage;
                    if (stats.most_damage_taken < damage) {
                        stats.most_damage_taken = damage;
                    }
                    player.stats.hp -= damage;
                    createDroppingText(damage.toString(), tools);
                    if (didCrit) {
                        createDroppingText("CRIT!", tools, "crit");
                    }
                    update();
                    shakeScreen();
                }
                if (_this.effectsToEnemy) {
                    _this.effectsToEnemy.forEach(function (effect) {
                        target.addStatus(effect, user, "ability_" + _this.id);
                    });
                }
            }
            else if (_this.type === "heal") {
                if (_this.healFlat || _this.healPercent) {
                    var heal = 0;
                    if (_this.healFlat) {
                        heal += _this.healFlat;
                    }
                    if (_this.healPercent) {
                        heal += Math.floor(target.stats.maxHp * _this.healPercent);
                    }
                    if (target.isEnemy) {
                        target.heal(heal);
                    }
                    else {
                        stats.total_healing += heal;
                        if (stats.most_healing < heal) {
                            stats.most_healing = heal;
                        }
                        player.stats.hp += heal;
                        createDroppingText(heal.toString(), tools);
                        update();
                    }
                }
                if (_this.effectsToSelf) {
                    _this.effectsToSelf.forEach(function (effect) {
                        target.addStatus(effect, user, "ability_" + _this.id);
                    });
                }
                if (user instanceof Player) {
                    healingScreen.classList.add("show");
                    setTimeout(function () {
                        healingScreen.classList.remove("show");
                    }, 200);
                }
            }
            else if (_this.type === "buff") {
                if (_this.effectsToSelf) {
                    _this.effectsToSelf.forEach(function (effect) {
                        target.addStatus(effect, user, "ability_" + _this.id);
                    });
                }
                if (user instanceof Player) {
                    combatScreen.classList.add("buff");
                    setTimeout(function () {
                        combatScreen.classList.remove("buff");
                    }, 200);
                }
            }
            if (user instanceof Player) {
                setTimeout(function () {
                    game.resume();
                }, 300 / game.settings.animation_speed);
            }
            update();
        };
        this.updateStats = function (holder) {
            var id = _this.id;
            var baseStats = __assign({}, abilities[id]);
            id = "ability_" + id;
            Object.entries(_this).forEach(function (_a) {
                var _b, _c, _d;
                var key = _a[0], value = _a[1];
                if (typeof value !== "number" || typeof value === "object")
                    return;
                if (typeof value === "number") {
                    if (key === "onCooldown")
                        return;
                    var bonus = (_c = (_b = holder.allModifiers[id]) === null || _b === void 0 ? void 0 : _b[key + "V"]) !== null && _c !== void 0 ? _c : 0;
                    var modifier = 1 + (((_d = holder.allModifiers[id]) === null || _d === void 0 ? void 0 : _d[key + "P"]) / 100 || 0);
                    var base = baseStats[key] !== undefined ? baseStats[key] : value;
                    _this[key] = +(((base || 0) + bonus) * modifier).toFixed(2);
                }
                else if (typeof value === "object" && !Array.isArray(value)) {
                    _this[key] = __assign({}, updateObject(key, value, holder.allModifiers[id]));
                }
            });
        };
    }
    Ability.prototype.tooltip = function (options) {
        var _this = this;
        var tooltip = "";
        if (options === null || options === void 0 ? void 0 : options.container)
            tooltip += "<ct>ability-container<ct>";
        if (options === null || options === void 0 ? void 0 : options.owner) {
            this.updateStats(options.owner);
        }
        // Define ability name
        tooltip += "<f>1.5rem<f><c>goldenrod<c><i>" + this.icon + "[medium]<i> " + game.getLocalizedString(this.id) + "\n";
        tooltip += "<f>1.2rem<f><c>white<c>";
        // Ability type
        tooltip += game.getLocalizedString("type") + ": " + game.getLocalizedString(this.type) + "\n";
        if (this.power) {
            tooltip += "<i>" + icons.power + "<i>" + game.getLocalizedString("power") + ": " + Math.floor(this.power * 100) + "%\n";
        }
        if (this.healFlat || this.healPercent) {
            if (this.healFlat > 0 && this.healPercent > 0) {
                tooltip += "<i>" + icons.heal + "<i>" + game.getLocalizedString("heal") + ": " + this.healFlat + " + " + this.healPercent + "%\n";
            }
            else if (this.healFlat > 0) {
                tooltip += "<i>" + icons.heal + "<i>" + game.getLocalizedString("heal") + ": " + this.healFlat + "\n";
            }
            else if (this.healPercent > 0) {
                tooltip += "<i>" + icons.heal + "<i>" + game.getLocalizedString("heal") + ": " + this.healPercent + "%\n";
            }
        }
        // Ability attack values
        if (this.damageType) {
            tooltip += game.getLocalizedString("damage_type") + ": <i>" + icons[this.damageType] + "<i>" + game.getLocalizedString(this.damageType) + "\n";
        }
        if (this.penetration) {
            tooltip += game.getLocalizedString("penetration") + ": " + Math.floor(this.penetration * 100) + "%\n";
        }
        // Ability cost
        if (this.mpCost > 0) {
            tooltip += game.getLocalizedString("mp_cost") + ": " + this.mpCost + "\n";
        }
        if (this.hpCost > 0) {
            tooltip += game.getLocalizedString("hp_cost") + ": " + this.hpCost + "\n";
        }
        // Ability cooldown
        if (this.cooldown > 0) {
            tooltip += "<i>" + icons.cooldown + "<i>" + game.getLocalizedString("cooldown") + ": " + this.cooldown + "s\n";
        }
        // Ability effects
        if (this.effectsToEnemy) {
            tooltip += game.getLocalizedString("effects_to_foe") + ": \n";
            this.effectsToEnemy.forEach(function (effect) {
                var _a, _b, _c;
                if (options === null || options === void 0 ? void 0 : options.owner) {
                    var displayEffect = new Effect(effect);
                    displayEffect.init((_c = (_b = (_a = options === null || options === void 0 ? void 0 : options.owner) === null || _a === void 0 ? void 0 : _a.allModifiers) === null || _b === void 0 ? void 0 : _b["ability_" + _this.id]) === null || _c === void 0 ? void 0 : _c["effect_" + effect.id]);
                    tooltip += displayEffect.tooltip({ container: true });
                }
                else {
                    tooltip += effect.tooltip({ container: true });
                }
            });
        }
        if (this.effectsToSelf) {
            tooltip += game.getLocalizedString("effects_to_self") + ": \n";
            this.effectsToSelf.forEach(function (effect) {
                var _a, _b, _c;
                if (options === null || options === void 0 ? void 0 : options.owner) {
                    var displayEffect = new Effect(effect);
                    displayEffect.init((_c = (_b = (_a = options === null || options === void 0 ? void 0 : options.owner) === null || _a === void 0 ? void 0 : _a.allModifiers) === null || _b === void 0 ? void 0 : _b["ability_" + _this.id]) === null || _c === void 0 ? void 0 : _c["effect_" + effect.id]);
                    tooltip += displayEffect.tooltip({ container: true });
                }
                else {
                    tooltip += effect.tooltip({ container: true });
                }
            });
        }
        return tooltip;
    };
    return Ability;
}());
function createAbilitySlot(ability, options, index) {
    if (index === void 0) { index = 0; }
    var slot = document.createElement("div");
    var image = document.createElement("img");
    slot.classList.add("action-slot");
    slot.setAttribute("data-index", index.toString());
    if (ability) {
        slot.setAttribute("data-ability", ability.id);
        image.src = ability.icon;
        if (options === null || options === void 0 ? void 0 : options.manage) {
            slot.append(image);
            tooltip(slot, ability.tooltip({ owner: player }));
            //slot.addEventListener("click", () => useAbility(null, index));
        }
        else {
            var cooldown = document.createElement("div");
            var cooldownValue = document.createElement("p");
            cooldown.classList.add("cooldown");
            cooldownValue.classList.add("cooldown-number");
            slot.append(image, cooldown, cooldownValue);
            tooltip(slot, ability.tooltip({ owner: player }));
            slot.addEventListener("click", function () { return useAbility(null, index); });
        }
    }
    return slot;
}
//# sourceMappingURL=ability.js.map