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
const fileContent = fs.readFileSync('day-12-input.txt', 'utf8').split('\n');
class Grid {
    constructor(startLocation, endLocation, map) {
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.partTwoResult = 0;
        this.map = map;
    }
    translateCoordinateToInt(x, y) {
        return y * 1e3 + x;
    }
    translateIntToCoordinate(int) {
        return {
            x: int % 1e3,
            y: Math.floor(int / 1e3)
        };
    }
    getNeighbours(x, y, map) {
        const res = [];
        if (y + 1 < map.length && map[y + 1][x] <= map[y][x] + 1) {
            res.push(this.translateCoordinateToInt(x, y + 1));
        }
        if (y - 1 >= 0 && map[y - 1][x] <= map[y][x] + 1) {
            res.push(this.translateCoordinateToInt(x, y - 1));
        }
        if (x + 1 < map[y].length && map[y][x + 1] <= map[y][x] + 1) {
            res.push(this.translateCoordinateToInt(x + 1, y));
        }
        if (x - 1 >= 0 && map[y][x - 1] <= map[y][x] + 1) {
            res.push(this.translateCoordinateToInt(x - 1, y));
        }
        return res;
    }
    getNeighbors2(x, y, map) {
        const res = [];
        if (y + 1 < map.length && map[y + 1][x] >= map[y][x] - 1) {
            res.push(this.translateCoordinateToInt(x, y + 1));
        }
        if (y - 1 >= 0 && map[y - 1][x] >= map[y][x] - 1) {
            res.push(this.translateCoordinateToInt(x, y - 1));
        }
        if (x + 1 < map[y].length && map[y][x + 1] >= map[y][x] - 1) {
            res.push(this.translateCoordinateToInt(x + 1, y));
        }
        if (x - 1 >= 0 && map[y][x - 1] >= map[y][x] - 1) {
            res.push(this.translateCoordinateToInt(x - 1, y));
        }
        return res;
    }
    getShortestDistance(mode) {
        const dist = {};
        const prev = {};
        let queue = [];
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const id = this.translateCoordinateToInt(x, y);
                dist[id] = Infinity;
                // prev[pointToInt(x, y)] = ;
                queue.push(id);
            }
        }
        if (mode === "partOne") {
            dist[this.translateCoordinateToInt(this.startLocation.x, this.startLocation.y)] = 0;
        }
        else {
            dist[this.translateCoordinateToInt(this.endLocation.x, this.endLocation.y)] = 0;
        }
        while (queue.length) {
            let u = null;
            for (const current of queue) {
                if (u === null || dist[current] < dist[u]) {
                    u = current;
                }
            }
            const point = this.translateIntToCoordinate(u);
            if (u === this.translateCoordinateToInt(this.endLocation.x, this.endLocation.y) && mode == "partOne") {
                break;
            }
            if (this.map[point.y][point.x] === 0) {
                this.partTwoResult = dist[u];
            }
            queue = queue.filter((x) => x !== u);
            const neighbors = mode === "partOne" ? this.getNeighbours(point.x, point.y, this.map) : this.getNeighbors2(point.x, point.y, this.map);
            for (const v of neighbors) {
                if (queue.includes(v)) {
                    const alt = dist[u] + 1;
                    if (alt < dist[v]) {
                        dist[v] = alt;
                        prev[v] = u;
                    }
                }
            }
        }
        return {
            dist,
            prev,
        };
    }
}
const parseInput = (input) => {
    const grid = new Grid({ x: 0, y: 0 }, { x: 0, y: 0 }, []);
    grid.map = input.map((line, y) => [...line].map((value, x) => {
        if (value === "S") {
            grid.startLocation = {
                x, y
            };
            return 0;
        }
        if (value === "E") {
            grid.endLocation = {
                x, y
            };
            return 25;
        }
        return value.charCodeAt(0) - "a".charCodeAt(0);
    }));
    return grid;
};
const exerciseOne = () => {
    const grid = parseInput(fileContent);
    const dijkstra = grid.getShortestDistance('partOne');
    return dijkstra.dist[grid.translateCoordinateToInt(grid.endLocation.x, grid.endLocation.y)];
};
const exerciseTwo = () => {
    const grid = parseInput(fileContent);
    grid.getShortestDistance('partTwo');
    return grid.partTwoResult;
};
console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());
