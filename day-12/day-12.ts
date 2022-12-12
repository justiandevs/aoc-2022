import * as fs from 'fs';

const fileContent: string[] = fs.readFileSync('day-12-input.txt', 'utf8').split('\n');

interface ICoordinate {
  x: number,
  y: number
}

interface IResult {
  startLocation: ICoordinate,
  endLocation: ICoordinate,
  map: number[][],
  translateCoordinateToInt: (x: number, y: number) => number;
  translateIntToCoordinate: (int: number) => ICoordinate;
  getShortestDistance: () => { dist: any, prev: any },
}

interface IDist {
  [key: number]: number;
}

interface IPrev {
  [key: number]: number;
}

class Grid implements IResult {
  public startLocation: ICoordinate;
  public endLocation: ICoordinate;
  public map: number[][];

  constructor(startLocation: ICoordinate, endLocation: ICoordinate, map: number[][]) {
    this.startLocation = startLocation;
    this.endLocation = endLocation;
    this.map = map;
  }

  translateCoordinateToInt(x: number, y: number): number {
    return y * 1e3 + x;
  }

  translateIntToCoordinate(int: number): ICoordinate {
    return {
      x: int % 1e3,
      y: Math.floor(int / 1e3)
    }
  }

  getNeighbours(x: number, y: number, map: number[][]) {
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


  getShortestDistance(): { dist: any, prev: any } {
    const dist: IDist = {};
    const prev: IPrev = {};
    let queue = [];
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const id = this.translateCoordinateToInt(x, y);
        dist[id] = Infinity;
        // prev[pointToInt(x, y)] = ;
        queue.push(id);
      }
    }
    dist[this.translateCoordinateToInt(this.startLocation.x, this.startLocation.y)] = 0;

    while (queue.length) {
      let u: number | null = null;
      for (const current of queue) {
        if (u === null || dist[current] < dist[u]) {
          u = current;
        }
      }
      if (u === this.translateCoordinateToInt(this.endLocation.x, this.endLocation.y)) {
        break;
      }
      queue = queue.filter((x) => x !== u);

      const point = this.translateIntToCoordinate(u!);
      const neighbors = this.getNeighbours(point.x, point.y, this.map);
      for (const v of neighbors) {
        if (queue.includes(v)) {
          const alt = dist[u!] + 1;
          if (alt < dist[v]) {
            dist[v] = alt;
            prev[v] = u!;
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

const parseInput = (input: string[]): IResult => {
  const grid = new Grid(
    { x: 0, y: 0 },
    { x: 0, y: 0},
    []
  )

  grid.map = input.map((line: string, y: number) => [...line].map((value: string, x: number) => {
    if(value === "S") {
      grid.startLocation = {
        x, y
      }
      return 0;
    }
    if(value === "E") {
      grid.endLocation = {
        x, y
      }
      return 25;
    }

    return value.charCodeAt(0) - "a".charCodeAt(0);
  }));

  return grid;
}

const exerciseOne = (): number => {
  const grid = parseInput(fileContent);
  const dijkstra = grid.getShortestDistance();

  const distance = dijkstra.dist[grid.translateCoordinateToInt(grid.endLocation.x, grid.endLocation.y)];

  return distance;
}

console.log('exercise-one: ' + exerciseOne());