"use strict";
//@ts-nocheck
function textSyntax(syn = "") {
    const pre = document.createElement("pre");
    const lines = syn.split("§");
    let selectedContainer = pre;
    for (const line of lines) {
        const span = document.createElement("span");
        selectedContainer.append(span);
        let selectedSpan = span;
        let index = 0;
        do {
            const currentLine = line.substring(index);
            const nspan = document.createElement("span");
            let [lineText] = currentLine.split("<");
            if (currentLine.startsWith("<c>")) {
                const [, color, text = ""] = currentLine.split("<c>");
                [lineText] = text.split("<");
                if (selectedSpan.style.color) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.color = runVariableTest(color);
                index = line.indexOf("<c>", index + 1);
                if (index == -1)
                    return console.error(`"<c>" has no closing!`);
            }
            else if (currentLine.startsWith("<f>")) {
                const [, fontSize, text = ""] = currentLine.split("<f>");
                [lineText] = text.split("<");
                if (selectedSpan.style.fontSize) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.fontSize = runVariableTest(fontSize);
                index = line.indexOf("<f>", index + 1);
                if (index == -1)
                    return console.error(`"<f>" has no closing!`);
            }
            else if (currentLine.startsWith("<b>")) {
                const [, fontWeight, text = ""] = currentLine.split("<b>");
                [lineText] = text.split("<");
                if (selectedSpan.style.fontWeight) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.fontWeight = runVariableTest(fontWeight);
                index = line.indexOf("<b>", index + 1);
                if (index == -1)
                    return console.error(`"<b>" has no closing!`);
            }
            else if (currentLine.startsWith("<cl>")) {
                const [, classList, text = ""] = currentLine.split("<cl>");
                [lineText] = text.split("<");
                if (selectedSpan.classList.value) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.classList = runVariableTest(classList);
                index = line.indexOf("<cl>", index + 1);
                if (index == -1)
                    return console.error(`"<cl>" has no closing!`);
            }
            else if (currentLine.startsWith("<ff>")) {
                const [, fontFamily, text = ""] = currentLine.split("<ff>");
                [lineText] = text.split("<");
                if (selectedSpan.style.fontFamily) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.fontFamily = runVariableTest(fontFamily);
                index = line.indexOf("<ff>", index + 1);
                if (index == -1)
                    return console.error(`"<ff>" has no closing!`);
            }
            else if (currentLine.startsWith("<css>")) {
                const [, rawCss, text = ""] = currentLine.split("<css>");
                [lineText] = text.split("<");
                if (line.indexOf("<css>") !== index) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.cssText += runVariableTest(rawCss);
                index = line.indexOf("<css>", index + 1);
                if (index == -1)
                    return console.error(`"<css>" has no closing!`);
            }
            else if (currentLine.startsWith("<bcss>")) {
                const [, rawCss, text = ""] = currentLine.split("<bcss>");
                [lineText] = text.split("<");
                selectedContainer.style.cssText += runVariableTest(rawCss);
                index = line.indexOf("<bcss>", index + 1);
                if (index == -1)
                    return console.error(`"<bcss>" has no closing!`);
            }
            else if (currentLine.startsWith("<v>")) {
                const [, variable, text = ""] = currentLine.split("<v>");
                [lineText] = text.split("<");
                try {
                    lineText = eval(variable) ?? "" + lineText;
                }
                catch {
                    return console.error(`"${variable}" is not defined`);
                }
                index = line.indexOf("<v>", index + 1);
                if (index == -1)
                    return console.error(`"<v>" has no closing!`);
            }
            else if (currentLine.startsWith("<i>")) {
                const [, source, text = ""] = currentLine.split("<i>");
                const img = document.createElement("img");
                const className = source.indexOf("[") != -1 ? source.split("[")[1].split("]")[0] : "";
                img.src = runVariableTest(source.replace("[" + className + "]", ""));
                [lineText] = text.split("<");
                selectedSpan.append(img);
                img.classList = className;
                index = line.indexOf("<i>", index + 1);
                if (index == -1)
                    return console.error(`"<i>" has no closing!`);
            }
            else if (currentLine.startsWith("<ct>")) {
                const [, className, text = ""] = currentLine.split("<ct>", 3);
                const container = document.createElement("div");
                if (className.length)
                    container.classList = runVariableTest(className);
                [lineText] = text.split("<", 1);
                selectedContainer.append(container);
                selectedContainer = container;
                if (selectedSpan.outerHTML !== "<span></span>") {
                    selectedContainer.append(nspan);
                    selectedSpan = nspan;
                }
                else
                    selectedContainer.append(selectedSpan);
                index = line.indexOf("<ct>", index + 1);
                if (index == -1)
                    return console.error(`"<ct>" has no closing!`);
            }
            else if (currentLine.startsWith("<nct>")) {
                const [, className, text = ""] = currentLine.split("<nct>", 3);
                const container = document.createElement("div");
                if (className.length)
                    container.classList = runVariableTest(className);
                [lineText] = text.split("<", 1);
                pre.append(container);
                selectedContainer = container;
                if (selectedSpan.outerHTML !== "<span></span>") {
                    selectedContainer.append(nspan);
                    selectedSpan = nspan;
                }
                else
                    selectedContainer.append(selectedSpan);
                index = line.indexOf("<nct>", index + 1);
                if (index == -1)
                    return console.error(`"<nct>" has no closing!`);
            }
            selectedSpan.innerHTML += lineText;
            index = line.indexOf("<", index + 1);
        } while (index !== -1);
    }
    return pre;
    function runVariableTest(data) {
        if (data.indexOf("<v>") == -1)
            return data;
        let index = 0;
        let finalText = "";
        while (index !== -1) {
            const currentLine = data.substring(index);
            let [lineText] = currentLine.split("<");
            if (currentLine.startsWith("<v>")) {
                const [, variable, text = ""] = currentLine.split("<v>");
                [lineText] = text.split("<");
                try {
                    lineText = eval(variable) ?? "" + lineText;
                }
                catch {
                    return console.error(`"${variable}" is not defined`);
                }
                index = data.indexOf("<v>", index + 1);
                if (index == -1)
                    return console.error(`"<v>" has no closing!`);
            }
            finalText += lineText;
            index = data.indexOf("<", index + 1);
        }
        return finalText;
    }
}
const properties = {
    critRateV: {
        addPercentageSuffix: true,
    },
    critPowerV: {
        addPercentageSuffix: true,
    },
    dodgeV: {
        addPercentageSuffix: true,
    },
    powerV: {
        addPercentageSuffix: true,
        multiplyBy: 100,
    },
    penetrationV: {
        addPercentageSuffix: true,
        multiplyBy: 100,
    },
    cooldownP: {
        lowerIsBetter: true,
    },
    cooldownV: {
        lowerIsBetter: true,
    },
    atkPV: {
        addPercentageSuffix: true,
    },
    strPV: {
        addPercentageSuffix: true,
    },
    agiPV: {
        addPercentageSuffix: true,
    },
    vitPV: {
        addPercentageSuffix: true,
    },
    intPV: {
        addPercentageSuffix: true,
    },
    spiPV: {
        addPercentageSuffix: true,
    },
    damagePV: {
        addPercentageSuffix: true,
    },
    speedPV: {
        addPercentageSuffix: true,
    },
    damagePercentV: {
        addPercentageSuffix: true,
        multiplyBy: 100,
    },
    healingPercentV: {
        addPercentageSuffix: true,
        multiplyBy: 100,
    },
    durationV: {
        addSuffix: "s",
    },
    mpCostV: {
        lowerIsBetter: true,
    },
    mpCostP: {
        addPercentageSuffix: true,
        lowerIsBetter: true,
    },
    mpRegenFromIntV: {
        multiplyBy: 100,
        addPercentageSuffix: true,
    },
    all_mpCostP: {
        addPercentageSuffix: true,
        lowerIsBetter: true,
    },
    all_cooldownP: {
        addPercentageSuffix: true,
        lowerIsBetter: true,
    },
    all_cooldownV: {
        addSuffix: "s",
        lowerIsBetter: true,
    },
};
function getProperties(key) {
    const props = {
        addPercentageSuffix: false,
        lowerIsBetter: false,
        addSuffix: null,
        multiplyBy: 1,
    };
    if (properties[key]) {
        if (properties[key].addPercentageSuffix) {
            props.addPercentageSuffix = true;
        }
        if (properties[key].lowerIsBetter) {
            props.lowerIsBetter = true;
        }
        if (properties[key].multiplyBy) {
            props.multiplyBy = properties[key].multiplyBy;
        }
        if (properties[key].addSuffix) {
            props.addSuffix = properties[key].addSuffix;
        }
    }
    return props;
}
function effectSyntax(key, value, _props) {
    // Syntax when value is an ability object
    if (key.startsWith("ability_")) {
        let text = "";
        const id = key.split("ability_")[1];
        const ability = new Ability(abilities[id]);
        const name = game.getLocalizedString(ability.id);
        text += `<i>${ability.icon}<i><c>goldenrod<c>${name} modified:\n`;
        Object.entries(value).forEach(([_key, _value]) => {
            text += " " + effectSyntax(_key, _value);
        });
        return text + "\n";
    }
    // Syntax when value is an effect object
    else if (key.startsWith("effect_")) {
        let text = "";
        const id = key.split("effect_")[1];
        const effect = new Effect(effects[id]);
        const name = game.getLocalizedString(effect.id);
        text += `<i>${effect.icon}<i><c>goldenrod<c>${name} effect modified:\n`;
        Object.entries(value).forEach(([_key, _value]) => {
            text += " " + effectSyntax(_key, _value);
        });
        return text;
    }
    // Simple syntax when value is a number
    else if (typeof value === "number") {
        const props = _props ? _props : getProperties(key);
        const valueType = key.substring(key.length - 1);
        let dots = true;
        let prefix = value >= 0 ? "+" : "";
        const suffix = valueType === "P" || props.addPercentageSuffix ? "%" : props.addSuffix ? props.addSuffix : "";
        let color = "white";
        if (props.lowerIsBetter) {
            color = value < 0 ? "lime" : "red";
        }
        else {
            color = value > 0 ? "lime" : "red";
        }
        value *= props.multiplyBy;
        key = key.substring(0, key.length - 1);
        const name = game.getLocalizedString(key);
        const id = key.substring(0, key.length - 1);
        const icon = icons[key] ? icons[key] : icons[id] ? icons[id] : "gfx/icons/triple-yin.png";
        return `<c>white<c> <i>${icon}<i> ${name}: <c>${color}<c>${prefix}${value.toFixed(2)}${suffix}\n`;
    }
    else if (typeof value === "object") {
        let text = "";
        Object.entries(value).forEach(([_key, _value]) => {
            text += " " + effectSyntax(_key, _value);
        });
        return text;
    }
}
function compactNumber(num) {
    return Intl.NumberFormat("en-UK", { notation: "compact" }).format(num).toLowerCase();
}
//# sourceMappingURL=syntax.js.map