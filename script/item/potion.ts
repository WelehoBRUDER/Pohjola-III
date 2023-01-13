interface PotionObject extends ItemObject {
  type: "material";
  heal?: number;
  manaRecover?: number;
}

class Potion extends Item {
  constructor(potion: PotionObject) {
    super(potion);
    // @ts-ignore
    const base = items[potion.id];
    this.type = "potion";
    this.heal = base.heal;
    this.manaRecover = base.manaRecover;
  }

  drink(user: Player | Enemy) {
    if (this.heal) user.heal(this.heal);
    if (this.manaRecover) user.recoverMana(this.manaRecover);
  }
}