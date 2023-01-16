"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(enemy) {
        var _a, _b;
        var _this = _super.call(this, enemy) || this;
        _this.index = (_a = enemy.index) !== null && _a !== void 0 ? _a : -1;
        _this.sprite = enemy.sprite;
        _this.card = enemy.card ? __assign({}, enemy.card) : null;
        _this.loot = enemy.loot ? __spreadArray([], enemy.loot) : [];
        _this.isEnemy = true;
        _this.xp = (_b = enemy.xp) !== null && _b !== void 0 ? _b : 0;
        _this.spawnWithEffects = enemy.spawnWithEffects ? __spreadArray([], enemy.spawnWithEffects) : [];
        return _this;
    }
    Enemy.prototype.init = function (index) {
        var _this = this;
        this.restore();
        this.index = index;
        this.abilities.map(function (ability) {
            return (ability = new Ability(__assign({}, ability)));
        });
        if (this.spawnWithEffects) {
            this.spawnWithEffects.map(function (effect) {
                console.log(effect);
                _this.addStatus(effect, _this);
            });
        }
        createBattlecard(this);
    };
    Enemy.prototype.getRandomMove = function () {
        var _this = this;
        var usables = this.abilities.filter(function (ability) {
            return ability.canUse(_this) && (ability.type === "heal" ? _this.stats.hp / _this.getStats().hpMax < 0.5 : true);
        });
        if (usables.length === 0) {
            usables.push(new Ability(__assign({}, abilities.player_base_attack)));
        }
        return usables[Math.floor(Math.random() * usables.length)];
    };
    Enemy.prototype.shake = function () {
        var _this = this;
        var shake = Math.ceil(Math.random() * 9);
        if (this.card) {
            this.card.main.style.animation = "none";
            this.card.main.style.offsetHeight; // trigger reflow
            this.card.main.style.animation = null;
            this.card.main.style.animationDuration = 250 / game.settings.animation_speed + "ms";
            this.card.main.style.animationName = "shake" + shake;
            setTimeout(function () {
                if (_this.card) {
                    _this.card.main.style.animation = "none";
                }
            }, 250 / game.settings.animation_speed);
        }
    };
    Enemy.prototype.die = function () {
        var _this = this;
        stats.total_kills += 1;
        this.stats.hp = 0;
        this.dead = true;
        if (this.card) {
            this.card.main.style.animation = "none";
            this.card.main.style.offsetHeight; // trigger reflow
            this.card.main.style.animation = null;
            this.card.main.style.transition = "all " + 300 / game.settings.animation_speed + "ms";
            this.card.main.style.animationDuration = 3000 / game.settings.animation_speed + "ms";
            this.card.main.style.animationName = "die";
            setTimeout(function () {
                if (_this.card) {
                    //this.card.main.remove();
                    _this.card.main.classList.add("dead");
                }
            }, 2700 / game.settings.animation_speed);
            setTimeout(function () {
                if (_this.card) {
                    _this.card.main.remove();
                    if (combat.getLivingEnemies().length === 0) {
                        combat.end();
                    }
                }
            }, 3000 / game.settings.animation_speed);
        }
    };
    Enemy.prototype.hurt = function (dmg, crit) {
        var _this = this;
        if (crit === void 0) { crit = false; }
        this.stats.hp -= dmg;
        stats.total_damage += dmg;
        if (stats.most_damage < dmg) {
            stats.most_damage = dmg;
        }
        if (this.card) {
            createDroppingText(dmg.toString(), this.card.main);
            if (crit) {
                createDroppingText("CRIT!", this.card.main, "crit");
            }
        }
        this.updateCard();
        this.shake();
        if (this.stats.hp <= 0) {
            setTimeout(function () { return _this.die(); }, 250 / game.settings.animation_speed);
        }
    };
    Enemy.prototype.harm = function (dmg) {
        this.stats.hp -= dmg;
        stats.total_damage += dmg;
        if (stats.most_damage < dmg) {
            stats.most_damage = dmg;
        }
        this.updateCard();
        if (this.stats.hp <= 0) {
            this.die();
        }
    };
    Enemy.prototype.heal = function (amount) {
        this.stats.hp += amount;
        if (this.stats.hp > this.getStats().hpMax) {
            this.stats.hp = this.getStats().hpMax;
        }
        this.updateCard();
    };
    Enemy.prototype.recoverMana = function (amount) {
        this.stats.mp += amount;
        if (this.stats.mp > this.getStats().mpMax) {
            this.stats.mp = this.getStats().mpMax;
        }
        this.updateCard();
    };
    Enemy.prototype.updateStatusEffects = function () {
        var _this = this;
        var _a;
        this.statuses.forEach(function (status) {
            if (status.inflict) {
                status.inflictTimer += 1 / 60;
                if (status.inflictTimer >= 1) {
                    status.inflictTimer = 0;
                    _this.inflict(status);
                }
            }
            if (!status.isInfinite) {
                status.lasts -= 1 / 60;
            }
        });
        for (var i = this.statuses.length - 1; i >= 0; i--) {
            if (this.statuses[i].lasts <= 0 && !this.statuses[i].isInfinite) {
                var statusElem = (_a = this.card) === null || _a === void 0 ? void 0 : _a.status_effects.querySelector(".status-effect[data-id='" + this.statuses[i].id + "']");
                if (statusElem) {
                    statusElem.remove();
                }
                this.statuses.splice(i, 1);
            }
        }
    };
    Enemy.prototype.dropLoot = function () {
        var loot = [];
        if (this.loot) {
            this.loot.forEach(function (item) {
                if (item.gold) {
                    loot.push({ gold: random(item.gold[0], item.gold[1]) });
                }
                else if (Math.random() <= item.chance) {
                    loot.push({ item: __assign({}, item.item), amount: random(item.amount[0], item.amount[1]) });
                }
            });
        }
        return loot;
    };
    Enemy.prototype.act = function () {
        game.pause();
        var move = this.getRandomMove();
        if (move.type === "attack") {
            this.attackAnimation(move);
        }
        else if (move.type === "heal" || move.type === "buff") {
            this.healingAnimation(move, this);
        }
    };
    Enemy.prototype.updateCard = function () {
        var _this = this;
        if (this.card) {
            var stats_1 = this.getStats();
            if (this.stats.hp < 0)
                this.stats.hp = 0;
            var hpRemain = (this.stats.hp / stats_1.hpMax) * 100;
            var _a = this.card, main = _a.main, ap_fill = _a.ap_fill, ap_value = _a.ap_value, hp_fill = _a.hp_fill, hp_late = _a.hp_late, hp_value = _a.hp_value;
            ap_value.innerText = this.stats.ap.toFixed(1) + "%";
            hp_value.innerText = this.stats.hp + "/" + stats_1.hpMax;
            ap_fill.style.width = this.stats.ap + "%";
            hp_fill.style.width = hpRemain + "%";
            hp_late.style.width = hpRemain + "%";
            this.statuses.forEach(function (status) {
                var _a, _b;
                var statusElem = (_a = _this.card) === null || _a === void 0 ? void 0 : _a.status_effects.querySelector(".status-effect[data-id='" + status.id + "']");
                if (!statusElem) {
                    var statusElement = createStatusIcon(status);
                    (_b = _this.card) === null || _b === void 0 ? void 0 : _b.status_effects.appendChild(statusElement);
                }
                else if (statusElem) {
                    var dur = statusElem.querySelector(".duration");
                    if (dur) {
                        dur.innerText = status.isInfinite ? "∞" : status.lasts.toFixed(1) + "s";
                    }
                }
            });
        }
    };
    Enemy.prototype.attack = function () {
        var ability = this.abilities[0];
        this.attackAnimation(ability);
    };
    Enemy.prototype.attackAnimation = function (ability) {
        var _this = this;
        if (this.card) {
            this.card.main.style.animation = "none";
            this.card.main.style.offsetHeight; // trigger reflow
            this.card.main.style.animation = null;
            this.card.main.classList.add("attack");
            this.card.main.style.animationDuration = 1000 / game.settings.animation_speed + "ms";
            this.card.main.style.animationName = "attack";
            setTimeout(function () {
                ability.use(_this, player);
            }, 800 / game.settings.animation_speed);
            setTimeout(function () {
                if (_this.card) {
                    _this.card.main.classList.remove("attack");
                    _this.card.main.style.animation = "none";
                }
            }, 1050 / game.settings.animation_speed);
            setTimeout(function () {
                game.resume();
            }, 1100 / game.settings.animation_speed);
        }
    };
    Enemy.prototype.healingAnimation = function (ability, target) {
        var _this = this;
        if (this.card) {
            this.card.main.style.animation = "none";
            this.card.main.style.offsetHeight; // trigger reflow
            this.card.main.style.animation = null;
            this.card.main.classList.add("heal");
            this.card.main.style.animationDuration = 1000 / game.settings.animation_speed + "ms";
            this.card.main.style.animationName = "heal";
            setTimeout(function () {
                ability.use(_this, target);
            }, 600 / game.settings.animation_speed);
            setTimeout(function () {
                if (_this.card) {
                    _this.card.main.classList.remove("heal");
                    _this.card.main.style.animation = "none";
                }
            }, 1050 / game.settings.animation_speed);
            setTimeout(function () {
                game.resume();
            }, 1100 / game.settings.animation_speed);
        }
    };
    return Enemy;
}(Character));
function createBattlecard(enemy) {
    var battlecard = document.createElement("div");
    battlecard.classList.add("battlecard");
    battlecard.classList.add("enemy");
    if (enemy.index) {
        battlecard.setAttribute("enemy-data-index", enemy.index.toString());
    }
    battlecard.addEventListener("click", function () {
        if (combatScreen.classList.contains("paused"))
            return;
        if (game.state.targeting && game.state.selected_ability) {
            game.pause();
            game.state.selected_ability.use(player, enemy);
            game.endTargeting();
        }
    });
    battlecard.innerHTML = "\n    <div class=\"status-effects\"></div>\n    <div class=\"card\">\n      <div class=\"name\">" + enemy.name + "</div>\n      <div class=\"hp-background\">\n        <div class=\"hp-fill gradient-shine\"></div>\n        <div class=\"hp-late\"></div>\n        <p class=\"hp-value\">" + enemy.stats.hp + "/" + enemy.getStats().hpMax + "</p>\n      </div>\n      <div class=\"sprite\"><img src=\"./gfx/enemies/" + enemy.sprite + "\"></div>\n      <div class=\"ap-background\">\n          <div class=\"ap-fill gradient-shine\">\n          </div>\n          <p class=\"ap-value\">" + enemy.stats.ap.toFixed(1) + "%</p>\n        </div>\n      </div>\n    </div>\n  ";
    enemyContainer.appendChild(battlecard);
    enemy.card = {
        main: battlecard,
        hp_fill: battlecard.querySelector(".hp-fill"),
        hp_late: battlecard.querySelector(".hp-late"),
        hp_value: battlecard.querySelector(".hp-value"),
        ap_fill: battlecard.querySelector(".ap-fill"),
        ap_value: battlecard.querySelector(".ap-value"),
        status_effects: battlecard.querySelector(".status-effects")
    };
}
//# sourceMappingURL=enemy.js.map