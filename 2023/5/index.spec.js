const main = require("./index");
const extra = require("./extra");

test("example", async () => {
  const result = await main.main("5/inputExample.txt");
  expect(result).toBe(35);
});

test("example seed-to-soil", async () => {
  await main.main("5/inputExample.txt");
  expect(main.getMappedValue("seed-to-soil", 79)).toBe(81);
  expect(main.getMappedValue("seed-to-soil", 14)).toBe(14);
  expect(main.getMappedValue("seed-to-soil", 55)).toBe(57);
  expect(main.getMappedValue("seed-to-soil", 13)).toBe(13);
});

test("example seed-to-location", async () => {
  await main.main("5/inputExample.txt");

  const res = await main.seedToLocation(79);
  expect(res).toBe(82);

  const chain = main.getMappedValue(
    "soil-to-fertilizer",
    main.getMappedValue("seed-to-soil", 79)
  );
  expect(chain).toBe(81);
});

test("input", async () => {
  const result = await main.main("5/input.txt");
  expect(result).toBe(26273516);
});

test("extra example", async () => {
  const result = await extra.main("5/inputExample.txt");
  expect(result).toBe(46);
});

/*
seed 4188359137->4225878710 (37519573): start
time: 20.017s >>>> seed 4188359137->4225878710 (37519573): lowest 2293021398
seed 3736161691->3908507817 (172346126): start
time: 2:11.740 (m:ss.mmm) >>>> seed 3736161691->3908507817 (172346126): lowest 34039469
seed 2590035450->2656482041 (66446591): start
time: 2:53.108 (m:ss.mmm) >>>> seed 2590035450->2656482041 (66446591): lowest 34039469
seed 209124047->315702927 (106578880): start
time: 4:00.118 (m:ss.mmm) >>>> seed 209124047->315702927 (106578880): lowest 34039469
seed 1404892542->1434962533 (30069991): start
time: 4:18.441 (m:ss.mmm) >>>> seed 1404892542->1434962533 (30069991): lowest 34039469
seed 3014689843->3132116388 (117426545): start
time: 5:36.676 (m:ss.mmm) >>>> seed 3014689843->3132116388 (117426545): lowest 34039469
seed 2169439765->2395765257 (226325492): start
time: 8:16.276 (m:ss.mmm) >>>> seed 2169439765->2395765257 (226325492): lowest 34039469
seed 1511958436->1689302766 (177344330): start
time: 10:07.780 (m:ss.mmm) >>>> seed 1511958436->1689302766 (177344330): lowest 34039469
seed 1822605035->1873630145 (51025110): start
time: 10:30.752 (m:ss.mmm) >>>> seed 1822605035->1873630145 (51025110): lowest 34039469
seed 382778843->1206777369 (823998526): start
time: 19:33.391 (m:ss.mmm) >>>> seed 382778843->1206777369 (823998526): lowest 34039469
time: 19:33.391 (m:ss.mmm)
34039469
*/

// so slow...
test.skip("extra input", async () => {
  const result = await extra.main("5/input.txt");
  expect(result).toBe(34039469);
});

// too slow...
test("extra input", async () => {
  const result = await extra.main("5/inputFirstSeedPair.txt");
  expect(result).toBe(2293021398);
});
