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
    let output = input;
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
const exerciseOne = () => {
    let amount = 0;
    const packets = parseInput(fileContent);
    console.log(packets);
    return amount;
};
const exerciseTwo = () => {
    let amount = 0;
    return amount;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
