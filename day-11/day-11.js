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
const fileContent = fs.readFileSync('day-11-input.txt', 'utf8');
class Monkey {
    constructor(items, operation, modulo, test) {
        this.items = items;
        this.operation = operation;
        this.modulo = modulo;
        this.test = test;
        this.inspectedItems = 0;
    }
}
function getOperationFunction(input) {
    return function (old) {
        const string = input.replace(/old/, old);
        return eval(string);
    };
}
const parseInput = (input, monkeys) => {
    const blocks = input.split('\n\n');
    blocks.map((block) => {
        var _a, _b, _c, _d, _e;
        const starting_items = (_a = block.match(/Starting items(?:[:,] (\d+))+/g)) === null || _a === void 0 ? void 0 : _a[0].split(': ')[1].split(', ').map(Number);
        const operation = (_b = block.match(/= ([^\n]+)/)) === null || _b === void 0 ? void 0 : _b[1];
        const modulo = (_c = block.match(/divisible by (\d+)/)) === null || _c === void 0 ? void 0 : _c[1];
        const testIfTrue = (_d = block.match(/If true: throw to monkey (\d+)/)) === null || _d === void 0 ? void 0 : _d[1];
        const testIfFalse = (_e = block.match(/If false: throw to monkey (\d+)/)) === null || _e === void 0 ? void 0 : _e[1];
        const test = [parseInt(testIfTrue), parseInt(testIfFalse)];
        const monkey = new Monkey(starting_items, operation, parseInt(modulo), test);
        monkeys.push(monkey);
    });
};
const exerciseOne = () => {
    let monkeys = [];
    parseInput(fileContent, monkeys);
    for (let rounds = 0; rounds < 20; rounds++) {
        monkeys.map((monkey) => {
            monkey.items.map((item) => {
                const worryLevel = Math.floor(getOperationFunction(monkey.operation)(item.toString()) / 3);
                if (worryLevel % monkey.modulo == 0) {
                    monkeys[monkey.test[0]].items.push(worryLevel);
                }
                else {
                    monkeys[monkey.test[1]].items.push(worryLevel);
                }
                monkey.inspectedItems++;
            });
            monkey.items = [];
        });
    }
    return monkeys.map((monkey) => monkey.inspectedItems).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b);
};
const exerciseTwo = () => {
    let monkeys = [];
    parseInput(fileContent, monkeys);
    const divider = monkeys.map((monkey) => monkey.modulo).reduce((a, b) => a * b, 1);
    for (let rounds = 0; rounds < 10000; rounds++) {
        monkeys.map((monkey) => {
            monkey.items.map((item) => {
                let worryLevel = Math.floor(getOperationFunction(monkey.operation)(item.toString()));
                worryLevel = worryLevel % divider;
                if (worryLevel % monkey.modulo == 0) {
                    monkeys[monkey.test[0]].items.push(worryLevel);
                }
                else {
                    monkeys[monkey.test[1]].items.push(worryLevel);
                }
                monkey.inspectedItems++;
            });
            monkey.items = [];
        });
    }
    return monkeys.map((monkey) => monkey.inspectedItems).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b);
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
