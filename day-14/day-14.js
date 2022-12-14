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
    let highest = 0;
    input.map((line) => {
        const splittedLine = line.split(' -> ');
        for (let i = 0; i < splittedLine.length - 1; i++) {
            const [x, y] = splittedLine[i].split(',').map(Number);
            const [x2, y2] = splittedLine[i + 1].split(',').map(Number);
            if (y > highest) {
                highest = y;
            }
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
        }
    });
    return highest;
};
const emulateSandFall = (coordinates, highest) => {
    let amountOfSandUnits = 0;
    let last = false;
    while (!last) {
        const point = { x: 500, y: 0 };
        amountOfSandUnits++;
        while (!last) {
            if (!coordinates.has(`${point.x}-${point.y + 1}`)) {
                point.y++;
            }
            else if (!coordinates.has(`${point.x - 1}-${point.y + 1}`)) {
                point.y++;
                point.x--;
            }
            else if (!coordinates.has(`${point.x + 1}-${point.y + 1}`)) {
                point.y++;
                point.x++;
            }
            else {
                coordinates.add(`${point.x}-${point.y}`);
                break;
            }
            if (point.y >= highest) {
                last = true;
                amountOfSandUnits--;
            }
        }
    }
    return amountOfSandUnits;
};
const emulateSandFallv2 = (coordinates, highest) => {
    let amountOfSandUnits = 0;
    let last = false;
    while (!last) {
        const point = { x: 500, y: 0 };
        amountOfSandUnits++;
        if (coordinates.has('500-0')) {
            amountOfSandUnits--;
            break;
        }
        while (!last) {
            if (point.y === highest + 1) {
                coordinates.add(`${point.x}-${point.y}`);
                break;
            }
            else if (!coordinates.has(`${point.x}-${point.y + 1}`)) {
                point.y++;
            }
            else if (!coordinates.has(`${point.x - 1}-${point.y + 1}`)) {
                point.y++;
                point.x--;
            }
            else if (!coordinates.has(`${point.x + 1}-${point.y + 1}`)) {
                point.y++;
                point.x++;
            }
            else {
                coordinates.add(`${point.x}-${point.y}`);
                break;
            }
        }
    }
    return amountOfSandUnits;
};
const exerciseOne = () => {
    const coordinates = new Set();
    let highest;
    highest = parseInput(fileContent, coordinates);
    return emulateSandFall(coordinates, highest);
};
const exerciseTwo = () => {
    const coordinates = new Set();
    let highest;
    highest = parseInput(fileContent, coordinates) + 2;
    for (let i = 0; i < 1000; i++) {
        coordinates.add(`${i}-${highest}`);
    }
    return emulateSandFallv2(coordinates, highest);
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
