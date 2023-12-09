const main = require("./index");
const extra = require("./extra");

test("example", async () => {
  const result = await main.main("9/inputExample.txt");
  expect(result).toBe(114);
});

test("input", async () => {
  const result = await main.main("9/input.txt");
  // too low 2105647766
  expect(result).toBe(2105961943);
});

test.only("extra example", async () => {
  const result = await extra.main("9/inputExample.txt");
  expect(result).toBe(2);
});

test.only("extra input", async () => {
  const result = await extra.main("9/input.txt");
  expect(result).toBe(1019);
});
