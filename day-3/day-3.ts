import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-3-input.txt', 'utf8').split('\n');
const priorityArray: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const exercise = () => {
  let amount: number = 0;

  fileContent.map((stringOfCharacters) => {
    let characters: Array<string> = [];
    const length = stringOfCharacters.length / 2;

    const firstSubStringArray = stringOfCharacters.slice(0, length).split('');
    const secondSubStringArray = stringOfCharacters.slice(length).split('');

    firstSubStringArray.map((firstSubStringCharacter) => {
      if(secondSubStringArray.indexOf(firstSubStringCharacter) > -1 && characters.indexOf(firstSubStringCharacter) == -1) {
        characters.push(firstSubStringCharacter);
      }
    });

    characters.map((character) => {
      amount += priorityArray.indexOf(character) + 1;
    });
  });

  return amount;
}

console.log('exercise-one: ' + exercise());