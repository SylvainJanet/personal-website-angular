import { LogService } from '../log/log.service';
import { PreloaderService } from '../preloader/preloader.service';
import { environment as devEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { LogPublishersService } from '../log/publishers/log-publishers.service';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { Preloaders } from './preloaders/preloaders';
import { take } from 'rxjs';

let service: PreloaderService;
let devEnv: IEnvironment;
let stagingEnv: IEnvironment;
let prodEnv: IEnvironment;

describe('PreloaderService - unit', () => {
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

    const expected = 'PreloaderService';
    const actual = service.logger.className;

    expect(actual).withContext('logger className should be set').toBe(expected);
  };

  const shouldHaveProperlyDefinedInfoMapExpectation =
    'should properly defined info map';
  const shouldHaveProperlyDefinedInfoMap = () => {
    const actual = service.info;

    Object.keys(Preloaders).forEach((element) => {
      expect(actual.get(element as Preloaders))
        .withContext('element ' + element + ' should be defined in the map')
        .toEqual(jasmine.anything());
      expect(actual.get(element as Preloaders)?.qtyToLoad)
        .withContext('element ' + element + ' should be defined with qtyToLoad')
        .toBe(0);
      expect(actual.get(element as Preloaders)?.isLoading)
        .withContext('element ' + element + ' should be defined with isLoading')
        .toBeFalse();
    });
  };

  const shouldHaveProperlyDefinedStatusLoadingMapExpectation =
    'should properly defined status loading map';
  const shouldHaveProperlyDefinedStatusLoadingMap = () => {
    const actual = service.statusLoading;

    Object.keys(Preloaders).forEach((element) => {
      expect(actual.get(element as Preloaders))
        .withContext('element ' + element + ' should be defined in the map')
        .toEqual(jasmine.anything());
      actual.get(element as Preloaders)?.subscribe({
        next: (value) => {
          expect(value)
            .withContext('element ' + element + ' should be defined with value')
            .toBeNull();
        },
      });
    });
  };

  const shouldHaveProperlyDefinedStatusAnyLoadingExpectation =
    'should properly defined status any loading map';
  const shouldHaveProperlyDefinedStatusAnyLoading = () => {
    const actual = service.statusAnyLoading;

    actual.subscribe({
      next: (value) => {
        expect(value).withContext('statusAnyLoading should be set').toBeNull();
      },
    });
  };

  const shouldHaveProperlyDefinedMaxQtyExpectation =
    'should properly defined max quantity map';
  const shouldHaveProperlyDefinedMaxQty = () => {
    const actual = service.maxQty;

    Object.keys(Preloaders).forEach((element) => {
      expect(actual.get(element as Preloaders))
        .withContext('element ' + element + ' should be defined in the map')
        .toBe(0);
    });
  };

  const shouldHaveProperlyDefinedIsMainLoadExpectation =
    'should properly definedisMainLoad';
  const shouldHaveProperlyDefinedIsMainLoad = () => {
    const actual = service.isMainLoad;

    expect(actual).withContext('should be defined').toBeTrue();
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        devEnv,
        new LogPublishersService(devEnv)
      );
      service = new PreloaderService(logService);
    });

    it(shouldHaveProperLoggerExpectation, shouldHaveProperLogger);
    it(
      shouldHaveProperlyDefinedInfoMapExpectation,
      shouldHaveProperlyDefinedInfoMap
    );
    it(
      shouldHaveProperlyDefinedStatusLoadingMapExpectation,
      shouldHaveProperlyDefinedStatusLoadingMap
    );
    it(
      shouldHaveProperlyDefinedStatusAnyLoadingExpectation,
      shouldHaveProperlyDefinedStatusAnyLoading
    );
    it(
      shouldHaveProperlyDefinedMaxQtyExpectation,
      shouldHaveProperlyDefinedMaxQty
    );
    it(
      shouldHaveProperlyDefinedIsMainLoadExpectation,
      shouldHaveProperlyDefinedIsMainLoad
    );
  });

  describe('in staging environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        stagingEnv,
        new LogPublishersService(stagingEnv)
      );
      service = new PreloaderService(logService);
    });

    it(shouldHaveProperLoggerExpectation, shouldHaveProperLogger);
    it(
      shouldHaveProperlyDefinedInfoMapExpectation,
      shouldHaveProperlyDefinedInfoMap
    );
    it(
      shouldHaveProperlyDefinedStatusLoadingMapExpectation,
      shouldHaveProperlyDefinedStatusLoadingMap
    );
    it(
      shouldHaveProperlyDefinedStatusAnyLoadingExpectation,
      shouldHaveProperlyDefinedStatusAnyLoading
    );
    it(
      shouldHaveProperlyDefinedMaxQtyExpectation,
      shouldHaveProperlyDefinedMaxQty
    );
    it(
      shouldHaveProperlyDefinedIsMainLoadExpectation,
      shouldHaveProperlyDefinedIsMainLoad
    );
  });

  describe('in prod environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        prodEnv,
        new LogPublishersService(prodEnv)
      );
      service = new PreloaderService(logService);
    });

    it(shouldHaveProperLoggerExpectation, shouldHaveProperLogger);
    it(
      shouldHaveProperlyDefinedInfoMapExpectation,
      shouldHaveProperlyDefinedInfoMap
    );
    it(
      shouldHaveProperlyDefinedStatusLoadingMapExpectation,
      shouldHaveProperlyDefinedStatusLoadingMap
    );
    it(
      shouldHaveProperlyDefinedStatusAnyLoadingExpectation,
      shouldHaveProperlyDefinedStatusAnyLoading
    );
    it(
      shouldHaveProperlyDefinedMaxQtyExpectation,
      shouldHaveProperlyDefinedMaxQty
    );
    it(
      shouldHaveProperlyDefinedIsMainLoadExpectation,
      shouldHaveProperlyDefinedIsMainLoad
    );
  });

  describe('toLoad method', () => {
    const shouldUpdateInfoMapExpectation = 'should update info map';
    const shouldUpdateInfoMap = () => {
      const expectedIsLoading = true;
      const expectedQtyToLoad = 3;
      const preloaderToTest = Preloaders.MAIN;

      service.toLoad(preloaderToTest, expectedQtyToLoad);

      const actualIsLoading = service.info.get(preloaderToTest)?.isLoading;
      expect(actualIsLoading)
        .withContext(
          'preloader isLoading should be as expected - before update'
        )
        .toBe(expectedIsLoading);

      const actualQtyToLoad = service.info.get(preloaderToTest)?.qtyToLoad;
      expect(actualQtyToLoad)
        .withContext(
          'preloader qtyToLoad should be as expected - before update'
        )
        .toBe(expectedQtyToLoad);

      const newLoadQty = 4;

      service.toLoad(preloaderToTest, newLoadQty);

      const newActualIsLoading = service.info.get(preloaderToTest)?.isLoading;
      expect(newActualIsLoading)
        .withContext('preloader isLoading should be as expected - after update')
        .toBe(expectedIsLoading);

      const newActualQtyToLoad = service.info.get(preloaderToTest)?.qtyToLoad;
      expect(newActualQtyToLoad)
        .withContext('preloader qtyToLoad should be as expected - after update')
        .toBe(expectedQtyToLoad + newLoadQty);
    };
    const shouldEmitStatusLoadingExpectation =
      'should emit corresponding loading status';
    const shouldEmitStatusLoading = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      service.statusLoading
        .get(preloaderToTest)
        ?.pipe(take(1))
        .subscribe({
          next: (value) => {
            expect(value)
              .withContext('loading status should be null at first')
              .toBeNull();
            service.toLoad(preloaderToTest, qtyToTest);

            service.statusLoading.get(preloaderToTest)?.subscribe({
              next: (value) => {
                expect(value)
                  .withContext(
                    'loading status should be true after calling toLoad'
                  )
                  .toBeTrue();
              },
            });
          },
        });
    };
    const shouldEmitStatusAnyLoadingExpectation =
      'should emit any loading status';
    const shouldEmitStatusAnyLoading = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      service.statusAnyLoading?.pipe(take(1)).subscribe({
        next: (value) => {
          expect(value)
            .withContext('loading status should be null at first')
            .toBeNull();
          service.toLoad(preloaderToTest, qtyToTest);

          service.statusAnyLoading.subscribe({
            next: (value) => {
              expect(value)
                .withContext(
                  'loading status should be true after calling toLoad'
                )
                .toBeTrue();
            },
          });
        },
      });
    };
    const shouldUpdateMaxQtyExpectation = 'should update max quantity';
    const shouldUpdateMaxQty = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      const oldMax = service.maxQty.get(preloaderToTest) as number;

      service.toLoad(preloaderToTest, qtyToTest);

      const newMax = service.maxQty.get(preloaderToTest);

      expect(newMax)
        .withContext('maxQty should be updated')
        .toBe(oldMax + qtyToTest);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        service = new PreloaderService(logService);
      });
      it(shouldUpdateInfoMapExpectation, shouldUpdateInfoMap);
      it(shouldEmitStatusLoadingExpectation, shouldEmitStatusLoading);
      it(shouldEmitStatusAnyLoadingExpectation, shouldEmitStatusAnyLoading);
      it(shouldUpdateMaxQtyExpectation, shouldUpdateMaxQty);
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        service = new PreloaderService(logService);
      });
      it(shouldUpdateInfoMapExpectation, shouldUpdateInfoMap);
      it(shouldEmitStatusLoadingExpectation, shouldEmitStatusLoading);
      it(shouldEmitStatusAnyLoadingExpectation, shouldEmitStatusAnyLoading);
      it(shouldUpdateMaxQtyExpectation, shouldUpdateMaxQty);
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        service = new PreloaderService(logService);
      });
      it(shouldUpdateInfoMapExpectation, shouldUpdateInfoMap);
      it(shouldEmitStatusLoadingExpectation, shouldEmitStatusLoading);
      it(shouldEmitStatusAnyLoadingExpectation, shouldEmitStatusAnyLoading);
      it(shouldUpdateMaxQtyExpectation, shouldUpdateMaxQty);
    });
  });

  describe('loaded method', () => {
    const shouldWarnIfTooMuchDataLoadedExpectation =
      'should warn if too much data is loaded for a preloader';
    const shouldWarnIfTooMuchDataLoaded = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      spyOn(service.logger, 'warn');

      service.loaded(preloaderToTest, qtyToTest);

      expect(service.logger.warn)
        .withContext('warn should have been called once with proper arguments')
        .toHaveBeenCalledOnceWith(
          'More data was loaded than expected for the preloader ',
          preloaderToTest
        );

      service.toLoad(preloaderToTest, qtyToTest);

      expect(service.logger.warn)
        .withContext('warn should have been called once - 1')
        .toHaveBeenCalledTimes(1);

      service.loaded(preloaderToTest, qtyToTest - 1);

      expect(service.logger.warn)
        .withContext('warn should have been called once - 2')
        .toHaveBeenCalledTimes(1);

      service.loaded(preloaderToTest, qtyToTest);

      expect(service.logger.warn)
        .withContext('warn should have been called tiwce')
        .toHaveBeenCalledTimes(2);
    };
    const shouldUpdateQtyExpectation =
      'should update the info with quantity when there is still more to load';
    const shouldUpdateQty = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;
      const qtyLoaded = 1;

      service.toLoad(preloaderToTest, qtyToTest);

      const actualIsLoading = service.info.get(preloaderToTest)?.isLoading;
      expect(actualIsLoading)
        .withContext('preloader isLoading should be true at first')
        .toBe(true);

      const actualQtyToLoad = service.info.get(preloaderToTest)?.qtyToLoad;
      expect(actualQtyToLoad)
        .withContext('preloader qtyToLoad should be as expected at first')
        .toBe(qtyToTest);

      service.loaded(preloaderToTest, qtyLoaded);

      const newActualIsLoading = service.info.get(preloaderToTest)?.isLoading;
      expect(newActualIsLoading)
        .withContext('preloader isLoading should be true after loaded call')
        .toBe(true);

      const newActualQtyToLoad = service.info.get(preloaderToTest)?.qtyToLoad;
      expect(newActualQtyToLoad)
        .withContext(
          'preloader qtyToLoad should be as expected after loaded call'
        )
        .toBe(qtyToTest - qtyLoaded);
    };
    const shouldUpdateQtyZeroExpectation =
      'should update the info with quantity when there is no more to load';
    const shouldUpdateQtyZero = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actualIsLoading = service.info.get(preloaderToTest)?.isLoading;
      expect(actualIsLoading)
        .withContext('preloader isLoading should be true at first')
        .toBe(true);

      const actualQtyToLoad = service.info.get(preloaderToTest)?.qtyToLoad;
      expect(actualQtyToLoad)
        .withContext('preloader qtyToLoad should be true at first')
        .toBe(qtyToTest);

      service.loaded(preloaderToTest, qtyToTest);

      const newActualIsLoading = service.info.get(preloaderToTest)?.isLoading;
      expect(newActualIsLoading)
        .withContext('preloader isLoading should be true after loaded call')
        .toBe(false);

      const newActualQtyToLoad = service.info.get(preloaderToTest)?.qtyToLoad;
      expect(newActualQtyToLoad)
        .withContext('preloader qtyToLoad should be true after loaded call')
        .toBe(0);
    };
    const shouldNotUpdateMaxQtyExpectation =
      'should not update max quantity when there is still more to load';
    const shouldNotUpdateMaxQty = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;
      const qtyLoaded = 1;

      service.toLoad(preloaderToTest, qtyToTest);

      const oldMaxQty = service.maxQty.get(preloaderToTest) as number;

      service.loaded(preloaderToTest, qtyLoaded);

      const newMaxQty = service.maxQty.get(preloaderToTest) as number;

      expect(newMaxQty)
        .withContext('maxQty should not be updated')
        .toBe(oldMaxQty);
    };
    const shouldUpdateMaxQtyZeroExpectation =
      'should update max quantity when there is no more to load';
    const shouldUpdateMaxQtyZero = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      service.loaded(preloaderToTest, qtyToTest);

      const newMaxQty = service.maxQty.get(preloaderToTest) as number;

      expect(newMaxQty).withContext('maxQty should be updated').toBe(0);
    };
    const shouldEmitStatusLoadingZeroExpectation =
      'should emit corresponding status loading when there is no more to load';
    const shouldEmitStatusLoadingZero = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      service.statusLoading
        .get(preloaderToTest)
        ?.pipe(take(1))
        .subscribe({
          next: (value) => {
            expect(value)
              .withContext('loading status should be true at first')
              .toBeTrue();
            service.loaded(preloaderToTest, qtyToTest);
            service.statusLoading.get(preloaderToTest)?.subscribe({
              next: (value) => {
                expect(value)
                  .withContext('loading status should be false after')
                  .toBeFalse();
              },
            });
          },
        });
    };
    const shouldNotEmitStatusLoadingExpectation =
      'should not emit corresponding status loading when there is still more to load';
    const shouldNotEmitStatusLoading = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;
      const qtyLoaded = 1;

      service.toLoad(preloaderToTest, qtyToTest);

      service.statusLoading
        .get(preloaderToTest)
        ?.pipe(take(1))
        .subscribe({
          next: (value) => {
            expect(value)
              .withContext('loading status should be true at first')
              .toBeTrue();
            service.loaded(preloaderToTest, qtyLoaded);
            service.statusLoading.get(preloaderToTest)?.subscribe({
              next: (value) => {
                expect(value)
                  .withContext('loading status should be true after')
                  .toBeTrue();
              },
            });
          },
        });
    };
    const shouldNotEmitAnyLoadingExpectation =
      'should not emit any loading if there is still more to load';
    const shouldNotEmitAnyLoading = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;
      const qtyLoaded = 1;

      service.toLoad(preloaderToTest, qtyToTest);

      service.statusAnyLoading.pipe(take(1)).subscribe({
        next: (value) => {
          expect(value)
            .withContext('loading status should be true at first')
            .toBeTrue();
          service.loaded(preloaderToTest, qtyLoaded);
          service.statusAnyLoading.pipe(take(1)).subscribe({
            next: (value) => {
              expect(value)
                .withContext(
                  'loading status should be true after incomplete loaded - 1'
                )
                .toBeTrue();
              service.toLoad(otherPreloader, qtyToTest);
              service.statusAnyLoading.pipe(take(1)).subscribe({
                next: (value) => {
                  expect(value)
                    .withContext(
                      'loading status should be true after incomplete loaded - 2'
                    )
                    .toBeTrue();
                  service.loaded(preloaderToTest, qtyToTest - qtyLoaded);
                  service.statusAnyLoading.pipe(take(1)).subscribe({
                    next: (value) => {
                      expect(value)
                        .withContext(
                          'loading status should be true after incomplete loaded - 3'
                        )
                        .toBeTrue();
                    },
                  });
                },
              });
            },
          });
        },
      });
    };
    const shouldEmitAnyLoadingZeroExpectation =
      'should emit any loading if there is no more to load in any loader';
    const shouldEmitAnyLoadingZero = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      service.statusAnyLoading.pipe(take(1)).subscribe({
        next: (value) => {
          expect(value)
            .withContext('loading status should be true at first')
            .toBeTrue();
          service.toLoad(otherPreloader, qtyToTest);
          service.statusAnyLoading.pipe(take(1)).subscribe({
            next: (value) => {
              expect(value)
                .withContext(
                  'loading status should be true after incomplete loaded - 1'
                )
                .toBeTrue();
              service.loaded(otherPreloader, qtyToTest);
              service.statusAnyLoading.pipe(take(1)).subscribe({
                next: (value) => {
                  expect(value)
                    .withContext(
                      'loading status should be true after incomplete loaded - 2'
                    )
                    .toBeTrue();
                  service.loaded(preloaderToTest, qtyToTest);
                  service.statusAnyLoading.pipe(take(1)).subscribe({
                    next: (value) => {
                      expect(value)
                        .withContext(
                          'loading status should be false after complete loaded'
                        )
                        .toBeFalse();
                    },
                  });
                },
              });
            },
          });
        },
      });
    };

    const shouldChangeIsMainLoadZeroExpectation =
      'should change isMainLoad if there is no more to load in any loader';
    const shouldChangeIsMainLoadZero = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      expect(service.isMainLoad)
        .withContext('isMainLoad should be true at first')
        .toBeTrue();

      service.toLoad(otherPreloader, qtyToTest);

      expect(service.isMainLoad)
        .withContext('isMainLoad should be true after incomplete loaded - 1')
        .toBeTrue();

      service.loaded(otherPreloader, qtyToTest);

      expect(service.isMainLoad)
        .withContext('isMainLoad should be true after incomplete loaded - 2')
        .toBeTrue();

      service.loaded(preloaderToTest, qtyToTest);

      expect(service.isMainLoad)
        .withContext('isMainLoad should be false after complete loaded')
        .toBeFalse();
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldWarnIfTooMuchDataLoadedExpectation,
        shouldWarnIfTooMuchDataLoaded
      );
      it(shouldUpdateQtyExpectation, shouldUpdateQty);
      it(shouldUpdateQtyZeroExpectation, shouldUpdateQtyZero);
      it(shouldNotUpdateMaxQtyExpectation, shouldNotUpdateMaxQty);
      it(shouldUpdateMaxQtyZeroExpectation, shouldUpdateMaxQtyZero);
      it(shouldEmitStatusLoadingZeroExpectation, shouldEmitStatusLoadingZero);
      it(shouldNotEmitStatusLoadingExpectation, shouldNotEmitStatusLoading);
      it(shouldNotEmitAnyLoadingExpectation, shouldNotEmitAnyLoading);
      it(shouldEmitAnyLoadingZeroExpectation, shouldEmitAnyLoadingZero);
      it(shouldChangeIsMainLoadZeroExpectation, shouldChangeIsMainLoadZero);
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldWarnIfTooMuchDataLoadedExpectation,
        shouldWarnIfTooMuchDataLoaded
      );
      it(shouldUpdateQtyExpectation, shouldUpdateQty);
      it(shouldUpdateQtyZeroExpectation, shouldUpdateQtyZero);
      it(shouldNotUpdateMaxQtyExpectation, shouldNotUpdateMaxQty);
      it(shouldUpdateMaxQtyZeroExpectation, shouldUpdateMaxQtyZero);
      it(shouldEmitStatusLoadingZeroExpectation, shouldEmitStatusLoadingZero);
      it(shouldNotEmitStatusLoadingExpectation, shouldNotEmitStatusLoading);
      it(shouldNotEmitAnyLoadingExpectation, shouldNotEmitAnyLoading);
      it(shouldEmitAnyLoadingZeroExpectation, shouldEmitAnyLoadingZero);
      it(shouldChangeIsMainLoadZeroExpectation, shouldChangeIsMainLoadZero);
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldWarnIfTooMuchDataLoadedExpectation,
        shouldWarnIfTooMuchDataLoaded
      );
      it(shouldUpdateQtyExpectation, shouldUpdateQty);
      it(shouldUpdateQtyZeroExpectation, shouldUpdateQtyZero);
      it(shouldNotUpdateMaxQtyExpectation, shouldNotUpdateMaxQty);
      it(shouldUpdateMaxQtyZeroExpectation, shouldUpdateMaxQtyZero);
      it(shouldEmitStatusLoadingZeroExpectation, shouldEmitStatusLoadingZero);
      it(shouldNotEmitStatusLoadingExpectation, shouldNotEmitStatusLoading);
      it(shouldNotEmitAnyLoadingExpectation, shouldNotEmitAnyLoading);
      it(shouldEmitAnyLoadingZeroExpectation, shouldEmitAnyLoadingZero);
      it(shouldChangeIsMainLoadZeroExpectation, shouldChangeIsMainLoadZero);
    });
  });

  describe('isLoading method', () => {
    const shouldReturnInfoTrueExpectation =
      'should return true for a loading preloader';
    const shouldReturnInfoTrue = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.isLoading(preloaderToTest);
      expect(actual).withContext('should return true').toBeTrue();
    };
    const shouldReturnInfoFalseExpectation =
      "should return false for a preloader that isn't loading";
    const shouldReturnInfoFalse = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;
      service.isMainLoad = false;

      const actualBefore = service.isLoading(preloaderToTest);
      expect(actualBefore)
        .withContext('should return false before')
        .toBeFalse();

      service.toLoad(preloaderToTest, qtyToTest);

      const actualDuring = service.isLoading(otherPreloader);
      expect(actualDuring)
        .withContext('should return false during')
        .toBeFalse();

      service.loaded(preloaderToTest, qtyToTest);

      const actualAfter = service.isLoading(preloaderToTest);
      expect(actualAfter).withContext('should return false after').toBeFalse();
    };

    const shouldReturnTrueIfMainLoadExpectation =
      'should return true if isMainLoad is true';
    const shouldReturnTrueIfMainLoad = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      const actualBefore = service.isLoading(preloaderToTest);
      expect(actualBefore).withContext('should return true before').toBeTrue();

      service.toLoad(preloaderToTest, qtyToTest);

      const actualDuring = service.isLoading(otherPreloader);
      expect(actualDuring).withContext('should return true during').toBeTrue();

      service.loaded(preloaderToTest, qtyToTest);

      const actualAfter = service.isLoading(preloaderToTest);
      expect(actualAfter)
        .withContext(
          'should return false after, since isMainLoad should have been updated'
        )
        .toBeFalse();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        service = new PreloaderService(logService);
      });
      it(shouldReturnInfoTrueExpectation, shouldReturnInfoTrue);
      it(shouldReturnInfoFalseExpectation, shouldReturnInfoFalse);
      it(shouldReturnTrueIfMainLoadExpectation, shouldReturnTrueIfMainLoad);
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        service = new PreloaderService(logService);
      });
      it(shouldReturnInfoTrueExpectation, shouldReturnInfoTrue);
      it(shouldReturnInfoFalseExpectation, shouldReturnInfoFalse);
      it(shouldReturnTrueIfMainLoadExpectation, shouldReturnTrueIfMainLoad);
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        service = new PreloaderService(logService);
      });
      it(shouldReturnInfoTrueExpectation, shouldReturnInfoTrue);
      it(shouldReturnInfoFalseExpectation, shouldReturnInfoFalse);
      it(shouldReturnTrueIfMainLoadExpectation, shouldReturnTrueIfMainLoad);
    });
  });

  describe('isAnyLoading method', () => {
    const shouldReturnTrueIfAnyLoadingEmptyParamsExpectation =
      'should return true if empty params and any preloader is loading';
    const shouldReturnTrueIfAnyLoadingEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.isAnyLoading();

      expect(actual).withContext('should return true').toBeTrue();
    };
    const shouldReturnFalseIfNoneLoadingEmptyParamsExpectation =
      'should return false if empty params and no preloader is loading';
    const shouldReturnFalseIfNoneLoadingEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      service.loaded(preloaderToTest, qtyToTest);

      const actual = service.isAnyLoading();

      expect(actual).withContext('should return false').toBeFalse();
    };
    const shouldReturnTrueIfAnyLoadingWithParamsExpectation =
      'should return true with params and any preloader is loading';
    const shouldReturnTrueIfAnyLoadingWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;
      service.isMainLoad = false;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.isAnyLoading(preloaderToTest);

      expect(actual).withContext('should return true - 1').toBeTrue();

      service.toLoad(otherPreloader, qtyToTest);

      const otherActual = service.isAnyLoading(otherPreloader);

      expect(otherActual).withContext('should return true - 2').toBeTrue();

      const lastActual = service.isAnyLoading(preloaderToTest, otherPreloader);

      expect(lastActual).withContext('should return true - 3').toBeTrue();
    };
    const shouldReturnFalseIfNoneLoadingWithParamsExpectation =
      'should return false with params and no preloader is loading';
    const shouldReturnFalseIfNoneLoadingWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;
      service.isMainLoad = false;

      service.toLoad(preloaderToTest, qtyToTest);
      service.toLoad(otherPreloader, qtyToTest);

      service.loaded(preloaderToTest, qtyToTest);

      const actual = service.isAnyLoading(preloaderToTest);
      expect(actual).withContext('should return false - 1').toBeFalse();

      service.loaded(otherPreloader, qtyToTest);

      const otherActual = service.isAnyLoading(otherPreloader);
      expect(otherActual).withContext('should return false - 2').toBeFalse();

      const lastActual = service.isAnyLoading(preloaderToTest, otherPreloader);
      expect(lastActual).withContext('should return false - 3').toBeFalse();
    };
    const shouldReturnTrueIfMainLoadWithParamsExpectation =
      'should return true with params and isMainLoad is true';
    const shouldReturnTrueIfMainLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.isAnyLoading(preloaderToTest);

      expect(actual).withContext('should return true - 1').toBeTrue();

      service.toLoad(otherPreloader, qtyToTest);

      const otherActual = service.isAnyLoading(otherPreloader);

      expect(otherActual).withContext('should return true - 2').toBeTrue();

      const lastActual = service.isAnyLoading(preloaderToTest, otherPreloader);

      expect(lastActual).withContext('should return true - 3').toBeTrue();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturnTrueIfAnyLoadingEmptyParamsExpectation,
        shouldReturnTrueIfAnyLoadingEmptyParams
      );
      it(
        shouldReturnFalseIfNoneLoadingEmptyParamsExpectation,
        shouldReturnFalseIfNoneLoadingEmptyParams
      );
      it(
        shouldReturnTrueIfAnyLoadingWithParamsExpectation,
        shouldReturnTrueIfAnyLoadingWithParams
      );
      it(
        shouldReturnFalseIfNoneLoadingWithParamsExpectation,
        shouldReturnFalseIfNoneLoadingWithParams
      );
      it(
        shouldReturnTrueIfMainLoadWithParamsExpectation,
        shouldReturnTrueIfMainLoadWithParams
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturnTrueIfAnyLoadingEmptyParamsExpectation,
        shouldReturnTrueIfAnyLoadingEmptyParams
      );
      it(
        shouldReturnFalseIfNoneLoadingEmptyParamsExpectation,
        shouldReturnFalseIfNoneLoadingEmptyParams
      );
      it(
        shouldReturnTrueIfAnyLoadingWithParamsExpectation,
        shouldReturnTrueIfAnyLoadingWithParams
      );
      it(
        shouldReturnFalseIfNoneLoadingWithParamsExpectation,
        shouldReturnFalseIfNoneLoadingWithParams
      );
      it(
        shouldReturnTrueIfMainLoadWithParamsExpectation,
        shouldReturnTrueIfMainLoadWithParams
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturnTrueIfAnyLoadingEmptyParamsExpectation,
        shouldReturnTrueIfAnyLoadingEmptyParams
      );
      it(
        shouldReturnFalseIfNoneLoadingEmptyParamsExpectation,
        shouldReturnFalseIfNoneLoadingEmptyParams
      );
      it(
        shouldReturnTrueIfAnyLoadingWithParamsExpectation,
        shouldReturnTrueIfAnyLoadingWithParams
      );
      it(
        shouldReturnFalseIfNoneLoadingWithParamsExpectation,
        shouldReturnFalseIfNoneLoadingWithParams
      );
      it(
        shouldReturnTrueIfMainLoadWithParamsExpectation,
        shouldReturnTrueIfMainLoadWithParams
      );
    });
  });

  describe('getTotalMaxElToLoad method', () => {
    const shouldReturn0NoElToLoadEmptyParamsExpectation =
      'should return 0 when empty params and nothing has to load';
    const shouldReturn0NoElToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      const actual = service.getTotalMaxElToLoad();

      expect(actual).withContext('should return 0 - 1').toBe(0);

      service.toLoad(preloaderToTest, qtyToTest);
      service.loaded(preloaderToTest, qtyToTest);

      const otherActual = service.getTotalMaxElToLoad();

      expect(otherActual).withContext('should return 0 - 2').toBe(0);
    };
    const shouldReturnValueElToLoadEmptyParamsExpectation =
      'should return the total max to load when empty params and something has to load';
    const shouldReturnValueElToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.getTotalMaxElToLoad();

      expect(actual)
        .withContext('should return expected value - 1')
        .toBe(qtyToTest);

      service.toLoad(otherPreloader, qtyToTest);

      const otherActual = service.getTotalMaxElToLoad();

      expect(otherActual)
        .withContext('should return expected value - 2')
        .toBe(qtyToTest + qtyToTest);

      service.loaded(otherPreloader, qtyToTest - 1);

      const anotherActual = service.getTotalMaxElToLoad();

      expect(anotherActual)
        .withContext('should return expected value - 3')
        .toBe(qtyToTest + qtyToTest);

      service.loaded(otherPreloader, 1);

      const lastActual = service.getTotalMaxElToLoad();

      expect(lastActual)
        .withContext('should return expected value - 4')
        .toBe(qtyToTest);
    };
    const shouldReturn0NoElToLoadWithParamsExpectation =
      'should return 0 with params and nothing has to load';
    const shouldReturn0NoElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      const actual = service.getTotalMaxElToLoad(preloaderToTest);

      expect(actual).withContext('should return 0 - 1').toBe(0);

      service.toLoad(preloaderToTest, qtyToTest);

      const otherActual = service.getTotalMaxElToLoad(otherPreloader);

      expect(otherActual).withContext('should return 0 - 2').toBe(0);

      service.loaded(preloaderToTest, qtyToTest);

      const anotherActual = service.getTotalMaxElToLoad(preloaderToTest);

      expect(anotherActual).withContext('should return 0 - 3').toBe(0);

      const lastActual = service.getTotalMaxElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(lastActual).withContext('should return 0 - 4').toBe(0);
    };
    const shouldReturnValueElToLoadWithParamsExpectation =
      'should return the total max to load whith params and something has to load';
    const shouldReturnValueElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.getTotalMaxElToLoad(preloaderToTest);

      expect(actual)
        .withContext('should return expected value - 1')
        .toBe(qtyToTest);

      service.toLoad(otherPreloader, qtyToTest);

      const otherActual = service.getTotalMaxElToLoad(otherPreloader);

      expect(otherActual)
        .withContext('should return expected value - 2')
        .toBe(qtyToTest);

      const anotherActual = service.getTotalMaxElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual)
        .withContext('should return expected value - 3')
        .toBe(qtyToTest + qtyToTest);

      service.loaded(otherPreloader, qtyToTest - 1);

      const otherActual2 = service.getTotalMaxElToLoad(otherPreloader);

      expect(otherActual2)
        .withContext('should return expected value - 4')
        .toBe(qtyToTest);

      const anotherActual2 = service.getTotalMaxElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual2)
        .withContext('should return expected value - 5')
        .toBe(qtyToTest + qtyToTest);

      service.loaded(otherPreloader, 1);

      const lastActual = service.getTotalMaxElToLoad(preloaderToTest);

      expect(lastActual)
        .withContext('should return expected value - 6')
        .toBe(qtyToTest);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturn0NoElToLoadEmptyParamsExpectation,
        shouldReturn0NoElToLoadEmptyParams
      );
      it(
        shouldReturnValueElToLoadEmptyParamsExpectation,
        shouldReturnValueElToLoadEmptyParams
      );
      it(
        shouldReturn0NoElToLoadWithParamsExpectation,
        shouldReturn0NoElToLoadWithParams
      );
      it(
        shouldReturnValueElToLoadWithParamsExpectation,
        shouldReturnValueElToLoadWithParams
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturn0NoElToLoadEmptyParamsExpectation,
        shouldReturn0NoElToLoadEmptyParams
      );
      it(
        shouldReturnValueElToLoadEmptyParamsExpectation,
        shouldReturnValueElToLoadEmptyParams
      );
      it(
        shouldReturn0NoElToLoadWithParamsExpectation,
        shouldReturn0NoElToLoadWithParams
      );
      it(
        shouldReturnValueElToLoadWithParamsExpectation,
        shouldReturnValueElToLoadWithParams
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturn0NoElToLoadEmptyParamsExpectation,
        shouldReturn0NoElToLoadEmptyParams
      );
      it(
        shouldReturnValueElToLoadEmptyParamsExpectation,
        shouldReturnValueElToLoadEmptyParams
      );
      it(
        shouldReturn0NoElToLoadWithParamsExpectation,
        shouldReturn0NoElToLoadWithParams
      );
      it(
        shouldReturnValueElToLoadWithParamsExpectation,
        shouldReturnValueElToLoadWithParams
      );
    });
  });

  describe('getTotalElToLoad method', () => {
    const shouldReturn0NoElToLoadEmptyParamsExpectation =
      'should return 0 when empty params and nothing has to load';
    const shouldReturn0NoElToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      const actual = service.getTotalElToLoad();

      expect(actual).withContext('should return 0 - 1').toBe(0);

      service.toLoad(preloaderToTest, qtyToTest);
      service.loaded(preloaderToTest, qtyToTest);

      const otherActual = service.getTotalElToLoad();

      expect(otherActual).withContext('should return 0 - 2').toBe(0);
    };
    const shouldReturnValueElToLoadEmptyParamsExpectation =
      'should return the total to load when empty params and something has to load';
    const shouldReturnValueElToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.getTotalElToLoad();

      expect(actual)
        .withContext('should return expected value - 1')
        .toBe(qtyToTest);

      service.toLoad(otherPreloader, qtyToTest);

      const otherActual = service.getTotalElToLoad();

      expect(otherActual)
        .withContext('should return expected value - 2')
        .toBe(qtyToTest + qtyToTest);

      service.loaded(otherPreloader, qtyToTest - 1);

      const anotherActual = service.getTotalElToLoad();

      expect(anotherActual)
        .withContext('should return expected value - 3')
        .toBe(qtyToTest + 1);

      service.loaded(otherPreloader, 1);

      const lastActual = service.getTotalElToLoad();

      expect(lastActual)
        .withContext('should return expected value - 4')
        .toBe(qtyToTest);
    };
    const shouldReturn0NoElToLoadWithParamsExpectation =
      'should return 0 whith params and nothing has to load';
    const shouldReturn0NoElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      const actual = service.getTotalElToLoad(preloaderToTest);

      expect(actual).withContext('should return 0 - 1').toBe(0);

      service.toLoad(preloaderToTest, qtyToTest);

      const otherActual = service.getTotalElToLoad(otherPreloader);

      expect(otherActual).withContext('should return 0 - 2').toBe(0);

      service.loaded(preloaderToTest, qtyToTest);

      const anotherActual = service.getTotalElToLoad(preloaderToTest);

      expect(anotherActual).withContext('should return 0 - 3').toBe(0);

      const lastActual = service.getTotalElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(lastActual).withContext('should return 0 - 4').toBe(0);
    };
    const shouldReturnValueElToLoadWithParamsExpectation =
      'should return the total to load whith params and something has to load';
    const shouldReturnValueElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.getTotalElToLoad(preloaderToTest);

      expect(actual)
        .withContext('should return the expected value - 1')
        .toBe(qtyToTest);

      service.toLoad(otherPreloader, qtyToTest);

      const otherActual = service.getTotalElToLoad(otherPreloader);

      expect(otherActual)
        .withContext('should return the expected value - 2')
        .toBe(qtyToTest);

      const anotherActual = service.getTotalElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual)
        .withContext('should return the expected value - 3')
        .toBe(qtyToTest + qtyToTest);

      service.loaded(otherPreloader, qtyToTest - 1);

      const otherActual2 = service.getTotalElToLoad(otherPreloader);

      expect(otherActual2)
        .withContext('should return the expected value - 4')
        .toBe(1);

      const anotherActual2 = service.getTotalElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual2)
        .withContext('should return the expected value - 5')
        .toBe(qtyToTest + 1);

      service.loaded(otherPreloader, 1);

      const lastActual = service.getTotalElToLoad(preloaderToTest);

      expect(lastActual)
        .withContext('should return the expected value - 6')
        .toBe(qtyToTest);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturn0NoElToLoadEmptyParamsExpectation,
        shouldReturn0NoElToLoadEmptyParams
      );
      it(
        shouldReturnValueElToLoadEmptyParamsExpectation,
        shouldReturnValueElToLoadEmptyParams
      );
      it(
        shouldReturn0NoElToLoadWithParamsExpectation,
        shouldReturn0NoElToLoadWithParams
      );
      it(
        shouldReturnValueElToLoadWithParamsExpectation,
        shouldReturnValueElToLoadWithParams
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturn0NoElToLoadEmptyParamsExpectation,
        shouldReturn0NoElToLoadEmptyParams
      );
      it(
        shouldReturnValueElToLoadEmptyParamsExpectation,
        shouldReturnValueElToLoadEmptyParams
      );
      it(
        shouldReturn0NoElToLoadWithParamsExpectation,
        shouldReturn0NoElToLoadWithParams
      );
      it(
        shouldReturnValueElToLoadWithParamsExpectation,
        shouldReturnValueElToLoadWithParams
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturn0NoElToLoadEmptyParamsExpectation,
        shouldReturn0NoElToLoadEmptyParams
      );
      it(
        shouldReturnValueElToLoadEmptyParamsExpectation,
        shouldReturnValueElToLoadEmptyParams
      );
      it(
        shouldReturn0NoElToLoadWithParamsExpectation,
        shouldReturn0NoElToLoadWithParams
      );
      it(
        shouldReturnValueElToLoadWithParamsExpectation,
        shouldReturnValueElToLoadWithParams
      );
    });
  });

  describe('getProgressionPercent method', () => {
    const shouldReturn100NoElToLoadEmptyParamsExpectation =
      'should return 100 when empty params and nothing has to load';
    const shouldReturn100NoElToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;
      service.isMainLoad = false;

      const actual = service.getProgressionPercent();

      expect(actual).withContext('should return 100 - 1').toBe(100);

      service.toLoad(preloaderToTest, qtyToTest);
      service.loaded(preloaderToTest, qtyToTest);

      const otherActual = service.getProgressionPercent();

      expect(otherActual).withContext('should return 100 - 2').toBe(100);
    };
    const shouldReturnProgressToLoadEmptyParamsExpectation =
      'should return the progression percent when empty params and something has to load';
    const shouldReturnProgressToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.getProgressionPercent();

      expect(actual).withContext('should return 0 - 1').toBe(0);

      service.toLoad(otherPreloader, qtyToTest);

      const otherActual = service.getProgressionPercent();

      expect(otherActual).withContext('should return 0 - 2').toBe(0);

      service.loaded(otherPreloader, qtyToTest - 1);

      const anotherActual = service.getProgressionPercent();

      expect(anotherActual)
        .withContext('should return the expected value')
        .toBe(((qtyToTest - 1) / (qtyToTest + qtyToTest)) * 100);

      service.loaded(otherPreloader, 1);

      const lastActual = service.getProgressionPercent();

      expect(lastActual).withContext('should return 0 - 3').toBe(0);
    };
    const shouldReturn100NoElToLoadWithParamsExpectation =
      'should return 100 whith params and nothing has to load';
    const shouldReturn100NoElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;
      service.isMainLoad = false;

      const actual = service.getProgressionPercent(preloaderToTest);

      expect(actual).withContext('should return 100 - 1').toBe(100);

      service.toLoad(preloaderToTest, qtyToTest);

      const otherActual = service.getProgressionPercent(otherPreloader);

      expect(otherActual).withContext('should return 100 - 2').toBe(100);

      service.loaded(preloaderToTest, qtyToTest);

      const anotherActual = service.getProgressionPercent(preloaderToTest);

      expect(anotherActual).withContext('should return 100 - 3').toBe(100);

      const lastActual = service.getProgressionPercent(
        preloaderToTest,
        otherPreloader
      );

      expect(lastActual).withContext('should return 100 - 4').toBe(100);
    };
    const shouldReturnProgressToLoadWithParamsExpectation =
      'should return the progression percent whith params and something has to load';
    const shouldReturnProgressToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      service.toLoad(preloaderToTest, qtyToTest);

      const actual = service.getProgressionPercent(preloaderToTest);

      expect(actual).withContext('should return 0 - 1').toBe(0);

      service.toLoad(otherPreloader, qtyToTest);

      const otherActual = service.getProgressionPercent(otherPreloader);

      expect(otherActual).withContext('should return 0 - 2').toBe(0);

      const anotherActual = service.getProgressionPercent(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual).withContext('should return 0 - 3').toBe(0);

      service.loaded(otherPreloader, qtyToTest - 1);

      const otherActual2 = service.getProgressionPercent(otherPreloader);

      expect(otherActual2)
        .withContext('should return expected value - 1')
        .toBe(((qtyToTest - 1) / qtyToTest) * 100);

      const anotherActual2 = service.getProgressionPercent(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual2)
        .withContext('should return expected value - 2')
        .toBe(((qtyToTest - 1) / (qtyToTest + qtyToTest)) * 100);

      service.loaded(otherPreloader, 1);

      const lastActual = service.getProgressionPercent(preloaderToTest);

      expect(lastActual).withContext('should return 0 - 4').toBe(0);
    };
    const shouldRetur0NoElToLoadEmptyParamsAndMainLoadExpectation =
      'should return 0 when empty params and nothing has to load and is main load';
    const shouldRetur0NoElToLoadEmptyParamsAndMainLoad = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      const actual = service.getProgressionPercent();

      expect(actual).withContext('should return 0 before').toBe(0);

      service.toLoad(preloaderToTest, qtyToTest);
      service.loaded(preloaderToTest, qtyToTest);

      const otherActual = service.getProgressionPercent();

      expect(otherActual)
        .withContext(
          'should return 100 after, since isMainLoad has been set to true'
        )
        .toBe(100);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturn100NoElToLoadEmptyParamsExpectation,
        shouldReturn100NoElToLoadEmptyParams
      );
      it(
        shouldReturnProgressToLoadEmptyParamsExpectation,
        shouldReturnProgressToLoadEmptyParams
      );
      it(
        shouldReturn100NoElToLoadWithParamsExpectation,
        shouldReturn100NoElToLoadWithParams
      );
      it(
        shouldReturnProgressToLoadWithParamsExpectation,
        shouldReturnProgressToLoadWithParams
      );
      it(
        shouldRetur0NoElToLoadEmptyParamsAndMainLoadExpectation,
        shouldRetur0NoElToLoadEmptyParamsAndMainLoad
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturn100NoElToLoadEmptyParamsExpectation,
        shouldReturn100NoElToLoadEmptyParams
      );
      it(
        shouldReturnProgressToLoadEmptyParamsExpectation,
        shouldReturnProgressToLoadEmptyParams
      );
      it(
        shouldReturn100NoElToLoadWithParamsExpectation,
        shouldReturn100NoElToLoadWithParams
      );
      it(
        shouldReturnProgressToLoadWithParamsExpectation,
        shouldReturnProgressToLoadWithParams
      );
      it(
        shouldRetur0NoElToLoadEmptyParamsAndMainLoadExpectation,
        shouldRetur0NoElToLoadEmptyParamsAndMainLoad
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        service = new PreloaderService(logService);
      });
      it(
        shouldReturn100NoElToLoadEmptyParamsExpectation,
        shouldReturn100NoElToLoadEmptyParams
      );
      it(
        shouldReturnProgressToLoadEmptyParamsExpectation,
        shouldReturnProgressToLoadEmptyParams
      );
      it(
        shouldReturn100NoElToLoadWithParamsExpectation,
        shouldReturn100NoElToLoadWithParams
      );
      it(
        shouldReturnProgressToLoadWithParamsExpectation,
        shouldReturnProgressToLoadWithParams
      );
      it(
        shouldRetur0NoElToLoadEmptyParamsAndMainLoadExpectation,
        shouldRetur0NoElToLoadEmptyParamsAndMainLoad
      );
    });
  });
});
