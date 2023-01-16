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
    id: "disorienting_blow",
    icon: "gfx/abilities/shield-bash.png",
    levels: [
        {
            commands: {
                add_ability: __assign({}, abilities.disorienting_blow)
            }
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
                                durationP: 5
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            powerV: 0.05,
                            effect_dazed: {
                                durationP: 5
                            }
                        }
                    }
                },
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            powerV: 0.05,
                            effect_dazed: {
                                durationP: 5
                            }
                        }
                    }
                },
            ]
        },
        {
            id: "disorienting_blow_upgrade_2",
            requirements: [{ skill: "disorienting_blow", level: 1 }],
            levels: [
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            cooldownP: -5
                        }
                    }
                },
                {
                    modifiers: {
                        ability_disorienting_blow: {
                            cooldownP: -5
                        }
                    }
                },
            ]
        },
    ]
});
//# sourceMappingURL=disorienting_blow.js.map