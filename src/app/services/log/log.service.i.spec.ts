import { LogService } from './log.service';
import { LogPublishersService } from './publishers/log-publishers.service';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { LogLocalStorage } from './publishers/local-storage/log-local-storage';
import { LogConsole } from './publishers/console/log-console';
import { LogLevel } from './logLevel/logLevel';

let service: LogService;
let logPublishersService: LogPublishersService;
const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('LogService - integration', () => {
  const publishersSetByServiceExpectation =
    'should have publishers set by the LogPublishersService';
  const publishersSetByService = () => {
    const actual = service.publishers;

    expect(actual.length)
      .withContext('there shoud be the expected amount of publishers')
      .toBe(2);
    expect(actual[0])
      .withContext('first publisher should be LogConsole')
      .toBeInstanceOf(LogConsole);
    expect(actual[1])
      .withContext('second publisher should be LogLocalStorage')
      .toBeInstanceOf(LogLocalStorage);
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      logPublishersService = new LogPublishersService(devEnv);
      service = new LogService(devEnv, logPublishersService);
    });
    it(publishersSetByServiceExpectation, publishersSetByService);
  });
  describe('in staging environment', () => {
    beforeEach(() => {
      logPublishersService = new LogPublishersService(stagingEnv);
      service = new LogService(stagingEnv, logPublishersService);
    });
    it(publishersSetByServiceExpectation, publishersSetByService);
  });
  describe('in prod environment', () => {
    beforeEach(() => {
      logPublishersService = new LogPublishersService(prodEnv);
      service = new LogService(prodEnv, logPublishersService);
    });
    it(publishersSetByServiceExpectation, publishersSetByService);
  });

  describe('withClassName method', () => {
    const shouldReturnNewServiceWithCorrectPublishersExpectation =
      'should return a new LogService instance with correct publishers';
    const shouldReturnNewServiceWithCorrectPublishers = () => {
      const result = service.withClassName('Test');

      const actual = result.publishers;

      expect(actual.length)
        .withContext('there shoud be the expected amount of publishers')
        .toBe(2);
      expect(actual[0])
        .withContext('first publisher should be LogConsole')
        .toBeInstanceOf(LogConsole);
      expect(actual[1])
        .withContext('second publisher should be LogLocalStorage')
        .toBeInstanceOf(LogLocalStorage);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        service = new LogService(devEnv, logPublishersService);
      });
      it(
        shouldReturnNewServiceWithCorrectPublishersExpectation,
        shouldReturnNewServiceWithCorrectPublishers
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        service = new LogService(stagingEnv, logPublishersService);
      });
      it(
        shouldReturnNewServiceWithCorrectPublishersExpectation,
        shouldReturnNewServiceWithCorrectPublishers
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        service = new LogService(prodEnv, logPublishersService);
      });
      it(
        shouldReturnNewServiceWithCorrectPublishersExpectation,
        shouldReturnNewServiceWithCorrectPublishers
      );
    });
  });

  const notLogIfLevelBelowTheEnvironmentExpectation =
    'should not log if the log level is below the one set by the environment';
  const notLogIfLevelBelowTheEnvironment = (
    level: LogLevel,
    env: IEnvironment,
    done: DoneFn
  ) => {
    spyOn(window.console, 'log');
    spyOn(Storage.prototype, 'setItem');

    const message = 'This is a test';
    const param1 = true;
    const param2 = { a: 1, b: 2 };
    const param3 = 'other info';

    switch (level) {
      case LogLevel.Debug:
        service.debug(message, param1, param2, param3);
        break;
      case LogLevel.Info:
        service.info(message, param1, param2, param3);
        break;
      case LogLevel.Warn:
        service.warn(message, param1, param2, param3);
        break;
      case LogLevel.Error:
        service.error(message, param1, param2, param3);
        break;
      case LogLevel.Fatal:
        service.fatal(message, param1, param2, param3);
        break;
      default:
        done.fail('LogLevel not recognized');
        break;
    }

    if (level < env.logLevel || env.logLevel === LogLevel.Off) {
      expect(window.console.log)
        .withContext('log should not have been called')
        .not.toHaveBeenCalled();
      expect(Storage.prototype.setItem)
        .withContext('setItem should not have been called')
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
    spyOn(window.console, 'log');
    spyOn(Storage.prototype, 'setItem');

    const message = 'This is a test';
    const param1 = true;
    const param2 = { a: 1, b: 2 };
    const param3 = 'other info';

    switch (level) {
      case LogLevel.Debug:
        service.debug(message, param1, param2, param3);
        break;
      case LogLevel.Info:
        service.info(message, param1, param2, param3);
        break;
      case LogLevel.Warn:
        service.warn(message, param1, param2, param3);
        break;
      case LogLevel.Error:
        service.error(message, param1, param2, param3);
        break;
      case LogLevel.Fatal:
        service.fatal(message, param1, param2, param3);
        break;
      default:
        done.fail('LogLevel not recognized');
        break;
    }

    if (!(level < env.logLevel || env.logLevel === LogLevel.Off)) {
      expect(window.console.log)
        .withContext('log should have been called once')
        .toHaveBeenCalledTimes(1);
      expect(Storage.prototype.setItem)
        .withContext('setItem should have been called once')
        .toHaveBeenCalledTimes(1);
    }
    expect().nothing();
    done();
  };

  describe('debug method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        service = new LogService(devEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Debug, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Debug, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        service = new LogService(stagingEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Debug, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Debug, stagingEnv, done)
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        service = new LogService(prodEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Debug, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Debug, prodEnv, done)
      );
    });
  });

  describe('info method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        service = new LogService(devEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Info, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Info, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        service = new LogService(stagingEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Info, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Info, stagingEnv, done)
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        service = new LogService(prodEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Info, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Info, prodEnv, done)
      );
    });
  });

  describe('warn method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        service = new LogService(devEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Warn, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Warn, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        service = new LogService(stagingEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Warn, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Warn, stagingEnv, done)
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        service = new LogService(prodEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Warn, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Warn, prodEnv, done)
      );
    });
  });

  describe('error method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        service = new LogService(devEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Error, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Error, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        service = new LogService(stagingEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Error, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Error, stagingEnv, done)
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        service = new LogService(prodEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Error, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Error, prodEnv, done)
      );
    });
  });

  describe('fatal method', () => {
    describe('in dev environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(devEnv);
        service = new LogService(devEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Fatal, devEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Fatal, devEnv, done)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(stagingEnv);
        service = new LogService(stagingEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Fatal, stagingEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Fatal, stagingEnv, done)
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        logPublishersService = new LogPublishersService(prodEnv);
        service = new LogService(prodEnv, logPublishersService);
      });
      it(notLogIfLevelBelowTheEnvironmentExpectation, (done: DoneFn) =>
        notLogIfLevelBelowTheEnvironment(LogLevel.Fatal, prodEnv, done)
      );
      it(logIfLevelAboveTheEnvironmentExpectation, (done: DoneFn) =>
        logIfLevelAboveTheEnvironment(LogLevel.Fatal, prodEnv, done)
      );
    });
  });
});
