"use strict";
let tick = setInterval(update, 1000 / 30);
function update() {
    if (game.state.paused)
        return;
    const speed = player.getSpeed();
    player.stats.ap += speed;
    if (player.stats.ap > 100) {
        player.stats.ap = 100;
        game.pause();
    }
    const stats = player.getStats();
    const PlayerHealthRemaining = (player.stats.hp / stats.hpMax) * 100;
    const PlayerManaRemaining = (player.stats.mp / stats.mpMax) * 100;
    playerActionFill.style.width = `${player.stats.ap}%`;
    playerHPFill.style.width = `${PlayerHealthRemaining}%`;
    playerMPFill.style.width = `${PlayerManaRemaining}%`;
    playerHPLate.style.width = `${PlayerHealthRemaining}%`;
    playerMPLate.style.width = `${PlayerManaRemaining}%`;
    playerAction.innerText = player.stats.ap.toFixed(2) + "%";
    playerHP.innerText = player.stats.hp + "/" + stats.hpMax;
    playerMP.innerText = player.stats.mp + "/" + stats.mpMax;
    player.abilities.forEach((ability, index) => {
        ability.doCooldown();
        const slot = slots.children[index];
        const cooldown = slot.querySelector(".cooldown");
        const cooldownValue = slot.querySelector(".cooldown-number");
        cooldown.style.height = `${(ability.onCooldown / ability.cooldown) * 100}%`;
        if (ability.onCooldown > 0) {
            cooldownValue.innerText = ability.onCooldown.toFixed(1) + "s";
        }
    });
}
function createActionSlots() {
    slots.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        const slot = document.createElement("div");
        const image = document.createElement("img");
        slot.classList.add("action-slot");
        slot.setAttribute("data-index", i.toString());
        if (player.abilities[i]) {
            const ability = player.abilities[i];
            image.src = ability.icon;
            const cooldown = document.createElement("div");
            const cooldownValue = document.createElement("p");
            cooldown.classList.add("cooldown");
            cooldownValue.classList.add("cooldown-number");
            slot.append(image, cooldown, cooldownValue);
            console.log(ability.tooltip());
            tooltip(slot, ability.tooltip());
        }
        slots.appendChild(slot);
    }
}
class Game {
    constructor() {
        this.init();
        this.state = {
            paused: false,
        };
        this.language = english;
    }
    init() {
        console.log("Game initialized");
    }
    initCombat() {
        console.log("Combat initialized");
        createActionSlots();
    }
    pause() {
        this.state.paused = true;
    }
    resume() {
        this.state.paused = false;
    }
    getLocalizedString(id) {
        let string = id;
        if (this.language[id]) {
            string = this.language[id];
        }
        return string;
    }
}
const game = new Game();
//# sourceMappingURL=combat.js.map