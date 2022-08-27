class Armor extends Item {
  [armor: string]: any;
  speed: number;
  defence: I_Defences;
  slot: string;
  constructor(armor: Armor) {
    super(armor);
    this.type = "armor";
    this.armor = armor.armor;
    this.defence = armor.defence;
    this.speed = armor.speed;
    this.slot = armor.slot;
  }
}
