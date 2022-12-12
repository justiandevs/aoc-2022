import * as fs from 'fs';

const fileContent: string = fs.readFileSync('day-11-input.txt', 'utf8');

class Monkey {
  public items: number[];
  public operation: string;
  public modulo: number;
  public inspectedItems: number;
  public test: Array<number>;

  constructor(items: number[], operation: string, modulo: number, test: Array<number>) {
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

  blocks.map((block: string, index: number) => {
    const starting_items = block.match(/Starting items(?:[:,] (\d+))+/g)?.[0].split(': ')[1].split(', ').map(Number)!;
    const operation = block.match(/= ([^\n]+)/)?.[1]!;
    const modulo = block.match(/divisible by (\d+)/)?.[1]!;
    const testIfTrue = block.match(/If true: throw to monkey (\d+)/)?.[1]!;
    const testIfFalse = block.match(/If false: throw to monkey (\d+)/)?.[1]!;

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
        const worryLevel = Math.floor(getOperationFunction(monkey.operation)(item.toString()) / 3);

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

  return monkeys.map((monkey) => monkey.inspectedItems).sort((a, b) => b-a).slice(0, 2).reduce((a, b) => a * b);
}

console.log('exercise-one: ' + exerciseOne());
