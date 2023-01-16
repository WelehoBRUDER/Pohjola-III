"use strict";
skills.push({
    id: "holy_grace",
    icon: "gfx/status/holy-grace.png",
    levels: [
        {
            commands: {
                add_ability: { ...abilities.holy_grace },
            },
        },
    ],
    requirements: [{ skill_total: "healing_light", level: 4 }],
    upgrades: [
        {
            id: "holy_grace_upgrade_1",
            requirements: [{ skill: "holy_grace", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_holy_grace: {
                            effect_holy_grace: {
                                inflict: {
                                    healingPercentV: 0.02,
                                },
                            },
                            mp_costV: 5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_holy_grace: {
                            effect_holy_grace: {
                                inflict: {
                                    healingPercentV: 0.02,
                                },
                            },
                            mp_costV: 5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_holy_grace: {
                            effect_holy_grace: {
                                inflict: {
                                    healingPercentV: 0.02,
                                },
                            },
                            mp_costV: 10,
                        },
                    },
                },
            ],
        },
        {
            id: "holy_grace_upgrade_2",
            requirements: [{ skill: "holy_grace", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_holy_grace: {
                            effect_holy_grace: {
                                durationP: 10,
                            },
                        },
                    },
                },
                {
                    modifiers: {
                        ability_holy_grace: {
                            effect_holy_grace: {
                                durationP: 10,
                            },
                        },
                    },
                },
                {
                    modifiers: {
                        ability_holy_grace: {
                            effect_holy_grace: {
                                durationP: 20,
                            },
                        },
                    },
                },
            ],
        },
        {
            id: "holy_grace_upgrade_3",
            requirements: [{ skill: "holy_grace", level: 1 }],
            levels: [
                {
                    modifiers: {
                        cooldownP: -10,
                    },
                },
                {
                    modifiers: {
                        cooldownP: -10,
                    },
                },
                {
                    modifiers: {
                        cooldownP: -10,
                    },
                },
            ],
        },
    ],
});
//# sourceMappingURL=holy_grace.js.map