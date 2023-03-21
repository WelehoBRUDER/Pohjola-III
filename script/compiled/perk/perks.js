"use strict";
const perks = [
    {
        id: "0_foundation_of_power",
        desc: "0_foundation_of_power_desc",
        pos: {
            x: 31.5,
            y: 19,
        },
        icon: "gfx/icons/skills.png",
        class: "adventure",
        cost: 0,
        level: 0,
        levels: [
            {
                modifiers: {
                    atkV: 1,
                    strV: 1,
                    vitV: 1,
                    agiV: 1,
                    intV: 1,
                    spiV: 1,
                },
            },
        ],
    },
    {
        id: "agility_1",
        desc: "agility_desc",
        pos: {
            x: 3,
            y: 0,
        },
        icon: "gfx/status/acrobatic.png",
        class: "agility",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    agiV: 2,
                },
            },
        ],
    },
    {
        id: "agility_2",
        desc: "agility_desc",
        pos: {
            x: 3.5,
            y: -0.5,
        },
        icon: "gfx/status/acrobatic.png",
        relative_to: "agility_1",
        requires: ["agility_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    agiV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    agiV: 1,
                },
            },
            {
                modifiers: {
                    agiV: 1,
                },
            },
        ],
    },
    {
        id: "agility_3",
        desc: "agility_desc",
        pos: {
            x: 2,
            y: 2,
        },
        icon: "gfx/status/acrobatic.png",
        relative_to: "agility_1",
        requires: ["agility_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    agiV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    agiV: 1,
                },
            },
            {
                modifiers: {
                    agiV: 1,
                },
            },
        ],
    },
    {
        id: "agility_4",
        desc: "agility_desc",
        pos: {
            x: 1.5,
            y: 3,
        },
        icon: "gfx/abilities/shield-bash.png",
        relative_to: "agility_2",
        requires: ["agility_2", "agility_3"],
        class: "",
        cost: 2,
        level: 0,
        levels: [
            {
                modifiers: {
                    agiV: 3,
                },
            },
        ],
    },
    {
        id: "agility_5",
        desc: "",
        pos: {
            x: 3.72,
            y: -1.19,
        },
        icon: "gfx/status/acrobatic.png",
        relative_to: "agility_4",
        requires: ["agility_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    agiV: 2,
                },
                commands: {},
            },
            {
                modifiers: {
                    agiV: 2,
                },
            },
        ],
    },
    {
        id: "agility_6",
        desc: "",
        pos: {
            x: 3.23,
            y: 3.84,
        },
        icon: "gfx/status/speedometer.png",
        relative_to: "agility_4",
        requires: ["agility_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    speedV: 5,
                },
                commands: {},
            },
        ],
    },
    {
        id: "agility_7",
        desc: "",
        pos: {
            x: 4.53,
            y: -1.66,
        },
        icon: "gfx/status/acrobatic.png",
        relative_to: "agility_5",
        requires: ["agility_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    agiV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    agiV: 1,
                },
            },
            {
                modifiers: {
                    agiV: 1,
                },
            },
        ],
    },
    {
        id: "agility_8",
        desc: "",
        pos: {
            x: 5.19,
            y: 2.33,
        },
        icon: "gfx/status/acrobatic.png",
        cost: 1,
        relative_to: "agility_5",
        requires: ["agility_5"],
        class: "",
        level: 0,
        levels: [
            {
                modifiers: {
                    agiV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    agiV: 1,
                },
            },
            {
                modifiers: {
                    agiV: 1,
                },
            },
        ],
    },
    {
        id: "power_1",
        desc: "power_desc",
        pos: {
            x: -1.5,
            y: -2.5,
        },
        icon: "gfx/icons/crossed-swords.png",
        class: "power",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    atkV: 1,
                },
            },
        ],
    },
    {
        id: "power_2",
        desc: "power_desc",
        pos: {
            x: 1,
            y: -2.5,
        },
        icon: "gfx/icons/crossed-swords.png",
        relative_to: "power_1",
        requires: ["power_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    critRateV: 1.5,
                    atkV: 1,
                },
                commands: {},
            },
        ],
    },
    {
        id: "power_3",
        desc: "power_desc",
        pos: {
            x: -2,
            y: -2,
        },
        icon: "gfx/icons/crossed-swords.png",
        relative_to: "power_1",
        requires: ["power_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    critRateV: 1.5,
                    atkV: 1,
                },
            },
        ],
    },
    {
        id: "power_4",
        desc: "power_desc",
        pos: {
            x: -1.67,
            y: -1.88,
        },
        icon: "gfx/icons/crossed-swords.png",
        relative_to: "power_2",
        requires: ["power_2", "power_3"],
        class: "",
        cost: 2,
        level: 0,
        levels: [
            {
                modifiers: {
                    atkV: 1,
                    critRateV: 1,
                    critPowerV: 5,
                },
                commands: {},
            },
        ],
    },
    {
        id: "power_5",
        desc: "",
        pos: {
            x: 1.92,
            y: -1.5,
        },
        icon: "gfx/icons/crossed-swords.png",
        relative_to: "power_4",
        requires: ["power_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    atkV: 1,
                    critPowerV: 5,
                },
                commands: {},
            },
        ],
    },
    {
        id: "power_6",
        desc: "",
        pos: {
            x: -2.25,
            y: -1.28,
        },
        icon: "gfx/status/power.png",
        relative_to: "power_4",
        requires: ["power_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    atkV: 1,
                    critRateV: 2.5,
                },
                commands: {},
            },
        ],
    },
    {
        id: "power_raw_power",
        desc: "",
        pos: {
            x: 3.58,
            y: -0.41,
        },
        icon: "gfx/icons/barbarian.png",
        relative_to: "power_5",
        requires: ["power_5", "strength_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    physicalDamageP: 5,
                    critPowerV: 10,
                },
                commands: {},
            },
        ],
    },
    {
        id: "smart_1",
        desc: "smart_desc",
        pos: {
            x: -1.5,
            y: 2.5,
        },
        icon: "gfx/status/brain.png",
        class: "smart",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    intV: 2,
                },
            },
        ],
    },
    {
        id: "smart_2",
        desc: "smart_desc",
        pos: {
            x: 1,
            y: 3,
        },
        icon: "gfx/status/brain.png",
        relative_to: "smart_1",
        requires: ["smart_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    intV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    intV: 1,
                },
            },
            {
                modifiers: {
                    intV: 1,
                },
            },
        ],
    },
    {
        id: "smart_3",
        desc: "smart_desc",
        pos: {
            x: -2.5,
            y: 2.5,
        },
        icon: "gfx/status/brain.png",
        relative_to: "smart_1",
        requires: ["smart_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    intV: 1,
                },
            },
            {
                modifiers: {
                    intV: 1,
                },
            },
            {
                modifiers: {
                    intV: 1,
                },
            },
        ],
    },
    {
        id: "smart_4",
        desc: "smart_desc",
        pos: {
            x: -2.33,
            y: 2.34,
        },
        icon: "gfx/icons/bookmarklet.png",
        relative_to: "smart_2",
        requires: ["smart_2", "smart_3"],
        class: "",
        cost: 2,
        level: 0,
        levels: [
            {
                modifiers: {
                    intV: 3,
                    mpMaxP: 5,
                },
                commands: {},
            },
        ],
    },
    {
        id: "smart_5",
        desc: "",
        pos: {
            x: -3.5,
            y: 0.83,
        },
        icon: "gfx/status/brain.png",
        relative_to: "smart_4",
        requires: ["smart_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    intV: 2,
                },
                commands: {},
            },
            {
                modifiers: {
                    intV: 2,
                },
            },
        ],
    },
    {
        id: "smart_6",
        desc: "",
        pos: {
            x: 2.58,
            y: 1.63,
        },
        icon: "gfx/status/magical.png",
        relative_to: "smart_4",
        requires: ["smart_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    magicalDamageP: 7,
                },
                commands: {},
            },
        ],
    },
    {
        id: "smart_7",
        desc: "",
        pos: {
            x: -2.25,
            y: -1.66,
        },
        icon: "gfx/status/brain.png",
        relative_to: "smart_3",
        requires: ["smart_3"],
        class: "",
        cost: 2,
        level: 0,
        levels: [
            {
                modifiers: {
                    mpRegenFromIntV: 0.1,
                },
                commands: {},
            },
        ],
    },
    {
        id: "smart_8",
        desc: "",
        pos: {
            x: -0.44,
            y: 4.73,
        },
        icon: "gfx/status/brain.png",
        relative_to: "smart_5",
        requires: ["smart_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    intV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    intV: 1,
                },
            },
            {
                modifiers: {
                    intV: 1,
                },
            },
        ],
    },
    {
        id: "smart_9",
        desc: "",
        pos: {
            x: -3.47,
            y: 3.08,
        },
        icon: "gfx/status/brain.png",
        relative_to: "smart_5",
        requires: ["smart_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    intV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    intV: 1,
                },
            },
            {
                modifiers: {
                    intV: 1,
                },
            },
        ],
    },
    {
        id: "smart_caution",
        desc: "",
        pos: {
            x: 2.77,
            y: -0.36,
        },
        icon: "gfx/icons/shield-reflect.png",
        relative_to: "smart_6",
        requires: ["smart_6", "tough_6"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    magicalDefenceV: 3,
                    elementalDefenceV: 3,
                },
                commands: {},
            },
        ],
    },
    {
        id: "strength_1",
        desc: "strength_desc",
        pos: {
            x: 2.5,
            y: -2,
        },
        icon: "gfx/status/biceps.png",
        class: "strength",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    strV: 2,
                },
            },
        ],
    },
    {
        id: "strength_2",
        desc: "strength_desc",
        pos: {
            x: 1.5,
            y: -2,
        },
        icon: "gfx/status/biceps.png",
        relative_to: "strength_1",
        requires: ["strength_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    strV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
        ],
    },
    {
        id: "strength_3",
        desc: "strength_desc",
        pos: {
            x: 2.5,
            y: 0,
        },
        icon: "gfx/status/biceps.png",
        relative_to: "strength_1",
        requires: ["strength_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    strV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
        ],
    },
    {
        id: "strength_4",
        desc: "strength_desc",
        pos: {
            x: 2.72,
            y: 0.44,
        },
        icon: "gfx/icons/totem-head.png",
        relative_to: "strength_2",
        requires: ["strength_2", "strength_3"],
        class: "",
        cost: 2,
        level: 0,
        levels: [
            {
                modifiers: {
                    strV: 3,
                    atkP: 5,
                },
                commands: {},
            },
        ],
    },
    {
        id: "strength_5",
        desc: "",
        pos: {
            x: -0.59,
            y: -3.03,
        },
        icon: "gfx/status/biceps.png",
        relative_to: "strength_4",
        requires: ["strength_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    strV: 2,
                },
                commands: {},
            },
            {
                modifiers: {
                    strV: 2,
                },
            },
        ],
    },
    {
        id: "strength_6",
        desc: "",
        pos: {
            x: 3.7,
            y: 0.34,
        },
        icon: "gfx/icons/armor-vest.png",
        relative_to: "strength_4",
        requires: ["strength_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    strV: 1,
                    physicalDefenceV: 3,
                },
                commands: {},
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
        ],
    },
    {
        id: "strength_7",
        desc: "",
        pos: {
            x: 2.88,
            y: -3.55,
        },
        icon: "gfx/status/biceps.png",
        relative_to: "strength_5",
        requires: ["strength_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    strV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
        ],
    },
    {
        id: "strength_8",
        desc: "",
        pos: {
            x: 4.69,
            y: -1.56,
        },
        icon: "gfx/status/biceps.png",
        cost: 1,
        relative_to: "strength_5",
        requires: ["strength_5"],
        class: "",
        level: 0,
        levels: [
            {
                modifiers: {
                    strV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
            {
                modifiers: {
                    strV: 1,
                },
            },
        ],
    },
    {
        id: "strength_9",
        desc: "",
        pos: {
            x: 3.44,
            y: 0.81,
        },
        icon: "gfx/status/heart-plus.png",
        relative_to: "strength_5",
        requires: ["strength_5", "strength_6"],
        class: "",
        cost: 3,
        level: 0,
        levels: [
            {
                modifiers: {
                    hpMaxFromStrV: 2,
                },
                commands: {},
            },
        ],
    },
    {
        id: "tough_1",
        desc: "tough_desc",
        pos: {
            x: 1.5,
            y: 2.5,
        },
        icon: "gfx/status/weight-lifting-up.png",
        class: "",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    vitV: 2,
                },
            },
        ],
    },
    {
        id: "tough_2",
        desc: "tough_desc",
        pos: {
            x: 2,
            y: 1.5,
        },
        icon: "gfx/status/weight-lifting-up.png",
        relative_to: "tough_1",
        requires: ["tough_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    vitV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    vitV: 1,
                },
            },
            {
                modifiers: {
                    vitV: 1,
                },
            },
        ],
    },
    {
        id: "tough_3",
        desc: "tough_desc",
        pos: {
            x: 0.5,
            y: 3,
        },
        icon: "gfx/status/weight-lifting-up.png",
        relative_to: "tough_1",
        requires: ["tough_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    vitV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    vitV: 1,
                },
            },
            {
                modifiers: {
                    vitV: 1,
                },
            },
        ],
    },
    {
        id: "tough_4",
        desc: "tough_desc",
        pos: {
            x: 1.34,
            y: 2.86,
        },
        icon: "gfx/status/healing.png",
        relative_to: "tough_2",
        requires: ["tough_2", "tough_3"],
        class: "",
        cost: 2,
        level: 0,
        levels: [
            {
                modifiers: {
                    vitV: 3,
                    hpMaxP: 7,
                },
                commands: {},
            },
        ],
    },
    {
        id: "tough_5",
        desc: "",
        pos: {
            x: 3.09,
            y: 2.67,
        },
        icon: "gfx/status/weight-lifting-up.png",
        relative_to: "tough_4",
        requires: ["tough_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    vitV: 2,
                },
                commands: {},
            },
            {
                modifiers: {
                    vitV: 2,
                },
            },
        ],
    },
    {
        id: "tough_6",
        desc: "",
        pos: {
            x: -0.77,
            y: 3.58,
        },
        icon: "gfx/status/physical.png",
        relative_to: "tough_4",
        requires: ["tough_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    physicalDamageP: 7,
                },
                commands: {},
            },
        ],
    },
    {
        id: "tough_7",
        desc: "",
        pos: {
            x: 5.28,
            y: 2.72,
        },
        icon: "gfx/status/weight-lifting-up.png",
        relative_to: "tough_5",
        requires: ["tough_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    vitV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    vitV: 1,
                },
            },
            {
                modifiers: {
                    vitV: 1,
                },
            },
        ],
    },
    {
        id: "tough_8",
        desc: "",
        pos: {
            x: 2.48,
            y: 4.91,
        },
        icon: "gfx/status/weight-lifting-up.png",
        relative_to: "tough_5",
        requires: ["tough_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    vitV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    vitV: 1,
                },
            },
            {
                modifiers: {
                    vitV: 1,
                },
            },
        ],
    },
    {
        id: "tough_9",
        desc: "",
        pos: {
            x: -1.09,
            y: 3.72,
        },
        icon: "gfx/status/heart-plus.png",
        cost: 2,
        level: 0,
        levels: [
            {
                modifiers: {
                    hpMaxFromVitV: 1,
                },
            },
            {
                modifiers: {
                    hpMaxFromVitV: 1,
                },
            },
            {
                modifiers: {
                    hpMaxFromVitV: 1,
                },
            },
        ],
        relative_to: "tough_5",
        requires: ["tough_5", "tough_6"],
        class: "",
        modifiers: {},
        commands: {},
    },
    {
        id: "tough_defensive",
        desc: "",
        pos: {
            x: 0.2,
            y: -3.64,
        },
        icon: "gfx/icons/brutal-helm.png",
        relative_to: "tough_5",
        requires: ["tough_5", "agility_6"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    hpMaxP: 7.5,
                    speedP: 7.5,
                },
                commands: {},
            },
        ],
    },
    {
        id: "warrior_perk",
        desc: "",
        pos: {
            x: -2.14,
            y: -1.94,
        },
        icon: "gfx/icons/swords-power.png",
        relative_to: "agility_5",
        requires: ["agility_5", "strength_6"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    critRateV: 2,
                    agiP: 5,
                    strP: 5,
                    physicalDefenceV: 2,
                },
                commands: {},
            },
        ],
    },
    {
        id: "weak_points",
        desc: "",
        pos: {
            x: -3.03,
            y: 3.19,
        },
        icon: "gfx/abilities/pointy-sword.png",
        relative_to: "power_6",
        requires: ["power_6", "will_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    critRateV: 3,
                    mpMaxV: 3,
                    critPowerV: 9,
                },
                commands: {},
            },
        ],
    },
    {
        id: "will_1",
        desc: "will_desc",
        pos: {
            x: -3,
            y: 0,
        },
        icon: "gfx/status/wisdom.png",
        class: "will",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    spiV: 2,
                },
            },
        ],
    },
    {
        id: "will_2",
        desc: "will_desc",
        pos: {
            x: -2,
            y: -1.5,
        },
        icon: "gfx/status/wisdom.png",
        relative_to: "will_1",
        requires: ["will_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    spiV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    spiV: 1,
                },
            },
            {
                modifiers: {
                    spiV: 1,
                },
            },
        ],
    },
    {
        id: "will_3",
        desc: "will_desc",
        pos: {
            x: -2,
            y: 1.5,
        },
        icon: "gfx/status/wisdom.png",
        relative_to: "will_1",
        requires: ["will_1"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    spiV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    spiV: 1,
                },
            },
            {
                modifiers: {
                    spiV: 1,
                },
            },
        ],
    },
    {
        id: "will_4",
        desc: "",
        pos: {
            x: -2,
            y: 1.5,
        },
        icon: "gfx/icons/magic-swirl.png",
        relative_to: "will_2",
        requires: ["will_2", "will_3"],
        class: "",
        cost: 2,
        level: 0,
        levels: [
            {
                modifiers: {
                    spiV: 3,
                    mpMaxP: 5,
                },
                commands: {},
            },
        ],
    },
    {
        id: "will_5",
        desc: "",
        pos: {
            x: -1.95,
            y: -1.95,
        },
        icon: "gfx/status/wisdom.png",
        relative_to: "will_4",
        requires: ["will_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    spiV: 2,
                },
                commands: {},
            },
            {
                modifiers: {
                    spiV: 2,
                },
            },
        ],
    },
    {
        id: "will_6",
        desc: "",
        pos: {
            x: -1.98,
            y: 2.17,
        },
        icon: "gfx/status/elemental.png",
        relative_to: "will_4",
        requires: ["will_4"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    elementalDamageP: 7,
                },
                commands: {},
            },
        ],
    },
    {
        id: "will_7",
        desc: "",
        pos: {
            x: -4.22,
            y: -1.78,
        },
        icon: "gfx/status/wisdom.png",
        relative_to: "will_5",
        requires: ["will_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    spiV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    spiV: 1,
                },
            },
            {
                modifiers: {
                    spiV: 1,
                },
            },
        ],
    },
    {
        id: "will_8",
        desc: "",
        pos: {
            x: -4.36,
            y: 0.95,
        },
        icon: "gfx/status/wisdom.png",
        relative_to: "will_5",
        requires: ["will_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    spiV: 1,
                },
                commands: {},
            },
            {
                modifiers: {
                    spiV: 1,
                },
            },
            {
                modifiers: {
                    spiV: 1,
                },
            },
        ],
    },
    {
        id: "will_enlightened",
        desc: "",
        pos: {
            x: 0.3,
            y: 3.16,
        },
        icon: "gfx/icons/book-aura.png",
        relative_to: "will_6",
        requires: ["will_6", "smart_5"],
        class: "",
        cost: 1,
        level: 0,
        levels: [
            {
                modifiers: {
                    mpMaxFromSpiV: 1,
                    mpMaxP: 5,
                },
                commands: {},
            },
        ],
    },
];
//# sourceMappingURL=perks.js.map