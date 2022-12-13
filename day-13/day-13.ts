import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-13-input.txt', 'utf8').split('\n');

interface IPackets {
  [key: number]: number[][];
}

const parseInput = (input: string[]): IPackets => {
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

const parseInputv2 = (input: string[]): IPackets => {
  let index: number = 1;
  const packets: IPackets= {};
  const filteredArrays = input.filter((value: string) => value != '');

  for(let i: number = 0; i < filteredArrays.length; i++) {
    packets[index] = JSON.parse(filteredArrays[i]);
    index++;
  }

  return packets;
}

const compareArray = (first: any, second: any): boolean | undefined => {
  if(first === undefined) return true;
  if(second === undefined) return false;

  const maxLength = Math.max(first.length, second.length);

  if(Number.isInteger(first) && Number.isInteger(second)) {
    if(first > second) return false;
    if(first < second) return true;
    return undefined;
  }

  if(!Array.isArray(first)) {
    return compareArray([first], second);
  }

  if(!Array.isArray(second)) {
    return compareArray(first, [second]);
  }

  for(let i: number = 0; i < maxLength; i++) {
    const test = compareArray(first[i], second[i])
    if(test !== undefined) return test;
  }
}

const exerciseOne = (): number => {
  let amount: number = 0;

  const packets: IPackets = parseInput(fileContent);

  Object.keys(packets).map((key: string) => {
    const currentArray: number[][] = packets[parseInt(key)];

    if(compareArray(currentArray[0], currentArray[1])) {
      amount += parseInt(key);
    }
  })

  return amount;
}

const exerciseTwo = (): number => {
  const packets: IPackets = parseInputv2(fileContent);

  packets[301] = [[2]];
  packets[302] = [[6]];

  const packetsArray: string[] = Object.keys(packets).sort((a, b) => compareArray(packets[parseInt(a)], packets[parseInt(b)]) ? -1 : 1);

  const findPackage2: number = packetsArray.findIndex((item) => item === "301") + 1;
  const findPackage6: number = packetsArray.findIndex((item) => item === "302") + 1;

  return findPackage2 * findPackage6;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());