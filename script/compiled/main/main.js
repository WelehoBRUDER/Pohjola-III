"use strict";
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomElement(array) {
    return array[random(0, array.length - 1)];
}
function randomElementExcept(array, except) {
    let index = random(0, array.length - 1);
    while (array[index] === except) {
        index = random(0, array.length - 1);
    }
    return array[index];
}
//# sourceMappingURL=main.js.map