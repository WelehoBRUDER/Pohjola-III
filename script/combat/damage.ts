function calculateFlatDamage(char: Player | Enemy): I_Damage {
  const damages: I_Damage = { physical: 0, magical: 0, elemental: 0 };
  return damages;
}

const damageBoostingStats: any = {
  physical: "str",
  magical: "int",
  elemental: "spi",
};

function calculateDamage(
  attacker: Player | Enemy,
  defender: Player | Enemy,
  attack: Ability
): number {
  let damage = attacker.getDamage();
  const attackerStats = attacker.getStats();
  const defences = defender.getDefences();
  const key = attack.damageType ?? "physical";

  console.log(attackerStats);

  console.log(damage, "1");

  // define values
  let modifier: number = 1;
  let boost: number = 0;
  let defence: number = defences[key];

  console.log(defence, "2");

  // Add stat boost to modifier
  modifier += attackerStats[damageBoostingStats[key]] / 20;

  console.log(modifier, "3");

  // Add stat effects to modifier
  modifier += attacker.allModifiers[key + "_damageP"] ?? 0;
  modifier += attacker.allModifiers["damageP"] ?? 0;

  console.log(modifier, "4");

  // Add boosts to flat value
  boost += attacker.allModifiers[key + "_damageV"] ?? 0;
  modifier += attacker.allModifiers["damageV"] ?? 0;

  console.log(boost, modifier, "5");

  // Apply penetration to defence
  defence *= 1 - (attacker.allModifiers[key + "_penetrationP"] ?? 0);
  console.log(defence, "6");
  defence *= 1 - (attacker.allModifiers["penetrationP"] ?? 0);
  console.log(defence, "7");
  defence *= 1 - (attack.penetration ?? 0);
  console.log(defence, "8");

  // Finalize defence
  defence = 1 - defence / 100;
  console.log(defence, "9");

  // Increase damage by attack power
  modifier *= attack.power ?? 1;
  console.log(modifier, "10");

  // Lower damage by defence
  modifier *= defence;
  console.log(modifier, "11");

  // Apply damage
  damage = (damage + boost) * modifier;

  return Math.floor(damage);
}
