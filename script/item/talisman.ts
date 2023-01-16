interface TalismanObject extends ItemObject {
  speed: number;
  slot: string;
}

class Talisman extends Item {
  [speed: string]: any;
  slot: string;
  constructor(talisman: TalismanObject) {
    // @ts-ignore
    if (!items[talisman.id]) throw new Error(`${talisman.id} is not a valid item id.`);
    super(talisman);
    this.type = "talisman";
    this.speed = talisman.speed;
    this.slot = talisman.slot;
  }
}
