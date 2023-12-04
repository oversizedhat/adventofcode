const helper = require("../helper");

async function main(inputFile) {
  let lines = await helper.loadInputFile(inputFile);
  const copies = [];

  let cardIndex = 0;
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

    const addCopy = (index, value = 1) => {
      if (index >= lines.length) {
        return;
      }
      if (!copies[index]) {
        copies[index] = 0;
      }
      copies[index] += value;
    };

    const addWinningCopies = () => {
      if (winningCards.length > 0) {
        let copyIndex = 1;
        for (const card of winningCards) {
          addCopy(cardIndex + copyIndex);
          copyIndex++;
        }
      }
    };

    addWinningCopies();

    if (copies[cardIndex] > 0) {
      for (let i = 0; i < copies[cardIndex]; i++) {
        addWinningCopies();
      }
    }
    cardIndex++;
  }

  const sumCopies = copies.reduce((a, b) => a + b, 0);
  const initialCards = lines.length;

  return sumCopies + initialCards;
}

module.exports = {
  main,
};
