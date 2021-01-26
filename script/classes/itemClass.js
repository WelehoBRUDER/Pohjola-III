function Item(base) {
  const defaultItem = items[base.id];
  if(!defaultItem) console.error(base.id + " was not valid!");
  this.id = base.id;
  this.name = base.name ?? defaultItem.name;
  this.amount = base.amount ?? 1;
  this.type = defaultItem.type;
  this.equipmentSlot = defaultItem.equipmentSlot;
  this.level = base.level ?? 0;
  this.damages = new Damages(defaultItem?.damages, this) ?? {};
  this.effects = defaultItem.effects;
  this.armors = new Armors(defaultItem?.armors, this) ?? {};
  this.skillBonus = defaultItem.skillBonus;
  this.blockAmount = new BlockAmounts(defaultItem?.blockAmount, this) ?? {};
  this.itemSpeed = defaultItem.itemSpeed;
  this.weaponType = defaultItem.weaponType;
  
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
}