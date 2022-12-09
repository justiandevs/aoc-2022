import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-9-test-input.txt', 'utf8').split('\n');

let yPosHead: number = 0;
let xPosHead: number = 0;
let yPosTail: number = 0;
let xPosTail: number = 0;
let visitedCoordinates: string[] = ['0,0'];

const getInstructions = (arr: string[]) => {
  let instructions: string[][] = [];

  arr.map((line) => {
    instructions.push(line.split('').filter((element) => element != ' '));
  });

  return instructions;
}

const checkIfCoordinatesAreAlreadyVisited = (): boolean => {
  if(visitedCoordinates.indexOf(`${xPosHead},${yPosHead}`) == -1) {
    visitedCoordinates.push(`${xPosHead},${yPosHead}`);
    return false;
  } return true;
}

const moveLeft = (moves: number) => {
  console.log('move left', moves);
  for(let i = 0; i < moves; i++) {
    xPosHead -= 1;
    checkIfCoordinatesAreAlreadyVisited();
  }
}

const moveRight = (moves: number) => {
  console.log('move right', moves);
  for(let i = 0; i < moves; i++) {
    xPosHead += 1;
    checkIfCoordinatesAreAlreadyVisited();
  }
}

const moveUp = (moves: number) => {
  console.log('move up', moves);
  for(let i = 0; i < moves; i++) {
    yPosHead += 1;
    checkIfCoordinatesAreAlreadyVisited();
  }
}

const moveDown = (moves: number) => {
  console.log('move down', moves);
  for(let i = 0; i < moves; i++) {
    yPosHead -= 1;
    checkIfCoordinatesAreAlreadyVisited();
  }
}

const exercise = (): number => {
  let amount: number = 0;

  const instructions: string[][] = getInstructions(fileContent);

  instructions.map((instruction: string[], index: number) => {
    if(instruction[0] == "L") {
      moveLeft(parseInt(instruction[1]));
    } else if(instruction[0] == "R") {
      moveRight(parseInt(instruction[1]));
    } else if(instruction[0] == "U") {
      moveUp(parseInt(instruction[1]));
    } else {
      moveDown(parseInt(instruction[1]));
    }
  });

  console.log(xPosHead, yPosHead, visitedCoordinates.length);
  return amount;
}

console.log('exercise: ' + exercise());