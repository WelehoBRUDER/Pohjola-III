const $ = e => { let arr = document.querySelectorAll(e); return arr.length > 1 ? arr : arr[0] };
const trueRandom = (max, min = 0) => { return Math.random() * (max - min) + min; };
const random = (max, min = 0) => { return Math.round(Math.random() * (max - min) + min); };
const percentOf = (v, m) => { return m * (v/100) };
const create = e => document.createElement(e);
const pxtovh = v => v / clientHeight * 100;
const pxtovw = v => v / clientWidth * 100;
var isFirefox = typeof InstallTrigger !== 'undefined';