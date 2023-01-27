"use strict";
skills.push({
    id: "ice_bolt",
    icon: "gfx/abilities/ice-bolt.png",
    levels: [
        {
            commands: {
                add_ability: { ...abilities.ice_bolt },
            },
        },
    ],
    upgrades: [
        {
            id: "ice_bolt_upgrade_1",
            requirements: [{ skill: "ice_bolt", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_ice_bolt: {
                            damageV: 2,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_ice_bolt: {
                            damageV: 2,
                            effect_frozen: {
                                inflict: {
                                    damageFlatV: 2,
                                },
                            },
                        },
                    },
                },
                {
                    modifiers: {
                        ability_ice_bolt: {
                            damageV: 4,
                            effect_frozen: {
                                inflict: {
                                    damageFlatV: 5,
                                },
                            },
                        },
                    },
                },
            ],
        },
        {
            id: "ice_bolt_upgrade_2",
            requirements: [{ skill: "ice_bolt", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_ice_bolt: {
                            effect_frozen: {
                                speedPV: -10,
                            },
                            mpCostV: 5,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_ice_bolt: {
                            effect_frozen: {
                                speedPV: -10,
                            },
                            mpCostV: 10,
                        },
                    },
                },
            ],
        },
        {
            id: "ice_bolt_upgrade_3",
            requirements: [{ skill: "ice_bolt", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_ice_bolt: {
                            cooldownP: -7,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_ice_bolt: {
                            cooldownP: -7,
                        },
                    },
                },
                {
                    modifiers: {
                        ability_ice_bolt: {
                            cooldownP: -7,
                        },
                    },
                },
            ],
        },
    ],
});
//# sourceMappingURL=ice_bolt.js.map