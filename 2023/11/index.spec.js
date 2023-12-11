const main = require("./index");

test("example", async () => {
  const result = await main.main("11/inputExample.txt", 2);
  expect(result).toBe(374);
});

test.skip("input", async () => {
  const result = await main.main("11/input.txt", 2);
  expect(result).toBe(9563821);
});

test("extra example 10", async () => {
  const result = await main.main("11/inputExample.txt", 10);
  expect(result).toBe(1030);
});

test("extra example 100", async () => {
  const result = await main.main("11/inputExample.txt", 100);
  expect(result).toBe(8410);
});

test.skip("extra input", async () => {
  const result = await main.main("11/input.txt", 1000000);
  expect(result).toBe(827009909817);
});
