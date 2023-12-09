const helper = require("../helper");

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);
  const instructions = lines[0].trim().split("");

  const nodePathMap = new Map();
  let node;
  let leftRight;
  for (let dirLine = 2; dirLine < lines.length; dirLine++) {
    node = lines[dirLine].split("=")[0].trim();
    leftRight = lines[dirLine]
      .split("=")[1]
      .trim()
      .replace(/\)|\(|\ /g, "")
      .split(",");
    nodePathMap.set(node, leftRight);
  }

  let steps = 0;

  const traversedNodes = (startingNode) => {
    let nextNode = startingNode;
    for (const direction of instructions) {
      steps++;
      nextNode = nodePathMap.get(nextNode)[direction === "L" ? 0 : 1];
      // if (nextNode === "ZZZ") {
      //   return nextNode;
      // }
    }
    return nextNode;
  };

  let currNode = "AAA";
  while (currNode !== "ZZZ") {
    currNode = traversedNodes(currNode);
    //console.log(`steps: ${steps}, currNode: ${currNode}`);
  }

  return steps;
}

module.exports = {
  main,
};
