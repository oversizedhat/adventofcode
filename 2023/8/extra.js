const helper = require("../helper");
var lcm = require("compute-lcm");

async function main(inputFile, useLcm = true) {
  console.log("starting...");
  console.time();

  const lines = await helper.loadInputFile(inputFile);
  let instructions = lines[0]
    .trim()
    .replace(/L/g, 0)
    .replace(/R/g, 1)
    .split("");

  const startingNodes = [];
  const nodePathMap = new Map();
  const nodesEndingWithZ = new Map();
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
    if (node.endsWith("A")) {
      startingNodes.push(node);
    }
    if (node.endsWith("Z")) {
      nodesEndingWithZ.set(node, true);
    }
  }

  console.log("startingNodes:");
  console.log(startingNodes);
  console.log("nodesEndingWithZ:");
  console.log(nodesEndingWithZ);

  let currNodes = [...startingNodes];

  let numNodes = currNodes.length;

  console.log("numNodes: " + numNodes);
  const dirIndexes = new Array(numNodes).fill(0);

  const traverseToNextZstep = (nodeIndex, startStep) => {
    let endsWithZ = false;
    let currStep = startStep;
    while (!endsWithZ) {
      if (dirIndexes[nodeIndex] >= instructions.length) {
        dirIndexes[nodeIndex] = 0;
      }

      currStep++;
      currNodes[nodeIndex] = nodePathMap.get(currNodes[nodeIndex])[
        instructions[dirIndexes[nodeIndex]]
      ];
      endsWithZ = nodesEndingWithZ.has(currNodes[nodeIndex]);

      dirIndexes[nodeIndex]++;
    }
    return currStep;
  };

  const nodeRepeatSteps = new Array(numNodes).fill(0);
  const nodeUntilFirstZ = new Array(numNodes).fill(0);

  for (let i = 0; i < numNodes; i++) {
    let currStep1 = traverseToNextZstep(i, 0);
    currStep2 = traverseToNextZstep(i, currStep1);

    nodeUntilFirstZ[i] = currStep1;
    nodeRepeatSteps[i] = currStep2 - currStep1 - 1;
  }

  console.log(`nodeUntilFirstZ: ${nodeUntilFirstZ}`);

  if (useLcm) {
    // -----------------------------
    // Using compute-lcm
    // -----------------------------
    let leastCommonMultiple = lcm(nodeUntilFirstZ);
    console.log(`leastCommonMultiple: ${leastCommonMultiple}`);
    return leastCommonMultiple;
  } else {
    // -----------------------------
    // own lcm calculation (slow!!!)
    // -----------------------------

    // pick lowest repeat number to simplify wrapping
    const moveSteps = nodeUntilFirstZ.reduce(
      (prevValue, currentValue) =>
        prevValue < currentValue ? prevValue : currentValue,
      100000000000000
    );
    console.log(`moveSteps: ${moveSteps}`);
    const nodeRep = new Array(numNodes).fill(0);
    let tick = 0;
    let maxAlignedNodes = 0;
    let aligned = false;
    let alignedNodes = 0;
    let step = 0;
    while (!aligned) {
      alignedNodes = 0;
      step += moveSteps;
      aligned = true;
      for (let i = 0; i < numNodes; i++) {
        nodeRep[i] += moveSteps;
        // wrap around
        if (nodeRep[i] > nodeRepeatSteps[i]) {
          let movesOverWith = nodeRep[i] - nodeRepeatSteps[i];
          nodeRep[i] = movesOverWith - 1;
        }

        if (aligned && nodeRep[i] !== 0) {
          aligned = false;
        }
        if (nodeRep[i] === 0) {
          alignedNodes++;
        }
      }

      if (alignedNodes > maxAlignedNodes) {
        maxAlignedNodes = alignedNodes;
      }

      if (tick === 100000000) {
        console.timeLog(
          undefined,
          `step: ${step}, maxAlignedNodes: ${maxAlignedNodes}`
        );
        tick = 0;
      }
      tick++;
    }

    console.timeEnd();
    console.log("step:" + step);

    return step;
  }
}

module.exports = {
  main,
};

// const args = process.argv.slice(2);
// if (args[0]) {
//   main(args[0]);
// }
