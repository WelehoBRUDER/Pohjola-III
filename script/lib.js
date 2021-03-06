const $ = e => { let arr = document.querySelectorAll(e); return arr.length > 1 ? arr : arr[0] };
const trueRandom = (max, min = 0) => { return Math.random() * (max - min) + min; };
const random = (max, min = 0) => { return Math.round(Math.random() * (max - min) + min); };
const percentOf = (v, m) => { return m * (v/100) };
const create = e => document.createElement(e);
const pxtovh = v => v / clientHeight * 100;
const pxtovw = v => v / clientWidth * 100;
var isFirefox = typeof InstallTrigger !== 'undefined'; 

function sortingByPrice(a, b) {
  // Use toUpperCase() to ignore character casing
  const aVal = a.price;
  const bVal = b.price;

  let comparison = 0;
  if (aVal < bVal) {
    comparison = 1;
  } else if (aVal > bVal) {
    comparison = -1;
  }
  return comparison;
}

function draggableElement(area, liikkuu = area) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let alue = area.querySelector(".draggableArea");
  alue.onmousedown = paina;

  function paina(e) {
      pos1 = liikkuu.offsetLeft;
      pos2 = liikkuu.offsetTop;
      pos3 = e.x;
      pos4 = e.y;
      alue.onmouseup = paasta;
      document.onmousemove = liikuta;
      liikkuu.style.marginLeft = "0px"; liikkuu.style.marginRight = "0px"; liikkuu.style.marginTop = "0px"; liikkuu.style.marginBottom = "0px";
  }

  function liikuta(e) {
      e.preventDefault();
      liikkuu.style.left = pos1 + e.x - pos3 + "px";
      liikkuu.style.top = pos2 + e.y - pos4 + "px";
  }

  function paasta() {
      alue.onmouseup = null;
      document.onmousemove = null;
      liikkuu.style.zIndex = null;
  }
}