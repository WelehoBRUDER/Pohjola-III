interface MaterialObject extends ItemObject {
  type: "material";
}

class Material extends Item {
  constructor(material: MaterialObject) {
    super(material);
    this.type = "material";
  }
}
