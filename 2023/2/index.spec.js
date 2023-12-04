const main = require('./index');
const extra = require('./extra');

test('example', async() => {
    const result = await main.main("2/inputExample.txt");
    expect(result).toBe(8);
});

test('input', async() => {
    const result = await main.main("2/input.txt");
    expect(result).toBe(2795);
});

test('extra example', async() => {
    const result = await extra.main("2/inputExample.txt");
    expect(result).toBe(2286);
});

test('extra input', async() => {
    const result = await extra.main("2/input.txt");
    expect(result).toBe(75561);
});