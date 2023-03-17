"use strict";
skills.push({
    id: "smite",
    icon: "gfx/abilities/deadly-strike.png",
    hiddenUntilOwned: true,
    levels: [
        {
            modifiers: {
                ability_smite: {
                    damageV: 3,
                    cooldownP: -5,
                },
            },
        },
    ],
    upgrades: [
        {
            id: "smite_upgrade_1",
            requirements: [{ skill: "smite", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_smite: {
                            damageV: 2,
                            mpCostV: 1,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_smite: {
                            damageV: 3,
                            mpCostV: 1,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_smite: {
                            damageV: 5,
                            mpCostV: 1,
                        },
                    },
                },
            ],
        },
        {
            id: "smite_upgrade_2",
            requirements: [{ skill: "smite", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_smite: {
                            penetrationV: 0.1,
                            mpCostV: 1,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_smite: {
                            penetrationV: 0.07,
                            damageV: 3,
                            mpCostV: 3,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_smite: {
                            penetrationV: 0.08,
                            damageV: 5,
                            mpCostV: 5,
                        },
                    },
                },
            ],
        },
        {
            id: "smite_upgrade_3",
            requirements: [{ skill: "smite", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_smite: {
                            cooldownP: -5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_smite: {
                            cooldownP: -6,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_smite: {
                            cooldownP: -7,
                        },
                    },
                },
            ],
        },
    ],
});
//# sourceMappingURL=smite.js.map