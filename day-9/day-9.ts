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
  if(visitedCoordinates.indexOf(`${xPosTail},${yPosTail}`) == -1) {
    visitedCoordinates.push(`${xPosTail},${yPosTail}`);
    return false;
  } return true;
}

const moveLeft = (moves: number) => {
  for(let i = 0; i < moves; i++) {
    xPosHead -= 1;
    xPosTail = xPosHead;
    if(yPosHead > yPosTail && moves > 1) {
      yPosTail += 1;
    } else if(yPosHead < yPosTail && moves > 1) {
      yPosTail -= 1;
    }

    if(i == moves - 1) {
      xPosTail += 1;
    }

    checkIfCoordinatesAreAlreadyVisited();
  }
}

const moveRight = (moves: number) => {
  for(let i = 0; i < moves; i++) {
    xPosHead += 1;
    xPosTail = xPosHead;
    if(yPosHead > yPosTail && moves > 1) {
      yPosTail += 1;
    } else if(yPosHead < yPosTail && moves > 1) {
      yPosTail -= 1;
    }

    if(i == moves - 1) {
      xPosTail -= 1;
    }

    checkIfCoordinatesAreAlreadyVisited();
  }
}

const moveUp = (moves: number) => {
  for(let i = 0; i < moves; i++) {
    yPosHead += 1;
    yPosTail = yPosHead;
    if(xPosHead > xPosTail && moves > 1) {
      xPosTail += 1;
    } else if(xPosHead < xPosTail && moves > 1) {
      xPosTail -= 1;
    }

    if(i == moves - 1) {
      yPosTail -= 1;
    }

    checkIfCoordinatesAreAlreadyVisited();
  }
}

const moveDown = (moves: number) => {
  for(let i = 0; i < moves; i++) {
    yPosHead -= 1;
    yPosTail = yPosHead;
    if(xPosHead > xPosTail && moves > 1) {
      xPosTail += 1;
    } else if(xPosHead < xPosTail && moves > 1) {
      xPosTail -= 1;
    }

    if(i == moves - 1) {
      yPosTail += 1;
    }

    checkIfCoordinatesAreAlreadyVisited();
  }
}

const exercise = (): number => {
  let amount: number = 0;

  const instructions: string[][] = getInstructions(fileContent);

  instructions.map((instruction: string[], index: number) => {
    if(instruction[0] == "L") {
      moveLeft(parseInt(instruction[1]));
      console.log('left', xPosTail, yPosTail)
    } else if(instruction[0] == "R") {
      moveRight(parseInt(instruction[1]));
      console.log('right', xPosTail, yPosTail)
    } else if(instruction[0] == "U") {
      moveUp(parseInt(instruction[1]));
      console.log('up', xPosTail, yPosTail)
    } else {
      moveDown(parseInt(instruction[1]));
      console.log('down', xPosTail, yPosTail)
    }
  });

  console.log(xPosHead, yPosHead, visitedCoordinates);
  return amount;
}

console.log('exercise: ' + exercise());