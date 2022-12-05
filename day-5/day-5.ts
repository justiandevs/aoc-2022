import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-5-input.txt', 'utf8').split('\n');

const index = fileContent.indexOf('');
const crates = fileContent.slice(0, index);
const instructions = fileContent.slice(index + 1);

const rowOfCrateNumbers = crates[index-1].split('').filter((value) => value != ' ').map((str) => parseInt(str));

const instructionSets = instructions.map((instruction) => {
  const instructionSet = instruction.split('move').toString().split('from').toString().split('to').toString().split(',');

  return [parseInt(instructionSet[1]), parseInt(instructionSet[2]), parseInt(instructionSet[3])];
});

const array = Array.from({ length: index }, (_, ind) =>
    crates.map((line) => line[ind * 4 + 1]).filter((char) => char != " ").filter((char) => char != `${ind + 1}`).reverse().join("")).map((line) => line.toString().split(''));

const moveOneCrate = (instruction: Array<number>) => {
  for(let i = 0; i < instruction[0]; i++) {
    const arr = array[(instruction[1]-1)].pop()!;
    array[(instruction[2]-1)].push(arr);
  }
}

const getTopCrates = () => {
  let message: string = "";

  array.map((list) => {
    message = message + list[list.length - 1];
  });

  return message;
}

const exercise = (): string => {
  instructionSets.map((instruction) => {
    moveOneCrate(instruction);
  });

  return getTopCrates();
}

console.log('exercise-one: ' + exercise());