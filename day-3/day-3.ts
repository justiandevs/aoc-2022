import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-3-input.txt', 'utf8').split('\n');
const priorityArray: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const exerciseOne = (): number => {
  let amount: number = 0;

  fileContent.map((stringOfCharacters: string) => {
    let characters: Array<string> = [];
    const length: number = stringOfCharacters.length / 2;

    const firstSubStringArray: Array<string> = stringOfCharacters.slice(0, length).split('');
    const secondSubStringArray: Array<string> = stringOfCharacters.slice(length).split('');

    firstSubStringArray.map((firstSubStringCharacter: string) => {
      if(secondSubStringArray.indexOf(firstSubStringCharacter) > -1 && characters.indexOf(firstSubStringCharacter) == -1) {
        characters.push(firstSubStringCharacter);
      }
    });

    characters.map((character: string) => {
      amount += priorityArray.indexOf(character) + 1;
    });
  });

  return amount;
}

const exerciseTwo = (): number => {
  let amount: number = 0;

  for (let i = 0; i < fileContent.length;) {
    const arrOfElements: Array<string> = fileContent.slice(i, i + 3);
    let characters: Array<string> = [];

    let firstRucksack: Array<string> = arrOfElements[0].split('');
    let secondRucksack: Array<string> = arrOfElements[1].split('');
    let thirdRucksack: Array<string> = arrOfElements[2].split('');

    firstRucksack.map((character: string) => {
      if(secondRucksack.indexOf(character) > -1 && thirdRucksack.indexOf(character) > -1 && characters.indexOf(character) == -1) {
        characters.push(character);
      }
    });

    characters.map((character: string) => {
      amount += priorityArray.indexOf(character) + 1;
    });

    i = i + 3;
  }

  return amount;
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());