"use strict";
const startingAspects = {
    curiosity: {
        id: "curiosity",
        modifiers: {
            expGainP: 5,
        },
        items: [{ item: "ring_of_knowledge", amount: 1 }],
    },
    strength: {
        id: "strength",
        modifiers: {
            damageP: 4,
        },
        items: [
            { item: "long_sword", amount: 1 },
            { item: "ragged_armor", amount: 1 },
        ],
    },
    study: {
        id: "study",
        modifiers: {
            mpMaxP: 7,
        },
        items: [
            { item: "wood_stave", amount: 1 },
            { item: "acolyte_hood", amount: 1 },
        ],
    },
    health: {
        id: "health",
        modifiers: {
            hpMaxP: 7,
        },
        items: [
            { item: "small_recovery_gem", amount: 3 },
            { item: "medium_healing_potion", amount: 3 },
        ],
    },
    determination: {
        id: "determination",
        items: [],
    },
};
const startingChallenges = [
    {
        id: "SCORE_MULTIPLIER",
        value: 1,
    },
    {
        id: "hardcore",
        type: "boolean",
        enabled: false,
    },
    {
        id: "no_after_combat_recovery",
        type: "boolean",
        enabled: false,
    },
    {
        id: "no_grinding",
        type: "boolean",
        enabled: false,
    },
    {
        id: "real_time_combat",
        type: "boolean",
        enabled: false,
    },
    {
        id: "enemy_damage",
        type: "number",
        enabled: false,
        value: 1,
    },
    {
        id: "enemy_health",
        type: "number",
        enabled: false,
        value: 1,
    },
    {
        id: "healing_weakness",
        type: "number",
        enabled: false,
        value: 1,
    },
    {
        id: "mana_regen_debuff",
        type: "number",
        enabled: false,
        value: 1,
    },
];
const characterCreationSections = [
    {
        id: "name",
        type: "input",
    },
    {
        id: "class",
        type: "aspect",
        values: [classManager.get("warrior"), classManager.get("rogue"), classManager.get("mage"), classManager.get("paladin")],
    },
    {
        id: "starting_aspect",
        type: "aspect",
        values: [
            startingAspects["strength"],
            startingAspects["study"],
            startingAspects["health"],
            startingAspects["curiosity"],
            startingAspects["determination"],
        ],
    },
    {
        id: "starting_challenges",
        type: "challenge",
        values: startingChallenges,
    },
];
function createNewGame() {
    player = new Player({ ...defaultPlayer });
    Object.values(startingChallenges).forEach((challenge) => {
        challenge.enabled = false;
    });
    const characterCreation = document.createElement("div");
    characterCreation.classList.add("settings-menu");
    characterCreation.classList.add("responsive-menu");
    characterCreation.append(createExitButton());
    characterCreationSections.forEach((section) => {
        const sectionElement = document.createElement("div");
        const sectionName = document.createElement("p");
        const sectionValue = createSectionValue(section);
        sectionElement.classList.add("creation-value");
        sectionName.classList.add("creation-name");
        sectionName.innerText = game.getLocalizedString(section.id);
        sectionElement.append(sectionName, sectionValue);
        characterCreation.append(sectionElement);
    });
    const startGameButton = document.createElement("button");
    startGameButton.classList.add("start-game");
    startGameButton.innerText = game.getLocalizedString("start_game");
    startGameButton.onclick = () => {
        game.startGame();
    };
    characterCreation.append(startGameButton);
    mainMenuElement.append(characterCreation);
}
function createSectionValue(section) {
    const sectionValue = document.createElement("div");
    sectionValue.classList.add("choice-container");
    switch (section.type) {
        case "input":
            const input = document.createElement("input");
            input.classList.add("setting-input");
            input.type = "text";
            input.value = player[section.id];
            input.onchange = (e) => {
                const input = e.target;
                if (input.value) {
                    player[section.id] = input.value;
                }
            };
            sectionValue.append(input);
            break;
        case "aspect":
            const grid = document.createElement("div");
            grid.classList.add("creation-choices");
            section.values.forEach((value, index) => {
                const gridItem = document.createElement("div");
                gridItem.classList.add("choice");
                const gridItemName = document.createElement("p");
                if (player.starting_aspect === value.id || player.class.id === value.id) {
                    gridItem.classList.add("selected");
                }
                gridItem.onclick = () => {
                    if (value.type === "class") {
                        player.class = new CharClass(value);
                    }
                    else {
                        player.starting_aspect = value.id;
                    }
                    grid.querySelectorAll(".choice").forEach((item) => {
                        item.classList.remove("selected");
                    });
                    gridItem.classList.add("selected");
                };
                gridItemName.innerText = game.getLocalizedString(value.id);
                gridItem.append(gridItemName);
                tooltip(gridItem, aspectTooltip(value));
                grid.append(gridItem);
            });
            sectionValue.append(grid);
            break;
        case "challenge":
            const challengeList = document.createElement("div");
            challengeList.classList.add("creation-choices");
            challengeList.classList.add("challenges");
            section.values.forEach((value, index) => {
                const challengeContainer = document.createElement("div");
                challengeContainer.classList.add("choice");
                const challengeName = document.createElement("label");
                const challengeCheckbox = document.createElement("input");
                challengeCheckbox.type = "checkbox";
                challengeCheckbox.checked = value.enabled;
                challengeCheckbox.id = `challenge-${index}`;
                challengeName.htmlFor = `challenge-${index}`;
                if (value.id === "SCORE_MULTIPLIER") {
                    challengeName.id = "score-multiplier";
                    challengeName.innerText = game.getLocalizedString(value.id) + ": 1.00x";
                    challengeContainer.append(challengeName);
                }
                else {
                    challengeCheckbox.onchange = (e) => {
                        const checkbox = e.target;
                        if (checkbox.checked) {
                            challengeContainer.classList.add("selected");
                        }
                        else {
                            challengeContainer.classList.remove("selected");
                        }
                        value.enabled = checkbox.checked;
                        document.querySelector("#score-multiplier").textContent = `${game.getLocalizedString("SCORE_MULTIPLIER")}: ${scoreMultiplierInNewGameScreen()}x`;
                    };
                    challengeName.innerText = game.getLocalizedString(value.id);
                    challengeContainer.append(challengeCheckbox, challengeName);
                }
                if (value.type !== "boolean" && value.id !== "SCORE_MULTIPLIER") {
                    const challengeSelect = document.createElement("select");
                    challengeSelect.classList.add("challenge-select");
                    const options = challengeValues[value.id];
                    options.forEach((option) => {
                        const optionElement = document.createElement("option");
                        optionElement.value = option.value;
                        optionElement.innerText = `${option.value * 100}%`;
                        if (option.value === 1) {
                            optionElement.selected = true;
                        }
                        challengeSelect.append(optionElement);
                    });
                    challengeSelect.value = "1";
                    challengeSelect.onchange = (e) => {
                        const select = e.target;
                        value.value = parseFloat(select.value);
                        document.querySelector("#score-multiplier").textContent = `${game.getLocalizedString("SCORE_MULTIPLIER")}: ${scoreMultiplierInNewGameScreen()}x`;
                        challengeCheckbox.checked = true;
                        challengeContainer.classList.add("selected");
                        value.enabled = true;
                        document.querySelector("#score-multiplier").textContent = `${game.getLocalizedString("SCORE_MULTIPLIER")}: ${scoreMultiplierInNewGameScreen()}x`;
                    };
                    challengeContainer.append(challengeSelect);
                }
                tooltip(challengeContainer, game.getLocalizedString(`${value.id}_desc`));
                challengeList.append(challengeContainer);
            });
            sectionValue.append(challengeList);
            break;
    }
    return sectionValue;
}
function aspectTooltip(aspect) {
    let tooltip = `<f>1.25rem<f><c>goldenrod<c>${game.getLocalizedString(aspect.id)}<c>white<c>\n`;
    tooltip += `<f>1rem<f><c>silver<c>"${game.getLocalizedString(`${aspect.id}_desc`)}"<c>silver<c>\n`;
    if (aspect.modifiers) {
        tooltip += `<f>1rem<f><c>white<c>${game.getLocalizedString("modifiers")}:<c>white<c>\n`;
        Object.entries(aspect.modifiers).forEach(([key, value]) => {
            tooltip += effectSyntax(key, value);
        });
    }
    if (aspect.items?.length > 0) {
        tooltip += `<f>1rem<f><c>white<c>${game.getLocalizedString("starting_items")}:<c>white<c>\n`;
        aspect.items.forEach((item) => {
            tooltip += `<f>1rem<f><c>white<c>${item.amount}x <c>gold<c>${game.getLocalizedString(item.item)}<c>white<c>\n`;
        });
    }
    else if (aspect?.type !== "class") {
        tooltip += `<f>1rem<f><c>white<c>${game.getLocalizedString("no_items")}<c>white<c>\n`;
    }
    return tooltip;
}
//# sourceMappingURL=new_game.js.map