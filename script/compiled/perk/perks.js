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
        modifiers: {
            atkV: 1,
            strV: 1,
            vitV: 1,
            agiV: 1,
            intV: 1,
            spiV: 1,
        },
        class: "adventure",
    },
    {
        id: "agility_1",
        desc: "agility_desc",
        pos: {
            x: 3,
            y: 0,
        },
        icon: "gfx/status/acrobatic.png",
        modifiers: {
            agiV: 3,
        },
        class: "agility",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
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
        modifiers: {
            agiV: 1,
            agiP: 5,
        },
        commands: {},
    },
    {
        id: "agility_3",
        desc: "agility_desc",
        pos: {
            x: 2,
            y: 2,
        },
        icon: "gfx/icons/running-ninja.png",
        relative_to: "agility_1",
        requires: ["agility_1"],
        class: "",
        modifiers: {
            agiV: 1,
            speedP: 5,
        },
        commands: {},
    },
    {
        id: "agility_4",
        desc: "agility_desc",
        pos: {
            x: 1.5,
            y: 3,
        },
        icon: "gfx/status/acrobatic.png",
        relative_to: "agility_2",
        requires: ["agility_2", "agility_3"],
        class: "",
        modifiers: {
            agiV: 3,
        },
        commands: {},
    },
    {
        id: "power_1",
        desc: "power_desc",
        pos: {
            x: -1.5,
            y: -2.5,
        },
        icon: "gfx/icons/crossed-swords.png",
        modifiers: {
            atkV: 3,
        },
        class: "power",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
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
        modifiers: {
            atkP: 7,
        },
        commands: {},
    },
    {
        id: "power_3",
        desc: "power_desc",
        pos: {
            x: -2,
            y: -2,
        },
        icon: "gfx/icons/swords-power.png",
        relative_to: "power_1",
        requires: ["power_1"],
        class: "",
        modifiers: {},
        commands: {
            add_ability: { ...abilities.battle_aura },
        },
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
        modifiers: {
            ability_battle_aura: {
                cooldownP: -5,
                effect_attack_1: {
                    durationV: 1.5,
                },
            },
            critPowerP: 5,
        },
        commands: {},
    },
    {
        id: "smart_1",
        desc: "smart_desc",
        pos: {
            x: -1.5,
            y: 2.5,
        },
        icon: "gfx/status/brain.png",
        modifiers: {
            intV: 3,
        },
        class: "smart",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
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
        modifiers: {
            intV: 1,
            intP: 5,
        },
        commands: {},
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
        modifiers: {},
        commands: {
            add_ability: {
                ...abilities.flame,
            },
        },
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
        modifiers: {
            ability_flame: {
                cooldownP: -5,
                effect_burning: {
                    inflict: {
                        damageFlatP: 50,
                    },
                    durationP: 10,
                },
            },
            intV: 1,
        },
        commands: {},
    },
    {
        id: "strength_1",
        desc: "strength_desc",
        pos: {
            x: 2.5,
            y: -2,
        },
        icon: "gfx/status/biceps.png",
        modifiers: {
            strV: 3,
        },
        class: "strength",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
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
        modifiers: {
            strV: 1,
            strP: 5,
        },
        commands: {},
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
        modifiers: {
            strV: 1,
            strP: 5,
        },
        commands: {},
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
        modifiers: {},
        commands: {
            add_ability: { ...abilities.fierce_attack },
        },
    },
    {
        id: "tough_1",
        desc: "tough_desc",
        pos: {
            x: 1.5,
            y: 2.5,
        },
        icon: "gfx/status/weight-lifting-up.png",
        modifiers: {
            vitV: 3,
        },
        class: "tough",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
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
        modifiers: {
            vitV: 1,
            vitP: 4,
        },
        commands: {},
    },
    {
        id: "tough_3",
        desc: "tough_desc",
        pos: {
            x: 0.5,
            y: 3,
        },
        icon: "gfx/status/heart-plus.png",
        relative_to: "tough_1",
        requires: ["tough_1"],
        class: "",
        modifiers: {
            vitV: 1,
            hpMaxP: 5,
        },
        commands: {},
    },
    {
        id: "tough_4",
        desc: "tough_desc",
        pos: {
            x: 1.34,
            y: 2.86,
        },
        icon: "gfx/abilities/shield-bash.png",
        relative_to: "tough_2",
        requires: ["tough_2", "tough_3"],
        class: "",
        modifiers: {},
        commands: {
            add_ability: { ...abilities.disorienting_blow },
        },
    },
    {
        id: "will_1",
        desc: "will_desc",
        pos: {
            x: -3,
            y: 0,
        },
        icon: "gfx/status/wisdom.png",
        modifiers: {
            spiV: 3,
        },
        class: "will",
        relative_to: "0_foundation_of_power",
        requires: ["0_foundation_of_power"],
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
        modifiers: {
            spiV: 1,
            spiP: 5,
        },
        commands: {},
    },
    {
        id: "will_3",
        desc: "will_desc",
        pos: {
            x: -1.5,
            y: 1.5,
        },
        icon: "gfx/icons/wizard-face.png",
        relative_to: "will_1",
        requires: ["will_1"],
        class: "",
        modifiers: {
            spiV: 1,
            mpMaxV: 10,
        },
        commands: {},
    },
    {
        id: "will_4",
        desc: "",
        pos: {
            x: -1.5,
            y: 2,
        },
        icon: "gfx/icons/magic-swirl.png",
        relative_to: "will_2",
        requires: ["will_2", "will_3"],
        class: "",
        modifiers: {
            spiP: 10,
        },
        commands: {},
    },
];
//# sourceMappingURL=perks.js.map