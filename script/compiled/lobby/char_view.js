"use strict";
function createCharView() {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    const charScreen = document.createElement("div");
    const abilityManagement = document.createElement("div");
    const abilityToolbar = document.createElement("div");
    const totalAbilities = document.createElement("div");
    const modifiersScreen = document.createElement("div");
    charScreen.classList.add("char-view");
    abilityManagement.classList.add("ability-management");
    abilityToolbar.classList.add("ability-toolbar");
    totalAbilities.classList.add("total-abilities");
    modifiersScreen.classList.add("modifiers-screen");
    const abilities = player.abilities;
    const abilities_total = player.abilities_total;
    abilityManagement.append(abilityToolbar, totalAbilities);
    charScreen.append(abilityManagement, modifiersScreen);
    lobbyContent.append(charScreen);
    for (let i = 0; i < 6; i++) {
        let slot;
        if (player.abilities[i]) {
            const ability = player.abilities[i];
            slot = createAbilitySlot(ability, { manage: true }, i);
            slot.onclick = (e) => {
                const options = [
                    {
                        text: "unassign_ability",
                        action: () => {
                            player.unassignAbility(i);
                        },
                    },
                ];
                createContextMenu(options, { x: e.clientX, y: e.clientY });
            };
        }
        else {
            slot = createAbilitySlot(undefined, { manage: true }, i);
        }
        abilityToolbar.append(slot);
    }
    abilities_total.forEach((ability, index) => {
        const slot = createAbilitySlot(ability, { manage: true }, index);
        const options = [0, 0, 0, 0, 0, 0].map((_, i) => {
            // @ts-ignore
            return (_ = {
                text: "assign_to_slot_" + (i + 1) + isSlotEmpty(i),
                action: () => {
                    player.assignAbility(ability, i);
                },
            });
        });
        dragElem(slot, [abilityToolbar], createContextMenu, assignToDraggedSlot, options, true, ability, true);
        totalAbilities.append(slot);
    });
    const displayableValues = ["mpRegenFromIntV", "mpRegenFromSpiV"];
    const modifiers = sortObject(player.allModifiers);
    Object.entries(modifiers).forEach(([key, value]) => {
        if ((key.endsWith("V") && !displayableValues.includes(key)) || key.includes("ability"))
            return;
        if (!key.endsWith("V")) {
            value = (value - 1) * 100;
        }
        if (value === 0)
            return;
        const modifier = document.createElement("div");
        modifier.classList.add("modifier");
        const valueElement = document.createElement("div");
        valueElement.classList.add("value");
        valueElement.append(textSyntax(effectSyntax(key, value)));
        modifier.append(valueElement);
        modifiersScreen.append(modifier);
        const breakdown = getModifierBreakdown(key, player);
        if (breakdown) {
            let breakdownText = `${game.getLocalizedString("breakdown")}:\n`;
            Object.entries(breakdown).forEach(([key, value]) => {
                if (value === 1)
                    return;
                breakdownText += effectSyntax(key, (value - 1) * 100);
            });
            tooltip(modifier, breakdownText);
        }
        const valueWidth = valueElement.getBoundingClientRect().width;
        if (valueWidth > 250) {
            valueElement.style.transform = `scale(${(250 / valueWidth).toFixed(2)})`;
        }
    });
    window.onresize = () => {
        resizeAbilities();
    };
    function resizeAbilities() {
        let width = charScreen.offsetWidth;
        const slotSize = 106;
        const slotsPerRow = Math.floor(width / slotSize) > 2 ? Math.floor(width / slotSize) : 2;
        width = slotsPerRow * slotSize;
        totalAbilities.style.width = width + "px";
    }
    resizeAbilities();
}
function isSlotEmpty(slot) {
    return player.abilities[slot] ? "" : " (empty)";
}
function assignToDraggedSlot(ability, slot) {
    const index = parseInt(slot.getAttribute("data-index"));
    player.assignAbility(ability, index);
}
function sortObject(obj) {
    return (Object.keys(obj)
        .sort((a, b) => obj[b] - obj[a])
        // @ts-ignore
        .reduce((result, key) => ((result[key] = obj[key]), result), {}));
}
//# sourceMappingURL=char_view.js.map