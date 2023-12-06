const helper = require("../helper");

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);

  const times = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((value) => parseInt(value))
    .filter((value) => !isNaN(value));

  const durations = lines[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((value) => parseInt(value))
    .filter((value) => !isNaN(value));

  console.log(times, durations);
  
  const wonRaces = [];
  for (let race = 0; race < times.length; race++) {
    wonRaces[race] = 0;
    for (let holdtime = 0; holdtime < times[race]; holdtime++) {
      let distanceTravelled = 0;
      let speed = 0;
      for (let timeSpent = 0; timeSpent < times[race]; timeSpent++) {
        if (timeSpent < holdtime) {
          speed += 1;
        } else {
          distanceTravelled += speed;
        }
      }
      console.log(
        `holdtime: ${holdtime}, distanceTravelled: ${distanceTravelled}, won: ${
          distanceTravelled > durations[race]
        }`
      );
      if (distanceTravelled > durations[race]) {
        wonRaces[race] += 1;
      }
    }
  }

  console.log("wonRaces:", wonRaces);

  const sum = wonRaces.reduce((a, b) => a * b, 1);

  return sum;
}

module.exports = {
  main,
};
