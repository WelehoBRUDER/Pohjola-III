let editing = {};

function perkDetails(perk) {
  perkInfo.innerHTML = "";
  editing = { ...perk };
  Object.entries(perk).forEach(([key, value]) => {
    const content = document.createElement("div");
    let keyElem = document.createElement("p");
    let valueElem = document.createElement("p");
    content.classList = "content";
    keyElem.innerText = key + ": ";
    keyElem.style.color = "gold";
    if (Array.isArray(value)) {
      valueElem.innerText = value.join(", ");
    } else if (typeof value === "object") {
      valueElem.innerText = JSON.stringify(value);
    } else {
      valueElem.innerText = value || "none";
    }
    if (typeof value === "string") {
      valueElem = document.createElement("input");
      valueElem.value = value;
      valueElem.onchange = (e) => {
        editing[key] = e.target.value;
      };
    } else if (key === "commands" && value) {
      valueElem = document.createElement("div");
      Object.entries(value).forEach(([_key, _value]) => {
        const mod = document.createElement("div");
        const Key = document.createElement("input");
        const Value = document.createElement("textarea");
        Key.value = _key;
        Value.value = JSON.stringify(_value);
        Key.onchange = (e) => {
          editing.commands[e.target.value] = editing.commands[_key];
          delete editing.commands[_key];
        };
        Value.onchange = (e) => {
          editing.commands[_key] = JSON.parse(e.target.value);
        };
        mod.append(Key, Value);
        valueElem.append(mod);
      });
    } else if (key === "modifiers" && value) {
      valueElem = document.createElement("div");
      Object.entries(value).forEach(([_key, _value]) => {
        const cmd = document.createElement("div");
        const Key = document.createElement("input");
        let Value = document.createElement("input");
        Key.value = _key;
        console.log(typeof _value);
        if (typeof _value === "number") {
          Value.value = _value;
          Value.inputMode = "numeric";
          Value.type = "number";
        } else {
          Value = document.createElement("textarea");
          Value.value = JSON.stringify(_value);
        }
        Value.value = JSON.stringify(_value);
        Key.onchange = (e) => {
          editing.modifiers[e.target.value] = editing.modifiers[_key];
          delete editing.modifiers[_key];
        };
        Value.onchange = (e) => {
          editing.modifiers[_key] = JSON.parse(e.target.value);
        };
        cmd.append(Key, Value);
        valueElem.append(cmd);
      });
    }
    content.append(keyElem, valueElem);
    perkInfo.append(content);
  });

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

  const iconContainer = document.createElement("div");
  const iconLabel = document.createElement("label");
  const iconInput = document.createElement("input");
  iconContainer.classList = "content input";
  iconLabel.innerText = "Icon: ";
  iconInput.type = "text";
  iconInput.value = perk.icon;
  iconInput.onchange = (e) => {
    editing.icon = e.target.value;
  };
  iconContainer.append(iconLabel, iconInput);

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

function editPerk(options) {
  console.log(options);
}

function savePerk() {
  if (!editing) return;
  const index = perks.findIndex((p) => p.id === editing.id);
  perks[index] = editing;
  renderPerks();
}
