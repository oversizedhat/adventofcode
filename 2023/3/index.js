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
    //console.log(adjecentChars);
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

  const allNums = [];
  for (let line = 0; line < arrs.length; line++) {
    //let lineNums = {  value: '', positions: []};
    //let lineNums = [];
    let activeNum = null; //= { value: '', positions: [] };

    for (let char = 0; char < arrs[line].length; char++) {
      //console.log(arrs[line][char]);

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

  //console.log(allNums);

  let totSum = 0;

  for (let num of allNums) {
    for (let pos of num.positions) {
      if (hasAdjacentSymbol(pos)) {
        //console.log(`adding ${num.value}`);
        totSum += parseInt(num.value);
        break;
      }
    }
  }

  return totSum;
}

module.exports = {
  main,
};