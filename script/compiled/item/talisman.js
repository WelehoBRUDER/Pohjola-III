"use strict";
class Talisman extends Item {
    slot;
    constructor(talisman) {
        // @ts-ignore
        if (!items[talisman.id])
            throw new Error(`${talisman.id} is not a valid item id.`);
        super(talisman);
        this.type = "talisman";
        this.speed = talisman.speed;
        this.slot = talisman.slot;
    }
}
//# sourceMappingURL=talisman.js.map