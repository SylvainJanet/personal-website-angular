import { environment as developmentEnvironment } from 'src/environments/environment';
import { LogLevel } from '../logLevel/logLevel';
import { LogEntry } from './logEntry';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { IEnvironment } from 'src/environments/interface/ienvironment';

let objToTest: LogEntry;
const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('LogEntry - unit', () => {
  const entryDateOnConstructionExpectation =
    'should have an entryDate on construction';
  const entryDateOnConstruction = () => {
    const now = new Date();

    expect(objToTest.entryDate.getTime())
      .withContext('should have correct date')
      .toBeCloseTo(now.getTime(), -2);
  };

  const emptyMessageOnConstructionExpectation =
    'should have an empty message on construction';
  const emptyMessageOnConstruction = () => {
    expect(objToTest.message).withContext('message should be set').toBe('');
  };

  const debugLevelOnConstructionExpectation =
    'should have level of Debug on construction';
  const debugLevelOnConstruction = () => {
    expect(objToTest.level)
      .withContext('level should be set')
      .toBe(LogLevel.Debug);
  };

  const emptyExtraInfoOnConstructionExpectation =
    'should have an empty extraInfo on construction';
  const emptyExtraInfoOnConstruction = () => {
    expect(objToTest.extraInfo)
      .withContext('extraInfo should be set')
      .toEqual([]);
  };

  const logWithDateOnConstructionExpectation =
    'should logWithDate by default on construction';
  const logWithDateOnConstruction = () => {
    expect(objToTest.logWithDate)
      .withContext('logWithDate should be set')
      .toBe(true);
  };

  const shouldBeCompactIfEnvIsSetExpectation =
    'should be compact if the environment is set to have compact logs';
  const shouldBeCompactIfEnvIsSet = (env: IEnvironment) => {
    const expected = env.compactLogDisplay;
    const actual = objToTest.compactDisplay;

    expect(actual)
      .withContext('compactLogDisplay should be set')
      .toBe(expected);
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      objToTest = new LogEntry(devEnv);
    });

    it(entryDateOnConstructionExpectation, entryDateOnConstruction);
    it(emptyMessageOnConstructionExpectation, emptyMessageOnConstruction);
    it(debugLevelOnConstructionExpectation, debugLevelOnConstruction);
    it(emptyExtraInfoOnConstructionExpectation, emptyExtraInfoOnConstruction);
    it(logWithDateOnConstructionExpectation, logWithDateOnConstruction);
    it(shouldBeCompactIfEnvIsSetExpectation, () =>
      shouldBeCompactIfEnvIsSet(devEnv)
    );
  });

  describe('in staging environment', () => {
    beforeEach(() => {
      objToTest = new LogEntry(stagingEnv);
    });

    it(entryDateOnConstructionExpectation, entryDateOnConstruction);
    it(emptyMessageOnConstructionExpectation, emptyMessageOnConstruction);
    it(debugLevelOnConstructionExpectation, debugLevelOnConstruction);
    it(emptyExtraInfoOnConstructionExpectation, emptyExtraInfoOnConstruction);
    it(logWithDateOnConstructionExpectation, logWithDateOnConstruction);
    it(shouldBeCompactIfEnvIsSetExpectation, () =>
      shouldBeCompactIfEnvIsSet(stagingEnv)
    );
  });

  describe('in prod environment', () => {
    beforeEach(() => {
      objToTest = new LogEntry(prodEnv);
    });

    it(entryDateOnConstructionExpectation, entryDateOnConstruction);
    it(emptyMessageOnConstructionExpectation, emptyMessageOnConstruction);
    it(debugLevelOnConstructionExpectation, debugLevelOnConstruction);
    it(emptyExtraInfoOnConstructionExpectation, emptyExtraInfoOnConstruction);
    it(logWithDateOnConstructionExpectation, logWithDateOnConstruction);
    it(shouldBeCompactIfEnvIsSetExpectation, () =>
      shouldBeCompactIfEnvIsSet(prodEnv)
    );
  });

  describe('buildLogString method', () => {
    const buildLogDataDateCompactNoExtraInfoExpectation =
      'should build log string correctly with date and compact and no extraInfo';
    const buildLogDataDateCompactNoExtraInfo = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [];
      objToTest.className = 'test';
      objToTest.logWithDate = true;
      objToTest.compactDisplay = true;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe(
          objToTest.entryDate.toLocaleString() +
            ' - Class: test - Type: Debug - Message: this is a test'
        );
    };

    const buildLogDataNoDateCompactNoExtraInfoExpectation =
      'should build log string correctly without date and compact and no extraInfo';
    const buildLogDataNoDateCompactNoExtraInfo = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [];
      objToTest.className = 'test';
      objToTest.logWithDate = false;
      objToTest.compactDisplay = true;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe('Class: test - Type: Debug - Message: this is a test');
    };

    const buildLogDataDateNotCompactNoExtraInfoExpectation =
      'should build log string correctly with date and not compact and no extraInfo';
    const buildLogDataDateNotCompactNoExtraInfo = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [];
      objToTest.className = 'test';
      objToTest.logWithDate = true;
      objToTest.compactDisplay = false;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe(
          objToTest.entryDate.toLocaleString() +
            '\n\tClass:\ttest\n\tType:\tDebug\n\t\tMessage:\tthis is a test'
        );
    };

    const buildLogDataNoDateNotCompactNoExtraInfoExpectation =
      'should build log string correctly without date and not compact and no extraInfo';
    const buildLogDataNoDateNotCompactNoExtraInfo = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [];
      objToTest.className = 'test';
      objToTest.logWithDate = false;
      objToTest.compactDisplay = false;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe('\n\tClass:\ttest\n\tType:\tDebug\n\t\tMessage:\tthis is a test');
    };

    const buildLogDataDateCompactExtraInfoExpectation =
      'should build log string correctly with date and compact and extraInfo';
    const buildLogDataDateCompactExtraInfo = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [true, { a: '1', b: '2' }, 'data'];
      objToTest.className = 'test';
      objToTest.logWithDate = true;
      objToTest.compactDisplay = true;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe(
          objToTest.entryDate.toLocaleString() +
            ' - Class: test - Type: Debug - Message: this is a test - Extra Info: true,{"a":"1","b":"2"},"data"'
        );
    };

    const buildLogDataNoDateCompactExtraInfoExpectation =
      'should build log string correctly without date and compact and extraInfo';
    const buildLogDataNoDateCompactExtraInfo = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [true, { a: '1', b: '2' }, 'data'];
      objToTest.className = 'test';
      objToTest.logWithDate = false;
      objToTest.compactDisplay = true;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe(
          'Class: test - Type: Debug - Message: this is a test - Extra Info: true,{"a":"1","b":"2"},"data"'
        );
    };

    const buildLogDataDateNotCompactExtraInfoExpectation =
      'should build log string correctly with date and not compact and extraInfo';
    const buildLogDataDateNotCompactExtraInfo = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [true, { a: '1', b: '2' }, 'data'];
      objToTest.className = 'test';
      objToTest.logWithDate = true;
      objToTest.compactDisplay = false;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe(
          objToTest.entryDate.toLocaleString() +
            '\n\tClass:\ttest\n\tType:\tDebug\n\t\tMessage:\tthis is a test' +
            '\n\t\tExtra Info:\ttrue\n' +
            '--------------------------------------------------------------------------------' +
            '\n\t\t\t\t\t{\n\t\t\t\t\t\t\t"a": "1",\n\t\t\t\t\t\t\t"b": "2"\n\t\t\t\t\t}\n' +
            '--------------------------------------------------------------------------------' +
            '\n\t\t\t\t\t"data"\n' +
            '--------------------------------------------------------------------------------' +
            '\n\t\t\t\t\t'
        );
    };

    const buildLogDataNoDateNotCompactExtraInfoExpectation =
      'should build log string correctly without date and not compact and extraInfo';
    const buildLogDataNoDateNotCompactExtraInfo = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [true, { a: '1', b: '2' }, 'data'];
      objToTest.className = 'test';
      objToTest.logWithDate = false;
      objToTest.compactDisplay = false;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe(
          '\n\tClass:\ttest\n\tType:\tDebug\n\t\tMessage:\tthis is a test' +
            '\n\t\tExtra Info:\ttrue\n' +
            '--------------------------------------------------------------------------------' +
            '\n\t\t\t\t\t{\n\t\t\t\t\t\t\t"a": "1",\n\t\t\t\t\t\t\t"b": "2"\n\t\t\t\t\t}\n' +
            '--------------------------------------------------------------------------------' +
            '\n\t\t\t\t\t"data"\n' +
            '--------------------------------------------------------------------------------' +
            '\n\t\t\t\t\t'
        );
    };

    const hideSecretKeyCompactExpectation = 'should hide secret keys compact';
    const hideSecretKeyCompact = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [
        true,
        { a: '1', b: '2', secret: "don't show this" },
        'data',
      ];
      objToTest.className = 'test';
      objToTest.logWithDate = false;
      objToTest.compactDisplay = true;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe(
          'Class: test - Type: Debug - Message: this is a test - Extra Info: true,{"a":"1","b":"2"},"data"'
        );
    };

    const hideSecretKeyNotCompactExpectation =
      'should hide secret keys not compact';
    const hideSecretKeyNotCompact = () => {
      objToTest.message = 'this is a test';
      objToTest.level = LogLevel.Debug;
      objToTest.extraInfo = [
        true,
        { a: '1', b: '2', secret: "don't show this" },
        'data',
      ];
      objToTest.className = 'test';
      objToTest.logWithDate = true;
      objToTest.compactDisplay = false;

      const actual = objToTest.buildLogString();
      expect(actual)
        .withContext('log string should be as expected')
        .toBe(
          objToTest.entryDate.toLocaleString() +
            '\n\tClass:\ttest\n\tType:\tDebug\n\t\tMessage:\tthis is a test' +
            '\n\t\tExtra Info:\ttrue\n' +
            '--------------------------------------------------------------------------------' +
            '\n\t\t\t\t\t{\n\t\t\t\t\t\t\t"a": "1",\n\t\t\t\t\t\t\t"b": "2"\n\t\t\t\t\t}\n' +
            '--------------------------------------------------------------------------------' +
            '\n\t\t\t\t\t"data"\n' +
            '--------------------------------------------------------------------------------' +
            '\n\t\t\t\t\t'
        );
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        objToTest = new LogEntry(devEnv);
      });
      it(
        buildLogDataDateCompactNoExtraInfoExpectation,
        buildLogDataDateCompactNoExtraInfo
      );
      it(
        buildLogDataNoDateCompactNoExtraInfoExpectation,
        buildLogDataNoDateCompactNoExtraInfo
      );
      it(
        buildLogDataDateNotCompactNoExtraInfoExpectation,
        buildLogDataDateNotCompactNoExtraInfo
      );
      it(
        buildLogDataNoDateNotCompactNoExtraInfoExpectation,
        buildLogDataNoDateNotCompactNoExtraInfo
      );
      it(
        buildLogDataDateCompactExtraInfoExpectation,
        buildLogDataDateCompactExtraInfo
      );
      it(
        buildLogDataNoDateCompactExtraInfoExpectation,
        buildLogDataNoDateCompactExtraInfo
      );
      it(
        buildLogDataDateNotCompactExtraInfoExpectation,
        buildLogDataDateNotCompactExtraInfo
      );
      it(
        buildLogDataNoDateNotCompactExtraInfoExpectation,
        buildLogDataNoDateNotCompactExtraInfo
      );
      it(hideSecretKeyCompactExpectation, hideSecretKeyCompact);
      it(hideSecretKeyNotCompactExpectation, hideSecretKeyNotCompact);
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        objToTest = new LogEntry(stagingEnv);
      });
      it(
        buildLogDataDateCompactNoExtraInfoExpectation,
        buildLogDataDateCompactNoExtraInfo
      );
      it(
        buildLogDataNoDateCompactNoExtraInfoExpectation,
        buildLogDataNoDateCompactNoExtraInfo
      );
      it(
        buildLogDataDateNotCompactNoExtraInfoExpectation,
        buildLogDataDateNotCompactNoExtraInfo
      );
      it(
        buildLogDataNoDateNotCompactNoExtraInfoExpectation,
        buildLogDataNoDateNotCompactNoExtraInfo
      );
      it(
        buildLogDataDateCompactExtraInfoExpectation,
        buildLogDataDateCompactExtraInfo
      );
      it(
        buildLogDataNoDateCompactExtraInfoExpectation,
        buildLogDataNoDateCompactExtraInfo
      );
      it(
        buildLogDataDateNotCompactExtraInfoExpectation,
        buildLogDataDateNotCompactExtraInfo
      );
      it(
        buildLogDataNoDateNotCompactExtraInfoExpectation,
        buildLogDataNoDateNotCompactExtraInfo
      );
      it(hideSecretKeyCompactExpectation, hideSecretKeyCompact);
      it(hideSecretKeyNotCompactExpectation, hideSecretKeyNotCompact);
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        objToTest = new LogEntry(prodEnv);
      });
      it(
        buildLogDataDateCompactNoExtraInfoExpectation,
        buildLogDataDateCompactNoExtraInfo
      );
      it(
        buildLogDataNoDateCompactNoExtraInfoExpectation,
        buildLogDataNoDateCompactNoExtraInfo
      );
      it(
        buildLogDataDateNotCompactNoExtraInfoExpectation,
        buildLogDataDateNotCompactNoExtraInfo
      );
      it(
        buildLogDataNoDateNotCompactNoExtraInfoExpectation,
        buildLogDataNoDateNotCompactNoExtraInfo
      );
      it(
        buildLogDataDateCompactExtraInfoExpectation,
        buildLogDataDateCompactExtraInfo
      );
      it(
        buildLogDataNoDateCompactExtraInfoExpectation,
        buildLogDataNoDateCompactExtraInfo
      );
      it(
        buildLogDataDateNotCompactExtraInfoExpectation,
        buildLogDataDateNotCompactExtraInfo
      );
      it(
        buildLogDataNoDateNotCompactExtraInfoExpectation,
        buildLogDataNoDateNotCompactExtraInfo
      );
      it(hideSecretKeyCompactExpectation, hideSecretKeyCompact);
      it(hideSecretKeyNotCompactExpectation, hideSecretKeyNotCompact);
    });
  });
});
