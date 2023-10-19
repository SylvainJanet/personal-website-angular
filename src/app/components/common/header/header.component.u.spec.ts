import { TestBed } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { HeaderComponent } from './header.component';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { of } from 'rxjs';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { ElementRef } from '@angular/core';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { IEnvironment } from 'src/environments/interface/ienvironment';

describe('HeaderComponent - unit', () => {
  let component: HeaderComponent;
  let DOMComputationServiceSpy: jasmine.SpyObj<DOMComputationService>;
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
  const expectedActualHeight = 18;

  const headerStateLight = scriptVar.headerStateLight;
  const headerStateDark = scriptVar.headerStateDark;

  const cssDarkClass = scriptVar.cssHeaderDarkClass;
  const cssLightClass = scriptVar.cssHeaderLightClass;
  const cssContentDarkClass = scriptVar.cssHeaderContentDarkClass;
  const cssContentLightClass = scriptVar.cssHeaderContentLightClass;

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = (env: IEnvironment) => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
      expect(component.logger)
        .withContext('logger should be set')
        .toBe(logServiceSpy);

      expect(component.trigger).withContext('trigger should be set').toBe(0);
      expect(component.headerState)
        .withContext('headerState should be set')
        .toBe('');
      component.myName.subscribe((s) => {
        expect(s).withContext('myName should be set').toBe('');
      });
      expect(component.loaderTexts)
        .withContext('loaderTexts should be set')
        .toBe(Preloaders.TEXTS);
      expect(component.showModal)
        .withContext('showModal should be set')
        .toBeFalse();
      component.textIcon.subscribe((s) => {
        expect(s)
          .withContext('textIcon should be set')
          .toBe('\xa0 \xa0 🌐 \xa0 \xa0');
      });
      expect(component.website)
        .withContext('website should be set')
        .toBe(env.website);
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
          .toHaveBeenCalledOnceWith(component);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, () =>
        shouldSetDefaultValues(devEnv)
      );
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, () =>
        shouldSetDefaultValues(stagingEnv)
      );
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, () =>
        shouldSetDefaultValues(prodEnv)
      );
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
      component.updateTexts();

      expect(textServiceSpy.get)
        .withContext('get should have been called')
        .toHaveBeenCalledTimes(1);
      expect(textServiceSpy.get)
        .withContext('get should have been called with the proper arguments')
        .toHaveBeenCalledWith(myNameSelector);
    };
    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
      component.updateTexts();

      const actualMyNameObs = component.myName;

      actualMyNameObs.subscribe((s) => {
        expect(s).withContext('myName should be set').toBe(expectedName);
      });
    };

    const shouldCallVisibleToLoadTextServiceExpectation =
      'should call the visibleToLoadTextService';
    const shouldCallVisibleToLoadTextService = () => {
      component.updateTexts();

      expect(visibleToLoadTextServiceSpy.textLoaded)
        .withContext('should call the service')
        .toHaveBeenCalledOnceWith(component);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
  });

  describe('ngOnDestroy', () => {
    const shouldUnsubscribeExpectation =
      'should unsubscribe from the visibleToLoadTextService';
    const shouldUnsubscribe = () => {
      component.ngOnDestroy();
      expect(visibleToLoadTextServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(component);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
  });

  describe('onResize method', () => {
    const shouldCallUpdateTriggerExpectation =
      'should call updateTrigger method';
    const shouldCallUpdateTrigger = () => {
      spyOn(component, 'updateTrigger');
      const eventInput = {
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event;

      component.onResize(eventInput);

      expect(component.updateTrigger)
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldCallUpdateTriggerExpectation, shouldCallUpdateTrigger);
    });
  });

  describe('ngOnInit method', () => {
    const shouldCallUpdateTriggerExpectation =
      'should call updateTrigger method';
    const shouldCallUpdateTrigger = () => {
      spyOn(component, 'updateTrigger');

      component.ngOnInit();

      expect(component.updateTrigger)
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldCallUpdateTriggerExpectation, shouldCallUpdateTrigger);
    });
  });

  describe('updateTrigger method', () => {
    const shouldSetTriggerExpectation =
      'should set trigger to the height of the banner';
    const shouldSetTrigger = () => {
      component.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      const actualTrigger = component.trigger;

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
      component.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      expect(component.headerState)
        .withContext('headerState should be dark initially')
        .toBe(headerStateDark);

      // trigger is now set

      component.updateTrigger({
        currentTarget: { scrollY: component.trigger + 1 } as Window,
      } as unknown as Event);

      expect(component.headerState)
        .withContext('headerState should be light')
        .toBe(headerStateLight);

      // state is now light

      component.updateTrigger({
        currentTarget: { scrollY: component.trigger - 1 } as Window,
      } as unknown as Event);

      expect(component.headerState)
        .withContext('headerState should be dark')
        .toBe(headerStateDark);
    };

    const shouldSwitchFromDarkToLightExpectation =
      'should switch header state from dark to light when appropriate';
    const shouldSwitchFromDarkToLight = () => {
      component.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      expect(component.headerState)
        .withContext('headerState should be dark after an update')
        .toBe(headerStateDark);

      // trigger is now set

      component.updateTrigger({
        currentTarget: { scrollY: component.trigger + 1 } as Window,
      } as unknown as Event);

      expect(component.headerState)
        .withContext('headerState should be light')
        .toBe(headerStateLight);

      // state is now light

      component.updateTrigger({
        currentTarget: { scrollY: component.trigger - 1 } as Window,
      } as unknown as Event);

      expect(component.headerState)
        .withContext('headerState should be dark')
        .toBe(headerStateDark);
    };

    const shouldCallUpdateHeaderExpectation =
      'should call updateHeader when there is a change';
    const shouldCallUpdateHeader = () => {
      spyOn(component, 'updateHeader');
      component.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      expect(component.updateHeader)
        .withContext('updateHeader should have been called 1 time')
        .toHaveBeenCalledTimes(1);

      // trigger is now set

      component.updateTrigger({
        currentTarget: { scrollY: component.trigger + 1 } as Window,
      } as unknown as Event);

      expect(component.updateHeader)
        .withContext('updateHeader should have been called 2 times')
        .toHaveBeenCalledTimes(2);

      // state is now light

      component.updateTrigger({
        currentTarget: { scrollY: component.trigger - 1 } as Window,
      } as unknown as Event);

      expect(component.updateHeader)
        .withContext('updateHeader should have been called 3 times')
        .toHaveBeenCalledTimes(3);

      // state has not changed

      component.updateTrigger({
        currentTarget: { scrollY: component.trigger - 2 } as Window,
      } as unknown as Event);

      expect(component.updateHeader)
        .withContext('updateHeader should have been called 3 times')
        .toHaveBeenCalledTimes(3);
    };

    const constShouldDoNothingIfNoTargetExpectation =
      'should do nothing if the event has no currentTarget';
    const constShouldDoNothingIfNoTarget = () => {
      component.updateTrigger({
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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

      component.changeEveryClass(oldClass, newClass);

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

      component.changeEveryClass(oldClass, newClass);

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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
      spyOn(component, 'changeEveryClass');
      component.headerState = 'light';

      component.updateHeader();

      expect(component.changeEveryClass)
        .withContext('changeEveryClass should have been called 2 times')
        .toHaveBeenCalledTimes(2);
      expect(component.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(cssDarkClass, cssLightClass);
      expect(component.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(cssContentDarkClass, cssContentLightClass);
    };
    const shouldChangeEveryLightToDarkExpectation =
      'should change every light class to dark class when appropriate';
    const shouldChangeEveryLightToDark = () => {
      spyOn(component, 'changeEveryClass');
      component.headerState = 'dark';

      component.updateHeader();

      expect(component.changeEveryClass)
        .withContext('changeEveryClass should have been called 2 times')
        .toHaveBeenCalledTimes(2);
      expect(component.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(cssLightClass, cssDarkClass);
      expect(component.changeEveryClass)
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeEveryDarkToLightExpectation, shouldChangeEveryDarkToLight);
      it(shouldChangeEveryLightToDarkExpectation, shouldChangeEveryLightToDark);
    });
  });

  describe('onScroll method', () => {
    const shouldSwitchToLightExpectation = 'should switch state to light';
    const shouldSwitchToLight = () => {
      component.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      component.headerState = headerStateDark;
      component.onScroll({
        currentTarget: { scrollY: component.trigger + 1 } as Window,
      } as unknown as Event);

      expect(component.headerState)
        .withContext('headerState should be light')
        .toBe(headerStateLight);
    };
    const shouldSwitchToDarkExpectation = 'should switch state to dark';
    const shouldSwitchToDark = () => {
      component.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      component.headerState = headerStateLight;
      component.onScroll({
        currentTarget: { scrollY: component.trigger - 1 } as Window,
      } as unknown as Event);

      expect(component.headerState)
        .withContext('headerState should be dark')
        .toBe(headerStateDark);
    };
    const shouldCallUpdateHeaderWhenSwitchingToLightExpectation =
      'should call updateHeader when switching state to light';
    const shouldCallUpdateHeaderWhenSwitchingToLight = () => {
      component.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      spyOn(component, 'updateHeader');
      component.headerState = headerStateDark;
      component.onScroll({
        currentTarget: { scrollY: component.trigger + 1 } as Window,
      } as unknown as Event);

      expect(component.updateHeader)
        .withContext('updateHeader should have been called')
        .toHaveBeenCalledTimes(1);
    };
    const shouldCallUpdateHeaderWhenSwitchingToDarkExpectation =
      'should call updateHeader when switching state to dark';
    const shouldCallUpdateHeaderWhenSwitchingToDark = () => {
      component.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      spyOn(component, 'updateHeader');
      component.headerState = headerStateLight;
      component.onScroll({
        currentTarget: { scrollY: component.trigger - 1 } as Window,
      } as unknown as Event);

      expect(component.updateHeader)
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedName));
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

        component = TestBed.inject(HeaderComponent);
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

  describe('getElement method', () => {
    const shouldReturnElementExpectation = 'should return the element';
    const shouldReturnElement = () => {
      const expected = new ElementRef(document.createElement('div'));
      component.mainDiv = expected;

      const actual = component.getElement();

      expect(actual)
        .withContext('should return something')
        .toEqual(jasmine.anything());
      expect(actual).withContext('should return the element').toEqual(expected);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
  });

  describe('openModalButtonHeader method', () => {
    const shouldChangeClickedElExpectation =
      'should set clickedEl to the button in the uncollapsed header';
    const shouldChangeClickedEl = () => {
      const buttonDiv = document.createElement('div');

      const subDiv = document.createElement('div');
      const expected = document.createElement('div');
      subDiv.appendChild(expected);
      buttonDiv.appendChild(subDiv);

      component.buttonHeaderModal = new ElementRef(buttonDiv);

      expect(component.clickedEl)
        .withContext('should be undefined at first')
        .toBeUndefined();

      component.openModalButtonHeader();

      const actual = component.clickedEl;
      expect(actual).withContext('should be set').toEqual(expected);
    };
    const shouldShowModalExpectation = 'should set showModal to true';
    const shouldShowModal = () => {
      expect(component.showModal)
        .withContext('should be false at first')
        .toBeFalse();

      component.openModalButtonHeader();

      expect(component.showModal).withContext('should be set').toBeTrue();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeClickedElExpectation, shouldChangeClickedEl);
      it(shouldShowModalExpectation, shouldShowModal);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeClickedElExpectation, shouldChangeClickedEl);
      it(shouldShowModalExpectation, shouldShowModal);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeClickedElExpectation, shouldChangeClickedEl);
      it(shouldShowModalExpectation, shouldShowModal);
    });
  });

  describe('openModalButtonCollapsed method', () => {
    const shouldChangeClickedElExpectation =
      'should set clickedEl to the button in the collapsed header';
    const shouldChangeClickedEl = () => {
      const buttonDiv = document.createElement('div');

      const subDiv = document.createElement('div');
      const expected = document.createElement('div');
      subDiv.appendChild(expected);
      buttonDiv.appendChild(subDiv);

      component.buttonCollapsedModal = new ElementRef(buttonDiv);

      expect(component.clickedEl)
        .withContext('should be undefined at first')
        .toBeUndefined();

      component.openModalButtonCollapsed();

      const actual = component.clickedEl;
      expect(actual).withContext('should be set').toEqual(expected);
    };
    const shouldShowModalExpectation = 'should set showModal to true';
    const shouldShowModal = () => {
      expect(component.showModal)
        .withContext('should be false at first')
        .toBeFalse();

      component.openModalButtonHeader();

      expect(component.showModal).withContext('should be set').toBeTrue();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeClickedElExpectation, shouldChangeClickedEl);
      it(shouldShowModalExpectation, shouldShowModal);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeClickedElExpectation, shouldChangeClickedEl);
      it(shouldShowModalExpectation, shouldShowModal);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldChangeClickedElExpectation, shouldChangeClickedEl);
      it(shouldShowModalExpectation, shouldShowModal);
    });
  });

  describe('closeModal method', () => {
    const shouldSetShowModalExpectation = 'should set showModal to false';
    const shouldSetShowModal = () => {
      component.showModal = true;

      component.closeModal();

      const actual = component.showModal;

      expect(actual).withContext('should be set to false').toBeFalse();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldSetShowModalExpectation, shouldSetShowModal);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldSetShowModalExpectation, shouldSetShowModal);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(HeaderComponent);
      });
      it(shouldSetShowModalExpectation, shouldSetShowModal);
    });
  });
});
