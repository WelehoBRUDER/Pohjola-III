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
    color: "#0000ff",
  },
  epic: {
    id: "epic",
    level: 4,
    color: "#ff0000",
  },
  legendary: {
    id: "legendary",
    level: 5,
    color: "#ffff00",
  },
};

const itemTypes = ["weapon", "armor", "consumable", "material"];

class Item {
  [id: string]: any;
  price: number;
  amount?: number;
  stackable?: boolean;
  unique?: boolean;
  tier: I_Tier;
  type: string;
  modifiers?: any;
  constructor(item: Item) {
    this.id = item.id;
    this.price = item.price;
    this.amount = item.amount ?? 1;
    this.stackable = item.stackable ?? false;
    this.unique = item.unique ?? false;
    this.tier = item.tier;
    this.type = item.type;
    this.modifiers = item.modifiers ? { ...item.modifiers } : {};
  }

  updateClass(): Weapon | Armor | Material {
    if (this.type === "weapon") {
      return new Weapon({ ...items[this.id], amount: this.amount });
    } else if (this.type === "armor") {
      return new Armor({ ...items[this.id], amount: this.amount });
    } else if (this.type === "material") {
      return new Material({ ...items[this.id], amount: this.amount });
    }
    return this;
  }
}
