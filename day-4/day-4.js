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
const fileContent = fs.readFileSync('day-4-input.txt', 'utf8').split('\n');
const transformArray = (line) => {
    const baseArray = line.split(',');
    const firstRange = baseArray[0].split('-');
    const secondRange = baseArray[1].split('-');
    return [[parseInt(firstRange[0]), parseInt(firstRange[1])], [parseInt(secondRange[0]), parseInt(secondRange[1])]];
};
const exerciseOne = () => {
    let amount = 0;
    fileContent.map((line) => {
        const transformedArray = transformArray(line);
        if (transformedArray[0][0] >= transformedArray[1][0] && transformedArray[0][1] <= transformedArray[1][1] || transformedArray[1][0] >= transformedArray[0][0] && transformedArray[1][1] <= transformedArray[0][1]) {
            amount += 1;
        }
    });
    return amount;
};
const exerciseTwo = () => {
    let amount = 0;
    fileContent.map((line) => {
        const transformedArray = transformArray(line);
        if ((transformedArray[0][0] >= transformedArray[1][0] && transformedArray[0][1] <= transformedArray[1][1]) || (transformedArray[1][0] >= transformedArray[0][0] && transformedArray[1][1] <= transformedArray[0][1]) ||
            transformedArray[0][0] == transformedArray[1][0] || transformedArray[0][0] == transformedArray[1][1] || transformedArray[0][1] == transformedArray[1][0] || transformedArray[0][1] == transformedArray[1][1] ||
            (transformedArray[0][0] < transformedArray[1][0] && transformedArray[0][1] < transformedArray[1][1] && transformedArray[0][1] > transformedArray[1][0]) ||
            (transformedArray[1][0] < transformedArray[0][0] && transformedArray[1][1] < transformedArray[0][1] && transformedArray[1][1] > transformedArray[0][0])) {
            amount += 1;
        }
    });
    return amount;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
