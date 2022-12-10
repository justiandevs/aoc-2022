import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-10-input.txt', 'utf8').split('\n');

const checkCycleRounds = (signalStrength: number[], cycle: number, x: number) => {
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

  fileContent.map((line) => {
    const arr = line.split(' ');
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

console.log('exercise-one: ' + exerciseOne());