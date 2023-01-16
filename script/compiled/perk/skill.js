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
/* I decided to create a skill tree instead of putting skills in perks */
var skills = [];
var Skill = /** @class */ (function () {
    function Skill(skill) {
        var _a;
        if (!skill.levels) {
            skill = __assign(__assign({}, findSkillById(skill.id)), skill);
        }
        this.id = skill.id;
        this.levels = skill.levels ? __spreadArray([], skill.levels) : [];
        this.currentLevel = skill.currentLevel || 0;
        this.icon = skill.icon || icons.placeholder;
        this.requirements = skill.requirements ? __spreadArray([], skill.requirements) : [];
        this.upgrades = skill.upgrades ? __spreadArray([], skill.upgrades) : [];
        this.isOwned = (_a = skill.isOwned) !== null && _a !== void 0 ? _a : false;
        this.modifiers = skill.modifiers ? __assign({}, skill.modifiers) : {};
        this.commands = skill.commands ? __assign({}, skill.commands) : {};
        if (this.upgrades.length > 0) {
            this.upgrades = this.upgrades.map(function (upgrade) { return new Skill(upgrade); });
        }
    }
    Skill.prototype.getCurrentLevel = function (options) {
        var _a;
        var mods = {};
        var lvl = this.isOwned ? this.currentLevel - 1 : (_a = getSkill(this.id)) === null || _a === void 0 ? void 0 : _a.currentLevel;
        if (lvl === undefined)
            return null;
        if (lvl >= this.levels.length)
            lvl = this.levels.length;
        if (options === null || options === void 0 ? void 0 : options.increment)
            lvl++;
        for (var i = 0; i < lvl; i++) {
            mods = mergeObjects(mods, this.levels[i]);
        }
        if (lvl === 0)
            return this.levels[0];
        return mods;
    };
    Skill.prototype.getNextLevel = function () {
        var _a;
        var mods = {};
        var lvl = this.isOwned ? this.currentLevel - 1 : (_a = getSkill(this.id)) === null || _a === void 0 ? void 0 : _a.currentLevel;
        if (!lvl)
            return this.levels[0];
        if (this.levels.length < 2 && lvl === 0)
            return this.levels[0];
        if (lvl > this.levels.length - 1)
            return null;
        for (var i = 0; i < lvl + 1; i++) {
            mods = mergeObjects(mods, this.levels[i]);
        }
        return mods;
    };
    Skill.prototype.available = function () {
        var available = true;
        if (player.skill_points <= 0)
            return false;
        if (this.requirements) {
            this.requirements.forEach(function (req) {
                if (req.skill) {
                    var skill = getSkill(req.skill);
                    if (skill) {
                        if (skill.currentLevel < req.level)
                            return (available = false);
                    }
                    else {
                        return (available = false);
                    }
                }
                else if (req.skill_total) {
                    var skillLevel = getSkillTotalLevel(req.skill_total);
                    if (skillLevel < req.level)
                        return (available = false);
                }
            });
        }
        return available;
    };
    Skill.prototype.assign = function () {
        var _a, _b, _c;
        if (!this.available())
            return;
        var skill = getSkill(this.id);
        if (skill) {
            if (skill.currentLevel > this.levels.length - 1)
                return;
            skill.currentLevel++;
            player.skill_points--;
        }
        else {
            this.currentLevel++;
            player.skill_points--;
            (_a = player.skills) === null || _a === void 0 ? void 0 : _a.push(new Skill(__assign(__assign({}, this), { isOwned: true, upgrades: [] })));
            if ((_b = this.levels[0]) === null || _b === void 0 ? void 0 : _b.commands) {
                Object.entries((_c = this.levels[0]) === null || _c === void 0 ? void 0 : _c.commands).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    game.executeCommand(key, value);
                });
            }
        }
        createSkills();
    };
    Skill.prototype.tooltip = function () {
        var tooltip = "";
        tooltip += "<f>1.5rem<f><c>goldenrod<c>" + game.getLocalizedString(this.id) + "\n";
        tooltip += "<f>1.2rem<f><c>white<c>";
        if (this.requirements.length > 0) {
            tooltip += "Requirements:\n";
            this.requirements.forEach(function (req) {
                if (req.skill) {
                    var skill = getSkill(req.skill);
                    if (skill) {
                        if (skill.currentLevel < req.level) {
                            tooltip += "<c>red<c>" + req.skill + " lvl: " + req.level + "\n";
                        }
                        else {
                            tooltip += "<c>green<c>" + req.skill + " lvl: " + req.level + "\n";
                        }
                    }
                    else {
                        tooltip += "<c>red<c>" + req.skill + " lvl: " + req.level + "\n";
                    }
                }
                if (req.skill_total) {
                    var skill = getSkillTotalLevel(req.skill_total);
                    if (skill < req.level) {
                        tooltip += "<c>red<c>" + game.getLocalizedString(req.skill_total) + " " + game
                            .getLocalizedString("leveled_times")
                            .replace("{times}", req.level) + " \n";
                    }
                    else {
                        tooltip += "<c>green<c>" + game.getLocalizedString(req.skill_total) + " " + game
                            .getLocalizedString("leveled_times")
                            .replace("{times}", req.level) + " \n";
                    }
                }
            });
        }
        var currentLevel = this.getCurrentLevel();
        var nextLevel = this.getNextLevel();
        if (currentLevel) {
            tooltip += "<c>white<c>" + game.getLocalizedString("current_level") + "\n";
            if (currentLevel.commands) {
                Object.entries(currentLevel.commands).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (key === "add_ability") {
                        var ability = new Ability(__assign({}, value));
                        tooltip += "<f>1.3rem<f>" + game.getLocalizedString(key) + ":\n";
                        tooltip += ability.tooltip({ container: true, owner: player });
                        tooltip += "§<nct>-<nct><f>1.2rem<f><c>white<c>\n";
                    }
                });
            }
            if (currentLevel.modifiers) {
                tooltip += "<f>1.2rem<f><c>silver<c>Effects:\n";
                Object.entries(currentLevel.modifiers).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    tooltip += " " + effectSyntax(key, value);
                });
            }
        }
        if (nextLevel) {
            tooltip += "<c>white<c>" + game.getLocalizedString("next_level") + ":\n";
            if (nextLevel.commands) {
                Object.entries(nextLevel.commands).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (key === "add_ability") {
                        var ability = new Ability(__assign({}, value));
                        tooltip += "<f>1.3rem<f>" + game.getLocalizedString(key) + ":\n";
                        tooltip += ability.tooltip({ container: true, owner: player });
                        tooltip += "§<nct>-<nct><f>1.2rem<f><c>white<c>\n";
                    }
                });
            }
            if (nextLevel.modifiers) {
                tooltip += "<f>1.2rem<f><c>silver<c>Effects:\n";
                Object.entries(nextLevel.modifiers).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    tooltip += " " + effectSyntax(key, value);
                });
            }
        }
        return tooltip;
    };
    return Skill;
}());
function getSkill(id) {
    var _a;
    return (_a = player.skills) === null || _a === void 0 ? void 0 : _a.find(function (skill) { return skill.id === id; });
}
function getSkillTotalLevel(id) {
    var _a;
    var totalLevel = 0;
    (_a = player.skills) === null || _a === void 0 ? void 0 : _a.forEach(function (skill) {
        if (skill.id.startsWith(id)) {
            totalLevel += skill.currentLevel;
        }
    });
    return totalLevel;
}
// This has been made in a very stupid way :D
function createSkills() {
    player.updateAllModifiers();
    lobbyContent.innerHTML = "";
    sideBarDetails();
    var SkillTrees = document.createElement("div");
    SkillTrees.classList.add("skill-trees");
    var _skills = skills.map(function (skill) { return new Skill(skill); });
    _skills.forEach(function (skill) {
        var _a;
        var skillWrapper = document.createElement("div");
        var connectorTop = document.createElement("div");
        var connectorBottom = document.createElement("div");
        connectorTop.classList.add("connector-top");
        connectorBottom.classList.add("connector-bottom");
        skillWrapper.classList.add("skill-wrapper");
        skillWrapper.append(connectorTop, connectorBottom);
        var playerSkill = (_a = player.skills) === null || _a === void 0 ? void 0 : _a.find(function (sk) { return sk.id === skill.id; });
        if (playerSkill) {
            skill.currentLevel = playerSkill.currentLevel;
        }
        var skillElement = createSkillElement(skill);
        if (skill.currentLevel >= skill.levels.length) {
            skillElement.classList.add("maxed");
        }
        tooltip(skillElement, skill.tooltip());
        if (!skill.available()) {
            skillElement.classList.add("unavailable");
        }
        skillElement.onclick = function () {
            skill.assign();
        };
        skillWrapper.append(skillElement);
        if (skill.upgrades) {
            var upgrades = skill.upgrades.map(function (skill) { return new Skill(skill); });
            var upgradesWrapper_1 = document.createElement("div");
            upgradesWrapper_1.classList.add("upgrades");
            upgrades.forEach(function (upgrade) {
                var _a;
                var playerUpgrade = (_a = player.skills) === null || _a === void 0 ? void 0 : _a.find(function (sk) { return sk.id === upgrade.id; });
                if (playerUpgrade) {
                    upgrade.currentLevel = playerUpgrade.currentLevel;
                }
                var upgradeElement = createSkillElement(upgrade);
                if (!upgrade.available()) {
                    upgradeElement.classList.add("unavailable");
                }
                upgradeElement.classList.add("upgrade");
                upgradeElement.onclick = function () {
                    upgrade.assign();
                };
                if (upgrade.currentLevel >= upgrade.levels.length) {
                    upgradeElement.classList.add("maxed");
                }
                tooltip(upgradeElement, upgrade.tooltip());
                upgradesWrapper_1.append(upgradeElement);
            });
            skillWrapper.append(upgradesWrapper_1);
        }
        SkillTrees.append(skillWrapper);
    });
    lobbyContent.append(SkillTrees);
}
function createSkillElement(skill) {
    var skillElement = document.createElement("div");
    var skillImage = document.createElement("img");
    var skillLevel = document.createElement("p");
    skillElement.classList.add("skill");
    skillImage.src = skill.icon;
    skillLevel.innerText = skill.currentLevel + "/" + skill.levels.length;
    skillElement.append(skillImage, skillLevel);
    return skillElement;
}
function findSkillById(id) {
    var skill = skills.find(function (s) { return s.id === id; });
    if (!skill) {
        skills.map(function (s) {
            if (s.upgrades) {
                var upgrade = s.upgrades.find(function (u) { return u.id === id; });
                if (upgrade) {
                    skill = upgrade;
                    return false;
                }
            }
        });
    }
    return skill;
}
//# sourceMappingURL=skill.js.map