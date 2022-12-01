import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-1-input.txt', 'utf8').split('\n\n');

const exercise = () => {
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

console.log(exercise());