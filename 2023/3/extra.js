const helper = require("../helper");

async function main(inputFile) {
  let lines = await helper.loadInputFile(inputFile);

  const arrs = lines.map((line) => {
    const arr = [];
    for (charIndex in line) {
      arr.push(line.charAt(charIndex));
    }

    return arr;
  });

  const hasAdjacentSymbol = (pos) => {
    const adjecentChars = [
      { line: pos.line, char: pos.char - 1 },
      { line: pos.line, char: pos.char + 1 },
      { line: pos.line - 1, char: pos.char - 1 },
      { line: pos.line - 1, char: pos.char },
      { line: pos.line - 1, char: pos.char + 1 },
      { line: pos.line + 1, char: pos.char - 1 },
      { line: pos.line + 1, char: pos.char },
      { line: pos.line + 1, char: pos.char + 1 },
    ];

    for (let adjecentChar of adjecentChars) {
      try {
        const charCode = arrs[adjecentChar.line][adjecentChar.char];
        // if char is a symbol, return true, otherwise continue
        if (charCode && !helper.isCharNumber(charCode) && charCode !== ".") {
          return true;
        }
      } catch (err) {
        //console.log(err);
      }
    }

    return false;
  };

  const getAdjacentGearSymbol = (pos) => {
    const adjecentChars = [
      { line: pos.line, char: pos.char - 1 },
      { line: pos.line, char: pos.char + 1 },
      { line: pos.line - 1, char: pos.char - 1 },
      { line: pos.line - 1, char: pos.char },
      { line: pos.line - 1, char: pos.char + 1 },
      { line: pos.line + 1, char: pos.char - 1 },
      { line: pos.line + 1, char: pos.char },
      { line: pos.line + 1, char: pos.char + 1 },
    ];

    for (let adjecentChar of adjecentChars) {
      try {
        const charCode = arrs[adjecentChar.line][adjecentChar.char];
        // if char is a symbol, return true, otherwise continue
        if (charCode && charCode === "*") {
          return { line: adjecentChar.line, char: adjecentChar.char };
        }
      } catch (err) {
        //console.log(err);
      }
    }

    return false;
  };

  const allNums = [];
  for (let line = 0; line < arrs.length; line++) {
    let activeNum = null;

    for (let char = 0; char < arrs[line].length; char++) {
      if (helper.isCharNumber(arrs[line][char])) {
        if (!activeNum) {
          activeNum = { value: "", positions: [] };
        }
        activeNum.value += arrs[line][char];
        activeNum.positions.push({ line, char });

        if (char === arrs[line].length - 1) {
          allNums.push(activeNum);
          activeNum = null;
        }
      } else {
        if (activeNum) {
          allNums.push(activeNum);
        }
        activeNum = null;
      }
    }
  }

  let totSum = 0;

  // add gears to numbers
  for (let num of allNums) {
    for (let pos of num.positions) {
      if (hasAdjacentSymbol(pos)) {
        //console.log(`adding ${num.value}`);
        totSum += parseInt(num.value);

        // add gear to number if it has a gear adjacent
        const adjGear = getAdjacentGearSymbol(pos);
        if (adjGear) {
          //console.log(`adding ${num.value}`);
          num.gear = adjGear;
        }

        break;
      }
    }
  }

  const numsWithGearConnected = allNums.filter((num) => num.gear);
  const isSameNum = (num1, num2) => {
    const num1Pos = JSON.stringify(num1.positions);
    const num2Pos = JSON.stringify(num2.positions);
    return num1Pos === num2Pos;
  };

  const getNumberWithCorrespondingGear = (matchingNum) => {
    for (let num of numsWithGearConnected) {
      if (!isSameNum(num, matchingNum)) {
        if (
          num.gear &&
          num.gear.line === matchingNum.gear.line &&
          num.gear.char === matchingNum.gear.char
        ) {
          return num;
        }
      }
    }

    return null;
  };

  let gearSum = 0;
  for (const num of numsWithGearConnected) {
    const numWithConnectedGear = getNumberWithCorrespondingGear(num);

    if (
      numWithConnectedGear &&
      !numWithConnectedGear.gearUsed &&
      !num.gearUsed
    ) {
      gearSum += parseInt(numWithConnectedGear.value) * parseInt(num.value);
      numWithConnectedGear.gearUsed = true;
      num.gearUsed = true;
    }
  }

  return gearSum;
}

module.exports = {
  main,
};
