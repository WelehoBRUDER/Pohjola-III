function Item(base) {
  const defaultItem = {...items[base.id]};
  if(!defaultItem) console.error(base.id + " was not valid!");
  this.id = base.id;
  this.name = base.name ?? defaultItem.name;
  this.amount = base.amount ?? 1;
  this.type = defaultItem.type;
  this.artifact = defaultItem.artifact || false;
  this.equipmentSlot = defaultItem.equipmentSlot;
  this.level = base.level || 0;
  this.damages = new Damages(defaultItem?.damages, this) ?? {};
  this.effects = base.effects || defaultItem.effects;
  this.armors = new Armors(defaultItem?.armors, this) ?? {};
  this.skillBonus = defaultItem.skillBonus;
  this.blockAmount = new BlockAmounts(defaultItem?.blockAmount, this) ?? {};
  this.itemSpeed = defaultItem.itemSpeed;
  this.weaponType = defaultItem.weaponType;
  this.price = Math.ceil(defaultItem.price * (1 + base.level/3));
  this.statusEffects = defaultItem.statusEffects;
  this.useLobby = defaultItem.useLobby;
  this.healsUser = defaultItem.healsUser;
  this.img = defaultItem.img;
  this.crafting = defaultItem.crafting;
  this.tier = defaultItem.tier;
  this.selected = base.selected || false;
  this.hasRolled = base.hasRolled || false;
  
  if(this.artifact && !this.hasRolled) {
    this.hasRolled = true;
    const currentTier = itemTiers[this.tier];
    let amount = Math.max(random(currentTier.artifactEffectsMax, currentTier.artifactEffectsMin), 1); // <-- 1 on min num
    
    if(this.effects == undefined) this.effects = {};
    while(amount--) {
      const types = ["P", "V"];
      let effect = effectsList[random(effectsList.length-1)];
      let type = types[random(1)];
      while(this.effects[effect + type]) effect = effectsList[random(effectsList.length-1)];
      if(effect.includes("crit")) type = "V";
      else if(effect.includes("Damage") || effect == "attack" || effect == "defense") type = "P";
      let value = random(currentTier["artifactLevel" + type] || 1, 1);
      if((effect == "hp" || effect == "mp") && type == "V") value *= 2;
      this.effects[effect + type] ??= value;
    }
  }

  function Damages(dmg, lvl) {
    this.physicalMin = dmg?.physicalMin * (1 + lvl.level/5) || 0;
    this.physicalMax = dmg?.physicalMax * (1 + lvl.level/5) || 0;
    this.magicalMin = dmg?.magicalMin * (1 + lvl.level/5) || 0;
    this.magicalMax = dmg?.magicalMax * (1 + lvl.level/5) || 0;
    this.elementalMin = dmg?.elementalMin * (1 + lvl.level/5) || 0;
    this.elementalMax = dmg?.elementalMax * (1 + lvl.level/5) || 0;
  }

  function Armors(arm, lvl) {
    this.physical = arm?.physical * (1 + lvl.level/5) || 0;
    this.magical = arm?.magical * (1 + lvl.level/5) || 0;
    this.elemental = arm?.elemental * (1 + lvl.level/5) || 0;
  }

  function BlockAmounts(block, lvl) {
    this.physical = block?.physical * (1 + lvl.level/5) || 0;
    this.magical = block?.magical * (1 + lvl.level/5) || 0;
    this.elemental = block?.elemental * (1 + lvl.level/5) || 0;
  }

  this.hasArmor = () => {
    return this.armors.physical + this.armors.magical + this.armors.elemental == 0 ? false : true;
  }

  this.hasBlock = () => {
    return this.blockAmount.physical + this.blockAmount.magical + this.blockAmount.elemental == 0 ? false : true;
  }

  this.minDmg = () => {
    return this.damages.physicalMin + this.damages.magicalMin + this.damages.magicalMin;
  }

  this.maxDmg = () => {
    return this.damages.physicalMax + this.damages.magicalMax + this.damages.magicalMax;
  }
}