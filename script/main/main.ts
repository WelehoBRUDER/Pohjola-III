function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement(array: any[]): any {
  return array[random(0, array.length - 1)];
}

function randomElementExcept(array: any[], except: any): any {
  let index = random(0, array.length - 1);
  while (array[index] === except) {
    index = random(0, array.length - 1);
  }
  return array[index];
}

function weightedRandom(array: any[]): number {
  let table: Array<any> = [...array];
  let max = 0;
  for (let i = 0; i < table.length; i++) {
    table[i].dynamicWeight = 0;
    if (table[i - 1]) table[i].dynamicWeight = table[i - 1].dynamicWeight;
    else table[i].dynamicWeight = 0;
    table[i].dynamicWeight += table[i].weight;
    console.log(`${table[i].id} weight`, table[i].dynamicWeight);
    max = table[i].dynamicWeight;
  }
  const value: number = Math.floor(random(0, max));
  return table.findIndex((item: any) => item.dynamicWeight >= value);
}

function closeEverything() {
  if (game.inMenu) {
    mainMenu();
  }
  if (devConsole.open) {
    devConsole.open = false;
    consoleElement.style.display = "none";
  }
  if (worldLog.classList.contains("large")) {
    worldLog.classList.remove("large");
    worldLog.scrollTop = 0;
    worldLog.innerHTML = "";
  }
  if (log.notifications.length > 0) {
    const notification = log.notifications[log.notifications.length - 1];
    notification.classList.remove("active");
    setTimeout(() => {
      notification.remove();
    }, 150);
    log.notifications.splice(log.notifications.length - 1, 1);
  }
}
