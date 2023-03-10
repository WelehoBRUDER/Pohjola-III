"use strict";
skills.push({
    id: "meteor",
    icon: "gfx/abilities/meteor-impact.png",
    levels: [
        {
            commands: {
                add_ability: { ...abilities.meteor },
            },
        },
    ],
    requirements: [{ skill_total: "magic_blast", level: 4 }],
    upgrades: [
        {
            id: "meteor_upgrade_1",
            requirements: [{ skill: "meteor", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_meteor: {
                            damageV: 6,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_meteor: {
                            damageV: 6,
                            mpCostV: 3,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_meteor: {
                            damageV: 5,
                            mpCostV: 2,
                        },
                    },
                },
            ],
        },
        {
            id: "meteor_upgrade_2",
            requirements: [{ skill: "meteor", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_meteor: {
                            penetrationV: 0.05,
                            mpCostV: 2,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_meteor: {
                            penetrationV: 0.05,
                            mpCostV: 2,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_meteor: {
                            penetrationV: 0.05,
                            mpCostV: 2,
                        },
                    },
                },
            ],
        },
        {
            id: "meteor_upgrade_3",
            requirements: [{ skill: "meteor", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_meteor: {
                            cooldownP: -8,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_meteor: {
                            cooldownP: -8,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_meteor: {
                            cooldownP: -8,
                        },
                    },
                },
            ],
        },
    ],
});
//# sourceMappingURL=meteor.js.map