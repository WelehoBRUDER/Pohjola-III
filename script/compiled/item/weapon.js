"use strict";
/*
  Cost means how much mana or health it takes to use the weapon
  By default there's no cost to it.
*/
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
var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon(weapon) {
        var _this = _super.call(this, weapon) || this;
        _this.type = "weapon";
        _this.cost = weapon.cost;
        _this.speed = weapon.speed;
        _this.atk = weapon.atk;
        _this.slot = "weapon";
        return _this;
    }
    return Weapon;
}(Item));
//# sourceMappingURL=weapon.js.map