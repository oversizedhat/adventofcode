const helper = require("../helper");

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);

  const onlyDigits = lines.map((line) => {
    return line.replace(/\D/g, "");
  });

  const values = onlyDigits.map((line) => {
    let val = 0;
    if (line.length === 1) {
      val = parseInt(line[0] + parseInt(line[0]));
    } else if (line.length === 2) {
      val = parseInt(line);
    } else {
      val = parseInt(line[0] + line[line.length - 1]);
    }
    return val;
  });

  const sum = values.reduce((a, b) => a + b, 0);
  return sum;
}

module.exports = {
  main,
};
