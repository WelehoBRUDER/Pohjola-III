interface EffectObject {
  [id: string]: any;
  icon: string;
  duration: number;
  type: string;
}

class Effect {
  [id: string]: any;
  icon: string;
  duration: number;
  type: string;
  modifiers?: any;
  constructor(effect: EffectObject) {
    this.id = effect.id;
    this.icon = effect.icon;
    this.duration = effect.duration;
    this.type = effect.type;
    this.modifiers = effect.modifiers ? { ...effect.modifiers } : {};
  }

  tooltip() {
    let tooltip = "<f>1.25rem<f>";
    tooltip += `<c>goldenrod<c>${game.getLocalizedString(this.id)}\n`;
    tooltip += "<f>1rem<f><c>white<c>";
    tooltip += `${game.getLocalizedString("type")}: ${game.getLocalizedString(
      this.type
    )}\n`;
    tooltip += `${game.getLocalizedString("duration")}: ${this.duration}s\n`;
    if (this.modifiers) {
      tooltip += "\n<f>0.9rem<f><c>silver<c>Effects:\n";
      Object.entries(this.modifiers).map(([key, value]) => {
        tooltip += " " + effectSyntax(key, value);
      });
    }

    return tooltip;
  }

  init(bonuses: any) {
    Object.entries(this).forEach(([key, value]) => {
      if (typeof value === "number") {
        let bonus = bonuses?.[key + "V"] || 0;
        let modifier = 1 + (bonuses?.[key + "P"] / 100 || 0);
        this[key] = +((value + bonus) * modifier).toFixed(2);
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([_key, _value]) => {
          if (typeof _value === "number") {
            let bonus = bonuses?.[key]?.[_key + "V"] || 0;
            let modifier = 1 + (bonuses?.[key]?.[_key + "P"] / 100 || 0);
            this[key][_key] = +((_value + bonus) * modifier).toFixed(2);
          } else updateObjectWithoutReturn(_key, _value, bonuses[key]);
        });
      }
    });

    return this;
  }
}
