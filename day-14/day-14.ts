import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-14-input.txt', 'utf8').split('\n');

const parseInput = (input: string[], coordinates: Set<String>) => {
  input.map((line: string) => {
    const splittedLine = line.split(' -> ');
    for(let i: number = 0; i < splittedLine.length - 1; i++) {
      const [x, y] = splittedLine[i].split(',').map(Number);
      const [x2, y2] = splittedLine[i + 1].split(',').map(Number);

      if(x === x2) {
        const abs = Math.abs(y2 - y);
        for(let j: number = 0; j <= abs; j++) {
          if(y > y2) {
            coordinates.add(`${x}-${y - j}`)
          } else {
            coordinates.add(`${x}-${y + j}`)
          }
        }
      }

      if(y === y2) {
        const abs = Math.abs(x2 - x);
        for(let j: number = 0; j <= abs; j++) {
          if(x > x2) {
            coordinates.add(`${x - j}-${y}`);
          } else {
            coordinates.add(`${x + j}-${y}`);
          }
        }
      }

      // console.log(x, y, x2, y2);
    }
  })
}

const exerciseOne = (): number => {
  const coordinates = new Set<string>();
  let amount: number = 0;

  parseInput(fileContent, coordinates);

  console.log(coordinates);

  return amount;
}

const exerciseTwo = (): number => {
  return 0;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());