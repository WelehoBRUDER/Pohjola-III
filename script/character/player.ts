interface I_Equipment {
  [id: string]: any;
  weapon: Weapon | null;
  helmet: Armor | null;
  armor: Armor | null;
  legs: Armor | null;
}

const defaultEquipment = {
  weapon: new Weapon({ ...items.broken_sword }),
  helmet: null,
  armor: null,
  legs: null,
};

const races = {
  human: {
    id: "human",
    modifiers: {
      expGainP: 5,
    },
  },
};

class Race {
  [id: string]: any;
  modifiers: any;
  constructor(race: Race) {
    this.id = race.id;
    this.modifiers = race.modifiers;
  }
}

interface PlayerObject extends Character {
  [race: string]: any;
  equipment: I_Equipment;
  abilities_total: Ability[];
  gold: number;
  perk_points: number;
  skill_points: number;
  level: number;
  xp: number;
}

class Player extends Character {
  [race: string]: any;
  equipment: I_Equipment;
  inventory: Weapon | Armor | Material | Item[] = [];
  abilities_total: Ability[];
  gold: number;
  perk_points: number;
  skill_points: number;
  level: number;
  xp: number;
  completed_stages: string[];
  constructor(char: PlayerObject) {
    super(char);
    this.race = new Race(char.race) ?? new Race(races.human);
    this.equipment = char.equipment ?? defaultEquipment;
    this.abilities_total = char.abilities_total ?? [];
    this.gold = char.gold ?? 0;
    this.inventory = char.inventory ?? [];
    this.perk_points = char.perk_points ?? 0;
    this.skill_points = char.skill_points ?? 0;
    this.level = char.level ?? 1;
    this.xp = char.xp ?? 0;
    this.completed_stages = char.completed_stages ?? [];

    this.restoreClasses();
    this.updateAllModifiers();
  }

  addItem(base_item: Item, amount?: number, options?: { dontEquip?: boolean }) {
    base_item.amount = amount || base_item.amount || 1;
    let item = base_item.updateClass();
    if (item.stackable) {
      let existing_item = this.inventory.find((i: any) => i.id === item.id);
      if (existing_item) {
        existing_item.amount += item.amount;
      } else {
        this.inventory.push(item);
      }
    } else {
      this.inventory.push(item);
    }
  }

  removeItem(item: Item, amount?: number): void {
    let existing_item = this.inventory.find((i: any) => i.id === item.id);
    if (existing_item) {
      existing_item.amount -= amount || item.amount || 1;
      if (existing_item.amount <= 0) {
        this.inventory = this.inventory.filter((i: any) => i.id !== item.id);
      }
    }
  }

  equip(item: Weapon | Armor, options?: { auto?: boolean; removeFromInventory?: boolean }) {
    let equipment = item.updateClass();
    if (!this.equipment[equipment.slot]) {
      equipment.amount = 1;
      this.equipment[equipment.slot] = equipment;
      if (options?.removeFromInventory) {
        this.removeItem(item, 1);
      }
    } else {
      this.unequip(equipment.slot);
      this.equip(item, options);
    }
  }

  unequip(slot: string) {
    let item;
    if (slot === "weapon") {
      item = this.equipment.weapon;
      this.equipment.weapon = null;
    } else if (slot === "armor") {
      item = this.equipment[slot];
      this.equipment[slot] = null;
    }
    this.addItem(item as Item);
  }

  addAbility(ability: any) {
    const ability_class = new Ability(ability);
    if (this.abilities.length < 6) {
      this.abilities.push(ability_class);
    } else {
      this.abilities_total.push(ability_class);
    }
  }

  update() {
    this.statuses.forEach((status: Effect) => {
      if (status.inflict) {
        status.inflictTimer += 1 / 60;
        if (status.inflictTimer >= 1) {
          status.inflictTimer = 0;
          this.inflict(status);
        }
      }

      if (!status.isInfinite) {
        status.lasts -= 1 / 60;
      }

      const statusElem = playerStatuses.querySelector(".status-effect[data-id='" + status.id + "']");
      if (!statusElem) {
        const statusElement = createStatusIcon(status);
        playerStatuses.appendChild(statusElement);
      } else if (statusElem) {
        const dur: HTMLParagraphElement = statusElem.querySelector(".duration")!;
        if (dur) {
          dur.innerText = status.isInfinite ? "∞" : status.lasts.toFixed(1) + "s";
        }
      }
    });

    for (let i = this.statuses.length - 1; i >= 0; i--) {
      if (this.statuses[i].lasts <= 0 && !this.statuses[i].isInfinite) {
        const statusElem: HTMLDivElement = playerStatuses.querySelector(".status-effect[data-id='" + this.statuses[i].id + "']")!;
        if (statusElem) {
          statusElem.remove();
        }
        this.statuses.splice(i, 1);
        this.updateAllModifiers();
      }
    }
  }

  reset(options?: { restoreHealth?: boolean; restoreMana?: boolean; removeStatuses?: boolean }) {
    const { restoreHealth, restoreMana, removeStatuses } = options ?? {};
    const stats = this.getStats();
    if (restoreHealth) {
      this.stats.hp = stats.hpMax;
    }
    if (restoreMana) {
      this.stats.mp = stats.mpMax;
    }
    if (removeStatuses) {
      this.statuses = [];
    }
    this.abilities.forEach((ability: Ability) => {
      ability.onCooldown = 0;
    });
    this.stats.ap = 0;
  }

  assignAbility(ability: Ability, slot: number) {
    this.abilities_total = this.abilities_total.filter((a: Ability) => a.id !== ability.id);
    const old = this.abilities[slot];
    if (old) {
      this.abilities_total.push(old);
    }
    this.abilities[slot] = ability;
    createCharView();
  }

  unassignAbility(slot: number) {
    const ability = this.abilities[slot];
    if (ability) {
      this.abilities_total.push(ability);
      this.abilities.splice(slot, 1);
    }
    createCharView();
  }

  xpForNextLevel(): number {
    if (this.level <= 5) {
      return this.level * 10;
    } else {
      return Math.floor(Math.pow(this.level, 1.2) * 10);
    }
  }

  addXP(xp: number) {
    const boost = this.allModifiers["xp_boost"] ?? 1;
    this.xp += Math.floor(xp * boost);
    stats.total_xp_gained += Math.floor(xp * boost);
    while (this.xp >= this.xpForNextLevel()) {
      this.levelUp();
    }
  }

  addGold(gold: number) {
    const boost = this.allModifiers["gold_boost"] ?? 1;
    stats.total_gold_gained += Math.floor(gold * boost);
    this.gold += Math.floor(gold * boost);
  }

  levelUp(): void {
    if (this.xp >= this.xpForNextLevel()) {
      this.xp -= this.xpForNextLevel();
      this.level += 1;
      this.perk_points += 1;
      this.skill_points += 1;
      this.restore();
    }
    sideBarDetails();
  }

  restoreClasses(): void {
    // @ts-ignore
    this.inventory = this.inventory.map((item: Item) => new Item(items[item.id]).updateClass());
    Object.entries(this.equipment).forEach(([slot, item]: [string, Item]) => {
      if (item) {
        // @ts-ignore
        this.equipment[slot] = new Item(items[item.id]).updateClass();
      } else {
        this.equipment[slot] = null;
      }
    });
    this.abilities = this.abilities.map((ability: Ability) => new Ability(abilities[ability.id]));
    this.abilities_total = this.abilities_total.map((ability: Ability) => new Ability(abilities[ability.id]));
  }
}

const player = new Player({
  id: "player",
  name: "Player",
  race: races.human,
  stats: {
    str: 10,
    vit: 10,
    agi: 10,
    int: 10,
    spi: 10,
    hp: 50,
    mp: 30,
    atk: 5,
    hpMax: 0,
    mpMax: 0,
    ap: 0,
  },
  defences: {
    physical: 0,
    magical: 0,
    elemental: 0,
  },
  resistances: {
    fire: 0,
    ice: 0,
    thunder: 0,
    curse: 0,
    poison: 0,
    bleed: 0,
    divine: 0,
    stun: 0,
  },
  equipment: defaultEquipment,
  abilities: [],
  critRate: 3,
  critPower: 50,
  inventory: [],
  abilities_total: [],
  traits: [],
  statuses: [],
  perks: [],
  skills: [],
  gold: 0,
  perk_points: 0,
  skill_points: 0,
  level: 1,
  xp: 0,
});

player.updateAllModifiers();
player.abilities.forEach((abi) => abi.updateStats(player));
// player.addItem(new Weapon({ ...items.broken_sword }), 203);
// player.addItem(new Armor({ ...items.ragged_armor }), 1);
