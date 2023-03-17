interface I_Class {
  id: string;
  type: string;
  modifiers: any;
  perks: ClassPerk[];
}

class CharClass {
  [key: string]: any;
  id: string;
  type: string;
  modifiers: any;
  perks: ClassPerk[];
  constructor(_base: I_Class) {
    if (!_base) throw new Error(`No base class provided.`);
    const base: I_Class = classManager.get(_base.id);
    if (!base) throw new Error(`Invalid class id: ${_base.id}}`);
    this.id = base.id;
    this.type = "class";
    this.modifiers = base.modifiers;
    this.perks = base.perks;
  }

  tooltip(): string {
    let tooltip = `<f>1.2rem<f><c>goldenrod<c>${game.getLocalizedString(this.id)}\n`;
    tooltip += `<f>1rem<f><c>silver<c>"${game.getLocalizedString(this.id + "_desc")}"\n\n`;
    tooltip += `<f>1rem<f><c>white<c>${game.getLocalizedString("class_modifiers")}\n`;
    Object.entries(this.modifiers).forEach(([key, value]: [string, any]) => {
      tooltip += effectSyntax(key, value);
    });
    return tooltip;
  }
}

class ClassManager {
  [key: string]: any;
  classes: I_Class[];
  constructor() {
    this.classes = [
      {
        id: "warrior",
        type: "class",
        modifiers: {
          strP: 5,
          hpMaxP: 3,
          strV: 2,
          agiV: 1,
          meleeDamageP: 10,
          spellPowerP: -5,
        },
        perks: [],
      },
      {
        id: "rogue",
        type: "class",
        modifiers: {
          agiP: 5,
          strP: 3,
          agiV: 2,
          strV: 1,
          meleeDamageP: 10,
          spellPowerP: -5,
        },
        perks: [],
      },
      {
        id: "mage",
        type: "class",
        modifiers: {
          intP: 5,
          mpMaxP: 3,
          intV: 2,
          spiV: 1,
          spellPowerP: 10,
          meleeDamageP: -5,
        },
        perks: [],
      },
      {
        id: "paladin",
        type: "class",
        modifiers: {
          hpMaxP: 3,
          mpMaxP: 3,
          strP: 3,
          vitV: 2,
          spiV: 1,
          meleeDamageP: 5,
          healPowerP: 5,
        },
        perks: [],
      },
    ];
  }

  get(id: string): I_Class {
    const c = this.classes.find((c) => c.id === id);
    if (c) {
      return c;
    } else {
      console.warn(`Class ${id} not found.`);
      return this.classes[0];
    }
  }
}

const classManager = new ClassManager();
