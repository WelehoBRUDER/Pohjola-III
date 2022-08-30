"use strict";
const defaultEquipment = {
    weapon: { ...items.broken_sword },
    armor: null,
    helmet: null,
    legs: null,
};
const races = {
    human: {
        id: "human",
        modifiers: {
            expGainP: 5,
        },
    },
};
class Race {
    constructor(race) {
        this.id = race.id;
        this.modifiers = race.modifiers;
    }
}
class Player extends Character {
    constructor(char) {
        super(char);
        this.inventory = [];
        this.race = new Race(char.race) ?? new Race(races.human);
        this.equipment = char.equipment ?? defaultEquipment;
        this.abilities_total = char.abilities_total ?? [];
        this.gold = char.gold ?? 0;
        this.perk_points = char.perk_points ?? 0;
        this.skill_points = char.skill_points ?? 0;
        this.updateAllModifiers();
    }
    addItem(base_item, amount) {
        base_item.amount = amount || base_item.amount || 1;
        let item = base_item.updateClass();
        if (item.type === "weapon" || item.type === "armor") {
            return this.equip(item, { auto: true, removeFromInventory: true });
        }
        if (item.stackable) {
            let existing_item = this.inventory.find((i) => i.id === item.id);
            if (existing_item) {
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
            existing_item.amount -= amount || item.amount || 1;
            if (existing_item.amount <= 0) {
                this.inventory = this.inventory.filter((i) => i.id !== item.id);
            }
        }
    }
    equip(item, options) {
        if (item.type === "weapon") {
            if (!this.equipment.weapon && options?.auto) {
                this.equipment.weapon = item;
            }
            else {
                this.addItem({ ...this.equipment.weapon });
                this.equipment.weapon = item;
            }
        }
        else if (item.type === "armor") {
            if (!this.equipment[item.slot] && options?.auto) {
                this.equipment[item.slot] = item;
            }
            else {
                this.addItem({ ...this.equipment[item.slot] });
                this.equipment.weapon = item;
            }
        }
        if (options?.removeFromInventory) {
            this.removeItem(item);
        }
    }
    unequip(slot) {
        let item;
        if (slot === "weapon") {
            item = this.equipment.weapon;
            this.equipment.weapon = null;
        }
        else if (slot === "armor") {
            item = this.equipment[slot];
            this.equipment[slot] = null;
        }
        this.addItem(item);
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
            status.lasts -= 1 / 60;
            if (status.inflict) {
                status.inflictTimer += 1 / 60;
                if (status.inflictTimer >= 1) {
                    status.inflictTimer = 0;
                    this.inflict(status);
                }
            }
            const statusElem = playerStatuses.querySelector(".status-effect[data-id='" + status.id + "']");
            if (!statusElem) {
                const statusElement = createStatusIcon(status);
                playerStatuses.appendChild(statusElement);
            }
            else if (statusElem) {
                const dur = statusElem.querySelector(".duration");
                if (dur) {
                    dur.innerText = status.lasts.toFixed(1) + "s";
                }
            }
        });
        for (let i = this.statuses.length - 1; i >= 0; i--) {
            if (this.statuses[i].lasts <= 0) {
                const statusElem = playerStatuses.querySelector(".status-effect[data-id='" + this.statuses[i].id + "']");
                if (statusElem) {
                    statusElem.remove();
                }
                this.statuses.splice(i, 1);
            }
        }
    }
    reset(options) {
        const { restoreHealth, restoreMana } = options ?? {};
        const stats = this.getStats();
        if (restoreHealth) {
            this.stats.hp = stats.hpMax;
        }
        if (restoreMana) {
            this.stats.mp = stats.mpMax;
        }
        this.abilities.forEach((ability) => {
            ability.onCooldown = 0;
        });
        this.stats.ap = 0;
    }
}
const player = new Player({
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
    critPower: 50,
    abilities_total: [],
    traits: [],
    statuses: [],
    perks: [],
    skills: [],
    gold: 0,
    perk_points: 5,
    skill_points: 8,
});
player.updateAllModifiers();
player.abilities.forEach((abi) => abi.updateStats(player));
//# sourceMappingURL=player.js.map