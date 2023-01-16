"use strict";
class Material extends Item {
    constructor(material) {
        // @ts-ignore
        if (!items[material.id])
            throw new Error(`${material.id} is not a valid item id.`);
        super(material);
        this.type = "material";
    }
}
//# sourceMappingURL=material.js.map