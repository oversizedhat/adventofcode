const main = require("./index");
const extra = require("./extra");

test.only("example", async () => {
  const result = await main.main("template/inputExample.txt");
  expect(result).toBe(1);
});

test("input", async () => {
  const result = await main.main("template/input.txt");
  expect(result).toBe(1);
});

test("extra example", async () => {
  const result = await extra.main("template/inputExample.txt");
  expect(result).toBe(1);
});

test("extra input", async () => {
  const result = await extra.main("template/input.txt");
  expect(result).toBe(1);
});
