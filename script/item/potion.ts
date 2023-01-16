interface PotionObject extends ItemObject {
  type: "material";
  heal?: number;
  manaRecover?: number;
  effectsToSelf?: EffectObject[];
}

class Potion extends Item {
  constructor(potion: PotionObject) {
    // @ts-ignore
    if (!items[potion.id]) throw new Error(`${potion.id} is not a valid item id.`);
    super(potion);
    // @ts-ignore
    const base = items[potion.id];
    this.type = "potion";
    this.heal = base.heal;
    this.manaRecover = base.manaRecover;
    this.effectsToSelf = base.effectsToSelf;
  }

  drink(user: Player | Enemy) {
    if (this.heal) user.heal(this.heal);
    if (this.manaRecover) user.recoverMana(this.manaRecover);
    if (this.effectsToSelf) this.effectsToSelf.forEach((effect: EffectObject) => user.addStatus(effect, user));
    if (isInCombat()) {
      if (this.heal) {
        if (user instanceof Player) {
          createDroppingText(`+${this.heal} HP`, tools, "heal");
        }
      }
      if (this.manaRecover) {
        if (user instanceof Player) {
          createDroppingText(`+${this.manaRecover} MP`, tools, "mana");
        }
      }
      user.stats.ap = 0;
      game.resume();
    }
  }
}
