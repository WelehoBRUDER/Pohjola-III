"use strict";
const abilities = {
    player_base_attack: {
        id: "player_base_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "physical",
        power: 1,
        cooldown: 0,
        weight: 1,
    },
    physical_attack: {
        id: "physical_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "physical",
        power: 1,
        cooldown: 0,
        weight: 1,
    },
    magical_attack: {
        id: "magical_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "magical",
        power: 1,
        cooldown: 0,
        weight: 1,
    },
    elemental_attack: {
        id: "elemental_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "elemental",
        power: 1,
        cooldown: 0,
        weight: 1,
    },
    sharp_strike: {
        id: "sharp_strike",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "physical",
        effectsToEnemy: [effects.wounded],
        cooldown: 13,
        onCooldown: 0,
        power: 0.8,
        weight: 2,
    },
    gore: {
        id: "gore",
        icon: "gfx/items/horned-helm.png",
        type: "attack",
        damageType: "physical",
        effectsToEnemy: [effects.gored],
        cooldown: 16,
        onCooldown: 0,
        power: 1.5,
        weight: 3,
    },
    fierce_attack: {
        id: "fierce_attack",
        icon: "gfx/abilities/sword-wound.png",
        type: "attack",
        damageType: "physical",
        cooldown: 6,
        penetration: 0,
        onCooldown: 0,
        power: 1.5,
        weight: 2,
    },
    disorienting_blow: {
        id: "disorienting_blow",
        icon: "gfx/abilities/shield-bash.png",
        type: "attack",
        damageType: "physical",
        effectsToEnemy: [effects.dazed],
        cooldown: 12,
        onCooldown: 0,
        power: 0.75,
        weight: 2,
    },
    bull_rush: {
        id: "bull_rush",
        icon: "gfx/abilities/shield-bash.png",
        type: "attack",
        damageType: "physical",
        effectsToEnemy: [effects.stunned],
        cooldown: 13,
        onCooldown: 0,
        power: 0.85,
        weight: 2,
    },
    flame: {
        id: "flame",
        icon: "gfx/abilities/fire-spell-cast.png",
        type: "attack",
        damageType: "elemental",
        effectsToEnemy: [effects.burning],
        cooldown: 12,
        onCooldown: 0,
        power: 1,
        mpCost: 5,
        weight: 3,
    },
    healing_light: {
        id: "healing_light",
        icon: "gfx/status/healing.png",
        type: "heal",
        effectsToSelf: [effects.regeneration_1],
        cooldown: 12,
        mpCost: 10,
        weight: 1,
    },
    holy_grace: {
        id: "holy_grace",
        icon: "gfx/status/holy-grace.png",
        type: "heal",
        effectsToSelf: [effects.holy_grace],
        cooldown: 14,
        mpCost: 20,
        weight: 1,
    },
    battle_aura: {
        id: "battle_aura",
        icon: "gfx/abilities/battle-gear.png",
        type: "buff",
        effectsToSelf: [effects.attack_1],
        cooldown: 12,
        weight: 2,
    },
};
//# sourceMappingURL=abilities.js.map