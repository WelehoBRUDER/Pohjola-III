"use strict";
const weapons = {
    broken_sword: {
        id: "broken_sword",
        price: 10,
        speed: 0,
        atk: 5,
        stackable: true,
        icon: "gfx/items/shattered-sword.png",
        tier: itemTiers.common,
        type: "weapon",
    },
    broken_mace: {
        id: "broken_mace",
        price: 10,
        speed: -5,
        atk: 6,
        stackable: true,
        icon: "gfx/items/bone-mace.png",
        tier: itemTiers.common,
        type: "weapon",
    },
    long_sword: {
        id: "long_sword",
        price: 120,
        speed: 0,
        atk: 8,
        stackable: true,
        icon: "gfx/items/broadsword.png",
        tier: itemTiers.uncommon,
        type: "weapon",
    },
    battle_axe: {
        id: "battle_axe",
        price: 150,
        speed: -5,
        atk: 10,
        stackable: true,
        icon: "gfx/items/sharp-axe.png",
        tier: itemTiers.uncommon,
        type: "weapon",
    },
    dual_daggers: {
        id: "dual_daggers",
        price: 150,
        speed: 8,
        atk: 7,
        stackable: true,
        icon: "gfx/icons/crossed-swords.png",
        tier: itemTiers.uncommon,
        type: "weapon",
    },
    great_shield: {
        id: "great_shield",
        price: 750,
        speed: 0,
        atk: 5,
        modifiers: {
            physicalDefenceV: 10,
            magicalDefenceV: 5,
            elementalDefenceV: 5,
            hpMaxP: 8.5,
        },
        stackable: true,
        icon: "gfx/items/round-shield.png",
        tier: itemTiers.rare,
        type: "weapon",
    },
    enchanted_blade: {
        id: "enchanted_blade",
        price: 800,
        speed: 5,
        atk: 15,
        stackable: true,
        icon: "gfx/items/broadsword.png",
        tier: itemTiers.rare,
        type: "weapon",
    },
    greatsword: {
        id: "greatsword",
        price: 900,
        speed: -5,
        atk: 20,
        stackable: true,
        icon: "gfx/items/relic-blade.png",
        tier: itemTiers.rare,
        type: "weapon",
    },
    executioner: {
        id: "executioner",
        price: 1000,
        speed: -12,
        atk: 23,
        stackable: true,
        icon: "gfx/items/dripping-sword.png",
        tier: itemTiers.rare,
        type: "weapon",
    },
    dagger_of_speed: {
        id: "dagger_of_speed",
        price: 1000,
        speed: 15,
        atk: 12,
        stackable: true,
        icon: "gfx/items/plain-dagger.png",
        tier: itemTiers.rare,
        type: "weapon",
        modifiers: {
            critRateV: 5,
        },
    },
    astral_spear: {
        id: "astral_spear",
        price: 3000,
        speed: 5,
        atk: 31,
        stackable: true,
        icon: "gfx/items/spear-hook.png",
        tier: itemTiers.epic,
        type: "weapon",
        modifiers: {
            spiP: 5,
        },
    },
    novice_wand: {
        id: "novice_wand",
        price: 110,
        speed: 0,
        atk: 6,
        spell_scale: 100,
        scaling: "int",
        stackable: true,
        icon: "gfx/items/orb-wand.png",
        tier: itemTiers.common,
        type: "weapon",
    },
    wizard_staff: {
        id: "wizard_staff",
        price: 880,
        speed: 0,
        atk: 11,
        spell_scale: 143,
        scaling: "int",
        stackable: true,
        icon: "gfx/items/orb-wand.png",
        tier: itemTiers.uncommon,
        type: "weapon",
    },
    legend_orb_wand: {
        id: "legend_orb_wand",
        price: 3000,
        speed: 0,
        atk: 19,
        spell_scale: 211,
        scaling: "int",
        stackable: true,
        icon: "gfx/items/orb-wand.png",
        tier: itemTiers.epic,
        type: "weapon",
    },
};
const armors = {
    /* Ragged set */
    ragged_armor: {
        id: "ragged_armor",
        price: 20,
        speed: 0,
        defence: {
            physical: 2,
            magical: 2,
            elemental: 0,
        },
        stackable: true,
        icon: "gfx/items/leather-vest.png",
        tier: itemTiers.common,
        type: "armor",
        slot: "armor",
    },
    ragged_hood: {
        id: "ragged_hood",
        price: 8,
        speed: 0,
        defence: {
            physical: 1,
            magical: 1,
            elemental: 0,
        },
        stackable: true,
        icon: "gfx/items/hood.png",
        tier: itemTiers.common,
        type: "armor",
        slot: "helmet",
    },
    ragged_boots: {
        id: "ragged_boots",
        price: 8,
        speed: 0,
        defence: {
            physical: 1,
            magical: 1,
            elemental: 0,
        },
        stackable: true,
        icon: "gfx/items/boots.png",
        tier: itemTiers.common,
        type: "armor",
        slot: "legs",
    },
    /* Hood of Wisdom */
    hood_of_wisdom: {
        id: "hood_of_wisdom",
        price: 90,
        speed: 0,
        defence: {
            physical: -10,
            magical: -10,
            elemental: -10,
        },
        modifiers: {
            expGainP: 10,
            goldGainP: 30,
        },
        stackable: true,
        icon: "gfx/items/hood.png",
        tier: itemTiers.uncommon,
        type: "armor",
        slot: "helmet",
    },
    /* Leather set */
    leather_armor: {
        id: "leather_armor",
        price: 170,
        speed: 2,
        defence: {
            physical: 7,
            magical: 5,
            elemental: 3,
        },
        modifiers: {
            hpMaxV: 10,
        },
        stackable: true,
        icon: "gfx/items/leather-vest.png",
        tier: itemTiers.uncommon,
        type: "armor",
        slot: "armor",
    },
    leather_helmet: {
        id: "leather_helmet",
        price: 90,
        speed: 1,
        defence: {
            physical: 3,
            magical: 2,
            elemental: 2,
        },
        stackable: true,
        icon: "gfx/items/horned-helm.png",
        tier: itemTiers.uncommon,
        type: "armor",
        slot: "helmet",
    },
    leather_boots: {
        id: "leather_boots",
        price: 90,
        speed: 1,
        defence: {
            physical: 3,
            magical: 2,
            elemental: 2,
        },
        stackable: true,
        icon: "gfx/items/boots.png",
        tier: itemTiers.uncommon,
        type: "armor",
        slot: "legs",
    },
    /* Plate set */
    plate_armor: {
        id: "plate_armor",
        price: 600,
        speed: -2,
        defence: {
            physical: 15,
            magical: 5,
            elemental: 5,
        },
        modifiers: {
            hpMaxV: 30,
        },
        stackable: true,
        icon: "gfx/items/breastplate.png",
        tier: itemTiers.rare,
        type: "armor",
        slot: "armor",
    },
    plate_helmet: {
        id: "plate_helmet",
        price: 350,
        speed: -2,
        defence: {
            physical: 5,
            magical: 2,
            elemental: 1,
        },
        modifiers: {
            hpMaxV: 10,
        },
        stackable: true,
        icon: "gfx/items/visored-helm.png",
        tier: itemTiers.rare,
        type: "armor",
        slot: "helmet",
    },
    plate_boots: {
        id: "plate_boots",
        price: 350,
        speed: -2,
        defence: {
            physical: 5,
            magical: 2,
            elemental: 1,
        },
        modifiers: {
            hpMaxV: 10,
        },
        stackable: true,
        icon: "gfx/items/leg-armor.png",
        tier: itemTiers.rare,
        type: "armor",
        slot: "legs",
    },
};
const materials = {
    bone: {
        id: "bone",
        price: 5,
        stackable: true,
        tier: itemTiers.common,
        type: "material",
    },
};
const potions = {
    small_recovery_gem: {
        id: "small_recovery_gem",
        icon: "gfx/items/weak_heal_gem.png",
        price: 20,
        heal: 10,
        effectsToSelf: [effects.regeneration_1],
        stackable: true,
        tier: itemTiers.common,
        type: "potion",
    },
    small_healing_potion: {
        id: "small_healing_potion",
        icon: "gfx/items/health-potion.png",
        price: 10,
        heal: 20,
        stackable: true,
        tier: itemTiers.common,
        type: "potion",
    },
    medium_healing_potion: {
        id: "medium_healing_potion",
        icon: "gfx/items/health-potion.png",
        price: 40,
        heal: 50,
        stackable: true,
        tier: itemTiers.uncommon,
        type: "potion",
    },
    large_healing_potion: {
        id: "large_healing_potion",
        icon: "gfx/items/health-potion.png",
        price: 200,
        heal: 100,
        stackable: true,
        tier: itemTiers.rare,
        type: "potion",
    },
    small_mana_potion: {
        id: "small_mana_potion",
        icon: "gfx/items/mana-potion.png",
        price: 10,
        manaRecover: 20,
        stackable: true,
        tier: itemTiers.common,
        type: "potion",
    },
    medium_mana_potion: {
        id: "medium_mana_potion",
        icon: "gfx/items/mana-potion.png",
        price: 100,
        manaRecover: 50,
        stackable: true,
        tier: itemTiers.uncommon,
        type: "potion",
    },
    large_mana_potion: {
        id: "large_mana_potion",
        icon: "gfx/items/mana-potion.png",
        price: 500,
        manaRecover: 100,
        stackable: true,
        tier: itemTiers.rare,
        type: "potion",
    },
};
const talismans = {
    talisman_of_strength: {
        id: "talisman_of_strength",
        icon: "gfx/items/talisman_of_strength",
        price: 100,
        modifiers: {
            strV: 3,
        },
        speed: 0,
        stackable: true,
        tier: itemTiers.common,
        type: "talisman",
        slot: "talisman",
    },
    ring_of_knowledge: {
        id: "ring_of_knowledge",
        icon: "gfx/items/ring.png",
        price: 250,
        modifiers: {
            expGainP: 10,
            goldGainP: 20,
            hpMaxP: -5,
        },
        speed: 0,
        stackable: true,
        tier: itemTiers.uncommon,
        type: "talisman",
        slot: "talisman",
    },
};
const items = {
    ...weapons,
    ...armors,
    ...materials,
    ...potions,
    ...talismans,
};
//# sourceMappingURL=items.js.map