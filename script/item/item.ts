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
  icon?: string;
  modifiers?: any;
  constructor(item: ItemObject) {
    this.id = item.id;
    this.price = item.price;
    this.amount = item.amount ?? 1;
    this.stackable = item.stackable ?? false;
    this.unique = item.unique ?? false;
    this.tier = item.tier;
    this.type = item.type;
    this.modifiers = item.modifiers ? { ...item.modifiers } : {};
    if (item.icon) this.icon = item.icon;
  }

  /* Using @ts-ignore because intellisense can't deal with typed object lists */
  updateClass(price?: number): Weapon | Armor | Material {
    if (this.type === "weapon") {
      return new Weapon({
        // @ts-ignore
        ...items[this.id],
        amount: this.amount,
        price: price ?? this.price,
      });
    } else if (this.type === "armor") {
      return new Armor({
        // @ts-ignore
        ...items[this.id],
        amount: this.amount,
        price: price ?? this.price,
      });
    } else if (this.type === "material") {
      return new Material({
        // @ts-ignore
        ...items[this.id],
        amount: this.amount,
        price: price ?? this.price,
      });
    } else if (this.type === "potion") {
      return new Potion({
        // @ts-ignore
        ...items[this.id],
        amount: this.amount,
        price: price ?? this.price,
      });
    }
    return this;
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
    tooltip += `<c>${this.tier.color}<c>${game.getLocalizedString(this.id)}\n`;
    tooltip += "<f>1.25rem<f><c>white<c>";
    tooltip += `${game.getLocalizedString("tier")}: <c>${this.tier.color}<c>${game.getLocalizedString(this.tier.id)}\n`;
    tooltip += "<c>white<c>";
    if (this.type === "weapon") {
      tooltip += `<i>${icons.atk}<i> Attack: <c>yellow<c>${this.atk}<c>white<c>\n`;
    }

    if (this.defence) {
      tooltip += `${game.getLocalizedString("defences")}:\n`;
      Object.entries(this.defence).forEach(([key, value]) => {
        tooltip += `<i>${icons[key]}<i> ${game.getLocalizedString(key)}: <c>${typeColors[key]}<c>${value}%<c>white<c>\n`;
      });
      tooltip += "\n";
    }

    if (this.speed !== undefined) {
      tooltip += `<i>${icons.speed}<i> Speed: <c>cyan<c>${this.speed}<c>white<c>\n`;
    }

    if (this.heal) {
      tooltip += `<i>${icons.heal}<i> Heal: <c>green<c>${this.heal}<c>white<c>\n`;
    }

    if (this.manaRecover) {
      tooltip += `<i>${icons.mana}<i> Mana Recover: <c>blue<c>${this.manaRecover}<c>white<c>\n`;
    }

    tooltip += `Price: <c>gold<c>${compactNumber(this.price)}\n`;

    if (this.modifiers && Object.keys(this.modifiers).length > 0) {
      tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
      Object.entries(this.modifiers).map(([key, value]) => {
        tooltip += " " + effectSyntax(key, value);
      });
    }

    return tooltip;
  }
}

const typeColors: any = {
  physical: "#EEC049",
  magical: "#49CDEE",
  elemental: "#49EE52",
};
