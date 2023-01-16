"use strict";
function calculateFlatDamage(char) {
    var damages = { physical: 0, magical: 0, elemental: 0 };
    return damages;
}
var damageBoostingStats = {
    physical: "str",
    magical: "int",
    elemental: "spi"
};
function calculateDamage(attacker, defender, attack) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var damage = attacker.getDamage();
    var attackerStats = attacker.getStats();
    var defences = defender.getDefences();
    var key = (_a = attack.damageType) !== null && _a !== void 0 ? _a : "physical";
    // define values
    var modifier = 1;
    var boost = 0;
    var defence = defences[key];
    // Add stat boost to modifier
    modifier += attackerStats[damageBoostingStats[key]] / 20;
    // Add stat effects to modifier
    modifier += (_b = attacker.allModifiers[key + "_damageP"]) !== null && _b !== void 0 ? _b : 0;
    modifier += (_c = attacker.allModifiers["damageP"]) !== null && _c !== void 0 ? _c : 0;
    // Add boosts to flat value
    boost += (_d = attacker.allModifiers[key + "_damageV"]) !== null && _d !== void 0 ? _d : 0;
    modifier += (_e = attacker.allModifiers["damageV"]) !== null && _e !== void 0 ? _e : 0;
    // Apply penetration to defence
    defence *= 1 - ((_f = attacker.allModifiers[key + "_penetrationP"]) !== null && _f !== void 0 ? _f : 0);
    defence *= 1 - ((_g = attacker.allModifiers["penetrationP"]) !== null && _g !== void 0 ? _g : 0);
    defence *= 1 - ((_h = attack.penetration) !== null && _h !== void 0 ? _h : 0);
    // Finalize defence
    defence = 1 - defence / 100;
    // Increase damage by attack power
    modifier *= (_j = attack.power) !== null && _j !== void 0 ? _j : 1;
    // Lower damage by defence
    modifier *= defence;
    // Apply damage
    damage = (damage + boost) * modifier;
    // Damage isn't supposed to heal!
    if (damage < 0)
        damage = 0;
    if (defender instanceof Player) {
        if (DEVTOOLS.GOD)
            damage = 0;
    }
    if (attacker instanceof Player) {
        if (DEVTOOLS.ONE_PUNCH)
            damage = 999999;
    }
    return Math.floor(damage);
}
//# sourceMappingURL=damage.js.map