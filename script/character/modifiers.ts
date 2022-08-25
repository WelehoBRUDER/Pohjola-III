/* Contains functions used to get all status modifiers */

const defaultModifiers = {
  expGainP: 1,
  goldGainP: 1,
  physicalDamageP: 1,
  magicalDamageP: 1,
  elementalDamageP: 1,
  speedP: 1,
  allCooldownP: 1,
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
const mergeObjects = (obj1: any, obj2: any) => {
  return Object.entries(obj1).reduce(
    (prev, [key, value]) => {
      if (typeof value === "number") {
        prev[key] = value + (prev[key] || 0);
      } else {
        prev[key] = mergeObjects(value, obj2[key]);
      }
      return prev;
    },
    { ...obj2 }
  ); // spread to avoid mutating obj2
};
