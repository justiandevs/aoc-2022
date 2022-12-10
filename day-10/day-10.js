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
const fileContent = fs.readFileSync('day-10-input.txt', 'utf8').split('\n');
const checkCycleRounds = (signalStrength, cycle, x) => {
    const rounds = [20, 60, 100, 140, 180, 220];
    if (rounds.indexOf(cycle) > -1) {
        signalStrength.push(cycle * x);
    }
    return signalStrength;
};
const exerciseOne = () => {
    let x = 1;
    let cycle = 0;
    let signalStrength = [];
    fileContent.map((line) => {
        const arr = line.split(' ');
        const [instruction, amount] = [arr[0], parseInt(arr[1])];
        if (instruction === "addx") {
            const cycleRounds = 2;
            for (let i = 0; i < cycleRounds; i++) {
                cycle++;
                checkCycleRounds(signalStrength, cycle, x);
            }
            x += amount;
        }
        else {
            cycle++;
            checkCycleRounds(signalStrength, cycle, x);
        }
    });
    return signalStrength.reduce((a, b) => a + b);
};
const exerciseTwo = () => {
    let x = 1;
    let view = [];
    const result = [];
    const pushCorrectElementToView = () => {
        if (Math.abs(x - view.length % 40) <= 1) {
            view.push('#');
        }
        else {
            view.push('.');
        }
    };
    fileContent.map((line) => {
        const arr = line.split(' ');
        const [instruction, amount] = [arr[0], parseInt(arr[1])];
        if (instruction === "addx") {
            const cycleRounds = 2;
            for (let i = 0; i < cycleRounds; i++) {
                pushCorrectElementToView();
            }
            x += amount;
        }
        else {
            pushCorrectElementToView();
        }
    });
    for (let i = 0; i < 241; i += 40) {
        result.push(view.join('').substring(i, i + 40));
    }
    return result;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: \n' + exerciseTwo().map((line) => line).join("\n"));
