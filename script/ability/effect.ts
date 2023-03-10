interface EffectObject {
  [key: string]: any;
  id: string;
  icon: string;
  duration: number;
  type: string;
  buffDebuff: string;
  inflict?: Inflict;
  modifiers?: any;
}

interface EffectOptions {
  container?: boolean;
}

interface Inflict {
  damageFlat?: number;
  damagePercent?: number;
  healingFlat?: number;
  healingPercent?: number;
}

class Effect {
  [key: string]: any;
  id: string;
  icon: string;
  duration: number;
  type: string;
  buffDebuff: string;
  inflict?: Inflict;
  modifiers?: any;
  isInfinite?: boolean;
  constructor(effect: EffectObject) {
    this.id = effect.id;
    this.icon = effect.icon;
    this.duration = effect.duration;
    this.type = effect.type;
    this.buffDebuff = effect.buffDebuff;
    this.modifiers = effect.modifiers ? { ...effect.modifiers } : {};
    this.inflict = effect.inflict ? { ...effect.inflict } : {};
    this.isInfinite = effect.isInfinite || false;
  }

  tooltip(options?: EffectOptions) {
    let tooltip = "";
    if (options?.container) tooltip += "<ct>effect-container<ct>";
    tooltip += `<f>1.5rem<f><c>goldenrod<c><i>${this.icon}[medium]<i> ${game.getLocalizedString(this.id)}\n`;
    tooltip += "<f>1.2rem<f><c>white<c>";
    if (DEVTOOLS.ENABLED) {
      tooltip += `<c>white<c> [dev] <c>orange<c>${this.id}<c>white<c>\n`;
    }
    if (this.inflict) {
      Object.entries(this.inflict).forEach(([key, value]) => {
        tooltip += `${game.getLocalizedString(key + "_first")}`;
        tooltip += ` ${key.includes("Percent") ? value * 100 + "%" : value} `;
        tooltip += `${game.getLocalizedString(key + "_last").replace("[TYPE]", game.getLocalizedString(this.type))}\n`;
      });
    }

    // tooltip += `${game.getLocalizedString("type")}: ${game.getLocalizedString(
    //   this.type
    // )}\n`;
    if (!this.isInfinite) {
      tooltip += `<i>${icons.cooldown}<i>${game.getLocalizedString("duration")}: ${this.duration}s\n`;
    }
    if (this.modifiers && Object.keys(this.modifiers).length > 0) {
      tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
      Object.entries(this.modifiers).map(([key, value]) => {
        tooltip += " " + effectSyntax(key, value);
      });
    }

    return tooltip;
  }

  init(bonuses: any) {
    if (!bonuses) bonuses = {};
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
