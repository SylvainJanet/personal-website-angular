import { LogService } from './log.service';
import { LogPublishersService } from './publishers/log-publishers.service';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { LogLocalStorage } from './publishers/local-storage/log-local-storage';
import { LogConsole } from './publishers/console/log-console';
import { LogLevel } from './logLevel/logLevel';
import { of, throwError } from 'rxjs';
import { LogEntry } from './logEntry/logEntry';

let logService: LogService;
let logPublishersService: LogPublishersService;
const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('LogService - unit', () => {
  const levelSetByEnvironmentExpectation =
    'should have a level set by the environment';
  const levelSetByEnvironment = (env: IEnvironment) => {
    const expected = env.logLevel;
    const actual = logService.level;

    expect(actual).withContext('level should be set').toBe(expected);
  };

  const withDateSetByEnvironmentExpectation =
    'should log with date if set by the environment';
  const withDateSetByEnvironment = (env: IEnvironment) => {
    const expected = env.logWithDate;
    const actual = logService.logWithDate;

    expect(actual).withContext('logWithDate should be set').toBe(expected);
  };

  const publishersSetByServiceExpectation =
    'should have publishers set by the LogPublishersService';
  const publishersSetByService = (env: IEnvironment) => {
    const expected = [new LogConsole(), new LogLocalStorage(env)];

    spyOnProperty(logPublishersService, 'publishers').and.returnValue(expected);
    logService = new LogService(env, logPublishersService);

    const actual = logService.publishers;
    expect(actual).withContext('publishers should be set').toEqual(expected);
  };

  const classNameDefaultExpectation =
    "should have 'none specified' class name by default";
  const classNameDefault = () => {
    const expected = 'none specified';
    const actual = logService.className;

    expect(actual).withContext('className should be set').toBe(expected);
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      logPublishersService = new LogPublishersService(devEnv);
      logService = new LogService(devEnv, logPublishersService);
    });
    it(levelSetByEnvironmentExpectation, () => levelSetByEnvironment(devEnv));
    it(withDateSetByEnvironmentExpectation, () =>
      withDateSetByEnvironment(devEnv)
    );
    it(publishersSetByServiceExpectation, () => publishersSetByService(devEnv));
    it(classNameDefaultExpectation, classNameDefault);
  });
  describe('in staging environment', () => {
    beforeEach(() => {
      logPublishersService = new LogPublishersService(stagingEnv);
      logService = new LogService(stagingEnv, logPublishersService);
    });
    it(levelSetByEnvironmentExpectation, () =>
      levelSetByEnvironment(stagingEnv)
    );
    it(withDateSetByEnvironmentExpectation, () =>
      withDateSetByEnvironment(stagingEnv)
    );
    it(publishersSetByServiceExpectation, () =>
      publishersSetByService(stagingEnv)
    );
    it(classNameDefaultExpectation, classNameDefault);
  });
  describe('in prod environment', () => {
    beforeEach(() => {
      logPublishersService = new LogPublishersService(prodEnv);
      logService = new LogService(prodEnv, logPublishersService);
    });
    it(levelSetByEnvironmentExpectation, () => levelSetByEnvironment(prodEnv));
    it(withDateSetByEnvironmentExpectation, () =>
      withDateSetByEnvironment(prodEnv)
    );
    it(publishersSetByServiceExpectation, () =>
      publishersSetByService(prodEnv)
    );
    it(classNameDefaultExpectation, classNameDefault);
  });

  describe('withClassName method', () => {
    const shouldReturnNewServiceExpectation =
      'should return a new LogService instance';
    const shouldReturnNewService = () => {
      const result = logService.withClassName('Test');
      expect(result).withContext('should return a non null value').toBeTruthy();
    };

    const shouldReturnNewServiceWithCorrectLevelExpectation =
      'should return a new LogService instance with correct level';
    const shouldReturnNewServiceWithCorrectLevel = () => {
      const expected = logService.level;
      const result = logService.withClassName('Test');
      const actual = result.level;

      expect(actual).withContext('level should be as expected').toBe(expected);
    };

    const shouldReturnNewServiceWithCorrectLogWithDateExpectation =
      'should return a new LogService instance with correct logWithDate';
    const shouldReturnNewServiceWithCorrectLogWithDate = () => {
      const expected = logService.logWithDate;
      const result = logService.withClassName('Test');
      const actual = result.logWithDate;

      expect(actual)
        .withContext('logWithDate should be as expected')
        .toBe(expected);
    };

    const shouldReturnNewServiceWithCorrectPublishersExpectation =
      'should return a new LogService instance with correct publishers';
    const shouldReturnNewServiceWithCorrectPublishers = (env: IEnvironment) => {
      const expected = [new LogConsole(), new LogLocalStorage(env)];

      spyOnProperty(logPublishersService, 'publishers').and.returnValue(
        expected
      );
      const result = logService.withClassName('Test');

      const actual = result.publishers;
      expect(actual)
        .withContext('publishers should be as expected')
        .toEqual(expected);
    };

    const shouldReturnNewServiceWithCorrectClassNameExpectation =
      'should return a new LogService instance with correct class name';
    const shouldReturnNewServiceWithCorrectClassName = () => {
      const expected = 'Test';
      const result = logService.withClassName(expected);
      const actual = result.className;

      expect(actual)
        .withContext('className should be as expected')
        .toBe(expected);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        logService = new LogService(devEnv, logPublishersService);
      });
      it(shouldReturnNewServiceExpectation, shouldReturnNewService);
      it(
        shouldReturnNewServiceWithCorrectLevelExpectation,
        shouldReturnNewServiceWithCorrectLevel
      );
      it(
        shouldReturnNewServiceWithCorrectLogWithDateExpectation,
        shouldReturnNewServiceWithCorrectLogWithDate
      );
      it(shouldReturnNewServiceWithCorrectPublishersExpectation, () =>
        shouldReturnNewServiceWithCorrectPublishers(devEnv)
      );
      it(
        shouldReturnNewServiceWithCorrectClassNameExpectation,
        shouldReturnNewServiceWithCorrectClassName
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        logService = new LogService(stagingEnv, logPublishersService);
      });
      it(shouldReturnNewServiceExpectation, shouldReturnNewService);
      it(
        shouldReturnNewServiceWithCorrectLevelExpectation,
        shouldReturnNewServiceWithCorrectLevel
      );
      it(
        shouldReturnNewServiceWithCorrectLogWithDateExpectation,
        shouldReturnNewServiceWithCorrectLogWithDate
      );
      it(shouldReturnNewServiceWithCorrectPublishersExpectation, () =>
        shouldReturnNewServiceWithCorrectPublishers(stagingEnv)
      );
      it(
        shouldReturnNewServiceWithCorrectClassNameExpectation,
        shouldReturnNewServiceWithCorrectClassName
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        logService = new LogService(prodEnv, logPublishersService);
      });
      it(shouldReturnNewServiceExpectation, shouldReturnNewService);
      it(
        shouldReturnNewServiceWithCorrectLevelExpectation,
        shouldReturnNewServiceWithCorrectLevel
      );
      it(
        shouldReturnNewServiceWithCorrectLogWithDateExpectation,
        shouldReturnNewServiceWithCorrectLogWithDate
      );
      it(shouldReturnNewServiceWithCorrectPublishersExpectation, () =>
        shouldReturnNewServiceWithCorrectPublishers(prodEnv)
      );
      it(
        shouldReturnNewServiceWithCorrectClassNameExpectation,
        shouldReturnNewServiceWithCorrectClassName
      );
    });
  });

  const useWriteToLogMethodExpectation =
    'should call writeToLog method with appropriate parameters';
  const useWriteToLogMethod = (level: LogLevel, done: DoneFn) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn<any>(logService, 'writeToLog');

    const message = 'This is a test';
    const param1 = true;
    const param2 = { a: 1, b: 2 };
    const param3 = 'other info';

    switch (level) {
      case LogLevel.Debug:
        logService.debug(message, param1, param2, param3);
        break;
      case LogLevel.Info:
        logService.info(message, param1, param2, param3);
        break;
      case LogLevel.Warn:
        logService.warn(message, param1, param2, param3);
        break;
      case LogLevel.Error:
        logService.error(message, param1, param2, param3);
        break;
      case LogLevel.Fatal:
        logService.fatal(message, param1, param2, param3);
        break;
      default:
        done.fail('LogLevel not recognized');
        break;
    }

    expect(logService['writeToLog'])
      .withContext(
        'writeToLog should have been called once with proper arguments'
      )
      .toHaveBeenCalledOnceWith(message, level, [param1, param2, param3]);
    done();
  };

  const notLogIfLevelBelowTheEnvironmentExpectation =
    'should not log if the log level is below the one set by the environment';
  const notLogIfLevelBelowTheEnvironment = (
    level: LogLevel,
    env: IEnvironment,
    done: DoneFn
  ) => {
    const logConsole = new LogConsole();
    const logLocalStorage = new LogLocalStorage(env);
    const publishers = [logConsole, logLocalStorage];

    spyOnProperty(logPublishersService, 'publishers').and.returnValue(
      publishers
    );
    logService = new LogService(env, logPublishersService);

    spyOn(logConsole, 'log').and.returnValue(of(true));
    spyOn(logLocalStorage, 'log').and.returnValue(of(true));

    const message = 'This is a test';
    const param1 = true;
    const param2 = { a: 1, b: 2 };
    const param3 = 'other info';

    switch (level) {
      case LogLevel.Debug:
        logService.debug(message, param1, param2, param3);
        break;
      case LogLevel.Info:
        logService.info(message, param1, param2, param3);
        break;
      case LogLevel.Warn:
        logService.warn(message, param1, param2, param3);
        break;
      case LogLevel.Error:
        logService.error(message, param1, param2, param3);
        break;
      case LogLevel.Fatal:
        logService.fatal(message, param1, param2, param3);
        break;
      default:
        done.fail('LogLevel not recognized');
        break;
    }

    if (level < env.logLevel || env.logLevel === LogLevel.Off) {
      expect(logConsole.log)
        .withContext('logConsole.log should not have been called')
        .not.toHaveBeenCalled();
      expect(logLocalStorage.log)
        .withContext('logLocalStorage.log should not have been called')
        .not.toHaveBeenCalled();
    }
    expect().nothing();
    done();
  };

  const logIfLevelAboveTheEnvironmentExpectation =
    'should log if the log level is the one set by the environment or above';
  const logIfLevelAboveTheEnvironment = (
    level: LogLevel,
    env: IEnvironment,
    done: DoneFn
  ) => {
    const logConsole = new LogConsole();
    const logLocalStorage = new LogLocalStorage(env);
    const publishers = [logConsole, logLocalStorage];

    spyOnProperty(logPublishersService, 'publishers').and.returnValue(
      publishers
    );
    logService = new LogService(env, logPublishersService);

    spyOn(logConsole, 'log').and.returnValue(of(true));
    spyOn(logLocalStorage, 'log').and.returnValue(of(true));

    const message = 'This is a test';
    const param1 = true;
    const param2 = { a: 1, b: 2 };
    const param3 = 'other info';

    switch (level) {
      case LogLevel.Debug:
        logService.debug(message, param1, param2, param3);
        break;
      case LogLevel.Info:
        logService.info(message, param1, param2, param3);
        break;
      case LogLevel.Warn:
        logService.warn(message, param1, param2, param3);
        break;
      case LogLevel.Error:
        logService.error(message, param1, param2, param3);
        break;
      case LogLevel.Fatal:
        logService.fatal(message, param1, param2, param3);
        break;
      default:
        done.fail('LogLevel not recognized');
        break;
    }

    if (!(level < env.logLevel || env.logLevel === LogLevel.Off)) {
      expect(logConsole.log)
        .withContext('logConsole.log should have been called once')
        .toHaveBeenCalledTimes(1);
      expect(logLocalStorage.log)
        .withContext('logLocalStorage.log should have been called once')
        .toHaveBeenCalledTimes(1);
    }
    expect().nothing();
    done();
  };

  const logCorrectLogEntryExpectation = 'should use a correct LogEntry';
  const logCorrectLogEntry = (
    level: LogLevel,
    env: IEnvironment,
    done: DoneFn
  ) => {
    const logConsole = new LogConsole();
    const logLocalStorage = new LogLocalStorage(env);
    const publishers = [logConsole, logLocalStorage];

    spyOnProperty(logPublishersService, 'publishers').and.returnValue(
      publishers
    );
    logService = new LogService(env, logPublishersService);

    spyOn(logConsole, 'log').and.returnValue(of(true));
    spyOn(logLocalStorage, 'log').and.returnValue(of(true));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(<any>window, 'Date').and.returnValue(new Date());

    const message = 'This is a test';
    const param1 = true;
    const param2 = { a: 1, b: 2 };
    const param3 = 'other info';

    switch (level) {
      case LogLevel.Debug:
        logService.debug(message, param1, param2, param3);
        break;
      case LogLevel.Info:
        logService.info(message, param1, param2, param3);
        break;
      case LogLevel.Warn:
        logService.warn(message, param1, param2, param3);
        break;
      case LogLevel.Error:
        logService.error(message, param1, param2, param3);
        break;
      case LogLevel.Fatal:
        logService.fatal(message, param1, param2, param3);
        break;
      default:
        done.fail('LogLevel not recognized');
        break;
    }

    if (!(level < env.logLevel || env.logLevel === LogLevel.Off)) {
      const expected = new LogEntry(env);
      expected.message = message;
      expected.level = level;
      expected.extraInfo = [param1, param2, param3];
      expected.logWithDate = logService.logWithDate;
      expected.className = logService.className;

      expect(logConsole.log)
        .withContext(
          'logConsole.log should have been called once with the proper arguments'
        )
        .toHaveBeenCalledOnceWith(expected);
      expect(logLocalStorage.log)
        .withContext(
          'logLocalStorage.log should have been called once with the proper arguments'
        )
        .toHaveBeenCalledOnceWith(expected);
    }
    expect().nothing();
    done();
  };

  const consoleLogErrorIfPublisherReturnsFalseExpectation =
    'should log in console that an error occured if a logger returns false';
  const consoleLogErrorIfPublisherReturnsFalse = (
    level: LogLevel,
    env: IEnvironment,
    done: DoneFn
  ) => {
    const logConsole = new LogConsole();
    const logLocalStorage = new LogLocalStorage(env);
    const publishers = [logConsole, logLocalStorage];

    spyOnProperty(logPublishersService, 'publishers').and.returnValue(
      publishers
    );
    logService = new LogService(env, logPublishersService);

    spyOn(logConsole, 'log').and.returnValue(of(false));
    spyOn(logLocalStorage, 'log').and.returnValue(of(false));

    spyOn(window.console, 'log');

    const message = 'This is a test';
    const param1 = true;
    const param2 = { a: 1, b: 2 };
    const param3 = 'other info';

    switch (level) {
      case LogLevel.Debug:
        logService.debug(message, param1, param2, param3);
        break;
      case LogLevel.Info:
        logService.info(message, param1, param2, param3);
        break;
      case LogLevel.Warn:
        logService.warn(message, param1, param2, param3);
        break;
      case LogLevel.Error:
        logService.error(message, param1, param2, param3);
        break;
      case LogLevel.Fatal:
        logService.fatal(message, param1, param2, param3);
        break;
      default:
        done.fail('LogLevel not recognized');
        break;
    }

    if (!(level < env.logLevel || env.logLevel === LogLevel.Off)) {
      expect(window.console.log)
        .withContext(
          'window.console.log should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith('Erreur avec loggeur LogConsole ');
      expect(window.console.log)
        .withContext(
          'window.console.log should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith('Erreur avec loggeur LogLocalStorage logging');
    }
    expect().nothing();
    done();
  };

  const consoleLogErrorIfPublisherObservableErrorExpectation =
    'should log in console that an error occured if a logger returns on observable that errors';
  const consoleLogErrorIfPublisherObservableError = (
    level: LogLevel,
    env: IEnvironment,
    done: DoneFn
  ) => {
    const logConsole = new LogConsole();
    const logLocalStorage = new LogLocalStorage(env);
    const publishers = [logConsole, logLocalStorage];

    spyOnProperty(logPublishersService, 'publishers').and.returnValue(
      publishers
    );
    logService = new LogService(env, logPublishersService);

    spyOn(logConsole, 'log').and.returnValue(
      throwError(() => new Error("Test d'erreur"))
    );
    spyOn(logLocalStorage, 'log').and.returnValue(
      throwError(() => new Error("Test d'erreur"))
    );

    spyOn(window.console, 'log');

    const message = 'This is a test';
    const param1 = true;
    const param2 = { a: 1, b: 2 };
    const param3 = 'other info';

    switch (level) {
      case LogLevel.Debug:
        logService.debug(message, param1, param2, param3);
        break;
      case LogLevel.Info:
        logService.info(message, param1, param2, param3);
        break;
      case LogLevel.Warn:
        logService.warn(message, param1, param2, param3);
        break;
      case LogLevel.Error:
        logService.error(message, param1, param2, param3);
        break;
      case LogLevel.Fatal:
        logService.fatal(message, param1, param2, param3);
        break;
      default:
        done.fail('LogLevel not recognized');
        break;
    }

    if (!(level < env.logLevel || env.logLevel === LogLevel.Off)) {
      expect(window.console.log)
        .withContext(
          'window.console.log should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith('Erreur avec loggeur LogConsole ');
      expect(window.console.log)
        .withContext(
          'window.console.log should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith('Erreur avec loggeur LogLocalStorage logging');
    }
    expect().nothing();
    done();
  };

  describe('debug method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        logService = new LogService(devEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Debug, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Debug, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Debug, devEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Debug, devEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Debug, devEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Debug, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        logService = new LogService(stagingEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Debug, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Debug, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Debug, stagingEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Debug, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Debug, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(
          LogLevel.Debug,
          stagingEnv,
          done
        )
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        logService = new LogService(prodEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Debug, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Debug, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Debug, prodEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Debug, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Debug, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Debug, prodEnv, done)
      );
    });
  });

  describe('info method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        logService = new LogService(devEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Info, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Info, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Info, devEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Info, devEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Info, devEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Info, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        logService = new LogService(stagingEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Info, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Info, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Info, stagingEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Info, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Info, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(
          LogLevel.Info,
          stagingEnv,
          done
        )
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        logService = new LogService(prodEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Info, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Info, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Info, prodEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Info, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Info, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Info, prodEnv, done)
      );
    });
  });

  describe('warn method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        logService = new LogService(devEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Warn, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Warn, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Warn, devEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Warn, devEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Warn, devEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Warn, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        logService = new LogService(stagingEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Warn, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Warn, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Warn, stagingEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Warn, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Warn, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(
          LogLevel.Warn,
          stagingEnv,
          done
        )
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        logService = new LogService(prodEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Warn, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Warn, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Warn, prodEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Warn, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Warn, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Warn, prodEnv, done)
      );
    });
  });

  describe('error method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        logService = new LogService(devEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Error, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Error, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Error, devEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Error, devEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Error, devEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Error, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        logService = new LogService(stagingEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Error, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Error, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Error, stagingEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Error, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Error, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(
          LogLevel.Error,
          stagingEnv,
          done
        )
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        logService = new LogService(prodEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Error, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Error, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Error, prodEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Error, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Error, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Error, prodEnv, done)
      );
    });
  });

  describe('fatal method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        logService = new LogService(devEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Fatal, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Fatal, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Fatal, devEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Fatal, devEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Fatal, devEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Fatal, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        logService = new LogService(stagingEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Fatal, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Fatal, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Fatal, stagingEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Fatal, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Fatal, stagingEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(
          LogLevel.Fatal,
          stagingEnv,
          done
        )
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        logService = new LogService(prodEnv, logPublishersService);
      });
      it(useWriteToLogMethodExpectation, (done: DoneFn) =>
        useWriteToLogMethod(LogLevel.Fatal, done)
      );
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Fatal, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Fatal, prodEnv, done)
      );
      it(logCorrectLogEntryExpectation, (done: DoneFn) =>
        logCorrectLogEntry(LogLevel.Fatal, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherReturnsFalseExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherReturnsFalse(LogLevel.Fatal, prodEnv, done)
      );
      it(consoleLogErrorIfPublisherObservableErrorExpectation, (done: DoneFn) =>
        consoleLogErrorIfPublisherObservableError(LogLevel.Fatal, prodEnv, done)
      );
    });
  });
});
