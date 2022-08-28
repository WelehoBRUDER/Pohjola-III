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
    available() {
        if (player.perk_points < 1)
            return false;
        if (!this.requires)
            return true;
        let required = this.requires.length;
        this.requires.forEach((perk) => {
            if (player.perks.findIndex((p) => p.id === perk) > -1) {
                required--;
            }
        });
        return required === 0;
    }
    owned() {
        return player.perks.findIndex((p) => p.id === this.id) > -1;
    }
    assign() {
        if (this.owned())
            return;
        if (player.perk_points >= 1) {
            player.perk_points--;
            player.perks.push({ ...this });
            if (this.commands) {
                Object.entries(this.commands).forEach(([key, value]) => {
                    game.executeCommand(key, value);
                });
            }
            createPerks();
        }
    }
    tooltip() {
        let tooltip = `<f>1.5rem<f><c>gold<c>${game.getLocalizedString(this.id)}\n`;
        tooltip += "<f>1.2rem<f>";
        // Perk description
        tooltip += `<c>silver<c>${game.getLocalizedString(this.desc)}<c>white<c>\n`;
        if (this.requires) {
            const length = this.requires.length;
            tooltip += `<f>1rem<f>${game.getLocalizedString("requires")}: `;
            this.requires.forEach((perk_id, index) => {
                const perk = new Perk(perks.find((p) => p.id === perk_id));
                tooltip += `<c>${perk.owned() ? "lime" : "red"}<c>${game.getLocalizedString(perk_id)}`;
                if (index < length - 1) {
                    tooltip += ", ";
                }
            });
            tooltip += "<c>white<c>\n";
        }
        if (this.commands) {
            Object.entries(this.commands).forEach(([key, value]) => {
                if (key === "add_ability") {
                    const ability = new Ability({ ...value });
                    tooltip += `<f>1rem<f>${game.getLocalizedString(key)}:\n`;
                    tooltip += ability.tooltip({ container: true, owner: player });
                    tooltip += "§<nct>-<nct><f>1rem<f><c>white<c>\n";
                }
            });
        }
        if (this.modifiers && Object.keys(this.modifiers).length > 0) {
            tooltip += "\n<f>0.9rem<f><c>silver<c>Effects:\n";
            Object.entries(this.modifiers).map(([key, value]) => {
                tooltip += " " + effectSyntax(key, value);
            });
        }
        return tooltip;
    }
}
function createPerks() {
    lobbyContent.innerHTML = "";
    const baseSize = 64;
    const lineSize = 32;
    const lineWidth = 6;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const FullPerks = perks.map((p) => new Perk(p));
    // Create perk elements and place them on the screen
    FullPerks.forEach((perk) => {
        const perkDiv = document.createElement("div");
        const img = document.createElement("img");
        img.src = perk.icon;
        perkDiv.setAttribute("perk-id", perk.id);
        perkDiv.style.width = `${baseSize}px`;
        perkDiv.style.height = `${baseSize}px`;
        perkDiv.classList.add("perk");
        perkDiv.classList.add(perk.class || "adventure");
        if (perk.owned())
            perkDiv.classList.add("owned");
        else if (!perk.available())
            perkDiv.classList.add("unavailable");
        perkDiv.onclick = () => perk.assign();
        tooltip(perkDiv, perk.tooltip());
        if (perk.relative_to) {
            const found = lobbyContent.querySelector(`.perk[perk-id="${perk.relative_to}"]`);
            perkDiv.style.left = `${perk.pos.x * baseSize + found.offsetLeft}px`;
            perkDiv.style.top = `${perk.pos.y * baseSize + found.offsetTop}px`;
        }
        else {
            perkDiv.style.left = `${perk.pos.x * baseSize}px`;
            perkDiv.style.top = `${perk.pos.y * baseSize}px`;
        }
        perkDiv.append(img);
        lobbyContent.append(perkDiv);
    });
    // Draw lines between perks
    FullPerks.forEach((_perk) => {
        let perk = lobbyContent.querySelector(`.perk[perk-id="${_perk.id}"]`);
        if (_perk.requires) {
            _perk.requires.forEach((req) => {
                let found = lobbyContent.querySelector(`.perk[perk-id="${req}"]`);
                let color = "rgb(65, 65, 65)";
                let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                if (_perk.owned())
                    color = "gold";
                else if (!_perk.available())
                    color = "rgb(40, 40, 40)";
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
    lobbyContent.append(svg);
}
//# sourceMappingURL=perk.js.map