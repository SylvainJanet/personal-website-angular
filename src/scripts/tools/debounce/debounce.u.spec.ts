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
      expect(actionSpy).toHaveBeenCalledOnceWith();
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
      expect(testObj[`${timeOutPrefix}action`]).toBeTruthy();
      expect(testObj[`${timeOutPrefix}action`]).toBeInstanceOf(Number);
    });

    it('should create timeout timeStarted property', () => {
      testObj.action();
      expect(
        testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`]
      ).toBeTruthy();
      expect(
        testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`]
      ).toBeInstanceOf(Boolean);
    });

    it('should call immediate function', () => {
      spyOn(exportedForTesting, 'immediate');
      testObj.action();

      expect(exportedForTesting.immediate).toHaveBeenCalledOnceWith(
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
      expect(testObj[`${timeOutPrefix}action`]).toBeTruthy();
      expect(testObj[`${timeOutPrefix}action`]).toBeInstanceOf(Number);
    });

    it('should call end function', () => {
      spyOn(exportedForTesting, 'end');
      testObj.action();

      expect(exportedForTesting.end).toHaveBeenCalledOnceWith(
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
      expect(testObj[`${timeOutPrefix}action`]).toBeTruthy();
      expect(testObj[`${timeOutPrefix}action`]).toBeInstanceOf(Number);
    });

    it('should create timeout timeStarted property', () => {
      testObj.action();
      expect(
        testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`]
      ).toBeTruthy();
      expect(
        testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`]
      ).toBeInstanceOf(Boolean);
    });

    it('should call both function', () => {
      spyOn(exportedForTesting, 'both');
      testObj.action();

      expect(exportedForTesting.both).toHaveBeenCalledOnceWith(
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
      expect(testObj[`${timeOutPrefix}action`]).toBeTruthy();
      expect(testObj[`${timeOutPrefix}action`]).toBeInstanceOf(Number);
    });

    it('should create timeout timeStarted property', () => {
      testObj.action();
      expect(
        testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`]
      ).toBeTruthy();
      expect(
        testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`]
      ).toBeInstanceOf(Boolean);
    });

    it('should call periodic function', () => {
      spyOn(exportedForTesting, 'periodic');
      testObj.action();

      expect(exportedForTesting.periodic).toHaveBeenCalledOnceWith(
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

      expect(original).toHaveBeenCalledOnceWith(...args);
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

      expect(target.keyTimeStarted).toBeTrue();
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

      expect(target.key).toBeGreaterThan(1);
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
      expect(original).toHaveBeenCalledOnceWith(...args);
      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original).toHaveBeenCalledOnceWith(...args);
      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original).toHaveBeenCalledOnceWith(...args);
      expect(original).toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);

      exportedForTesting.immediate(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original).toHaveBeenCalledTimes(2);

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
      expect(original).toHaveBeenCalledOnceWith(...args);
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

      expect(target.key).toBeGreaterThan(1);
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

      expect(original).not.toHaveBeenCalled();

      exportedForTesting.end(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original).not.toHaveBeenCalled();

      tick(delayTest * 0.8);

      expect(original).not.toHaveBeenCalled();

      tick(delayTest * 1.2);
      expect(original).toHaveBeenCalledOnceWith(...args);
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

      expect(original).toHaveBeenCalledOnceWith(...args);
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
      expect(original).toHaveBeenCalledOnceWith(...args);
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original).toHaveBeenCalledOnceWith(...args);
      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original).toHaveBeenCalledOnceWith(...args);
      expect(original).toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);

      expect(original).toHaveBeenCalledTimes(2);

      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original).toHaveBeenCalledTimes(3);

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

      expect(target.keyTimeStarted).toBeTrue();
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

      expect(target.key).toBeGreaterThan(1);
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
      expect(original).toHaveBeenCalledWith(...args);
      expect(original).toHaveBeenCalledTimes(2);
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

      expect(original).toHaveBeenCalledOnceWith(...args);
      expect(original).toHaveBeenCalledTimes(1);

      exportedForTesting.both(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original).toHaveBeenCalledTimes(1);

      tick(delayTest * 0.8);
      expect(original).toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);
      expect(original).toHaveBeenCalledTimes(2);
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

      expect(target.keyTimeStarted).toBeTrue();
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

      expect(target.key).toBeGreaterThan(1);
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

      expect(original).toHaveBeenCalledOnceWith(...args);
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

      expect(original).toHaveBeenCalledOnceWith(...args);

      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original).toHaveBeenCalledTimes(1);

      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original).toHaveBeenCalledTimes(1);
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

      expect(original).toHaveBeenCalledOnceWith(...args);

      tick(delayTest * 0.8);

      expect(original).toHaveBeenCalledTimes(1);

      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );

      expect(original).toHaveBeenCalledTimes(1);

      tick(delayTest * 0.4);
      expect(original).toHaveBeenCalledTimes(2);

      exportedForTesting.periodic(
        target,
        key,
        keyTimeStarted,
        original,
        delayTest,
        args
      );
      expect(original).toHaveBeenCalledTimes(3);

      tick(delayTest * 1);
      expect(original).toHaveBeenCalledTimes(4);
    }));
  });
});
