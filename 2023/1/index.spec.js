const main = require('./index');
const extra = require('./extra');

test('example', async() => {
    const result = await main.main("1/inputExample.txt");
    expect(result).toBe(142);
});

test('input', async() => {
    const result = await main.main("1/input.txt");
    expect(result).toBe(54601);
});

test('extra example', async() => {
    const result = await extra.main("1/inputExample2.txt");
    expect(result).toBe(281);
});

test('extra input', async() => {
    const result = await extra.main("1/input.txt");
    expect(result).toBe(54078);
});