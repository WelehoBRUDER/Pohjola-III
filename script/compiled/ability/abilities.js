"use strict";
const abilities = {
    player_base_attack: {
        id: "player_base_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        damageType: "physical",
        power: 1,
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
        cooldown: 13,
        onCooldown: 0,
        power: 0.8,
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
    },
    disorienting_blow: {
        id: "disorienting_blow",
        icon: "gfx/abilities/shield-bash.png",
        type: "attack",
        damageType: "physical",
        effectsToEnemy: [effects.dazed],
        cooldown: 10,
        onCooldown: 0,
        power: 0.75,
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
    },
    healing_light: {
        id: "healing_light",
        icon: "gfx/status/healing.png",
        type: "heal",
        effectsToSelf: [effects.regeneration_1],
        cooldown: 12,
        mpCost: 10,
    },
    holy_grace: {
        id: "holy_grace",
        icon: "gfx/status/holy-grace.png",
        type: "heal",
        effectsToSelf: [effects.holy_grace],
        cooldown: 14,
        mpCost: 20,
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