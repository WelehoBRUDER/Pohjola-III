"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
skills.push({
    id: "healing_light",
    icon: "gfx/status/healing.png",
    levels: [
        {
            commands: {
                add_ability: __assign({}, abilities.healing_light)
            }
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
                                    healingFlatV: 2.5
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            effect_regeneration_1: {
                                inflict: {
                                    healingFlatV: 2.5
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            effect_regeneration_1: {
                                inflict: {
                                    healingFlatV: 2.5
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            effect_regeneration_1: {
                                inflict: {
                                    healingFlatV: 2.5
                                }
                            }
                        }
                    }
                },
            ]
        },
        {
            id: "healing_light_upgrade_2",
            requirements: [{ skill: "healing_light", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_healing_light: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_healing_light: {
                            cooldownP: -5
                        }
                    }
                },
            ]
        },
    ]
});
//# sourceMappingURL=healing_light.js.map