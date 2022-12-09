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
const getInstructions = (arr) => {
    let instructions = [];
    arr.map((line) => {
        instructions.push(line.split(' ').filter((element) => element != ' '));
    });
    return instructions;
};
class Knot {
    constructor(x, y) {
        this.moveNeighbour = (knot) => {
            const distance = Math.max(Math.abs(knot.x - this.x), Math.abs(knot.y - this.y));
            if (distance > 1) {
                const x = knot.x - this.x;
                const y = knot.y - this.y;
                this.x += Math.abs(x) == 2 ? x / 2 : x;
                this.y += Math.abs(y) == 2 ? y / 2 : y;
            }
        };
        this.x = x;
        this.y = y;
    }
    move(direction) {
        if (direction == "L") {
            this.x--;
        }
        else if (direction == "R") {
            this.x++;
        }
        else if (direction == "U") {
            this.y++;
        }
        else if (direction == "D") {
            this.y--;
        }
    }
}
const mapOverInstructions = (instructions, arr, visitedCoordinates) => {
    instructions.map((instruction) => {
        for (let i = 0; i < parseInt(instruction[1]); i++) {
            arr[0].move(instruction[0]);
            for (let knot = 1; knot < arr.length; knot++) {
                const point = arr[knot];
                point.moveNeighbour(arr[knot - 1]);
            }
            const lastKnot = arr.slice(-1)[0];
            visitedCoordinates.add(`${lastKnot.x},${lastKnot.y}`);
        }
    });
};
const exerciseOne = () => {
    const instructions = getInstructions(fileContent);
    const visitedCoordinates = new Set();
    const firstKnot = new Knot(0, 0);
    const secondKnot = new Knot(0, 0);
    instructions.map((instruction) => {
        for (let i = 0; i < parseInt(instruction[1]); i++) {
            firstKnot.move(instruction[0]);
            secondKnot.moveNeighbour(firstKnot);
            visitedCoordinates.add(`${secondKnot.x},${secondKnot.y}`);
        }
    });
    return visitedCoordinates.size;
};
const exerciseTwo = () => {
    const instructions = getInstructions(fileContent);
    let visitedCoordinates = new Set();
    const arr = [new Knot(0, 0), new Knot(0, 0), new Knot(0, 0), new Knot(0, 0), new Knot(0, 0), new Knot(0, 0), new Knot(0, 0), new Knot(0, 0), new Knot(0, 0), new Knot(0, 0)];
    mapOverInstructions(instructions, arr, visitedCoordinates);
    return visitedCoordinates.size;
};
// Exercise three was the following: [2022 Day 9] Bonus Mini Problem (only try after part 2):
// With the given input, what's the smallest number of knots such that the tail knot doesn't move?
const exerciseThree = () => {
    const instructions = getInstructions(fileContent);
    let amount = 0;
    for (let i = 1; i < 1000; i++) {
        let visitedCoordinates = new Set();
        const arr = new Array(i).fill(0).map((_) => new Knot(0, 0));
        mapOverInstructions(instructions, arr, visitedCoordinates);
        amount++;
        if (visitedCoordinates.size == 1) {
            break;
        }
    }
    return amount;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
console.log('exercise-three: ' + exerciseThree());
