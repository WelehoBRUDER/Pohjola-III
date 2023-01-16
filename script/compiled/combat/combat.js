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
function update(options) {
    if (player.stats.hp <= 0) {
        player.stats.hp = 0;
        combat.end();
    }
    if (player.stats.mp < 0) {
        player.stats.mp = 0;
    }
    var playerStats = player.getStats({ dontUpdateModifiers: true });
    if (player.stats.hp > playerStats.hpMax)
        player.stats.hp = playerStats.hpMax;
    if (player.stats.mp > playerStats.mpMax)
        player.stats.mp = playerStats.mpMax;
    var PlayerHealthRemaining = (player.stats.hp / playerStats.hpMax) * 100;
    var PlayerManaRemaining = (player.stats.mp / playerStats.mpMax) * 100;
    playerActionFill.style.width = player.stats.ap + "%";
    playerHPFill.style.width = PlayerHealthRemaining + "%";
    playerMPFill.style.width = PlayerManaRemaining + "%";
    playerHPLate.style.width = PlayerHealthRemaining + "%";
    playerMPLate.style.width = PlayerManaRemaining + "%";
    playerAction.innerText = player.stats.ap.toFixed(1) + "%";
    playerHP.innerText = player.stats.hp + "/" + playerStats.hpMax;
    playerMP.innerText = player.stats.mp + "/" + playerStats.mpMax;
    player.update();
    if (options === null || options === void 0 ? void 0 : options.updatePlayerOnly)
        return;
    combat.time += 1 / game.settings.tick_speed;
    combatTime.textContent = combat.time.toFixed(1) + "s";
    if (game.state.paused)
        return;
    var speed = player.getSpeed();
    player.stats.ap += speed;
    if (player.stats.ap > 100) {
        player.stats.ap = 100;
        combat.turns++;
        update({ updatePlayerOnly: true });
        if (!challenges.real_time_combat) {
            game.pause({ disableSkills: false });
        }
    }
    combat.enemies.forEach(function (enemy) {
        if (enemy.dead || game.state.paused)
            return;
        enemy.updateStatusEffects();
        enemy.stats.ap += enemy.getSpeed();
        enemy.abilities.forEach(function (ability) {
            ability.doCooldown();
        });
        if (enemy.stats.ap > 100) {
            if (player.stats.hp <= 0)
                return;
            enemy.stats.ap = 100;
            enemy.act();
        }
        enemy.updateCard();
    });
    player.abilities.forEach(function (ability, index) {
        ability.doCooldown();
        var slot = slots.children[index];
        var cooldown = slot.querySelector(".cooldown");
        var cooldownValue = slot.querySelector(".cooldown-number");
        cooldown.style.height = (ability.onCooldown / ability.cooldown) * 100 + "%";
        if (ability.onCooldown > 0) {
            cooldownValue.innerText = ability.onCooldown.toFixed(1) + "s";
        }
        else {
            cooldownValue.innerText = "";
        }
        if (ability.onCooldown <= 0 && !ability.canUse(player)) {
            if (!slot.classList.contains("disabled")) {
                slot.classList.add("disabled");
            }
        }
        else {
            if (slot.classList.contains("disabled")) {
                slot.classList.remove("disabled");
            }
        }
    });
}
function createActionSlots() {
    slots.innerHTML = "";
    for (var i = 0; i < 6; i++) {
        var slot = void 0;
        if (player.abilities[i]) {
            var ability = player.abilities[i];
            slot = createAbilitySlot(ability, { manage: false }, i);
        }
        else {
            slot = createAbilitySlot(undefined, { manage: false }, i);
        }
        slots.appendChild(slot);
    }
}
function useAbility(hotkey, index) {
    game.endTargeting();
    var _index = index;
    if (hotkey) {
        // Last char in the string is the index
        _index = +hotkey.substring(hotkey.length - 1);
        _index--;
    }
    if (_index === null || _index === undefined)
        return;
    var ability = player.abilities[_index];
    if (!ability.canUse(player) || player.stats.ap < 100)
        return;
    if (ability.type === "attack") {
        var targets = combat.getLivingEnemies();
        if (targets.length === 1) {
            ability.use(player, targets[0]);
        }
        else {
            console.log("You have multiple targets, please select one");
            game.startTargeting(ability);
        }
    }
    else {
        ability.use(player, player);
    }
}
function shakeScreen() {
    var shake = Math.ceil(Math.random() * 9);
    bloodyScreen.classList.add("show");
    combatScreen.style.animation = "none";
    // @ts-ignore
    combatScreen.style.offsetHeight; // trigger reflow
    // @ts-ignore
    combatScreen.style.animation = null;
    combatScreen.style.animationDuration = 200 / game.settings.animation_speed + "ms";
    combatScreen.style.animationName = "shake" + shake;
    setTimeout(function () {
        combatScreen.style.animation = "none";
        bloodyScreen.classList.remove("show");
    }, 200 / game.settings.animation_speed);
}
function createStatusIcon(status) {
    var statusElement = document.createElement("div");
    var statusIcon = document.createElement("img");
    var statusDuration = document.createElement("p");
    statusElement.classList.add("status-effect");
    statusIcon.classList.add("icon");
    statusDuration.classList.add("duration");
    statusElement.setAttribute("data-id", status.id);
    statusIcon.src = status.icon;
    statusDuration.innerText = status.isInfinite ? "∞" : status.lasts.toFixed(1) + "s";
    statusElement.append(statusIcon, statusDuration);
    tooltip(statusElement, status.tooltip());
    return statusElement;
}
function attack() {
    if (player.stats.ap < 100)
        return;
    var ability = new Ability(__assign({}, abilities.player_base_attack));
    game.endTargeting();
    var targets = combat.getLivingEnemies();
    if (targets.length === 1) {
        ability.use(player, targets[0]);
    }
    else {
        console.log("You have multiple targets, please select one");
        game.startTargeting(ability);
    }
}
function pass() {
    if (player.stats.ap >= 100) {
        player.stats.ap = 0;
        game.state.selected_ability = null;
        game.endTargeting();
        if (!challenges.real_time_combat) {
            game.resume();
        }
    }
}
function defeatedEnemies() {
    var text = "";
    text += "<f>2rem<f><c>goldenrod<c>" + game.getLocalizedString("defeated_enemies") + ":<f>1.5rem<f><c>silver<c>\n";
    combat.loot = lootEnemies(combat.enemies);
    combat.enemies.forEach(function (enemy) {
        text += game.getLocalizedString(enemy.id) + "\n";
    });
    text += "\n<f>2rem<f><c>goldenrod<c>" + game.getLocalizedString("loot_gained") + ":<f>1.5rem<f><c>silver<c>\n";
    combat.loot.forEach(function (item) {
        text += item.amount + "x " + game.getLocalizedString(item.item.id) + "\n";
    });
    text += combat.gold * player.allModifiers["goldGainP"] + "<c>gold<c> " + game.getLocalizedString("gold") + "\n";
    text += "<c>silver<c>" + combat.xp * player.allModifiers["expGainP"] + "<c>lime<c> " + game.getLocalizedString("xp");
    return textSyntax(text);
}
function lootEnemies(enemies) {
    var total = [];
    var loot = [];
    enemies.forEach(function (enemy) {
        combat.xp += enemy.xp || 0;
        enemy.dropLoot().forEach(function (item) {
            total.push(item);
        });
    });
    total.forEach(function (item) {
        if (item.gold)
            combat.gold += item.gold;
        else {
            if (!loot.find(function (i) { return i.item.id === item.item.id; })) {
                loot.push(item);
            }
            else {
                var index = loot.findIndex(function (i) { return i.item.id === item.item.id; });
                loot[index].amount += item.amount;
            }
        }
    });
    return loot;
}
var Combat = /** @class */ (function () {
    function Combat() {
        this.enemies = [];
        this.init();
        this.id = "combat";
        this.time = 0;
        this.loot = [];
        this.gold = 0;
        this.xp = 0;
        this.turns = 0;
        this.defeat = false;
    }
    Combat.prototype.init = function () { };
    Combat.prototype.getLivingEnemies = function () {
        return this.enemies.filter(function (enemy) { return !enemy.dead; });
    };
    Combat.prototype.createCombat = function (enemies) {
        this.time = 0;
        this.enemies = enemies;
        this.loot = [];
        this.gold = 0;
        this.xp = 0;
        this.turns = 0;
        this.defeat = false;
        enemyContainer.innerHTML = "";
        combatSummaryBackground.classList.add("hide");
        this.enemies.forEach(function (enemy) {
            // @ts-ignore
            enemy.init();
        });
        game.resume();
    };
    Combat.prototype.end = function () {
        game.pause({ disableSkills: true });
        combatSummaryBackground.classList.remove("hide");
        combatSummaryButtons.innerHTML = "";
        combatSummaryText.innerHTML = "";
        if (this.getLivingEnemies().length === 0) {
            combatSummaryTitle.innerText = game.getLocalizedString("combat_victory");
            combatSummaryTitle.classList.value = "header victory";
            combatSummaryText.append(defeatedEnemies());
            combatSummaryButtons.innerHTML = "<button class=\"main-button\" onclick=\"combat.finish_combat()\">" + game.getLocalizedString("continue") + "</button>";
        }
        else {
            this.defeat = true;
            stats.total_deaths += 1;
            this.xp = Math.ceil(player.xp * (random(50, 70) / 100));
            combatSummaryTitle.innerText = game.getLocalizedString("combat_defeat");
            combatSummaryTitle.classList.value = "header defeat";
            combatSummaryText.append(game.getLocalizedString("combat_defeat_text") + "\n");
            combatSummaryText.append(game.getLocalizedString("you_lost") + (" -" + this.xp + " " + game.getLocalizedString("xp") + "!"));
            combatSummaryButtons.innerHTML = "<button class=\"main-button\" onclick=\"combat.finish_combat()\">" + game.getLocalizedString("continue") + "</button>";
        }
    };
    Combat.prototype.finish_combat = function () {
        stats.total_combat_time += +this.time.toFixed(1);
        stats.total_turns += this.turns;
        if (this.time > stats.most_combat_time)
            stats.most_combat_time = +this.time.toFixed(1);
        if (this.turns > stats.most_turns)
            stats.most_turns = this.turns;
        if (this.defeat) {
            player.xp -= this.xp;
        }
        else {
            if (!player.completed_stages.includes(currentStage)) {
                player.completed_stages.push(currentStage);
            }
            player.addGold(this.gold);
            player.addXP(this.xp);
            this.loot.forEach(function (item) {
                player.addItem(new Item(__assign({}, item.item)), item.amount);
            });
        }
        if (!challenges.no_after_combat_recovery) {
            player.restore();
        }
        this.gold = 0;
        this.xp = 0;
        this.loot = [];
        this.enemies = [];
        player.reset({ removeStatuses: true });
        combatSummaryBackground.classList.add("hide");
        game.endCombatAndGoToLobby();
    };
    return Combat;
}());
var combat = new Combat();
var pouchState = { open: false };
function openPouch() {
    if (pouchState.open)
        return closePouch();
    pouchState.open = true;
    pouchBackground.classList.remove("hide");
    pouchBackground.innerHTML = "";
    pouchBackground.append(pouch());
}
function closePouch() {
    pouchState.open = false;
    pouchBackground.classList.add("hide");
}
function pouch() {
    var pouch = document.createElement("div");
    pouch.classList.add("pouch");
    pouch.innerHTML = "<div class=\"pouch-header\"><h1 class=\"header\">" + game.getLocalizedString("pouch") + "</h1><button class=\"close-button\" onclick=\"closePouch()\">X</button></div>";
    pouch.append(pouchItems());
    return pouch;
}
function pouchItems() {
    var pouchItems = document.createElement("div");
    player.inventory.forEach(function (item) {
        if (item.type === "potion") {
            pouchItems.append(createSlot(item));
        }
    });
    pouchItems.classList.add("pouch-items");
    return pouchItems;
}
// game.initCombat([new Enemy({ ...enemies.skeleton }), new Enemy({ ...enemies.skeleton }), new Enemy({ ...enemies.skeleton })]);
//# sourceMappingURL=combat.js.map