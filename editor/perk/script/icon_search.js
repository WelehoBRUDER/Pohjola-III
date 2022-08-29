const iconsSearch = document.querySelector(".icons-search");
const iconsInput = iconsSearch.querySelector(".header input");
const iconsContainer = iconsSearch.querySelector(".icons");
iconsInput.onkeyup = (e) => {
  const search = e.target.value.toLowerCase();
  const icons = Array.from(iconsContainer.children);
  icons.forEach((icon) => {
    const name = icon.title;
    if (name.includes(search)) {
      icon.style.display = "flex";
    } else {
      icon.style.display = "none";
    }
  });
};

const all_icons = [
  "gfx/abilities/battle-gear.png",
  "gfx/abilities/fire-spell-cast.png",
  "gfx/abilities/magic-shield.png",
  "gfx/abilities/pointy-sword.png",
  "gfx/abilities/shield-bash.png",
  "gfx/abilities/strong.png",
  "gfx/abilities/sword-wound.png",
  "gfx/icons/barbarian.png",
  "gfx/icons/book-aura.png",
  "gfx/icons/bookmarklet.png",
  "gfx/icons/brutal-helm.png",
  "gfx/icons/chest.png",
  "gfx/icons/closed-doors.png",
  "gfx/icons/crossed-swords.png",
  "gfx/icons/hand-bag.png",
  "gfx/icons/key.png",
  "gfx/icons/magic-swirl.png",
  "gfx/icons/open-gate.png",
  "gfx/icons/run-down.png",
  "gfx/icons/run.png",
  "gfx/icons/running-ninja-down.png",
  "gfx/icons/running-ninja.png",
  "gfx/icons/shield-reflect.png",
  "gfx/icons/skills.png",
  "gfx/icons/swords-power.png",
  "gfx/icons/totem-head.png",
  "gfx/icons/triple-yin.png",
  "gfx/icons/wizard-face.png",
  "gfx/status/battle-gear.png",
  "gfx/status/acrobatic.png",
  "gfx/status/biceps.png",
  "gfx/status/weight-lifting-up.png",
  "gfx/status/brain.png",
  "gfx/status/wisdom.png",
  "gfx/status/blood.png",
  "gfx/status/cooldown.png",
  "gfx/status/elemental.png",
  "gfx/status/flamer.png",
  "gfx/status/healing.png",
  "gfx/status/heart-plus.png",
  "gfx/status/magical.png",
  "gfx/status/physical.png",
  "gfx/status/power.png",
  "gfx/status/speedometer.png",
  "gfx/status/stoned-skull.png",
  "gfx/status/ward.png",
];

function renderIcons(icons, elem) {
  iconsContainer.innerHTML = "";
  icons.forEach((icon) => {
    const img = document.createElement("img");
    img.title = icon;
    img.src = "../../" + icon;
    img.className = "icon";
    img.setAttribute("draggable", true);
    img.onclick = () => {
      editing.icon = icon;
      elem.innerText = "Icon: " + icon;
      closeIconSearch();
    };
    img.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", icon);
    });
    iconsContainer.append(img);
  });
}

function openIconSearch(elem) {
  iconsSearch.style.display = "block";
  renderIcons(all_icons, elem);
}

function closeIconSearch() {
  iconsSearch.style.display = "none";
}

renderIcons(all_icons);
