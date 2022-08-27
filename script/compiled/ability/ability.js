"use strict";
class Ability {
    constructor(ability) {
        this.id = ability.id;
        this.icon = ability.icon;
        this.mpCost = ability.mpCost ?? 0;
        this.hpCost = ability.hpCost ?? 0;
        this.type = ability.type;
        this.cooldown = ability.cooldown ?? 0;
        this.onCooldown = ability.onCooldown ?? 0;
        this.damageType = ability.damageType;
        this.damage = ability.damage ?? 0;
        this.power = ability.power ?? 0;
        this.penetration = ability.penetration ?? 0;
        this.healFlat = ability.healFlat ?? 0;
        this.healPercent = ability.healPercent ?? 0;
        if (ability.effectsToEnemy) {
            this.effectsToEnemy = [];
            ability.effectsToEnemy.map((effect) => {
                // This can't be undefined since we have assigned it above!
                this.effectsToEnemy.push(new Effect(effects[effect.id]));
            });
        }
        if (ability.effectsToSelf) {
            this.effectsToSelf = [];
            ability.effectsToSelf.map((effect) => {
                // This can't be undefined since we have assigned it above!
                this.effectsToSelf.push(new Effect(effects[effect.id]));
            });
        }
        this.doCooldown = () => {
            if (!this.onCooldown)
                return;
            if (this.onCooldown > 0) {
                this.onCooldown -= 1 / 60;
            }
            else if (this.onCooldown < 0) {
                this.onCooldown = 0;
            }
        };
        this.setCooldown = () => {
            this.onCooldown = this.cooldown;
        };
        this.tooltip = (options) => {
            let tooltip = "<f>1.5rem<f>";
            if (options?.container)
                tooltip += "<ct>ability-container<ct>";
            // Define ability name
            tooltip += `${game.getLocalizedString(this.id)}\n`;
            tooltip += "<f>1.2rem<f>";
            // Ability type
            tooltip += `${game.getLocalizedString("type")}: ${game.getLocalizedString(this.type)}\n`;
            if (this.power) {
                tooltip += `<i>${icons.power}<i>${game.getLocalizedString("power")}: ${this.power * 100}%\n`;
            }
            if (this.healFlat || this.healPercent) {
                if (this.healFlat > 0 && this.healPercent > 0) {
                    tooltip += `<i>${icons.heal}<i>${game.getLocalizedString("heal")}: ${this.healFlat} + ${this.healPercent}%\n`;
                }
                else if (this.healFlat > 0) {
                    tooltip += `<i>${icons.heal}<i>${game.getLocalizedString("heal")}: ${this.healFlat}\n`;
                }
                else if (this.healPercent > 0) {
                    tooltip += `<i>${icons.heal}<i>${game.getLocalizedString("heal")}: ${this.healPercent}%\n`;
                }
            }
            // Ability attack values
            if (this.damageType) {
                tooltip += `${game.getLocalizedString("damage_type")}: <i>${icons[this.damageType]}<i>${game.getLocalizedString(this.damageType)}\n`;
            }
            if (this.penetration) {
                tooltip += `${game.getLocalizedString("penetration")}: ${this.penetration * 100}%\n`;
            }
            // Ability cost
            if (this.mpCost > 0) {
                tooltip += `${game.getLocalizedString("mp_cost")}: ${this.mpCost}\n`;
            }
            if (this.hpCost > 0) {
                tooltip += `${game.getLocalizedString("hp_cost")}: ${this.hpCost}\n`;
            }
            // Ability cooldown
            if (this.cooldown > 0) {
                tooltip += `<i>${icons.cooldown}<i>${game.getLocalizedString("cooldown")}: ${this.cooldown}s\n`;
            }
            // Ability effects
            if (this.effectsToEnemy) {
                tooltip += `${game.getLocalizedString("effects_to_foe")}: \n`;
                this.effectsToEnemy.forEach((effect) => {
                    if (options?.owner) {
                        const displayEffect = new Effect(effect);
                        displayEffect.init(options?.owner?.allModifiers?.["ability_" + this.id]?.["effect_" + effect.id]);
                        tooltip += displayEffect.tooltip({ container: true });
                    }
                    else {
                        tooltip += effect.tooltip({ container: true });
                    }
                });
            }
            if (this.effectsToSelf) {
                tooltip += `${game.getLocalizedString("effects_to_self")}: \n`;
                this.effectsToSelf.forEach((effect) => {
                    if (options?.owner) {
                        const displayEffect = new Effect(effect);
                        displayEffect.init(options?.owner?.allModifiers?.["ability_" + this.id]?.["effect_" + effect.id]);
                        tooltip += displayEffect.tooltip({ container: true });
                    }
                    else {
                        tooltip += effect.tooltip({ container: true });
                    }
                });
            }
            return tooltip;
        };
        this.canUse = (user) => {
            if (this.onCooldown > 0)
                return false;
            if (this.mpCost && user.stats.mp < this.mpCost)
                return false;
            if (this.hpCost && user.stats.hp < this.hpCost)
                return false;
            return true;
        };
        this.use = (user, target) => {
            user.stats.ap = 0;
            this.setCooldown();
            if (this.mpCost)
                user.stats.mp -= this.mpCost;
            if (this.hpCost)
                user.stats.hp -= this.hpCost;
            if (this.type === "attack") {
                const { critRate, critPower } = user.getCrit();
                let damage = calculateDamage(user, target, this);
                const didCrit = Math.random() < critRate / 100;
                if (didCrit)
                    damage = Math.floor(damage * (1 + critPower / 100));
                if (target.isEnemy) {
                    target.hurt(damage, didCrit);
                }
                else {
                    player.stats.hp -= damage;
                    createDroppingText(damage.toString(), tools);
                    if (didCrit) {
                        createDroppingText("CRIT!", tools, "crit");
                    }
                    update();
                    shakeScreen();
                }
                if (this.effectsToEnemy) {
                    this.effectsToEnemy.forEach((effect) => {
                        target.addStatus(effect, user, "ability_" + this.id);
                    });
                }
            }
            else if (this.type === "heal") {
                if (this.healFlat || this.healPercent) {
                    let heal = 0;
                    if (this.healFlat) {
                        heal += this.healFlat;
                    }
                    if (this.healPercent) {
                        heal += Math.floor(target.stats.maxHp * this.healPercent);
                    }
                    if (target.isEnemy) {
                        target.heal(heal);
                    }
                    else {
                        player.stats.hp += heal;
                        createDroppingText(heal.toString(), tools);
                        update();
                    }
                }
                if (this.effectsToSelf) {
                    this.effectsToSelf.forEach((effect) => {
                        target.addStatus(effect, user, "ability_" + this.id);
                    });
                }
                if (user.id === "player") {
                    healingScreen.classList.add("show");
                    setTimeout(() => {
                        healingScreen.classList.remove("show");
                    }, 200);
                }
            }
            if (user.id === "player") {
                setTimeout(() => {
                    game.resume();
                }, 300 / game.settings.animation_speed);
            }
            update();
        };
        this.updateStats = (holder) => {
            let id = this.id;
            const baseStats = { ...abilities[id] };
            id = "ability_" + id;
            Object.entries(this).forEach(([key, value]) => {
                if (typeof value !== "number" || typeof value === "object")
                    return;
                if (typeof value === "number") {
                    const bonus = holder.allModifiers[id]?.[key + "V"] ?? 0;
                    const modifier = 1 + (holder.allModifiers[id]?.[key + "P"] / 100 || 0);
                    const base = baseStats[key] ? baseStats[key] : value;
                    this[key] = +(((base || 0) + bonus) * modifier).toFixed(2);
                }
                else if (typeof value === "object" && !Array.isArray(value)) {
                    this[key] = updateObject(key, value, holder.allModifiers[id]);
                }
            });
        };
    }
}
//# sourceMappingURL=ability.js.map