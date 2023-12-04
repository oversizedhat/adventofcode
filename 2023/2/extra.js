const helper = require("../helper");

async function main(inputFile) {
  let lines = await helper.loadInputFile(inputFile);

  const extractCubeColorsFromGameConf = (gameConf) => {
    const colors = { red: 0, green: 0, blue: 0 };
    const gameConfParts = gameConf.split(",");
    gameConfParts.forEach((part) => {
      if (part.includes("red")) {
        colors.red = parseInt(part.replace(/\D/g, ""));
      } else if (part.includes("green")) {
        colors.green = parseInt(part.replace(/\D/g, ""));
      } else if (part.includes("blue")) {
        colors.blue = parseInt(part.replace(/\D/g, ""));
      }
    });
    return colors;
  };

  const powerOfMinSet = lines.map((line) => {
    const gameAndConf = line.split(":");
    const gameConfs = gameAndConf[1].split(";");

    const minSet = { red: 0, green: 0, blue: 0 };
    gameConfs.forEach((conf) => {
      const trimmed = conf.trim();
      const colors = extractCubeColorsFromGameConf(trimmed);

      if (colors.red > minSet.red) {
        minSet.red = colors.red;
      }

      if (colors.green > minSet.green) {
        minSet.green = colors.green;
      }

      if (colors.blue > minSet.blue) {
        minSet.blue = colors.blue;
      }
    });

    return minSet.red * minSet.green * minSet.blue;
  });

  // calc sum of possible games
  const sum = powerOfMinSet.reduce((a, b) => a + b, 0);
  return sum;
}

module.exports = {
  main,
};
