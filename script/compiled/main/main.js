"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomElement(array) {
    return array[random(0, array.length - 1)];
}
function randomElementExcept(array, except) {
    var index = random(0, array.length - 1);
    while (array[index] === except) {
        index = random(0, array.length - 1);
    }
    return array[index];
}
function weightedRandom(array) {
    var table = __spreadArray([], array);
    var max = 0;
    for (var i = 0; i < table.length; i++) {
        table[i].dynamicWeight = 0;
        if (table[i - 1])
            table[i].dynamicWeight = table[i - 1].dynamicWeight;
        else
            table[i].dynamicWeight = 0;
        table[i].dynamicWeight += table[i].weight;
        max = table[i].dynamicWeight;
    }
    var value = Math.floor(random(0, max));
    return table.findIndex(function (item) { return item.dynamicWeight >= value; });
}
//# sourceMappingURL=main.js.map