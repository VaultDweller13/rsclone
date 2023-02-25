import { getFromRange } from '../types/utils';

describe('getFromRange(min, max) should return number between min & max, inclusive', () => {
  it('0 to 99', () => {
    const [min, max] = [0, 99];

    for (let i = 0; i < 10000; i++) {
      const num = getFromRange(min, max);
      expect(num).toBeLessThanOrEqual(max);
      expect(num).toBeGreaterThanOrEqual(min);
    }
  });

  it('should work with floats', () => {
    const [min, max] = [0.5, 99.7];

    for (let i = 0; i < 10000; i++) {
      const num = getFromRange(min, max);
      expect(num).toBeLessThanOrEqual(Math.floor(max));
      expect(num).toBeGreaterThanOrEqual(Math.floor(min));
    }
  });
});
