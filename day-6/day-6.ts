import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-6-input.txt', 'utf8').split('\n');
const arrayWithLetters: string[] = fileContent.toString().split('');

const countInArray = (array: string[], what: string): number => {
  let count: number = 0;

  for (let i: number = 0; i < array.length; i++) {
    if (array[i] === what) {
      count++;
    }
  }

  return count;
}

const baseExercise = (int: number): number => {
  let amount: number = 0;

  for(let i: number = int; i < arrayWithLetters.length; i++) {
    const testArray: string[] = arrayWithLetters.slice(i - int, i);
    let count: number = 0;

    testArray.forEach((string: string, index: number) => {
      if(countInArray(testArray, testArray[index]) == 1) {
        count++;
      }
    })

    if(count == int) {
      amount = i;
      break;
    }
  }

  return amount;
}

console.log('exercise-one: ' + baseExercise(4));
console.log('exercise-two: ' + baseExercise(14));