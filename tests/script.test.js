const { add, subtract } = require('../src/script');

test('add', () => {
  expect(add(2, 3)).toBe(6);
});

test('subtract', () => {
  expect(subtract(5, 3)).toBe(2);
});
