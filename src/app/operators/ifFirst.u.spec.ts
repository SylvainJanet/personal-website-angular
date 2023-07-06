import { catchError, of, throwError } from 'rxjs';
import { ifFirst } from './ifFirst';

describe('ifFirst', () => {
  it('should run the next predicate on first emission', () => {
    const testObs = of(1, 2, 3);
    const predicateToTest = jasmine.createSpy('predicateSpy');
    const pipedObs = testObs.pipe(ifFirst(predicateToTest));

    pipedObs.subscribe();
    expect(predicateToTest).toHaveBeenCalledTimes(1);
  });
  it('should run the error predicate on first emission when error', () => {
    const testObs = throwError(() => new Error('test error'));
    const predicateNext = jasmine.createSpy('predicateNextSpy');
    const predicateToTest = jasmine.createSpy('predicateErrorSpy');
    const pipedObs = testObs.pipe(
      ifFirst(predicateNext, predicateToTest),
      catchError(() => of(1, 2, 3))
    );

    pipedObs.subscribe();
    expect(predicateToTest).toHaveBeenCalledTimes(1);
  });
  it('should run the next predicate on error if none is specified', () => {
    const testObs = throwError(() => new Error('test error'));
    const predicateToTest = jasmine.createSpy('predicateNextSpy');
    const pipedObs = testObs.pipe(
      ifFirst(predicateToTest),
      catchError(() => of(1, 2, 3))
    );

    pipedObs.subscribe();
    expect(predicateToTest).toHaveBeenCalledTimes(1);
  });
  it('should run the next predicate only on first emission', () => {
    const testObs = of(1, 2, 3);
    const predicateToTest = jasmine.createSpy('predicateSpy');
    const pipedObs = testObs.pipe(ifFirst(predicateToTest));

    pipedObs.subscribe();
    pipedObs.subscribe();
    pipedObs.subscribe();
    expect(predicateToTest).toHaveBeenCalledTimes(1);
  });
  it('should run the error predicate only on first emission when error', () => {
    const testObs = throwError(() => new Error('test error'));
    const predicateNext = jasmine.createSpy('predicateNextSpy');
    const predicateToTest = jasmine.createSpy('predicateErrorSpy');
    const pipedObs = testObs.pipe(
      ifFirst(predicateNext, predicateToTest),
      catchError(() => of(1, 2, 3))
    );

    pipedObs.subscribe();
    pipedObs.subscribe();
    pipedObs.subscribe();
    expect(predicateToTest).toHaveBeenCalledTimes(1);
  });
  it('should run the next predicate only on error if none is specified', () => {
    const testObs = throwError(() => new Error('test error'));
    const predicateToTest = jasmine.createSpy('predicateNextSpy');
    const pipedObs = testObs.pipe(
      ifFirst(predicateToTest),
      catchError(() => of(1, 2, 3))
    );

    pipedObs.subscribe();
    pipedObs.subscribe();
    pipedObs.subscribe();
    expect(predicateToTest).toHaveBeenCalledTimes(1);
  });

  it('should run the next predicate on first emission with subscription', () => {
    const testObs = of(1, 2, 3);
    const predicateToTest = jasmine.createSpy('predicateSpy');
    const actionMethod = jasmine.createSpy('actionMethod');
    const pipedObs = testObs.pipe(ifFirst(predicateToTest));

    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
    });
    expect(predicateToTest).toHaveBeenCalledTimes(1);
    expect(actionMethod).toHaveBeenCalledTimes(3);
  });
  it('should run the error predicate on first emission when error with subscription', () => {
    const testObs = throwError(() => new Error('test error'));
    const predicateNext = jasmine.createSpy('predicateNextSpy');
    const predicateToTest = jasmine.createSpy('predicateErrorSpy');
    const actionMethod = jasmine.createSpy('actionMethod');
    const errorMethod = jasmine.createSpy('errorMethod');
    const pipedObs = testObs.pipe(ifFirst(predicateNext, predicateToTest));

    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
      error: (e) => {
        errorMethod(e);
      },
    });
    expect(predicateToTest).toHaveBeenCalledTimes(1);
    expect(errorMethod).toHaveBeenCalledTimes(1);
  });
  it('should run the next predicate on error if none is specified with subscription', () => {
    const testObs = throwError(() => new Error('test error'));
    const predicateToTest = jasmine.createSpy('predicateNextSpy');
    const actionMethod = jasmine.createSpy('actionMethod');
    const errorMethod = jasmine.createSpy('errorMethod');
    const pipedObs = testObs.pipe(ifFirst(predicateToTest));

    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
      error: (e) => {
        errorMethod(e);
      },
    });
    expect(predicateToTest).toHaveBeenCalledTimes(1);
    expect(errorMethod).toHaveBeenCalledTimes(1);
  });
  it('should run the next predicate only on first emission with subscription', () => {
    const testObs = of(1, 2, 3);
    const predicateToTest = jasmine.createSpy('predicateSpy');
    const actionMethod = jasmine.createSpy('actionMethod');
    const pipedObs = testObs.pipe(ifFirst(predicateToTest));

    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
    });
    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
    });
    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
    });
    expect(predicateToTest).toHaveBeenCalledTimes(1);
    expect(actionMethod).toHaveBeenCalledTimes(3 * 3);
  });
  it('should run the error predicate only on first emission when error with subscription', () => {
    const testObs = throwError(() => new Error('test error'));
    const predicateNext = jasmine.createSpy('predicateNextSpy');
    const predicateToTest = jasmine.createSpy('predicateErrorSpy');
    const actionMethod = jasmine.createSpy('actionMethod');
    const errorMethod = jasmine.createSpy('errorMethod');
    const pipedObs = testObs.pipe(ifFirst(predicateNext, predicateToTest));

    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
      error: (e) => {
        errorMethod(e);
      },
    });
    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
      error: (e) => {
        errorMethod(e);
      },
    });
    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
      error: (e) => {
        errorMethod(e);
      },
    });
    expect(predicateToTest).toHaveBeenCalledTimes(1);
    expect(errorMethod).toHaveBeenCalledTimes(1 * 3);
  });
  it('should run the next predicate only on error if none is specified with subscription', () => {
    const testObs = throwError(() => new Error('test error'));
    const predicateToTest = jasmine.createSpy('predicateNextSpy');
    const actionMethod = jasmine.createSpy('actionMethod');
    const errorMethod = jasmine.createSpy('errorMethod');
    const pipedObs = testObs.pipe(ifFirst(predicateToTest));

    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
      error: (e) => {
        errorMethod(e);
      },
    });
    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
      error: (e) => {
        errorMethod(e);
      },
    });
    pipedObs.subscribe({
      next: (value) => {
        actionMethod(value);
      },
      error: (e) => {
        errorMethod(e);
      },
    });
    expect(predicateToTest).toHaveBeenCalledTimes(1);
    expect(errorMethod).toHaveBeenCalledTimes(1 * 3);
  });
});
