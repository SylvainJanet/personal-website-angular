import { fakeAsync, tick } from '@angular/core/testing';
import { debounce } from './debounce';
import { DebounceType } from './debounceType/debounceType';

describe('debounce decorator - integration', () => {
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
        @debounce(delayTest, DebounceType.IMMEDIATE)
        action() {
          actionSpy();
        }
      }
      testObj = new TestClass();
    });

    it('should immediately call the method', () => {
      testObj.action();

      expect(actionSpy).toHaveBeenCalledOnceWith();
    });
    it('should immediately set the timeStarted property', () => {
      testObj.action();

      expect(
        testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`]
      ).toBeTrue();
    });
    it('should immediately set the timeOut property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action`]).toBeGreaterThan(1);
    });
    it('should not call the method again until a delay has passed without a call', fakeAsync(() => {
      testObj.action();
      expect(actionSpy).toHaveBeenCalledOnceWith();

      testObj.action();
      expect(actionSpy).toHaveBeenCalledOnceWith();

      testObj.action();
      expect(actionSpy).toHaveBeenCalledOnceWith();
      expect(actionSpy).toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);
      testObj.action();
      expect(actionSpy).toHaveBeenCalledTimes(2);
      tick(delayTest * 1.2);
    }));
  });

  describe('with debounce type END', () => {
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
        @debounce(delayTest, DebounceType.END)
        action() {
          actionSpy();
        }
      }
      testObj = new TestClass();
    });

    it('should call the method once the delay has passed without a call', fakeAsync(() => {
      testObj.action();

      tick(delayTest * 1.2);
      expect(actionSpy).toHaveBeenCalledOnceWith();
    }));
    it('should immediately set the timeOut property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action`]).toBeGreaterThan(1);
    });
    it('should not call the method until a delay has passed without a call', fakeAsync(() => {
      testObj.action();

      expect(actionSpy).not.toHaveBeenCalled();

      testObj.action();

      expect(actionSpy).not.toHaveBeenCalled();

      tick(delayTest * 0.8);
      expect(actionSpy).not.toHaveBeenCalled();

      tick(delayTest * 1.2);
      expect(actionSpy).toHaveBeenCalledOnceWith();
    }));
  });
  describe('with debounce type BOTH', () => {
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
        @debounce(delayTest, DebounceType.BOTH)
        action() {
          actionSpy();
        }
      }
      testObj = new TestClass();
    });

    it('should immediately call the method', () => {
      testObj.action();

      expect(actionSpy).toHaveBeenCalledOnceWith();
    });
    it('should not call the method again until a delay has passed without a call', fakeAsync(() => {
      testObj.action();
      expect(actionSpy).toHaveBeenCalledOnceWith();
      testObj.action();
      expect(actionSpy).toHaveBeenCalledOnceWith();
      testObj.action();
      expect(actionSpy).toHaveBeenCalledOnceWith();
      expect(actionSpy).toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);
      expect(actionSpy).toHaveBeenCalledTimes(2);

      testObj.action();
      expect(actionSpy).toHaveBeenCalledTimes(3);
      tick(delayTest * 1.2);
    }));
    it('should immediately set the timeStarted property', () => {
      testObj.action();

      expect(
        testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`]
      ).toBeTrue();
    });
    it('should immediately set the timeOut property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action`]).toBeGreaterThan(1);
    });
    it('should call the method once the delay has passed without a call', fakeAsync(() => {
      testObj.action();

      tick(delayTest * 1.2);
      expect(actionSpy).toHaveBeenCalledWith();
      expect(actionSpy).toHaveBeenCalledTimes(2);
    }));
    it('should not call the method until a delay has passed without a call', fakeAsync(() => {
      testObj.action();

      expect(actionSpy).toHaveBeenCalledOnceWith();
      expect(actionSpy).toHaveBeenCalledTimes(1);

      testObj.action();

      expect(actionSpy).toHaveBeenCalledTimes(1);

      tick(delayTest * 0.8);
      expect(actionSpy).toHaveBeenCalledTimes(1);

      tick(delayTest * 0.4);
      expect(actionSpy).toHaveBeenCalledTimes(2);
    }));
  });

  describe('with debounce type PERIODIC', () => {
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
        @debounce(delayTest, DebounceType.PERIODIC)
        action() {
          actionSpy();
        }
      }
      testObj = new TestClass();
    });

    it('should immediately set the timeStarted property', () => {
      testObj.action();

      expect(
        testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`]
      ).toBeTrue();
    });
    it('should immediately set the timeOut property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action`]).toBeGreaterThan(1);
    });
    it('should immediately call the method', () => {
      testObj.action();

      expect(actionSpy).toHaveBeenCalledOnceWith();
    });
    it('should not call the method again until a delay has passed', () => {
      testObj.action();

      expect(actionSpy).toHaveBeenCalledOnceWith();

      testObj.action();

      expect(actionSpy).toHaveBeenCalledTimes(1);

      testObj.action();

      expect(actionSpy).toHaveBeenCalledTimes(1);
    });
    it('should call the method again once a delay has passed', fakeAsync(() => {
      testObj.action();

      expect(actionSpy).toHaveBeenCalledOnceWith();

      tick(delayTest * 0.8);
      expect(actionSpy).toHaveBeenCalledTimes(1);

      testObj.action();

      expect(actionSpy).toHaveBeenCalledTimes(1);

      tick(delayTest * 0.4);
      expect(actionSpy).toHaveBeenCalledTimes(2);

      testObj.action();
      expect(actionSpy).toHaveBeenCalledTimes(3);

      tick(delayTest * 1);
      expect(actionSpy).toHaveBeenCalledTimes(4);
    }));
  });
});
