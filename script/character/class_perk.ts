interface ClassPerkObject {
  [key: string]: any;
  id: string;
  type: string;
  class: string;
  unlock: {
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
    if (this.unlock.stats) {
      const stats = this.unlock.stats;
      const pStats = player.getStats();
      Object.keys(stats).forEach((stat: string) => {
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

  assign(options?: { confirmed: boolean }): void {
    if (!this.available()) return;
    hideHover();
    closeConfirmationWindow();
    if (!options?.confirmed) {
      return confirmationWindow(`<f>1.5rem<f>${game.getLocalizedString("confirm_perk_unlock").replace("{id}", this.id)}`, () =>
        this.assign({ confirmed: true })
      );
    }
    player.removeGold(this.unlock.gold);
    player.class.perks.push({ ...this });
    if (this.commands) {
      Object.entries(this.commands).forEach(([key, value]: [string, any]) => {
        game.executeCommand(key, value);
      });
    }
    player.restore();
    createClassView();
  }

  tooltip(): string {
    let tooltip: string = `<f>1.5rem<f><c>gold<c>${game.getLocalizedString(this.id)}\n`;
    tooltip += "<f>1.2rem<f>";

    if (DEVTOOLS.ENABLED) {
      tooltip += `<c>white<c> [dev] <c>orange<c>${this.id}<c>white<c>\n`;
    }

    // Perk description
    tooltip += `<c>silver<c>"${game.getLocalizedString(this.id + "_desc")}"<c>white<c>\n`;

    if (player.hasClassPerk(this.id)) {
      tooltip += `<c>lime<c>${game.getLocalizedString("class_perk_owned")}<c>white<c>\n`;
    }

    // Perk unlock
    if (this.unlock.stats) {
      tooltip += `<c>silver<c>Requires:\n`;
      Object.entries(this.unlock.stats).forEach(([key, value]: any) => {
        const statCol = player.getStats()[key] >= value ? "lime" : "red";
        tooltip += ` <i>${icons[key]}<i>${game.getLocalizedString(key)}: <c>${statCol}<c>${value}<c>white<c>\n`;
      });
    }
    const priceCol = player.gold > this.unlock.gold ? "gold" : "red";
    tooltip += `Price: <c>${priceCol}<c>${compactNumber(this.unlock.gold)}<c>white<c>\n`;

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
    return tooltip;
  }
}

interface ClassPerks {
  [key: string]: ClassPerkGroup[];
  warrior: ClassPerkGroup[];
  rogue: ClassPerkGroup[];
  mage: ClassPerkGroup[];
  paladin: ClassPerkGroup[];
}

interface ClassPerkGroup {
  [key: string]: any;
  level: number;
  perks: ClassPerk[];
}

const classPerks: ClassPerks = {
  warrior: [
    {
      level: 1,
      perks: [
        new ClassPerk({
          id: "warrior_vitality",
          type: "classPerk",
          class: "warrior",
          unlock: {
            stats: {
              str: 15,
            },
            gold: 250,
          },
          modifiers: {
            hpMaxFromStrV: 0.5,
          },
        }),
        new ClassPerk({
          id: "warrior_power",
          type: "classPerk",
          class: "warrior",
          unlock: {
            gold: 100,
          },
          modifiers: {
            meleeDamageP: 5,
          },
        }),
        new ClassPerk({
          id: "warrior_strength",
          type: "classPerk",
          class: "warrior",
          unlock: {
            gold: 100,
          },
          modifiers: {
            strP: 5,
          },
        }),
      ],
    },
  ],
  rogue: [
    {
      level: 1,
      perks: [
        new ClassPerk({
          id: "rogue_make_haste",
          type: "classPerk",
          class: "rogue",
          unlock: {
            stats: {
              agi: 15,
            },
            gold: 250,
          },
          commands: {
            add_ability: { ...abilities.haste_enchant },
          },
        }),
        new ClassPerk({
          id: "rogue_nimble",
          type: "classPerk",
          class: "rogue",
          unlock: {
            gold: 100,
          },
          modifiers: {
            speedP: 5,
          },
        }),
        new ClassPerk({
          id: "rogue_agile",
          type: "classPerk",
          class: "rogue",
          unlock: {
            gold: 100,
          },
          modifiers: {
            agiP: 5,
          },
        }),
      ],
    },
  ],
  mage: [
    {
      level: 1,
      perks: [
        new ClassPerk({
          id: "mage_mana_regen",
          type: "classPerk",
          class: "mage",
          unlock: {
            stats: {
              int: 15,
            },
            gold: 250,
          },
          modifiers: {
            mpRegenP: 10,
          },
        }),
        new ClassPerk({
          id: "mage_spell_mastery",
          type: "classPerk",
          class: "mage",
          unlock: {
            gold: 100,
          },
          modifiers: {
            spellPowerP: 5,
          },
        }),
        new ClassPerk({
          id: "mage_books",
          type: "classPerk",
          class: "mage",
          unlock: {
            gold: 100,
          },
          modifiers: {
            intP: 5,
          },
        }),
      ],
    },
  ],
  paladin: [
    {
      level: 1,
      perks: [
        new ClassPerk({
          id: "paladin_smite",
          type: "classPerk",
          class: "paladin",
          unlock: {
            stats: {
              spi: 15,
            },
            gold: 250,
          },
          commands: {
            add_ability: { ...abilities.smite },
          },
        }),
        new ClassPerk({
          id: "paladin_vigour",
          type: "classPerk",
          class: "paladin",
          unlock: {
            gold: 100,
          },
          modifiers: {
            hpMaxP: 3,
            hpMaxV: 10,
          },
        }),
        new ClassPerk({
          id: "paladin_strength",
          type: "classPerk",
          class: "paladin",
          unlock: {
            gold: 100,
          },
          modifiers: {
            strP: 5,
          },
        }),
      ],
    },
  ],
};
