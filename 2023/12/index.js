const helper = require("../helper");

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);

  let totalPossibleArrangements = 0;

  let records;
  let data;
  for (let i = 0; i < lines.length; i++) {
    [records, data] = lines[i].split(" ");

    totalPossibleArrangements += determinePossibleArrangements(
      records,
      data.split(",").map((x) => parseInt(x))
    );
  }
  console.log(totalPossibleArrangements);
  return totalPossibleArrangements;
}

function getPossibleRecords(records) {
  let n = records.match(/\?/g).length;
  var r = [];
  for (var i = 0; i < 1 << n; i++) {
    let rec = records;
    for (var j = 0; j < n; j++) {
      rec = rec.replace(/\?/, i & (1 << j) ? "#" : ".");
    }
    r.push(rec);
  }
  return r;
}

function determinePossibleArrangements(records, data) {
  //console.log(records, data);
  const combos = getPossibleRecords(records);
  //console.log(combos);
  let possible = 0;
  let combo;
  for (let i = 0; i < combos.length; i++) {
    //console.log(combos[i].split('.').map((x) => x.length));
    combo = combos[i]
      .split(".")
      .filter((x) => x != ".")
      .map((x) => x.length)
      .filter((x) => x != 0)
      .toString();

    //console.log(combo);

    if (data == combo) {
      possible++;
    }
  }
  return possible;
}

module.exports = {
  main,
  determinePossibleArrangements,
};
