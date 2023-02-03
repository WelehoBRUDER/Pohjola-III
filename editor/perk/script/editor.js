const perkContainer = document.querySelector(".perks");
const perkInfo = document.querySelector(".perk-info");

window.onmouseup = (e) => {
  clearTimeout(heldDownTimer);
};

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
    if (dragData.selected?.id === perk.id) {
      perkDiv.classList.add("selected");
      perkDetails({ perk: perk });
    }
    perkDiv.onmousedown = (e) => {
      clearTimeout(heldDownTimer);
      heldDownTimer = setTimeout(() => {
        startDrag(e);
      }, 100);
    };
    perkDiv.onmouseup = (e) => {
      if (e.shiftKey && dragData.selected?.id !== perk.id) {
        if (!dragData.selected.requires.includes(perk.id)) {
          dragData.selected.requires.push(perk.id);
        } else {
          dragData.selected.requires.splice(dragData.selected.requires.indexOf(perk.id), 1);
        }
        if (!dragData.selected.relative_to) {
          dragData.selected.relative_to = perk.id;
          dragData.selected.pos.x -= perk.pos.x;
          dragData.selected.pos.y -= perk.pos.y;
        }
        perks[perks.findIndex((p) => p.id === dragData.selected?.id)] = dragData.selected;
        renderPerks();
      } else if (e.ctrlKey && dragData.selected?.id !== perk.id) {
        if (!dragData.selected.requires.includes(perk.id)) {
          dragData.selected.requires.push(perk.id);
        }
        if (dragData.selected.relative_to) {
          dragData.selected.relative_to = perk.id;
          dragData.selected.pos.x -= perk.pos.x;
          dragData.selected.pos.y -= perk.pos.y;
        }
        perks[perks.findIndex((p) => p.id === dragData.selected?.id)] = dragData.selected;
        renderPerks();
      } else {
        dragData.selected = perk;
        perkDiv.classList.add("selected");
        perkDetails({ perk: perk });
      }
    };
    if (perk.relative_to) {
      const found = perkContainer.querySelector(`.perk[perk-id="${perk.relative_to}"]`);
      perkDiv.style.left = `${Math.round(perk.pos.x * baseSize + (found?.offsetLeft || 0))}px`;
      perkDiv.style.top = `${Math.round(perk.pos.y * baseSize + (found?.offsetTop || 0))}px`;
    } else {
      perkDiv.style.left = `${Math.round(perk.pos.x * baseSize)}px`;
      perkDiv.style.top = `${Math.round(perk.pos.y * baseSize)}px`;
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
  if (dragData.bgPosX === 0 && dragData.bgPosY === 0) {
    // Center the background on "foundations_of_power", the first perk
    const found = perkContainer.querySelector(`.perk[perk-id="0_foundation_of_power"]`);
    dragData.bgPosX = found.offsetLeft - window.innerWidth / 2 + found.offsetWidth / 2;
    dragData.bgPosY = found.offsetTop - window.innerHeight / 2 + found.offsetHeight / 2;
  }
  perkContainer.scrollTo(dragData?.bgPosX || 0, dragData?.bgPosY || 0);
}

const dragData = {
  scrolling: false,
  dragging: false,
  perk_element: null,
  selected: null,
  bgPosX: 0,
  bgPosY: 0,
};

function roundToTwoDecimals(num) {
  return +num.toFixed(2);
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
  const { bgPosX, bgPosY } = dragData;
  const clientX = e.clientX + bgPosX;
  const clientY = e.clientY + bgPosY;
  if (dragData.dragging) {
    dragData.perk_element.style.left = `${clientX - dragData.perk_element.offsetWidth / 2}px`;
    dragData.perk_element.style.top = `${clientY - dragData.perk_element.offsetHeight / 2}px`;

    // Update perk position
    if (dragData.perk.relative_to) {
      const found = perkContainer.querySelector(`.perk[perk-id="${dragData.perk.relative_to}"]`);
      dragData.perk.pos.x = roundToTwoDecimals((clientX - found.offsetLeft) / 64);
      dragData.perk.pos.y = roundToTwoDecimals((clientY - found.offsetTop) / 64);
    } else {
      dragData.perk.pos.x = roundToTwoDecimals((clientX - perkContainer.offsetLeft) / 64);
      dragData.perk.pos.y = roundToTwoDecimals((clientY - perkContainer.offsetTop) / 64);
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

/* Scroll by dragging */
function dragScroll(e) {
  const offsetX = e.clientX - dragData.lastX;
  const offsetY = e.clientY - dragData.lastY;
  if (dragData.scrolling) {
    perkContainer.scrollTo(dragData.bgPosX - offsetX, dragData.bgPosY - offsetY);
  }
}

perkContainer.onmousedown = (e) => {
  if (dragData.dragging || !e.target.classList.contains("perks")) return;
  dragData.scrolling = true;
  dragData.lastX = e.clientX;
  dragData.lastY = e.clientY;
  dragData.bgPosX = perkContainer.scrollLeft;
  dragData.bgPosY = perkContainer.scrollTop;
  perkContainer.onmouseup = () => {
    dragData.scrolling = false;
    perkContainer.onmouseup = null;
    perkContainer.onmousemove = null;
  };
  perkContainer.onmousemove = (e) => dragScroll(e);
};

function savePerks() {
  const __perks = perks.sort((a, b) => (a.id > b.id ? 1 : -1));
  __perks.map((p) => {
    if (!p.cost) p.cost = 1;
  });
  let text = "const perks: PerkObject[] =";
  text += JSON.stringify(__perks, null, 1);
  text += ";";
  const saveToFile = confirm("Save to file perks.ts?");
  if (saveToFile) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "perks.ts");
  } else {
    console.log(text);
    navigator.clipboard.writeText(text);
  }
}

function saveAs(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
}

renderPerks();
