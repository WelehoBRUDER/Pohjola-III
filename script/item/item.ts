interface I_Damage {
  physical?: number;
  magical?: number;
  elemental?: number;
}

interface I_Tier {
  [id: string]: any;
  level: number;
  color: string;
}

interface I_ItemTiers {
  [common: string]: I_Tier;
  uncommon: I_Tier;
  rare: I_Tier;
  epic: I_Tier;
  legendary: I_Tier;
  perfect: I_Tier;
}

const itemTiers: I_ItemTiers = {
  common: {
    id: "common",
    level: 1,
    color: "#ffffff",
  },
  uncommon: {
    id: "uncommon",
    level: 2,
    color: "#00ff00",
  },
  rare: {
    id: "rare",
    level: 3,
    color: "#006aff",
  },
  epic: {
    id: "epic",
    level: 4,
    color: "#903fe0",
  },
  legendary: {
    id: "legendary",
    level: 5,
    color: "#ffff00",
  },
  perfect: {
    id: "perfect",
    level: 6,
    color: "#ed11ab",
  },
};

const itemTypes = ["weapon", "armor", "consumable", "material"];

interface ItemObject {
  [id: string]: any;
  price: number;
  amount?: number;
  stackable?: boolean;
  unique?: boolean;
  tier: I_Tier;
  type: string;
  toCraft?: [{ item: string; amount: number }];
  icon?: string;
  modifiers?: any;
}

class Item {
  [id: string]: any;
  price: number;
  amount?: number;
  stackable?: boolean;
  unique?: boolean;
  tier: I_Tier;
  type: string;
  toCraft?: [{ item: string; amount: number }];
  icon?: string;
  modifiers?: any;
  constructor(item: ItemObject) {
    // @ts-ignore
    if (!items[item.id]) throw new Error(`${item.id} is not a valid item id.`);
    this.id = item.id;
    this.price = item.price;
    this.amount = item.amount ?? 1;
    this.stackable = item.stackable ?? false;
    this.unique = item.unique ?? false;
    this.tier = item.tier;
    this.type = item.type;
    this.toCraft = item.toCraft;
    this.modifiers = item.modifiers ? { ...item.modifiers } : {};
    if (item.icon) this.icon = item.icon;
  }

  /* Using @ts-ignore because intellisense can't deal with typed object lists */
  updateClass(price?: number): Weapon | Armor | Material {
    const itemClasses = [Weapon, Armor, Material, Potion, Talisman];
    const itemClass = itemClasses.find((itemClass) => itemClass.name.toLowerCase() === this.type);
    if (!itemClass) throw new Error(`${this.type} is not a valid item type.`);
    return new itemClass({
      // @ts-ignore
      ...items[this.id],
      amount: this.amount,
      price: price ?? this.price,
    });
  }

  compare(item: Weapon | Armor): boolean | string {
    if (player.equipment?.[this.slot]?.id === this.id) return false;
    if (!item) return false;
    let text = "";
    text += `<c>goldenrod<c>${game.getLocalizedString(this.id)}\n`;

    if (this.atk) {
      const value = this.atk - item.atk;
      if (value !== 0) {
        const color = value > 0 ? "lime" : "red";
        text += `<i>${icons.atk}<i><c>white<c> ${game.getLocalizedString("atk")}: <c>${color}<c>${value}\n`;
      }
    }

    if (this.spell_scale) {
      const value = this.getSpellScale() - item.getSpellScale();
      if (value !== 0) {
        const color = value > 0 ? "lime" : "red";
        text += `<i>${icons.spell_scale}<i><c>white<c> ${game.getLocalizedString("spell_scale")}: <c>${color}<c>${value}\n`;
      }
    }

    if (this.defence) {
      Object.entries(this.defence).forEach(([key, value]: any) => {
        const _value = value - item.defence[key];
        if (_value !== 0) {
          const color = _value > 0 ? "lime" : "red";
          text += `<i>${icons[key]}<i><c>white<c> ${game.getLocalizedString(key)}: <c>${color}<c>${_value}%\n`;
        }
      });
    }

    if (this.speed !== undefined) {
      const value = this.speed - item.speed;
      if (value !== 0) {
        const color = value > 0 ? "lime" : "red";
        text += `<i>${icons.speed}<i><c>white<c> ${game.getLocalizedString("speed")}: <c>${color}<c>${value}\n`;
      }
    }

    if (this.modifiers && item?.modifiers) {
      const mods = mergeObjects(this.modifiers, item.modifiers, { subtract: true });
      Object.entries(mods).map(([key, value]: any) => {
        if (!this.modifiers[key]) value = -value;
        if (value === 0) return;
        return (text += " " + effectSyntax(key, value));
      });
    }

    return text;
  }

  tooltip(): string {
    let tooltip = "<f>1.5rem<f>";
    tooltip += `<c>${this.tier?.color || "pink"}<c>${game.getLocalizedString(this.id)}\n`;
    tooltip += "<f>1.25rem<f><c>white<c>";
    if (DEVTOOLS.ENABLED) {
      tooltip += `<c>white<c> [dev] <c>orange<c>${this.id}<c>white<c>\n`;
    }
    tooltip += `${game.getLocalizedString("tier")}: <c>${this.tier?.color || "pink"}<c>${game.getLocalizedString(
      this.tier?.id || "invalid"
    )}\n`;
    tooltip += "<c>white<c>";

    if (this.type === "weapon") {
      tooltip += `<i>${icons.atk}<i> Attack: <c>yellow<c>${this.atk}<c>white<c>\n`;
      if (this.spell_scale) {
        tooltip += `<i>${icons.scaling}<i> Scaling: <c>yellow<c><i>${icons[this.scaling]}<i>${this.scaling}<c>white<c>\n`;
        tooltip += `<i>${icons.spell_scale}<i> Spell Scale: <c>yellow<c>${this.getSpellScale()}<c>white<c>\n`;
      }
    }

    if (this.defence) {
      tooltip += `${game.getLocalizedString("defences")}:\n`;
      Object.entries(this.defence).forEach(([key, value]: any) => {
        const color = value < 0 ? "red" : typeColors[key];
        tooltip += `<i>${icons[key]}<i> ${game.getLocalizedString(key)}: <c>${color}<c>${value}%<c>white<c>\n`;
      });
      tooltip += "\n";
    }

    if (this.slot) {
      tooltip += `<i>${icons[this.slot]}<i> Slot: <c>yellow<c>${game.getLocalizedString(this.slot)}<c>white<c>\n`;
    }

    if (this.speed !== undefined) {
      tooltip += `<i>${icons.speed}<i> Speed: <c>cyan<c>${this.speed}<c>white<c>\n`;
    }

    if (this.heal) {
      tooltip += `<i>${icons.heal}<i> Heal: <c>green<c>${this.heal}<c>white<c>\n`;
    }

    if (this.manaRecover) {
      tooltip += `<i>${icons.manaRecover}<i> Mana Recover: <c>blue<c>${this.manaRecover}<c>white<c>\n`;
    }

    tooltip += `Price: <c>gold<c>${compactNumber(this.price)}\n`;

    if (this.modifiers && Object.keys(this.modifiers).length > 0) {
      tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
      Object.entries(this.modifiers).map(([key, value]) => {
        tooltip += " " + effectSyntax(key, value);
      });
    }

    if (this.effectsToSelf) {
      tooltip += `<c>white<c>${game.getLocalizedString("effects_to_self")}: \n`;
      this.effectsToSelf.forEach((effect: Effect) => {
        const displayEffect = new Effect(effect);
        tooltip += displayEffect.tooltip({ container: true });
      });
    }

    return tooltip;
  }

  canCraft(): boolean {
    let canCraft = true;
    if (this.toCraft) {
      this.toCraft.forEach((item) => {
        const owned = player.inventory.find((i: any) => i.id === item.item);
        // @ts-ignore
        if (!owned || owned.amount < item.amount) return (canCraft = false);
      });
    }
    return canCraft;
  }

  craft(): void {
    if (!this.canCraft()) return;
    if (this.toCraft) {
      this.toCraft.forEach((item) => {
        const owned = player.inventory.find((i: any) => i.id === item.item);
        if (owned) {
          player.removeItem(owned, item.amount);
        }
      });
    }
    player.addItem(this);
  }
}

const typeColors: any = {
  physical: "#EEC049",
  magical: "#49CDEE",
  elemental: "#49EE52",
};
