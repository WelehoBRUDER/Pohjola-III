"use strict";
const settingsLayout = [
    {
        id: "animation_speed",
        type: "select",
        values: [0.5, 1, 2, 3, 4, 5],
        labels: ["0.5x", "1x", "2x", "3x", "4x", "5x"],
    },
    {
        id: "tick_speed",
        type: "select",
        values: [30, 60, 120, 240, 480],
        labels: ["30", "60", "120", "240", "480"],
    },
    {
        id: "",
        iterate: "hotkey_ability",
        times: 6,
        type: "hotkey",
    },
];
function createSettings() {
    const settingsMenu = document.createElement("div");
    settingsMenu.classList.add("settings-menu");
    settingsMenu.classList.add("responsive-menu");
    console.log(game.settings);
    settingsLayout.forEach((setting) => {
        if (setting.iterate) {
            for (let i = 1; i <= setting.times; i++) {
                const settingElement = document.createElement("div");
                settingElement.classList.add("setting");
                settingElement.id = `${setting.iterate}_${i}`;
                const settingLabel = document.createElement("div");
                settingLabel.classList.add("setting-label");
                settingLabel.innerText = game.getLocalizedString(`${setting.iterate}_${i}`);
                settingElement.append(settingLabel);
                const settingInput = document.createElement("input");
                settingInput.classList.add("setting-input");
                settingInput.id = `${setting.iterate}_${i}_input`;
                settingInput.value = game.settings[`${setting.iterate}_${i}`];
                settingInput.addEventListener("change", (e) => {
                    game.settings[`${setting.iterate}_${i}`] = settingInput.value;
                });
                settingElement.append(settingInput);
                settingsMenu.append(settingElement);
            }
        }
        else {
            const settingElement = document.createElement("div");
            settingElement.classList.add("setting");
            settingElement.id = setting.id;
            const settingLabel = document.createElement("div");
            settingLabel.classList.add("setting-label");
            settingLabel.innerText = game.getLocalizedString(setting.id);
            settingElement.append(settingLabel);
            if (setting.type === "select") {
                const settingInput = document.createElement("select");
                settingInput.classList.add("setting-input");
                settingInput.id = `${setting.id}_input`;
                settingInput.addEventListener("change", (e) => {
                    game.settings[setting.id] = settingInput.value;
                });
                setting.values.forEach((value, index) => {
                    const option = document.createElement("option");
                    option.value = value.toString();
                    option.innerText = setting.labels[index];
                    settingInput.append(option);
                });
                settingInput.value = game.settings[setting.id].toString();
                settingElement.append(settingInput);
            }
            else if (setting.type === "hotkey") {
                const settingInput = document.createElement("input");
                settingInput.classList.add("setting-input");
                settingInput.id = `${setting.id}_input`;
                settingInput.value = game.settings[setting.id];
                settingInput.addEventListener("change", (e) => {
                    game.settings[setting.id] = settingInput.value;
                });
                settingElement.append(settingInput);
            }
            settingsMenu.append(settingElement);
        }
    });
    mainMenuElement.append(settingsMenu);
}
//# sourceMappingURL=settings.js.map