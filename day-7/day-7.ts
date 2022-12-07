import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-7-input.txt', 'utf8').split('\n');

enum commandTypes { previous = "..", list = "ls", goToDirectory = "cd" }

type Tree = Record<string, { folders: string[], size: number }>

const base = (): number[] => {
  let path: string[] = [];
  const tree: Tree = {};

  const getTotalSize = (tree: Tree, dir: string): number => {
    const { size, folders } = tree[dir];
    return size + folders.map((folder) => getTotalSize(tree, `${dir}/${folder}`)).reduce((a, b) => a + b, 0);
  }

  fileContent.map((line: string) => {
    let wholePath: string = path.join('/');

    if(line.startsWith("$")) {
      const [, cmd, target]: string[] = line.split(" ");

      if(cmd == commandTypes.list) {
        tree[wholePath] = {
          folders: [],
          size: 0
        }
      }

      if(cmd == commandTypes.goToDirectory) {
        if (target == commandTypes.previous) {
          path.pop();
        } else {
          path.push(target);
        }
      }
    }

    if (line.startsWith('dir')) {
      const pathName = line.split(' ');
      tree[wholePath].folders.push(pathName[1]);
    }

    const size: string = (line.match(/\d+/)?.[0])!;

    if(size != undefined) {
      tree[wholePath] = {
        folders: tree[wholePath].folders,
        size: tree[wholePath].size + parseInt(size),
      }
    }
  });

  return Object.keys(tree).map((dir: string) => getTotalSize(tree, dir));
}

const exerciseOne = (): number => {
  return base().filter((amount: number) => amount <= 100000).reduce((a: number, b: number) => a + b, 0)
}

const exerciseTwo = (): number => {
  const totalSpace: number = 70000000;
  const neededFreeSpace: number = 30000000;

  const totalDiskSpaceUsed: number = base().sort((a, b) => b - a)[0];
  const spaceToFreeUp: number = (totalSpace - neededFreeSpace - totalDiskSpaceUsed) * -1;

  return base().filter((amount) => amount >= spaceToFreeUp).sort((a, b) => a - b)[0];
}

console.log('exercise-one: ' + exerciseOne());
console.log('exercise-two: ' + exerciseTwo());