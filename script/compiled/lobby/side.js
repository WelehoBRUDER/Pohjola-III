"use strict";
function sideBarDetails() {
    lobbySidebar.innerHTML = "";
    if (challenge("hardcore")) {
        saveController.saveOver(saveController.currentSave, { auto: true });
    }
    const misc = document.createElement("div");
    misc.classList.add("misc");
    const miscStats = ["gold", "perk_points", "skill_points", "level", "xp", "class", "power_level"];
    const miscStatCol = ["goldenrod", "silver", "silver", "silver", "lime", "silver", "silver"];
    miscStats.forEach((stat, index) => {
        // const statElement = document.createElement("div");
        // statElement.classList.add("stat");
        // statElement.innerText = game.getLocalizedString(stat) + ":";
        // const valueElement = document.createElement("div");
        // valueElement.classList.add("value");
        let text = ``;
        if (icons[stat]) {
            text += `<i>${icons[stat]}<i>`;
        }
        text += `<f>1.3rem<f><c>white<c>${game.getLocalizedString(stat)}:<c>${miscStatCol[index]}<c>`;
        text += typeof player[stat] === "number" ? ` ${player[stat]}` : "";
        if (stat === "level") {
            if (player.level >= 100) {
                text += " (MAX)";
            }
        }
        else if (stat === "xp") {
            if (player.level < 100) {
                text += " / " + player.xpForNextLevel();
            }
        }
        else if (stat === "power_level") {
            text += " " + player.calculateCombatPower();
        }
        else if (stat === "class") {
            text += " " + game.getLocalizedString(player.class.id);
        }
        const elem = textSyntax(text);
        if (stat !== "class") {
            tooltip(elem, game.getLocalizedString(stat + "_tt"));
        }
        else {
            tooltip(elem, player.class.tooltip());
        }
        misc.append(elem);
    });
    lobbySidebar.append(misc);
    const characterDetails = document.createElement("div");
    characterDetails.classList.add("character-details");
    const stats = player.getStats();
    const crit = player.getCrit();
    delete stats.ap;
    stats["mpRegen"] = player.getManaRegen();
    stats["speed"] = Math.round(player.getSpeed() * 100);
    stats["dodge"] = player.getDodge() + "%";
    stats["critRate"] = crit.critRate + "%";
    stats["critPower"] = crit.critPower + "%";
    const statsTitle = document.createElement("div");
    statsTitle.classList.add("title");
    statsTitle.innerText = game.getLocalizedString("stats");
    characterDetails.append(statsTitle);
    Object.entries(stats).forEach(([key, value]) => {
        if (key === "hp" || key === "mp")
            return;
        const statElement = document.createElement("div");
        const statText = document.createElement("span");
        const statIcon = document.createElement("img");
        statElement.classList.add("stat");
        if (key === "hpMax" || key === "mpMax") {
            statText.innerText = `${game.getLocalizedString(key.replace("Max", ""))}: ${stats[key.replace("Max", "")]}/${value}`;
        }
        else {
            statText.innerText = `${game.getLocalizedString(key)}: ${value}`;
        }
        statIcon.src = icons[key];
        tooltip(statElement, game.getLocalizedString(key + "_tt") + "\n" + game.getMiscEffects(key));
        statElement.append(statIcon, statText);
        characterDetails.append(statElement);
        if (key === "atk") {
            const scalingElement = document.createElement("div");
            const scalingText = document.createElement("span");
            const scalingIcon = document.createElement("img");
            scalingElement.classList.add("stat");
            scalingText.innerText = `${game.getLocalizedString("spell_scale")}: ${Math.floor(player.getSpellPower() * 100)}`;
            scalingIcon.src = icons["spell_scale"];
            tooltip(scalingElement, game.getLocalizedString("spell_scale_tt"));
            scalingElement.append(scalingIcon, scalingText);
            characterDetails.append(scalingElement);
        }
    });
    const defencesTitle = document.createElement("div");
    defencesTitle.classList.add("title");
    defencesTitle.innerText = game.getLocalizedString("defences");
    characterDetails.append(defencesTitle);
    const defences = player.getDefences();
    Object.entries(defences).forEach(([key, value]) => {
        const statElement = document.createElement("div");
        const statText = document.createElement("span");
        const statIcon = document.createElement("img");
        statElement.classList.add("stat");
        statText.innerText = `${game.getLocalizedString(key)}: ${value}%`;
        statIcon.src = icons[key];
        tooltip(statElement, game.getLocalizedString(key + "_tt"));
        statElement.append(statIcon, statText);
        characterDetails.append(statElement);
    });
    const resistsTitle = document.createElement("div");
    resistsTitle.classList.add("title");
    resistsTitle.innerText = game.getLocalizedString("resists");
    characterDetails.append(resistsTitle);
    const resists = player.getResistances();
    Object.entries(resists).forEach(([key, value]) => {
        const statElement = document.createElement("div");
        const statText = document.createElement("span");
        const statIcon = document.createElement("img");
        statElement.classList.add("stat");
        statText.innerText = `${game.getLocalizedString(key)}: ${value}%`;
        statIcon.src = icons[key] || icons.placeholder;
        tooltip(statElement, game.getLocalizedString(key + "_tt"));
        statElement.append(statIcon, statText);
        characterDetails.append(statElement);
    });
    lobbySidebar.append(characterDetails);
}
sideBarDetails();
//# sourceMappingURL=side.js.map