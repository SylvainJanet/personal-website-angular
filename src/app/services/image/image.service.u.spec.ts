import { LogService } from '../log/log.service';
import { PreloaderService } from '../preloader/preloader.service';
import { ImageService } from './image.service';
import { environment as devEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { LogPublishersService } from '../log/publishers/log-publishers.service';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { Preloaders } from '../preloader/preloaders/preloaders';

let imageService: ImageService;
let preloaderService: PreloaderService;
let devEnv: IEnvironment;
let stagingEnv: IEnvironment;
let prodEnv: IEnvironment;

describe('ImageService', () => {
  beforeEach(() => {
    devEnv = devEnvironment;
    stagingEnv = stagingEnvironment;
    prodEnv = prodEnvironment;
  });

  const shouldHaveProperLoggerExpectation = 'should have a proper logger';
  const shouldHaveProperLogger = () => {
    expect(imageService.logger).toBeTruthy();

    const expected = 'ImageService';
    const actual = imageService.logger.className;

    expect(actual).toBe(expected);
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        devEnv,
        new LogPublishersService(devEnv)
      );
      preloaderService = new PreloaderService(logService);
      imageService = new ImageService(preloaderService, logService);
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
      imageService = new ImageService(preloaderService, logService);
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
      imageService = new ImageService(preloaderService, logService);
    });

    it(shouldHaveProperLoggerExpectation, shouldHaveProperLogger);
  });

  describe('imageLoading method', () => {
    const shouldUpdateMapExpectation =
      'should update map indicating which preloader are loading';
    const shouldUpdateMap = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      expect(imageService['images'].get(imgInput)).not.toBeTruthy();

      imageService.imageLoading(imgInput, loadersInput);

      expect(imageService['images'].get(imgInput)).toBeTruthy();
      expect(
        imageService['images'].get(imgInput)?.get(Preloaders.TEXTS)
      ).not.toBeTruthy();
      expect(
        imageService['images'].get(imgInput)?.get(Preloaders.MAIN)
      ).toBeTrue();

      imageService.imageLoading(imgInput, loadersInput);

      expect(imageService['images'].get(imgInput)).toBeTruthy();
      expect(
        imageService['images'].get(imgInput)?.get(Preloaders.TEXTS)
      ).not.toBeTruthy();
      expect(
        imageService['images'].get(imgInput)?.get(Preloaders.MAIN)
      ).toBeTrue();

      // assume it laters changes and map is updated : the preloader has loaded
      // should be done by imageLoadedOrError method
      imageService['images'].get(imgInput)?.set(Preloaders.MAIN, false);

      imageService.imageLoading(imgInput, loadersInput);

      expect(imageService['images'].get(imgInput)).toBeTruthy();
      expect(
        imageService['images'].get(imgInput)?.get(Preloaders.TEXTS)
      ).not.toBeTruthy();
      expect(
        imageService['images'].get(imgInput)?.get(Preloaders.MAIN)
      ).toBeTrue();
    };

    const shouldNotifyPreloadersIfNotAlreadyLoadingExpectation =
      'should notify the preloaders if they are not already loading';
    const shouldNotifyPreloadersIfNotAlreadyLoading = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'toLoad');

      imageService.imageLoading(imgInput, loadersInput);

      expect(preloaderService.toLoad).toHaveBeenCalledOnceWith(
        Preloaders.MAIN,
        1
      );

      // assume it laters changes and map is updated : the preloader has loaded
      // should be done by imageLoadedOrError method
      imageService['images'].get(imgInput)?.set(Preloaders.TEXTS, false);

      imageService.imageLoading(imgInput, [Preloaders.MAIN, Preloaders.TEXTS]);

      expect(preloaderService.toLoad).toHaveBeenCalledWith(Preloaders.TEXTS, 1);
      expect(preloaderService.toLoad).toHaveBeenCalledTimes(2);
    };

    const shouldNotNotifyPreloadersIfAlreadyLoadingExpectation =
      'should not notify the preloaders if they are already loading';
    const shouldNotNotifyPreloadersIfAlreadyLoading = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'toLoad');

      imageService.imageLoading(imgInput, loadersInput);

      imageService.imageLoading(imgInput, loadersInput);

      expect(preloaderService.toLoad).toHaveBeenCalledTimes(1);

      // assume it laters changes and map is updated : the preloader has loaded
      // should be done by imageLoading method
      imageService['images'].get(imgInput)?.set(Preloaders.TEXTS, true);
      imageService.imageLoading(imgInput, [Preloaders.MAIN, Preloaders.TEXTS]);

      expect(preloaderService.toLoad).toHaveBeenCalledTimes(1);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
        imageService = new ImageService(preloaderService, logService);
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
        imageService = new ImageService(preloaderService, logService);
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
        imageService = new ImageService(preloaderService, logService);
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

      imageService.imageLoading(imgInput, loadersInput);

      imageService.imageLoadedOrError(imgInput, loadersInput);

      expect(
        imageService['images'].get(imgInput)?.get(Preloaders.MAIN)
      ).toBeFalse();
    };

    const shouldNotifyPreloadersIfNotAlreadyDoneExpectation =
      'should notify the preloaders if they are not already done loading';
    const shouldNotifyPreloadersIfNotAlreadyDone = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'loaded');

      imageService.imageLoading(imgInput, loadersInput);

      imageService.imageLoadedOrError(imgInput, loadersInput);

      expect(preloaderService.loaded).toHaveBeenCalledOnceWith(
        Preloaders.MAIN,
        1
      );

      // assume it laters changes and map is updated : the preloader has loaded
      // should be done by imageLoading method
      imageService['images'].get(imgInput)?.set(Preloaders.TEXTS, true);

      imageService.imageLoadedOrError(imgInput, [
        Preloaders.MAIN,
        Preloaders.TEXTS,
      ]);

      expect(preloaderService.loaded).toHaveBeenCalledWith(Preloaders.TEXTS, 1);
      expect(preloaderService.loaded).toHaveBeenCalledTimes(2);
    };

    const shouldNotNotifyPreloadersIfAlreadyDoneExpectation =
      'should not notify the preloaders if they are already done loading';
    const shouldNotNotifyPreloadersIfAlreadyDone = () => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'loaded');

      imageService.imageLoading(imgInput, loadersInput);

      imageService.imageLoadedOrError(imgInput, loadersInput);

      imageService.imageLoadedOrError(imgInput, loadersInput);

      imageService.imageLoadedOrError(imgInput, [
        Preloaders.MAIN,
        Preloaders.TEXTS,
      ]);

      imageService['images'].get(imgInput)?.set(Preloaders.TEXTS, false);

      imageService.imageLoadedOrError(imgInput, [Preloaders.TEXTS]);

      expect(preloaderService.loaded).toHaveBeenCalledTimes(1);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
        imageService = new ImageService(preloaderService, logService);
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
        imageService = new ImageService(preloaderService, logService);
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
        imageService = new ImageService(preloaderService, logService);
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