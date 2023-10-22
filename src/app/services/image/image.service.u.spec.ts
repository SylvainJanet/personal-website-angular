import { LogService } from '../log/log.service';
import { PreloaderService } from '../preloader/preloader.service';
import { ImageService } from './image.service';
import { environment as devEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { LogPublishersService } from '../log/publishers/log-publishers.service';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { Preloaders } from '../preloader/preloaders/preloaders';
import { fakeAsync, flush } from '@angular/core/testing';

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
      service = new ImageService(preloaderService, logService, devEnv);
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
      service = new ImageService(preloaderService, logService, stagingEnv);
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
      service = new ImageService(preloaderService, logService, prodEnv);
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
        .toHaveBeenCalledOnceWith(
          Preloaders.MAIN,
          1,
          service['imgToLoadMessage'](imgInput, loadersInput),
          service['imgMessageWithPreloaderTot'](),
          service['imgMessageWithTot']()
        );

      // assume it laters changes and map is updated : the preloader has loaded
      // should be done by imageLoadedOrError method
      service['images'].get(imgInput)?.set(Preloaders.TEXTS, false);

      service.imageLoading(imgInput, [Preloaders.MAIN, Preloaders.TEXTS]);

      expect(preloaderService.toLoad)
        .withContext(
          'toLoad should have been called with proper arguments - second time'
        )
        .toHaveBeenCalledWith(
          Preloaders.TEXTS,
          1,
          service['imgToLoadMessage'](imgInput, [
            Preloaders.MAIN,
            Preloaders.TEXTS,
          ]),
          service['imgMessageWithPreloaderTot'](),
          service['imgMessageWithTot']()
        );
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
        service = new ImageService(preloaderService, logService, devEnv);
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
        service = new ImageService(preloaderService, logService, stagingEnv);
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
        service = new ImageService(preloaderService, logService, prodEnv);
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
    const shouldUpdateMap = (done: DoneFn) => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      service.imageLoading(imgInput, loadersInput);

      service.imageLoadedOrError(imgInput, loadersInput);

      setTimeout(() => {
        expect(service['images'].get(imgInput)?.get(Preloaders.MAIN))
          .withContext('img should not be loading for Preloaders.MAIN')
          .toBeFalse();
        done();
      }, 2);
    };

    const shouldNotifyPreloadersIfNotAlreadyDoneExpectation =
      'should notify the preloaders if they are not already done loading';
    const shouldNotifyPreloadersIfNotAlreadyDone = (done: DoneFn) => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'loaded');

      service.imageLoading(imgInput, loadersInput);

      service.imageLoadedOrError(imgInput, loadersInput);

      setTimeout(() => {
        expect(preloaderService.loaded)
          .withContext(
            'loaded should have been called with proper arguments - first time'
          )
          .toHaveBeenCalledOnceWith(
            Preloaders.MAIN,
            1,
            service['imgLoadedMessage'](imgInput, loadersInput),
            service['imgMessageWithPreloaderTot'](),
            service['imgMessageWithTot']()
          );

        // assume it laters changes and map is updated : the preloader has loaded
        // should be done by imageLoading method
        service['images'].get(imgInput)?.set(Preloaders.TEXTS, true);

        service.imageLoadedOrError(imgInput, [
          Preloaders.MAIN,
          Preloaders.TEXTS,
        ]);

        setTimeout(() => {
          expect(preloaderService.loaded)
            .withContext(
              'loaded should have been called with proper arguments - second time'
            )
            .toHaveBeenCalledWith(
              Preloaders.TEXTS,
              1,
              service['imgLoadedMessage'](imgInput, [
                Preloaders.MAIN,
                Preloaders.TEXTS,
              ]),
              service['imgMessageWithPreloaderTot'](),
              service['imgMessageWithTot']()
            );
          expect(preloaderService.loaded)
            .withContext('loaded should have been called twice')
            .toHaveBeenCalledTimes(2);
          done();
        }, 2);
      }, 2);
    };

    const shouldNotNotifyPreloadersIfAlreadyDoneExpectation =
      'should not notify the preloaders if they are already done loading';
    const shouldNotNotifyPreloadersIfAlreadyDone = (done: DoneFn) => {
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      spyOn(preloaderService, 'loaded');

      service.imageLoading(imgInput, loadersInput);

      service.imageLoadedOrError(imgInput, loadersInput);

      setTimeout(() => {
        service.imageLoadedOrError(imgInput, loadersInput);

        setTimeout(() => {
          service.imageLoadedOrError(imgInput, [
            Preloaders.MAIN,
            Preloaders.TEXTS,
          ]);

          setTimeout(() => {
            service['images'].get(imgInput)?.set(Preloaders.TEXTS, false);

            service.imageLoadedOrError(imgInput, [Preloaders.TEXTS]);

            setTimeout(() => {
              expect(preloaderService.loaded)
                .withContext('loaded should have been called once')
                .toHaveBeenCalledTimes(1);
              done();
            }, 2);
          }, 2);
        }, 2);
      }, 2);
    };

    const emptyTestExpectation =
      'should add timeout when NOT testing (this is not actually tested and just for coverage)';
    const emptyTest = (env: IEnvironment) => {
      env.isTesting = false;
      const imgInput = document.createElement('img');
      const loadersInput = [Preloaders.MAIN];

      service.imageLoading(imgInput, loadersInput);
      service.imageLoadedOrError(imgInput, loadersInput);
      flush();

      env.isTesting = true;

      expect().nothing();
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, devEnv);
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
      it(
        emptyTestExpectation,
        fakeAsync(() => emptyTest(devEnv))
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, stagingEnv);
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
      it(
        emptyTestExpectation,
        fakeAsync(() => emptyTest(stagingEnv))
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, prodEnv);
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
      it(
        emptyTestExpectation,
        fakeAsync(() => emptyTest(prodEnv))
      );
    });
  });

  describe('imgToLoadMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const imgInput = document.createElement('img');
      imgInput.setAttribute('src', 'testFolder/this.is.a.test');

      const loader = Preloaders.MAIN;

      const actual = service['imgToLoadMessage'](imgInput, [loader]);
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('to load message should be returned - long')
          .toBe('Loading img - this.is.a.test - MAIN');
      } else {
        expect(actual)
          .withContext('to load message should be returned - short')
          .toBe('Loading image...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, devEnv);
      });

      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, stagingEnv);
      });

      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, prodEnv);
      });

      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('imgLoadedMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const imgInput = document.createElement('img');
      imgInput.setAttribute('src', 'testFolder/this.is.a.test');

      const loader = Preloaders.MAIN;

      const actual = service['imgLoadedMessage'](imgInput, [loader]);
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('loaded message should be returned - long')
          .toBe('Img loaded - this.is.a.test - MAIN');
      } else {
        expect(actual)
          .withContext('loaded message should be returned - short')
          .toBe('Loading image...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, devEnv);
      });

      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, stagingEnv);
      });

      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, prodEnv);
      });

      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('imgMessageWithPreloaderTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['imgMessageWithPreloaderTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, devEnv);
      });

      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, stagingEnv);
      });

      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, prodEnv);
      });

      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('imgMessageWithTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['imgMessageWithPreloaderTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, devEnv);
      });

      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, stagingEnv);
      });

      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
        service = new ImageService(preloaderService, logService, prodEnv);
      });

      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });
});
