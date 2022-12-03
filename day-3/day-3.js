"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const fileContent = fs.readFileSync('day-3-input.txt', 'utf8').split('\n');
const priorityArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const exerciseOne = () => {
    let amount = 0;
    fileContent.map((stringOfCharacters) => {
        let characters = [];
        const length = stringOfCharacters.length / 2;
        const firstSubStringArray = stringOfCharacters.slice(0, length).split('');
        const secondSubStringArray = stringOfCharacters.slice(length).split('');
        firstSubStringArray.map((firstSubStringCharacter) => {
            if (secondSubStringArray.indexOf(firstSubStringCharacter) > -1 && characters.indexOf(firstSubStringCharacter) == -1) {
                characters.push(firstSubStringCharacter);
            }
        });
        characters.map((character) => {
            amount += priorityArray.indexOf(character) + 1;
        });
    });
    return amount;
};
const exerciseTwo = () => {
    let amount = 0;
    for (let i = 0; i < fileContent.length;) {
        const arrOfElements = fileContent.slice(i, i + 3);
        let characters = [];
        let firstRucksack = arrOfElements[0].split('');
        let secondRucksack = arrOfElements[1].split('');
        let thirdRucksack = arrOfElements[2].split('');
        firstRucksack.map((character) => {
            if (secondRucksack.indexOf(character) > -1 && thirdRucksack.indexOf(character) > -1 && characters.indexOf(character) == -1) {
                characters.push(character);
            }
        });
        characters.map((character) => {
            amount += priorityArray.indexOf(character) + 1;
        });
        i = i + 3;
    }
    return amount;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
