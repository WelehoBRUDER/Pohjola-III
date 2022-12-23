"use strict";
skills.push({
    id: "healing_light",
    icon: "gfx/status/healing.png",
    levels: [
        {
            commands: {
                add_ability: { ...abilities.healing_light },
            },
        },
    ],
    upgrades: [
        {
            id: "healing_light_upgrade_1",
            requirements: [{ skill: "healing_light", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_healing_light: {
                            effect_regeneration_1: {
                                inflict: {
                                    healingFlatV: 2.5,
                                },
                            },
                        },
                    },
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            effect_regeneration_1: {
                                inflict: {
                                    healingFlatV: 2.5,
                                },
                            },
                        },
                    },
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            effect_regeneration_1: {
                                inflict: {
                                    healingFlatV: 2.5,
                                },
                            },
                        },
                    },
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            effect_regeneration_1: {
                                inflict: {
                                    healingFlatV: 2.5,
                                },
                            },
                        },
                    },
                },
            ],
        },
        {
            id: "healing_light_upgrade_2",
            requirements: [{ skill: "healing_light", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_healing_light: {
                            cooldownP: -5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            cooldownP: -5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            cooldownP: -5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            cooldownP: -5,
                        },
                    },
                },
            ],
        },
    ],
});
//# sourceMappingURL=healing_light.js.map