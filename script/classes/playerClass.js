let player = new PlayerClass({
  id: "player_character",
  name: "Avanti!",
  stats: {
    str: 5,
    vit: 5,
    agi: 5,
    int: 5,
    wis: 5,
    ap: 0,
    hp: 40,
    mp: 30
  },
  skills: {
    armorer: 0,
    heavy_weapons: 0,
    light_weapons: 0,
    shield: 0,
    dodge: 0,
    dexterity: 0
  },
  inventory: [
    new Item({...items.weak_healing_gem, amount: 3}),
    new Item({...items.healing_gem, amount: 1}),
    new Item({...items.broken_dagger, amount: 1}),
    new Item({...items.rusty_large_axe, amount: 1}),
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
    xp: 0,
    xpNeed: 50
  },
  abilities: {
    slot1: new Ability(Abilities.sharp_stroke),
    slot2: new Ability(Abilities.shield_bash),
    slot3: new Ability(Abilities.adrenaline_strength),
    slot4: new Ability(Abilities.flame_hand),
    slot5: new Ability(Abilities.magical_ward)
  },
  gold: 0,
  statuses: []
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
  this.gold = base.gold || 0;

  function Stats(stat) {
    this.str = stat.str;
    this.vit = stat.vit;
    this.agi = stat.agi;
    this.int = stat.int;
    this.wis = stat.wis;
    this.hp = stat.hp;
    this.mp = stat.mp;
    this.ap = stat.ap;
  }

  function Skills(skill) {
    this.armorer = skill.armorer;
    this.heavy_weapons = skill.heavy_weapons;
    this.light_weapons = skill.light_weapons;
    this.shield = skill.shield;
    this.dodge = skill.dodge;
    this.dexterity = skill.dexterity;
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
 
  function statusPowers(stat, p) {
    let power = 0;
    if(p) power++;
    for(let status of this.statuses) {
      for(let effect in status.effects) {
        if(effect == stat) {
          if(p) power += status.effects[effect]/100;
          else power += status.effects[effect];
        }
      }
    }
    return power;
  }

  function calcValues(value, kohde) {
    let val = 0;
    let per = 1;
    for(let nimi in kohde.equipment) {
      const item = kohde.equipment[nimi];
      if(!item.id) continue;
      if(item?.effects?.[value + "P"]) per += item.effects[value + "P"] / 100;
      if(item?.effects?.[value + "V"]) val += item.effects[value + "V"];
    } 
    for(let status of kohde.statuses) {
      if(status?.effects?.[value + "P"]) per += status?.effects?.[value + "P"] / 100;
      if(status?.effects?.[value + "V"]) val += status?.effects?.[value + "V"];
    }
    return {v: val, p: per};
  }

  this.stats.Fstr = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("str", this);
    return Math.floor((this.stats.str + bonusValue) * bonusPercentage);
  }

  this.stats.Fagi = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("agi", this);
    return Math.floor((this.stats.agi + bonusValue) * bonusPercentage);
  }

  this.stats.Fvit = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("vit", this);
    return Math.floor((this.stats.vit + bonusValue) * bonusPercentage);
  }

  this.stats.Fint = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("int", this);
    return Math.floor((this.stats.int + bonusValue) * bonusPercentage);
  }

  this.stats.Fwis = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("wis", this);
    return Math.floor((this.stats.wis + bonusValue) * bonusPercentage);
  }

  this.stats.FhpMax = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("hp", this);
    return Math.floor((15 + 5 * this.stats.Fvit() + bonusValue) * bonusPercentage);
  }

  this.stats.FmpMax = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("mp", this);
    return Math.floor((5 + 5 * this.stats.Fint() + bonusValue) * bonusPercentage);
  }

  function valuesFromItem(type, value, eq) {
    let total = 0;
    for(let itm in eq.equipment) {
      if(eq.equipment[itm]?.[type]?.[value]) total += eq.equipment[itm][type][value];
    } return total;
  }

  this.stats.FphysicalArmor = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("physicalArmor", this);
    return Math.floor((valuesFromItem("armors", "physical", this) + bonusValue) * bonusPercentage);
  }

  this.stats.FmagicalArmor = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("magicalArmor", this);
    return Math.floor((valuesFromItem("armors", "magical", this) + bonusValue) * bonusPercentage);
  }

  this.stats.FelementalArmor = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("elementalArmor", this);
    return Math.floor((valuesFromItem("armors", "elemental", this) + bonusValue) * bonusPercentage);
  }

  this.actionFill = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("actionFill", this);
    let value = (0.45 + this.stats.Fagi() / 100 + valueFromItem("itemSpeed", this) + bonusValue) * bonusPercentage;
    if(value > 3) value = 3;
    else if(value < 0) value = 0;
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
    for(let dmg in base) {
      const {v: bonusValue, p: bonusPercentage} = calcValues(dmg + "Damage", this);
      if(dmg == "physical") base[dmg] = Math.round(((base[dmg] + bonusValue) * (1 + this.stats.Fstr()/20)) * bonusPercentage);
      else if(dmg == "magical") base[dmg] = base[dmg] = Math.round(((base[dmg] + bonusValue) * (1 + this.stats.Fint()/20)) * bonusPercentage);
      else if(dmg == "elemental") base[dmg] = Math.round(((base[dmg] + bonusValue) * (1 + this.stats.Fwis()/20)) * bonusPercentage);
    }
    return base;
  }

  this.weaponDamage = (type="random") => {
    let base = {}
    if(this.equipment.weapon?.damages) {
      let dmg = this.equipment.weapon.damages;
      if(type == "random") {
        base.physical = random(dmg.physicalMax, dmg.physicalMin);
        base.magical = random(dmg.magicalMax, dmg.magicalMin);
        base.elemental = random(dmg.elementalMax, dmg.elementalMin);
      }
      else if(type == "max") {
        base.physical = dmg.physicalMax;
        base.magical =  dmg.magicalMax;
        base.elemental = dmg.elementalMax;
      }
      else if(type == "min") {
        base.physical = dmg.physicalMin;
        base.magical =  dmg.magicalMin;
        base.elemental = dmg.elementalMin;
      }
    } else base.physical = 3;
    for(let dmg in base) {
      const {v: bonusValue, p: bonusPercentage} = calcValues(dmg + "Damage", this);
      if(dmg == "physical") base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fstr()/20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus]/100)) * bonusPercentage);
      else if(dmg == "magical") base[dmg] = base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fint()/20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus]/100)) * bonusPercentage);
      else if(dmg == "elemental") base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fwis()/20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus]/100)) * bonusPercentage);
    }
    return base;
  };

  this.regularAttack = (target) => {
    let block = target.attackBlocked();
    let dodge = target.attackDodged();
    let damages = this.weaponDamage();
    if (damages.physical) damages.physical = Math.floor(damages.physical * damages.physical / (damages.physical + target.stats.FphysicalArmor()));
    if (damages.magical) damages.magical = Math.floor(damages.magical * damages.magical / (damages.magical + target.stats.FmagicalArmor()));
    if (damages.elemental) damages.elemental = Math.floor(damages.elemental * damages.elemental / (damages.elemental + target.stats.FelementalArmor()));
    if (block) {
      damages.physical *= 1 - target.equipment.shield.blockAmount.physical/100;
      damages.magical *= 1 - target.equipment.shield.blockAmount.magical/100;
      damages.elemental *= 1 - target.equipment.shield.blockAmount.elemental/100;
      block = true;
    }
    return {num: Math.floor(damages.physical + damages.magical + damages.elemental), blocked: block, dodged: dodge};
  }

  this.spellAttack = (target, spell) => {
    let block = target.attackBlocked();
    let dodge = target.attackDodged();
    let damages = this.spellDamage(spell);
    if (damages.physical) damages.physical = Math.floor(damages.physical * damages.physical / (damages.physical + target.stats.FphysicalArmor()));
    if (damages.magical) damages.magical = Math.floor(damages.magical * damages.magical / (damages.magical + target.stats.FmagicalArmor()));
    if (damages.elemental) damages.elemental = Math.floor(damages.elemental * damages.elemental / (damages.elemental + target.stats.FelementalArmor()));
    if (block) {
      damages.physical *= 1 - target.equipment.shield.blockAmount.physical/100;
      damages.magical *= 1 - target.equipment.shield.blockAmount.magical/100;
      damages.elemental *= 1 - target.equipment.shield.blockAmount.elemental/100;
      block = true;
    }
    return {num: Math.floor(damages.physical + damages.magical + damages.elemental), blocked: block, dodged: dodge};
  }

  this.minDmg = () => {
    let damages = this.weaponDamage("min");
    return Math.floor(damages.physical + damages.magical + damages.elemental);
  }

  this.maxDmg = () => {
    let damages = this.weaponDamage("max");
    return Math.floor(damages.physical + damages.magical + damages.elemental);
  }

  this.attackBlocked = () => {
    let blocked = false;
    if(this.equipment.shield?.id) {
      const {v: bonusValue, p: bonusPercentage} = calcValues("blockChance", this);
      if(Math.random() >= 0.95 - ((this.skills.shield/500 + bonusValue) * bonusPercentage)) blocked = true;
    }
    return blocked;
  };

  this.attackDodged = () => {
    let dodged = false;
    const { v: bonusValue, p: bonusPercentage } = calcValues("dodge", this);
    if(Math.random() >= 0.97 - (((this.skills.dodge/1000) + (this.stats.Fagi()/5000) + bonusValue) * bonusPercentage)) dodged = true;
    return dodged;
  };

  this.updateStat = (int) => {
    let status = this.statuses[int];
    let statusObject = $("#playerStatus-" + status?.id);
    if(status?.damageOT && status) {
      if(status.hasDamaged <= 0) {
        status.hasDamaged = 1;
        if(status.damageOT > 0) createDroppingString(status.damageOT, $(".playerInteract"), "damage");
        else if(status.damageOT < 0) createDroppingString(Math.abs(status.damageOT), $(".playerInteract"), "health");
        this.stats.hp -= status.damageOT;
      }
    }
    if(!status || status.lastFor <= 0.1) {
      if(statusObject) $(".playerStatuses").removeChild(statusObject);
      return;
    }
    if(!statusObject || statusObject == undefined) {
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
      // if (status.effectType == "stun") desc += `You are stunned \nand unable to move.`;
      // else if (status.effectType == "bleeding") desc += `You are bleeding \nand take § <c>red<c> ${status.damageOT} dmg/s`;
      // else if (status.effectType == "regen") desc += `You are regenerating \n${status.damageOT} health per second`;
      addHoverBox(frame, desc, "");
      $(".playerStatuses").append(frame);
    } else {
      if(!status || status.lastFor <= 0.1) {
        $(".playerStatuses").removeChild(statusObject);
        return;
      }
      statusObject.querySelector("p").textContent = Math.ceil(status.lastFor);
    }
  };
}

let statsBonus = {
  "physical": "Fstr()",
  "magical": "Fint()",
  "elemental": "Fwis()"
}