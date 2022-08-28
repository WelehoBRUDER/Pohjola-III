"use strict";
const items = {
    broken_sword: {
        id: "broken_sword",
        price: 10,
        speed: 0,
        atk: 5,
        stackable: true,
        tier: itemTiers.common,
        type: "weapon",
        modifiers: {
            critPowerV: 50,
        },
    },
    // Armors
    ragged_armor: {
        id: "ragged_armor",
        price: 10,
        speed: 0,
        defence: {
            physical: 2,
            magical: 2,
            elemental: 0,
        },
        stackable: true,
        tier: itemTiers.common,
        type: "armor",
        slot: "armor",
    },
    ragged_hood: {
        id: "ragged_hood",
        price: 8,
        speed: 0,
        defence: {
            physical: 1,
            magical: 1,
            elemental: 0,
        },
        stackable: true,
        tier: itemTiers.common,
        type: "armor",
        slot: "helmet",
    },
    ragged_boots: {
        id: "ragged_boots",
        price: 8,
        speed: 0,
        defence: {
            physical: 1,
            magical: 1,
            elemental: 0,
        },
        stackable: true,
        tier: itemTiers.common,
        type: "armor",
        slot: "legs",
    },
    // Materials
    bone: {
        id: "bone",
        price: 3,
        stackable: true,
        tier: itemTiers.common,
        type: "material",
    },
};
//# sourceMappingURL=items.js.map