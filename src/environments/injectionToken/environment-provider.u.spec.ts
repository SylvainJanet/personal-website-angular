import { environment } from '../environment';
import { getEnv } from './environment-provider';

describe('injectionToken', () => {
  describe('getEnv function', () => {
    it('should return the environment', () => {
      const expected = environment;
      const actual = getEnv();
      expect(actual)
        .withContext('environment should be as expected')
        .toBe(expected);
    });
  });
});
