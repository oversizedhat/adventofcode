const main = require("./index");
const extra = require("./extra");

test("example", async () => {
  const result = await main.main("10/inputExample.txt");
  expect(result).toBe(4);
});

test("input", async () => {
  const result = await main.main("10/input.txt");
  expect(result).toBe(6886);
});

test("extra example", async () => {
  const result = await extra.main("10/inputExtraExample.txt");
  expect(result).toBe(4);
});

test("extra example 2", async () => {
  const result = await extra.main("10/inputExtraExample2.txt");
  expect(result).toBe(8);
});

test.skip("extra example 3", async () => {
  const result = await extra.main("10/inputExtraExample3.txt");
  expect(result).toBe(10);
});

test.skip("extra input", async () => {
  const result = await extra.main("10/input.txt");
  expect(result).toBe(1);
});
