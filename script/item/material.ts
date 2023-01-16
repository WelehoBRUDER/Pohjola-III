interface MaterialObject extends ItemObject {
  type: "material";
}

class Material extends Item {
  constructor(material: MaterialObject) {
    // @ts-ignore
    if (!items[material.id]) throw new Error(`${material.id} is not a valid item id.`);
    super(material);
    this.type = "material";
  }
}
