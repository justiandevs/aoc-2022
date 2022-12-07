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
const fileContent = fs.readFileSync('day-7-input.txt', 'utf8').split('\n');
var commandTypes;
(function (commandTypes) {
    commandTypes["previous"] = "..";
    commandTypes["root"] = "/";
    commandTypes["list"] = "ls";
    commandTypes["goToDirectory"] = "cd";
})(commandTypes || (commandTypes = {}));
const exercise = () => {
    let amount = 0;
    let path = [];
    const folders = {};
    const getSize = (initialSize, sizeToAdd) => {
        let size = initialSize;
        size += parseInt(String(sizeToAdd));
        return size;
    };
    fileContent.map((line, index) => {
        var _a;
        let wholePath = path.join('/');
        const size = ((_a = line.match(/\d+/)) === null || _a === void 0 ? void 0 : _a[0]);
        if (size != undefined) {
            folders[wholePath] = {
                folders: [],
                size: getSize(folders[wholePath].size, size),
            };
        }
        if (line.startsWith("$")) {
            const [, cmd, target] = line.split(" ");
            if (cmd == commandTypes.list) {
                folders[wholePath] = {
                    folders: [],
                    size: 0
                };
            }
            if (cmd == commandTypes.goToDirectory) {
                if (target == commandTypes.previous) {
                    path.pop();
                }
                else {
                    path.push(target);
                }
            }
            else if (cmd == commandTypes.list) {
                //
            }
        }
    });
    console.log(folders);
    return amount;
};
console.log('exercise-one: ' + exercise());
