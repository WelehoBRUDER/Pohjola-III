function Ability(base) {
  const defaultAbility = Abilities[base.id];
  if(!defaultAbility) {
    console.warn(base.id + " is not valid!");
    console.log("This warning is most likely caused by an empty ability slot.");
    return {};
  } 
  if(!base.modifiers?.mpCost) this.modifiers = {};
  this.id = base.id;
  this.name = base.name;
  this.modifiers = new abiModifiers(base.modifiers || "");
  this.mpCost = Math.round(defaultAbility.mpCost * this.modifiers.mpCost);
  this.hpCost = Math.round(defaultAbility.hpCost * this.modifiers.hpCost);
  this.cooldown = Math.round(defaultAbility.cooldown * this.modifiers.cooldown);
  this.onCooldown = base.onCooldown || 0;
  this.powerMultiplier = defaultAbility.powerMultiplier * this.modifiers.powerMultiplier;
  this.baseDamages = base.baseDamages ?? defaultAbility.baseDamage;
  this.status_effects = base.status_effects ?? defaultAbility.status_effects;
  this.healAmount = Math.round(defaultAbility.healAmount * this.modifiers.healAmount);
  this.ai_want = defaultAbility.ai_want;
  this.ai_want_modifiers = defaultAbility.ai_want_modifiers;
  this.type = defaultAbility.type;
  this.img = defaultAbility.img;
  this.requiresShield = defaultAbility.requiresShield;

  function abiModifiers(mod) {
    this.mpCost = mod.mpCost ?? 1;
    this.hpCost = mod.hpCost ?? 1;
    this.cooldown = mod.cooldown ?? 1;
    this.powerMultiplier = mod.powerMultiplier ?? 1;
    this.healAmount = mod.healAmount ?? 1;
  }
}