import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-2-input.txt', 'utf8').split('\n');

const exerciseOne = () => {
  let amount = 0;

  fileContent.map((singleGame) => {
    let array = singleGame.split("").filter((element) => element != ' ');

    switch(array.toString()) {
      case 'A,X':
        amount += 4;
        break
      case 'A,Y':
        amount += 8;
        break
      case 'A,Z':
        amount += 3;
        break
      case 'B,X':
        amount += 1;
        break
      case 'B,Y':
        amount += 5;
        break
      case 'B,Z':
        amount += 9;
        break
      case 'C,X':
        amount += 7;
        break
      case 'C,Y':
        amount += 2;
        break
      case 'C,Z':
        amount += 6;
        break
    }
  });

  return amount;
}

const exerciseTwo = () => {
  let amount = 0;

  fileContent.map((singleGame) => {
    let array = singleGame.split("").filter((element) => element != ' ');

    switch(array.toString()) {
      case 'A,X':
        amount += 3;
        break
      case 'A,Y':
        amount += 4;
        break
      case 'A,Z':
        amount += 8;
        break
      case 'B,X':
        amount += 1;
        break
      case 'B,Y':
        amount += 5;
        break
      case 'B,Z':
        amount += 9;
        break
      case 'C,X':
        amount += 2;
        break
      case 'C,Y':
        amount += 6;
        break
      case 'C,Z':
        amount += 7;
        break
    }
  });

  return amount;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());