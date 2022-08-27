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
        this.race = new Race(char.race) ?? new Race(races.human);
        this.equipment = char.equipment ?? defaultEquipment;
        this.abilities_total = char.abilities_total ?? [];
        this.updateAllModifiers();
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
        divine: 0,
    },
    equipment: defaultEquipment,
    abilities: [
        new Ability({ ...abilities.sharp_strike }),
        new Ability({ ...abilities.heavy_attack }),
        new Ability({ ...abilities.disorienting_blow }),
        new Ability({ ...abilities.flame }),
        new Ability({ ...abilities.battle_aura }),
        new Ability({ ...abilities.healing_light }),
    ],
    critRate: 3,
    critPower: 50,
    abilities_total: [],
    traits: [],
    statuses: [],
    perks: [],
});
player.updateAllModifiers();
player.abilities.forEach((abi) => abi.updateStats(player));
game.initCombat();
//# sourceMappingURL=player.js.map