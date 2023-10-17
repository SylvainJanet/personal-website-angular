import { fakeAsync, tick } from '@angular/core/testing';
import { debounce, exportedForTesting } from './debounce';
import { DebounceType } from './debounceType/debounceType';

describe('debounce decorator - unit', () => {
  const delayTest = 3;
  const timeOutPrefix = '__timeout__';
  const timeOutStartedSuffix = '__timeStarted';

  describe('with debounce type IMMEDIATE', () => {
    interface TestClassInterface {
      // used to access new properties defined in decorator
      [x: string]: unknown;
      action(): void;
    }
    let testObj: TestClassInterface;
    let actionSpy: jasmine.Spy<jasmine.Func>;
    beforeEach(() => {
      actionSpy = jasmine.createSpy();
      class TestClass implements TestClassInterface {
        [x: string]: unknown;
        @debounce()
        action() {
          actionSpy();
        }
      }
      testObj = new TestClass();
    });
    it('should work with default values', () => {
      testObj.action();
      expect(actionSpy)
        .withContext('decorated function should be called')
        .toHaveBeenCalledOnceWith();
    });
  });

  describe('with debounce type IMMEDIATE', () => {
    interface TestClassInterface {
      // used to access new properties defined in decorator
      [x: string]: unknown;
      action(): void;
    }
    let testObj: TestClassInterface;
    beforeEach(() => {
      class TestClass implements TestClassInterface {
        [x: string]: unknown;
        @debounce(delayTest, DebounceType.IMMEDIATE)
        action() {
          //
        }
      }
      testObj = new TestClass();
    });

    it('should create timeout property', () => {
      testObj.action();
      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeout property should exist')
        .toEqual(jasmine.anything());
      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeout property should be a number')
        .toBeInstanceOf(Number);
    });

    it('should create timeout timeStarted property', () => {
      testObj.action();
      expect(testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`])
        .withContext('timeout timeStarted property should exist')
        .toEqual(jasmine.anything());
      expect(testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`])
        .withContext('timeout timeStarted property should be a boolean')
        .toBeInstanceOf(Boolean);
    });

    it('should call immediate function', () => {
      spyOn(exportedForTesting, 'immediate');
      testObj.action();

      expect(exportedForTesting.immediate)
        .withContext(
          'immediate function should be called with the proper parameters'
        )
        .toHaveBeenCalledOnceWith(
          testObj,
          `${timeOutPrefix}action`,
          `${timeOutPrefix}action${timeOutStartedSuffix}`,
          jasmine.any(Function),
          delayTest,
          []
        );
    });
  });

  describe('with debounce type END', () => {
    interface TestClassInterface {
      // used to access new properties defined in decorator
      [x: string]: unknown;
      action(): void;
    }
    let testObj: TestClassInterface;
    beforeEach(() => {
      class TestClass implements TestClassInterface {
        [x: string]: unknown;
        @debounce(delayTest, DebounceType.END)
        action() {
          //
        }
      }
      testObj = new TestClass();
    });

    it('should create timeout property', () => {
      testObj.action();
      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeout property should exist')
        .toEqual(jasmine.anything());
      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeout property should be a number')
        .toBeInstanceOf(Number);
    });

    it('should call end function', () => {
      spyOn(exportedForTesting, 'end');
      testObj.action();

      expect(exportedForTesting.end)
        .withContext('end function should be called with the proper parameters')
        .toHaveBeenCalledOnceWith(
          testObj,
          `${timeOutPrefix}action`,
          `${timeOutPrefix}action${timeOutStartedSuffix}`,
          jasmine.any(Function),
          delayTest,
          []
        );
    });
  });

  describe('with debounce type BOTH', () => {
    interface TestClassInterface {
      // used to access new properties defined in decorator
      [x: string]: unknown;
      action(): void;
    }
    let testObj: TestClassInterface;
    beforeEach(() => {
      class TestClass implements TestClassInterface {
        [x: string]: unknown;
        @debounce(delayTest, DebounceType.BOTH)
        action() {
          //
        }
      }
      testObj = new TestClass();
    });

    it('should create timeout property', () => {
      testObj.action();
      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeout property should exist')
        .toEqual(jasmine.anything());
      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeout property should be a number')
        .toBeInstanceOf(Number);
    });

    it('should create timeout timeStarted property', () => {
      testObj.action();
      expect(testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`])
        .withContext('timeout timeStarted property should exist')
        .toEqual(jasmine.anything());
      expect(testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`])
        .withContext('timeout timeStarted property should be a boolean')
        .toBeInstanceOf(Boolean);
    });

    it('should call both function', () => {
      spyOn(exportedForTesting, 'both');
      testObj.action();

      expect(exportedForTesting.both)
        .withContext(
          'both function should be called with the proper parameters'
        )
        .toHaveBeenCalledOnceWith(
          testObj,
          `${timeOutPrefix}action`,
          `${timeOutPrefix}action${timeOutStartedSuffix}`,
          jasmine.any(Function),
          delayTest,
          []
        );
    });
  });

  describe('with debounce type PERIODIC', () => {
    interface TestClassInterface {
      // used to access new properties defined in decorator
      [x: string]: unknown;
      action(): void;
    }
    let testObj: TestClassInterface;
    beforeEach(() => {
      class TestClass implements TestClassInterface {
        [x: string]: unknown;
        @debounce(delayTest, DebounceType.PERIODIC)
        action() {
          //
        }
      }
      testObj = new TestClass();
    });

    it('should create timeout property', () => {
      testObj.action();
      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeout property should exist')
        .toEqual(jasmine.anything());
      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeout property should be a number')
        .toBeInstanceOf(Number);
    });

    it('should create timeout timeStarted property', () => {
      testObj.action();
      expect(testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`])
        .withContext('timeout timeStarted property should exist')
        .toEqual(jasmine.anything());
      expect(testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`])
        .withContext('timeout timeStarted property should be a boolean')
        .toBeInstanceOf(Boolean);
    });

    it('should call periodic function', () => {
      spyOn(exportedForTesting, 'periodic');
      testObj.action();

      expect(exportedForTesting.periodic)
        .withContext(
          'periodic function should be called with the proper parameters'
        )
        .toHaveBeenCalledOnceWith(
          testObj,
          `${timeOutPrefix}action`,
          `${timeOutPrefix}action${timeOutStartedSuffix}`,
          jasmine.any(Function),
          delayTest,
          []
        );
    });
  });

  describe('immediate function', () => {
    let key: string;
    let keyTimeStarted: string;
    let target = { key: 0, keyTimeStarted: false };
    let original: jasmine.Func;
    let args: unknown[];
    beforeEach(() => {
      key = 'key';
      keyTimeStarted = 'keyTimeStarted';
      target = { key: 0, keyTimeStarted: false };
      original = jasmine.createSpy();
      args = ['test', 1];
    });
    it('should immediately call the method', () => {
      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext('should call the original method with the arguments')
        .toHaveBeenCalledOnceWith(...args);
    });
    it('should immediately set the timeStarted property', () => {
      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(target.keyTimeStarted)
        .withContext('keyTimeStarted should be true')
        .toBeTrue();
    });
    it('should immediately set the timeOut property', () => {
      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(target.key)
        .withContext('timeOut should be greater than 1')
        .toBeGreaterThan(1);
    });
    it('should not call the method again until a delay has passed without a call', fakeAsync(() => {
      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original)
        .withContext(
          'original should have been called once with proper arguments - 1'
        )
        .toHaveBeenCalledOnceWith(...args);
      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original)
        .withContext(
          'original should have been called once with proper arguments - 2'
        )
        .toHaveBeenCalledOnceWith(...args);
      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original)
        .withContext(
          'original should have been called once with proper arguments - 3'
        )
        .toHaveBeenCalledOnceWith(...args);
      expect(original)
        .withContext('original should have been called once')
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);

      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original)
        .withContext(
          'original should have been called twice with proper arguments'
        )
        .toHaveBeenCalledTimes(2);

      tick(delayTest * 1.2);
    }));
  });
  describe('end function', () => {
    let key: string;
    let keyTimeStarted: string;
    let target = { key: 0, keyTimeStarted: false };
    let original: jasmine.Func;
    let args: unknown[];
    beforeEach(() => {
      key = 'key';
      keyTimeStarted = 'keyTimeStarted';
      target = { key: 0, keyTimeStarted: false };
      original = jasmine.createSpy();
      args = ['test', 1];
    });
    it('should call the method once the delay has passed without a call', fakeAsync(() => {
      exportedForTesting.end(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      tick(delayTest * 1.2);
      expect(original)
        .withContext(
          'original should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith(...args);
    }));
    it('should immediately set the timeOut property', () => {
      exportedForTesting.end(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(target.key)
        .withContext('timeOut property should be set')
        .toBeGreaterThan(1);
    });
    it('should not call the method until a delay has passed without a call', fakeAsync(() => {
      exportedForTesting.end(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext('original should not have been called - 1')
        .not.toHaveBeenCalled();

      exportedForTesting.end(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext('original should not have been called - 2')
        .not.toHaveBeenCalled();

      tick(delayTest * 0.8);

      expect(original)
        .withContext('original should not have been called - 3')
        .not.toHaveBeenCalled();

      tick(delayTest * 1.2);
      expect(original)
        .withContext(
          'original should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith(...args);
    }));
  });
  describe('both function', () => {
    let key: string;
    let keyTimeStarted: string;
    let target = { key: 0, keyTimeStarted: false };
    let original: jasmine.Func;
    let args: unknown[];
    beforeEach(() => {
      key = 'key';
      keyTimeStarted = 'keyTimeStarted';
      target = { key: 0, keyTimeStarted: false };
      original = jasmine.createSpy();
      args = ['test', 1];
    });
    it('should immediately call the method', () => {
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext(
          'original should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith(...args);
    });
    it('should not call the method again until a delay has passed without a call', fakeAsync(() => {
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original)
        .withContext(
          'original should have been called once with proper arguments - 1'
        )
        .toHaveBeenCalledOnceWith(...args);
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original)
        .withContext(
          'original should have been called once with proper arguments - 2'
        )
        .toHaveBeenCalledOnceWith(...args);
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original)
        .withContext(
          'original should have been called once with proper arguments - 3'
        )
        .toHaveBeenCalledOnceWith(...args);
      expect(original)
        .withContext(
          'original should have been called once with proper arguments - 4'
        )
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);

      expect(original)
        .withContext('original should have been called twice')
        .toHaveBeenCalledTimes(2);

      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original)
        .withContext('original should have been called three times')
        .toHaveBeenCalledTimes(3);

      tick(delayTest * 1.2);
    }));
    it('should immediately set the timeStarted property', () => {
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(target.keyTimeStarted)
        .withContext('timeStarted property should be set')
        .toBeTrue();
    });
    it('should immediately set the timeOut property', () => {
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(target.key)
        .withContext('timeOut property should be set')
        .toBeGreaterThan(1);
    });
    it('should call the method once the delay has passed without a call', fakeAsync(() => {
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      tick(delayTest * 1.2);
      expect(original)
        .withContext('original should have been called with proper arguments')
        .toHaveBeenCalledWith(...args);
      expect(original)
        .withContext('original should have been called twice')
        .toHaveBeenCalledTimes(2);
    }));
    it('should not call the method until a delay has passed without a call', fakeAsync(() => {
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext(
          'original should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith(...args);
      expect(original)
        .withContext('original should have been called once - 1')
        .toHaveBeenCalledTimes(1);

      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext('original should have been called once - 2')
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 0.8);
      expect(original)
        .withContext('original should have been called once - 3')
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);
      expect(original)
        .withContext('original should have been called twice')
        .toHaveBeenCalledTimes(2);
    }));
  });
  describe('periodic function', () => {
    let key: string;
    let keyTimeStarted: string;
    let target = { key: 0, keyTimeStarted: false };
    let original: jasmine.Func;
    let args: unknown[];
    beforeEach(() => {
      key = 'key';
      keyTimeStarted = 'keyTimeStarted';
      target = { key: 0, keyTimeStarted: false };
      original = jasmine.createSpy();
      args = ['test', 1];
    });

    it('should immediately set the timeStarted property', () => {
      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(target.keyTimeStarted)
        .withContext('timeStarted property should be set')
        .toBeTrue();
    });
    it('should immediately set the timeOut property', () => {
      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(target.key)
        .withContext('timeOut property should be set')
        .toBeGreaterThan(1);
    });
    it('should immediately call the method', () => {
      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext(
          'original should have been called once with the proper arguments'
        )
        .toHaveBeenCalledOnceWith(...args);
    });
    it('should not call the method again until a delay has passed', () => {
      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext(
          'original should have been called once with the proper arguments'
        )
        .toHaveBeenCalledOnceWith(...args);

      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext('original should have been called once - 1')
        .toHaveBeenCalledTimes(1);

      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext('original should have been called once - 2')
        .toHaveBeenCalledTimes(1);
    });
    it('should call the method again once a delay has passed', fakeAsync(() => {
      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext(
          'original should have been called once with the proper arguments'
        )
        .toHaveBeenCalledOnceWith(...args);

      tick(delayTest * 0.8);

      expect(original)
        .withContext('original should have been called once - 1')
        .toHaveBeenCalledTimes(1);

      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original)
        .withContext('original should have been called once - 2')
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 0.4);
      expect(original)
        .withContext('original should have been called twice')
        .toHaveBeenCalledTimes(2);

      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original)
        .withContext('original should have been called three times')
        .toHaveBeenCalledTimes(3);

      tick(delayTest * 1);
      expect(original)
        .withContext('original should have been called four times')
        .toHaveBeenCalledTimes(4);
    }));
  });
});
