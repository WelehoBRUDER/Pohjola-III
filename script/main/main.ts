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
