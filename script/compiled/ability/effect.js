"use strict";
class Effect {
    constructor(effect) {
        this.id = effect.id;
        this.icon = effect.icon;
        this.duration = effect.duration;
        this.type = effect.type;
        this.effects = effect.effects ? { ...effect.effects } : {};
    }
    tooltip() {
        let tooltip = "<f>1.25rem<f>";
        tooltip += `<c>goldenrod<c>${game.getLocalizedString(this.id)}\n`;
        tooltip += "<f>1rem<f><c>white<c>";
        tooltip += `${game.getLocalizedString("type")}: ${game.getLocalizedString(this.type)}\n`;
        tooltip += `${game.getLocalizedString("duration")}: ${this.duration}s\n`;
        if (this.effects) {
            Object.entries(this.effects).map(([key, value]) => {
                tooltip += effectSyntax(key, value);
            });
        }
        return tooltip;
    }
}
//# sourceMappingURL=effect.js.map