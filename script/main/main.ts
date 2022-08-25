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
