const main = require("./index");
const extra = require("./extra");

test("cardsort - Five of a kind", async () => {
  let cards = ['A','A','A','A','A'];
  expect(main.sortCardsInHand(cards).typeValue).toBe(7);
  expect(main.sortCardsInHand(cards).cardValues[0]).toBe(14);
});

test("cardsort - Four of a kind", async () => {
  let cards = ['2','A','A','A','A'];
  expect(main.sortCardsInHand(cards).typeValue).toBe(6);
  expect(main.sortCardsInHand(cards).cardValues[0]).toBe(2);
});

test("cardsort - Full house", async () => {
  let cards = ['2','2','A','A','A'];
  expect(main.sortCardsInHand(cards).typeValue).toBe(5);
  expect(main.sortCardsInHand(cards).cardValues[0]).toBe(2);
  expect(main.sortCardsInHand(cards).cardValues[1]).toBe(2);
});

test("cardsort - Three of a kind", async () => {
   let cards = ['T','3','T','4','T'];
   expect(main.sortCardsInHand(cards).typeValue).toBe(4);
   expect(main.sortCardsInHand(cards).cardValues[0]).toBe(10);
});

test("cardsort - Two pair", async () => {
  let cards = ['5','3','T','3','T'];
  expect(main.sortCardsInHand(cards).typeValue).toBe(3);
  expect(main.sortCardsInHand(cards).cardValues[0]).toBe(5);
  expect(main.sortCardsInHand(cards).cardValues[1]).toBe(3);
});

test("cardsort - Two pair #2", async () => {
  let cards = ['3','3','T','5','T'];
  expect(main.sortCardsInHand(cards).typeValue).toBe(3);
  expect(main.sortCardsInHand(cards).cardValues[0]).toBe(3);
  expect(main.sortCardsInHand(cards).cardValues[1]).toBe(3);
});

test("cardsort - Pair", async () => {
  let cards = ['5','3','T','4','T'];
  expect(main.sortCardsInHand(cards).typeValue).toBe(2);
  expect(main.sortCardsInHand(cards).cardValues[0]).toBe(5);
});

test("cardsort - High card", async () => {
  let cards = ['T','3','2','4','5'];
  expect(main.sortCardsInHand(cards).typeValue).toBe(1);
  expect(main.sortCardsInHand(cards).cardValues[0]).toBe(10);
});

test("example", async () => {
  const result = await main.main("7/inputExample.txt");
  expect(result).toBe(6440);
});

//247521010 too low!! based on card value being correct...
test.skip("input", async () => {
  const result = await main.main("7/input.txt");
  expect(result).toBe(248559379);
});

test.only("extra example", async () => {
  const result = await extra.main("7/inputExample.txt");
  expect(result).toBe(5905);
});

// 249566959 too low (probably due to joker being 1)...
test.only("extra input", async () => {
  const result = await extra.main("7/input.txt");
  expect(result).toBe(249631254);
});
