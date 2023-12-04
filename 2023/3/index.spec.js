const main = require('./index');
const extra = require('./extra');

test('example', async() => {
    const result = await main.main("3/inputExample.txt");
    expect(result).toBe(4361);
});

test('input', async() => {
    const result = await main.main("3/input.txt");
    expect(result).toBe(540212);
});

test('extra example', async() => {
    const result = await extra.main("3/inputExample.txt");
    expect(result).toBe(467835);
});

test('extra input', async() => {
    const result = await extra.main("3/input.txt");
    expect(result).toBe(87605697);
});