import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-9-input.txt', 'utf8').split('\n');

interface Coordinate {
  x: number,
  y: number
}

let headCoordinate: Coordinate = {
  x: 0,
  y: 0
};

let tailCoordinate: Coordinate = {
  x: 0,
  y: 0
}

let visitedCoordinates: Set<string> = new Set<string>();

const getInstructions = (arr: string[]) => {
  let instructions: string[][] = [];

  arr.map((line) => {
    instructions.push(line.split(' ').filter((element) => element != ' '));
  });

  return instructions;
}

const moveTail = () => {
  const distance = Math.max(
    Math.abs(tailCoordinate.x - headCoordinate.x),
    Math.abs(tailCoordinate.y - headCoordinate.y)
  )

  if(distance > 1) {
    const x = headCoordinate.x - tailCoordinate.x;
    const y = headCoordinate.y - tailCoordinate.y;

    tailCoordinate.x += Math.abs(x) == 2 ? x / 2 : x;
    tailCoordinate.y += Math.abs(y) == 2 ? y / 2 : y;
    visitedCoordinates.add(`${tailCoordinate.x},${tailCoordinate.y}`);
  }
}

const exerciseOne = (): number => {
  const instructions: string[][] = getInstructions(fileContent);

  visitedCoordinates.add(`0,0`);

  instructions.map((instruction: string[], index: number) => {
    if(instruction[0] == "L") {
      for(let i: number = 0; i < parseInt(instruction[1]); i++) {
        headCoordinate.x--;
        moveTail();
      }
    } else if(instruction[0] == "R") {
      for(let i: number = 0; i < parseInt(instruction[1]); i++) {
        headCoordinate.x++;
        moveTail();
      }
    } else if(instruction[0] == "U") {
      for(let i: number = 0; i < parseInt(instruction[1]); i++) {
        headCoordinate.y++;
        moveTail()
      }
    } else if(instruction[0] == "D") {
      for(let i: number = 0; i < parseInt(instruction[1]); i++) {
        headCoordinate.y--;
        moveTail();
      }
    }
  });

  return visitedCoordinates.size;
}

const exerciseTwo = (): number => {
  let amount: number = 0;

  return amount;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());