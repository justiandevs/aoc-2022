import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-1-input.txt', 'utf8').split('\n\n');

const exerciseOne = () => {
  const highestTotalCalories = fileContent.map((singleElf) => singleElf.split('\n').reduce((a,b) => a + parseInt(b), 0)).sort((a, b) => a - b).slice(-1);

  return highestTotalCalories;
}

const exerciseTwo = () => {
  const highestTotalCalories = fileContent.map((singleElf) => singleElf.split('\n').reduce((a, b) => a + parseInt(b), 0)).sort((a, b) => a - b).slice(-3).reduce((a, b) => a + b);

  return highestTotalCalories;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());