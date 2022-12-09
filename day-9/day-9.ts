import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-9-input.txt', 'utf8').split('\n');

const getInstructions = (arr: string[]) => {
  let instructions: string[][] = [];

  arr.map((line: string) => {
    instructions.push(line.split(' ').filter((element: string) => element != ' '));
  });

  return instructions;
}

interface IKnot {
  x: number,
  y: number,
  move: (direction: string) => void,
  moveNeighbour: (knot: Knot) => void
}

class Knot implements IKnot {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(direction: string) {
    if(direction == "L") {
      this.x--;
    } else if(direction == "R") {
      this.x++;
    } else if(direction == "U") {
      this.y++;
    } else if(direction == "D") {
      this.y--;
    }
  }

  moveNeighbour = (knot: Knot) => {
    const distance: number = Math.max(
      Math.abs(knot.x - this.x),
      Math.abs(knot.y - this.y)
    )

    if(distance > 1) {
      const x: number = knot.x - this.x;
      const y: number = knot.y - this.y;

      this.x += Math.abs(x) == 2 ? x / 2 : x;
      this.y += Math.abs(y) == 2 ? y / 2 : y;
    }
  }
}

const exerciseOne = (): number => {
  const instructions: string[][] = getInstructions(fileContent);
  const visitedCoordinates: Set<string> = new Set<string>();

  const firstKnot: Knot = new Knot(0,0);
  const secondKnot: Knot = new Knot(0, 0);

  instructions.map((instruction: string[]) => {
    for(let i: number = 0; i < parseInt(instruction[1]); i++) {
      firstKnot.move(instruction[0]);
      secondKnot.moveNeighbour(firstKnot);
      visitedCoordinates.add(`${secondKnot.x},${secondKnot.y}`);
    }
  });

  return visitedCoordinates.size;
}

const exerciseTwo = (): number => {
  const instructions: string[][] = getInstructions(fileContent);
  let visitedCoordinates: Set<string> = new Set<string>();

  const arr: Knot[] = [new Knot(0, 0), new Knot(0,0), new Knot(0, 0), new Knot(0,0), new Knot(0, 0), new Knot(0,0), new Knot(0, 0), new Knot(0,0), new Knot(0, 0), new Knot(0,0)];

  instructions.map((instruction: string[]) => {
    for(let i: number = 0; i < parseInt(instruction[1]); i++) {
      arr[0].move(instruction[0]);

      for(let knot = 1; knot < arr.length; knot++) {
        const point: Knot = arr[knot];
        point.moveNeighbour(arr[knot-1]);
      }

      const lastKnot: Knot = arr.slice(-1)[0];
      visitedCoordinates.add(`${lastKnot.x},${lastKnot.y}`);
    }
  });

  return visitedCoordinates.size;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());