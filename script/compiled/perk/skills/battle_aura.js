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
    id: "battle_aura",
    icon: "gfx/abilities/battle-gear.png",
    levels: [
        {
            commands: {
                add_ability: __assign({}, abilities.battle_aura)
            }
        },
    ],
    requirements: [],
    upgrades: [
        {
            id: "battle_aura_upgrade_1",
            requirements: [{ skill: "battle_aura", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_battle_aura: {
                            effect_attack_1: {
                                modifiers: {
                                    atkPV: 5
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_battle_aura: {
                            effect_attack_1: {
                                modifiers: {
                                    atkPV: 5
                                }
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_battle_aura: {
                            effect_attack_1: {
                                modifiers: {
                                    atkPV: 5
                                }
                            }
                        }
                    }
                },
            ]
        },
        {
            id: "battle_aura_upgrade_2",
            requirements: [{ skill: "battle_aura", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_battle_aura: {
                            effect_attack_1: {
                                durationP: 5
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_battle_aura: {
                            effect_attack_1: {
                                durationP: 5
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_battle_aura: {
                            effect_attack_1: {
                                durationP: 5
                            }
                        }
                    }
                },
            ]
        },
        {
            id: "battle_aura_upgrade_3",
            requirements: [{ skill: "battle_aura", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_battle_aura: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_battle_aura: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_battle_aura: {
                            cooldownP: -5
                        }
                    }
                },
            ]
        },
    ]
});
//# sourceMappingURL=battle_aura.js.map