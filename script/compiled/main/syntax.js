"use strict";
//@ts-nocheck
function textSyntax(syn) {
    var _a;
    if (syn === void 0) { syn = ""; }
    var pre = document.createElement("pre");
    var lines = syn.split("§");
    var selectedContainer = pre;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var span = document.createElement("span");
        selectedContainer.append(span);
        var selectedSpan = span;
        var index = 0;
        do {
            var currentLine = line.substring(index);
            var nspan = document.createElement("span");
            var lineText = currentLine.split("<")[0];
            if (currentLine.startsWith("<c>")) {
                var _b = currentLine.split("<c>"), color = _b[1], _c = _b[2], text = _c === void 0 ? "" : _c;
                lineText = text.split("<")[0];
                if (selectedSpan.style.color) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.color = runVariableTest(color);
                index = line.indexOf("<c>", index + 1);
                if (index == -1)
                    return console.error("\"<c>\" has no closing!");
            }
            else if (currentLine.startsWith("<f>")) {
                var _d = currentLine.split("<f>"), fontSize = _d[1], _e = _d[2], text = _e === void 0 ? "" : _e;
                lineText = text.split("<")[0];
                if (selectedSpan.style.fontSize) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.fontSize = runVariableTest(fontSize);
                index = line.indexOf("<f>", index + 1);
                if (index == -1)
                    return console.error("\"<f>\" has no closing!");
            }
            else if (currentLine.startsWith("<b>")) {
                var _f = currentLine.split("<b>"), fontWeight = _f[1], _g = _f[2], text = _g === void 0 ? "" : _g;
                lineText = text.split("<")[0];
                if (selectedSpan.style.fontWeight) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.fontWeight = runVariableTest(fontWeight);
                index = line.indexOf("<b>", index + 1);
                if (index == -1)
                    return console.error("\"<b>\" has no closing!");
            }
            else if (currentLine.startsWith("<cl>")) {
                var _h = currentLine.split("<cl>"), classList = _h[1], _j = _h[2], text = _j === void 0 ? "" : _j;
                lineText = text.split("<")[0];
                if (selectedSpan.classList.value) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.classList = runVariableTest(classList);
                index = line.indexOf("<cl>", index + 1);
                if (index == -1)
                    return console.error("\"<cl>\" has no closing!");
            }
            else if (currentLine.startsWith("<ff>")) {
                var _k = currentLine.split("<ff>"), fontFamily = _k[1], _l = _k[2], text = _l === void 0 ? "" : _l;
                lineText = text.split("<")[0];
                if (selectedSpan.style.fontFamily) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.fontFamily = runVariableTest(fontFamily);
                index = line.indexOf("<ff>", index + 1);
                if (index == -1)
                    return console.error("\"<ff>\" has no closing!");
            }
            else if (currentLine.startsWith("<css>")) {
                var _m = currentLine.split("<css>"), rawCss = _m[1], _o = _m[2], text = _o === void 0 ? "" : _o;
                lineText = text.split("<")[0];
                if (line.indexOf("<css>") !== index) {
                    selectedSpan.append(nspan);
                    selectedSpan = nspan;
                }
                selectedSpan.style.cssText += runVariableTest(rawCss);
                index = line.indexOf("<css>", index + 1);
                if (index == -1)
                    return console.error("\"<css>\" has no closing!");
            }
            else if (currentLine.startsWith("<bcss>")) {
                var _p = currentLine.split("<bcss>"), rawCss = _p[1], _q = _p[2], text = _q === void 0 ? "" : _q;
                lineText = text.split("<")[0];
                selectedContainer.style.cssText += runVariableTest(rawCss);
                index = line.indexOf("<bcss>", index + 1);
                if (index == -1)
                    return console.error("\"<bcss>\" has no closing!");
            }
            else if (currentLine.startsWith("<v>")) {
                var _r = currentLine.split("<v>"), variable = _r[1], _s = _r[2], text = _s === void 0 ? "" : _s;
                lineText = text.split("<")[0];
                try {
                    lineText = (_a = eval(variable)) !== null && _a !== void 0 ? _a : "" + lineText;
                }
                catch (_t) {
                    return console.error("\"" + variable + "\" is not defined");
                }
                index = line.indexOf("<v>", index + 1);
                if (index == -1)
                    return console.error("\"<v>\" has no closing!");
            }
            else if (currentLine.startsWith("<i>")) {
                var _u = currentLine.split("<i>"), source = _u[1], _v = _u[2], text = _v === void 0 ? "" : _v;
                var img = document.createElement("img");
                var className = source.indexOf("[") != -1 ? source.split("[")[1].split("]")[0] : "";
                img.src = runVariableTest(source.replace("[" + className + "]", ""));
                lineText = text.split("<")[0];
                selectedSpan.append(img);
                img.classList = className;
                index = line.indexOf("<i>", index + 1);
                if (index == -1)
                    return console.error("\"<i>\" has no closing!");
            }
            else if (currentLine.startsWith("<ct>")) {
                var _w = currentLine.split("<ct>", 3), className = _w[1], _x = _w[2], text = _x === void 0 ? "" : _x;
                var container = document.createElement("div");
                if (className.length)
                    container.classList = runVariableTest(className);
                lineText = text.split("<", 1)[0];
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
                    return console.error("\"<ct>\" has no closing!");
            }
            else if (currentLine.startsWith("<nct>")) {
                var _y = currentLine.split("<nct>", 3), className = _y[1], _z = _y[2], text = _z === void 0 ? "" : _z;
                var container = document.createElement("div");
                if (className.length)
                    container.classList = runVariableTest(className);
                lineText = text.split("<", 1)[0];
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
                    return console.error("\"<nct>\" has no closing!");
            }
            selectedSpan.innerHTML += lineText;
            index = line.indexOf("<", index + 1);
        } while (index !== -1);
    }
    return pre;
    function runVariableTest(data) {
        var _a;
        if (data.indexOf("<v>") == -1)
            return data;
        var index = 0;
        var finalText = "";
        while (index !== -1) {
            var currentLine = data.substring(index);
            var lineText = currentLine.split("<")[0];
            if (currentLine.startsWith("<v>")) {
                var _b = currentLine.split("<v>"), variable = _b[1], _c = _b[2], text = _c === void 0 ? "" : _c;
                lineText = text.split("<")[0];
                try {
                    lineText = (_a = eval(variable)) !== null && _a !== void 0 ? _a : "" + lineText;
                }
                catch (_d) {
                    return console.error("\"" + variable + "\" is not defined");
                }
                index = data.indexOf("<v>", index + 1);
                if (index == -1)
                    return console.error("\"<v>\" has no closing!");
            }
            finalText += lineText;
            index = data.indexOf("<", index + 1);
        }
        return finalText;
    }
}
var properties = {
    critRateV: {
        addPercentageSuffix: true
    },
    critPowerV: {
        addPercentageSuffix: true
    },
    powerV: {
        addPercentageSuffix: true,
        multiplyBy: 100
    },
    penetrationV: {
        addPercentageSuffix: true,
        multiplyBy: 100
    },
    cooldownP: {
        lowerIsBetter: true
    },
    cooldownV: {
        lowerIsBetter: true
    },
    atkPV: {
        addPercentageSuffix: true
    },
    strPV: {
        addPercentageSuffix: true
    },
    agiPV: {
        addPercentageSuffix: true
    },
    vitPV: {
        addPercentageSuffix: true
    },
    intPV: {
        addPercentageSuffix: true
    },
    spiPV: {
        addPercentageSuffix: true
    },
    damagePercentV: {
        addPercentageSuffix: true,
        multiplyBy: 100
    },
    healingPercentV: {
        addPercentageSuffix: true,
        multiplyBy: 100
    },
    durationV: {
        addSuffix: "s"
    }
};
function getProperties(key) {
    var props = {
        addPercentageSuffix: false,
        lowerIsBetter: false,
        addSuffix: null,
        multiplyBy: 1
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
function effectSyntax(key, value) {
    // Syntax when value is an ability object
    if (key.startsWith("ability_")) {
        var text_1 = "";
        var id = key.split("ability_")[1];
        var ability = new Ability(abilities[id]);
        var name_1 = game.getLocalizedString(ability.id);
        text_1 += "<i>" + ability.icon + "<i><c>goldenrod<c>" + name_1 + " modified:\n";
        Object.entries(value).forEach(function (_a) {
            var _key = _a[0], _value = _a[1];
            text_1 += " " + effectSyntax(_key, _value);
        });
        return text_1 + "\n";
    }
    // Syntax when value is an effect object
    else if (key.startsWith("effect_")) {
        var text_2 = "";
        var id = key.split("effect_")[1];
        var effect = new Effect(effects[id]);
        var name_2 = game.getLocalizedString(effect.id);
        text_2 += "<i>" + effect.icon + "<i><c>goldenrod<c>" + name_2 + " effect modified:\n";
        Object.entries(value).forEach(function (_a) {
            var _key = _a[0], _value = _a[1];
            text_2 += " " + effectSyntax(_key, _value);
        });
        return text_2;
    }
    // Simple syntax when value is a number
    else if (typeof value === "number") {
        var props = getProperties(key);
        var valueType = key.substring(key.length - 1);
        var prefix = value >= 0 ? "+" : "";
        var suffix = valueType === "P" || props.addPercentageSuffix ? "%" : props.addSuffix ? props.addSuffix : "";
        var color = value >= 0 || props.lowerIsBetter ? "lime" : "red";
        value *= props.multiplyBy;
        key = key.substring(0, key.length - 1);
        var name_3 = game.getLocalizedString(key);
        var id = key.substring(0, key.length - 1);
        var icon = icons[key] ? icons[key] : icons[id] ? icons[id] : "gfx/icons/triple-yin.png";
        return "<c>white<c> <i>" + icon + "<i> " + name_3 + ": <c>" + color + "<c>" + prefix + value.toFixed(2) + suffix + "\n";
    }
    else if (typeof value === "object") {
        var text_3 = "";
        Object.entries(value).forEach(function (_a) {
            var _key = _a[0], _value = _a[1];
            text_3 += " " + effectSyntax(_key, _value);
        });
        return text_3;
    }
}
function compactNumber(num) {
    return Intl.NumberFormat("en-UK", { notation: "compact" }).format(num).toLowerCase();
}
//# sourceMappingURL=syntax.js.map