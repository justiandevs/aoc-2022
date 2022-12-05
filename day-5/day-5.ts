import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-5-input.txt', 'utf8').split('\n');

const index: number = fileContent.indexOf('');
const crates: Array<string> = fileContent.slice(0, index);
const instructions: Array<string> = fileContent.slice(index + 1);

const instructionSets = instructions.map((instruction: string): Array<number> => {
  const instructionSet = instruction.split('move').toString().split('from').toString().split('to').toString().split(',');

  return [parseInt(instructionSet[1]), parseInt(instructionSet[2]), parseInt(instructionSet[3])];
});

const array: Array<Array<string>> = Array.from({ length: index }, (_, ind): string =>
    crates.map((line) => line[ind * 4 + 1]).filter((char) => char != " ").filter((char) => char != `${ind + 1}`).reverse().join("")).map((line) => line.toString().split(''));

const deepCopy: Array<Array<string>> = JSON.parse(JSON.stringify(array));

const moveOneCrate = (instruction: Array<number>, arr: Array<Array<string>>) => {
  for(let i: number = 0; i < instruction[0]; i++) {
    const arrRemovedItem = arr[(instruction[1]-1)].pop()!;
    arr[(instruction[2]-1)].push(arrRemovedItem);
  }
}

const moveMultipleCrates = (instruction: Array<number>, arr: Array<Array<string>>) => {
  let finalArray: Array<string> = [];

  for(let i: number = 0; i < instruction[0]; i++) {
    const arrRemovedItem = arr[(instruction[1]-1)].pop()!;
    finalArray.push(arrRemovedItem);
  }

  arr[(instruction[2]-1)].push(...finalArray.reverse());
}

const getTopCrates = (arr: Array<Array<string>>): string => {
  let message: string = "";

  arr.map((list: Array<string>) => {
    message = message + list[list.length - 1];
  });

  return message;
}

const exerciseOne = (): string => {
  instructionSets.map((instruction: Array<number>) => {
    moveOneCrate(instruction, array);
  });

  return getTopCrates(array);
}

const exerciseTwo = (): string => {
  instructionSets.map((instruction: Array<number>) => {
    moveMultipleCrates(instruction, deepCopy);
  })

  return getTopCrates(deepCopy);
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());