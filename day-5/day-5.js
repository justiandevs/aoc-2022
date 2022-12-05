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
const fileContent = fs.readFileSync('day-5-input.txt', 'utf8').split('\n');
const index = fileContent.indexOf('');
const crates = fileContent.slice(0, index);
const instructions = fileContent.slice(index + 1);
const instructionSets = instructions.map((instruction) => {
    const instructionSet = instruction.split('move').toString().split('from').toString().split('to').toString().split(',');
    return [parseInt(instructionSet[1]), parseInt(instructionSet[2]), parseInt(instructionSet[3])];
});
const array = Array.from({ length: index }, (_, ind) => crates.map((line) => line[ind * 4 + 1]).filter((char) => char != " ").filter((char) => char != `${ind + 1}`).reverse().join("")).map((line) => line.toString().split(''));
const deepCopy = JSON.parse(JSON.stringify(array));
const moveOneCrate = (instruction, arr) => {
    for (let i = 0; i < instruction[0]; i++) {
        const arrRemovedItem = arr[(instruction[1] - 1)].pop();
        arr[(instruction[2] - 1)].push(arrRemovedItem);
    }
};
const moveMultipleCrates = (instruction, arr) => {
    let finalArray = [];
    for (let i = 0; i < instruction[0]; i++) {
        const arrRemovedItem = arr[(instruction[1] - 1)].pop();
        finalArray.push(arrRemovedItem);
    }
    arr[(instruction[2] - 1)].push(...finalArray.reverse());
};
const getTopCrates = (arr) => {
    let message = "";
    arr.map((list) => {
        message = message + list[list.length - 1];
    });
    return message;
};
const exerciseOne = () => {
    instructionSets.map((instruction) => {
        moveOneCrate(instruction, array);
    });
    return getTopCrates(array);
};
const exerciseTwo = () => {
    instructionSets.map((instruction) => {
        moveMultipleCrates(instruction, deepCopy);
    });
    return getTopCrates(deepCopy);
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
