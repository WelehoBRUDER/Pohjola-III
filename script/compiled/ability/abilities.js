"use strict";
const abilities = {
    player_base_attack: {
        id: "player_base_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        skillType: "melee",
        damageType: "physical",
        power: 1,
        cooldown: 0,
        weight: 1,
    },
    physical_attack: {
        id: "physical_attack",
        icon: "gfx/abilities/pointy-sword.png",
        type: "attack",
        skillType: "melee",
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
        skillType: "melee",
        damageType: "physical",
        effectsToEnemy: [effects.wounded],
        cooldown: 13,
        onCooldown: 0,
        power: 0.75,
        weight: 2,
    },
    gore: {
        id: "gore",
        icon: "gfx/items/horned-helm.png",
        type: "attack",
        skillType: "melee",
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
        skillType: "melee",
        damageType: "physical",
        cooldown: 6,
        penetration: 0,
        onCooldown: 0,
        power: 1.25,
        weight: 2,
    },
    cleave: {
        id: "cleave",
        icon: "gfx/abilities/axe-swing.png",
        type: "attack",
        skillType: "melee",
        damageType: "physical",
        cooldown: 5,
        penetration: 0,
        onCooldown: 0,
        isAOE: true,
        power: 0.95,
        weight: 2,
    },
    poison_cloud: {
        id: "poison_cloud",
        icon: "gfx/abilities/poison-gas.png",
        type: "attack",
        special: "poison",
        skillType: "ranged",
        damageType: "elemental",
        effectsToEnemy: [effects.poison_1],
        cooldown: 25,
        mpCost: 25,
        penetration: 0,
        onCooldown: 0,
        isAOE: true,
        power: 0.25,
        weight: 2,
    },
    poisoned_slash: {
        id: "poisoned_slash",
        icon: "gfx/abilities/poison-gas.png",
        type: "attack",
        skillType: "ranged",
        damageType: "elemental",
        effectsToEnemy: [effects.poison_1],
        cooldown: 21,
        penetration: 0,
        onCooldown: 0,
        power: 0.75,
        weight: 3,
    },
    disorienting_blow: {
        id: "disorienting_blow",
        icon: "gfx/abilities/shield-bash.png",
        type: "attack",
        skillType: "melee",
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
        skillType: "melee",
        damageType: "physical",
        effectsToEnemy: [effects.stunned],
        cooldown: 13,
        onCooldown: 0,
        power: 0.85,
        weight: 2,
    },
    smite: {
        id: "smite",
        icon: "gfx/abilities/deadly-strike.png",
        type: "attack",
        special: "divine",
        isSpell: true,
        damage: 23,
        damageType: "magical",
        cooldown: 6,
        onCooldown: 0,
        power: 0,
        mpCost: 16,
        weight: 3,
    },
    flame: {
        id: "flame",
        icon: "gfx/abilities/fire-spell-cast.png",
        type: "attack",
        isSpell: true,
        damage: 15,
        damageType: "elemental",
        effectsToEnemy: [effects.burning],
        cooldown: 11,
        onCooldown: 0,
        power: 0,
        mpCost: 17,
        weight: 3,
    },
    fireball: {
        id: "fireball",
        icon: "gfx/abilities/fire-spell-cast.png",
        type: "attack",
        isSpell: true,
        damage: 24,
        damageType: "elemental",
        effectsToEnemy: [effects.burning_2],
        cooldown: 14,
        onCooldown: 0,
        power: 0,
        mpCost: 30,
        weight: 3,
    },
    thorns_bind: {
        id: "thorns_bind",
        icon: "gfx/abilities/light-thorny-triskelion.png",
        type: "attack",
        isSpell: true,
        damage: 11,
        damageType: "elemental",
        effectsToEnemy: [effects.binding_thorns],
        cooldown: 13,
        onCooldown: 0,
        power: 0,
        mpCost: 20,
        weight: 3,
    },
    ice_bolt: {
        id: "ice_bolt",
        icon: "gfx/abilities/ice-bolt.png",
        type: "attack",
        isSpell: true,
        damage: 19,
        damageType: "elemental",
        effectsToEnemy: [effects.frozen],
        cooldown: 10,
        onCooldown: 0,
        power: 0,
        mpCost: 18,
        weight: 2,
    },
    magic_blast: {
        id: "magic_blast",
        icon: "gfx/abilities/blaster.png",
        type: "attack",
        isSpell: true,
        damage: 28,
        damageType: "magical",
        cooldown: 5,
        onCooldown: 0,
        power: 0,
        mpCost: 15,
        weight: 2,
    },
    piercing_comet: {
        id: "piercing_comet",
        icon: "gfx/abilities/fragmented-meteor.png",
        type: "attack",
        isSpell: true,
        damage: 57,
        penetration: 0.3,
        damageType: "magical",
        cooldown: 10,
        onCooldown: 0,
        power: 0,
        mpCost: 30,
        weight: 2,
    },
    meteor: {
        id: "meteor",
        icon: "gfx/abilities/meteor-impact.png",
        type: "attack",
        isAOE: true,
        isSpell: true,
        damage: 61,
        penetration: 0.2,
        damageType: "magical",
        cooldown: 11,
        onCooldown: 0,
        power: 0,
        mpCost: 55,
        weight: 2,
    },
    healing_light: {
        id: "healing_light",
        icon: "gfx/status/healing.png",
        type: "heal",
        effectsToSelf: [effects.regeneration_1],
        cooldown: 12,
        mpCost: 20,
        weight: 4,
    },
    regeneration_spell: {
        id: "regeneration_spell",
        icon: "gfx/status/healing.png",
        type: "heal",
        effectsToSelf: [effects.regeneration_2],
        cooldown: 16,
        mpCost: 40,
        weight: 5,
    },
    holy_grace: {
        id: "holy_grace",
        icon: "gfx/status/holy-grace.png",
        type: "heal",
        effectsToSelf: [effects.holy_grace],
        cooldown: 14,
        mpCost: 25,
        weight: 6,
    },
    battle_aura: {
        id: "battle_aura",
        icon: "gfx/abilities/battle-gear.png",
        type: "buff",
        effectsToSelf: [effects.attack_1],
        cooldown: 12,
        weight: 2,
    },
    bull_rage: {
        id: "bull_rage",
        icon: "gfx/abilities/battle-gear.png",
        type: "heal",
        effectsToSelf: [effects.bull_rage],
        cooldown: 30,
        weight: 20,
    },
    haste_enchant: {
        id: "haste_enchant",
        icon: "gfx/icons/running-ninja.png",
        type: "buff",
        effectsToSelf: [effects.haste_1],
        cooldown: 15,
        weight: 2,
    },
};
//# sourceMappingURL=abilities.js.map