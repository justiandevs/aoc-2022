import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-10-input.txt', 'utf8').split('\n');

const checkCycleRounds = (signalStrength: number[], cycle: number, x: number): number[] => {
  const rounds: number[] = [20, 60, 100, 140, 180, 220];

  if(rounds.indexOf(cycle) > -1) {
    signalStrength.push(cycle * x);
  }
  return signalStrength;
}

const exerciseOne = (): number => {
  let x: number = 1;
  let cycle: number = 0;
  let signalStrength: number[] = [];

  fileContent.map((line: string) => {
    const arr: string[] = line.split(' ');
    const [instruction, amount] = [arr[0], parseInt(arr[1])];

    if(instruction === "addx") {
      const cycleRounds: number = 2;
      for(let i = 0; i < cycleRounds; i++ ) {
        cycle++;
        checkCycleRounds(signalStrength, cycle, x);
      }
      x += amount;
    } else {
      cycle++;
      checkCycleRounds(signalStrength, cycle, x);
    }
  });

  return signalStrength.reduce((a, b) => a + b);
}

const exerciseTwo = (): string[] => {
  let x: number = 1;
  let view: string[] = [];
  const result: string[] = [];

  const pushCorrectElementToView = (): void=> {
    if(Math.abs(x - view.length % 40) <= 1) {
      view.push('#');
    } else {
      view.push('.');
    }
  }

  fileContent.map((line: string) => {
    const arr: string[] = line.split(' ');
    const [instruction, amount] = [arr[0], parseInt(arr[1])];

    if(instruction === "addx") {
      const cycleRounds: number = 2;
      for(let i = 0; i < cycleRounds; i++ ) {
        pushCorrectElementToView();
      }
      x += amount;
    } else {
      pushCorrectElementToView();
    }
  });

  for(let i: number = 0; i < 241; i += 40) {
    result.push(view.join('').substring(i,i + 40));
  }

  return result;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: \n' + exerciseTwo().map((line: string) => line).join("\n"));