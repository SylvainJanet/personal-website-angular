import { LogConsole } from './log-console';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { LogEntry } from '../../logEntry/logEntry';
import { LogLevel } from '../../logLevel/logLevel';

let objToTest: LogConsole;
let entry: LogEntry;
const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('LogConsole - unit', () => {
  beforeEach(() => {
    objToTest = new LogConsole();
  });

  const shouldLogEntryExpectation = 'should log an entry to the console';
  const shouldLogEntry = (done: DoneFn) => {
    const result = objToTest.log(entry);

    result.subscribe({
      next: () => {
        expect(window.console.log)
          .withContext('log should have been called once')
          .toHaveBeenCalledOnceWith(entry.buildLogString());
        done();
      },
      error: (e) => done.fail('log entry failed - ' + e),
    });
  };

  const returnTrueAfterLoggingExpectation = 'should return true after logging';
  const returnTrueAfterLogging = (done: DoneFn) => {
    const expected = true;
    const result = objToTest.log(entry);

    result.subscribe({
      next: (actual) => {
        expect(actual).withContext('should return true').toBe(expected);
        done();
      },
      error: (e) => done.fail('log entry failed - ' + e),
    });
  };

  describe('log method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        entry = new LogEntry(devEnv);
        entry.message = 'this is a test';
        entry.level = LogLevel.Debug;
        entry.extraInfo = [true, 'test'];
        entry.className = 'test';

        spyOn(window.console, 'log');
      });

      it(shouldLogEntryExpectation, shouldLogEntry);
      it(returnTrueAfterLoggingExpectation, returnTrueAfterLogging);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        entry = new LogEntry(stagingEnv);
        entry.message = 'this is a test';
        entry.level = LogLevel.Debug;
        entry.extraInfo = [true, 'test'];
        entry.className = 'test';

        spyOn(window.console, 'log');
      });

      it(shouldLogEntryExpectation, shouldLogEntry);
      it(returnTrueAfterLoggingExpectation, returnTrueAfterLogging);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        entry = new LogEntry(prodEnv);
        entry.message = 'this is a test';
        entry.level = LogLevel.Debug;
        entry.extraInfo = [true, 'test'];
        entry.className = 'test';

        spyOn(window.console, 'log');
      });

      it(shouldLogEntryExpectation, shouldLogEntry);
      it(returnTrueAfterLoggingExpectation, returnTrueAfterLogging);
    });
  });

  describe('clear method', () => {
    beforeEach(() => {
      spyOn(window.console, 'clear');
    });

    it('should clear the console', (done: DoneFn) => {
      const result = objToTest.clear();

      result.subscribe({
        next: () => {
          expect(window.console.clear)
            .withContext('clear should have been called once')
            .toHaveBeenCalledTimes(1);
          done();
        },
        error: (e) => done.fail('log clear failed - ' + e),
      });
    });

    it('should return true after clearing', (done: DoneFn) => {
      const expected = true;
      const result = objToTest.clear();

      result.subscribe({
        next: (actual) => {
          expect(actual).withContext('should return true').toBe(expected);
          done();
        },
        error: (e) => done.fail('log clear failed - ' + e),
      });
    });
  });
});
