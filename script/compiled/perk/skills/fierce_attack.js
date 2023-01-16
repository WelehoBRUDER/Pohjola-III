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
    id: "fierce_attack",
    icon: "gfx/abilities/sword-wound.png",
    levels: [
        {
            commands: {
                add_ability: __assign({}, abilities.fierce_attack)
            }
        },
    ],
    requirements: [],
    upgrades: [
        {
            id: "fierce_attack_upgrade_1",
            requirements: [{ skill: "fierce_attack", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_fierce_attack: {
                            powerV: 0.1
                        }
                    }
                },
                {
                    modifiers: {
                        ability_fierce_attack: {
                            powerV: 0.1
                        }
                    }
                },
                {
                    modifiers: {
                        ability_fierce_attack: {
                            powerV: 0.1
                        }
                    }
                },
            ]
        },
        {
            id: "fierce_attack_upgrade_2",
            requirements: [{ skill: "fierce_attack", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_fierce_attack: {
                            penetrationV: 0.05
                        }
                    }
                },
                {
                    modifiers: {
                        ability_fierce_attack: {
                            penetrationV: 0.05
                        }
                    }
                },
                {
                    modifiers: {
                        ability_fierce_attack: {
                            penetrationV: 0.05
                        }
                    }
                },
            ]
        },
        {
            id: "fierce_attack_upgrade_3",
            requirements: [{ skill: "fierce_attack", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_fierce_attack: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_fierce_attack: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_fierce_attack: {
                            cooldownP: -5
                        }
                    }
                },
            ]
        },
    ]
});
//# sourceMappingURL=fierce_attack.js.map