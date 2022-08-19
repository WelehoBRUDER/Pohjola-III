"use strict";
function tooltip(element, text) {
    element.addEventListener("mouseover", (e) => {
        showHover(e, text);
    });
    element.addEventListener("mousemove", moveHover);
    element.addEventListener("mouseleave", hideHover);
}
function showHover(mouseEvent, text) {
    tooltipBox.textContent = "";
    tooltipBox.style.display = "block";
    tooltipBox.append(textSyntax(text));
    moveHover(mouseEvent);
}
function moveHover(mouseEvent) {
    tooltipBox.style.left = `${mouseEvent.x + 15}px`;
    tooltipBox.style.top = `${mouseEvent.y - 25}px`;
    if (tooltipBox.offsetLeft + tooltipBox.offsetWidth > innerWidth) {
        tooltipBox.style.left =
            innerWidth - tooltipBox.offsetWidth - (innerWidth - mouseEvent.x) + "px";
    }
    if (tooltipBox.offsetTop + tooltipBox.offsetHeight > innerHeight) {
        tooltipBox.style.top =
            innerHeight -
                tooltipBox.offsetHeight -
                (innerHeight - mouseEvent.y) +
                "px";
    }
}
function hideHover() {
    tooltipBox.textContent = "";
    tooltipBox.style.display = "none";
}
//# sourceMappingURL=tooltip.js.map