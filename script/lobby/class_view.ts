function createClassView() {
  lobbyContent.innerHTML = "";
  hideHover();
  sideBarDetails();
  const ClassPerksElem = document.createElement("div");
  ClassPerksElem.classList.add("class-perks");
  ClassPerksElem.onscroll = () => {
    screens.class.scroll = ClassPerksElem.scrollTop;
  };
  const __perks = classPerks[player.class.id];
  __perks.forEach((perkGroup, index) => {
    const perkGroupElem = document.createElement("div");
    const perkGroupTitle = document.createElement("div");
    const perkGroupPerks = document.createElement("div");
    perkGroupTitle.classList.add("class-perk-group-title");
    perkGroupPerks.classList.add("class-perk-group-perks");
    perkGroupElem.classList.add("class-perk-group");
    perkGroupTitle.innerText = `${game.getLocalizedString(player.class.id)} ${game.getLocalizedString("level")} ${perkGroup.level}`;
    perkGroupElem.append(perkGroupTitle, perkGroupPerks);
    if (perkGroup.level > player.level) {
      perkGroupElem.classList.add("locked");
    }
    perkGroup.perks.forEach((perk) => {
      const perkElem = document.createElement("div");
      perkElem.classList.add("class-perk");
      perkElem.innerText = game.getLocalizedString(perk.id);
      tooltip(perkElem, perk.tooltip());
      if (!perk.available()) {
        perkElem.classList.add("locked");
      }
      perkElem.onclick = () => {
        perk.assign();
      };
      perkGroupPerks.append(perkElem);
    });
    ClassPerksElem.append(perkGroupElem);
  });
  lobbyContent.append(ClassPerksElem);
}
