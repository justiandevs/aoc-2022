import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-14-input.txt', 'utf8').split('\n');

interface IPoint {
  x: number,
  y: number
}

const parseInput = (input: string[], coordinates: Set<String>): number => {
  let highest: number = 0;

  input.map((line: string) => {
    const splittedLine = line.split(' -> ');
    for(let i: number = 0; i < splittedLine.length - 1; i++) {
      const [x, y] = splittedLine[i].split(',').map(Number);
      const [x2, y2] = splittedLine[i + 1].split(',').map(Number);

      if (y > highest) {
        highest = y;
      }

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
        for (let j: number = 0; j <= abs; j++) {
          if (x > x2) {
            coordinates.add(`${x - j}-${y}`);
          } else {
            coordinates.add(`${x + j}-${y}`);
          }
        }
      }
    }
  })

  return highest;
}

const emulateSandFall = (coordinates: Set<string>, highest: number): number => {
  let amountOfSandUnits: number = 0;
  let last: boolean = false;

  while(!last) {
    const point: IPoint = { x: 500, y: 0 };
    amountOfSandUnits++;

    while(!last) {
      if(!coordinates.has(`${point.x}-${point.y + 1}`)) {
        point.y++;
      } else if(!coordinates.has(`${point.x - 1}-${point.y + 1}`)) {
        point.y++;
        point.x--;
      } else if(!coordinates.has(`${point.x + 1}-${point.y + 1}`)) {
        point.y++;
        point.x++;
      } else {
        coordinates.add(`${point.x}-${point.y}`);
        break;
      }
      if(point.y >= highest) {
        last = true;
        amountOfSandUnits--;
      }
    }
  }

  return amountOfSandUnits;
}

const emulateSandFallv2 = (coordinates: Set<string>, highest: number): number => {
  let amountOfSandUnits: number = 0;
  let last: boolean = false;

  while(!last) {
    const point: IPoint = { x: 500, y: 0 };
    amountOfSandUnits++;

    if(coordinates.has('500-0')) {
      amountOfSandUnits--;
      break;
    }

    while(!last) {
      if(point.y === highest + 1) {
        coordinates.add(`${point.x}-${point.y}`);
        break;
      } else if(!coordinates.has(`${point.x}-${point.y + 1}`)) {
        point.y++;
      } else if(!coordinates.has(`${point.x - 1}-${point.y + 1}`)) {
        point.y++;
        point.x--;
      } else if(!coordinates.has(`${point.x + 1}-${point.y + 1}`)) {
        point.y++;
        point.x++;
      } else {
        coordinates.add(`${point.x}-${point.y}`);
        break;
      }
    }
  }

  return amountOfSandUnits;
}

const exerciseOne = (): number => {
  const coordinates = new Set<string>();
  let highest: number;

  highest = parseInput(fileContent, coordinates);
  return emulateSandFall(coordinates, highest);
}

const exerciseTwo = (): number => {
  const coordinates = new Set<string>();
  let highest: number;

  highest = parseInput(fileContent, coordinates) + 2;

  for(let i: number = 0; i < 1000; i++) {
    coordinates.add(`${i}-${highest}`)
  }

  return emulateSandFallv2(coordinates, highest);
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());