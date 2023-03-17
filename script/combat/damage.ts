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
  const resist = defender.getResistances();
  const key = attack.damageType ?? "physical";
  if (attack.isSpell) {
    damage = attack.damage * attacker.getSpellPower();
  }

  // define values
  let modifier: number = 1;
  let boost: number = 0;
  let defence: number = defences[key];

  // Add stat boost to modifier
  if (!attack.isSpell) {
    modifier += attackerStats[damageBoostingStats[key]] * 0.02;
  } else {
    modifier += attackerStats[damageBoostingStats[key]] * 0.007;
  }

  // Add stat effects to modifier
  modifier *= attacker.allModifiers[key + "DamageP"] ?? 1;
  modifier *= attacker.allModifiers["damageP"] ?? 1;

  // Add boosts to flat value
  boost += attacker.allModifiers[key + "DamageV"] ?? 0;
  boost += attacker.allModifiers["damageV"] ?? 0;

  // Apply penetration to defence
  defence *= 1 - (attacker.allModifiers[key + "_penetrationP"] ?? 0);
  defence *= 1 - (attacker.allModifiers["penetrationP"] ?? 0);
  defence *= 1 - (attack.penetration ?? 0);

  // Finalize defence
  defence = 1 - defence / 100;

  // Increase damage by attack power
  if (!attack.isSpell) {
    modifier *= attack.power ?? 1;
  }

  // Modify damage by attack type (melee or ranged)
  if (attack.skillType === "melee") {
    modifier *= attacker.allModifiers["meleeDamageP"];
  } else if (attack.skillType === "ranged") {
    modifier *= attacker.allModifiers["rangedDamageP"];
  }

  // Modify damage by special properties
  if (attack.special) {
    modifier *= Math.max(1 - resist[attack.special] / 100, 0.5); // Resistance can't reduce damage below 50%
    if (defender instanceof Player) {
      createDroppingText("WEAK!", tools, "weak", { fontSize: 40 });
    } else if (defender.card) {
      createDroppingText("WEAK!", defender.card.main, "weak", { fontSize: 40 });
    }
  }

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

  if (attacker instanceof Enemy) {
    damage *= challenge("enemy_damage");
  }

  return Math.floor(damage);
}
