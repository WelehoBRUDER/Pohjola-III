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
}
