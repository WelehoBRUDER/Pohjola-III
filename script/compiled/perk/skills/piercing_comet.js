"use strict";
skills.push({
    id: "piercing_comet",
    icon: "gfx/abilities/fragmented-meteor.png",
    levels: [
        {
            commands: {
                add_ability: { ...abilities.piercing_comet },
            },
        },
    ],
    requirements: [{ skill_total: "magic_blast", level: 4 }],
    upgrades: [
        {
            id: "piercing_comet_upgrade_1",
            requirements: [{ skill: "piercing_comet", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_piercing_comet: {
                            damageV: 7,
                            mpCostV: 2,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_piercing_comet: {
                            damageV: 7,
                            mpCostV: 2,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_piercing_comet: {
                            damageV: 7,
                            mpCostV: 2,
                        },
                    },
                },
            ],
        },
        {
            id: "piercing_comet_upgrade_2",
            requirements: [{ skill: "piercing_comet", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_piercing_comet: {
                            penetrationV: 0.1,
                            mpCostV: 3,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_piercing_comet: {
                            penetrationV: 0.1,
                            mpCostV: 3,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_piercing_comet: {
                            penetrationV: 0.1,
                            mpCostV: 3,
                        },
                    },
                },
            ],
        },
        {
            id: "piercing_comet_upgrade_3",
            requirements: [{ skill: "piercing_comet", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_piercing_comet: {
                            cooldownP: -10,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_piercing_comet: {
                            cooldownP: -10,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_piercing_comet: {
                            cooldownP: -10,
                        },
                    },
                },
            ],
        },
    ],
});
//# sourceMappingURL=piercing_comet.js.map