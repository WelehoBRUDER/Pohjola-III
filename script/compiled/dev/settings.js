"use strict";
const settingsLayout = [
    {
        id: "animation_speed",
        type: "select",
        values: [0.5, 1, 2, 3, 4, 5],
        labels: ["0.25x", "0.5x", "1x", "2x", "3x", "4x"],
    },
    {
        id: "tick_speed",
        type: "select",
        values: [30, 60, 90, 120, 150],
        labels: ["0.5x", "1x", "1.5x", "2x", "2.5x"],
    },
    {
        id: "lock_on_targeting",
        type: "checkbox",
    },
];
function createSettings() {
    const settingsMenu = document.createElement("div");
    settingsMenu.classList.add("settings-menu");
    settingsMenu.classList.add("responsive-menu");
    settingsLayout.forEach((setting) => {
        const settingElement = document.createElement("div");
        const settingName = document.createElement("p");
        const settingValue = createSettingValue(setting, settingElement);
        settingElement.classList.add("setting");
        settingName.classList.add("setting-name");
        settingName.innerText = game.getLocalizedString(setting.id);
        settingElement.append(settingName, settingValue);
        settingsMenu.append(settingElement);
        // Tooltip, when available
        const settingTT = game.getLocalizedString(setting.id + "_tt");
        if (settingTT !== setting.id + "_tt") {
            tooltip(settingElement, settingTT);
        }
    });
    mainMenuElement.append(settingsMenu);
}
function createSettingValue(setting, element) {
    const settingValue = document.createElement("div");
    settingValue.classList.add("setting-value");
    switch (setting.type) {
        case "select":
            const select = document.createElement("select");
            select.classList.add("setting-select");
            setting.values.forEach((value, index) => {
                const option = document.createElement("option");
                option.value = value;
                option.innerText = setting.labels[index];
                if (game.settings[setting.id] === value) {
                    option.selected = true;
                }
                select.append(option);
            });
            select.onchange = (e) => {
                const select = e.target;
                if (select.value) {
                    game.settings[setting.id] = parseFloat(select.value);
                    game.saveSettings();
                }
            };
            settingValue.append(select);
            break;
        case "checkbox":
            const checkbox = document.createElement("div");
            checkbox.innerText = game.settings[setting.id] ? "X" : "";
            if (element) {
                element.onclick = () => {
                    game.settings[setting.id] = !game.settings[setting.id];
                    checkbox.innerText = game.settings[setting.id] ? "X" : "";
                    game.saveSettings();
                };
            }
            settingValue.append(checkbox);
            break;
    }
    return settingValue;
}
//# sourceMappingURL=settings.js.map