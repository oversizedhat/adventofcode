const helper = require("../helper");

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);

  const linesFixed = lines.map((line) => {
    let fixed = line.replace(/one/g, "one1one");
    fixed = fixed.replace(/two/g, "two2two");
    fixed = fixed.replace(/three/g, "three3three");
    fixed = fixed.replace(/four/g, "four4four");
    fixed = fixed.replace(/five/g, "five5five");
    fixed = fixed.replace(/six/g, "six6six");
    fixed = fixed.replace(/seven/g, "seven7seven");
    fixed = fixed.replace(/eight/g, "eight8eight");
    fixed = fixed.replace(/nine/g, "nine9nine");
    return fixed;
  });

  const onlyDigits = linesFixed.map((line) => {
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
