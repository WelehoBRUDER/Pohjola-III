"use strict";
skills.push({
    id: "magic_blast",
    icon: "gfx/abilities/blaster.png",
    levels: [
        {
            commands: {
                add_ability: { ...abilities.magic_blast },
            },
        },
    ],
    upgrades: [
        {
            id: "magic_blast_upgrade_1",
            requirements: [{ skill: "magic_blast", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_magic_blast: {
                            damageV: 2,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_magic_blast: {
                            damageV: 3,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_magic_blast: {
                            damageV: 5,
                        },
                    },
                },
            ],
        },
        {
            id: "magic_blast_upgrade_2",
            requirements: [{ skill: "magic_blast", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_magic_blast: {
                            penetrationV: 0.1,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_magic_blast: {
                            penetrationV: 0.05,
                            damageV: 1,
                            mpCostV: 2,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_magic_blast: {
                            penetrationV: 0.05,
                            damageV: 2,
                            mpCostV: 3,
                        },
                    },
                },
            ],
        },
        {
            id: "magic_blast_upgrade_3",
            requirements: [{ skill: "magic_blast", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_magic_blast: {
                            cooldownP: -5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_magic_blast: {
                            cooldownP: -5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_magic_blast: {
                            cooldownP: -5,
                        },
                    },
                },
            ],
        },
    ],
});
//# sourceMappingURL=magic_blast.js.map