import { LogService } from '../log/log.service';
import { PreloaderService } from '../preloader/preloader.service';
import { environment as devEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as prodEnvironment } from 'src/environments/environment.prod';
import { LogPublishersService } from '../log/publishers/log-publishers.service';
import { IEnvironment } from 'src/environments/interface/ienvironment';
import { Preloaders } from './preloaders/preloaders';
import { take } from 'rxjs';

let preloaderService: PreloaderService;
let devEnv: IEnvironment;
let stagingEnv: IEnvironment;
let prodEnv: IEnvironment;

describe('PreloaderService', () => {
  beforeEach(() => {
    devEnv = devEnvironment;
    stagingEnv = stagingEnvironment;
    prodEnv = prodEnvironment;
  });

  const shouldHaveProperLoggerExpectation = 'should have a proper logger';
  const shouldHaveProperLogger = () => {
    expect(preloaderService.logger).toBeTruthy();

    const expected = 'PreloaderService';
    const actual = preloaderService.logger.className;

    expect(actual).toBe(expected);
  };

  const shouldHaveProperlyDefinedInfoMapExpectation =
    'should properly define info map';
  const shouldHaveProperlyDefinedInfoMap = () => {
    const actual = preloaderService.info;

    Object.keys(Preloaders).forEach((element) => {
      expect(actual.get(element as Preloaders)).toBeTruthy();
      expect(actual.get(element as Preloaders)?.qtyToLoad).toBe(0);
      expect(actual.get(element as Preloaders)?.isLoading).toBeFalse();
    });
  };

  const shouldHaveProperlyDefinedStatusLoadingMapExpectation =
    'should properly define status loading map';
  const shouldHaveProperlyDefinedStatusLoadingMap = () => {
    const actual = preloaderService.statusLoading;

    Object.keys(Preloaders).forEach((element) => {
      expect(actual.get(element as Preloaders)).toBeTruthy();
      actual.get(element as Preloaders)?.subscribe({
        next: (value) => {
          expect(value).toBeNull();
        },
      });
    });
  };

  const shouldHaveProperlyDefinedStatusAnyLoadingExpectation =
    'should properly define status any loading map';
  const shouldHaveProperlyDefinedStatusAnyLoading = () => {
    const actual = preloaderService.statusAnyLoading;

    actual.subscribe({
      next: (value) => {
        expect(value).toBeNull();
      },
    });
  };

  const shouldHaveProperlyDefinedMaxQtyExpectation =
    'should properly define max quantity map';
  const shouldHaveProperlyDefinedMaxQty = () => {
    const actual = preloaderService.maxQty;

    Object.keys(Preloaders).forEach((element) => {
      expect(actual.get(element as Preloaders)).toBe(0);
    });
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        devEnv,
        new LogPublishersService(devEnv)
      );
      preloaderService = new PreloaderService(logService);
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
  });

  describe('in staging environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        stagingEnv,
        new LogPublishersService(stagingEnv)
      );
      preloaderService = new PreloaderService(logService);
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
  });

  describe('in prod environment', () => {
    beforeEach(() => {
      const logService = new LogService(
        prodEnv,
        new LogPublishersService(prodEnv)
      );
      preloaderService = new PreloaderService(logService);
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
  });

  describe('toLoad method', () => {
    const shouldUpdateInfoMapExpectation = 'should update info map';
    const shouldUpdateInfoMap = () => {
      const expectedIsLoading = true;
      const expectedQtyToLoad = 3;
      const preloaderToTest = Preloaders.MAIN;

      preloaderService.toLoad(preloaderToTest, expectedQtyToLoad);

      expect(preloaderService.info.get(preloaderToTest)).toBeTruthy();

      const actualIsLoading =
        preloaderService.info.get(preloaderToTest)?.isLoading;
      expect(actualIsLoading).toBe(expectedIsLoading);

      const actualQtyToLoad =
        preloaderService.info.get(preloaderToTest)?.qtyToLoad;
      expect(actualQtyToLoad).toBe(expectedQtyToLoad);

      const newLoadQty = 4;

      preloaderService.toLoad(preloaderToTest, newLoadQty);

      expect(preloaderService.info.get(preloaderToTest)).toBeTruthy();

      const newActualIsLoading =
        preloaderService.info.get(preloaderToTest)?.isLoading;
      expect(newActualIsLoading).toBe(expectedIsLoading);

      const newActualQtyToLoad =
        preloaderService.info.get(preloaderToTest)?.qtyToLoad;
      expect(newActualQtyToLoad).toBe(expectedQtyToLoad + newLoadQty);
    };
    const shouldEmitStatusLoadingExpectation =
      'should emit corresponding loading status';
    const shouldEmitStatusLoading = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      preloaderService.statusLoading
        .get(preloaderToTest)
        ?.pipe(take(1))
        .subscribe({
          next: (value) => {
            expect(value).toBeNull();
            preloaderService.toLoad(preloaderToTest, qtyToTest);

            preloaderService.statusLoading.get(preloaderToTest)?.subscribe({
              next: (value) => {
                expect(value).toBeTrue();
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

      preloaderService.statusAnyLoading?.pipe(take(1)).subscribe({
        next: (value) => {
          expect(value).toBeNull();
          preloaderService.toLoad(preloaderToTest, qtyToTest);

          preloaderService.statusAnyLoading.subscribe({
            next: (value) => {
              expect(value).toBeTrue();
            },
          });
        },
      });
    };
    const shouldUpdateMaxQtyExpectation = 'should update max quantity';
    const shouldUpdateMaxQty = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      const oldMax = preloaderService.maxQty.get(preloaderToTest) as number;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const newMax = preloaderService.maxQty.get(preloaderToTest);

      expect(newMax).toBe(oldMax + qtyToTest);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
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
        preloaderService = new PreloaderService(logService);
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
        preloaderService = new PreloaderService(logService);
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

      spyOn(preloaderService.logger, 'warn');

      preloaderService.loaded(preloaderToTest, qtyToTest);

      expect(preloaderService.logger.warn).toHaveBeenCalledOnceWith(
        'More data was loaded than expected for the preloader ',
        preloaderToTest
      );

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      expect(preloaderService.logger.warn).toHaveBeenCalledTimes(1);

      preloaderService.loaded(preloaderToTest, qtyToTest - 1);

      expect(preloaderService.logger.warn).toHaveBeenCalledTimes(1);

      preloaderService.loaded(preloaderToTest, qtyToTest);

      expect(preloaderService.logger.warn).toHaveBeenCalledTimes(2);
    };
    const shouldUpdateQtyExpectation =
      'should update the info with quantity when there is still more to load';
    const shouldUpdateQty = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;
      const qtyLoaded = 1;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      expect(preloaderService.info.get(preloaderToTest)).toBeTruthy();

      const actualIsLoading =
        preloaderService.info.get(preloaderToTest)?.isLoading;
      expect(actualIsLoading).toBe(true);

      const actualQtyToLoad =
        preloaderService.info.get(preloaderToTest)?.qtyToLoad;
      expect(actualQtyToLoad).toBe(qtyToTest);

      preloaderService.loaded(preloaderToTest, qtyLoaded);

      expect(preloaderService.info.get(preloaderToTest)).toBeTruthy();

      const newActualIsLoading =
        preloaderService.info.get(preloaderToTest)?.isLoading;
      expect(newActualIsLoading).toBe(true);

      const newActualQtyToLoad =
        preloaderService.info.get(preloaderToTest)?.qtyToLoad;
      expect(newActualQtyToLoad).toBe(qtyToTest - qtyLoaded);
    };
    const shouldUpdateQtyZeroExpectation =
      'should update the info with quantity when there is no more to load';
    const shouldUpdateQtyZero = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      expect(preloaderService.info.get(preloaderToTest)).toBeTruthy();

      const actualIsLoading =
        preloaderService.info.get(preloaderToTest)?.isLoading;
      expect(actualIsLoading).toBe(true);

      const actualQtyToLoad =
        preloaderService.info.get(preloaderToTest)?.qtyToLoad;
      expect(actualQtyToLoad).toBe(qtyToTest);

      preloaderService.loaded(preloaderToTest, qtyToTest);

      expect(preloaderService.info.get(preloaderToTest)).toBeTruthy();

      const newActualIsLoading =
        preloaderService.info.get(preloaderToTest)?.isLoading;
      expect(newActualIsLoading).toBe(false);

      const newActualQtyToLoad =
        preloaderService.info.get(preloaderToTest)?.qtyToLoad;
      expect(newActualQtyToLoad).toBe(0);
    };
    const shouldNotUpdateMaxQtyExpectation =
      'should not update max quantity when there is still more to load';
    const shouldNotUpdateMaxQty = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;
      const qtyLoaded = 1;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const oldMaxQty = preloaderService.maxQty.get(preloaderToTest) as number;

      preloaderService.loaded(preloaderToTest, qtyLoaded);

      const newMaxQty = preloaderService.maxQty.get(preloaderToTest) as number;

      expect(newMaxQty).toBe(oldMaxQty);
    };
    const shouldUpdateMaxQtyZeroExpectation =
      'should update max quantity when there is no more to load';
    const shouldUpdateMaxQtyZero = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      preloaderService.loaded(preloaderToTest, qtyToTest);

      const newMaxQty = preloaderService.maxQty.get(preloaderToTest) as number;

      expect(newMaxQty).toBe(0);
    };
    const shouldEmitStatusLoadingZeroExpectation =
      'should emit corresponding status loading when there is no more to load';
    const shouldEmitStatusLoadingZero = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      preloaderService.statusLoading
        .get(preloaderToTest)
        ?.pipe(take(1))
        .subscribe({
          next: (value) => {
            expect(value).toBeTrue();
            preloaderService.loaded(preloaderToTest, qtyToTest);
            preloaderService.statusLoading.get(preloaderToTest)?.subscribe({
              next: (value) => {
                expect(value).toBeFalse();
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

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      preloaderService.statusLoading
        .get(preloaderToTest)
        ?.pipe(take(1))
        .subscribe({
          next: (value) => {
            expect(value).toBeTrue();
            preloaderService.loaded(preloaderToTest, qtyLoaded);
            preloaderService.statusLoading.get(preloaderToTest)?.subscribe({
              next: (value) => {
                expect(value).toBeTrue();
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

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      preloaderService.statusAnyLoading.pipe(take(1)).subscribe({
        next: (value) => {
          expect(value).toBeTrue();
          preloaderService.loaded(preloaderToTest, qtyLoaded);
          preloaderService.statusAnyLoading.pipe(take(1)).subscribe({
            next: (value) => {
              expect(value).toBeTrue();
              preloaderService.toLoad(otherPreloader, qtyToTest);
              preloaderService.statusAnyLoading.pipe(take(1)).subscribe({
                next: (value) => {
                  expect(value).toBeTrue();
                  preloaderService.loaded(
                    preloaderToTest,
                    qtyToTest - qtyLoaded
                  );
                  preloaderService.statusAnyLoading.pipe(take(1)).subscribe({
                    next: (value) => {
                      expect(value).toBeTrue();
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

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      preloaderService.statusAnyLoading.pipe(take(1)).subscribe({
        next: (value) => {
          expect(value).toBeTrue();
          preloaderService.toLoad(otherPreloader, qtyToTest);
          preloaderService.statusAnyLoading.pipe(take(1)).subscribe({
            next: (value) => {
              expect(value).toBeTrue();
              preloaderService.loaded(otherPreloader, qtyToTest);
              preloaderService.statusAnyLoading.pipe(take(1)).subscribe({
                next: (value) => {
                  expect(value).toBeTrue();
                  preloaderService.loaded(preloaderToTest, qtyToTest);
                  preloaderService.statusAnyLoading.pipe(take(1)).subscribe({
                    next: (value) => {
                      expect(value).toBeFalse();
                    },
                  });
                },
              });
            },
          });
        },
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
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
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
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
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
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
    });
  });

  describe('isLoading method', () => {
    const shouldReturnInfoTrueExpectation =
      'should return true for a loading preloader';
    const shouldReturnInfoTrue = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actual = preloaderService.isLoading(preloaderToTest);
      expect(actual).toBeTrue();
    };
    const shouldReturnInfoFalseExpectation =
      "should return false for a preloader that isn't loading";
    const shouldReturnInfoFalse = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      const actualBefore = preloaderService.isLoading(preloaderToTest);
      expect(actualBefore).toBeFalse();

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actualDuring = preloaderService.isLoading(otherPreloader);
      expect(actualDuring).toBeFalse();

      preloaderService.loaded(preloaderToTest, qtyToTest);

      const actualAfter = preloaderService.isLoading(preloaderToTest);
      expect(actualAfter).toBeFalse();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
      });
      it(shouldReturnInfoTrueExpectation, shouldReturnInfoTrue);
      it(shouldReturnInfoFalseExpectation, shouldReturnInfoFalse);
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
      });
      it(shouldReturnInfoTrueExpectation, shouldReturnInfoTrue);
      it(shouldReturnInfoFalseExpectation, shouldReturnInfoFalse);
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
      });
      it(shouldReturnInfoTrueExpectation, shouldReturnInfoTrue);
      it(shouldReturnInfoFalseExpectation, shouldReturnInfoFalse);
    });
  });

  describe('isAnyLoading method', () => {
    const shouldReturnTrueIfAnyLoadingEmptyParamsExpectation =
      'should return true if empty params and any preloader is loading';
    const shouldReturnTrueIfAnyLoadingEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actual = preloaderService.isAnyLoading();

      expect(actual).toBeTrue();
    };
    const shouldReturnFalseIfNoneLoadingEmptyParamsExpectation =
      'should return false if empty params and no preloader is loading';
    const shouldReturnFalseIfNoneLoadingEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      preloaderService.loaded(preloaderToTest, qtyToTest);

      const actual = preloaderService.isAnyLoading();

      expect(actual).toBeFalse();
    };
    const shouldReturnTrueIfAnyLoadingWithParamsExpectation =
      'should return true with params and any preloader is loading';
    const shouldReturnTrueIfAnyLoadingWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actual = preloaderService.isAnyLoading(preloaderToTest);

      expect(actual).toBeTrue();

      preloaderService.toLoad(otherPreloader, qtyToTest);

      const otherActual = preloaderService.isAnyLoading(otherPreloader);

      expect(otherActual).toBeTrue();

      const lastActual = preloaderService.isAnyLoading(
        preloaderToTest,
        otherPreloader
      );

      expect(lastActual).toBeTrue();
    };
    const shouldReturnFalseIfNoneLoadingWithParamsExpectation =
      'should return false with params and no preloader is loading';
    const shouldReturnFalseIfNoneLoadingWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);
      preloaderService.toLoad(otherPreloader, qtyToTest);

      preloaderService.loaded(preloaderToTest, qtyToTest);

      const actual = preloaderService.isAnyLoading(preloaderToTest);
      expect(actual).toBeFalse();

      preloaderService.loaded(otherPreloader, qtyToTest);

      const otherActual = preloaderService.isAnyLoading(otherPreloader);
      expect(otherActual).toBeFalse();

      const lastActual = preloaderService.isAnyLoading(
        preloaderToTest,
        otherPreloader
      );
      expect(lastActual).toBeFalse();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
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
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
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
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
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
    });
  });

  describe('getTotalMaxElToLoad method', () => {
    const shouldReturn0NoElToLoadEmptyParamsExpectation =
      'should return 0 when empty params and nothing has to load';
    const shouldReturn0NoElToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const qtyToTest = 2;

      const actual = preloaderService.getTotalMaxElToLoad();

      expect(actual).toBe(0);

      preloaderService.toLoad(preloaderToTest, qtyToTest);
      preloaderService.loaded(preloaderToTest, qtyToTest);

      const otherActual = preloaderService.getTotalMaxElToLoad();

      expect(otherActual).toBe(0);
    };
    const shouldReturnValueElToLoadEmptyParamsExpectation =
      'should return the total max to load when empty params and something has to load';
    const shouldReturnValueElToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actual = preloaderService.getTotalMaxElToLoad();

      expect(actual).toBe(qtyToTest);

      preloaderService.toLoad(otherPreloader, qtyToTest);

      const otherActual = preloaderService.getTotalMaxElToLoad();

      expect(otherActual).toBe(qtyToTest + qtyToTest);

      preloaderService.loaded(otherPreloader, qtyToTest - 1);

      const anotherActual = preloaderService.getTotalMaxElToLoad();

      expect(anotherActual).toBe(qtyToTest + qtyToTest);

      preloaderService.loaded(otherPreloader, 1);

      const lastActual = preloaderService.getTotalMaxElToLoad();

      expect(lastActual).toBe(qtyToTest);
    };
    const shouldReturn0NoElToLoadWithParamsExpectation =
      'should return 0 with params and nothing has to load';
    const shouldReturn0NoElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      const actual = preloaderService.getTotalMaxElToLoad(preloaderToTest);

      expect(actual).toBe(0);

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const otherActual = preloaderService.getTotalMaxElToLoad(otherPreloader);

      expect(otherActual).toBe(0);

      preloaderService.loaded(preloaderToTest, qtyToTest);

      const anotherActual =
        preloaderService.getTotalMaxElToLoad(preloaderToTest);

      expect(anotherActual).toBe(0);

      const lastActual = preloaderService.getTotalMaxElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(lastActual).toBe(0);
    };
    const shouldReturnValueElToLoadWithParamsExpectation =
      'should return the total max to load whith params and something has to load';
    const shouldReturnValueElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actual = preloaderService.getTotalMaxElToLoad(preloaderToTest);

      expect(actual).toBe(qtyToTest);

      preloaderService.toLoad(otherPreloader, qtyToTest);

      const otherActual = preloaderService.getTotalMaxElToLoad(otherPreloader);

      expect(otherActual).toBe(qtyToTest);

      const anotherActual = preloaderService.getTotalMaxElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual).toBe(qtyToTest + qtyToTest);

      preloaderService.loaded(otherPreloader, qtyToTest - 1);

      const otherActual2 = preloaderService.getTotalMaxElToLoad(otherPreloader);

      expect(otherActual2).toBe(qtyToTest);

      const anotherActual2 = preloaderService.getTotalMaxElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual2).toBe(qtyToTest + qtyToTest);

      preloaderService.loaded(otherPreloader, 1);

      const lastActual = preloaderService.getTotalMaxElToLoad(preloaderToTest);

      expect(lastActual).toBe(qtyToTest);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
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
        preloaderService = new PreloaderService(logService);
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
        preloaderService = new PreloaderService(logService);
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

      const actual = preloaderService.getTotalElToLoad();

      expect(actual).toBe(0);

      preloaderService.toLoad(preloaderToTest, qtyToTest);
      preloaderService.loaded(preloaderToTest, qtyToTest);

      const otherActual = preloaderService.getTotalElToLoad();

      expect(otherActual).toBe(0);
    };
    const shouldReturnValueElToLoadEmptyParamsExpectation =
      'should return the total to load when empty params and something has to load';
    const shouldReturnValueElToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actual = preloaderService.getTotalElToLoad();

      expect(actual).toBe(qtyToTest);

      preloaderService.toLoad(otherPreloader, qtyToTest);

      const otherActual = preloaderService.getTotalElToLoad();

      expect(otherActual).toBe(qtyToTest + qtyToTest);

      preloaderService.loaded(otherPreloader, qtyToTest - 1);

      const anotherActual = preloaderService.getTotalElToLoad();

      expect(anotherActual).toBe(qtyToTest + 1);

      preloaderService.loaded(otherPreloader, 1);

      const lastActual = preloaderService.getTotalElToLoad();

      expect(lastActual).toBe(qtyToTest);
    };
    const shouldReturn0NoElToLoadWithParamsExpectation =
      'should return 0 whith params and nothing has to load';
    const shouldReturn0NoElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      const actual = preloaderService.getTotalElToLoad(preloaderToTest);

      expect(actual).toBe(0);

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const otherActual = preloaderService.getTotalElToLoad(otherPreloader);

      expect(otherActual).toBe(0);

      preloaderService.loaded(preloaderToTest, qtyToTest);

      const anotherActual = preloaderService.getTotalElToLoad(preloaderToTest);

      expect(anotherActual).toBe(0);

      const lastActual = preloaderService.getTotalElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(lastActual).toBe(0);
    };
    const shouldReturnValueElToLoadWithParamsExpectation =
      'should return the total to load whith params and something has to load';
    const shouldReturnValueElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actual = preloaderService.getTotalElToLoad(preloaderToTest);

      expect(actual).toBe(qtyToTest);

      preloaderService.toLoad(otherPreloader, qtyToTest);

      const otherActual = preloaderService.getTotalElToLoad(otherPreloader);

      expect(otherActual).toBe(qtyToTest);

      const anotherActual = preloaderService.getTotalElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual).toBe(qtyToTest + qtyToTest);

      preloaderService.loaded(otherPreloader, qtyToTest - 1);

      const otherActual2 = preloaderService.getTotalElToLoad(otherPreloader);

      expect(otherActual2).toBe(1);

      const anotherActual2 = preloaderService.getTotalElToLoad(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual2).toBe(qtyToTest + 1);

      preloaderService.loaded(otherPreloader, 1);

      const lastActual = preloaderService.getTotalElToLoad(preloaderToTest);

      expect(lastActual).toBe(qtyToTest);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
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
        preloaderService = new PreloaderService(logService);
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
        preloaderService = new PreloaderService(logService);
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

      const actual = preloaderService.getProgressionPercent();

      expect(actual).toBe(100);

      preloaderService.toLoad(preloaderToTest, qtyToTest);
      preloaderService.loaded(preloaderToTest, qtyToTest);

      const otherActual = preloaderService.getProgressionPercent();

      expect(otherActual).toBe(100);
    };
    const shouldReturnProgressToLoadEmptyParamsExpectation =
      'should return the progression percent when empty params and something has to load';
    const shouldReturnProgressToLoadEmptyParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actual = preloaderService.getProgressionPercent();

      expect(actual).toBe(0);

      preloaderService.toLoad(otherPreloader, qtyToTest);

      const otherActual = preloaderService.getProgressionPercent();

      expect(otherActual).toBe(0);

      preloaderService.loaded(otherPreloader, qtyToTest - 1);

      const anotherActual = preloaderService.getProgressionPercent();

      expect(anotherActual).toBe(
        ((qtyToTest - 1) / (qtyToTest + qtyToTest)) * 100
      );

      preloaderService.loaded(otherPreloader, 1);

      const lastActual = preloaderService.getProgressionPercent();

      expect(lastActual).toBe(0);
    };
    const shouldReturn100NoElToLoadWithParamsExpectation =
      'should return 100 whith params and nothing has to load';
    const shouldReturn100NoElToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      const actual = preloaderService.getProgressionPercent(preloaderToTest);

      expect(actual).toBe(100);

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const otherActual =
        preloaderService.getProgressionPercent(otherPreloader);

      expect(otherActual).toBe(100);

      preloaderService.loaded(preloaderToTest, qtyToTest);

      const anotherActual =
        preloaderService.getProgressionPercent(preloaderToTest);

      expect(anotherActual).toBe(100);

      const lastActual = preloaderService.getProgressionPercent(
        preloaderToTest,
        otherPreloader
      );

      expect(lastActual).toBe(100);
    };
    const shouldReturnProgressToLoadWithParamsExpectation =
      'should return the progression percent whith params and something has to load';
    const shouldReturnProgressToLoadWithParams = () => {
      const preloaderToTest = Preloaders.MAIN;
      const otherPreloader = Preloaders.TEXTS;
      const qtyToTest = 2;

      preloaderService.toLoad(preloaderToTest, qtyToTest);

      const actual = preloaderService.getProgressionPercent(preloaderToTest);

      expect(actual).toBe(0);

      preloaderService.toLoad(otherPreloader, qtyToTest);

      const otherActual =
        preloaderService.getProgressionPercent(otherPreloader);

      expect(otherActual).toBe(0);

      const anotherActual = preloaderService.getProgressionPercent(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual).toBe(0);

      preloaderService.loaded(otherPreloader, qtyToTest - 1);

      const otherActual2 =
        preloaderService.getProgressionPercent(otherPreloader);

      expect(otherActual2).toBe(((qtyToTest - 1) / qtyToTest) * 100);

      const anotherActual2 = preloaderService.getProgressionPercent(
        preloaderToTest,
        otherPreloader
      );

      expect(anotherActual2).toBe(
        ((qtyToTest - 1) / (qtyToTest + qtyToTest)) * 100
      );

      preloaderService.loaded(otherPreloader, 1);

      const lastActual =
        preloaderService.getProgressionPercent(preloaderToTest);

      expect(lastActual).toBe(0);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          devEnv,
          new LogPublishersService(devEnv)
        );
        preloaderService = new PreloaderService(logService);
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
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          stagingEnv,
          new LogPublishersService(stagingEnv)
        );
        preloaderService = new PreloaderService(logService);
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
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        const logService = new LogService(
          prodEnv,
          new LogPublishersService(prodEnv)
        );
        preloaderService = new PreloaderService(logService);
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
    });
  });
});
