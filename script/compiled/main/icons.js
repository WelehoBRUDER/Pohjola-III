"use strict";
const icons = {
    str: "gfx/status/biceps.png",
    agi: "gfx/status/acrobatic.png",
    int: "gfx/status/brain.png",
    vit: "gfx/status/weight-lifting-up.png",
    spi: "gfx/status/wisdom.png",
    atk: "gfx/icons/crossed-swords.png",
    hpMax: "gfx/status/heart-plus.png",
    mpMax: "gfx/icons/magic-swirl.png",
    mpRegen: "gfx/icons/regeneration.png",
    mpRegenFromInt: "gfx/icons/regeneration.png",
    mpRegenFromSpi: "gfx/icons/regeneration.png",
    physical: "gfx/status/physical.png",
    magical: "gfx/status/magical.png",
    elemental: "gfx/status/elemental.png",
    physicalDamage: "gfx/status/physical.png",
    magicalDamage: "gfx/status/magical.png",
    elementalDamage: "gfx/status/elemental.png",
    physicalDefence: "gfx/status/physical.png",
    magicalDefence: "gfx/status/magical.png",
    elementalDefence: "gfx/status/elemental.png",
    cooldown: "gfx/status/cooldown.png",
    allCooldown: "gfx/status/cooldown.png",
    power: "gfx/status/power.png",
    speed: "gfx/status/speedometer.png",
    dodge: "gfx/status/dodge_icon.png",
    critRate: "gfx/status/power.png",
    critPower: "gfx/status/power.png",
    weapon: "gfx/icons/piercing-sword.png",
    helmet: "gfx/icons/viking-helmet.png",
    armor: "gfx/icons/armor-vest.png",
    legs: "gfx/icons/steeltoe-boots.png",
    talisman: "gfx/items/generic-talisman.png",
    placeholder: "gfx/icons/triple-yin.png",
    penetration: "gfx/icons/cracked-shield.png",
    heal: "gfx/status/heart-plus.png",
    manaRecover: "gfx/status/magical.png",
    damage: "gfx/icons/damage.png",
    scaling: "gfx/icons/orb-direction.png",
    spell_scale: "gfx/icons/orb-direction.png",
    meleeDamage: "gfx/icons/melee_damage.png",
    rangedDamage: "gfx/icons/ranged_damage.png",
    spellPower: "gfx/icons/orb-direction.png",
    healPower: "gfx/icons/healing.png",
};
const coreCharacterStats = ["Str", "Agi", "Vit", "Int", "Spi"];
coreCharacterStats.forEach((stat) => {
    icons[`hpMaxFrom${stat}`] = `gfx/status/heart-plus.png`;
    icons[`mpMaxFrom${stat}`] = `gfx/icons/magic-swirl.png`;
    icons[`mpRegenFrom${stat}`] = `gfx/icons/regeneration.png`;
});
//# sourceMappingURL=icons.js.map