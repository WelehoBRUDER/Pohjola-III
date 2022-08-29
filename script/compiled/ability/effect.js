"use strict";
class Effect {
    constructor(effect) {
        this.id = effect.id;
        this.icon = effect.icon;
        this.duration = effect.duration;
        this.type = effect.type;
        this.modifiers = effect.modifiers ? { ...effect.modifiers } : {};
        this.inflict = effect.inflict ? { ...effect.inflict } : {};
    }
    tooltip(options) {
        let tooltip = "";
        if (options?.container)
            tooltip += "<ct>effect-container<ct>";
        tooltip += `<f>1.5rem<f><c>goldenrod<c><i>${this.icon}[medium]<i> ${game.getLocalizedString(this.id)}\n`;
        tooltip += "<f>1.2rem<f><c>white<c>";
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
        tooltip += `<i>${icons.cooldown}<i>${game.getLocalizedString("duration")}: ${this.duration}s\n`;
        if (this.modifiers && Object.keys(this.modifiers).length > 0) {
            tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
            Object.entries(this.modifiers).map(([key, value]) => {
                tooltip += " " + effectSyntax(key, value);
            });
        }
        return tooltip;
    }
    init(bonuses) {
        if (!bonuses)
            bonuses = {};
        Object.entries(this).forEach(([key, value]) => {
            if (typeof value === "number") {
                let bonus = bonuses?.[key + "V"] || 0;
                let modifier = 1 + (bonuses?.[key + "P"] / 100 || 0);
                this[key] = +((value + bonus) * modifier).toFixed(2);
            }
            else if (typeof value === "object") {
                Object.entries(value).forEach(([_key, _value]) => {
                    if (typeof _value === "number") {
                        let bonus = bonuses?.[key]?.[_key + "V"] || 0;
                        let modifier = 1 + (bonuses?.[key]?.[_key + "P"] / 100 || 0);
                        this[key][_key] = +((_value + bonus) * modifier).toFixed(2);
                    }
                    else
                        updateObjectWithoutReturn(_key, _value, bonuses[key]);
                });
            }
        });
        return this;
    }
}
//# sourceMappingURL=effect.js.map