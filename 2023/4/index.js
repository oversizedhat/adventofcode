const helper = require("../helper");

async function main(inputFile) {
  let lines = await helper.loadInputFile(inputFile);

  let totScore = 0;
  for (const line of lines) {
    const [playerCardsString, dealerCardsString] = line.split("|");
    const dealerCards = dealerCardsString
      .trim()
      .split(" ")
      .filter((card) => {
        return card != "";
      })
      .map((card) => {
        return parseInt(card);
      });

    const playerCards = playerCardsString
      .split(":")[1]
      .trim()
      .split(" ")
      .filter((card) => {
        return card != "";
      })
      .map((card) => {
        return parseInt(card);
      });

    const winningCards = [];
    for (const card of playerCards) {
      if (dealerCards.includes(card)) {
        winningCards.push(card);
      }
    }

    let score = 0;
    if (winningCards.length > 0) {
      const multiplier = Math.pow(2, winningCards.length - 1);
      score = 1 * multiplier;
      totScore += score;
    }
  }

  return totScore;
}

module.exports = {
  main,
};
