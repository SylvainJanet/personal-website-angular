import { IEnvironment } from 'src/environments/interface/ienvironment';
import { LogPublishersService } from './log-publishers.service';
import { environment as devEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { LogConsole } from './console/log-console';
import { LogLocalStorage } from './local-storage/log-local-storage';

let logPublishersService: LogPublishersService;
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

    const actual = logPublishersService.publishers;
    const actual_nbr = actual.length;

    expect(actual_nbr).toBe(expected_nbr);

    expect(actual[0]).toBeInstanceOf(LogConsole);
    expect(actual[1]).toBeInstanceOf(LogLocalStorage);
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      logPublishersService = new LogPublishersService(devEnv);
    });
    it(publisherShouldBuildExpectation, publisherShouldBuild);
  });

  describe('in staging environment', () => {
    beforeEach(() => {
      logPublishersService = new LogPublishersService(stagingEnv);
    });
    it(publisherShouldBuildExpectation, publisherShouldBuild);
  });

  describe('in prod environment', () => {
    beforeEach(() => {
      logPublishersService = new LogPublishersService(prodEnv);
    });
    it(publisherShouldBuildExpectation, publisherShouldBuild);
  });
});
