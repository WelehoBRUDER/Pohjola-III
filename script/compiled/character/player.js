"use strict";
const defaultEquipment = {
    weapon: null,
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
        this.updateAllModifiers();
    }
}
const player = new Player({
    id: "player",
    name: "Player",
    race: races.human,
    stats: {
        vit: 10,
        agi: 10,
        int: 10,
        spi: 10,
        hp: 25,
        mp: 15,
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
    abilities: [new Ability(abilities.sharp_strike)],
    traits: [],
    statuses: [],
    perks: [],
});
game.initCombat();
//# sourceMappingURL=player.js.map