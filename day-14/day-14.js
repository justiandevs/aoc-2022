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
const fileContent = fs.readFileSync('day-14-input.txt', 'utf8').split('\n');
const parseInput = (input, coordinates) => {
    input.map((line) => {
        const splittedLine = line.split(' -> ');
        for (let i = 0; i < splittedLine.length - 1; i++) {
            const [x, y] = splittedLine[i].split(',').map(Number);
            const [x2, y2] = splittedLine[i + 1].split(',').map(Number);
            if (x === x2) {
                const abs = Math.abs(y2 - y);
                for (let j = 0; j <= abs; j++) {
                    if (y > y2) {
                        coordinates.add(`${x}-${y - j}`);
                    }
                    else {
                        coordinates.add(`${x}-${y + j}`);
                    }
                }
            }
            if (y === y2) {
                const abs = Math.abs(x2 - x);
                for (let j = 0; j <= abs; j++) {
                    if (x > x2) {
                        coordinates.add(`${x - j}-${y}`);
                    }
                    else {
                        coordinates.add(`${x + j}-${y}`);
                    }
                }
            }
            // console.log(x, y, x2, y2);
        }
    });
};
const exerciseOne = () => {
    const coordinates = new Set();
    let amount = 0;
    parseInput(fileContent, coordinates);
    console.log(coordinates);
    return amount;
};
const exerciseTwo = () => {
    return 0;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
