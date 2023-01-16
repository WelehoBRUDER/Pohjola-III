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
var defaultEquipment = {
    weapon: new Weapon(__assign({}, items.broken_sword)),
    helmet: null,
    armor: null,
    legs: null
};
var races = {
    human: {
        id: "human",
        modifiers: {
            expGainP: 5
        }
    }
};
var Race = /** @class */ (function () {
    function Race(race) {
        this.id = race.id;
        this.modifiers = race.modifiers;
    }
    return Race;
}());
var defaultPotionPouchMaximums = {
    small_healing_potion: 3,
    medium_healing_potion: 1,
    large_healing_potion: 0,
    small_mana_potion: 3,
    medium_mana_potion: 1,
    large_mana_potion: 0
};
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(char) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var _this = _super.call(this, char) || this;
        _this.inventory = [];
        _this.race = (_a = new Race(char.race)) !== null && _a !== void 0 ? _a : new Race(races.human);
        _this.equipment = (_b = char.equipment) !== null && _b !== void 0 ? _b : defaultEquipment;
        _this.abilities_total = (_c = char.abilities_total) !== null && _c !== void 0 ? _c : [];
        _this.gold = (_d = char.gold) !== null && _d !== void 0 ? _d : 0;
        _this.inventory = (_e = char.inventory) !== null && _e !== void 0 ? _e : [];
        _this.perk_points = (_f = char.perk_points) !== null && _f !== void 0 ? _f : 0;
        _this.skill_points = (_g = char.skill_points) !== null && _g !== void 0 ? _g : 0;
        _this.level = (_h = char.level) !== null && _h !== void 0 ? _h : 1;
        _this.xp = (_j = char.xp) !== null && _j !== void 0 ? _j : 0;
        _this.completed_stages = (_k = char.completed_stages) !== null && _k !== void 0 ? _k : [];
        _this.restoreClasses();
        _this.updateAllModifiers();
        return _this;
    }
    Player.prototype.addItem = function (base_item, amount, options) {
        base_item.amount = amount || base_item.amount || 1;
        var item = base_item.updateClass();
        if (item.stackable) {
            var existing_item = this.inventory.find(function (i) { return i.id === item.id; });
            if (existing_item) {
                existing_item.amount += item.amount;
                if (item.type === "potion") {
                    if (existing_item.amount > player.pouchMax()[item.id]) {
                        existing_item.amount = player.pouchMax()[item.id];
                    }
                }
            }
            else {
                if (item.type === "potion") {
                    if (item.amount > player.pouchMax()[item.id]) {
                        item.amount = player.pouchMax()[item.id];
                    }
                }
                this.inventory.push(item);
            }
        }
        else {
            this.inventory.push(item);
        }
    };
    Player.prototype.removeItem = function (item, amount) {
        var existing_item = this.inventory.find(function (i) { return i.id === item.id; });
        if (existing_item) {
            existing_item.amount -= amount || item.amount || 1;
            if (existing_item.amount <= 0) {
                this.inventory = this.inventory.filter(function (i) { return i.id !== item.id; });
            }
        }
    };
    Player.prototype.equip = function (item, options) {
        var equipment = item.updateClass();
        if (!this.equipment[equipment.slot]) {
            equipment.amount = 1;
            this.equipment[equipment.slot] = equipment;
            if (options === null || options === void 0 ? void 0 : options.removeFromInventory) {
                this.removeItem(item, 1);
            }
        }
        else {
            this.unequip(equipment.slot);
            this.equip(item, options);
        }
    };
    Player.prototype.unequip = function (slot) {
        var item;
        if (slot === "weapon") {
            item = this.equipment.weapon;
            this.equipment.weapon = null;
        }
        else if (slot === "armor") {
            item = this.equipment[slot];
            this.equipment[slot] = null;
        }
        this.addItem(item);
    };
    Player.prototype.addAbility = function (ability) {
        var ability_class = new Ability(ability);
        if (this.abilities.length < 6) {
            this.abilities.push(ability_class);
        }
        else {
            this.abilities_total.push(ability_class);
        }
    };
    Player.prototype.update = function () {
        var _this = this;
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
            var statusElem = playerStatuses.querySelector(".status-effect[data-id='" + status.id + "']");
            if (!statusElem) {
                var statusElement = createStatusIcon(status);
                playerStatuses.appendChild(statusElement);
            }
            else if (statusElem) {
                var dur = statusElem.querySelector(".duration");
                if (dur) {
                    dur.innerText = status.isInfinite ? "∞" : status.lasts.toFixed(1) + "s";
                }
            }
        });
        for (var i = this.statuses.length - 1; i >= 0; i--) {
            if (this.statuses[i].lasts <= 0 && !this.statuses[i].isInfinite) {
                var statusElem = playerStatuses.querySelector(".status-effect[data-id='" + this.statuses[i].id + "']");
                if (statusElem) {
                    statusElem.remove();
                }
                this.statuses.splice(i, 1);
                this.updateAllModifiers();
                console.log(player.getSpeed());
            }
        }
    };
    Player.prototype.reset = function (options) {
        var _a = options !== null && options !== void 0 ? options : {}, restoreHealth = _a.restoreHealth, restoreMana = _a.restoreMana, removeStatuses = _a.removeStatuses;
        var stats = this.getStats();
        if (restoreHealth) {
            this.stats.hp = stats.hpMax;
        }
        if (restoreMana) {
            this.stats.mp = stats.mpMax;
        }
        if (removeStatuses) {
            for (var i = this.statuses.length - 1; i >= 0; i--) {
                var statusElem = playerStatuses.querySelector(".status-effect[data-id='" + this.statuses[i].id + "']");
                if (statusElem) {
                    statusElem.remove();
                }
                this.statuses.splice(i, 1);
                this.updateAllModifiers();
            }
        }
        this.abilities.forEach(function (ability) {
            ability.onCooldown = 0;
        });
        this.stats.ap = 0;
    };
    Player.prototype.assignAbility = function (ability, slot) {
        if (this.abilities.findIndex(function (a) { return a.id === ability.id; }) !== -1)
            return console.warn("You tried to assign an ability that is already assigned. This would have caused a duplicate!");
        this.abilities_total = this.abilities_total.filter(function (a) { return a.id !== ability.id; });
        var old = this.abilities[slot];
        if (old) {
            this.abilities_total.push(old);
        }
        this.abilities[slot] = ability;
        createCharView();
    };
    Player.prototype.unassignAbility = function (slot) {
        var ability = this.abilities[slot];
        if (ability) {
            this.abilities_total.push(ability);
            this.abilities.splice(slot, 1);
        }
        createCharView();
    };
    Player.prototype.xpForNextLevel = function () {
        if (this.level <= 5) {
            return this.level * 10;
        }
        else if (this.level <= 9) {
            return Math.floor(Math.pow(this.level, 1.5) * 10);
        }
        else {
            return Math.floor(Math.pow(this.level, 1.65) * 10) + (this.level - 10) * 100;
        }
    };
    Player.prototype.addXP = function (xp) {
        var _a;
        var boost = (_a = this.allModifiers["expGainP"]) !== null && _a !== void 0 ? _a : 1;
        this.xp += Math.floor(xp * boost);
        stats.total_xp_gained += Math.floor(xp * boost);
        while (this.xp >= this.xpForNextLevel()) {
            this.levelUp();
        }
    };
    Player.prototype.addGold = function (gold) {
        var _a;
        var boost = (_a = this.allModifiers["goldGainP"]) !== null && _a !== void 0 ? _a : 1;
        stats.total_gold_gained += Math.floor(gold * boost);
        this.gold += Math.floor(gold * boost);
    };
    Player.prototype.levelUp = function () {
        if (this.xp >= this.xpForNextLevel()) {
            this.xp -= this.xpForNextLevel();
            this.level += 1;
            this.perk_points += 1;
            this.skill_points += 1;
            this.restore();
        }
        sideBarDetails();
    };
    Player.prototype.restoreClasses = function () {
        var _this = this;
        // @ts-ignore
        this.inventory = this.inventory.map(function (item) { return new Item(items[item.id]).updateClass(); });
        Object.entries(this.equipment).forEach(function (_a) {
            var slot = _a[0], item = _a[1];
            if (item) {
                // @ts-ignore
                _this.equipment[slot] = new Item(items[item.id]).updateClass();
            }
            else {
                _this.equipment[slot] = null;
            }
        });
        this.abilities = this.abilities.map(function (ability) { return new Ability(abilities[ability.id]); });
        this.abilities_total = this.abilities_total.map(function (ability) { return new Ability(abilities[ability.id]); });
    };
    Player.prototype.heal = function (amount) {
        this.stats.hp += amount;
        if (this.stats.hp > this.getStats().hpMax) {
            this.stats.hp = this.getStats().hpMax;
        }
    };
    Player.prototype.recoverMana = function (amount) {
        this.stats.mp += amount;
        if (this.stats.mp > this.getStats().mpMax) {
            this.stats.mp = this.getStats().mpMax;
        }
    };
    Player.prototype.pouchMax = function () {
        var _this = this;
        var _a;
        var max = {
            small_healing_potion: 0,
            medium_healing_potion: 0,
            large_healing_potion: 0,
            small_mana_potion: 0,
            medium_mana_potion: 0,
            large_mana_potion: 0
        };
        var base = __assign({}, defaultPotionPouchMaximums);
        var absolute = (_a = this.allModifiers["potion_pouch_generalV"]) !== null && _a !== void 0 ? _a : 0;
        Object.entries(base).forEach(function (_a) {
            var _b;
            var key = _a[0], value = _a[1];
            var relative = (_b = _this.allModifiers["potion_pouch_" + key + "V"]) !== null && _b !== void 0 ? _b : 0;
            max[key] = value + absolute + relative;
        });
        return max;
    };
    Player.prototype.drinkPotion = function (potion) {
        potion.drink(this);
        this.removeItem(potion, 1);
    };
    return Player;
}(Character));
var player = new Player({
    id: "player",
    name: "Player",
    race: races.human,
    stats: {
        str: 10,
        vit: 10,
        agi: 10,
        int: 10,
        spi: 10,
        hp: 50,
        mp: 30,
        atk: 5,
        hpMax: 0,
        mpMax: 0,
        ap: 0
    },
    defences: {
        physical: 0,
        magical: 0,
        elemental: 0
    },
    resistances: {
        fire: 0,
        ice: 0,
        thunder: 0,
        curse: 0,
        poison: 0,
        bleed: 0,
        divine: 0,
        stun: 0
    },
    equipment: defaultEquipment,
    abilities: [],
    critRate: 3,
    critPower: 50,
    inventory: [],
    abilities_total: [],
    traits: [],
    statuses: [],
    perks: [],
    skills: [],
    gold: 0,
    perk_points: 0,
    skill_points: 0,
    level: 1,
    xp: 0
});
player.updateAllModifiers();
player.abilities.forEach(function (abi) { return abi.updateStats(player); });
player.addItem(new Item(__assign({}, items.small_healing_potion)), 2);
player.addItem(new Item(__assign({}, items.small_mana_potion)), 1);
// player.addItem(new Weapon({ ...items.broken_sword }), 203);
//# sourceMappingURL=player.js.map