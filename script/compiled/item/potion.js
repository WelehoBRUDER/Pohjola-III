"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Potion = /** @class */ (function (_super) {
    __extends(Potion, _super);
    function Potion(potion) {
        var _this = _super.call(this, potion) || this;
        // @ts-ignore
        var base = items[potion.id];
        _this.type = "potion";
        _this.heal = base.heal;
        _this.manaRecover = base.manaRecover;
        return _this;
    }
    Potion.prototype.drink = function (user) {
        if (this.heal)
            user.heal(this.heal);
        if (this.manaRecover)
            user.recoverMana(this.manaRecover);
        if (isInCombat()) {
            if (this.heal) {
                if (user instanceof Player) {
                    createDroppingText("+" + this.heal + " HP", tools, "heal");
                }
            }
            if (this.manaRecover) {
                if (user instanceof Player) {
                    createDroppingText("+" + this.manaRecover + " MP", tools, "mana");
                }
            }
            user.stats.ap = 0;
            game.resume();
        }
    };
    return Potion;
}(Item));
//# sourceMappingURL=potion.js.map