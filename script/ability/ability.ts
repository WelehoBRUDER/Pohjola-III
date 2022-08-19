class Ability {
  [id: string]: any;
  icon: string;
  mpCost: number;
  hpCost: number;
  type: string;
  cooldown: number;
  onCooldown: number;
  damage?: I_Damage;
  power?: number;
  penetration?: number;
  constructor(ability: Ability) {
    this.id = ability.id;
    this.icon = ability.icon;
    this.mpCost = ability.mpCost;
    this.hpCost = ability.hpCost;
    this.type = ability.type;
    this.cooldown = ability.cooldown;
    this.onCooldown = ability.onCooldown ?? 0;
    this.damage = ability.damage;
    this.power = ability.power;
    this.penetration = ability.penetration;

    this.doCooldown = () => {
      if (!this.onCooldown) return;
      if (this.onCooldown > 0) {
        this.onCooldown -= 1 / 30;
      } else if (this.onCooldown < 0) {
        this.onCooldown = 0;
      }
    };

    this.setCooldown = () => {
      this.onCooldown = this.cooldown;
    };

    this.tooltip = () => {
      let tooltip = "<f>1.5rem<f>";
      tooltip += `${game.getLocalizedString(this.id)}\n`;
      tooltip += `<f>1rem<f>${game.getLocalizedString("mp_cost")}: ${
        this.mpCost
      }\n`;
      tooltip += `${game.getLocalizedString("hp_cost")}: ${this.hpCost}\n`;
      tooltip += `${game.getLocalizedString("cooldown")}: ${this.cooldown}s\n`;
      tooltip += `${game.getLocalizedString("type")}: ${game.getLocalizedString(
        this.type
      )}\n`;
      if (this.power) {
        tooltip += `${game.getLocalizedString("power")}: ${this.power}x\n`;
      }
      if (this.penetration) {
        tooltip += `${game.getLocalizedString("penetration")}: ${
          this.penetration * 100
        }%\n`;
      }
      return tooltip;
    };
  }
}