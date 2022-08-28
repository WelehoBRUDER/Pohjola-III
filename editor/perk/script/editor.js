const perkContainer = document.querySelector(".perks");
const perkInfo = document.querySelector(".perk-info");

let heldDownTimer;

function renderPerks() {
  perkContainer.innerHTML = "";
  const baseSize = 64;
  const lineSize = 32;
  const lineWidth = 6;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const FullPerks = perks.map((p) => new Perk(p));
  // Create perk elements and place them on the screen
  FullPerks.forEach((perk) => {
    const perkDiv = document.createElement("div");
    const img = document.createElement("img");
    const perk_id = document.createElement("p");
    img.src = `../../${perk.icon}`;
    perk_id.innerText = perk.id;
    perkDiv.setAttribute("perk-id", perk.id);
    perkDiv.style.width = `${baseSize}px`;
    perkDiv.style.height = `${baseSize}px`;
    perkDiv.classList.add("perk");
    perkDiv.classList.add(perk.class || "adventure");
    perkDiv.onmousedown = (e) => {
      clearTimeout(heldDownTimer);
      heldDownTimer = setTimeout(() => {
        startDrag(e);
      }, 100);
    };
    perkDiv.onmouseup = () => {
      clearTimeout(heldDownTimer);
      perkDetails(perk);
    };
    if (perk.relative_to) {
      const found = perkContainer.querySelector(`.perk[perk-id="${perk.relative_to}"]`);
      perkDiv.style.left = `${perk.pos.x * baseSize + found.offsetLeft}px`;
      perkDiv.style.top = `${perk.pos.y * baseSize + found.offsetTop}px`;
    } else {
      perkDiv.style.left = `${perk.pos.x * baseSize}px`;
      perkDiv.style.top = `${perk.pos.y * baseSize}px`;
    }
    perkDiv.append(img, perk_id);
    perkContainer.append(perkDiv);
  });

  // Draw lines between perks
  FullPerks.forEach((_perk) => {
    let perk = perkContainer.querySelector(`.perk[perk-id="${_perk.id}"]`);
    if (_perk.requires) {
      _perk.requires.forEach((req) => {
        let found = perkContainer.querySelector(`.perk[perk-id="${req}"]`);
        let color = "rgb(65, 65, 65)";
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", `${+perk.style.left.replace(/\D/g, "") + lineSize}px`);
        line.setAttribute("y1", `${+perk.style.top.replace(/\D/g, "") + lineSize}px`);
        line.setAttribute("x2", `${+found.style.left.replace(/\D/g, "") + lineSize}px`);
        line.setAttribute("y2", `${+found.style.top.replace(/\D/g, "") + lineSize}px`);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", `${lineWidth}px`);
        svg.appendChild(line);
      });
    }
  });
  svg.setAttribute("width", "4000");
  svg.setAttribute("height", "4000");
  perkContainer.append(svg);
}

const dragData = {
  dragging: false,
  perk_element: null,
};

function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

/* Dragging */
function startDrag(e) {
  const perk = perks.find((p) => p.id === e.target.getAttribute("perk-id"));
  dragData.dragging = true;
  dragData.perk_element = e.target;
  dragData.perk = perk;
  document.body.onmouseup = () => stopDrag();
  document.body.onmousemove = (e) => drag(e);
}

function drag(e) {
  if (dragData.dragging) {
    dragData.perk_element.style.left = `${e.clientX - dragData.perk_element.offsetWidth / 2}px`;
    dragData.perk_element.style.top = `${e.clientY - dragData.perk_element.offsetHeight / 2}px`;

    // Update perk position
    if (dragData.perk.relative_to) {
      const found = perkContainer.querySelector(`.perk[perk-id="${dragData.perk.relative_to}"]`);
      dragData.perk.pos.x = roundHalf((e.clientX - found.offsetLeft) / 64);
      dragData.perk.pos.y = roundHalf((e.clientY - found.offsetTop) / 64);
    } else {
      dragData.perk.pos.x = roundHalf((e.clientX - perkContainer.offsetLeft) / 64);
      dragData.perk.pos.y = roundHalf((e.clientY - perkContainer.offsetTop) / 64);
    }
  }
}

function stopDrag() {
  dragData.dragging = false;
  dragData.perk_element = null;
  dragData.perk = null;
  renderPerks();
  document.body.onmouseup = null;
  document.body.onmousemove = null;
}

function addPerk() {
  let id = prompt("Enter a unique ID for the perk");
  perks.push({
    id: id,
    icon: "gfx/icons/totem-head.png",
    pos: { x: 10, y: 0 },
    requires: [],
  });
  renderPerks();
}

renderPerks();
