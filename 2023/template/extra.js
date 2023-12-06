const helper = require("../helper");

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);

  return 1;
}

module.exports = {
  main,
};
