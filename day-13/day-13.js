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
const fileContent = fs.readFileSync('day-13-input.txt', 'utf8').split('\n');
const parseInput = (input) => {
    let index = 1;
    const packets = {};
    const filteredArrays = input.filter((value) => value != '');
    for (let i = 0; i < filteredArrays.length; i += 2) {
        packets[index] = [];
        packets[index].push(JSON.parse(filteredArrays[i]));
        packets[index].push(JSON.parse(filteredArrays[i + 1]));
        index++;
    }
    return packets;
};
const compareArray = (first, second) => {
    if (first === undefined)
        return true;
    if (second === undefined)
        return false;
    const maxLength = Math.max(first.length, second.length);
    if (Number.isInteger(first) && Number.isInteger(second)) {
        if (first > second)
            return false;
        if (first < second)
            return true;
        return undefined;
    }
    if (!Array.isArray(first)) {
        return compareArray([first], second);
    }
    if (!Array.isArray(second)) {
        return compareArray(first, [second]);
    }
    for (let i = 0; i < maxLength; i++) {
        const test = compareArray(first[i], second[i]);
        if (test !== undefined)
            return test;
    }
};
const exerciseOne = () => {
    let amount = 0;
    const packets = parseInput(fileContent);
    Object.keys(packets).map((key) => {
        const currentArray = packets[parseInt(key)];
        if (compareArray(currentArray[0], currentArray[1])) {
            amount += parseInt(key);
        }
    });
    return amount;
};
const exerciseTwo = () => {
    let amount = 0;
    return amount;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
