interface AbilityObject {
  [id: string]: any;
  icon: string;
  type: string;
  cooldown: number;
}

class Ability {
  [id: string]: any;
  icon: string;
  mpCost: number;
  hpCost: number;
  type: string;
  cooldown: number;
  onCooldown: number;
  effectsToEnemy?: Effect[];
  damageType?: string;
  damage: number;
  power: number;
  penetration: number;
  constructor(ability: AbilityObject) {
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

    if (ability.effectsToEnemy) {
      this.effectsToEnemy = [];
      ability.effectsToEnemy.map((effect: Effect) => {
        // This can't be undefined since we have assigned it above!
        this.effectsToEnemy!.push(new Effect(effects[effect.id]));
      });
    }

    this.doCooldown = () => {
      if (!this.onCooldown) return;
      if (this.onCooldown > 0) {
        this.onCooldown -= 1 / 60;
      } else if (this.onCooldown < 0) {
        this.onCooldown = 0;
      }
    };

    this.setCooldown = () => {
      this.onCooldown = this.cooldown;
    };

    interface options {
      container?: boolean;
    }

    this.tooltip = (options?: options) => {
      let tooltip = "<f>1.5rem<f>";
      if (options?.container) tooltip += "<ct>ability-container<ct>";
      // Define ability name
      tooltip += `${game.getLocalizedString(this.id)}\n`;
      tooltip += "<f>1.2rem<f>";

      // Ability type
      tooltip += `${game.getLocalizedString("type")}: ${game.getLocalizedString(
        this.type
      )}\n`;

      // Ability attack values
      if (this.damageType) {
        tooltip += `${game.getLocalizedString(
          "damage_type"
        )}: ${game.getLocalizedString(this.damageType)}\n`;
      }
      if (this.power) {
        tooltip += `${game.getLocalizedString("power")}: ${
          this.power * 100
        }%\n`;
      }
      if (this.penetration) {
        tooltip += `${game.getLocalizedString("penetration")}: ${
          this.penetration * 100
        }%\n`;
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
        tooltip += `${game.getLocalizedString("cooldown")}: ${
          this.cooldown
        }s\n`;
      }

      // Ability effects
      if (this.effectsToEnemy) {
        tooltip += `${game.getLocalizedString("effects_to_foe")}: \n`;
        this.effectsToEnemy.forEach((effect: Effect) => {
          tooltip += effect.tooltip({ container: true });
        });
      }

      return tooltip;
    };

    this.canUse = (user: Player | Enemy) => {
      if (this.onCooldown > 0) return false;
      if (this.mpCost && user.mp < this.mpCost) return false;
      if (this.hpCost && user.hp < this.hpCost) return false;
      return true;
    };

    this.use = (user: Player | Enemy, target: Player | Enemy) => {
      user.stats.ap = 0;
      this.setCooldown();
      if (this.type === "attack") {
        const { critRate, critPower } = user.getCrit();
        let damage = calculateDamage(user, target, this);
        const didCrit = Math.random() < critRate / 100;
        if (didCrit) damage = Math.floor(damage * (1 + critPower / 100));
        if (target.isEnemy) {
          target.hurt(damage, didCrit);
        } else {
          player.stats.hp -= damage;
          createDroppingText(damage.toString(), tools);
          if (didCrit) {
            createDroppingText("CRIT!", tools, "crit");
          }
          update();
          shakeScreen();
        }
        if (this.effectsToEnemy) {
          this.effectsToEnemy.forEach((effect: Effect) => {
            target.addStatus(effect, user, "ability_" + this.id);
          });
        }
      }
      if (user.id === "player") {
        setTimeout(() => {
          game.resume();
        }, 300 / game.settings.animation_speed);
      }
      update();
    };

    this.updateStats = (holder: Player | Enemy): void => {
      let id = this.id;
      const baseStats: Ability = { ...abilities[id] };
      id = "ability_" + id;
      Object.entries(this).forEach(([key, value]) => {
        if (typeof value !== "number" || typeof value === "object") return;
        if (typeof value === "number") {
          const bonus = holder.allModifiers[id]?.[key + "V"] ?? 0;
          const modifier =
            1 + (holder.allModifiers[id]?.[key + "P"] / 100 || 0);
          const base = baseStats[key] ? baseStats[key] : value;
          this[key] = +(((base || 0) + bonus) * modifier).toFixed(2);
        } else if (typeof value === "object" && !Array.isArray(value)) {
          this[key] = updateObject(key, value, holder.allModifiers[id]);
        }
      });
    };
  }
}
