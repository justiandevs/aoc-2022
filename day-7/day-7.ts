import * as fs from 'fs';

const fileContent: Array<string> = fs.readFileSync('day-7-input.txt', 'utf8').split('\n');

enum commandTypes { previous = "..", "root" = "/", list = "ls", goToDirectory = "cd" }

type Folders = Record<string, { folders: [], size: number }>

const exercise = (): number => {
  let amount: number = 0;
  let path: string[] = [];
  const folders: Folders = {};

  const getSize = (initialSize: number, sizeToAdd: string): number => {
    let size: number = initialSize;

    size += parseInt(String(sizeToAdd));

    return size;
  }

  fileContent.map((line, index) => {
    let wholePath: string = path.join('/');

    const size: string = (line.match(/\d+/)?.[0])!;

    if(size != undefined) {
      folders[wholePath] = {
        folders: [],
        size: getSize(folders[wholePath].size, size),
      }
    }

    if(line.startsWith("$")) {
      const [, cmd, target] = line.split(" ");

      if(cmd == commandTypes.list) {
        folders[wholePath] = {
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
      } else if(cmd == commandTypes.list) {
        //
      }
    }
  });

  console.log(folders);

  return amount;
}

console.log('exercise-one: ' + exercise());