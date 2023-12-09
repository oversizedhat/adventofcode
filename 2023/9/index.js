const helper = require("../helper");

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);

  const getExtraolatedValue = (line) => {
    // console.log(fl);
    let tree = [];
    tree.push(line);
    let allZero = false;
    while (!allZero) {
      const line = tree[tree.length-1];
      //console.log(`line: ${line}`)
      const newLine = new Array(line.length-1).fill(0);
      for (let i = 1; i < line.length; i++) {
        newLine[i-1] = line[i] - line[i-1];
      }
      if (newLine.every((x) => x === 0)) {
        allZero = true;
      }
      
      tree.push(newLine);
    }

    for (let i = tree.length-1; i >= 1; i--) {
      const lastValuesSummed = tree[i][tree[i].length-1] + tree[i-1][tree[i-1].length-1];
      //console.log(lastVal, tree[i]);
      tree[i-1].push(lastValuesSummed);
    }

    return tree[0][tree[0].length-1];
  }

  const cleanedUpLines = lines.map((line) => line.trim().split(" ").map((x) => parseInt(x)));
  const extrapolated = cleanedUpLines.map((line) => getExtraolatedValue(line));
  const sum = extrapolated.reduce((a, b) => a + b, 0);
  return sum;
}

module.exports = {
  main,
};
