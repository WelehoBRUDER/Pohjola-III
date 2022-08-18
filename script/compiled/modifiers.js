"use strict";
/* Contains functions used to get all status modifiers */
const defaultModifiers = {
    expGainP: 1,
    goldGainP: 1,
    physicalDamageP: 1,
    magicalDamageP: 1,
    elementalDamageP: 1,
    speed: 1,
};
function getAllModifiers(char) {
    const modifiers = { ...defaultModifiers };
    char.traits.forEach((trait) => {
        if (trait.modifiers) {
            Object.entries(trait.modifiers).forEach((modifier) => {
                applyModifierToTotal(modifier, modifiers);
            });
        }
    });
    char.statuses.forEach((status) => {
        if (status.modifiers) {
            Object.entries(status.modifiers).forEach((modifier) => {
                applyModifierToTotal(modifier, modifiers);
            });
        }
    });
    if (char.race?.modifiers) {
        Object.entries(char.race.modifiers).forEach((modifier) => {
            applyModifierToTotal(modifier, modifiers);
        });
    }
    return modifiers;
}
function applyModifierToTotal(modifier, total) {
    const key = modifier[0];
    const value = modifier[1];
    if (!total?.[key]) {
        total[key] = value;
        if (key.endsWith("P")) {
            total[key] = total[key] / 100;
        }
    }
    else if (key.endsWith("P"))
        total[key] += value / 100;
    else if (key.endsWith("V"))
        total[key] += value;
}
//# sourceMappingURL=modifiers.js.map