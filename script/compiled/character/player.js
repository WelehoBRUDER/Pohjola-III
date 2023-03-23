"use strict";
const defaultEquipment = {
    weapon: new Weapon({ ...items.broken_sword }),
    helmet: null,
    armor: null,
    legs: null,
    talisman: null,
};
const races = {
    human: {
        id: "human",
        modifiers: {},
    },
};
class Race {
    modifiers;
    constructor(race) {
        this.id = race.id;
        this.modifiers = race.modifiers;
    }
}
class Player extends Character {
    equipment;
    inventory = [];
    abilities_total;
    gold;
    perk_points;
    skill_points;
    level;
    xp;
    completed_stages;
    completed_rooms;
    completed_dungeons;
    starting_aspect;
    key_items;
    class;
    constructor(char) {
        super(char);
        this.race = new Race(char.race) ?? new Race(races.human);
        this.equipment = char.equipment ?? defaultEquipment;
        this.abilities_total = char.abilities_total ?? [];
        this.gold = char.gold ?? 0;
        this.inventory = char.inventory ?? [];
        this.perk_points = char.perk_points ?? 0;
        this.skill_points = char.skill_points ?? 0;
        this.level = char.level ?? 1;
        this.xp = char.xp ?? 0;
        this.completed_stages = char.completed_stages ?? [];
        this.completed_rooms = char.completed_rooms ?? [];
        this.completed_dungeons = char.completed_dungeons ?? [];
        this.starting_aspect = char.starting_aspect ?? "determination";
        this.key_items = char.key_items ?? [];
        this.class = char.class ? new CharClass(char.class) : new CharClass(classManager.get("paladin"));
        this.restoreClasses();
        this.updateAllModifiers();
    }
    addItem(base_item, amount, options) {
        let item = base_item.updateClass();
        item.amount = amount || base_item.amount || 1;
        if (item.slot && options?.forceEquip) {
            player.equip(item, { auto: true });
            item.amount--;
        }
        else if (item.slot && !options?.dontEquip && !player.equipment[item.slot]) {
            player.equip(item, { auto: true });
            item.amount--;
        }
        if (item.amount <= 0)
            return;
        if (item.stackable) {
            let existing_item = this.inventory.find((i) => i.id === item.id);
            if (existing_item) {
                // @ts-ignore
                existing_item.amount += item.amount;
            }
            else {
                this.inventory.push(item);
            }
        }
        else {
            this.inventory.push(item);
        }
    }
    removeItem(item, amount) {
        let existing_item = this.inventory.find((i) => i.id === item.id);
        if (existing_item) {
            // @ts-ignore
            existing_item.amount -= amount || item.amount || 1;
            // @ts-ignore
            if (existing_item.amount <= 0) {
                this.inventory = this.inventory.filter((i) => i.id !== item.id);
            }
        }
    }
    equip(item, options) {
        let equipment = item.updateClass();
        if (!this.equipment[equipment.slot]) {
            equipment.amount = 1;
            this.equipment[equipment.slot] = equipment;
            if (options?.removeFromInventory) {
                this.removeItem(item, 1);
            }
        }
        else {
            this.unequip(equipment.slot);
            this.equip(item, options);
        }
    }
    unequip(slot) {
        let item = this.equipment[slot];
        this.equipment[slot] = null;
        // console.log(slot);
        // if (slot === "weapon") {
        //   item = this.equipment.weapon;
        //   this.equipment.weapon = null;
        // } else if (slot === "armor") {
        //   item = this.equipment[slot];
        //   this.equipment[slot] = null;
        // } else if (slot === "talisman") {
        //   item = this.equipment.talisman;
        //   this.equipment.talisman = null;
        // }
        this.addItem(item, 1, { dontEquip: true });
    }
    addAbility(ability) {
        const ability_class = new Ability(ability);
        if (this.abilities.length < 6) {
            this.abilities.push(ability_class);
        }
        else {
            this.abilities_total.push(ability_class);
        }
    }
    update() {
        this.statuses.forEach((status) => {
            if (status.inflict) {
                status.inflictTimer += 1 / 60;
                if (status.inflictTimer >= 1) {
                    status.inflictTimer = 0;
                    this.inflict(status);
                }
            }
            if (!status.isInfinite) {
                status.lasts -= 1 / 60;
            }
            const statusElem = playerStatuses.querySelector(".status-effect[data-id='" + status.id + "']");
            if (!statusElem) {
                const statusElement = createStatusIcon(status);
                playerStatuses.appendChild(statusElement);
            }
            else if (statusElem) {
                const dur = statusElem.querySelector(".duration");
                if (dur) {
                    dur.innerText = status.isInfinite ? "∞" : status.lasts.toFixed(1) + "s";
                }
            }
        });
        for (let i = this.statuses.length - 1; i >= 0; i--) {
            if (this.statuses[i].lasts <= 0 && !this.statuses[i].isInfinite) {
                const statusElem = playerStatuses.querySelector(".status-effect[data-id='" + this.statuses[i].id + "']");
                if (statusElem) {
                    statusElem.remove();
                }
                this.statuses.splice(i, 1);
                this.updateAllModifiers();
            }
        }
    }
    reset(options) {
        const { restoreHealth, restoreMana, removeStatuses } = options ?? {};
        const stats = this.getStats();
        if (restoreHealth) {
            this.stats.hp = stats.hpMax;
        }
        if (restoreMana) {
            this.stats.mp = stats.mpMax;
        }
        if (removeStatuses) {
            for (let i = this.statuses.length - 1; i >= 0; i--) {
                const statusElem = playerStatuses.querySelector(".status-effect[data-id='" + this.statuses[i].id + "']");
                if (statusElem) {
                    statusElem.remove();
                }
                this.statuses.splice(i, 1);
                this.updateAllModifiers();
            }
        }
        this.abilities.forEach((ability) => {
            ability.onCooldown = 0;
        });
        this.stats.ap = 0;
    }
    assignAbility(ability, slot) {
        if (this.abilities.findIndex((a) => a.id === ability.id) !== -1)
            return console.warn("You tried to assign an ability that is already assigned. This would have caused a duplicate!");
        this.abilities_total = this.abilities_total.filter((a) => a.id !== ability.id);
        const old = this.abilities[slot];
        if (old) {
            this.abilities_total.push(old);
        }
        this.abilities[slot] = ability;
        createCharView();
    }
    unassignAbility(slot) {
        const ability = this.abilities[slot];
        if (ability) {
            this.abilities_total.push(ability);
            this.abilities.splice(slot, 1);
        }
        createCharView();
    }
    xpForNextLevel() {
        if (this.level <= 5) {
            return this.level * 10;
        }
        else if (this.level <= 9) {
            return Math.floor(Math.pow(this.level, 1.5) * 10);
        }
        else {
            return Math.floor(Math.pow(this.level, 1.65) * 10) + (this.level - 10) * 100;
        }
    }
    addXP(xp) {
        const boost = this.allModifiers["expGainP"] ?? 1;
        this.xp += Math.floor(xp * boost);
        stats.total_xp_gained += Math.floor(xp * boost);
        log.write(`${game.getLocalizedString("gained_xp").replace("{0}", xp.toString())}`);
        if (this.level >= 100) {
            return;
        }
        const levelsGained = [];
        while (this.xp >= this.xpForNextLevel() && this.level < 100) {
            this.levelUp();
            levelsGained.push(this.level);
        }
        // ~index is a bitwise NOT operator, which is used to reverse the reversed array again
        if (levelsGained.length > 0) {
            levelsGained.reverse();
            levelsGained.forEach((level, index) => {
                const notifText = game.getLocalizedString("reached_level").replace("{0}", level.toString());
                const logText = game.getLocalizedString("reached_level").replace("{0}", levelsGained.at(~index).toString());
                log.write(logText);
                log.createNotification(notifText, 25);
            });
        }
    }
    addGold(gold) {
        const boost = this.allModifiers["goldGainP"] ?? 1;
        stats.total_gold_gained += Math.floor(gold * boost);
        this.gold += Math.floor(gold * boost);
        log.write(`${game.getLocalizedString("gained_gold").replace("{0}", gold.toString())}`);
    }
    removeGold(gold) {
        this.gold -= gold;
        log.write(`${game.getLocalizedString("lost_gold").replace("{0}", gold.toString())}`);
    }
    levelUp() {
        if (this.level >= 100)
            return;
        if (this.xp >= this.xpForNextLevel()) {
            this.xp -= this.xpForNextLevel();
            this.level += 1;
            this.perk_points += 1;
            this.skill_points += 1;
            if (this.level < 6 || this.level % 5 === 0) {
                this.perk_points += 1;
            }
            this.restore({ bypassChallenges: true });
        }
        sideBarDetails();
    }
    restoreClasses() {
        // @ts-ignore
        this.inventory = this.inventory.map((item) => new Item(items[item.id]).updateClass());
        Object.entries(this.equipment).forEach(([slot, item]) => {
            if (item) {
                // @ts-ignore
                this.equipment[slot] = new Item(items[item.id]).updateClass();
            }
            else {
                this.equipment[slot] = null;
            }
        });
        // @ts-ignore
        this.abilities = this.abilities.map((ability) => new Ability(abilities[ability.id]));
        // @ts-ignore
        this.abilities_total = this.abilities_total.map((ability) => new Ability(abilities[ability.id]));
    }
    heal(amount) {
        amount = Math.floor(amount * challenge("healing_weakness"));
        this.stats.hp += amount;
        log.write(`${game.getLocalizedString("recovered_health").replace("{0}", amount.toString())}`);
        if (this.stats.hp > this.getStats().hpMax) {
            this.stats.hp = this.getStats().hpMax;
        }
    }
    recoverMana(amount, options) {
        this.stats.mp += amount;
        if (options?.log) {
            log.write(`${game.getLocalizedString("recovered_mana").replace("{0}", amount.toString())}`);
        }
        if (this.stats.mp > this.getStats().mpMax) {
            this.stats.mp = this.getStats().mpMax;
        }
    }
    getPerk(id) {
        return this.perks?.find((p) => p.id === id);
    }
    drinkPotion(potion) {
        potion.drink(this);
        this.removeItem(potion, 1);
    }
    addKeyItem(item) {
        if (!this.key_items)
            this.key_items = [];
        if (this.key_items.includes(item))
            return;
        this.key_items.push(item);
    }
    hasItem(item, amount = 1) {
        const owned = this.inventory.find((i) => i.id === item);
        // @ts-ignore
        if (owned?.amount < amount || !owned)
            return false;
        return true;
    }
    hasPerk(perk, level = 1) {
        return this.perks?.findIndex((p) => p.id === perk && p.level >= level) !== -1;
    }
    hasCompletedRoom(room) {
        return this.completed_rooms?.includes(room);
    }
    hasCompletedDungeon(dungeon) {
        return this.completed_dungeons?.includes(dungeon);
    }
    hasKeyItem(item) {
        return this.key_items?.includes(item);
    }
    hasClassPerk(perk) {
        return this.class.perks?.find((p) => p.id === perk) !== undefined;
    }
}
const defaultPlayer = {
    id: "player",
    name: "Player",
    race: races.human,
    stats: {
        str: 9,
        vit: 9,
        agi: 9,
        int: 9,
        spi: 9,
        hp: 50,
        mp: 30,
        atk: 4,
        hpMax: 0,
        mpMax: 0,
        ap: 0,
    },
    defences: {
        physical: 0,
        magical: 0,
        elemental: 0,
    },
    resistances: {
        fire: 0,
        ice: 0,
        thunder: 0,
        curse: 0,
        poison: 0,
        bleed: 0,
        divine: 0,
        stun: 0,
    },
    equipment: defaultEquipment,
    abilities: [],
    critRate: 3,
    critPower: 45,
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
    xp: 0,
    starting_aspect: "strength",
    class: classManager.get("paladin"),
};
let player = new Player({
    ...defaultPlayer,
});
// player.addItem(new Weapon({ ...items.broken_sword }), 203);
//# sourceMappingURL=player.js.map