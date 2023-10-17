import { BackToTopComponent } from './back-to-top.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { ElementRef } from '@angular/core';

describe('BackToTopComponent - unit', () => {
  let backToTopComponent: BackToTopComponent;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const backToTopAltSelector = 'back-to-top-alt';
  const expectedBackToTopAlt = 'this is a test';

  const visibleState = scriptVar.backToTopVisibleState;
  const invisibleState = scriptVar.backToTopInvisibleState;

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(backToTopComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(backToTopComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
      expect(backToTopComponent.trigger)
        .withContext('trigger should be set')
        .toBeGreaterThan(0);

      expect(backToTopComponent.iconOpacity)
        .withContext('iconOpacity should be set')
        .toBe('0');
      expect(backToTopComponent.iconPointerEvent)
        .withContext('iconPointerEvent should be set')
        .toBe('none');
      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be set')
        .toBe(invisibleState);
      backToTopComponent.altTxt.subscribe((s) => {
        expect(s).withContext('altTxt should be set').toBe('');
      });
      expect(backToTopComponent.preloaders)
        .withContext('preloaders should be set')
        .toEqual([Preloaders.MAIN]);
    };

    const shouldSubscribeToVisibleToLoadTextServiceExpectation =
      'should subscribe to the visibleToLoadTextService';
    const shouldSubscribeToVisibleToLoadTextService = (done: DoneFn) => {
      setTimeout(() => {
        expect(visibleToLoadTextServiceSpy.subscribe)
          .withContext('subscribe should have been called')
          .toHaveBeenCalledOnceWith(backToTopComponent);
        done();
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
  });

  describe('updateTexts', () => {
    const shouldCallTextServiceExpectation = 'should call the textService';
    const shouldCallTextService = () => {
      backToTopComponent.updateTexts();

      expect(textServiceSpy.get)
        .withContext('get should have been called one time')
        .toHaveBeenCalledTimes(1);
      expect(textServiceSpy.get)
        .withContext('get should have been called with the correct arguments')
        .toHaveBeenCalledWith(backToTopAltSelector);
    };
    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
      backToTopComponent.updateTexts();

      const actualAltObs = backToTopComponent.altTxt;

      actualAltObs.subscribe((s) => {
        expect(s)
          .withContext('altTxt should be set')
          .toBe(expectedBackToTopAlt);
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
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
      backToTopComponent.ngOnDestroy();
      expect(visibleToLoadTextServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(backToTopComponent);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
  });

  describe('onScroll method', () => {
    const shouldCallUpdateFromInvisibleToVisibleExpectation =
      'should call updateAfterLoaded method from invisible to visible';
    const shouldCallUpdateFromInvisibleToVisible = () => {
      expect(backToTopComponent.backToTopState)
        .withContext('altTxt should be set')
        .toBe(invisibleState);
      spyOn(backToTopComponent, 'updateBackToTop');

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.updateBackToTop)
        .withContext('updateBackToTop should have been called')
        .toHaveBeenCalledTimes(1);
    };

    const shouldCallUpdateFromVisibleToInvisibleExpectation =
      'should call updateAfterLoaded method from visible to invisible';
    const shouldCallUpdateFromVisibleToInvisible = () => {
      spyOn(backToTopComponent, 'updateBackToTop');

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.updateBackToTop)
        .withContext('updateBackToTop should have been called - 1')
        .toHaveBeenCalledTimes(1);

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.updateBackToTop)
        .withContext('updateBackToTop should have been called - 2')
        .toHaveBeenCalledTimes(2);
    };

    const shouldChangeFromInvisibleToVisibleExpectation =
      'should change from invisible to visible';
    const shouldChangeFromInvisibleToVisible = () => {
      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be invisible')
        .toBe(invisibleState);
      spyOn(backToTopComponent, 'updateBackToTop');

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be visible')
        .toBe(visibleState);
    };

    const shouldChangeFromVisibleToInvisibleExpectation =
      'should change from visible to invisible';
    const shouldChangeFromVisibleToInvisible = () => {
      spyOn(backToTopComponent, 'updateBackToTop');

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be visible')
        .toBe(visibleState);

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be invisible')
        .toBe(invisibleState);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldCallUpdateFromInvisibleToVisibleExpectation,
        shouldCallUpdateFromInvisibleToVisible
      );
      it(
        shouldCallUpdateFromVisibleToInvisibleExpectation,
        shouldCallUpdateFromVisibleToInvisible
      );
      it(
        shouldChangeFromInvisibleToVisibleExpectation,
        shouldChangeFromInvisibleToVisible
      );
      it(
        shouldChangeFromVisibleToInvisibleExpectation,
        shouldChangeFromVisibleToInvisible
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldCallUpdateFromInvisibleToVisibleExpectation,
        shouldCallUpdateFromInvisibleToVisible
      );
      it(
        shouldCallUpdateFromVisibleToInvisibleExpectation,
        shouldCallUpdateFromVisibleToInvisible
      );
      it(
        shouldChangeFromInvisibleToVisibleExpectation,
        shouldChangeFromInvisibleToVisible
      );
      it(
        shouldChangeFromVisibleToInvisibleExpectation,
        shouldChangeFromVisibleToInvisible
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldCallUpdateFromInvisibleToVisibleExpectation,
        shouldCallUpdateFromInvisibleToVisible
      );
      it(
        shouldCallUpdateFromVisibleToInvisibleExpectation,
        shouldCallUpdateFromVisibleToInvisible
      );
      it(
        shouldChangeFromInvisibleToVisibleExpectation,
        shouldChangeFromInvisibleToVisible
      );
      it(
        shouldChangeFromVisibleToInvisibleExpectation,
        shouldChangeFromVisibleToInvisible
      );
    });
  });

  describe('onClick method', () => {
    const shouldPreventDefaultBehaviourExpectation =
      'should prevent default behaviour of the link';
    const shouldPreventDefaultBehaviour = () => {
      const eventSpy: jasmine.SpyObj<Event> = jasmine.createSpyObj('Event', [
        'preventDefault',
      ]);

      backToTopComponent.onClick(eventSpy);

      expect(eventSpy.preventDefault)
        .withContext('preventDefault should have been called')
        .toHaveBeenCalledOnceWith();
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldPreventDefaultBehaviourExpectation,
        shouldPreventDefaultBehaviour
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldPreventDefaultBehaviourExpectation,
        shouldPreventDefaultBehaviour
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldPreventDefaultBehaviourExpectation,
        shouldPreventDefaultBehaviour
      );
    });
  });

  describe('updateBackToTop', () => {
    const shouldSetIconOpacityWhenInvisibleExpectation =
      'set icon opacity when invisible';
    const shouldSetIconOpacityWhenInvisible = () => {
      const expected = '0';

      backToTopComponent.backToTopState = invisibleState;
      backToTopComponent.updateBackToTop();

      const actual = backToTopComponent.iconOpacity;

      expect(actual).withContext('opacity should be set').toBe(expected);
    };
    const shouldSetPointerEventWhenInvisibleExpectation =
      'set pointer event when invisible';
    const shouldSetPointerEventWhenInvisible = () => {
      const expected = 'none';

      backToTopComponent.backToTopState = invisibleState;
      backToTopComponent.updateBackToTop();

      const actual = backToTopComponent.iconPointerEvent;

      expect(actual).withContext('pointer event should be set').toBe(expected);
    };
    const shouldSetIconOpacityWhenVisibleExpectation =
      'set icon opacity when visible';
    const shouldSetIconOpacityWhenVisible = () => {
      const expected = '1';

      backToTopComponent.backToTopState = visibleState;
      backToTopComponent.updateBackToTop();

      const actual = backToTopComponent.iconOpacity;

      expect(actual).withContext('opacity should be set').toBe(expected);
    };
    const shouldSetPointerEventWhenVisibleExpectation =
      'set pointer event when visible';
    const shouldSetPointerEventWhenVisible = () => {
      const expected = 'all';

      backToTopComponent.backToTopState = visibleState;
      backToTopComponent.updateBackToTop();

      const actual = backToTopComponent.iconPointerEvent;

      expect(actual).withContext('pointer event should be set').toBe(expected);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldSetIconOpacityWhenInvisibleExpectation,
        shouldSetIconOpacityWhenInvisible
      );
      it(
        shouldSetPointerEventWhenInvisibleExpectation,
        shouldSetPointerEventWhenInvisible
      );
      it(
        shouldSetIconOpacityWhenVisibleExpectation,
        shouldSetIconOpacityWhenVisible
      );
      it(
        shouldSetPointerEventWhenVisibleExpectation,
        shouldSetPointerEventWhenVisible
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldSetIconOpacityWhenInvisibleExpectation,
        shouldSetIconOpacityWhenInvisible
      );
      it(
        shouldSetPointerEventWhenInvisibleExpectation,
        shouldSetPointerEventWhenInvisible
      );
      it(
        shouldSetIconOpacityWhenVisibleExpectation,
        shouldSetIconOpacityWhenVisible
      );
      it(
        shouldSetPointerEventWhenVisibleExpectation,
        shouldSetPointerEventWhenVisible
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
        textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldSetIconOpacityWhenInvisibleExpectation,
        shouldSetIconOpacityWhenInvisible
      );
      it(
        shouldSetPointerEventWhenInvisibleExpectation,
        shouldSetPointerEventWhenInvisible
      );
      it(
        shouldSetIconOpacityWhenVisibleExpectation,
        shouldSetIconOpacityWhenVisible
      );
      it(
        shouldSetPointerEventWhenVisibleExpectation,
        shouldSetPointerEventWhenVisible
      );
    });
  });

  describe('getElement', () => {
    const shouldReturnElementExpectation = 'should return the element';
    const shouldReturnElement = () => {
      const expected = new ElementRef(document.createElement('a'));
      backToTopComponent.mainA = expected;

      const actual = backToTopComponent.getElement();

      expect(actual).toEqual(jasmine.anything());
      expect(actual).toEqual(expected);
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
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
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
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
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
            BackToTopComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
  });
});
