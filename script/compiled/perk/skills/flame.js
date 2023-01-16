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
    id: "flame",
    icon: "gfx/abilities/fire-spell-cast.png",
    levels: [
        {
            commands: {
                add_ability: __assign({}, abilities.flame)
            }
        },
    ],
    upgrades: [
        {
            id: "flame_upgrade_1",
            requirements: [{ skill: "flame", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_flame: {
                            powerV: 0.05,
                            effect_burning: {
                                inflict: {
                                    damageFlatP: 25
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_flame: {
                            powerV: 0.05,
                            effect_burning: {
                                inflict: {
                                    damageFlatP: 25
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_flame: {
                            powerV: 0.05,
                            effect_burning: {
                                inflict: {
                                    damageFlatP: 25
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_flame: {
                            powerV: 0.05,
                            effect_burning: {
                                inflict: {
                                    damageFlatP: 25
                                }
                            }
                        }
                    }
                },
            ]
        },
        {
            id: "flame_upgrade_2",
            requirements: [{ skill: "flame", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_flame: {
                            powerV: 0.05,
                            effect_burning: {
                                inflict: {
                                    damageFlatV: 2
                                },
                                modifiers: {
                                    atkPV: -5,
                                    agiPV: -5
                                }
                            }
                        }
                    }
                },
            ]
        },
        {
            id: "flame_upgrade_3",
            requirements: [{ skill: "flame", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_flame: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_flame: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_flame: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_flame: {
                            cooldownP: -5
                        }
                    }
                },
            ]
        },
    ]
});
//# sourceMappingURL=flame.js.map