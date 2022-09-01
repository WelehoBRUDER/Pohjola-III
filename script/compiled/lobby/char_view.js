"use strict";
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
        const options = [
            {
                text: "assign_to_slot_1" + isSlotEmpty(0),
                action: () => {
                    player.assignAbility(ability, 0);
                },
            },
            {
                text: "assign_to_slot_2" + isSlotEmpty(1),
                action: () => {
                    player.assignAbility(ability, 1);
                },
            },
            {
                text: "assign_to_slot_3" + isSlotEmpty(2),
                action: () => {
                    player.assignAbility(ability, 2);
                },
            },
            {
                text: "assign_to_slot_4" + isSlotEmpty(3),
                action: () => {
                    player.assignAbility(ability, 3);
                },
            },
            {
                text: "assign_to_slot_5" + isSlotEmpty(4),
                action: () => {
                    player.assignAbility(ability, 4);
                },
            },
            {
                text: "assign_to_slot_6" + isSlotEmpty(5),
                action: () => {
                    player.assignAbility(ability, 5);
                },
            },
        ];
        dragElem(slot, [abilityToolbar], createContextMenu, assignToDraggedSlot, options, true, ability, true);
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
//# sourceMappingURL=char_view.js.map