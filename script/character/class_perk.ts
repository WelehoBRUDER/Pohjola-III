interface ClassPerkObject {
  [key: string]: any;
  id: string;
  type: string;
  class: string;
  unlock: {
    level?: number;
    stats?: any;
    gold: number;
  };
  modifiers?: any;
  commands?: any;
}

class ClassPerk {
  [key: string]: any;
  id: string;
  type: string;
  class: string;
  unlock: {
    level?: number;
    stats?: any;
    gold: number;
  };
  modifiers?: any;
  commands?: any;
  constructor(base: ClassPerkObject) {
    this.id = base.id;
    this.type = base.type;
    this.class = base.class;
    this.unlock = base.unlock;
    this.modifiers = base.modifiers;
    this.commands = base.commands;
  }

  available(): boolean {
    if (this.unlock.level) {
      if (player.level < this.unlock.level) return false;
    }
    if (this.unlock.stats) {
      const stats = this.unlock.stats;
      const pStats = player.getStats();
      stats.forEach((stat: string) => {
        if (pStats[stat] < stats[stat]) return false;
      });
    }
    if (this.unlock.gold) {
      if (player.gold < this.unlock.gold) return false;
    }
    if (player.class.perks.find((perk) => perk.id === this.id)) return false;
    console.log("lmao");
    return true;
  }

  assign(): void {
    if (!this.available()) return;
    hideHover();
    player.gold -= this.unlock.gold;
    player.class.perks.push({ ...this });
    if (this.commands) {
      Object.entries(this.commands).forEach(([key, value]: [string, any]) => {
        game.executeCommand(key, value);
      });
    }
    player.restore();
  }

  tooltip(): string {
    let tooltip: string = `<f>1.5rem<f><c>gold<c>${game.getLocalizedString(this.id)}\n`;
    tooltip += "<f>1.2rem<f>";

    if (DEVTOOLS.ENABLED) {
      tooltip += `<c>white<c> [dev] <c>orange<c>${this.id}<c>white<c>\n`;
    }

    // Perk description
    tooltip += `<c>silver<c>${game.getLocalizedString(this.id) + "_desc"}<c>white<c>\n`;

    if (this.commands) {
      Object.entries(this.commands).forEach(([key, value]: [string, any]) => {
        if (key === "add_ability") {
          const ability = new Ability({ ...value });
          tooltip += `<f>1.3rem<f>${game.getLocalizedString(key)}:\n`;
          tooltip += ability.tooltip({ container: true, owner: player });
          tooltip += "§<nct>-<nct><f>1.2rem<f><c>white<c>\n";
        }
      });
    }

    if (this.modifiers) {
      tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
      Object.entries(this.modifiers).map(([key, value]) => {
        tooltip += " " + effectSyntax(key, value);
      });
    }
    console.log(tooltip);
    return tooltip;
  }
}

interface ClassPerks {
  [key: string]: ClassPerk[];
  warrior: ClassPerk[];
  rogue: ClassPerk[];
  mage: ClassPerk[];
  paladin: ClassPerk[];
}

const classPerks: ClassPerks = {
  warrior: [],
  rogue: [],
  mage: [],
  paladin: [
    new ClassPerk({
      id: "paladin_smite",
      type: "classPerk",
      class: "paladin",
      unlock: {
        level: 1,
        gold: 100,
      },
      commands: {
        add_ability: { ...abilities.smite },
      },
    }),
  ],
};
