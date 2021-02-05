function Ability(base) {
  const defaultAbility = Abilities[base.id];
  if(!defaultAbility) {
    console.warn(base.id + " is not valid!");
    console.log("This warning is most likely caused by an empty ability slot.");
    return {};
  } 
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
  this.type = defaultAbility.type;
  this.img = defaultAbility.img;
  this.requiresShield = defaultAbility.requiresShield;

}