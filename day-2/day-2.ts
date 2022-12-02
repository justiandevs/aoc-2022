import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-2-input.txt', 'utf8').split('\n');

interface IExercise {
  [key: string]: number;
}

interface IDraw {
  [key: string]: IExercise;
}

interface IPoint {
  [key: string]: IDraw;
}

const points: IPoint = {
  "A": {
    "X": {
      "exerciseOne": 4,
      "exerciseTwo": 3
    },
    "Y": {
      "exerciseOne": 8,
      "exerciseTwo": 4
    },
    "Z": {
      "exerciseOne": 3,
      "exerciseTwo": 8
    },
  },
  "B": {
    "X": {
      "exerciseOne": 1,
      "exerciseTwo": 1
    },
    "Y": {
      "exerciseOne": 5,
      "exerciseTwo": 5
    },
    "Z": {
      "exerciseOne": 9,
      "exerciseTwo": 9
    }
  },
  "C": {
    "X": {
      "exerciseOne": 7,
      "exerciseTwo": 2
    },
    "Y": {
      "exerciseOne": 2,
      "exerciseTwo": 6,
    },
    "Z": {
      "exerciseOne": 6,
      "exerciseTwo": 7
    }
  }
}

const baseExercise = (exercise: string): number => {
  let amount: number = 0;

  fileContent.map((singleGame: string) => {
    let array: Array<string> = singleGame.split("").filter((element) => element != ' ');
    amount = amount + points[array[0]][array[1]][exercise];
  });

  return amount;
}

console.log('exercise-one: ' + baseExercise("exerciseOne"));
console.log('exercise-two: ' + baseExercise("exerciseTwo"));