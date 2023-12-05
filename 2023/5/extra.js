const helper = require("../helper");

const maps = new Map();

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);

  const seeds = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((value) => parseInt(value));

  maps.set("seed-to-soil", []);
  maps.set("soil-to-fertilizer", []);
  maps.set("fertilizer-to-water", []);
  maps.set("water-to-light", []);
  maps.set("light-to-temperature", []);
  maps.set("temperature-to-humidity", []);
  maps.set("humidity-to-location", []);

  const mapKeys = maps.keys();
  let currentMap = mapKeys.next().value;

  for (let lineIndex = 2; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    if (line == "") {
      currentMap = mapKeys.next().value;
      continue;
    }

    if (!line.includes("map")) {
      const [destinationStartRange, sourceStartRange, rangeLength] =
        line.split(" ");
      maps.get(currentMap).push({
        dsr: parseInt(destinationStartRange),
        ssr: parseInt(sourceStartRange),
        rl: parseInt(rangeLength),
      });
    }
  }

  console.time("time");
  let timeLog;
  let lowest = 10000000000000000000000;
  let increment;

  let location;
  for (let seedPair = 0; seedPair < seeds.length; seedPair += 2) {
    console.log(
      `seed ${seeds[seedPair]}->${seeds[seedPair] + seeds[seedPair + 1]} (${
        seeds[seedPair + 1]
      }): start`
    );
    increment = seeds[seedPair + 1];
    for (let i = 0; i < increment; i++) {
      location = seedToLocation(i + seeds[seedPair]);
      if (location < lowest) {
        lowest = location;
      }
    }
    timeLog = console.timeLog(
      "time",
      `>>>> seed ${seeds[seedPair]}->${
        seeds[seedPair] + seeds[seedPair + 1]
      } (${seeds[seedPair + 1]}): lowest ${lowest}`
    );
  }

  console.timeEnd("time");
  console.log(lowest);
  return lowest;
}

function seedToLocation(value) {
  let location;
  location = getMappedValue("seed-to-soil", value);
  location = getMappedValue("soil-to-fertilizer", location);
  location = getMappedValue("fertilizer-to-water", location);
  location = getMappedValue("water-to-light", location);
  location = getMappedValue("light-to-temperature", location);
  location = getMappedValue("temperature-to-humidity", location);
  location = getMappedValue("humidity-to-location", location);
  return location;
}

function getMappedValue(map, value) {
  let mapValues = maps.get(map);
  for (let mapValue of mapValues) {
    if (value >= mapValue.ssr && value <= mapValue.ssr + mapValue.rl) {
      return mapValue.dsr + (value - mapValue.ssr);
    }
  }
  return value;
}

module.exports = {
  main,
  maps,
  getMappedValue,
  seedToLocation,
};

//main("5/input.txt");
