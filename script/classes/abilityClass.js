function Ability(base) {
  const defaultAbility = Abilities[base.id];
  if(!defaultAbility) console.error(base.id + " is not valid!");
  this.id = base.id;
  this.name = base.name;
  this.mpCost = base.mpCost ?? defaultAbility.mpCost;
  this.hpCost = base.hpCost ?? defaultAbility.hpCost;
  this.cooldown = base.cooldown ?? defaultAbility.cooldown;
  this.onCooldown = base.onCooldown || 0;
  this.powerMultiplier = base.powerMultiplier ?? defaultAbility.powerMultiplier;
  this.baseDamage = base.baseDamage ?? defaultAbility.baseDamage;
  this.status_effects = base.status_effects ?? defaultAbility.status_effects;
  this.healAmount = base.healAmount ?? defaultAbility.healAmount;
  this.ai_want = defaultAbility.ai_want;

}