const fs = require("fs");

async function loadInputFile(filePath) {
  // Step 1: Read the file
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      // Step 2: Parse each line and store in an array
      const lines = data.split("\n").map((line) => line.trim());
      resolve(lines);
    });
  });
}

function isCharNumber(char) {
  return !isNaN(parseInt(char));
}

module.exports = {
  loadInputFile,
  isCharNumber,
};
