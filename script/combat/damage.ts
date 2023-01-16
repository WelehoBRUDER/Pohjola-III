function calculateFlatDamage(char: Player | Enemy): I_Damage {
  const damages: I_Damage = { physical: 0, magical: 0, elemental: 0 };
  return damages;
}

const damageBoostingStats: any = {
  physical: "str",
  magical: "int",
  elemental: "spi",
};

function calculateDamage(attacker: Player | Enemy, defender: Player | Enemy, attack: Ability): number {
  let damage = attacker.getDamage();
  const attackerStats = attacker.getStats();
  const defences = defender.getDefences();
  const key = attack.damageType ?? "physical";

  // define values
  let modifier: number = 1;
  let boost: number = 0;
  let defence: number = defences[key];

  // Add stat boost to modifier
  modifier += attackerStats[damageBoostingStats[key]] / 50;

  // Add stat effects to modifier
  modifier += attacker.allModifiers[key + "_damageP"] ?? 0;
  modifier += attacker.allModifiers["damageP"] ?? 0;

  // Add boosts to flat value
  boost += attacker.allModifiers[key + "_damageV"] ?? 0;
  modifier += attacker.allModifiers["damageV"] ?? 0;

  // Apply penetration to defence
  defence *= 1 - (attacker.allModifiers[key + "_penetrationP"] ?? 0);
  defence *= 1 - (attacker.allModifiers["penetrationP"] ?? 0);
  defence *= 1 - (attack.penetration ?? 0);

  // Finalize defence
  defence = 1 - defence / 100;

  // Increase damage by attack power
  modifier *= attack.power ?? 1;

  // Lower damage by defence
  modifier *= defence;

  // Apply damage
  damage = (damage + boost) * modifier;

  // Damage isn't supposed to heal!
  if (damage < 0) damage = 0;

  if (defender instanceof Player) {
    if (DEVTOOLS.GOD) damage = 0;
  }

  if (attacker instanceof Player) {
    if (DEVTOOLS.ONE_PUNCH) damage = 999999;
  }

  return Math.floor(damage);
}
