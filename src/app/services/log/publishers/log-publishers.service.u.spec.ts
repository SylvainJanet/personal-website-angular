import { IEnvironment } from 'src/environments/interface/ienvironment';
import { LogPublishersService } from './log-publishers.service';
import { environment as devEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { LogConsole } from './console/log-console';
import { LogLocalStorage } from './local-storage/log-local-storage';

let service: LogPublishersService;
let devEnv: IEnvironment;
let stagingEnv: IEnvironment;
let prodEnv: IEnvironment;

describe('LogPublishersService', () => {
  beforeEach(() => {
    devEnv = devEnvironment;
    stagingEnv = stagingEnvironment;
    prodEnv = prodEnvironment;
  });

  const publisherShouldBuildExpectation = 'should build publishers';
  const publisherShouldBuild = () => {
    const expected_nbr = 2;

    const actual = service.publishers;
    const actual_nbr = actual.length;

    expect(actual_nbr)
      .withContext('there should be the expected amount of publishers')
      .toBe(expected_nbr);

    expect(actual[0])
      .withContext('first publisher should be LogConsole')
      .toBeInstanceOf(LogConsole);
    expect(actual[1])
      .withContext('second publisher should be LogLocalStorage')
      .toBeInstanceOf(LogLocalStorage);
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      service = new LogPublishersService(devEnv);
    });
    it(publisherShouldBuildExpectation, publisherShouldBuild);
  });

  describe('in staging environment', () => {
    beforeEach(() => {
      service = new LogPublishersService(stagingEnv);
    });
    it(publisherShouldBuildExpectation, publisherShouldBuild);
  });

  describe('in prod environment', () => {
    beforeEach(() => {
      service = new LogPublishersService(prodEnv);
    });
    it(publisherShouldBuildExpectation, publisherShouldBuild);
  });
});
