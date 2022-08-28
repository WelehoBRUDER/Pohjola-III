"use strict";
const abilities = {
    player_base_attack: {
        id: "player_base_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "physical",
        power: 0.5,
        cooldown: 0,
    },
    physical_attack: {
        id: "physical_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "physical",
        power: 1,
        cooldown: 0,
    },
    magical_attack: {
        id: "magical_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "magical",
        power: 1,
        cooldown: 0,
    },
    elemental_attack: {
        id: "elemental_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "elemental",
        power: 1,
        cooldown: 0,
    },
    sharp_strike: {
        id: "sharp_strike",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "physical",
        effectsToEnemy: [effects.wounded],
        cooldown: 5,
        onCooldown: 0,
        power: 0.8,
    },
    heavy_attack: {
        id: "heavy_attack",
        icon: "gfx/abilities/sword-wound.png",
        type: "attack",
        damageType: "physical",
        cooldown: 7,
        onCooldown: 0,
        power: 1.2,
    },
    fierce_attack: {
        id: "fierce_attack",
        icon: "gfx/abilities/sword-wound.png",
        type: "attack",
        damageType: "physical",
        cooldown: 5,
        onCooldown: 0,
        power: 1,
    },
    disorienting_blow: {
        id: "disorienting_blow",
        icon: "gfx/abilities/shield-bash.png",
        type: "attack",
        damageType: "physical",
        effectsToEnemy: [effects.dazed],
        cooldown: 10,
        onCooldown: 0,
        power: 0.6,
    },
    flame: {
        id: "flame",
        icon: "gfx/abilities/fire-spell-cast.png",
        type: "attack",
        damageType: "elemental",
        effectsToEnemy: [effects.burning],
        cooldown: 6,
        onCooldown: 0,
        power: 1,
        mpCost: 5,
    },
    healing_light: {
        id: "healing_light",
        icon: "gfx/status/healing.png",
        type: "heal",
        effectsToSelf: [effects.regeneration_1],
        cooldown: 10,
        mpCost: 10,
    },
    battle_aura: {
        id: "battle_aura",
        icon: "gfx/abilities/battle-gear.png",
        type: "buff",
        effectsToSelf: [effects.attack_1],
        cooldown: 12,
    },
};
//# sourceMappingURL=abilities.js.map