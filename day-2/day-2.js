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
const points = {
    "A": {
        "X": {
            "exerciseOne": 4,
            "exerciseTwo": 3
        },
        "Y": {
            "exerciseOne": 8,
            "exerciseTwo": 4
        },
        "Z": {
            "exerciseOne": 3,
            "exerciseTwo": 8
        },
    },
    "B": {
        "X": {
            "exerciseOne": 1,
            "exerciseTwo": 1
        },
        "Y": {
            "exerciseOne": 5,
            "exerciseTwo": 5
        },
        "Z": {
            "exerciseOne": 9,
            "exerciseTwo": 9
        }
    },
    "C": {
        "X": {
            "exerciseOne": 7,
            "exerciseTwo": 2
        },
        "Y": {
            "exerciseOne": 2,
            "exerciseTwo": 6,
        },
        "Z": {
            "exerciseOne": 6,
            "exerciseTwo": 7
        }
    }
};
const baseExercise = (exercise) => {
    let amount = 0;
    fileContent.map((singleGame) => {
        let array = singleGame.split("").filter((element) => element != ' ');
        amount = amount + points[array[0]][array[1]][exercise];
    });
    return amount;
};
console.log('exercise-one: ' + baseExercise("exerciseOne"));
console.log('exercise-two: ' + baseExercise("exerciseTwo"));
