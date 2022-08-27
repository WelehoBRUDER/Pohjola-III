function tooltip(element: HTMLElement, text: string) {
  element.onmouseover = (e) => {
    showHover(e, text);
  };
  element.onmousemove = moveHover;
  element.onmouseleave = hideHover;
}

function updateTooltip(element: HTMLElement, text: string) {
  element.onmouseover = (e) => {
    showHover(e, text);
  };
}

function showHover(mouseEvent: MouseEvent, text: string) {
  tooltipBox.textContent = "";
  tooltipBox.style.display = "block";
  tooltipBox.append(textSyntax(text));
  moveHover(mouseEvent);
}

function moveHover(mouseEvent: MouseEvent) {
  tooltipBox.style.left = `${mouseEvent.x + 15}px`;
  tooltipBox.style.top = `${mouseEvent.y - 25}px`;
  if (tooltipBox.offsetLeft + tooltipBox.offsetWidth > innerWidth) {
    tooltipBox.style.left = innerWidth - tooltipBox.offsetWidth - (innerWidth - mouseEvent.x) + "px";
  }
  if (tooltipBox.offsetTop + tooltipBox.offsetHeight > innerHeight) {
    tooltipBox.style.top = innerHeight - tooltipBox.offsetHeight - (innerHeight - mouseEvent.y) + "px";
  }
}

function hideHover() {
  tooltipBox.textContent = "";
  tooltipBox.style.display = "none";
}
