"use strict";
/* Contains functions used to get all status modifiers */
const defaultModifiers = {
    expGainP: 1,
    goldGainP: 1,
    luckP: 1,
    physicalDamageP: 1,
    magicalDamageP: 1,
    elementalDamageP: 1,
    speedP: 1,
    allCooldownP: 1,
    physicalDefenceP: 1,
    magicalDefenceP: 1,
    elementalDefenceP: 1,
    physicalDefenceV: 0,
    magicalDefenceV: 0,
    elementalDefenceV: 0,
    hpMaxFromVitV: 5,
    mpMaxFromIntV: 2,
    mpMaxFromSpiV: 2,
    meleeDamageP: 1,
    rangedDamageP: 1,
    spellPowerP: 1,
    healPowerP: 1,
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
    char.perks?.forEach((perk) => {
        perk.levels.forEach((level, lvl) => {
            if (lvl >= perk.level)
                return;
            if (level.modifiers) {
                Object.entries(level.modifiers).forEach((modifier) => {
                    applyModifierToTotal(modifier, modifiers);
                });
            }
        });
    });
    char.skills?.forEach((skill) => {
        const mods = skill.getCurrentLevel({ increment: true });
        if (mods?.modifiers) {
            Object.entries(mods.modifiers).forEach((modifier) => {
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
    if (char.equipment) {
        Object.values(char.equipment).forEach((item) => {
            if (item?.modifiers) {
                Object.entries(item.modifiers).forEach((modifier) => {
                    applyModifierToTotal(modifier, modifiers);
                });
            }
        });
    }
    if (char instanceof Player && typeof startingAspects !== "undefined") {
        const aspectModifiers = startingAspects[char?.starting_aspect]?.modifiers;
        if (aspectModifiers) {
            Object.entries(aspectModifiers).forEach((modifier) => {
                applyModifierToTotal(modifier, modifiers);
            });
        }
    }
    if (char instanceof Player && char.class?.modifiers) {
        Object.entries(char.class.modifiers).forEach((modifier) => {
            applyModifierToTotal(modifier, modifiers);
        });
        char.class.perks.forEach((perk) => {
            if (perk.modifiers) {
                Object.entries(perk.modifiers).forEach((modifier) => {
                    applyModifierToTotal(modifier, modifiers);
                });
            }
        });
    }
    return modifiers;
}
function getModifierBreakdown(modif, char) {
    const breakdown = {
        traitsP: 1,
        perksP: 1,
        statusesP: 1,
        raceP: 1,
        equipmentP: 1,
        aspectP: 1,
        classP: 1,
    };
    char.traits.forEach((trait) => {
        if (trait.modifiers) {
            Object.entries(trait.modifiers).forEach((modifier) => {
                if (modifier[0] === modif && modifier[0].endsWith("P")) {
                    breakdown.traitsP *= 1 + modifier[1] / 100;
                }
                else
                    return;
            });
        }
    });
    char.perks?.forEach((perk) => {
        perk.levels.forEach((level, lvl) => {
            if (lvl >= perk.level)
                return;
            if (level.modifiers) {
                Object.entries(level.modifiers).forEach((modifier) => {
                    if (modifier[0] === modif && modifier[0].endsWith("P")) {
                        breakdown.perksP *= 1 + modifier[1] / 100;
                    }
                });
            }
        });
    });
    char.statuses.forEach((status) => {
        if (status.modifiers) {
            Object.entries(status.modifiers).forEach((modifier) => {
                if (modifier[0] === modif && modifier[0].endsWith("P")) {
                    breakdown.statusesP *= 1 + modifier[1] / 100;
                }
            });
        }
    });
    if (char.race?.modifiers) {
        Object.entries(char.race.modifiers).forEach((modifier) => {
            if (modifier[0] === modif && modifier[0].endsWith("P")) {
                breakdown.raceP *= 1 + modifier[1] / 100;
            }
        });
    }
    if (char.equipment) {
        Object.values(char.equipment).forEach((item) => {
            if (item?.modifiers) {
                Object.entries(item.modifiers).forEach((modifier) => {
                    if (modifier[0] === modif && modifier[0].endsWith("P")) {
                        breakdown.equipmentP *= 1 + modifier[1] / 100;
                    }
                });
            }
        });
    }
    if (char instanceof Player && typeof startingAspects !== "undefined") {
        const aspectModifiers = startingAspects[char?.starting_aspect]?.modifiers;
        if (aspectModifiers) {
            Object.entries(aspectModifiers).forEach((modifier) => {
                if (modifier[0] === modif && modifier[0].endsWith("P")) {
                    breakdown.aspectP *= 1 + modifier[1] / 100;
                }
            });
        }
    }
    if (char instanceof Player && char.class?.modifiers) {
        Object.entries(char.class.modifiers).forEach((modifier) => {
            if (modifier[0] === modif && modifier[0].endsWith("P")) {
                breakdown.classP *= 1 + modifier[1] / 100;
            }
        });
        char.class.perks.forEach((perk) => {
            if (perk.modifiers) {
                Object.entries(perk.modifiers).forEach((modifier) => {
                    if (modifier[0] === modif && modifier[0].endsWith("P")) {
                        breakdown.classP *= 1 + modifier[1] / 100;
                    }
                });
            }
        });
    }
    return breakdown;
}
function applyModifierToTotal(modifier, total) {
    const key = modifier[0];
    const value = modifier[1];
    if (!total?.[key]) {
        total[key] = value;
        if (typeof value === "number") {
            if (key.endsWith("P")) {
                total[key] = 1 + total[key] / 100;
            }
        }
    }
    else if (typeof value === "number") {
        if (key.endsWith("P")) {
            total[key] *= 1 + value / 100;
        }
        else if (key.endsWith("V"))
            total[key] += value;
    }
    else {
        total[key] = mergeObjects(total[key], value);
    }
}
// This function was found here:
// https://stackoverflow.com/a/53509503
const mergeObjects = (obj1, obj2, options) => {
    return Object.entries(obj1).reduce((prev, [key, value]) => {
        if (typeof value === "number") {
            if (options?.subtract) {
                prev[key] = value - (prev[key] || 0);
                if (!prev[key])
                    prev[key] = value;
            }
            else {
                prev[key] = value + (prev[key] || 0);
            }
        }
        else {
            if (obj2 === undefined)
                obj2 = {};
            prev[key] = mergeObjects(value, obj2[key]);
        }
        return prev;
    }, { ...obj2 }); // spread to avoid mutating obj2
};
const updateObject = (key, object, mods) => {
    return Object.entries(object).map(([_key, value]) => {
        if (typeof value === "number") {
            const bonus = mods?.[key]?.[_key + "V"] ?? 0;
            const modifier = 1 + (mods?.[key]?.[_key + "P"] / 100 || 0);
            return +(((value || 0) + bonus) * modifier).toFixed(2);
        }
        else if (typeof value === "object") {
            return updateObject(_key, value, mods?.[key]);
        }
    });
};
const updateObjectWithoutReturn = (key, object, mods) => {
    return Object.entries(object).map(([_key, value]) => {
        if (typeof value === "number") {
            const bonus = mods?.[key]?.[_key + "V"] ?? 0;
            const modifier = 1 + (mods?.[key]?.[_key + "P"] / 100 || 0);
            object[_key] + (((value || 0) + bonus) * modifier).toFixed(2);
        }
        else if (typeof value === "object") {
            return updateObject(_key, value, mods?.[key]);
        }
    });
};
//# sourceMappingURL=modifiers.js.map