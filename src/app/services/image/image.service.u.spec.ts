import { LogService } from '../log/log.service';
import { PreloaderService } from '../preloader/preloader.service';
import { ImageService } from './image.service';
import { environment as devEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { LogPublishersService } from '../log/publishers/log-publishers.service';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { Preloaders } from '../preloader/preloaders/preloaders';

let service: ImageService;
let preloaderService: PreloaderService;
let devEnv: IEnvironment;
let stagingEnv: IEnvironment;
let prodEnv: IEnvironment;

describe('ImageService - unit', () => {
  beforeEach(() => {
    devEnv = devEnvironment;
    stagingEnv = stagingEnvironment;
    prodEnv = prodEnvironment;
  });

  const shouldHaveProperLoggerExpectation = 'should have a proper logger';
  const shouldHaveProperLogger = () => {
    expect(service.logger)
      .withContext('logger should be set')
      .toEqual(jasmine.anything());

    const expected = 'ImageService';
    const actual = service.logger.className;

    expect(actual)
      .withContext('logger should be set with expected value')
      .toBe(expected);
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        devEnv,
        new LogPublishersService(devEnv)
      );
      preloaderService = new PreloaderService(logService);
      service = new ImageService(preloaderService, logService);
    });

    it(shouldHaveProperLoggerExpectation, shouldHaveProperLogger);
  });

  describe('in staging environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        stagingEnv,
        new LogPublishersService(stagingEnv)
      );
      preloaderService = new PreloaderService(logService);
      service = new ImageService(preloaderService, logService);
    });

    it(shouldHaveProperLoggerExpectation, shouldHaveProperLogger);
  });

  describe('in prod environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        prodEnv,
        new LogPublishersService(prodEnv)
      );
      preloaderService = new PreloaderService(logService);
      service = new ImageService(preloaderService, logService);
    });

    it(shouldHaveProperLoggerExpectation, shouldHaveProperLogger);
  });

  describe('imageLoading method', () => {
    const shouldUpdateMapExpectation =
      'should update map indicating which preloader are loading';
    const shouldUpdateMap = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      expect(service['images'].get(imgInput))
        .withContext('img should not appear in map at first')
        .not.toEqual(jasmine.anything());

      service.imageLoading(imgInput, loadersInput);

      expect(service['images'].get(imgInput))
        .withContext(
          'img should appear in map after imageLoading call - first call'
        )
        .toEqual(jasmine.anything());
      expect(service['images'].get(imgInput)?.get(Preloaders.TEXTS))
        .withContext(
          'img should not be loading for Preloaders.TEXTS - first call'
        )
        .not.toEqual(jasmine.anything());
      expect(service['images'].get(imgInput)?.get(Preloaders.MAIN))
        .withContext('img should be loading for Preloaders.MAIN - first call')
        .toBeTrue();

      service.imageLoading(imgInput, loadersInput);

      expect(service['images'].get(imgInput))
        .withContext(
          'img should appear in map after imageLoading call - second call'
        )
        .toEqual(jasmine.anything());
      expect(service['images'].get(imgInput)?.get(Preloaders.TEXTS))
        .withContext(
          'img should not be loading for Preloaders.TEXTS - second call'
        )
        .not.toEqual(jasmine.anything());
      expect(service['images'].get(imgInput)?.get(Preloaders.MAIN))
        .withContext('img should be loading for Preloaders.MAIN - second call')
        .toBeTrue();

      // assume it laters changes and map is updated : the preloader has loaded
      // should be done by imageLoadedOrError method
      service['images'].get(imgInput)?.set(Preloaders.MAIN, false);

      service.imageLoading(imgInput, loadersInput);

      expect(service['images'].get(imgInput))
        .withContext(
          'img should appear in map after imageLoading call - third call'
        )
        .toEqual(jasmine.anything());
      expect(service['images'].get(imgInput)?.get(Preloaders.TEXTS))
        .withContext(
          'img should not be loading for Preloaders.TEXTS - third call'
        )
        .not.toEqual(jasmine.anything());
      expect(service['images'].get(imgInput)?.get(Preloaders.MAIN))
        .withContext('img should be loading for Preloaders.MAIN - third call')
        .toBeTrue();
    };

    const shouldNotifyPreloadersIfNotAlreadyLoadingExpectation =
      'should notify the preloaders if they are not already loading';
    const shouldNotifyPreloadersIfNotAlreadyLoading = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'toLoad');

      service.imageLoading(imgInput, loadersInput);

      expect(preloaderService.toLoad)
        .withContext(
          'toLoad should have been called with proper arguments - first time'
        )
        .toHaveBeenCalledOnceWith(Preloaders.MAIN, 1);

      // assume it laters changes and map is updated : the preloader has loaded
      // should be done by imageLoadedOrError method
      service['images'].get(imgInput)?.set(Preloaders.TEXTS, false);

      service.imageLoading(imgInput, [Preloaders.MAIN, Preloaders.TEXTS]);

      expect(preloaderService.toLoad)
        .withContext(
          'toLoad should have been called with proper arguments - second time'
        )
        .toHaveBeenCalledWith(Preloaders.TEXTS, 1);
      expect(preloaderService.toLoad)
        .withContext('toLoad should have been called twice')
        .toHaveBeenCalledTimes(2);
    };

    const shouldNotNotifyPreloadersIfAlreadyLoadingExpectation =
      'should not notify the preloaders if they are already loading';
    const shouldNotNotifyPreloadersIfAlreadyLoading = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'toLoad');

      service.imageLoading(imgInput, loadersInput);

      service.imageLoading(imgInput, loadersInput);

      expect(preloaderService.toLoad)
        .withContext('toLoad should have been called once - first time')
        .toHaveBeenCalledTimes(1);

      // assume it laters changes and map is updated : the preloader has loaded
      // should be done by imageLoading method
      service['images'].get(imgInput)?.set(Preloaders.TEXTS, true);
      service.imageLoading(imgInput, [Preloaders.MAIN, Preloaders.TEXTS]);

      expect(preloaderService.toLoad)
        .withContext('toLoad should have been called once - second time')
        .toHaveBeenCalledTimes(1);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService);
      });

      it(shouldUpdateMapExpectation, shouldUpdateMap);
      it(
        shouldNotifyPreloadersIfNotAlreadyLoadingExpectation,
        shouldNotifyPreloadersIfNotAlreadyLoading
      );
      it(
        shouldNotNotifyPreloadersIfAlreadyLoadingExpectation,
        shouldNotNotifyPreloadersIfAlreadyLoading
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService);
      });

      it(shouldUpdateMapExpectation, shouldUpdateMap);
      it(
        shouldNotifyPreloadersIfNotAlreadyLoadingExpectation,
        shouldNotifyPreloadersIfNotAlreadyLoading
      );
      it(
        shouldNotNotifyPreloadersIfAlreadyLoadingExpectation,
        shouldNotNotifyPreloadersIfAlreadyLoading
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService);
      });

      it(shouldUpdateMapExpectation, shouldUpdateMap);
      it(
        shouldNotifyPreloadersIfNotAlreadyLoadingExpectation,
        shouldNotifyPreloadersIfNotAlreadyLoading
      );
      it(
        shouldNotNotifyPreloadersIfAlreadyLoadingExpectation,
        shouldNotNotifyPreloadersIfAlreadyLoading
      );
    });
  });

  describe('imageLoadedOrError method', () => {
    const shouldUpdateMapExpectation =
      'should update map indicating which preloader are not loading';
    const shouldUpdateMap = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      service.imageLoading(imgInput, loadersInput);

      service.imageLoadedOrError(imgInput, loadersInput);

      expect(service['images'].get(imgInput)?.get(Preloaders.MAIN))
        .withContext('img should not be loading for Preloaders.MAIN')
        .toBeFalse();
    };

    const shouldNotifyPreloadersIfNotAlreadyDoneExpectation =
      'should notify the preloaders if they are not already done loading';
    const shouldNotifyPreloadersIfNotAlreadyDone = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'loaded');

      service.imageLoading(imgInput, loadersInput);

      service.imageLoadedOrError(imgInput, loadersInput);

      expect(preloaderService.loaded)
        .withContext(
          'loaded should have been called with proper arguments - first time'
        )
        .toHaveBeenCalledOnceWith(Preloaders.MAIN, 1);

      // assume it laters changes and map is updated : the preloader has loaded
      // should be done by imageLoading method
      service['images'].get(imgInput)?.set(Preloaders.TEXTS, true);

      service.imageLoadedOrError(imgInput, [Preloaders.MAIN, Preloaders.TEXTS]);

      expect(preloaderService.loaded)
        .withContext(
          'loaded should have been called with proper arguments - second time'
        )
        .toHaveBeenCalledWith(Preloaders.TEXTS, 1);
      expect(preloaderService.loaded)
        .withContext('loaded should have been called twice')
        .toHaveBeenCalledTimes(2);
    };

    const shouldNotNotifyPreloadersIfAlreadyDoneExpectation =
      'should not notify the preloaders if they are already done loading';
    const shouldNotNotifyPreloadersIfAlreadyDone = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'loaded');

      service.imageLoading(imgInput, loadersInput);

      service.imageLoadedOrError(imgInput, loadersInput);

      service.imageLoadedOrError(imgInput, loadersInput);

      service.imageLoadedOrError(imgInput, [Preloaders.MAIN, Preloaders.TEXTS]);

      service['images'].get(imgInput)?.set(Preloaders.TEXTS, false);

      service.imageLoadedOrError(imgInput, [Preloaders.TEXTS]);

      expect(preloaderService.loaded)
        .withContext('loaded should have been called once')
        .toHaveBeenCalledTimes(1);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService);
      });

      it(shouldUpdateMapExpectation, shouldUpdateMap);
      it(
        shouldNotifyPreloadersIfNotAlreadyDoneExpectation,
        shouldNotifyPreloadersIfNotAlreadyDone
      );
      it(
        shouldNotNotifyPreloadersIfAlreadyDoneExpectation,
        shouldNotNotifyPreloadersIfAlreadyDone
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService);
      });

      it(shouldUpdateMapExpectation, shouldUpdateMap);
      it(
        shouldNotifyPreloadersIfNotAlreadyDoneExpectation,
        shouldNotifyPreloadersIfNotAlreadyDone
      );
      it(
        shouldNotNotifyPreloadersIfAlreadyDoneExpectation,
        shouldNotNotifyPreloadersIfAlreadyDone
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService);
      });

      it(shouldUpdateMapExpectation, shouldUpdateMap);
      it(
        shouldNotifyPreloadersIfNotAlreadyDoneExpectation,
        shouldNotifyPreloadersIfNotAlreadyDone
      );
      it(
        shouldNotNotifyPreloadersIfAlreadyDoneExpectation,
        shouldNotNotifyPreloadersIfAlreadyDone
      );
    });
  });
});
