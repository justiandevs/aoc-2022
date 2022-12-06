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
const fileContent = fs.readFileSync('day-6-input.txt', 'utf8').split('\n');
const arrayWithLetters = fileContent.toString().split('');
const countInArray = (array, what) => {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
};
const baseExercise = (int) => {
    let amount = 0;
    for (let i = int; i < arrayWithLetters.length; i++) {
        const testArray = arrayWithLetters.slice(i - int, i);
        let count = 0;
        testArray.forEach((string, index) => {
            if (countInArray(testArray, testArray[index]) == 1) {
                count++;
            }
        });
        if (count == int) {
            amount = i;
            break;
        }
    }
    return amount;
};
console.log('exercise-one: ' + baseExercise(4));
console.log('exercise-two: ' + baseExercise(14));
