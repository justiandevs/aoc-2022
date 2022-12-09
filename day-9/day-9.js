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
const fileContent = fs.readFileSync('day-9-test-input.txt', 'utf8').split('\n');
let yPosHead = 0;
let xPosHead = 0;
let yPosTail = 0;
let xPosTail = 0;
let visitedCoordinates = ['0,0'];
const getInstructions = (arr) => {
    let instructions = [];
    arr.map((line) => {
        instructions.push(line.split('').filter((element) => element != ' '));
    });
    return instructions;
};
const checkIfCoordinatesAreAlreadyVisited = () => {
    if (visitedCoordinates.indexOf(`${xPosHead},${yPosHead}`) == -1) {
        visitedCoordinates.push(`${xPosHead},${yPosHead}`);
        return false;
    }
    return true;
};
const moveLeft = (moves) => {
    console.log('move left', moves);
    for (let i = 0; i < moves; i++) {
        xPosHead -= 1;
        checkIfCoordinatesAreAlreadyVisited();
    }
};
const moveRight = (moves) => {
    console.log('move right', moves);
    for (let i = 0; i < moves; i++) {
        xPosHead += 1;
        checkIfCoordinatesAreAlreadyVisited();
    }
};
const moveUp = (moves) => {
    console.log('move up', moves);
    for (let i = 0; i < moves; i++) {
        yPosHead += 1;
        checkIfCoordinatesAreAlreadyVisited();
    }
};
const moveDown = (moves) => {
    console.log('move down', moves);
    for (let i = 0; i < moves; i++) {
        yPosHead -= 1;
        checkIfCoordinatesAreAlreadyVisited();
    }
};
const exercise = () => {
    let amount = 0;
    const instructions = getInstructions(fileContent);
    instructions.map((instruction, index) => {
        if (instruction[0] == "L") {
            moveLeft(parseInt(instruction[1]));
        }
        else if (instruction[0] == "R") {
            moveRight(parseInt(instruction[1]));
        }
        else if (instruction[0] == "U") {
            moveUp(parseInt(instruction[1]));
        }
        else {
            moveDown(parseInt(instruction[1]));
        }
    });
    console.log(xPosHead, yPosHead, visitedCoordinates.length);
    return amount;
};
console.log('exercise: ' + exercise());
