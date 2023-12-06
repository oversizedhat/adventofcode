const helper = require("../helper");

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);

  const time = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((value) => parseInt(value))
    .filter((value) => !isNaN(value))
    .join("");

  const duration = lines[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((value) => parseInt(value))
    .filter((value) => !isNaN(value))
    .join("");

  console.log(time, duration);

  let firstWonHoldtime = 0;
  let lastWonHoldtime = 0;

  console.time();
  let distanceTravelled;
  for (let holdtime = 1; holdtime < time; holdtime++) {
    distanceTravelled = holdtime * time - holdtime * holdtime;
    if (distanceTravelled > duration) {
      firstWonHoldtime = holdtime;
      console.timeLog(undefined, `firstWonHoldtime: ${firstWonHoldtime}`);
      break;
    }
  }
  for (let holdtime = time; holdtime > firstWonHoldtime; holdtime--) {
    distanceTravelled = holdtime * time - holdtime * holdtime;
    if (distanceTravelled > duration) {
      lastWonHoldtime = holdtime;
      console.timeLog(undefined, `lastWonHoldtime: ${lastWonHoldtime}`);
      break;
    }
  }

  console.timeEnd(undefined, 
    `firstWonHoldtime ${firstWonHoldtime}, lastWonHoldtime ${lastWonHoldtime}`
  );

  return lastWonHoldtime - firstWonHoldtime + 1;
}

module.exports = {
  main,
};
