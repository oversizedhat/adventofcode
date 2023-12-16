const main = require("./index");
//const extra = require("./extra");

test.only("example", async () => {
  const result = await main.main("12/inputExample.txt");
  expect(result).toBe(21);
});

test("???.### 1,1,3", () => {
  const result = main.determinePossibleArrangements("???.###", [1,1,3]);
  expect(result).toBe(1);
});

test(".??..??...?##.", () => {
  const result = main.determinePossibleArrangements(".??..??...?##.", [1,1,3]);
  expect(result).toBe(4);
});

test.ony("input", async () => {
  const result = await main.main("12/input.txt");
  expect(result).toBe(6871);
});
/*
test("extra example", async () => {
  const result = await extra.main("12/inputExample.txt");
  expect(result).toBe(1);
});

test("???.### 1,1,3", () => {
  const result = extra.determinePossibleArrangements("???.###", [1,1,3]);
  expect(result).toBe(1);
});

test(".??..??...?##.", () => {
  const result = extra.determinePossibleArrangements(".??..??...?##.", [1,1,3]);
  expect(result).toBe(16384);
});

test("extra input", async () => {
  const result = await extra.main("12/input.txt");
  expect(result).toBe(1);
});*/
