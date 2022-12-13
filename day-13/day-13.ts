import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-13-input.txt', 'utf8').split('\n');

interface IPackets {
  [key: number]: number[][];
}

const parseInput = (input: string[]): IPackets => {
  let output: string[] = input;
  let index: number = 1;

  const packets: IPackets= {};

  const filteredArrays = input.filter((value: string) => value != '');

  for(let i: number = 0; i < filteredArrays.length; i+=2) {
    packets[index] = [];
    packets[index].push(JSON.parse(filteredArrays[i]));
    packets[index].push(JSON.parse(filteredArrays[i+1]));
    index++;
  }

  return packets;
}

const exerciseOne = (): number => {
  let amount: number = 0;

  const packets = parseInput(fileContent);
  console.log(packets);

  return amount;
}

const exerciseTwo = (): number => {
  let amount: number = 0;

  return amount;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());