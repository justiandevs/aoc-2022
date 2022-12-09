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
    if (visitedCoordinates.indexOf(`${xPosTail},${yPosTail}`) == -1) {
        visitedCoordinates.push(`${xPosTail},${yPosTail}`);
        return false;
    }
    return true;
};
const moveLeft = (moves) => {
    for (let i = 0; i < moves; i++) {
        xPosHead -= 1;
        xPosTail = xPosHead;
        if (yPosHead > yPosTail && moves > 1) {
            yPosTail += 1;
        }
        else if (yPosHead < yPosTail && moves > 1) {
            yPosTail -= 1;
        }
        if (i == moves - 1) {
            xPosTail += 1;
        }
        checkIfCoordinatesAreAlreadyVisited();
    }
};
const moveRight = (moves) => {
    for (let i = 0; i < moves; i++) {
        xPosHead += 1;
        xPosTail = xPosHead;
        if (yPosHead > yPosTail && moves > 1) {
            yPosTail += 1;
        }
        else if (yPosHead < yPosTail && moves > 1) {
            yPosTail -= 1;
        }
        if (i == moves - 1) {
            xPosTail -= 1;
        }
        checkIfCoordinatesAreAlreadyVisited();
    }
};
const moveUp = (moves) => {
    for (let i = 0; i < moves; i++) {
        yPosHead += 1;
        yPosTail = yPosHead;
        if (xPosHead > xPosTail && moves > 1) {
            xPosTail += 1;
        }
        else if (xPosHead < xPosTail && moves > 1) {
            xPosTail -= 1;
        }
        if (i == moves - 1) {
            yPosTail -= 1;
        }
        checkIfCoordinatesAreAlreadyVisited();
    }
};
const moveDown = (moves) => {
    for (let i = 0; i < moves; i++) {
        yPosHead -= 1;
        yPosTail = yPosHead;
        if (xPosHead > xPosTail && moves > 1) {
            xPosTail += 1;
        }
        else if (xPosHead < xPosTail && moves > 1) {
            xPosTail -= 1;
        }
        if (i == moves - 1) {
            yPosTail += 1;
        }
        checkIfCoordinatesAreAlreadyVisited();
    }
};
const exercise = () => {
    let amount = 0;
    const instructions = getInstructions(fileContent);
    instructions.map((instruction, index) => {
        if (instruction[0] == "L") {
            moveLeft(parseInt(instruction[1]));
            console.log('left', xPosTail, yPosTail);
        }
        else if (instruction[0] == "R") {
            moveRight(parseInt(instruction[1]));
            console.log('right', xPosTail, yPosTail);
        }
        else if (instruction[0] == "U") {
            moveUp(parseInt(instruction[1]));
            console.log('up', xPosTail, yPosTail);
        }
        else {
            moveDown(parseInt(instruction[1]));
            console.log('down', xPosTail, yPosTail);
        }
    });
    console.log(xPosHead, yPosHead, visitedCoordinates);
    return amount;
};
console.log('exercise: ' + exercise());
