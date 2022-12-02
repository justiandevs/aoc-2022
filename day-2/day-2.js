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
const fileContent = fs.readFileSync('day-2-input.txt', 'utf8').split('\n');
const exerciseOne = () => {
    let amount = 0;
    fileContent.map((singleGame) => {
        let array = singleGame.split("").filter((element) => element != ' ');
        switch (array.toString()) {
            case 'A,X':
                amount += 4;
                break;
            case 'A,Y':
                amount += 8;
                break;
            case 'A,Z':
                amount += 3;
                break;
            case 'B,X':
                amount += 1;
                break;
            case 'B,Y':
                amount += 5;
                break;
            case 'B,Z':
                amount += 9;
                break;
            case 'C,X':
                amount += 7;
                break;
            case 'C,Y':
                amount += 2;
                break;
            case 'C,Z':
                amount += 6;
                break;
        }
    });
    return amount;
};
const exerciseTwo = () => {
    let amount = 0;
    fileContent.map((singleGame) => {
        let array = singleGame.split("").filter((element) => element != ' ');
        switch (array.toString()) {
            case 'A,X':
                amount += 3;
                break;
            case 'A,Y':
                amount += 4;
                break;
            case 'A,Z':
                amount += 8;
                break;
            case 'B,X':
                amount += 1;
                break;
            case 'B,Y':
                amount += 5;
                break;
            case 'B,Z':
                amount += 9;
                break;
            case 'C,X':
                amount += 2;
                break;
            case 'C,Y':
                amount += 6;
                break;
            case 'C,Z':
                amount += 7;
                break;
        }
    });
    return amount;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
