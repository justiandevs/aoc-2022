import * as fs from 'fs';

const fileContent: string = fs.readFileSync('day-11-input.txt', 'utf8');

interface IMonkey {
  items: number[];
  operation: string;
  modulo: number;
  inspectedItems: number;
  test: number[];
}

class Monkey implements IMonkey {
  public items: number[];
  public operation: string;
  public modulo: number;
  public inspectedItems: number;
  public test: number[];

  constructor(items: number[], operation: string, modulo: number, test: number[]) {
    this.items = items;
    this.operation = operation;
    this.modulo = modulo;
    this.test = test;
    this.inspectedItems = 0;
  }
}

function getOperationFunction(input: string) {
  return function (old: string) {
    const string = input.replace(/old/, old);
    return eval(string);
  };
}

const parseInput = (input: string, monkeys: Monkey[]): void => {
  const blocks: string[] = input.split('\n\n');

  blocks.map((block: string) => {
    const starting_items: number[] = block.match(/Starting items(?:[:,] (\d+))+/g)?.[0].split(': ')[1].split(', ').map(Number)!;
    const operation: string = block.match(/= ([^\n]+)/)?.[1]!;
    const modulo: string = block.match(/divisible by (\d+)/)?.[1]!;
    const testIfTrue: string = block.match(/If true: throw to monkey (\d+)/)?.[1]!;
    const testIfFalse: string = block.match(/If false: throw to monkey (\d+)/)?.[1]!;

    const test = [parseInt(testIfTrue), parseInt(testIfFalse)];

    const monkey = new Monkey(
      starting_items, operation, parseInt(modulo), test,
    )

    monkeys.push(monkey);
  });
}

const exerciseOne = (): number => {
  let monkeys: Monkey[] = [];

  parseInput(fileContent, monkeys);

  for(let rounds: number = 0; rounds < 20; rounds++) {
    monkeys.map((monkey: Monkey) => {
      monkey.items.map((item: number) => {
        const worryLevel: number = Math.floor(getOperationFunction(monkey.operation)(item.toString()) / 3);

        if(worryLevel % monkey.modulo == 0) {
          monkeys[monkey.test[0]].items.push(worryLevel);
        } else {
          monkeys[monkey.test[1]].items.push(worryLevel);
        }

        monkey.inspectedItems++;
      });

      monkey.items = [];
    });
  }

  return monkeys.map((monkey: Monkey) => monkey.inspectedItems).sort((a, b) => b-a).slice(0, 2).reduce((a, b) => a * b);
}

const exerciseTwo = (): number => {
  let monkeys: Monkey[] = [];

  parseInput(fileContent, monkeys);

  const divider = monkeys.map((monkey: Monkey) => monkey.modulo).reduce((a, b) => a * b, 1);

  for(let rounds: number = 0; rounds < 10000; rounds++) {
    monkeys.map((monkey: Monkey) => {
      monkey.items.map((item: number) => {
        let worryLevel: number = Math.floor(getOperationFunction(monkey.operation)(item.toString()));
        worryLevel = worryLevel % divider;

        if(worryLevel % monkey.modulo == 0) {
          monkeys[monkey.test[0]].items.push(worryLevel);
        } else {
          monkeys[monkey.test[1]].items.push(worryLevel);
        }

        monkey.inspectedItems++;
      });

      monkey.items = [];
    });
  }

  return monkeys.map((monkey: Monkey) => monkey.inspectedItems).sort((a, b) => b-a).slice(0, 2).reduce((a, b) => a * b);
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
