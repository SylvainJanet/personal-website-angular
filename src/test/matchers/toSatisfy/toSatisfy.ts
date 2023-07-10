/**
 * Jasmine matcher used to check if an object matches a predicate given as a
 * parameter.
 */
export const toSatisfyMatcher: jasmine.CustomMatcherFactories = {
  toSatisfy: function (matchersUtil: jasmine.MatchersUtil) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      compare: function (actual: any, predicate: (x: any) => boolean) {
        const result = { pass: false, message: '' };

        result.pass = matchersUtil.equals(predicate(actual), true);

        if (result.pass) {
          result.message =
            'Expected ' + actual + ' to satisfy predicate ' + predicate;
        } else {
          result.message =
            'Expected ' +
            actual +
            ' to satisfy predicate ' +
            predicate +
            ", but it doesn't";
        }
        return result;
      },
    };
  },
};
