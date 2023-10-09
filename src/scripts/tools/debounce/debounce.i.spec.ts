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

      expect(actionSpy)
        .withContext('action should have been called once')
        .toHaveBeenCalledOnceWith();
    });
    it('should immediately set the timeStarted property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`])
        .withContext('timeStarted property should be set')
        .toBeTrue();
    });
    it('should immediately set the timeOut property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeOut property should be set')
        .toBeGreaterThan(1);
    });
    it('should not call the method again until a delay has passed without a call', fakeAsync(() => {
      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called once - 1')
        .toHaveBeenCalledOnceWith();

      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called once - 2')
        .toHaveBeenCalledOnceWith();

      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called once - 3')
        .toHaveBeenCalledOnceWith();
      expect(actionSpy)
        .withContext('action should have been called once - 4')
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);
      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called twice')
        .toHaveBeenCalledTimes(2);
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
      expect(actionSpy)
        .withContext('action should have been called once')
        .toHaveBeenCalledOnceWith();
    }));
    it('should immediately set the timeOut property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeOut property should be set')
        .toBeGreaterThan(1);
    });
    it('should not call the method until a delay has passed without a call', fakeAsync(() => {
      testObj.action();

      expect(actionSpy)
        .withContext('action should not have been called - 1')
        .not.toHaveBeenCalled();

      testObj.action();

      expect(actionSpy)
        .withContext('action should not have been called - 2')
        .not.toHaveBeenCalled();

      tick(delayTest * 0.8);
      expect(actionSpy)
        .withContext('action should not have been called - 3')
        .not.toHaveBeenCalled();

      tick(delayTest * 1.2);
      expect(actionSpy)
        .withContext('action should have been called once')
        .toHaveBeenCalledOnceWith();
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

      expect(actionSpy)
        .withContext('action should have been called once')
        .toHaveBeenCalledOnceWith();
    });
    it('should not call the method again until a delay has passed without a call', fakeAsync(() => {
      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called once - 1')
        .toHaveBeenCalledOnceWith();
      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called once - 2')
        .toHaveBeenCalledOnceWith();
      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called once - 3')
        .toHaveBeenCalledOnceWith();
      expect(actionSpy)
        .withContext('action should have been called once - 4')
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 1.2);
      expect(actionSpy)
        .withContext('action should have been called twice')
        .toHaveBeenCalledTimes(2);

      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called three times')
        .toHaveBeenCalledTimes(3);
      tick(delayTest * 1.2);
    }));
    it('should immediately set the timeStarted property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`])
        .withContext('timeStarted property should be set')
        .toBeTrue();
    });
    it('should immediately set the timeOut property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeOut property should be set')
        .toBeGreaterThan(1);
    });
    it('should call the method once the delay has passed without a call', fakeAsync(() => {
      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called once - 1')
        .toHaveBeenCalledWith();

      tick(delayTest * 1.2);
      expect(actionSpy)
        .withContext('action should have been called once - 2')
        .toHaveBeenCalledWith();
      expect(actionSpy)
        .withContext('action should have been called twice')
        .toHaveBeenCalledTimes(2);
    }));
    it('should not call the method until a delay has passed without a call', fakeAsync(() => {
      testObj.action();

      expect(actionSpy)
        .withContext('action should have been called once - 1')
        .toHaveBeenCalledOnceWith();
      expect(actionSpy)
        .withContext('action should have been called once - 2')
        .toHaveBeenCalledTimes(1);

      testObj.action();

      expect(actionSpy)
        .withContext('action should have been called once - 3')
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 0.8);
      expect(actionSpy)
        .withContext('action should have been called once - 4')
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 0.4);
      expect(actionSpy)
        .withContext('action should have been called twice')
        .toHaveBeenCalledTimes(2);
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

      expect(testObj[`${timeOutPrefix}action${timeOutStartedSuffix}`])
        .withContext('timeStarted property should be set')
        .toBeTrue();
    });
    it('should immediately set the timeOut property', () => {
      testObj.action();

      expect(testObj[`${timeOutPrefix}action`])
        .withContext('timeOut property should be set')
        .toBeGreaterThan(1);
    });
    it('should immediately call the method', () => {
      testObj.action();

      expect(actionSpy)
        .withContext('action should have been called once')
        .toHaveBeenCalledOnceWith();
    });
    it('should not call the method again until a delay has passed', () => {
      testObj.action();

      expect(actionSpy)
        .withContext('action should have been called once - 1')
        .toHaveBeenCalledOnceWith();

      testObj.action();

      expect(actionSpy)
        .withContext('action should have been called once - 2')
        .toHaveBeenCalledTimes(1);

      testObj.action();

      expect(actionSpy)
        .withContext('action should have been called once - 3')
        .toHaveBeenCalledTimes(1);
    });
    it('should call the method again once a delay has passed', fakeAsync(() => {
      testObj.action();

      expect(actionSpy)
        .withContext('action should have been called once - 1')
        .toHaveBeenCalledOnceWith();

      tick(delayTest * 0.8);
      expect(actionSpy)
        .withContext('action should have been called once - 2')
        .toHaveBeenCalledTimes(1);

      testObj.action();

      expect(actionSpy)
        .withContext('action should have been called once - 3')
        .toHaveBeenCalledTimes(1);

      tick(delayTest * 0.4);
      expect(actionSpy)
        .withContext('action should have been called twice')
        .toHaveBeenCalledTimes(2);

      testObj.action();
      expect(actionSpy)
        .withContext('action should have been called three times')
        .toHaveBeenCalledTimes(3);

      tick(delayTest * 1);
      expect(actionSpy)
        .withContext('action should have been called four times')
        .toHaveBeenCalledTimes(4);
    }));
  });
});
