const main = require("./index");
const extra = require("./extra");

test("example", async () => {
  const result = await main.main("6/inputExample.txt");
  expect(result).toBe(288);
});

test("input", async () => {
  const result = await main.main("6/input.txt");
  expect(result).toBe(1155175);
});

test.only("extra example", async () => {
  const result = await extra.main("6/inputExample.txt");
  expect(result).toBe(71503);
});

test.only("extra input", async () => {
  const result = await extra.main("6/input.txt");
  expect(result).toBe(35961505);
});
