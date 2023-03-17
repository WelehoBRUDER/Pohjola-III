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
    __perks.forEach((perk, index) => {
        console.log(perk);
        const perkElem = document.createElement("div");
        perkElem.classList.add("class-perk");
        perkElem.innerText = game.getLocalizedString(perk.id);
        tooltip(perkElem, perk.tooltip());
        perkElem.onclick = () => {
            console.log("hello");
            perk.assign();
        };
        ClassPerksElem.append(perkElem);
    });
    lobbyContent.append(ClassPerksElem);
}
//# sourceMappingURL=class_view.js.map