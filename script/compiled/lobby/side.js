"use strict";
function sideBarDetails() {
    lobbySidebar.innerHTML = "";
    var misc = document.createElement("div");
    misc.classList.add("misc");
    var miscStats = ["gold", "perk_points", "skill_points", "level", "xp", "power_level"];
    miscStats.forEach(function (stat) {
        var statElement = document.createElement("div");
        statElement.classList.add("stat");
        statElement.innerText = game.getLocalizedString(stat) + ":";
        var valueElement = document.createElement("div");
        valueElement.classList.add("value");
        valueElement.innerText = player[stat];
        if (stat === "xp") {
            valueElement.innerText += " / " + player.xpForNextLevel();
        }
        else if (stat === "power_level") {
            valueElement.innerText = player.calculateCombatPower();
        }
        tooltip(statElement, game.getLocalizedString(stat + "_tt"));
        statElement.append(valueElement);
        misc.append(statElement);
    });
    lobbySidebar.append(misc);
    var characterDetails = document.createElement("div");
    characterDetails.classList.add("character-details");
    var stats = player.getStats();
    var crit = player.getCrit();
    delete stats.ap;
    stats["speed"] = Math.round(player.getSpeed() * 100);
    stats["critRate"] = crit.critRate + "%";
    stats["critPower"] = crit.critPower + "%";
    var statsTitle = document.createElement("div");
    statsTitle.classList.add("title");
    statsTitle.innerText = game.getLocalizedString("stats");
    characterDetails.append(statsTitle);
    Object.entries(stats).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (key === "hp" || key === "mp")
            return;
        var statElement = document.createElement("div");
        var statText = document.createElement("span");
        var statIcon = document.createElement("img");
        statElement.classList.add("stat");
        if (key === "hpMax" || key === "mpMax") {
            statText.innerText = game.getLocalizedString(key.replace("Max", "")) + ": " + stats[key.replace("Max", "")] + "/" + value;
        }
        else {
            statText.innerText = game.getLocalizedString(key) + ": " + value;
        }
        statIcon.src = icons[key];
        tooltip(statElement, game.getLocalizedString(key + "_tt"));
        statElement.append(statIcon, statText);
        characterDetails.append(statElement);
    });
    var defencesTitle = document.createElement("div");
    defencesTitle.classList.add("title");
    defencesTitle.innerText = game.getLocalizedString("defences");
    characterDetails.append(defencesTitle);
    var defences = player.getDefences();
    Object.entries(defences).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var statElement = document.createElement("div");
        var statText = document.createElement("span");
        var statIcon = document.createElement("img");
        statElement.classList.add("stat");
        statText.innerText = game.getLocalizedString(key) + ": " + value + "%";
        statIcon.src = icons[key];
        tooltip(statElement, game.getLocalizedString(key + "_tt"));
        statElement.append(statIcon, statText);
        characterDetails.append(statElement);
    });
    var resistsTitle = document.createElement("div");
    resistsTitle.classList.add("title");
    resistsTitle.innerText = game.getLocalizedString("resists");
    characterDetails.append(resistsTitle);
    var resists = player.getResistances();
    Object.entries(resists).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var statElement = document.createElement("div");
        var statText = document.createElement("span");
        var statIcon = document.createElement("img");
        statElement.classList.add("stat");
        statText.innerText = game.getLocalizedString(key) + ": " + value + "%";
        statIcon.src = icons[key] || icons.placeholder;
        tooltip(statElement, game.getLocalizedString(key + "_tt"));
        statElement.append(statIcon, statText);
        characterDetails.append(statElement);
    });
    lobbySidebar.append(characterDetails);
}
sideBarDetails();
//# sourceMappingURL=side.js.map