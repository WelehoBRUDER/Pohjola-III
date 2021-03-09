function statusEffect(base) {
  this.id = base.id;
  this.name = base.name ?? "NameNotFound";
  this.lastFor = base.lastFor;
  this.effects = base.effects;
  this.damageOT = base.damageOT;
  this.img = base.img;
  this.hasDamaged = base.hasDamaged;
  this.effectType = base.effectType;
  this.inflict = base.inflict ?? 50;
} 

function permanentStatus(base) {
  const defaultStatus = permanentEffects[base.id];
  if(!defaultStatus) console.error(base?.id + " is not a valid ID!");
  this.id = base.id;
  this.name = base.name ?? defaultStatus.name;
  this.desc = base.desc ?? defaultStatus.desc;
  this.category = defaultStatus.category;
  this.level = base.level ?? defaultStatus.level;
  this.effects = getEffects(base);
  this.class = base.class ?? defaultStatus.class;

  function getEffects(stat) {
    if(stat.category !== "perk") return stat.effects;
    return defaultStatus.effects[stat.level - 1].effects;
  }
}