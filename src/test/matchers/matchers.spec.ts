import { toSatisfyMatcher } from './toSatisfy/toSatisfy';
import './matchers';

beforeAll(() => {
  jasmine.addMatchers(toSatisfyMatcher);
});
