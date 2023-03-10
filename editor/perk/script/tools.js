let editing = {};

function perkDetails(options) {
  perkInfo.innerHTML = "";
  if (options.perk) {
    editing = { ...options.perk };
  } else {
    editing = {
      id: "",
      desc: "",
      pos: { x: 0, y: 0 },
      icon: "",
      relative_to: "",
      requires: [],
      class: "",
      modifiers: {},
      commands: {},
    };
  }

  const perk = options.perk || editing;

  if (options.new) {
    // id
    const idContent = document.createElement("div");
    const idLabel = document.createElement("label");
    const idInput = document.createElement("input");
    idContent.classList.add("content");
    idLabel.innerText = "ID:";
    idInput.type = "text";
    idInput.value = "";
    idInput.onchange = (e) => {
      editing.id = e.target.value;
    };
    idContent.append(idLabel, idInput);
    perkInfo.append(idContent);
    // desc
    const descContent = document.createElement("div");
    const descLabel = document.createElement("label");
    const descInput = document.createElement("input");
    descContent.classList.add("content");
    descLabel.innerText = "Desc_id:";
    descInput.type = "text";

    descInput.value = "";
    descInput.onchange = (e) => {
      editing.desc = e.target.value;
    };
    descContent.append(descLabel, descInput);
    perkInfo.append(descContent);
    // pos x
    const posX = document.createElement("div");
    const posXLabel = document.createElement("label");
    const posXInput = document.createElement("input");
    posX.classList.add("content");
    posXLabel.innerText = "X:";
    posXInput.type = "number";
    posXInput.value = 0;
    posXInput.onchange = (e) => {
      editing.pos.x = e.target.value;
    };
    posX.append(posXLabel, posXInput);
    perkInfo.append(posX);
    // pos y
    const posY = document.createElement("div");
    const posYLabel = document.createElement("label");
    const posYInput = document.createElement("input");
    posY.classList.add("content");
    posYLabel.innerText = "Y:";
    posYInput.type = "number";
    posYInput.value = 0;
    posYInput.onchange = (e) => {
      editing.pos.y = e.target.value;
    };
    posY.append(posYLabel, posYInput);
    perkInfo.append(posY);
  } else {
    perkInfo.innerHTML = `
    <div class="content">
      <p class="title">ID: <span>${perk.id}</span></p>
    </div>
    <div class="content">
      <p class="title">Description: <span>${perk.desc}</span></p>
    </div>
    <div class="content">
      <p class="title">Position: <span>x: ${perk.pos.x}, y: ${perk.pos.y}</span></p>
    </div>
    `;
  }

  const iconContainer = document.createElement("div");
  const iconLabel = document.createElement("p");
  iconContainer.classList = "content input";
  iconLabel.innerText = "Icon: " + perk.icon || "";
  iconLabel.onclick = () => {
    openIconSearch(iconLabel);
  };
  iconContainer.append(iconLabel);

  perkInfo.append(iconContainer);
  const relativeToContainer = document.createElement("div");
  const relativeToLabel = document.createElement("label");
  const relativeToInput = document.createElement("input");
  relativeToContainer.classList = "content input";
  relativeToLabel.innerText = "Relative_to: ";
  relativeToInput.type = "text";
  relativeToInput.value = perk.relative_to || "";
  relativeToInput.onchange = (e) => {
    editing.relative_to = e.target.value === "" ? undefined : e.target.value;
  };
  relativeToContainer.append(relativeToLabel, relativeToInput);
  perkInfo.append(relativeToContainer);

  perkInfo.append(iconContainer);
  const RequiresContainer = document.createElement("div");
  const RequiresLabel = document.createElement("label");
  const RequiresInput = document.createElement("input");
  RequiresContainer.classList = "content input";
  RequiresLabel.innerText = "Requires: ";
  RequiresInput.type = "text";
  RequiresInput.value = perk.requires?.join(",") || "";
  RequiresInput.onchange = (e) => {
    editing.requires = e.target.value === "" ? undefined : e.target.value.split(",");
  };
  RequiresContainer.append(RequiresLabel, RequiresInput);
  perkInfo.append(RequiresContainer);

  const modifiers = document.createElement("div");
  modifiers.classList = "content moldifiers";
  const modifiers_title = document.createElement("p");
  modifiers_title.classList = "title";
  modifiers_title.innerText = "Modifiers: ";
  modifiers.append(modifiers_title);
  if (perk.modifiers) {
    Object.entries(perk.modifiers).forEach(([key, value]) => {
      const mod = document.createElement("div");
      const Key = document.createElement("input");
      const Value = document.createElement("input");
      Key.value = key;
      Value.value = value;
      mod.append(Key, Value);
      modifiers.append(mod);
    });
  }
  perkInfo.append(modifiers);
}

function addPerk(perk) {
  perks.push(perk);
}

function editPerk(options) {
  console.log(options);
}

function savePerk() {
  if (!editing) return;
  const index = perks.findIndex((p) => p.id === editing.id);
  if (index === -1) {
    addPerk(editing);
  } else perks[index] = editing;
  renderPerks();
}

function romanNumeral(num) {
  const lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let roman = "";
  let i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

function idToName(id) {
  const string = id.split("_");
  string.forEach((s, i) => {
    if (!isNaN(parseInt(s))) {
      string[i] = romanNumeral(s);
    } else string[i] = s.charAt(0).toUpperCase() + s.slice(1);
  });
  return string.join(" ");
}

function generateEnglishLocalisation() {
  let localisation = ``;
  perks.forEach((perk) => {
    localisation += `${perk.id}: "${idToName(perk.id)}",\n`;
  });
  console.log(localisation);
}
