const textBox = $("#textBoxPop");
let hovering;

function textBoxSet(point, text, width, alt) {
  hovering = { point: point, text: text, alt: alt, width: width };
  textBox.style.display = "block";
  textBox.textContent = "";
  textBox.appendChild(textSyntax(text));
  textBox.style.left = point.clientX + 20 + 'px';
  textBox.style.top = point.clientY + 20 + 'px';
  if (textBox.offsetLeft + textBox.offsetWidth > window.innerWidth) {
    textBox.style.left = window.innerWidth - textBox.offsetWidth + 'px';
  }
  if (textBox.offsetTop + textBox.offsetHeight > window.innerHeight) {
    textBox.style.top = window.innerHeight - textBox.offsetHeight + 'px';
  }
}

function textBoxMove(point, text, alt) {
  textBox.style.left = point.clientX + 20 + 'px';
  textBox.style.top = point.clientY + 20 + 'px';
  if (textBox.offsetLeft + textBox.offsetWidth > window.innerWidth) {
    textBox.style.left = window.innerWidth - textBox.offsetWidth + 'px';
  }
  if (textBox.offsetTop + textBox.offsetHeight > window.innerHeight) {
    textBox.style.top = window.innerHeight - textBox.offsetHeight + 'px';
  }
}

function textBoxAlt(e) {
  if (hovering?.point && e.shiftKey && hovering.alt) {
    textBox.textContent = "";
    textBox.style.width = hovering.width * 1.5 + 'vw';
    textBox.appendChild(textSyntax(hovering.alt));
  }
}

function textBoxMain(e) {
  if (hovering?.point) {
    textBox.textContent = "";
    textBox.style.width = hovering.width + 'vw';
    textBox.appendChild(textSyntax(hovering.text));
  }
}

function textBoxRemove() {
  hovering = undefined;
  textBox.style.display = "none";
  textBox.textContent = "";
}

function addHoverBox(element, text, alt) {
  element.addEventListener('mouseover', (e) => textBoxSet(e, text, alt));
  element.addEventListener('mousemove', (e) => textBoxMove(e, text, alt));
  element.addEventListener('mouseout', (e) => textBoxRemove());
}

addHoverBox($(".playerHpBar"), texts.health_text, "");
addHoverBox($(".playerMpBar"), texts.mana_text, "");
addHoverBox($(".playerActionBar"), texts.action_text, "");
addHoverBox($(".regularAttack"), texts.regular_attack_text, "");
addHoverBox($(".combatInventory"), texts.open_inventory_text, "");
addHoverBox($(".closeLoot"), "<f>18px<f><c>red<c>Any items you haven't selected will be deleted!\n<c>yellow<c><f>16px<f>Select items by clicking them.", "");
addHoverBox($(".characterDetails"), "<f>18px<f>Details", "");