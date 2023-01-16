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
    id: "sharp_strike",
    icon: "gfx/abilities/pointy-sword.png",
    levels: [
        {
            commands: {
                add_ability: __assign({}, abilities.sharp_strike)
            }
        },
    ],
    requirements: [{ skill_total: "fierce_attack", level: 4 }],
    upgrades: [
        {
            id: "sharp_strike_upgrade_1",
            requirements: [{ skill: "sharp_strike", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_sharp_strike: {
                            powerV: 0.05,
                            effect_wounded: {
                                inflict: {
                                    damagePercentV: 0.01
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_sharp_strike: {
                            powerV: 0.05,
                            effect_wounded: {
                                inflict: {
                                    damagePercentV: 0.01
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_sharp_strike: {
                            powerV: 0.05,
                            effect_wounded: {
                                inflict: {
                                    damagePercentV: 0.01
                                }
                            }
                        }
                    }
                },
            ]
        },
        {
            id: "sharp_strike_upgrade_2",
            requirements: [{ skill: "sharp_strike", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_sharp_strike: {
                            effect_wounded: {
                                durationV: 0.5,
                                modifiers: {
                                    atkPV: -2,
                                    strPV: -2,
                                    agiPV: -2
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_sharp_strike: {
                            effect_wounded: {
                                durationV: 0.5,
                                modifiers: {
                                    atkPV: -2,
                                    strPV: -2,
                                    agiPV: -2
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_sharp_strike: {
                            effect_wounded: {
                                durationV: 0.5,
                                modifiers: {
                                    atkPV: -2,
                                    strPV: -2,
                                    agiPV: -2
                                }
                            }
                        }
                    }
                },
            ]
        },
        {
            id: "sharp_strike_upgrade_3",
            requirements: [{ skill: "sharp_strike", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_sharp_strike: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_sharp_strike: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_sharp_strike: {
                            cooldownP: -5
                        }
                    }
                },
            ]
        },
    ]
});
//# sourceMappingURL=sharp_strike.js.map