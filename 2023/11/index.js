const helper = require("../helper");

let grid;

const GALAXY = "#";
const EMPTY_MULTIPLIER_SYMBOL = "M";
let emptySpaceMultiplier = 2;

function findGalaxy(name) {
  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] === name) {
        return { x: x, y: y };
      }
    }
  }
}

function findShortestPath(galaxyPoint, seekGalaxyPoint) {
  let step = 0;
  if (
    galaxyPoint.x === seekGalaxyPoint.x &&
    galaxyPoint.y === seekGalaxyPoint.y
  ) {
    return step;
  } else {
    step +=
      grid[galaxyPoint.y][galaxyPoint.x] == EMPTY_MULTIPLIER_SYMBOL
        ? emptySpaceMultiplier
        : 1;
    if (galaxyPoint.x < seekGalaxyPoint.x) {
      return (
        step +
        findShortestPath(
          { x: galaxyPoint.x + 1, y: galaxyPoint.y },
          seekGalaxyPoint
        )
      );
    } else if (galaxyPoint.x > seekGalaxyPoint.x) {
      return (
        step +
        findShortestPath(
          { x: galaxyPoint.x - 1, y: galaxyPoint.y },
          seekGalaxyPoint
        )
      );
    }

    if (galaxyPoint.y < seekGalaxyPoint.y) {
      return (
        step +
        findShortestPath(
          { x: galaxyPoint.x, y: galaxyPoint.y + 1 },
          seekGalaxyPoint
        )
      );
    } else if (galaxyPoint.y > seekGalaxyPoint.y) {
      return (
        step +
        findShortestPath(
          { x: galaxyPoint.x, y: galaxyPoint.y - 1 },
          seekGalaxyPoint
        )
      );
    }
  }
}

async function main(inputFile, spaceMultiplier) {
  emptySpaceMultiplier = spaceMultiplier;

  const lines = await helper.loadInputFile(inputFile);
  const gridLines = lines.map((line) => line.split(""));

  grid = gridLines;

  for (let y = 0; y < grid.length; y++) {
    let s = "";
    for (let x = 0; x < grid[0].length; x++) {
      s += grid[y][x];
    }
    if (!s.includes(GALAXY)) {
      for (let x = 0; x < grid[0].length; x++) {
        grid[y][x] = EMPTY_MULTIPLIER_SYMBOL;
      }
    }
  }

  drawGrid(grid);

  for (let x = 0; x < grid[0].length; x++) {
    let s = "";
    for (let y = 0; y < grid.length; y++) {
      s += grid[y][x];
    }
    if (!s.includes(GALAXY)) {
      for (let y = 0; y < grid.length; y++) {
        grid[y][x] = EMPTY_MULTIPLIER_SYMBOL;
      }
    }
  }

  drawGrid(grid);

  let galaxyIndex = 1;
  for (let y = 0; y < grid.length; y++) {
    let s = "";
    for (let x = 0; x < grid[0].length; x++) {
      s += grid[y][x];
      if (grid[y][x] === GALAXY) {
        grid[y][x] = galaxyIndex;
        galaxyIndex++;
      }
    }
  }

  drawGrid(grid);

  let galaxies = galaxyIndex - 1;

  let shortestPaths = [];

  usedGalaxies = new Map();

  for (let galaxy = galaxies; galaxy > 1; galaxy--) {
    for (let galaxy2 = 1; galaxy2 < galaxies; galaxy2++) {
      if (galaxy != galaxy2 && !usedGalaxies.has(galaxy2)) {
        let shortestPath = findShortestPath(
          findGalaxy(galaxy),
          findGalaxy(galaxy2)
        );
        shortestPaths.push(shortestPath);
      }
      usedGalaxies.set(galaxy, true);
    }
  }

  const sum = shortestPaths.reduce((a, b) => a + b, 0);
  return sum;
}

function drawGrid(grid) {
  console.log(grid.map((row) => row.join("")).join("\n"));
}

module.exports = {
  main,
};
