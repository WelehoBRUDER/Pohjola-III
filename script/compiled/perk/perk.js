"use strict";
class Perk {
    constructor(perk) {
        this.id = perk.id;
        this.desc = perk.desc;
        this.pos = perk.pos;
        this.icon = perk.icon;
        this.relative_to = perk.relative_to;
        this.requires = perk.requires;
        this.class = perk.class;
        this.modifiers = perk.modifiers;
        this.commands = perk.commands;
    }
}
function createPerks() {
    lobbyContent.innerHTML = "";
    // rem
    const baseSize = 4;
    const lineSize = 2;
    const lineWidth = 0.5;
    Object.values(perks).forEach((perk) => {
        const perkDiv = document.createElement("div");
        const img = document.createElement("img");
        img.src = perk.icon;
        perkDiv.style.width = `${baseSize}rem`;
        perkDiv.style.height = `${baseSize}rem`;
        perkDiv.classList.add("perk");
        perkDiv.classList.add(perk.class || "adventure");
        if (perk.relative_to) {
            const found = lobbyContent.querySelector(`.${perk.relative_to}`);
            perkDiv.style.left = `${perk.pos.x * baseSize + found.offsetLeft}rem`;
            perkDiv.style.top = `${perk.pos.y * baseSize + found.offsetTop}rem`;
        }
        else {
            perkDiv.style.left = `${perk.pos.x * baseSize}rem`;
            perkDiv.style.top = `${perk.pos.y * baseSize}rem`;
        }
        perkDiv.append(img);
        lobbyContent.append(perkDiv);
    });
}
//# sourceMappingURL=perk.js.map