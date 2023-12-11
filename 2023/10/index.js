const helper = require("../helper");
const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };

const dirMapGoingFrom = new Map();
dirMapGoingFrom.set("|", [UP, DOWN]);
dirMapGoingFrom.set("-", [LEFT, RIGHT]);
dirMapGoingFrom.set("L", [UP, RIGHT]);
dirMapGoingFrom.set("J", [UP, LEFT]);
dirMapGoingFrom.set("7", [DOWN, LEFT]);
dirMapGoingFrom.set("F", [DOWN, RIGHT]);
dirMapGoingFrom.set(".", []);
dirMapGoingFrom.set("S", [UP, DOWN, RIGHT, LEFT]);

const dirMapGoingTo = new Map();
dirMapGoingTo.set("|", [UP, DOWN]);
dirMapGoingTo.set("-", [LEFT, RIGHT]);
dirMapGoingTo.set("L", [LEFT, DOWN]);
dirMapGoingTo.set("J", [RIGHT, DOWN]);
dirMapGoingTo.set("7", [UP, RIGHT]);
dirMapGoingTo.set("F", [UP, LEFT]);
dirMapGoingTo.set(".", []);
dirMapGoingTo.set("S", [UP, DOWN, RIGHT, LEFT]);

let grid;

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);
  const gridLines = lines.map((line) => line.split(""));

  drawGrid(gridLines);

  // flip x and y
  grid = JSON.parse(JSON.stringify(gridLines));
  for (let x = 0; x < gridLines[0].length; x++) {
    for (let y = 0; y < gridLines.length; y++) {
      grid[x][y] = gridLines[y][x];
    }
  }

  const startingPoint = findStartingPoint(grid);

  console.log(`startingPoint: ${posForLog(startingPoint)}`);

  let currentPos = startingPoint;

  let step = 0;
  let previousPos = { x: -1, y: -1 };
  while (true) {
    const possibleMoves = findPossibleMoves(currentPos, previousPos);
    // console.log(
    //   `from ${posForLog(currentPos)}), possibleMoves: ${JSON.stringify(
    //     possibleMoves
    //   )}`
    // );
    step++;

    previousPos.x = currentPos.x;
    previousPos.y = currentPos.y;

    currentPos.x = possibleMoves[0].x;
    currentPos.y = possibleMoves[0].y;

    if (grid[currentPos.x][currentPos.y] == "S") {
      console.log("found S");
      break;
    }
  }

  return step / 2;
}

function drawGrid(grid) {
  console.log(grid.map((row) => row.join("")).join("\n"));
}

function findStartingPoint() {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      const char = grid[x][y];
      if (char === "S") {
        return { x, y };
      }
    }
  }
}

function posForLog(pos) {
  return `{${pos.x},${pos.y} = ${grid[pos.x][pos.y]}}`;
}

function canMove(fromPos, move) {
  const toPosChar = grid[fromPos.x + move.x][fromPos.y + move.y];
  const possibleDirsTo = dirMapGoingTo.get(toPosChar);

  return possibleDirsTo.some((dir) => {
    if (dir.x == move.x && dir.y == move.y) {
      return true;
    }
  });
}

function isMatching(pos1, pos2) {
  return pos1.x == pos2.x && pos1.y == pos2.y;
}

function findPossibleMoves(fromPos, previousPos) {
  const possibleMoves = [];
  for (let dir of dirMapGoingFrom.get(grid[fromPos.x][fromPos.y])) {
    if (canMove(fromPos, dir)) {
      const newPos = { x: fromPos.x + dir.x, y: fromPos.y + dir.y };
      if (!isMatching(newPos, previousPos)) {
        possibleMoves.push(newPos);
      }
    }
  }
  return possibleMoves;
}

module.exports = {
  main,
};
