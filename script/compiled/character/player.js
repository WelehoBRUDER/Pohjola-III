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
            ability_sharp_strike: {
                powerV: 0.25,
                effect_wounded: {
                    durationP: 20,
                },
            },
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
        physical: 10,
        magical: 10,
        elemental: 10,
    },
    resistances: {
        fire: 10,
        ice: 10,
        thunder: 10,
        curse: 10,
        poison: 10,
        divine: 10,
    },
    equipment: defaultEquipment,
    abilities: [
        new Ability(abilities.sharp_strike),
        new Ability(abilities.heavy_attack),
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