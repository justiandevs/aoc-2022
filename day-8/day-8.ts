import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-8-input.txt', 'utf8').split('\n');

interface returnObject {
  rows: number[][],
  columns: number[][]
}

const getRowsAndColumns = (input: Array<string>): returnObject => {
  let rows: number[][] = [];
  let columns: number[][] = [];

  input.map((line: string, index: number) => {
    rows.push([]);

    line.split('').map((character, indexLine: number) => {
      if(!columns[indexLine]) {
        columns.push([]);
      }

      rows[index]?.push(parseInt(character));
      columns[indexLine]?.push(parseInt(character));
    })
  })

  return { rows, columns };
}

const exerciseOne = (): number => {
  let amount: number = 0;

  const { rows, columns } = getRowsAndColumns(fileContent);

  rows.map((row: number[], index: number) => {
    row.map((character: number, indexLine: number) => {
      if(!(index == 0 || index == rows.length - 1 || indexLine == 0 || indexLine >= columns.length - 1)) {
        const rowLeft = rows[index].slice(0, indexLine).some((value) => value >= character);
        const rowRight = rows[index].slice(indexLine + 1, rows[index].length).some((value) => value >= character);
        const columnLeft = columns[indexLine].slice(0, index).some((value) => value >= character);
        const columnRight = columns[indexLine].slice(index + 1, columns[indexLine].length).some((value) => value >= character);

        if(!rowLeft || !rowRight || !columnLeft || !columnRight) {
          amount++;
        }

      } else {
        // always visible (latest border)
        amount++;
      }
    });
  });

  return amount;
}

console.log('exercise-one: ' + exerciseOne());