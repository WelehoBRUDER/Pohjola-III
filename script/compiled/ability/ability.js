"use strict";
class Ability {
    constructor(ability) {
        this.id = ability.id;
        this.icon = ability.icon;
        this.mpCost = ability.mpCost ?? 0;
        this.hpCost = ability.hpCost ?? 0;
        this.type = ability.type;
        this.cooldown = ability.cooldown;
        this.onCooldown = ability.onCooldown ?? 0;
        this.damage = ability.damage ?? {};
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
            let tooltip = "<f>1.5rem<f>";
            tooltip += `${game.getLocalizedString(this.id)}\n`;
            tooltip += `<f>1rem<f>${game.getLocalizedString("mp_cost")}: ${this.mpCost}\n`;
            tooltip += `${game.getLocalizedString("hp_cost")}: ${this.hpCost}\n`;
            tooltip += `${game.getLocalizedString("cooldown")}: ${this.cooldown}s\n`;
            tooltip += `${game.getLocalizedString("type")}: ${game.getLocalizedString(this.type)}\n`;
            if (this.power) {
                tooltip += `${game.getLocalizedString("power")}: ${this.power}x\n`;
            }
            if (this.penetration) {
                tooltip += `${game.getLocalizedString("penetration")}: ${this.penetration * 100}%\n`;
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
        this.use = (attacker, defender) => { };
    }
}
//# sourceMappingURL=ability.js.map