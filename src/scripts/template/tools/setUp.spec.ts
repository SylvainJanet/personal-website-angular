import { scriptVar } from './setUp';

describe('setUp', () => {
  it('should return the setup object', () => {
    expect(scriptVar).toBeTruthy();
  });
});