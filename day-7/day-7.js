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
    commandTypes["list"] = "ls";
    commandTypes["goToDirectory"] = "cd";
})(commandTypes || (commandTypes = {}));
const base = () => {
    let path = [];
    const tree = {};
    const getTotalSize = (tree, dir) => {
        const { size, folders } = tree[dir];
        return size + folders.map((folder) => getTotalSize(tree, `${dir}/${folder}`)).reduce((a, b) => a + b, 0);
    };
    fileContent.map((line) => {
        var _a;
        let wholePath = path.join('/');
        if (line.startsWith("$")) {
            const [, cmd, target] = line.split(" ");
            if (cmd == commandTypes.list) {
                tree[wholePath] = {
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
        }
        if (line.startsWith('dir')) {
            const pathName = line.split(' ');
            tree[wholePath].folders.push(pathName[1]);
        }
        const size = ((_a = line.match(/\d+/)) === null || _a === void 0 ? void 0 : _a[0]);
        if (size != undefined) {
            tree[wholePath] = {
                folders: tree[wholePath].folders,
                size: tree[wholePath].size + parseInt(size),
            };
        }
    });
    return Object.keys(tree).map((dir) => getTotalSize(tree, dir));
};
const exerciseOne = () => {
    return base().filter((amount) => amount <= 100000).reduce((a, b) => a + b, 0);
};
const exerciseTwo = () => {
    const totalSpace = 70000000;
    const neededFreeSpace = 30000000;
    const totalDiskSpaceUsed = base().sort((a, b) => b - a)[0];
    const spaceToFreeUp = (totalSpace - neededFreeSpace - totalDiskSpaceUsed) * -1;
    return base().filter((amount) => amount >= spaceToFreeUp).sort((a, b) => a - b)[0];
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
