// This function creates a p-element and makes it jump up in a random direction, then fall down.
function createDroppingText(text: string, origin: HTMLElement, className: string = "default", options?: { fontSize: number }): void {
  let p = document.createElement("p");
  p.innerText = text;
  p.classList.add("jump");
  p.classList.add(className);
  p.style.transition = "1.4s";
  p.style.animationDuration = "1.4s";
  const { top, left } = origin.getBoundingClientRect();
  p.style.left = `${left + random(-60, 60)}px`;
  p.style.top = `${top - random(25, 100)}px`;
  p.style.fontSize = `${random(60, 80)}px`;
  if (options) {
    if (options.fontSize) p.style.fontSize = `${options.fontSize}px`;
  }
  setTimeout(flyRandomly, 25);
  const currentLeft = +p.style.left.substring(0, p.style.left.length - 2);
  function flyRandomly() {
    p.style.left = currentLeft + random(200, -200) + "px";
  }
  combatScreen.append(p);
  setTimeout(() => p.remove(), 1500);
}
