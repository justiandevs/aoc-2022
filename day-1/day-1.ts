import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-1-input.txt', 'utf8').split('\n\n');

const exerciseOne = (): number => {
  let highestTotalCalories: number = 0;

  for (let i in fileContent) {
    const collectionOfAllCaloriesOfOneElf: Array<string> = fileContent[i].split('\n');
    let amountOfCaloriesOfOneElf = 0;

    for (let j in collectionOfAllCaloriesOfOneElf) {
      amountOfCaloriesOfOneElf = amountOfCaloriesOfOneElf + parseInt(collectionOfAllCaloriesOfOneElf[j]);
    }

    if(amountOfCaloriesOfOneElf > highestTotalCalories) {
      highestTotalCalories = amountOfCaloriesOfOneElf;
    }
  }

  return highestTotalCalories;
}

const exerciseTwo = (): number => {
  let highestTotalCalories: number = 0;
  let collectionOfTotalCaloriesOfEveryElf: Array<number> = [];

  for (let i in fileContent) {
    const collectionOfAllCaloriesOfOneElf: Array<string> = fileContent[i].split('\n');
    let amountOfCaloriesOfOneElf = 0;

    for (let j in collectionOfAllCaloriesOfOneElf) {
      amountOfCaloriesOfOneElf = amountOfCaloriesOfOneElf + parseInt(collectionOfAllCaloriesOfOneElf[j]);
    }

    collectionOfTotalCaloriesOfEveryElf.push(amountOfCaloriesOfOneElf);
  }

  collectionOfTotalCaloriesOfEveryElf.sort((a, b) => a - b).slice(-3).map((topResult) => highestTotalCalories = highestTotalCalories + topResult);

  return highestTotalCalories;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());