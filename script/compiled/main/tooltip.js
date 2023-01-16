"use strict";
var tooltipInfo = {
    text: "",
    extraText: ""
};
var displayingExtraText = false;
function tooltip(element, text, extraText) {
    element.onmouseover = function (e) {
        showHover(e, text, extraText);
    };
    element.onmousemove = moveHover;
    element.onmouseleave = hideHover;
}
function updateTooltip(element, text) {
    element.onmouseover = function (e) {
        showHover(e, text);
    };
}
function showHover(mouseEvent, text, extraText) {
    tooltipInfo.text = text;
    tooltipInfo.extraText = extraText !== null && extraText !== void 0 ? extraText : "";
    tooltipBox.textContent = "";
    tooltipBox.style.display = "block";
    tooltipBox.append(textSyntax(text));
    if (displayingExtraText) {
        displayExtraText(true);
    }
    else if (extraText) {
        tooltipBox.append(textSyntax(game.getLocalizedString("shift_to_compare")));
    }
    moveHover(mouseEvent);
}
function moveHover(mouseEvent) {
    tooltipBox.style.left = mouseEvent.x + 15 + "px";
    tooltipBox.style.top = mouseEvent.y - 25 + "px";
    if (tooltipBox.offsetLeft + tooltipBox.offsetWidth > innerWidth) {
        tooltipBox.style.left =
            innerWidth - tooltipBox.offsetWidth - (innerWidth - mouseEvent.x) + "px";
    }
    if (tooltipBox.offsetTop + tooltipBox.offsetHeight > innerHeight) {
        tooltipBox.style.top =
            innerHeight - tooltipBox.offsetHeight - (innerHeight - mouseEvent.y) + "px";
    }
}
function hideHover() {
    tooltipBox.textContent = "";
    tooltipBox.style.display = "none";
}
function displayExtraText(override) {
    if ((tooltipInfo.extraText === "" || displayingExtraText) && !override)
        return;
    tooltipBox.textContent = "";
    //tooltipBox.append(textSyntax(tooltipInfo.text));
    tooltipBox.append(textSyntax(tooltipInfo.extraText));
    displayingExtraText = true;
}
function hideExtraText() {
    tooltipBox.textContent = "";
    tooltipBox.append(textSyntax(tooltipInfo.text));
    if (tooltipInfo.extraText) {
        tooltipBox.append(textSyntax(game.getLocalizedString("shift_to_compare")));
    }
    displayingExtraText = false;
}
//# sourceMappingURL=tooltip.js.map