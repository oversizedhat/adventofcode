const helper = require("../helper");

async function main(inputFile) {
  let lines = await helper.loadInputFile(inputFile);

  const red = 12;
  const green = 13;
  const blue = 14;

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

  const possibleGamesIds = lines.map((line) => {
    const gameAndConf = line.split(":");
    const gameId = parseInt(gameAndConf[0].replace(/\D/g, ""));

    const gameConfs = gameAndConf[1].split(";");
    let hasFaultyGameConfg = false;
    gameConfs.forEach((conf) => {
      const trimmed = conf.trim();
      const colors = extractCubeColorsFromGameConf(trimmed);

      if (colors.red > red || colors.green > green || colors.blue > blue) {
        hasFaultyGameConfg = true;
      }
    });

    // if game is possible, return gameId, else return 0
    if (!hasFaultyGameConfg) {
      //console.log(`Game ${gameId} is possible`);
      return gameId;
    } else {
      //console.log(`Game ${gameId} is not possible`);
      return 0;
    }
  });

  // calc sum of possible games
  const sum = possibleGamesIds.reduce((a, b) => a + b, 0);
  return sum;
}

module.exports = {
  main,
};
