"use strict";
function createCharView() {
    lobbyContent.innerHTML = "";
    hideHover();
    sideBarDetails();
    var charScreen = document.createElement("div");
    var abilityManagement = document.createElement("div");
    var abilityToolbar = document.createElement("div");
    var totalAbilities = document.createElement("div");
    charScreen.classList.add("char-view");
    abilityManagement.classList.add("ability-management");
    abilityToolbar.classList.add("ability-toolbar");
    totalAbilities.classList.add("total-abilities");
    var abilities = player.abilities;
    var abilities_total = player.abilities_total;
    var _loop_1 = function (i) {
        var slot = void 0;
        if (player.abilities[i]) {
            var ability = player.abilities[i];
            slot = createAbilitySlot(ability, { manage: true }, i);
            slot.onclick = function (e) {
                var options = [
                    {
                        text: "unassign_ability",
                        action: function () {
                            player.unassignAbility(i);
                        }
                    },
                ];
                createContextMenu(options, { x: e.clientX, y: e.clientY });
            };
        }
        else {
            slot = createAbilitySlot(undefined, { manage: true }, i);
        }
        abilityToolbar.append(slot);
    };
    for (var i = 0; i < 6; i++) {
        _loop_1(i);
    }
    abilities_total.forEach(function (ability, index) {
        var slot = createAbilitySlot(ability, { manage: true }, index);
        var options = [0, 0, 0, 0, 0, 0].map(function (_, i) {
            // @ts-ignore
            return (_ = {
                text: "assign_to_slot_" + (i + 1) + isSlotEmpty(i),
                action: function () {
                    player.assignAbility(ability, i);
                }
            });
        });
        dragElem(slot, [abilityToolbar], createContextMenu, assignToDraggedSlot, options, true, ability, true);
        totalAbilities.append(slot);
    });
    abilityManagement.append(abilityToolbar, totalAbilities);
    charScreen.append(abilityManagement);
    lobbyContent.append(charScreen);
    window.onresize = function () {
        resizeAbilities();
    };
    function resizeAbilities() {
        var width = charScreen.offsetWidth;
        var slotSize = 106;
        var slotsPerRow = Math.floor(width / slotSize) > 2 ? Math.floor(width / slotSize) : 2;
        width = slotsPerRow * slotSize;
        totalAbilities.style.width = width + "px";
    }
    resizeAbilities();
}
function isSlotEmpty(slot) {
    return player.abilities[slot] ? "" : " (empty)";
}
function assignToDraggedSlot(ability, slot) {
    var index = parseInt(slot.getAttribute("data-index"));
    player.assignAbility(ability, index);
}
//# sourceMappingURL=char_view.js.map