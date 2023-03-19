"use strict";
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
        if (perkGroup.level > player.level && !DEVTOOLS.IGNORE_REQUIREMENTS) {
            perkGroupElem.classList.add("locked");
        }
        perkGroup.perks.forEach((perk) => {
            if (perk.exclusive) {
                const exclusiveElem = document.createElement("div");
                exclusiveElem.classList.add("exclusives");
                //exclusiveElem.innerText = game.getLocalizedString(perk.id);
                perkGroupPerks.append(exclusiveElem);
                perk.perks.forEach((perk, index) => {
                    if (index % 2) {
                        const exclusiveIcon = document.createElement("img");
                        exclusiveIcon.src = "gfx/icons/exclusive.png";
                        exclusiveElem.append(exclusiveIcon);
                    }
                    const perkElem = createPerkElement(perk);
                    exclusiveElem.append(perkElem);
                });
                perkGroupPerks.append(exclusiveElem);
            }
            else {
                const perkElem = createPerkElement(perk);
                perkGroupPerks.append(perkElem);
            }
        });
        ClassPerksElem.append(perkGroupElem);
    });
    lobbyContent.append(ClassPerksElem);
}
function createPerkElement(perk) {
    const perkElem = document.createElement("div");
    perkElem.classList.add("class-perk");
    perkElem.innerText = game.getLocalizedString(perk.id);
    tooltip(perkElem, perk.tooltip());
    if (player.hasClassPerk(perk.id)) {
        perkElem.classList.add("owned");
    }
    else if (!perk.available()) {
        perkElem.classList.add("locked");
    }
    perkElem.onclick = () => {
        perk.assign();
    };
    return perkElem;
}
//# sourceMappingURL=class_view.js.map