interface ArmorObject extends ItemObject {
  [armor: string]: any;
  speed: number;
  defence: I_Defences;
  slot: string;
}

class Armor extends Item {
  [armor: string]: any;
  speed: number;
  defence: I_Defences;
  slot: string;
  constructor(armor: ArmorObject) {
    // @ts-ignore
    if (!items[armor.id]) throw new Error(`${armor.id} is not a valid item id.`);
    super(armor);
    this.type = "armor";
    this.armor = armor.armor;
    this.defence = armor.defence;
    this.speed = armor.speed;
    this.slot = armor.slot;
  }
}
