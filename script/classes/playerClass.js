let player = new PlayerClass({
  id: "player_character",
  name: "Avanti!",
  stats: {
    str: 3,
    vit: 3,
    agi: 3,
    int: 3,
    wis: 3,
    ap: 0,
    hp: 60,
    mp: 20,
    critChance: 5,
    critDmg: 50
  },
  skills: {
    armorer: 0,
    heavy_weapons: 0,
    light_weapons: 0,
    shield: 0,
    dodge: 0,
    barter: 0
  },
  inventory: [
    new Item({ ...items.weak_healing_gem, amount: 3 }),
    new Item({ ...items.healing_gem, amount: 1 }),
    new Item({ ...items.broken_dagger, amount: 1 }),
    new Item({ ...items.rusty_large_axe, amount: 1 }),
    new Item(items.wooden_shield),
    new Item(items.old_wool_shirt)
  ],
  equipment: {
    weapon: new Item(items.rusty_short_sword),
    shield: new Item(items.wooden_shield),
    head: new Item(items.old_wool_cap),
    body: new Item(items.old_wool_shirt),
    legs: new Item(items.old_wool_leggings),
    ring: {}
  },
  level: {
    lvl: 1,
    pointsPerLvl: 3,
    xp: 13,
    xpNeed: 50,
    statPoints: 5,
    skillPoints: 10,
    perkPoints: 5
  },
  abilities: {
    slot1: new Ability(Abilities.sharp_stroke),
    slot2: new Ability(Abilities.shield_bash),
    slot3: new Ability(Abilities.adrenaline_strength),
    slot4: "empty",
    slot5: "empty"
  },
  totalAbilities: [
    new Ability(Abilities.sharp_stroke),
    new Ability(Abilities.shield_bash),
    new Ability(Abilities.adrenaline_strength),
  ],
  gold: 0,
  statuses: [],
  permanentStatuses: {
    "warrior_class": new permanentStatus(permanentEffects.warrior_class),
  },
  perks: {},
  selectedPerks: "warrior"
})

function PlayerClass(base) {
  this.id = base.id ?? "player_character";
  this.name = base.name ?? "Unknown Adventurer";
  this.stats = new Stats(base.stats);
  this.skills = new Skills(base.skills);
  this.inventory = base.inventory ?? [];
  this.equipment = new Equipments(base.equipment);
  this.level = base.level;
  this.statuses = base.statuses;
  this.abilities = new Abilitys(base.abilities);
  this.totalAbilities = base.totalAbilities;
  this.gold = base.gold || 0;
  this.permanentStatuses = base.permanentStatuses;
  this.perks = base.perks;
  this.selectedPerks = base.selectedPerks;

  this.restoreFull = () => {
    this.stats.hp = this.stats.FhpMax();
    this.stats.mp = this.stats.FmpMax();
  }

  this.hasPerk = (key) => {
    Object.entries(this.perks).forEach(p => {
      if (p.id == key) return true;
    });
    return false;
  }

  function Stats(stat) {
    this.str = stat.str;
    this.vit = stat.vit;
    this.agi = stat.agi;
    this.int = stat.int;
    this.wis = stat.wis;
    this.hp = stat.hp;
    this.mp = stat.mp;
    this.ap = stat.ap;
    this.critChance = stat.critChance;
    this.critDmg = stat.critDmg;
  }

  function Skills(skill) {
    this.armorer = skill.armorer;
    this.heavy_weapons = skill.heavy_weapons;
    this.light_weapons = skill.light_weapons;
    this.shield = skill.shield;
    this.dodge = skill.dodge;
    this.barter = skill.barter;
  }

  function Equipments(equipment) {
    this.weapon = equipment.weapon ?? {};
    this.shield = equipment.shield ?? {};
    this.head = equipment.head ?? {};
    this.body = equipment.body ?? {};
    this.legs = equipment.legs ?? {};
    this.ring = equipment.ring ?? {};
  }

  function Abilitys(ability) {
    this.slot1 = new Ability(ability?.slot1) || {}
    this.slot2 = new Ability(ability?.slot2) || {}
    this.slot3 = new Ability(ability?.slot3) || {}
    this.slot4 = new Ability(ability?.slot4) || {}
    this.slot5 = new Ability(ability?.slot5) || {}
  }

  function calcValues(value, kohde) {
    let val = 0;
    let per = 1;
    for (let nimi in kohde.equipment) {
      const item = kohde.equipment[nimi];
      if (!item.id) continue;
      if (item?.effects?.[value + "P"]) per *= 1 + item.effects[value + "P"] / 100;
      if (item?.effects?.[value + "V"]) val += item.effects[value + "V"];
    }
    for (let status of kohde.statuses) {
      if (status?.effects?.[value + "P"]) per *= 1 + status?.effects?.[value + "P"] / 100;
      if (status?.effects?.[value + "V"]) val += status?.effects?.[value + "V"];
    }
    for (let stat in kohde.permanentStatuses) {
      const status = kohde.permanentStatuses[stat];
      if (status?.effects?.[value + "P"]) per *= 1 + status?.effects?.[value + "P"] / 100;
      if (status?.effects?.[value + "V"]) val += status?.effects?.[value + "V"];
    }
    return { v: val, p: per };
  }

  this.stats.Fstr = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("str", this);
    return Math.floor((this.stats.str + bonusValue) * bonusPercentage);
  }

  this.stats.Fagi = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("agi", this);
    return Math.floor((this.stats.agi + bonusValue) * bonusPercentage);
  }

  this.stats.Fvit = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("vit", this);
    return Math.floor((this.stats.vit + bonusValue) * bonusPercentage);
  }

  this.stats.Fint = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("int", this);
    return Math.floor((this.stats.int + bonusValue) * bonusPercentage);
  }

  this.stats.Fwis = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("wis", this);
    return Math.floor((this.stats.wis + bonusValue) * bonusPercentage);
  }

  this.stats.FhpMax = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("hp", this);
    return Math.floor((15 + 5 * this.stats.Fvit() + bonusValue) * bonusPercentage);
  }

  this.stats.FcritChance = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("critChance", this);
    return Math.floor((this.stats.critChance + bonusValue) * bonusPercentage);
  }

  this.stats.FcritDmg = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("critDmg", this);
    return Math.floor((this.stats.critDmg + bonusValue) * bonusPercentage);
  }

  this.stats.FmpMax = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("mp", this);
    return Math.floor((5 + 2 * this.stats.Fint() + 5 * this.stats.Fwis() + bonusValue) * bonusPercentage);
  }

  this.skills.Farmorer = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("armorer", this);
    return Math.floor((this.skills.armorer + bonusValue) * bonusPercentage);
  }

  this.skills.Fheavy_weapons = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("heavy_weapons", this);
    return Math.floor((this.skills.heavy_weapons + bonusValue) * bonusPercentage);
  }

  this.skills.Flight_weapons = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("light_weapons", this);
    return Math.floor((this.skills.light_weapons + bonusValue) * bonusPercentage);
  }

  this.skills.Fshield = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("shield", this);
    let val = Math.floor((this.skills.shield + bonusValue) * bonusPercentage);
    return val > 100 ? 100 : val;
  }

  this.skills.Fdodge = () => {
    return this.skills.dodge;
  }

  this.skills.Fbarter = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("barter", this);
    return Math.floor((this.skills.barter + bonusValue) * bonusPercentage);
  }

  this.barterBonus = () => {
    let penalty = 0.5;
    penalty += this.skills.Fbarter() / 300;
    const { v: bonusValue, p: bonusPercentage } = calcValues("barterPenalty", this);
    penalty = (penalty + bonusValue) * bonusPercentage;
    if (penalty > 0.95) penalty = 0.95;
    else if (penalty < 0.5) penalty = 0.5;
    return penalty;
  }

  function valuesFromItem(type, value, eq) {
    let total = 0;
    for (let itm in eq.equipment) {
      if (eq.equipment[itm]?.[type]?.[value]) total += eq.equipment[itm][type][value] * (1 + (player.skills[`F${eq.equipment[itm]?.skillBonus}`]() / 100));
    } return total;
  }

  this.stats.FphysicalArmor = () => {
    let { v: bonusValue, p: bonusPercentage } = calcValues("physicalArmor", this);
    const { v: armorValue, p: armorPercentage } = calcValues("defense", this);
    bonusValue += armorValue;
    bonusPercentage *= armorPercentage;
    return Math.floor((valuesFromItem("armors", "physical", this) + bonusValue) * bonusPercentage);
  }

  this.stats.FmagicalArmor = () => {
    let { v: bonusValue, p: bonusPercentage } = calcValues("magicalArmor", this);
    const { v: armorValue, p: armorPercentage } = calcValues("defense", this);
    bonusValue += armorValue;
    bonusPercentage *= armorPercentage;
    return Math.floor((valuesFromItem("armors", "magical", this) + bonusValue) * bonusPercentage);
  }

  this.stats.FelementalArmor = () => {
    let { v: bonusValue, p: bonusPercentage } = calcValues("elementalArmor", this);
    const { v: armorValue, p: armorPercentage } = calcValues("defense", this);
    bonusValue += armorValue;
    bonusPercentage *= armorPercentage;
    return Math.floor((valuesFromItem("armors", "elemental", this) + bonusValue) * bonusPercentage);
  }

  this.actionFill = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("actionFill", this);
    let value = (0.45 + this.stats.Fagi() / 100 + valueFromItem("itemSpeed", this) + bonusValue) * bonusPercentage;
    if (value > 3) value = 3;
    else if (value < 0) value = 0;
    return value;
  }

  function valueFromItem(value, eq) {
    let total = 0;
    for (let itm in eq.equipment) {
      if (eq.equipment[itm]?.[value]) total += eq.equipment[itm]?.[value];
    } return total;
  }

  this.spellDamage = (spell) => {
    let base = {};
    base.physical = spell.baseDamages.physical || 0;
    base.magical = spell.baseDamages.magical || 0;
    base.elemental = spell.baseDamages.elemental || 0;
    for (let dmg in base) {
      const { v: bonusValue, p: bonusPercentage } = calcValues(dmg + "Damage", this);
      if (dmg == "physical") base[dmg] = Math.round(((base[dmg] + bonusValue) * (1 + this.stats.Fstr() / 20)) * bonusPercentage);
      else if (dmg == "magical") base[dmg] = base[dmg] = Math.round(((base[dmg] + bonusValue) * (1 + this.stats.Fint() / 20)) * bonusPercentage);
      else if (dmg == "elemental") base[dmg] = Math.round(((base[dmg] + bonusValue) * (1 + this.stats.Fwis() / 20)) * bonusPercentage);
    }
    return base;
  }

  this.weaponDamage = (type = "random") => {
    let base = {}
    if (this.equipment.weapon?.damages) {
      let dmg = this.equipment.weapon.damages;
      if (type == "random") {
        base.physical = random(dmg.physicalMax, dmg.physicalMin);
        base.magical = random(dmg.magicalMax, dmg.magicalMin);
        base.elemental = random(dmg.elementalMax, dmg.elementalMin);
      }
      else if (type == "max") {
        base.physical = dmg.physicalMax;
        base.magical = dmg.magicalMax;
        base.elemental = dmg.elementalMax;
      }
      else if (type == "min") {
        base.physical = dmg.physicalMin;
        base.magical = dmg.magicalMin;
        base.elemental = dmg.elementalMin;
      }
    } else base.physical = 3;
    for (let dmg in base) {
      const { v: bonusValue, p: bonusPercentage } = calcValues(dmg + "Damage", this);
      if (dmg == "physical") base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fstr() / 20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus] / 100)) * bonusPercentage);
      else if (dmg == "magical") base[dmg] = base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fint() / 20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus] / 100)) * bonusPercentage);
      else if (dmg == "elemental") base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fwis() / 20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus] / 100)) * bonusPercentage);
    }
    return base;
  };

  this.rollCrit = () => {
    if (this.stats.FcritChance() >= random(100)) return this.stats.FcritDmg()/100;
    else return 0;
  }

  this.regularAttack = (target) => {
    const { v: NOT_USED, p: atkPercentage } = calcValues("attack", this);
    let block = target.attackBlocked();
    let dodge = target.attackDodged();
    let damages = this.weaponDamage();
    let crit = 1 + this.rollCrit();
    if (damages.physical) damages.physical = Math.floor(damages.physical * crit * damages.physical * crit / (damages.physical * crit + target.stats.FphysicalArmor()));
    if (damages.magical) damages.magical = Math.floor(damages.magical * crit * damages.magical * crit / (damages.magical * crit + target.stats.FmagicalArmor()));
    if (damages.elemental) damages.elemental = Math.floor(damages.elemental * crit * damages.elemental * crit / (damages.elemental * crit + target.stats.FelementalArmor()));
    if (block) {
      damages.physical *= 1 - target.equipment.shield.blockAmount.physical / 100;
      damages.magical *= 1 - target.equipment.shield.blockAmount.magical / 100;
      damages.elemental *= 1 - target.equipment.shield.blockAmount.elemental / 100;
      block = true;
    }
    return { num: Math.floor((damages.physical + damages.magical + damages.elemental) * atkPercentage), blocked: block, dodged: dodge, crit: crit };
  }

  this.spellAttack = (target, spell) => {
    const { v: NOT_USED, p: atkPercentage } = calcValues("attack", this);
    let block = target.attackBlocked();
    let dodge = target.attackDodged();
    let damages = this.spellDamage(spell);
    let crit = 1 + this.rollCrit();
    if (damages.physical) damages.physical = Math.floor(damages.physical * crit * damages.physical * crit / (damages.physical * crit + target.stats.FphysicalArmor()));
    if (damages.magical) damages.magical = Math.floor(damages.magical * crit * damages.magical * crit / (damages.magical * crit + target.stats.FmagicalArmor()));
    if (damages.elemental) damages.elemental = Math.floor(damages.elemental * crit * damages.elemental * crit / (damages.elemental * crit + target.stats.FelementalArmor()));
    if (block) {
      damages.physical *= 1 - target.equipment.shield.blockAmount.physical / 100;
      damages.magical *= 1 - target.equipment.shield.blockAmount.magical / 100;
      damages.elemental *= 1 - target.equipment.shield.blockAmount.elemental / 100;
      block = true;
    }
    return { num: Math.floor((damages.physical + damages.magical + damages.elemental) * atkPercentage), blocked: block, dodged: dodge, crit: crit };
  }

  this.minDmg = () => {
    const { v: NOT_USED, p: atkPercentage } = calcValues("attack", this);
    let damages = this.weaponDamage("min");
    return Math.floor((damages.physical + damages.magical + damages.elemental) * atkPercentage);
  }

  this.maxDmg = () => {
    const { v: NOT_USED, p: atkPercentage } = calcValues("attack", this);
    let damages = this.weaponDamage("max");
    return Math.floor((damages.physical + damages.magical + damages.elemental) * atkPercentage);
  }

  this.charClass = () => {
    let clas = {};
    for (let stat in this.permanentStatuses) {
      if (stat.includes("_class")) {
        clas = this.permanentStatuses[stat];
      }
    }
    return clas;
  }

  this.attackBlocked = () => {
    let blocked = false;
    if (this.equipment.shield?.id) {
      const { v: bonusValue, p: bonusPercentage } = calcValues("blockChance", this);
      if (Math.random() >= 0.95 - ((this.skills.Fshield() / 500 + bonusValue) * bonusPercentage)) blocked = true;
    }
    return blocked;
  };

  this.attackDodged = () => {
    let dodged = false;
    const { v: bonusValue, p: bonusPercentage } = calcValues("dodge", this);
    if (Math.random() >= 0.97 - (((this.skills.Fdodge() / 1000) + (this.stats.Fagi() / 5000) + bonusValue) * bonusPercentage)) dodged = true;
    return dodged;
  };

  this.updateStat = (int) => {
    let status = this.statuses[int];
    let statusObject = $("#playerStatus-" + status?.id);
    if (status?.damageOT && status) {
      if (status.hasDamaged <= 0) {
        status.hasDamaged = 1;
        if (status.damageOT > 0) createDroppingString(status.damageOT, $(".playerInteract"), "damage");
        else if (status.damageOT < 0) createDroppingString(Math.abs(status.damageOT), $(".playerInteract"), "health");
        this.stats.hp -= status.damageOT;
      }
    }
    if (!status || status.lastFor <= 0.1) {
      if (statusObject) $(".playerStatuses").removeChild(statusObject);
      return;
    }
    if (!statusObject || statusObject == undefined) {
      const frame = create("div");
      frame.id = "playerStatus-" + status.id;
      frame.classList.add("statusFrame");
      const image = create("img");
      image.src = status.img;
      const num = create("p");
      num.textContent = Math.ceil(status.lastFor);
      frame.append(image, num);
      let desc = `<c>#c2bf27<c><f>18px<f>${status.name}§\n`;
      desc += statusSyntax(status);
      addHoverBox(frame, desc, "");
      $(".playerStatuses").append(frame);
    } else {
      if (!status || status.lastFor <= 0.1) {
        $(".playerStatuses").removeChild(statusObject);
        return;
      }
      statusObject.querySelector("p").textContent = Math.ceil(status.lastFor);
    }
  };
}

player.restoreFull();

let statsBonus = {
  "physical": "Fstr()",
  "magical": "Fint()",
  "elemental": "Fwis()"
}