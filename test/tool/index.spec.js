import { sum } from '../../src/tool/index';

// test('test 1 plus 2 result', () => {
//   expect(sum(1, 2)).toBe(3);
// });
// test('test 3 plus 2 result', () => {
//   expect(sum(3, 2)).toBe(5);
// });
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeFalsy();
  expect(z).not.toBeTruthy();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
});
test('2 plus 2 result', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeLessThan(5);
  expect(value).toBeGreaterThanOrEqual(4);
  expect(value).toBeLessThanOrEqual(4.5);
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
test('object equal', () => {
  const d = { a: 1 };
  d['b'] = 2;
  expect(d).toEqual({ a: 1, b: 2 });
});
test('float equal', () => {
  const v = sum(0.1, 0.2);
  expect(v).toBeCloseTo(0.3);
  expect(v).toBe(0.30000000000000004);
});
test('string match', () => {
  const s = 'i am Chinese';
  expect(s).toMatch(/ine/);
});