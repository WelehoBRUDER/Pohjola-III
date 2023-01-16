"use strict";
skills.push({
    id: "disorienting_blow",
    icon: "gfx/abilities/shield-bash.png",
    levels: [
        {
            commands: {
                add_ability: { ...abilities.disorienting_blow },
            },
        },
    ],
    upgrades: [
        {
            id: "disorienting_blow_upgrade_1",
            requirements: [{ skill: "disorienting_blow", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            powerV: 0.05,
                            effect_dazed: {
                                durationP: 5,
                            },
                        },
                    },
                },
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            powerV: 0.05,
                            effect_dazed: {
                                durationP: 5,
                            },
                        },
                    },
                },
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            powerV: 0.05,
                            effect_dazed: {
                                durationP: 5,
                            },
                        },
                    },
                },
            ],
        },
        {
            id: "disorienting_blow_upgrade_2",
            requirements: [{ skill: "disorienting_blow", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            cooldownP: -5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            cooldownP: -5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            cooldownP: -5,
                        },
                    },
                },
            ],
        },
    ],
});
//# sourceMappingURL=disorienting_blow.js.map