import { TestBed } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { HeaderComponent } from './header.component';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { of } from 'rxjs';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { Languages } from 'src/app/enums/languages';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { LanguageService } from 'src/app/services/language/language.service';

describe('HeaderComponent - unit', () => {
  let headerComponent: HeaderComponent;
  let DOMComputationServiceSpy: jasmine.SpyObj<DOMComputationService>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const myNameSelector = 'sylvain-janet';
  const expectedName = 'test title';
  const expectedOtherLanguage = 'test other language';
  const expectedActualHeight = 18;

  const headerStateLight = scriptVar.headerStateLight;
  const headerStateDark = scriptVar.headerStateDark;

  const cssDarkClass = scriptVar.cssHeaderDarkClass;
  const cssLightClass = scriptVar.cssHeaderLightClass;
  const cssContentDarkClass = scriptVar.cssHeaderContentDarkClass;
  const cssContentLightClass = scriptVar.cssHeaderContentLightClass;

  describe('constructor', () => {
    // beforeEach(() => {
    //   spyOn(HeaderComponent.prototype, 'updateTexts');
    //   headerComponent = TestBed.inject(HeaderComponent);
    // });
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(headerComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(headerComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
      expect(headerComponent.logger)
        .withContext('logger should be set')
        .toBe(logServiceSpy);

      expect(headerComponent.trigger)
        .withContext('trigger should be set')
        .toBe(0);
      expect(headerComponent.headerState)
        .withContext('headerState should be set')
        .toBe('');
      headerComponent.myName.subscribe((s) => {
        expect(s).withContext('myName should be set').toBe('');
      });
      headerComponent.otherLanguage.subscribe((s) => {
        expect(s).withContext('otherLanguage should be set').toBe('');
      });
    };

    const shouldSetProperLoggerExpectation = 'should set proper logger';
    const shouldSetProperLogger = () => {
      const expected = 'HeaderComponent';
      expect(logServiceGlobalSpy.withClassName)
        .withContext('withClassName should have been called')
        .toHaveBeenCalledOnceWith(expected);
    };

    const shouldSubscribeToVisibleToLoadTextServiceExpectation =
      'should subscribe to the visibleToLoadTextService';
    const shouldSubscribeToVisibleToLoadTextService = (done: DoneFn) => {
      setTimeout(() => {
        expect(visibleToLoadTextServiceSpy.subscribe)
          .withContext('subscribe should have been called')
          .toHaveBeenCalledOnceWith(headerComponent);
        done();
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(shouldSetProperLoggerExpectation, shouldSetProperLogger);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(shouldSetProperLoggerExpectation, shouldSetProperLogger);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(shouldSetProperLoggerExpectation, shouldSetProperLogger);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
  });

  describe('updateTexts', () => {
    const shouldCallTextServiceExpectation = 'should call the textService';
    const shouldCallTextService = () => {
      headerComponent.updateTexts();

      expect(textServiceSpy.get)
        .withContext('get should have been called')
        .toHaveBeenCalledTimes(1);
      expect(textServiceSpy.get)
        .withContext('get should have been called with the proper arguments')
        .toHaveBeenCalledWith(myNameSelector);

      expect(textServiceSpy.getOtherLanguage)
        .withContext('getOtherLanguage should have been called')
        .toHaveBeenCalledTimes(1);
    };
    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
      headerComponent.updateTexts();

      const actualMyNameObs = headerComponent.myName;
      const actualOtherLanguageObs = headerComponent.otherLanguage;

      actualMyNameObs.subscribe((s) => {
        expect(s).withContext('myName should be set').toBe(expectedName);
      });
      actualOtherLanguageObs.subscribe((s) => {
        expect(s)
          .withContext('otherLanguage should be set')
          .toBe(expectedOtherLanguage);
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
    });
  });

  describe('ngOnDestroy', () => {
    const shouldUnsubscribeExpectation =
      'should unsubscribe from the visibleToLoadTextService';
    const shouldUnsubscribe = () => {
      headerComponent.ngOnDestroy();
      expect(visibleToLoadTextServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(headerComponent);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
  });

  describe('onResize method', () => {
    const shouldCallUpdateTriggerExpectation =
      'should call updateTrigger method';
    const shouldCallUpdateTrigger = () => {
      spyOn(headerComponent, 'updateTrigger');
      const eventInput = {
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event;

      headerComponent.onResize(eventInput);

      expect(headerComponent.updateTrigger)
        .withContext('updateTrigger should have been called')
        .toHaveBeenCalledOnceWith(eventInput);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCallUpdateTriggerExpectation, shouldCallUpdateTrigger);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCallUpdateTriggerExpectation, shouldCallUpdateTrigger);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCallUpdateTriggerExpectation, shouldCallUpdateTrigger);
    });
  });

  describe('ngOnInit method', () => {
    const shouldCallUpdateTriggerExpectation =
      'should call updateTrigger method';
    const shouldCallUpdateTrigger = () => {
      spyOn(headerComponent, 'updateTrigger');

      headerComponent.ngOnInit();

      expect(headerComponent.updateTrigger)
        .withContext('updateTrigger should have been called')
        .toHaveBeenCalledTimes(1);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCallUpdateTriggerExpectation, shouldCallUpdateTrigger);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCallUpdateTriggerExpectation, shouldCallUpdateTrigger);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCallUpdateTriggerExpectation, shouldCallUpdateTrigger);
    });
  });

  describe('updateTrigger method', () => {
    const shouldSetTriggerExpectation =
      'should set trigger to the height of the banner';
    const shouldSetTrigger = () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      const actualTrigger = headerComponent.trigger;

      expect(DOMComputationServiceSpy.getActualHeight)
        .withContext(
          'getActualHeight should have been called once with the proper arguments'
        )
        .toHaveBeenCalledOnceWith(
          document.getElementsByClassName('banner').item(0)
        );

      expect(actualTrigger)
        .withContext('trigger should be set')
        .toBe(expectedActualHeight);
    };
    const shouldSwitchFromLightToDarkExpectation =
      'should switch header state from light to dark when appropriate';
    const shouldSwitchFromLightToDark = () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark initially')
        .toBe(headerStateDark);

      // trigger is now set

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be light')
        .toBe(headerStateLight);

      // state is now light

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark')
        .toBe(headerStateDark);
    };

    const shouldSwitchFromDarkToLightExpectation =
      'should switch header state from dark to light when appropriate';
    const shouldSwitchFromDarkToLight = () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark after an update')
        .toBe(headerStateDark);

      // trigger is now set

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be light')
        .toBe(headerStateLight);

      // state is now light

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark')
        .toBe(headerStateDark);
    };

    const shouldCallUpdateHeaderExpectation =
      'should call updateHeader when there is a change';
    const shouldCallUpdateHeader = () => {
      spyOn(headerComponent, 'updateHeader');
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called 1 time')
        .toHaveBeenCalledTimes(1);

      // trigger is now set

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called 2 times')
        .toHaveBeenCalledTimes(2);

      // state is now light

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called 3 times')
        .toHaveBeenCalledTimes(3);

      // state has not changed

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger - 2 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called 3 times')
        .toHaveBeenCalledTimes(3);
    };

    const constShouldDoNothingIfNoTargetExpectation =
      'should do nothing if the event has no currentTarget';
    const constShouldDoNothingIfNoTarget = () => {
      headerComponent.updateTrigger({
        currentTarget: null,
      } as unknown as Event);

      expect().nothing();
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldSetTriggerExpectation, shouldSetTrigger);
      it(shouldSwitchFromLightToDarkExpectation, shouldSwitchFromLightToDark);
      it(shouldSwitchFromDarkToLightExpectation, shouldSwitchFromDarkToLight);
      it(shouldCallUpdateHeaderExpectation, shouldCallUpdateHeader);
      it(
        constShouldDoNothingIfNoTargetExpectation,
        constShouldDoNothingIfNoTarget
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldSetTriggerExpectation, shouldSetTrigger);
      it(shouldSwitchFromLightToDarkExpectation, shouldSwitchFromLightToDark);
      it(shouldSwitchFromDarkToLightExpectation, shouldSwitchFromDarkToLight);
      it(shouldCallUpdateHeaderExpectation, shouldCallUpdateHeader);
      it(
        constShouldDoNothingIfNoTargetExpectation,
        constShouldDoNothingIfNoTarget
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldSetTriggerExpectation, shouldSetTrigger);
      it(shouldSwitchFromLightToDarkExpectation, shouldSwitchFromLightToDark);
      it(shouldSwitchFromDarkToLightExpectation, shouldSwitchFromDarkToLight);
      it(shouldCallUpdateHeaderExpectation, shouldCallUpdateHeader);
      it(
        constShouldDoNothingIfNoTargetExpectation,
        constShouldDoNothingIfNoTarget
      );
    });
  });

  describe('changeEveryClass method', () => {
    const shouldSelectUsingOldClassSelectorExpectation =
      'should select using the old class selector';
    const shouldSelectUsingOldClassSelector = () => {
      const oldClass = 'old-class-test';
      const newClass = 'new-class-test';

      const newDiv1 = document.createElement('div');
      const newDiv2 = document.createElement('div');
      const newSpan = document.createElement('span');

      newDiv1.classList.add(oldClass);
      newDiv2.classList.add(oldClass);
      newSpan.classList.add(oldClass);

      document.querySelector('html')?.appendChild(newDiv1);
      document.querySelector('html')?.appendChild(newDiv2);
      document.querySelector('html')?.appendChild(newSpan);

      const elements = document.querySelectorAll('.' + oldClass);
      expect(elements.length)
        .withContext('elements should be non empty')
        .toBeGreaterThan(0);
      spyOn(document, 'querySelectorAll').and.returnValue(elements);

      headerComponent.changeEveryClass(oldClass, newClass);

      expect(document.querySelectorAll)
        .withContext('elements with the appropriate class should be queried')
        .toHaveBeenCalledOnceWith('.' + oldClass);
    };

    const shouldChangeTheClassesExpectation =
      'should change the classes of the elements';
    const shouldChangeTheClasses = () => {
      const oldClass = 'old-class-test-test-test';
      const newClass = 'new-class-test-test-test';

      const newDiv1 = document.createElement('div');
      const newDiv2 = document.createElement('div');
      const newSpan = document.createElement('span');

      newDiv1.classList.add(oldClass);
      newDiv2.classList.add(oldClass);
      newSpan.classList.add(oldClass);

      document.querySelector('html')?.appendChild(newDiv1);
      document.querySelector('html')?.appendChild(newDiv2);
      document.querySelector('html')?.appendChild(newSpan);

      const elements = document.querySelectorAll('.' + oldClass);
      expect(elements.length)
        .withContext('elements should be non empty')
        .toBeGreaterThan(0);
      spyOn(document, 'querySelectorAll').and.returnValue(elements);

      headerComponent.changeEveryClass(oldClass, newClass);

      expect(document.querySelectorAll)
        .withContext('elements with the appropriate class should be queried')
        .toHaveBeenCalledOnceWith('.' + oldClass);

      for (let i = 0; i < elements.length; i++) {
        const el = elements.item(i);
        expect(el.classList.contains(oldClass))
          .withContext('element i=' + i + ' should not have old css class')
          .toBeFalse();
        expect(el.classList.contains(newClass))
          .withContext('element i=' + i + ' should have new css class')
          .toBeTrue();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(
        shouldSelectUsingOldClassSelectorExpectation,
        shouldSelectUsingOldClassSelector
      );
      it(shouldChangeTheClassesExpectation, shouldChangeTheClasses);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(
        shouldSelectUsingOldClassSelectorExpectation,
        shouldSelectUsingOldClassSelector
      );
      it(shouldChangeTheClassesExpectation, shouldChangeTheClasses);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(
        shouldSelectUsingOldClassSelectorExpectation,
        shouldSelectUsingOldClassSelector
      );
      it(shouldChangeTheClassesExpectation, shouldChangeTheClasses);
    });
  });

  describe('updateHeader method', () => {
    const shouldChangeEveryDarkToLightExpectation =
      'should change every dark class to light class when appropriate';
    const shouldChangeEveryDarkToLight = () => {
      spyOn(headerComponent, 'changeEveryClass');
      headerComponent.headerState = 'light';

      headerComponent.updateHeader();

      expect(headerComponent.changeEveryClass)
        .withContext('changeEveryClass should have been called 2 times')
        .toHaveBeenCalledTimes(2);
      expect(headerComponent.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(cssDarkClass, cssLightClass);
      expect(headerComponent.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(cssContentDarkClass, cssContentLightClass);
    };
    const shouldChangeEveryLightToDarkExpectation =
      'should change every light class to dark class when appropriate';
    const shouldChangeEveryLightToDark = () => {
      spyOn(headerComponent, 'changeEveryClass');
      headerComponent.headerState = 'dark';

      headerComponent.updateHeader();

      expect(headerComponent.changeEveryClass)
        .withContext('changeEveryClass should have been called 2 times')
        .toHaveBeenCalledTimes(2);
      expect(headerComponent.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(cssLightClass, cssDarkClass);
      expect(headerComponent.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(cssContentLightClass, cssContentDarkClass);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeEveryDarkToLightExpectation, shouldChangeEveryDarkToLight);
      it(shouldChangeEveryLightToDarkExpectation, shouldChangeEveryLightToDark);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeEveryDarkToLightExpectation, shouldChangeEveryDarkToLight);
      it(shouldChangeEveryLightToDarkExpectation, shouldChangeEveryLightToDark);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeEveryDarkToLightExpectation, shouldChangeEveryDarkToLight);
      it(shouldChangeEveryLightToDarkExpectation, shouldChangeEveryLightToDark);
    });
  });

  describe('onScroll method', () => {
    const shouldSwitchToLightExpectation = 'should switch state to light';
    const shouldSwitchToLight = () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      headerComponent.headerState = headerStateDark;
      headerComponent.onScroll({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be light')
        .toBe(headerStateLight);
    };
    const shouldSwitchToDarkExpectation = 'should switch state to dark';
    const shouldSwitchToDark = () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      headerComponent.headerState = headerStateLight;
      headerComponent.onScroll({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark')
        .toBe(headerStateDark);
    };
    const shouldCallUpdateHeaderWhenSwitchingToLightExpectation =
      'should call updateHeader when switching state to light';
    const shouldCallUpdateHeaderWhenSwitchingToLight = () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      spyOn(headerComponent, 'updateHeader');
      headerComponent.headerState = headerStateDark;
      headerComponent.onScroll({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called')
        .toHaveBeenCalledTimes(1);
    };
    const shouldCallUpdateHeaderWhenSwitchingToDarkExpectation =
      'should call updateHeader when switching state to dark';
    const shouldCallUpdateHeaderWhenSwitchingToDark = () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      spyOn(headerComponent, 'updateHeader');
      headerComponent.headerState = headerStateLight;
      headerComponent.onScroll({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called')
        .toHaveBeenCalledTimes(1);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldSwitchToLightExpectation, shouldSwitchToLight);
      it(shouldSwitchToDarkExpectation, shouldSwitchToDark);
      it(
        shouldCallUpdateHeaderWhenSwitchingToLightExpectation,
        shouldCallUpdateHeaderWhenSwitchingToLight
      );
      it(
        shouldCallUpdateHeaderWhenSwitchingToDarkExpectation,
        shouldCallUpdateHeaderWhenSwitchingToDark
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldSwitchToLightExpectation, shouldSwitchToLight);
      it(shouldSwitchToDarkExpectation, shouldSwitchToDark);
      it(
        shouldCallUpdateHeaderWhenSwitchingToLightExpectation,
        shouldCallUpdateHeaderWhenSwitchingToLight
      );
      it(
        shouldCallUpdateHeaderWhenSwitchingToDarkExpectation,
        shouldCallUpdateHeaderWhenSwitchingToDark
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldSwitchToLightExpectation, shouldSwitchToLight);
      it(shouldSwitchToDarkExpectation, shouldSwitchToDark);
      it(
        shouldCallUpdateHeaderWhenSwitchingToLightExpectation,
        shouldCallUpdateHeaderWhenSwitchingToLight
      );
      it(
        shouldCallUpdateHeaderWhenSwitchingToDarkExpectation,
        shouldCallUpdateHeaderWhenSwitchingToDark
      );
    });
  });

  describe('languageChange method', () => {
    const shouldSwitchFromEngToFrExpectation =
      'should switch language from ENGLISH to FRENCH';
    const shouldSwitchFromEngToFr = () => {
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      headerComponent.languageChange();

      expect(languageServiceSpy.set)
        .withContext('set should have been called')
        .toHaveBeenCalledOnceWith(Languages.FRENCH);
    };
    const shouldSwitchFromFrtoEngExpectation =
      'should switch language from FRENCH to ENGLISH';
    const shouldSwitchFromFrtoEng = () => {
      languageServiceSpy.current.and.returnValue(Languages.FRENCH);

      headerComponent.languageChange();

      expect(languageServiceSpy.set)
        .withContext('set should have been called')
        .toHaveBeenCalledOnceWith(Languages.ENGLISH);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'set',
          'current',
        ]);
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldSwitchFromEngToFrExpectation, shouldSwitchFromEngToFr);
      it(shouldSwitchFromFrtoEngExpectation, shouldSwitchFromFrtoEng);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'set',
          'current',
        ]);
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldSwitchFromEngToFrExpectation, shouldSwitchFromEngToFr);
      it(shouldSwitchFromFrtoEngExpectation, shouldSwitchFromFrtoEng);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'set',
          'current',
        ]);
        DOMComputationServiceSpy = jasmine.createSpyObj(
          'DOMComputationService',
          ['getActualHeight']
        );
        DOMComputationServiceSpy.getActualHeight.and.returnValues(
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight,
          expectedActualHeight
        );
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'get',
          'getOtherLanguage',
        ]);
        textServiceSpy.get.and.returnValues(of(expectedName));
        textServiceSpy.getOtherLanguage.and.returnValues(
          of(expectedOtherLanguage)
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          ['isLoading'],
          []
        );
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: DOMComputationService,
              useValue: DOMComputationServiceSpy,
            },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldSwitchFromEngToFrExpectation, shouldSwitchFromEngToFr);
      it(shouldSwitchFromFrtoEngExpectation, shouldSwitchFromFrtoEng);
    });
  });
});
