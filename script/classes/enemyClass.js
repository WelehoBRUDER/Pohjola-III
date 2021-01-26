function EnemyClass(base) {
  if (Enemies[base.id] == null) console.error(base.id + " is not a valid id!");
  const defaultEnemy = Enemies[base.id];
  this.id = base.id;
  this.name = base.name;
  this.sprites = base.sprites ?? defaultEnemy.sprites;
  this.level = base.level ?? defaultEnemy.level;
  this.equipment = new Equipments(base.equipment ?? defaultEnemy.equipment);
  this.stats = new Stats(base.stats ?? defaultEnemy.stats);
  this.skills = new Skills(base.skills ?? defaultEnemy.skills);
  this.inventory = base.inventory ?? defaultEnemy.inventory;
  this.level = new Levels(base.level);
  this.index = base.index;
  this.stat_template = base.stat_template ?? defaultEnemy.stat_template;
  this.abilities = base.abilities ?? defaultEnemy.abilities;

  function Equipments(equipment) {
    this.weapon = equipment.weapon ?? {};
    this.shield = equipment.shield ?? {};
    this.head = equipment.head ?? {};
    this.body = equipment.body ?? {};
    this.legs = equipment.legs ?? {};
    this.ring = equipment.ring ?? {};
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
  }

  function Skills(skill) {
    this.armorer = skill.armorer;
    this.heavy_weapons = skill.heavy_weapons;
    this.light_weapons = skill.light_weapons;
    this.shield = skill.shield;
    this.dodge = skill.dodge;
    this.dexterity = skill.dexterity;
  }

  function Levels(level) {
    this.lvl = level.lvl ?? defaultEnemy.level.lvl;
    this.pointsPerLvl = level.pointsPerLvl ?? defaultEnemy.level.pointsPerLvl;
    this.xpGive = level.xpGive ?? defaultEnemy.level.xpGive;
  }

  this.init = () => {
    if (this.level.lvl > 1) {
      let stat_points = this.level.lvl * this.level.pointsPerLvl;
      stat_points -= 3;
      for (let j = 0; j < stat_points; j++) {
        let max = 0;
        let table = ai_stat_templates[this.stat_template].weighted_stats;
        for (let i = 0; i < table.length; i++) {
          table[i].chanceTo = 0;
          if (table[i - 1]) table[i].chanceTo = table[i - 1].chanceTo;
          else table[i].chanceTo = 0;
          table[i].chanceTo += table[i].value;
          max = table[i].chanceTo;
        }
        let value = Math.floor(random(max));
        let targeting;
        for (let unit of table) {
          if (unit.chanceTo >= value) { targeting = unit; break; }
        }
        this.stats[targeting.stat]++;
      }
      stat_points = 0;
    }
    this.stats.hp = this.stats.FhpMax();
    this.stats.mp = this.stats.FmpMax();
    this.stats.ap = 0;
    this.idle();
  }

  this.idle = () => {
    let frame = $("#" + this.id + "§" + this.index);
    frame.querySelector(".idle").style.opacity = 1;
    frame.querySelector(".attack_start").style.opacity = 0;
    frame.querySelector(".attack_finish").style.opacity = 0;
    frame.querySelector(".death").style.opacity = 0;
  }

  this.attack_start = () => {
    let frame = $("#" + this.id + "§" + this.index);
    frame.querySelector(".idle").style.opacity = 0;
    frame.querySelector(".attack_start").style.opacity = 1;
    frame.querySelector(".attack_finish").style.opacity = 0;
    frame.querySelector(".death").style.opacity = 0;
  }

  this.attack_finish = () => {
    let frame = $("#" + this.id + "§" + this.index);
    frame.querySelector(".idle").style.opacity = 0;
    frame.querySelector(".attack_start").style.opacity = 0;
    frame.querySelector(".attack_finish").style.opacity = 1;
    frame.querySelector(".death").style.opacity = 0;
  }

  this.death = () => {
    let frame = $("#" + this.id + "§" + this.index);
    frame.querySelector(".idle").style.opacity = 0;
    frame.querySelector(".attack_start").style.opacity = 0;
    frame.querySelector(".attack_finish").style.opacity = 0;
    frame.querySelector(".death").style.opacity = 1;
  }

  this.attackAnimation = (dmg) => {
    let frame = $("#" + this.id + "§" + this.index);
    let shake = Math.round(random(4, 1));
    frame.classList.add("enemyAttack");
    setTimeout(a => this.attack_start(), 50);
    setTimeout(a => this.attack_finish(), 550);
    setTimeout(a => $(".combatScreen").classList.add("shake" + shake), 800);
    setTimeout(a => { player.stats.hp -= dmg; createDroppingString(dmg, $(".playerInteract"), "damage") }, 800);
    setTimeout(a => this.idle(), 900);
    setTimeout(a => frame.classList.remove("enemyAttack"), 1000);
    setTimeout(a => $(".combatScreen").classList.remove("shake" + shake), 1050);
  }

  this.hurtAnimation = () => {
    let frame = $("#" + this.id + "§" + this.index);
    let shake = Math.round(random(4, 1));
    frame.classList.add("shake" + shake);
    setTimeout(a => frame.classList.remove("shake" + shake), 300);
  }

  this.actionFill = () => {
    return 0.25 + this.stats.agi / 100 + valueFromItem("itemSpeed", this);
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

  this.stats.FmpMax = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("mp", this);
    return Math.floor((5 + 5 * this.stats.Fint() + bonusValue) * bonusPercentage);
  }

  function valuesFromItem(type, value, eq) {
    let total = 0;
    for (let itm in eq.equipment) {
      if (eq.equipment[itm]?.[type]?.[value]) total += eq.equipment[itm][type][value];
    } return total;
  }

  function valueFromItem(value, eq) {
    let total = 0;
    for (let itm in eq.equipment) {
      if (eq.equipment[itm]?.[value]) total += eq.equipment[itm]?.[value];
    } return total;
  }

  this.stats.FphysicalArmor = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("physicalArmor", this);
    return Math.floor((valuesFromItem("armors", "physical", this) + bonusValue) * bonusPercentage);
  }

  this.stats.FmagicalArmor = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("magicalArmor", this);
    return Math.floor((valuesFromItem("armors", "magical", this) + bonusValue) * bonusPercentage);
  }

  this.stats.FelementalArmor = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("elementalArmor", this);
    return Math.floor((valuesFromItem("armors", "elemental", this) + bonusValue) * bonusPercentage);
  }

  function calcValues(value, kohde) {
    let val = 0;
    let per = 1;
    for (let nimi in kohde.equipment) {
      const item = kohde.equipment[nimi];
      if (!item.id) continue;
      if (item?.effects?.[value + "P"]) per += item.effects[value + "P"] / 100;
      if (item?.effects?.[value + "V"]) val += item.effects[value + "V"];
    } return { v: val, p: per };
  }

  function calcValue(value, kohde) {
    let val = 0;
    for (let nimi in kohde.equipment) {
      const item = kohde.equipment[nimi];
      if (!item.id) continue;
      if (item?.[value]) val += item[value];
    } return val;
  }

  this.regularAttack = () => {
    let damages = this.weaponDamage();
    if (damages.physical) damages.physical = Math.floor(damages.physical * damages.physical / (damages.physical + player.stats.FphysicalArmor()));
    if (damages.magical) damages.magical = Math.floor(damages.magical * damages.magical / (damages.magical + player.stats.FmagicalArmor()));
    if (damages.elemental) damages.elemental = Math.floor(damages.elemental * damages.elemental / (damages.elemental + player.stats.FelementalArmor()));
    return damages.physical + damages.magical + damages.elemental;
  }

  this.weaponDamage = () => {
    let base = {}
    if (this.equipment.weapon?.damages) {
      let dmg = this.equipment.weapon.damages;
      base.physical = random(dmg.physicalMax, dmg.physicalMin);
      base.magical = random(dmg.magicalMax, dmg.magicalMin);
      base.elemental = random(dmg.elementalMax, dmg.elementalMin);
    } else base.physical = 3;
    for (let dmg in base) {
      const { v: bonusValue, p: bonusPercentage } = calcValues(dmg + "Damage", this);
      if (dmg == "physical") base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fstr() / 20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus] / 100)) * bonusPercentage);
      else if (dmg == "magical") base[dmg] = base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fint() / 20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus] / 100)) * bonusPercentage);
      else if (dmg == "elemental") base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fwis() / 20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus] / 100)) * bonusPercentage);
    }
    return base;
  }

  this.decideMove = () => {
    let table = this.abilities;
    let max = 0;
    for (let i = 0; i < table.length; i++) {
      if(table[i].onCooldown > 0 || table[i].mpCost > this.stats.mp) continue;
      table[i].ai_wants = 0;
      if (table[i - 1]) table[i].ai_wants = table[i - 1].ai_wants;
      else table[i].ai_wants = 0;
      table[i].ai_wants += table[i].ai_want;
      max = table[i].ai_wants;
    }
    let value = Math.floor(random(max));
    let targeting;
    for (let unit of table) {
      if(unit.onCooldown > 0 || unit.mpCost > this.stats.mp) continue;
      if (unit.ai_wants >= value) { targeting = unit; break; }
    }
   return targeting;
  }
}


const ai_stat_templates = {
  "warrior": {
    weighted_stats: [
      { stat: "str", value: 40 },
      { stat: "vit", value: 30 },
      { stat: "agi", value: 30 },
      { stat: "int", value: 0 },
      { stat: "wis", value: 0 }
    ]
  },
  "defender": {
    weighted_stats: [
      { stat: "str", value: 30 },
      { stat: "vit", value: 50 },
      { stat: "agi", value: 20 },
      { stat: "int", value: 0 },
      { stat: "wis", value: 0 }
    ]
  },
  "fighter": {
    weighted_stats: [
      { stat: "str", value: 50 },
      { stat: "vit", value: 30 },
      { stat: "agi", value: 20 },
      { stat: "int", value: 0 },
      { stat: "wis", value: 0 }
    ]
  },
  "ranger": {
    weighted_stats: [
      { stat: "str", value: 30 },
      { stat: "vit", value: 20 },
      { stat: "agi", value: 50 },
      { stat: "int", value: 0 },
      { stat: "wis", value: 0 }
    ]
  },
  "mage": {
    weighted_stats: [
      { stat: "str", value: 10 },
      { stat: "vit", value: 10 },
      { stat: "agi", value: 10 },
      { stat: "int", value: 40 },
      { stat: "wis", value: 30 }
    ]
  },
  "wizard": {
    weighted_stats: [
      { stat: "str", value: 10 },
      { stat: "vit", value: 10 },
      { stat: "agi", value: 10 },
      { stat: "int", value: 30 },
      { stat: "wis", value: 40 }
    ]
  },
  "battlemage": {
    weighted_stats: [
      { stat: "str", value: 15 },
      { stat: "vit", value: 20 },
      { stat: "agi", value: 10 },
      { stat: "int", value: 25 },
      { stat: "wis", value: 30 }
    ]
  }
}