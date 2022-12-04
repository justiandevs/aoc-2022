import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-4-input.txt', 'utf8').split('\n');

const transformArray = (line: string) => {
  const baseArray: Array<string> = line.split(',');
  const firstRange: Array<string> = baseArray[0].split('-');
  const secondRange: Array<string> = baseArray[1].split('-');

  return [[parseInt(firstRange[0]), parseInt(firstRange[1])], [parseInt(secondRange[0]), parseInt(secondRange[1])]];
}

const exerciseOne = (): number => {
  let amount: number = 0;

  fileContent.map((line: string) => {
    const transformedArray = transformArray(line);

    if(transformedArray[0][0] >= transformedArray[1][0] && transformedArray[0][1] <= transformedArray[1][1] || transformedArray[1][0] >= transformedArray[0][0] && transformedArray[1][1] <= transformedArray[0][1]) {
      amount += 1;
    }
  });

  return amount;
}

const exerciseTwo = (): number => {
  let amount: number = 0;

  fileContent.map((line: string) => {
    const transformedArray = transformArray(line);

    if(!(transformedArray[0][1] < transformedArray[1][0] || transformedArray[0][0] > transformedArray[1][1])) {
      amount += 1;
    }
  })

  return amount;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());