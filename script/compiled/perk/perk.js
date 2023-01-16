"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Perk = /** @class */ (function () {
    function Perk(perk) {
        this.id = perk.id;
        this.desc = perk.desc;
        this.pos = perk.pos;
        this.icon = perk.icon;
        this.cost = perk.cost;
        this.relative_to = perk.relative_to;
        this.requires = perk.requires;
        this["class"] = perk["class"];
        this.modifiers = perk.modifiers;
        this.commands = perk.commands;
    }
    Perk.prototype.available = function () {
        if (player.perk_points < this.cost)
            return false;
        if (!this.requires)
            return true;
        var required = this.requires.length;
        this.requires.forEach(function (perk) {
            // @ts-ignore
            if (player.perks.findIndex(function (p) { return p.id === perk; }) > -1) {
                required--;
            }
        });
        return required === 0;
    };
    Perk.prototype.owned = function () {
        var _this = this;
        // @ts-ignore
        return player.perks.findIndex(function (p) { return p.id === _this.id; }) > -1;
    };
    Perk.prototype.assign = function () {
        var _a;
        if (this.owned())
            return;
        hideHover();
        if (player.perk_points >= this.cost) {
            player.perk_points -= this.cost;
            (_a = player.perks) === null || _a === void 0 ? void 0 : _a.push(__assign({}, this));
            if (this.commands) {
                Object.entries(this.commands).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    game.executeCommand(key, value);
                });
            }
            player.restore();
            createPerks();
        }
    };
    Perk.prototype.tooltip = function () {
        var tooltip = "<f>1.5rem<f><c>gold<c>" + game.getLocalizedString(this.id) + "\n";
        tooltip += "<f>1.2rem<f>";
        // Perk description
        tooltip += "<c>silver<c>" + game.getLocalizedString(this.desc) + "<c>white<c>\n";
        if (this.requires) {
            var length_1 = this.requires.length;
            tooltip += "<f>1.2rem<f>" + game.getLocalizedString("requires") + ": ";
            this.requires.forEach(function (perk_id, index) {
                var perk = new Perk(perks.find(function (p) { return p.id === perk_id; }));
                tooltip += "<c>" + (perk.owned() ? "lime" : "red") + "<c>" + game.getLocalizedString(perk_id);
                if (index < length_1 - 1) {
                    tooltip += ", ";
                }
            });
            tooltip += "<c>white<c>\n";
        }
        if (this.commands) {
            Object.entries(this.commands).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (key === "add_ability") {
                    var ability = new Ability(__assign({}, value));
                    tooltip += "<f>1.3rem<f>" + game.getLocalizedString(key) + ":\n";
                    tooltip += ability.tooltip({ container: true, owner: player });
                    tooltip += "§<nct>-<nct><f>1.2rem<f><c>white<c>\n";
                }
            });
        }
        if (this.modifiers && Object.keys(this.modifiers).length > 0) {
            tooltip += "\n<f>1.2rem<f><c>silver<c>Effects:\n";
            Object.entries(this.modifiers).map(function (_a) {
                var key = _a[0], value = _a[1];
                tooltip += " " + effectSyntax(key, value);
            });
        }
        if (this.cost > 0) {
            var col = player.perk_points >= this.cost ? "lime" : "red";
            tooltip += "\n<f>1.2rem<f><c>silver<c>" + game.getLocalizedString("cost") + ": <c>" + col + "<c>" + this.cost + " <c>silver<c>" + game.getLocalizedString("perk_points");
        }
        return tooltip;
    };
    return Perk;
}());
function createPerks() {
    lobbyContent.innerHTML = "";
    var baseSize = 64;
    var lineSize = 32;
    var lineWidth = 6;
    lobbyContent.onwheel = function (e) {
        e.preventDefault();
    };
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    sideBarDetails();
    var FullPerks = perks.map(function (p) { return new Perk(p); });
    // Create perk elements and place them on the screen
    FullPerks.forEach(function (perk) {
        var perkDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = perk.icon;
        perkDiv.setAttribute("perk-id", perk.id);
        perkDiv.style.width = baseSize + "px";
        perkDiv.style.height = baseSize + "px";
        perkDiv.classList.add("perk");
        perkDiv.classList.add(perk["class"] || "adventure");
        if (perk.owned())
            perkDiv.classList.add("owned");
        else if (!perk.available())
            perkDiv.classList.add("unavailable");
        perkDiv.onclick = function () { return perk.assign(); };
        tooltip(perkDiv, perk.tooltip());
        if (perk.relative_to) {
            var found = lobbyContent.querySelector(".perk[perk-id=\"" + perk.relative_to + "\"]");
            console.log(perk.relative_to);
            perkDiv.style.left = Math.round(perk.pos.x * baseSize + found.offsetLeft) + "px";
            perkDiv.style.top = Math.round(perk.pos.y * baseSize + found.offsetTop) + "px";
        }
        else {
            perkDiv.style.left = Math.round(perk.pos.x * baseSize) + "px";
            perkDiv.style.top = Math.round(perk.pos.y * baseSize) + "px";
        }
        perkDiv.append(img);
        lobbyContent.append(perkDiv);
    });
    // Draw lines between perks
    FullPerks.forEach(function (_perk) {
        var perk = lobbyContent.querySelector(".perk[perk-id=\"" + _perk.id + "\"]");
        if (_perk.requires) {
            _perk.requires.forEach(function (req) {
                var found = lobbyContent.querySelector(".perk[perk-id=\"" + req + "\"]");
                var color = "rgb(65, 65, 65)";
                var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                if (_perk.owned())
                    color = "gold";
                else if (!_perk.available())
                    color = "rgb(40, 40, 40)";
                line.setAttribute("x1", +perk.style.left.replace(/\D/g, "") + lineSize + "px");
                line.setAttribute("y1", +perk.style.top.replace(/\D/g, "") + lineSize + "px");
                line.setAttribute("x2", +found.style.left.replace(/\D/g, "") + lineSize + "px");
                line.setAttribute("y2", +found.style.top.replace(/\D/g, "") + lineSize + "px");
                line.setAttribute("stroke", color);
                line.setAttribute("stroke-width", lineWidth + "px");
                svg.appendChild(line);
            });
        }
    });
    svg.setAttribute("width", "4000");
    svg.setAttribute("height", "4000");
    lobbyContent.append(svg);
    if (drag_details.bgPosX === 0 && drag_details.bgPosY === 0) {
        // Center the background on "foundations_of_power", the first perk
        var found = lobbyContent.querySelector(".perk[perk-id=\"0_foundation_of_power\"]");
        drag_details.bgPosX = found.offsetLeft - window.innerWidth / 2 + found.offsetWidth * 3;
        drag_details.bgPosY = found.offsetTop - window.innerHeight / 2 + found.offsetHeight;
    }
    lobbyContent.scrollTo(drag_details.bgPosX, drag_details.bgPosY);
}
var drag_details = {
    lastX: 0,
    lastY: 0,
    dragging: false,
    bgPosX: 0,
    bgPosY: 0
};
/* Scroll by dragging */
function dragPerks(e) {
    var offsetX = e.clientX - drag_details.lastX;
    var offsetY = e.clientY - drag_details.lastY;
    if (drag_details.dragging) {
        lobbyContent.scrollTo(drag_details.bgPosX - offsetX, drag_details.bgPosY - offsetY);
    }
}
try {
    if (lobbyContent) {
        lobbyContent.onmousedown = function (e) {
            drag_details.dragging = true;
            drag_details.lastX = e.clientX;
            drag_details.lastY = e.clientY;
            drag_details.bgPosX = lobbyContent.scrollLeft;
            drag_details.bgPosY = lobbyContent.scrollTop;
            lobbyContent.onmouseup = function () {
                drag_details.dragging = false;
                lobbyContent.onmouseup = null;
                lobbyContent.onmousemove = null;
            };
            lobbyContent.onmousemove = function (e) { return dragPerks(e); };
        };
    }
}
catch (_a) {
    console.log("Could not find lobbyContent, this must be the editor.");
}
//# sourceMappingURL=perk.js.map