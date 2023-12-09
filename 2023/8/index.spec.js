const main = require("./index");
const extra = require("./extra");

test("example should require 2 steps", async () => {
  const result = await main.main("8/inputExample.txt");
  expect(result).toBe(2);
});


test("example2 should require 6 steps", async () => {
  const result = await main.main("8/inputExample2.txt");
  expect(result).toBe(6);
});

test("input", async () => {
  const result = await main.main("8/input.txt");
  expect(result).toBe(21883);
});

test("extra example should require 6 steps", async () => {
  const result = await extra.main("8/inputExtraExample.txt");
  expect(result).toBe(6);
});

test("extra example should require 6 steps (brute force lcm)", async () => {
  const result = await extra.main("8/inputExtraExample.txt", false);
  expect(result).toBe(6);
});

test("extra input", async () => {
  const result = await extra.main("8/input.txt");
  expect(result).toBe(12833235391111);
});

// to slow...
test.skip("extra input (brute force)", async () => {
  const result = await extra.main("8/input.txt", false);
  expect(result).toBe(12833235391111);
});