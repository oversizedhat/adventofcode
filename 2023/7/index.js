const helper = require("../helper");

//const allCards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
//const cardOrderedByValue = allCards.reverse();
const cardValueMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

const typeValueMap = {
  "Five of a kind": 7,
  "Four of a kind": 6,
  "Full house": 5,
  "Three of a kind": 4,
  "Two pair": 3,
  Pair: 2,
  "High card": 1,
};

// Five of a kind, where all five cards have the same label: AAAAA
// Four of a kind, where four cards have the same label and one card has a different label: AA8AA
// Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
// Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
// Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
// One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
// High card, where all cards' labels are distinct: 23456

// sort cards by value
function sortCardsInHand(cards) {
  let sortedCards = {};
  for (const card of cards) {
    if (!sortedCards[card]) {
      sortedCards[card] = 0;
    }
    sortedCards[card] += 1;
  }

  //console.log(sortedCards);
  let entries = Object.entries(sortedCards);
  console.log("entries:", entries);

  entries = entries.sort((a, b) => (b[1] > a[1] ? 1 : -1));

  console.log("entries sorter by length:", entries);

  const details = {};

  /**
   * TODO THIS WAS WRONG!!
   *
   * So, 33332 and 2AAAA are both four of a kind hands,
   * but 33332 is stronger because its first card is stronger.
   * Similarly, 77888 and 77788 are both a full house, but 77888 is stronger
   * because its third card is stronger (and both hands have the same first and second card).
   */
  // details.cardValues = [];
  // for (entry of entries) {
  //   details.cardValues.push(cardValueMap[entry[0]]); //[cardValueMap[entries[0][0]]];
  // }

  // instead we just use the card order
  details.cardValues = cards.map((card) => cardValueMap[card]);

  if (entries.length === 1) {
    details.type = "Five of a kind";
    details.typeValue = typeValueMap[details.type];
  } else if (entries.length === 2) {
    // can be both full house or four of a kind
    if (entries[0][1] == 3) {
      details.type = "Full house";
      details.typeValue = typeValueMap[details.type];
    } else {
      details.type = "Four of a kind";
      details.typeValue = typeValueMap[details.type];
    }
  } else if (entries.length === 3) {
    // can be two pair and 3 of a kind
    if (entries[0][1] == 3) {
      details.type = "Three of a kind";
      details.typeValue = typeValueMap[details.type];
    } else {
      details.type = "Two pair";
      details.typeValue = typeValueMap[details.type];
    }
  } else if (entries.length === 4) {
    details.type = "Pair";
    details.typeValue = typeValueMap[details.type];
  } else {
    details.type = "High card";
    details.typeValue = typeValueMap[details.type];
  }

  console.log(details);

  return details;
}

async function main(inputFile) {
  const lines = await helper.loadInputFile(inputFile);
  const hands = new Array(lines.length);
  let line;
  for (let i = 0; i < lines.length; i++) {
    line = lines[i].split(" ");
    hands[i] = {
      cards: line[0].split(""),
      bid: parseInt(line[1]),
    };

    hands[i].details = sortCardsInHand(hands[i].cards);
  }

  console.log(JSON.stringify(hands));

  let sortedHands = hands.sort((a, b) => {
    if (a.details.typeValue > b.details.typeValue) {
      return -1;
    } else if (a.details.typeValue === b.details.typeValue) {
      for (let i = 0; i < a.details.cardValues.length; i++) {
        if (a.details.cardValues[i] > b.details.cardValues[i]) {
          return -1;
        } else if (a.details.cardValues[i] < b.details.cardValues[i]) {
          return 1;
        }
      }
      return 1;
    }
  });

  let sum = 0;
  let rank = 0;
  for (let i = 0; i < sortedHands.length; i++) {
    rank = sortedHands.length - i; // rank is highest for the highest hand
    console.log(
      `rank: ${rank} cards: ${sortedHands[i].cards}, typeValue: ${sortedHands[i].details.typeValue} cardValues: ${sortedHands[i].details.cardValues} bid: ${sortedHands[i].bid}`
    );
    sum += sortedHands[i].bid * rank;
  }

  return sum;
}

module.exports = {
  main,
  sortCardsInHand,
};
