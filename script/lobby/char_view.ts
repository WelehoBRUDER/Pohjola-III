function createCharView() {
  lobbyContent.innerHTML = "";
  hideHover();
  sideBarDetails();
  const charScreen = document.createElement("div");
  const abilityManagement = document.createElement("div");
  const abilityToolbar = document.createElement("div");
  const totalAbilities = document.createElement("div");
  charScreen.classList.add("char-view");
  abilityManagement.classList.add("ability-management");
  abilityToolbar.classList.add("ability-toolbar");
  totalAbilities.classList.add("total-abilities");

  const abilities = player.abilities;
  const abilities_total = player.abilities_total;

  abilities.forEach((ability, index) => {
    const slot = createAbilitySlot(ability, { manage: true }, index);
    abilityToolbar.append(slot);
  });

  abilities_total.forEach((ability, index) => {
    const slot = createAbilitySlot(ability, { manage: true }, index);
    totalAbilities.append(slot);
  });

  abilityManagement.append(abilityToolbar, totalAbilities);
  charScreen.append(abilityManagement);
  lobbyContent.append(charScreen);

  window.onresize = () => {
    resizeAbilities();
  };

  function resizeAbilities() {
    let width = charScreen.offsetWidth;
    const slotSize = 106;
    const slotsPerRow =
      Math.floor(width / slotSize) > 2 ? Math.floor(width / slotSize) : 2;
    width = slotsPerRow * slotSize;
    totalAbilities.style.width = width + "px";
  }
  resizeAbilities();
}
