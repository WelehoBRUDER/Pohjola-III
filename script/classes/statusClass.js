function statusEffect(base) {
  this.id = base.id;
  this.name = base.name ?? "NameNotFound";
  this.lastFor = base.lastFor;
  this.effects = base.effects;
  this.damageOT = base.damageOT;
  this.img = base.img;
  this.hasDamaged = base.hasDamaged;
}
