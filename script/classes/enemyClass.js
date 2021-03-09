function EnemyClass(base) {
  if (Enemies[base.id] == null) console.error(base.id + " is not a valid id!");
  const defaultEnemy = Enemies[base.id];
  this.id = base.id;
  this.name = base.name;
  this.sprites = base.sprites ?? defaultEnemy.sprites;
  this.level = base.level ?? defaultEnemy.level;
  this.equipment = new Equipments(base.equipment ?? defaultEnemy.equipment);
  this.stats = new Stats(base.stats ?? defaultEnemy.stats);
  this.resistances = new Resistances(base.resistances ?? defaultEnemy.resistances);
  this.skills = new Skills(base.skills ?? defaultEnemy.skills);
  this.inventory = base.inventory.map(itm => new Item(itm)) ?? defaultEnemy.inventory;
  this.level = new Levels(base.level);
  this.index = base.index;
  this.stat_template = base.stat_template ?? defaultEnemy.stat_template;
  this.abilities = base.abilities.map(ability => new Ability(ability));
  this.statuses = base.statuses.map(status => new statusEffect(status));
  this.ai_prefers = base.ai_prefers;
  this.dead = base.dead || false;
  this.lootTable = base.lootTable ?? defaultEnemy.lootTable;
  this.permanentStatuses = defaultEnemy.permanentStatuses || {};

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
    this.healL = stat.healL;
    this.critChance = stat.critChance;
    this.critDmg = stat.critDmg;
  }

  function Resistances(resist) {
    this.burning = resist.burning;
    this.bleeding = resist.bleeding;
    this.stun = resist.stun;
    this.power = resist.power;
    this.defense = resist.defense;
    this.freezing = resist.freezing;
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

  this.kill = () => {
    this.stats.hp = 0;
    this.dead = true;
    this.death();
    let frame = $("#" + this.id + "§" + this.index);
    frame.querySelector(".enemyHpNumber").textContent = this.stats.hp + " / " + this.stats.FhpMax();
    frame.querySelector(".enemyHpFill").style.width = (this.stats.hp  / this.stats.FhpMax()) * 100 + '%';
    frame.querySelector(".enemyHpLate").style.width = (this.stats.hp / this.stats.FhpMax()) * 100 + '%';
    frame.querySelector(".enemyMpNumber").textContent = this.stats.mp + " / " + this.stats.FmpMax();
    frame.querySelector(".enemyMpFill").style.width = (this.stats.mp  / this.stats.FmpMax()) * 100 + '%';
    frame.querySelector(".enemyMpLate").style.width = (this.stats.mp / this.stats.FmpMax()) * 100 + '%';
    frame.querySelector(".enemyActionNumber").textContent = Math.floor(this.stats.ap) + "%";
    frame.querySelector(".enemyActionFill").style.width = this.stats.ap + '%';
    let multi = 1 + (this.level.lvl - player.level.lvl)/20;
    if(multi > 2) multi = 2;
    else if(multi < 0.1) multi = 0.1;
    const exp = this.level.xpGive * multi;
    setTimeout(a=>frame.classList.add("deathFade"), 550);
    setTimeout(a=>drawEnemies(enemiesCombat), 1200);
    setTimeout(a=>createDroppingString(exp + " EXP", frame.querySelector(".enemyDroppingString"), "health"), 600);
    player.level.xp += exp;
    enemiesVanquished.push({...this});
    if(enemiesVanquished.length === enemiesCombat.length) setTimeout(a=>endScreenFadeIn("win"), 100);
  }

  this.attackAnimation = (dmg, blocked, dodged, crit) => {
    let frame = $("#" + this.id + "§" + this.index);
    let shake = Math.round(random(4, 1));
    if(frame.classList.contains("enemyAttack")) frame.classList.remove("enemyAttack");
    frame.classList.add("enemyAttack");
    setTimeout(a => this.attack_start(), 50);
    setTimeout(a => this.attack_finish(), 550);
    setTimeout(a => { if(!dodged) $(".combatScreen").classList.add("shake" + shake) }, 800);
    setTimeout(a => {
      if(!dodged) player.stats.hp -= dmg;
      if(!blocked && !dodged) { createDroppingString(dmg, $(".playerInteract"), "damage"); $(".bloodyScreenEffect").style.opacity = 1 }
      else if(blocked && !dodged) { createDroppingString("🛡" + dmg, $(".playerInteract"), "damage"); $(".bloodyScreenEffect").style.opacity = 1 }
      else if(!blocked && dodged) { createDroppingString("MISS", $(".playerInteract"), "neutral"); }
      if (crit > 1) createDroppingString("CRIT!", $(".playerInteract"), "crit");
    }, 800);
    setTimeout(a => { if(!dodged) $(".bloodyScreenEffect").classList.add("fadeOut") }, 900);
    setTimeout(a => this.idle(), 900);
    setTimeout(a => frame.classList.remove("enemyAttack"), 1000);
    setTimeout(a => {
      if(!dodged) $(".combatScreen").classList.remove("shake" + shake);
    }, 1050);
    setTimeout(a => {
      if(!dodged) $(".bloodyScreenEffect").style.opacity = 0;
      if(!dodged) $(".bloodyScreenEffect").classList.remove("fadeOut")
    }, 1075);
  }

  this.rollCrit = () => {
    if (this.stats.FcritChance() >= random(100)) return this.stats.FcritDmg()/100;
    else return 0;
  }

  this.selfBuffAnimation = () => {
    let frame = $("#" + this.id + "§" + this.index);
    frame.classList.add("heal");
    setTimeout(a => frame.classList.remove("heal"), 1000);
  }

  this.hurtAnimation = () => {
    let frame = $("#" + this.id + "§" + this.index);
    let shake = Math.round(random(4, 1));
    frame.classList.add("shake" + shake);
    setTimeout(a => frame.classList.remove("shake" + shake), 300);
  }

  this.actionFill = () => {
    const { v: bonusValue, p: bonusPercentage } = calcValues("actionFill", this);
    let value = (0.35 + this.stats.Fagi() / 100 + valueFromItem("itemSpeed", this) + bonusValue) * bonusPercentage;
    if (value > 2) value = 2;
    else if (value < 0) value = 0;
    return value;
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

  this.skills.Farmorer = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("armorer", this);
    return Math.floor((this.skills.armorer + bonusValue) * bonusPercentage);
  }

  this.skills.Fheavy_weapons = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("heavy_weapons", this);
    return Math.floor((this.skills.heavy_weapons + bonusValue) * bonusPercentage);
  }

  this.skills.Flight_weapons = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("light_weapons", this);
    return Math.floor((this.skills.light_weapons + bonusValue) * bonusPercentage);
  }

  this.skills.Fshield = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("shield", this);
    return Math.floor((this.skills.shield + bonusValue) * bonusPercentage);
  }

  this.skills.Fdodge = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("dodge", this);
    return Math.floor((this.skills.dodge + bonusValue) * bonusPercentage);
  }

  this.stats.FcritChance = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("critChance", this);
    return Math.floor((this.stats.critChance + bonusValue) * bonusPercentage);
  }

  this.stats.FcritDmg = () => {
    const {v: bonusValue, p: bonusPercentage} = calcValues("critDmg", this);
    return Math.floor((this.stats.critDmg + bonusValue) * bonusPercentage);
  }

  function valuesFromItem(type, value, eq) {
    let total = 0;
    for (let itm in eq.equipment) {
      if (eq.equipment[itm]?.[type]?.[value]) total += eq.equipment[itm][type][value];
    } return total;
  }

  this.charClass = () => {
    let clas = {};
    for(let stat in player.permanentStatuses) {
      if(stat.includes("_class")) {
        clas = player.permanentStatuses[stat];
      }
    }
    return clas;
  }

  function valueFromItem(value, eq) {
    let total = 0;
    for (let itm in eq.equipment) {
      if (eq.equipment[itm]?.[value]) total += eq.equipment[itm]?.[value];
    } return total;
  }

  this.stats.FphysicalArmor = () => {
    let {v: bonusValue, p: bonusPercentage} = calcValues("physicalArmor", this);
    const {v: armorValue, p: armorPercentage} = calcValues("defense", this);
    bonusValue += armorValue;
    bonusPercentage *= armorPercentage;
    return Math.floor((valuesFromItem("armors", "physical", this) + bonusValue) * bonusPercentage);
  }

  this.stats.FmagicalArmor = () => {
    let {v: bonusValue, p: bonusPercentage} = calcValues("magicalArmor", this);
    const {v: armorValue, p: armorPercentage} = calcValues("defense", this);
    bonusValue += armorValue;
    bonusPercentage *= armorPercentage;
    return Math.floor((valuesFromItem("armors", "magical", this) + bonusValue) * bonusPercentage);
  }

  this.stats.FelementalArmor = () => {
    let {v: bonusValue, p: bonusPercentage} = calcValues("elementalArmor", this);
    const {v: armorValue, p: armorPercentage} = calcValues("defense", this);
    bonusValue += armorValue;
    bonusPercentage *= armorPercentage;
    return Math.floor((valuesFromItem("armors", "elemental", this) + bonusValue) * bonusPercentage);
  }

  this.attackBlocked = () => {
    let blocked = false;
    if (this.equipment.shield?.id) {
      const { v: bonusValue, p: bonusPercentage } = calcValues("blockChance", this);
      if (Math.random() >= 0.95 - ((this.skills.Fshield() / 500 + bonusValue / 100) * bonusPercentage)) blocked = true;
    }
    return blocked;
  };

  this.attackDodged = () => {
    let dodged = false;
    const { v: bonusValue, p: bonusPercentage } = calcValues("dodgeChance", this);
    if (Math.random() >= 0.97 - (((this.skills.Fdodge() / 1000) + (this.stats.Fagi() / 5000) + bonusValue / 1000) * bonusPercentage)) dodged = true;
    return dodged;
  };

  this.resistStatus = (status) => {
    const { v: bonusValue, p: bonusPercentage } = calcValues(status.effectType + "Resist", this);
    let resist = Math.floor((this.resistances[status.effectType] + bonusValue) * bonusPercentage);
    let inflict = status.inflict;
    return random(resist) >= random(inflict) ? true : false;
  }

  function calcValues(value, kohde) {
    let val = 0;
    let per = 1;
    for(let nimi in kohde.equipment) {
      const item = kohde.equipment[nimi];
      if(!item.id) continue;
      if(item?.effects?.[value + "P"]) per *= 1 + item.effects[value + "P"] / 100;
      if(item?.effects?.[value + "V"]) val += item.effects[value + "V"];
    } 
    for(let status of kohde.statuses) {
      if(status?.effects?.[value + "P"]) per *= 1 + status?.effects?.[value + "P"] / 100;
      if(status?.effects?.[value + "V"]) val += status?.effects?.[value + "V"];
    }
    for(let stat in kohde.permanentStatuses) {
      const status = kohde.permanentStatuses[stat];
      if(status?.effects?.[value + "P"]) per *= 1 + status?.effects?.[value + "P"] / 100;
      if(status?.effects?.[value + "V"]) val += status?.effects?.[value + "V"];
    }
    return { v: val, p: per };
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
    const { v: NOT_USED, p: atkPercentage } = calcValues("attack", this);
    let block = player.attackBlocked();
    let dodge = player.attackDodged();
    let damages = this.weaponDamage();
    let crit = 1 + this.rollCrit();
    if (damages.physical) damages.physical = Math.floor(damages.physical * crit * damages.physical * crit / (damages.physical * crit + player.stats.FphysicalArmor()));
    if (damages.magical) damages.magical = Math.floor(damages.magical * crit * damages.magical * crit / (damages.magical * crit + player.stats.FmagicalArmor()));
    if (damages.elemental) damages.elemental = Math.floor(damages.elemental * crit * damages.elemental * crit / (damages.elemental * crit + player.stats.FelementalArmor()));
    if (block) {
      damages.physical *= 1 - player.equipment.shield.blockAmount.physical / 100;
      damages.magical *= 1 - player.equipment.shield.blockAmount.magical / 100;
      damages.elemental *= 1 - player.equipment.shield.blockAmount.elemental / 100;
      block = true;
    }
    return { num: Math.floor((damages.physical + damages.magical + damages.elemental) * atkPercentage), blocked: block, dodged: dodge, crit: crit };
  }

  this.spellAttack = (target, spell) => {
    target = player;
    const { v: NOT_USED, p: atkPercentage } = calcValues("attack", this);
    let block = target.attackBlocked();
    let dodge = target.attackDodged();
    let damages = this.spellDamage(spell);
    let crit = 1 + this.rollCrit();
    console.log(damages);
    if (damages.physical) damages.physical = Math.floor(damages.physical * crit * damages.physical * crit / (damages.physical * crit + target.stats.FphysicalArmor()));
    if (damages.magical) damages.magical = Math.floor(damages.magical * crit * damages.magical * crit / (damages.magical * crit + target.stats.FmagicalArmor()));
    if (damages.elemental) damages.elemental = Math.floor(damages.elemental * crit * damages.elemental * crit / (damages.elemental * crit + target.stats.FelementalArmor()));
    if (block) {
      damages.physical *= 1 - target.equipment.shield.blockAmount.physical / 100;
      damages.magical *= 1 - target.equipment.shield.blockAmount.magical / 100;
      damages.elemental *= 1 - target.equipment.shield.blockAmount.elemental / 100;
      block = true;
    }
    console.log(damages);
    return { num: Math.floor((damages.physical + damages.magical + damages.elemental) * atkPercentage), blocked: block, dodged: dodge, crit: crit };
  }

  this.spellDamage = (spell) => {
    let base = {};
    ["physical", "magical", "elemental"].forEach(type => base[type] = spell.baseDamages[type] || 0);
    for(let dmg in base) {
      const {v: bonusValue, p: bonusPercentage} = calcValues(dmg + "Damage", this);
      if(dmg == "physical") base[dmg] = Math.round(((base[dmg] + bonusValue) * (1 + this.stats.Fstr()/20)) * bonusPercentage);
      else if(dmg == "magical") base[dmg] = base[dmg] = Math.round(((base[dmg] + bonusValue) * (1 + this.stats.Fint()/20)) * bonusPercentage);
      else if(dmg == "elemental") base[dmg] = Math.round(((base[dmg] + bonusValue) * (1 + this.stats.Fwis()/20)) * bonusPercentage);
    }
    return base;
  }

  this.weaponDamage = () => {
    let base = {}
    if (this.equipment.weapon?.damages) {
      let dmg = this.equipment.weapon.damages;
      ["physical", "magical", "elemental"].forEach(type => base[type] = random(dmg[type + "Max"], dmg[type + "Min"]));
    } else base.physical = 3;
    for (let dmg in base) {
      const { v: bonusValue, p: bonusPercentage } = calcValues(dmg + "Damage", this);
      if (dmg == "physical") base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fstr() / 20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus] / 100)) * bonusPercentage);
      else if (dmg == "magical") base[dmg] = base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fint() / 20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus] / 100)) * bonusPercentage);
      else if (dmg == "elemental") base[dmg] = Math.round((((base[dmg] + bonusValue) * (1 + this.stats.Fwis() / 20)) * (1 + this.skills[this.equipment?.weapon?.skillBonus] / 100)) * bonusPercentage);
    }
    return base;
  }

  this.updateStat = (int) => {
    let status = this.statuses[int];
    let statusObject = $("#" + this.id + this.index + status?.id);
    let bg = $("#" + this.id + "§" + this.index);
    let backframe = $(("#" + this.id + "§" + this.index) + " .enemyDroppingString");
    if (status?.damageOT && status) {
      if (status.hasDamaged <= 0) {
        status.hasDamaged = 1;
        if (status.damageOT > 0) createDroppingString(status.damageOT, backframe, "damage");
        else if (status.damageOT < 0) createDroppingString(Math.abs(status.damageOT), backframe, "health");
        this.stats.hp -= status.damageOT;
      }
    }
    if (!status || status.lastFor <= 0.1) {
      if (statusObject) bg.querySelector(".enemyStatusArea").removeChild(statusObject);
      return;
    }
    if (!statusObject || statusObject == undefined) {
      const frame = create("div");
      frame.id = this.id + this.index + status.id;
      frame.classList.add("statusFrameEnemy");
      const image = create("img");
      image.src = status.img;
      const num = create("p");
      num.textContent = Math.ceil(status.lastFor);
      frame.append(image, num);
      let desc = `<c>#c2bf27<c><f>18px<f>${status.name}§\n`;
      // if (status.effectType == "stun") desc += `${this.name} is stunned \nand unable to move.`;
      // else if (status.effectType == "bleeding") desc += `${this.name} is bleeding \nand takes § <c>red<c> ${status.damageOT} dmg/s`;
      // else if (status.effectType == "regen") desc += `${this.name} is regenerating \n${status.damageOT} health per second`;
      desc += statusSyntax(status);
      addHoverBox(frame, desc, "");
      bg.querySelector(".enemyStatusArea").append(frame);
    } else {
      if (!status || status.lastFor <= 0.1) {
        bg.querySelector(".enemyStatusArea").removeChild(statusObject);
        return;
      }
      statusObject.querySelector("p").textContent = Math.ceil(status.lastFor);
    }
  }

  this.healLimit = () => {
    return this.stats.FhpMax() * (this.stats.healL / 100);
  }

  this.canHeal = () => {
    for (let itm of this.inventory) {
      if (itm.healsUser) return true;
    } return false;
  }

  this.strongestAttack = () => {
    let totalDmg = 0;
    let strongest;
    for (let ability of this.abilities) {
      if (ability.onCooldown > 0 || this.stats.mp < ability.mpCost) continue;
      let dmg = 0;
      if(!ability.powerMultiplier) dmg = Math.round(this.spellAttack(player, ability).num);
      else dmg = Math.round(this.regularAttack().num * ability.powerMultiplier);
      if (dmg <= 0) dmg = 1;
      if (totalDmg < dmg) {
        totalDmg = dmg;
        strongest = ability;
      }
    } return strongest;
  }

  this.decideMove = () => {
    if (togetherWeCanKill(this.index)) {
      return this.strongestAttack();
    }
    else if (this.stats.hp <= this.healLimit() && this.canHeal()) {
      return "heal";
    }
    else {
      let table = this.abilities;
      let max = 0;
      for (let i = 0; i < table.length; i++) {
        if (table[i].onCooldown > 0 || table[i].mpCost > this.stats.mp) continue;
        table[i].ai_wants = 0;
        if (table[i - 1]) table[i].ai_wants = table[i - 1].ai_wants;
        else table[i].ai_wants = 0;
        table[i].ai_wants += Math.floor((table[i].ai_want + aiModifiers(table[i])) * (1 + (this.ai_prefers?.[table[i].type] / 100 || 0)));
        max = table[i].ai_wants;
      }
      let value = Math.floor(random(max));
      let targeting;
      for (let unit of table) {
        if (unit.onCooldown > 0 || unit.mpCost > this.stats.mp) continue;
        if (unit.ai_wants + aiModifiers(unit) >= value) { targeting = unit; break; }
      }
      return targeting;
    }
  }
}

function aiModifiers(mod) {
  let total = 0;
  if(!mod.ai_want_modifiers || mod.ai_want_modifiers.length < 1) return total;
  for(let modifier of mod.ai_want_modifiers) {
    if(eval(modifier.execute_if)) {
      total += modifier.value;
    }
  }
  return total;
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