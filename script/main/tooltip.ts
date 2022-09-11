const tooltipInfo: { text: string; extraText: string } = {
  text: "",
  extraText: "",
};

let displayingExtraText = false;

function tooltip(element: HTMLElement, text: string, extraText?: string) {
  element.onmouseover = (e) => {
    showHover(e, text, extraText);
  };
  element.onmousemove = moveHover;
  element.onmouseleave = hideHover;
}

function updateTooltip(element: HTMLElement, text: string) {
  element.onmouseover = (e) => {
    showHover(e, text);
  };
}

function showHover(mouseEvent: MouseEvent, text: string, extraText?: string) {
  tooltipInfo.text = text;
  tooltipInfo.extraText = extraText ?? "";
  tooltipBox.textContent = "";
  tooltipBox.style.display = "block";
  tooltipBox.append(textSyntax(text));
  if (displayingExtraText) {
    displayExtraText(true);
  } else if (extraText) {
    tooltipBox.append(textSyntax(game.getLocalizedString("shift_to_compare")));
  }
  moveHover(mouseEvent);
}

function moveHover(mouseEvent: MouseEvent) {
  tooltipBox.style.left = `${mouseEvent.x + 15}px`;
  tooltipBox.style.top = `${mouseEvent.y - 25}px`;
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

function displayExtraText(override?: boolean) {
  if ((tooltipInfo.extraText === "" || displayingExtraText) && !override) return;
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
