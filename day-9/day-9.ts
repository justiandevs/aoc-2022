import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-9-test-input.txt', 'utf8').split('\n');

const getInstructions = (arr: string[]) => {
  let instructions: string[][] = [];

  arr.map((line) => {
    instructions.push(line.split('').filter((element) => element != ' '));
  });

  return instructions;
}

const exercise = (): number => {
  let amount: number = 0;

  const instructions: string[][] = getInstructions(fileContent);
  console.log(instructions);

  return amount;
}

console.log('exercise: ' + exercise());