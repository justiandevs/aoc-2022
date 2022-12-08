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
const fileContent = fs.readFileSync('day-8-input.txt', 'utf8').split('\n');
const getRowsAndColumns = (input) => {
    let rows = [];
    let columns = [];
    input.map((line, index) => {
        rows.push([]);
        line.split('').map((character, indexLine) => {
            var _a, _b;
            if (!columns[indexLine]) {
                columns.push([]);
            }
            (_a = rows[index]) === null || _a === void 0 ? void 0 : _a.push(parseInt(character));
            (_b = columns[indexLine]) === null || _b === void 0 ? void 0 : _b.push(parseInt(character));
        });
    });
    return { rows, columns };
};
const exerciseOne = () => {
    let amount = 0;
    const { rows, columns } = getRowsAndColumns(fileContent);
    rows.map((row, index) => {
        row.map((character, indexLine) => {
            if (!(index == 0 || index == rows.length - 1 || indexLine == 0 || indexLine >= columns.length - 1)) {
                const rowLeft = rows[index].slice(0, indexLine).some((value) => value >= character);
                const rowRight = rows[index].slice(indexLine + 1, rows[index].length).some((value) => value >= character);
                const columnLeft = columns[indexLine].slice(0, index).some((value) => value >= character);
                const columnRight = columns[indexLine].slice(index + 1, columns[indexLine].length).some((value) => value >= character);
                if (!rowLeft || !rowRight || !columnLeft || !columnRight) {
                    amount++;
                }
            }
            else {
                // always visible (latest border)
                amount++;
            }
        });
    });
    return amount;
};
console.log('exercise-one: ' + exerciseOne());
