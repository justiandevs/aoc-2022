import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-1-input.txt', 'utf8').split('\n\n');

const baseResult = (slice: number): Array<number> => {
  return fileContent.map((singleElf: string): number => singleElf.split('\n').reduce((a: number, b: string): number => a + parseInt(b), 0)).sort((a: number, b: number): number => a - b).slice(slice);
}

const exerciseOne = (): string => {
  return baseResult(-1).toString();
}

const exerciseTwo = (): string => {
  return baseResult(-3).reduce((a: number, b: number) => a + b).toString();
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());