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
        this.damageType = ability.damageType ?? "physical";
        this.damage = ability.damage ?? 0;
        this.power = ability.power ?? 0;
        this.penetration = ability.penetration ?? 0;
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
        this.tooltip = () => {
            // Define ability name
            let tooltip = "<f>1.5rem<f>";
            tooltip += `${game.getLocalizedString(this.id)}\n`;
            tooltip += "<f>1.2rem<f>";
            // Ability type
            tooltip += `${game.getLocalizedString("type")}: ${game.getLocalizedString(this.type)}\n`;
            // Ability attack values
            if (this.damageType) {
                tooltip += `${game.getLocalizedString("damage_type")}: ${game.getLocalizedString(this.damageType)}\n`;
            }
            if (this.power) {
                tooltip += `${game.getLocalizedString("power")}: ${this.power}x\n`;
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
                tooltip += `${game.getLocalizedString("cooldown")}: ${this.cooldown}s\n`;
            }
            return tooltip;
        };
        this.canUse = (user) => {
            if (this.onCooldown > 0)
                return false;
            if (this.mpCost && user.mp < this.mpCost)
                return false;
            if (this.hpCost && user.hp < this.hpCost)
                return false;
            return true;
        };
        this.use = (user, target) => {
            user.stats.ap = 0;
            this.setCooldown();
            if (this.type === "attack") {
                const damage = calculateDamage(user, target, this);
                if (target.isEnemy) {
                    target.hurt(damage);
                }
                else {
                    player.stats.hp -= damage;
                    createDroppingText(damage.toString(), tools);
                    update();
                    shakeScreen();
                }
            }
            if (user.id === "player") {
                setTimeout(() => {
                    game.resume();
                }, 250 / game.settings.animation_speed);
            }
            update();
        };
    }
}
//# sourceMappingURL=ability.js.map