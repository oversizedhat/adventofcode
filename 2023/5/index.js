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

  let lowest = 10000000000000000000000;
  for (const seed of seeds) {
    const location = await seedToLocation(seed);
    if (location < lowest) {
      lowest = location;
    }
  }
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
