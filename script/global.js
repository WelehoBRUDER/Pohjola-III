var global = {
  "settings": {
    turn_based_combat: true
  },
  isCombatPaused: false,
  targeting: false,
  ability: "",
  invOpen: false,
  inCombat: false,
  targetingSelf: false,
  charOpen: false,
  inStore: true,
  perkOpen: false
}

function hotkey(e) {
  if (e.key == "Escape") {
    textBoxRemove();
    if (global.invOpen && global.inCombat) openInventory("combat");
    else if(global.invOpen && global.inStore) openInventory("store");
    else if(global.invOpen) openInventory();
    if(global.charOpen) openChar();
    if(global.perkOpen) openPerk();
    if (global.targeting && global.inCombat) {
      global.targeting = false;
      global.targetingSelf = false;
      removeSelection();
      enemiesCombat.forEach(e => {
        if (!e.dead) {
          let bg = $("#" + e.id + "§" + e.index);
          global.ability = "";
          bg.classList.remove("canBeTargeted");
        }
      });
    }
  }
  else if (e.key == "1") {
    playerUseAbility(1)
  }
  else if (e.key == "2") {
    playerUseAbility(2)
  }
  else if (e.key == "3") {
    playerUseAbility(3)
  }
  else if (e.key == "4") {
    playerUseAbility(4)
  }
  else if (e.key == "5") {
    playerUseAbility(5)
  }
  else if (e.key == "a") {
    regularAttack();
  }
  else if (e.key == "i") {
    if (global.inCombat) openInventory("combat");
    else if(global.inStore) openInventory("store");
    else openInventory();
  }
  else if (e.key == " ") {
    useBuff();
  }
  else if (e.key == "c") {
    openChar();
  }
  else if (e.key == "p") {
    openPerk();
  }
}