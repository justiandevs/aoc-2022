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
const fileContent = fs.readFileSync('day-9-input.txt', 'utf8').split('\n');
let headCoordinate = {
    x: 0,
    y: 0
};
let tailCoordinate = {
    x: 0,
    y: 0
};
let visitedCoordinates = new Set();
const getInstructions = (arr) => {
    let instructions = [];
    arr.map((line) => {
        instructions.push(line.split(' ').filter((element) => element != ' '));
    });
    return instructions;
};
const moveTail = () => {
    const distance = Math.max(Math.abs(tailCoordinate.x - headCoordinate.x), Math.abs(tailCoordinate.y - headCoordinate.y));
    if (distance > 1) {
        const x = headCoordinate.x - tailCoordinate.x;
        const y = headCoordinate.y - tailCoordinate.y;
        tailCoordinate.x += Math.abs(x) == 2 ? x / 2 : x;
        tailCoordinate.y += Math.abs(y) == 2 ? y / 2 : y;
        visitedCoordinates.add(`${tailCoordinate.x},${tailCoordinate.y}`);
    }
};
const exerciseOne = () => {
    const instructions = getInstructions(fileContent);
    visitedCoordinates.add(`0,0`);
    instructions.map((instruction, index) => {
        if (instruction[0] == "L") {
            for (let i = 0; i < parseInt(instruction[1]); i++) {
                headCoordinate.x--;
                moveTail();
            }
        }
        else if (instruction[0] == "R") {
            for (let i = 0; i < parseInt(instruction[1]); i++) {
                headCoordinate.x++;
                moveTail();
            }
        }
        else if (instruction[0] == "U") {
            for (let i = 0; i < parseInt(instruction[1]); i++) {
                headCoordinate.y++;
                moveTail();
            }
        }
        else if (instruction[0] == "D") {
            for (let i = 0; i < parseInt(instruction[1]); i++) {
                headCoordinate.y--;
                moveTail();
            }
        }
    });
    return visitedCoordinates.size;
};
const exerciseTwo = () => {
    let amount = 0;
    return amount;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
