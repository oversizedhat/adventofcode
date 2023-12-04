const main = require('./index');
const extra = require('./extra');

test('example', async() => {
    const result = await main.main("4/inputExample.txt");
    expect(result).toBe(13);
});

test('input', async() => {
    const result = await main.main("4/input.txt");
    expect(result).toBe(25183);
});

test('extra example', async() => {
    const result = await extra.main("4/inputExample.txt");
    expect(result).toBe(30);
});

test('extra input', async() => {
    const result = await extra.main("4/input.txt");
    expect(result).toBe(5667240);
});