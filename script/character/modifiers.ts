/* Contains functions used to get all status modifiers */

const defaultModifiers = {
  expGainP: 1,
  goldGainP: 1,
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
};

function getAllModifiers(char: Character | Player) {
  const modifiers = { ...defaultModifiers };
  char.traits.forEach((trait: any) => {
    if (trait.modifiers) {
      Object.entries(trait.modifiers).forEach((modifier: any) => {
        applyModifierToTotal(modifier, modifiers);
      });
    }
  });
  char.perks?.forEach((perk: any) => {
    if (perk.modifiers) {
      Object.entries(perk.modifiers).forEach((modifier: any) => {
        applyModifierToTotal(modifier, modifiers);
      });
    }
  });
  char.skills?.forEach((skill: Skill) => {
    const mods = skill.getCurrentLevel({ increment: true });
    if (mods?.modifiers) {
      Object.entries(mods.modifiers).forEach((modifier: any) => {
        applyModifierToTotal(modifier, modifiers);
      });
    }
  });
  char.statuses.forEach((status: any) => {
    if (status.modifiers) {
      Object.entries(status.modifiers).forEach((modifier: any) => {
        applyModifierToTotal(modifier, modifiers);
      });
    }
  });
  if (char.race?.modifiers) {
    Object.entries(char.race.modifiers).forEach((modifier: any) => {
      applyModifierToTotal(modifier, modifiers);
    });
  }
  if (char.equipment) {
    Object.values(char.equipment).forEach((item: any) => {
      if (item?.modifiers) {
        Object.entries(item.modifiers).forEach((modifier: any) => {
          applyModifierToTotal(modifier, modifiers);
        });
      }
    });
  }
  return modifiers;
}

function applyModifierToTotal(modifier: any, total: any) {
  const key = modifier[0];
  const value = modifier[1];
  if (!total?.[key]) {
    total[key] = value;
    if (typeof value === "number") {
      if (key.endsWith("P")) {
        total[key] = 1 + total[key] / 100;
      }
    }
  } else if (typeof value === "number") {
    if (key.endsWith("P")) total[key] += value / 100;
    else if (key.endsWith("V")) total[key] += value;
  } else {
    total[key] = mergeObjects(total[key], value);
  }
}

// This function was found here:
// https://stackoverflow.com/a/53509503
const mergeObjects = (obj1: any, obj2: any, options?: { subtract?: boolean }) => {
  return Object.entries(obj1).reduce(
    (prev, [key, value]) => {
      if (typeof value === "number") {
        if (options?.subtract) {
          prev[key] = value - (prev[key] || 0);
          if (!prev[key]) prev[key] = value;
        } else {
          prev[key] = value + (prev[key] || 0);
        }
      } else {
        if (obj2 === undefined) obj2 = {};
        prev[key] = mergeObjects(value, obj2[key]);
      }
      return prev;
    },
    { ...obj2 }
  ); // spread to avoid mutating obj2
};

const updateObject = (key: string, object: any, mods: any): object => {
  return Object.entries(object).map(([_key, value]) => {
    if (typeof value === "number") {
      const bonus = mods?.[key]?.[_key + "V"] ?? 0;
      const modifier = 1 + (mods?.[key]?.[_key + "P"] / 100 || 0);
      return +(((value || 0) + bonus) * modifier).toFixed(2);
    } else if (typeof value === "object") {
      return updateObject(_key, value, mods?.[key]);
    }
  });
};

const updateObjectWithoutReturn = (key: string, object: any, mods: any) => {
  return Object.entries(object).map(([_key, value]) => {
    if (typeof value === "number") {
      const bonus = mods?.[key]?.[_key + "V"] ?? 0;
      const modifier = 1 + (mods?.[key]?.[_key + "P"] / 100 || 0);
      object[_key] + (((value || 0) + bonus) * modifier).toFixed(2);
    } else if (typeof value === "object") {
      return updateObject(_key, value, mods?.[key]);
    }
  });
};
