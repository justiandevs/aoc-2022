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

const performanceExerciseOne = performance.now();
console.log('exercise-one: ' + exerciseOne());
const performanceExerciseTwo = performance.now();
console.log('exercise-two: ' + exerciseTwo());
const performanceExerciseThree = performance.now();

console.log(`exercise-one took: ${performanceExerciseTwo - performanceExerciseOne} milliseconds`);
console.log(`exercise-two took: ${performanceExerciseThree - performanceExerciseTwo} milliseconds`);