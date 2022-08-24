"use strict";
function calculateFlatDamage(char) {
    const damages = { physical: 0, magical: 0, elemental: 0 };
    return damages;
}
const damageBoostingStats = {
    physical: "str",
    magical: "int",
    elemental: "spi",
};
function calculateDamage(attacker, defender, attack) {
    let damage = 0;
    const attackerStats = attacker.getStats();
    const damages = attacker.getDamage();
    const defences = defender.getDefences();
    Object.entries(damages).forEach(([key, value]) => {
        // define values
        let modifier = 1;
        let boost = 0;
        let defence = defences[key];
        // Add stat boost to modifier
        modifier += attackerStats[damageBoostingStats[key]] / 20;
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
        // Lower damage by defence
        modifier *= defence;
        // Apply damage
        damage += (value + boost) * modifier;
    });
    return Math.floor(damage);
}
//# sourceMappingURL=damage.js.map