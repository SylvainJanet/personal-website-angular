import { IEnvironment } from 'src/environments/interface/ienvironment';
import { LogLocalStorage } from './log-local-storage';
import { environment as devEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { LogEntry } from '../../logEntry/logEntry';

let logLocalStorage: LogLocalStorage;
let devEnv: IEnvironment;
let stagingEnv: IEnvironment;
let prodEnv: IEnvironment;
const expectedMaxSizeDev = 1000;
const expectedMaxSizeStaging = 1000;
const expectedMaxSizeProd = 100;
const expectedLoggingLocation = 'logging';

describe('LogLocalStorage', () => {
  beforeEach(() => {
    devEnv = devEnvironment;
    stagingEnv = stagingEnvironment;
    prodEnv = prodEnvironment;
  });

  // non environment specific tests
  const hasLoggingLocationExpectation = "should have 'logging' as location";
  const hasLoggingLocation = () => {
    const expected = expectedLoggingLocation;
    const actual = logLocalStorage.location;
    expect(actual).withContext('location should be set').toBe(expected);
  };

  // environment specific tests that can be factored
  const hasMaxSizeExpectation = (nbr: number) =>
    'should have maxSize of ' + nbr;
  const hasMaxSize = (nbr: number) => {
    const expected = nbr;
    const actual = logLocalStorage.maxSize;
    expect(actual)
      .withContext('should have maxSize as expected')
      .toBe(expected);
  };

  // tests suites for each environment

  describe('in dev environment', () => {
    beforeEach(() => {
      logLocalStorage = new LogLocalStorage(devEnv);
    });

    const expectedMaxSize = expectedMaxSizeDev;
    it(hasLoggingLocationExpectation, hasLoggingLocation);
    it(hasMaxSizeExpectation(expectedMaxSize), () =>
      hasMaxSize(expectedMaxSize)
    );
  });

  describe('in staging environment', () => {
    beforeEach(() => {
      logLocalStorage = new LogLocalStorage(stagingEnv);
    });

    const expectedMaxSize = expectedMaxSizeStaging;
    it(hasLoggingLocationExpectation, hasLoggingLocation);
    it(hasMaxSizeExpectation(expectedMaxSize), () =>
      hasMaxSize(expectedMaxSize)
    );
  });

  describe('in prod environment', () => {
    beforeEach(() => {
      logLocalStorage = new LogLocalStorage(prodEnv);
    });

    const expectedMaxSize = expectedMaxSizeProd;
    it(hasLoggingLocationExpectation, hasLoggingLocation);
    it(hasMaxSizeExpectation(expectedMaxSize), () =>
      hasMaxSize(expectedMaxSize)
    );
  });

  describe('pushOrShift method', () => {
    const pushOrShiftShouldPushExpectation = (maxSize: number) =>
      'should push an Entry when the array has less than ' +
      maxSize +
      ' elements';
    const pushOrShiftShouldPush = (env: IEnvironment) => (maxSize: number) => {
      const input_before = [];
      const input = [];
      for (let i = 0; i < maxSize - 1; i++) {
        const entry_existing = new LogEntry(env);
        input.push(entry_existing);
        input_before.push(entry_existing);
      }

      const to_push = new LogEntry(env);
      logLocalStorage.pushOrShift(input, to_push);

      const expected_length = maxSize;
      const actual_length = input.length;
      expect(actual_length)
        .withContext('length should be as expected')
        .toBe(expected_length);

      for (let i = 0; i < maxSize - 1; i++) {
        expect(input[i])
          .withContext('element' + i + 'should be as expected')
          .toBe(input_before[i]);
      }

      const pushed = input[input.length - 1];
      expect(pushed)
        .withContext('last element should be as expected')
        .toBe(to_push);
    };

    const pushOrShiftShouldShiftExpectation = (maxSize: number) =>
      'should push an Entry when the array has more than (or exactly) ' +
      maxSize +
      ' elements';
    const pushOrShiftShouldShift = (env: IEnvironment) => (maxSize: number) => {
      const input_before = [];
      const input = [];
      for (let i = 0; i < maxSize; i++) {
        const entry_existing = new LogEntry(env);
        input.push(entry_existing);
        input_before.push(entry_existing);
      }

      const to_push = new LogEntry(env);
      logLocalStorage.pushOrShift(input, to_push);

      const expected_length = maxSize;
      const actual_length = input.length;
      expect(actual_length)
        .withContext('length should be as expected')
        .toBe(expected_length);

      for (let i = 0; i < maxSize - 1; i++) {
        expect(input[i])
          .withContext('element' + i + 'should be as expected')
          .toBe(input_before[i + 1]);
      }

      const pushed = input[input.length - 1];
      expect(pushed)
        .withContext('last element should be as expected')
        .toBe(to_push);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        logLocalStorage = new LogLocalStorage(devEnv);
      });

      const expectedMaxSize = expectedMaxSizeDev;
      it(pushOrShiftShouldPushExpectation(expectedMaxSize), () =>
        pushOrShiftShouldPush(devEnv)(expectedMaxSize)
      );
      it(pushOrShiftShouldShiftExpectation(expectedMaxSize), () =>
        pushOrShiftShouldShift(devEnv)(expectedMaxSize)
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        logLocalStorage = new LogLocalStorage(stagingEnv);
      });

      const expectedMaxSize = expectedMaxSizeStaging;
      it(pushOrShiftShouldPushExpectation(expectedMaxSize), () =>
        pushOrShiftShouldPush(stagingEnv)(expectedMaxSize)
      );
      it(pushOrShiftShouldShiftExpectation(expectedMaxSize), () =>
        pushOrShiftShouldShift(stagingEnv)(expectedMaxSize)
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        logLocalStorage = new LogLocalStorage(prodEnv);
      });

      const expectedMaxSize = expectedMaxSizeProd;
      it(pushOrShiftShouldPushExpectation(expectedMaxSize), () =>
        pushOrShiftShouldPush(prodEnv)(expectedMaxSize)
      );
      it(pushOrShiftShouldShiftExpectation(expectedMaxSize), () =>
        pushOrShiftShouldShift(prodEnv)(expectedMaxSize)
      );
    });
  });

  describe('clear method', () => {
    beforeEach(() => {
      // https://github.com/jasmine/jasmine/issues/299
      spyOn(Storage.prototype, 'removeItem');
    });

    const clearLocalStorageExpectation =
      'should clear the localStorage at expected location';
    const clearLocalStorage = () => {
      logLocalStorage.clear();
      expect(localStorage.removeItem)
        .withContext(
          'removeItem should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith(logLocalStorage.location);
    };

    const returnTrueAfterClearingExpectation =
      'should return true after clearing';
    const returnTrueAfterClearing = (done: DoneFn) => {
      const expected = true;
      const result = logLocalStorage.clear();

      result.subscribe({
        next: (actual) => {
          expect(actual).withContext('should return true').toBe(expected);
          done();
        },
        error: (e) => done.fail('log clear failed - ' + e),
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        logLocalStorage = new LogLocalStorage(devEnv);
      });
      it(clearLocalStorageExpectation, clearLocalStorage);
      it(returnTrueAfterClearingExpectation, returnTrueAfterClearing);
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        logLocalStorage = new LogLocalStorage(stagingEnv);
      });
      it(clearLocalStorageExpectation, clearLocalStorage);
      it(returnTrueAfterClearingExpectation, returnTrueAfterClearing);
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        logLocalStorage = new LogLocalStorage(prodEnv);
      });
      it(clearLocalStorageExpectation, clearLocalStorage);
      it(returnTrueAfterClearingExpectation, returnTrueAfterClearing);
    });
  });

  let localStorageSetItemSpy: jasmine.Spy<(key: string, value: string) => void>;

  describe('log method', () => {
    const shouldSetItemExpectation =
      'should set Item in local storage at the appropriate location when the localStorage already has a value';
    const shouldSetItem = (env: IEnvironment) => {
      const input = new LogEntry(env);

      localStorage.clear();

      logLocalStorage.log(input);
      // https://github.com/jasmine/jasmine/issues/299
      localStorageSetItemSpy = spyOn(Storage.prototype, 'setItem');

      logLocalStorage.log(input);

      expect(localStorage.setItem)
        .withContext(
          'setItem should have been called once with proper arguments'
        )
        .toHaveBeenCalledWith(expectedLoggingLocation, jasmine.any(String));
    };
    const shouldSetNewItemExpectation =
      'should set Item in local storage at the appropriate location when the localStorage has no value';
    const shouldSetNewItem = (env: IEnvironment) => {
      const input = new LogEntry(env);

      localStorage.clear();

      localStorageSetItemSpy = spyOn(Storage.prototype, 'setItem');

      logLocalStorage.log(input);

      expect(localStorage.setItem)
        .withContext(
          'setItem should have been called once with proper arguments'
        )
        .toHaveBeenCalledWith(expectedLoggingLocation, jasmine.any(String));
    };

    const shouldPushOrShiftExpectation =
      'should use pushOrShift to avoid putting to much into localStorage';
    const shouldPushOrShift = (env: IEnvironment) => {
      localStorageSetItemSpy = spyOn(Storage.prototype, 'setItem');
      const input = new LogEntry(env);

      logLocalStorage.log(input);

      expect(logLocalStorage.pushOrShift)
        .withContext(
          'pushOrShift should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith(jasmine.any(Array), input);
    };

    const shouldReturnTrueExpectation = 'should return true after logging';
    const shouldReturnTrue = (env: IEnvironment, done: DoneFn) => {
      localStorageSetItemSpy = spyOn(Storage.prototype, 'setItem');
      const input = new LogEntry(env);

      const expected = true;
      const result = logLocalStorage.log(input);

      result.subscribe({
        next: (actual) => {
          expect(actual).withContext('should return true').toBe(expected);
          done();
        },
        error: (e) => done.fail('log clear failed - ' + e),
      });
    };

    const shouldConsoleLogExceptionExpectation =
      'should log in console an exception if one occurs';
    const shouldConsoleLogException = (env: IEnvironment) => {
      localStorageSetItemSpy = spyOn(Storage.prototype, 'setItem');
      const input = new LogEntry(env);

      spyOn(window.console, 'log');
      localStorageSetItemSpy.and.throwError('Test error');

      logLocalStorage.log(input);

      expect(window.console.log)
        .withContext('log should have been called once with proper arguments')
        .toHaveBeenCalledOnceWith(new Error('Test error'));
    };

    const shouldReturnFalseWhenExceptonExpectation =
      'should return false if an exception occurs after logging';
    const shouldReturnFalseWhenExcepton = (env: IEnvironment, done: DoneFn) => {
      localStorageSetItemSpy = spyOn(Storage.prototype, 'setItem');
      const input = new LogEntry(env);

      const expected = false;

      localStorageSetItemSpy.and.throwError('Test error');

      const result = logLocalStorage.log(input);

      result.subscribe({
        next: (actual) => {
          expect(actual).withContext('should return false').toBe(expected);
          done();
        },
        error: (e) => done.fail('log clear failed - ' + e),
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        logLocalStorage = new LogLocalStorage(devEnv);
        spyOn(logLocalStorage, 'pushOrShift');
      });
      it(shouldSetItemExpectation, () => shouldSetItem(devEnv));
      it(shouldSetNewItemExpectation, () => shouldSetNewItem(devEnv));
      it(shouldPushOrShiftExpectation, () => shouldPushOrShift(devEnv));
      it(shouldReturnTrueExpectation, (done: DoneFn) =>
        shouldReturnTrue(devEnv, done)
      );
      it(shouldConsoleLogExceptionExpectation, () =>
        shouldConsoleLogException(devEnv)
      );
      it(shouldReturnFalseWhenExceptonExpectation, (done: DoneFn) =>
        shouldReturnFalseWhenExcepton(devEnv, done)
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        logLocalStorage = new LogLocalStorage(stagingEnv);
        spyOn(logLocalStorage, 'pushOrShift');
      });
      it(shouldSetItemExpectation, () => shouldSetItem(stagingEnv));
      it(shouldSetNewItemExpectation, () => shouldSetNewItem(stagingEnv));
      it(shouldPushOrShiftExpectation, () => shouldPushOrShift(stagingEnv));
      it(shouldReturnTrueExpectation, (done: DoneFn) =>
        shouldReturnTrue(stagingEnv, done)
      );
      it(shouldConsoleLogExceptionExpectation, () =>
        shouldConsoleLogException(stagingEnv)
      );
      it(shouldReturnFalseWhenExceptonExpectation, (done: DoneFn) =>
        shouldReturnFalseWhenExcepton(stagingEnv, done)
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        logLocalStorage = new LogLocalStorage(prodEnv);
        spyOn(logLocalStorage, 'pushOrShift');
      });
      it(shouldSetItemExpectation, () => shouldSetItem(prodEnv));
      it(shouldSetNewItemExpectation, () => shouldSetNewItem(prodEnv));
      it(shouldPushOrShiftExpectation, () => shouldPushOrShift(prodEnv));
      it(shouldReturnTrueExpectation, (done: DoneFn) =>
        shouldReturnTrue(prodEnv, done)
      );
      it(shouldConsoleLogExceptionExpectation, () =>
        shouldConsoleLogException(prodEnv)
      );
      it(shouldReturnFalseWhenExceptonExpectation, (done: DoneFn) =>
        shouldReturnFalseWhenExcepton(prodEnv, done)
      );
    });
  });
});
