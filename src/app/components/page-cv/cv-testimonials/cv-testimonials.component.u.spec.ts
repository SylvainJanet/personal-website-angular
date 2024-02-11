import {
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { CvTestimonialsComponent } from './cv-testimonials.component';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { ElementRef } from '@angular/core';
import { of } from 'rxjs';

describe('CvTestimonialsComponent - unit', () => {
  let component: CvTestimonialsComponent;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(component.doubleImgDisplay)
        .withContext('doubleImgDisplay should be set')
        .toBe('block');
      expect(component.preloaders)
        .withContext('preloaders should be set')
        .toEqual([Preloaders.MAIN]);
      expect(component.interacted)
        .withContext('interacted should be set')
        .toBeFalse();
      expect(component.isWaitingForNoInteraction)
        .withContext('isWaitingForNoInteraction should be set')
        .toBeFalse();
      expect(component.namesSelectors)
        .withContext('namesSelectors should be set')
        .toEqual([
          'testimonial-0-name',
          'testimonial-1-name',
          'testimonial-2-name',
          'testimonial-3-name',
          'testimonial-4-name',
          'testimonial-5-name',
          'testimonial-6-name',
          'testimonial-7-name',
          'testimonial-8-name',
          'testimonial-9-name',
        ]);
      expect(component.actualNames)
        .withContext('actualNames should be set')
        .toEqual(['', '', '', '', '', '', '', '', '', '']);
      expect(component.commentsSelectors)
        .withContext('commentsSelectors should be set')
        .toEqual([
          'testimonial-0-comment',
          'testimonial-1-comment',
          'testimonial-2-comment',
          'testimonial-3-comment',
          'testimonial-4-comment',
          'testimonial-5-comment',
          'testimonial-6-comment',
          'testimonial-7-comment',
          'testimonial-8-comment',
          'testimonial-9-comment',
        ]);
      expect(component.actualComments)
        .withContext('actualComments should be set')
        .toEqual(['', '', '', '', '', '', '', '', '', '']);
      expect(component.grades)
        .withContext('grades should be set')
        .toEqual([4.67, 5, 5, 5, 4.67, 4.67, 5, 5, 5, 5]);
      expect(component.dates)
        .withContext('dates should be set')
        .toEqual([
          new Date(2022, 0, 12),
          new Date(2022, 10, 25),
          new Date(2022, 4, 6),
          new Date(2022, 10, 4),
          new Date(2022, 2, 11),
          new Date(2022, 5, 10),
          new Date(2022, 10, 25),
          new Date(2022, 5, 1),
          new Date(2022, 10, 4),
          new Date(2022, 5, 9),
        ]);
      expect(component.coursesSelectors)
        .withContext('coursesSelectors should be set')
        .toEqual([
          'testimonial-0-course',
          'testimonial-1-course',
          'testimonial-2-course',
          'testimonial-3-course',
          'testimonial-4-course',
          'testimonial-5-course',
          'testimonial-6-course',
          'testimonial-7-course',
          'testimonial-8-course',
          'testimonial-9-course',
        ]);
      expect(component.actualCourses)
        .withContext('actualCourses should be set')
        .toEqual(['', '', '', '', '', '', '', '', '', '']);
      expect(component.indexQueried)
        .withContext('indexQueried should be set')
        .toEqual([]);
      expect(component.currentIndex)
        .withContext('currentIndex should be set')
        .toBe(0);
      expect(component.nbrOfTestimonials)
        .withContext('nbrOfTestimonials should be set')
        .toBe(10);
      expect(component.name).withContext('name should be set').toBe('');
      expect(component.comment).withContext('comment should be set').toBe('');
      expect(component.grade).withContext('grade should be set').toBe(5);
      expect(component.date)
        .withContext('date should be set')
        .toBeCloseTo(new Date().getTime(), -2);
      expect(component.course).withContext('course should be set').toBe('');
      expect(component.opacity).withContext('opacity should be set').toBe(1);
      expect(component.goTroughInterval)
        .withContext('goTroughInterval should be set')
        .toBeDefined();
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
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
  });

  describe('go through behaviour', () => {
    let nextSpy: jasmine.Spy;
    const actualNext = CvTestimonialsComponent.prototype.next;
    const timeInterval = 7500;

    const shouldGoToNextExpectation = 'should go to next';
    const shouldGoToNext = () => {
      component = TestBed.inject(CvTestimonialsComponent);

      tick(timeInterval - 1);
      expect(nextSpy)
        .withContext('should not go next for some time at first')
        .not.toHaveBeenCalled();

      tick(2);
      expect(nextSpy)
        .withContext('should have been called after the time interval')
        .toHaveBeenCalledTimes(1);

      tick(timeInterval - 2);
      expect(nextSpy)
        .withContext('should not have been called again for some time')
        .toHaveBeenCalledTimes(1);

      tick(2);
      expect(nextSpy)
        .withContext(
          'should have been called yet again after two time intervals'
        )
        .toHaveBeenCalledTimes(2);
      discardPeriodicTasks();
    };
    const shouldNotGoToNextWhenInteractedExpectation =
      'should not go to next when interacted';
    const shouldNotGoToNextWhenInteracted = () => {
      component = TestBed.inject(CvTestimonialsComponent);

      tick(timeInterval - 1);
      expect(nextSpy)
        .withContext('should not go next for some time at first')
        .not.toHaveBeenCalled();

      tick(2);
      expect(nextSpy)
        .withContext('should have been called after the time interval')
        .toHaveBeenCalledTimes(1);

      tick(timeInterval - 2);
      expect(nextSpy)
        .withContext('should not have been called again for some time')
        .toHaveBeenCalledTimes(1);

      component.interacted = true;

      tick(2);
      expect(nextSpy)
        .withContext(
          'should not have been called yet again after being interacted with and after two time intervals'
        )
        .toHaveBeenCalledTimes(1);
      discardPeriodicTasks();
    };

    const shouldGoToNextAfterInteractionThenNoInteractionExpectation =
      'should go to next after interacted and then not interacted for some time';
    const shouldGoToNextAfterInteractionThenNoInteraction = () => {
      component = TestBed.inject(CvTestimonialsComponent);

      tick(timeInterval - 1);
      expect(nextSpy)
        .withContext('should not go next for some time at first')
        .not.toHaveBeenCalled();

      component.interacted = true;
      expect(component.isWaitingForNoInteraction)
        .withContext('isWaitingForNoInteraction should be false at first')
        .toBeFalse();

      tick(2);
      expect(nextSpy)
        .withContext(
          'should not have been called after being interacted with and after the time interval'
        )
        .not.toHaveBeenCalled();
      expect(component.interacted)
        .withContext('interacted should be false')
        .toBeFalse();
      expect(component.isWaitingForNoInteraction)
        .withContext('isWaitingForNoInteraction should be true')
        .toBeTrue();

      tick(timeInterval - 2);
      expect(nextSpy)
        .withContext('should not have been called again for some time')
        .not.toHaveBeenCalled();

      tick(2);
      expect(nextSpy)
        .withContext(
          'should not have been called while waiting for no interactions'
        )
        .not.toHaveBeenCalled();
      expect(component.interacted)
        .withContext('interacted should be false - 2')
        .toBeFalse();
      expect(component.isWaitingForNoInteraction)
        .withContext('isWaitingForNoInteraction should be false')
        .toBeFalse();

      tick(timeInterval - 2);
      expect(nextSpy)
        .withContext('should not have been called again for some time - 2')
        .not.toHaveBeenCalled();

      tick(2);
      expect(nextSpy)
        .withContext(
          'should have been called after being interacted with and then not interacted with for some time'
        )
        .toHaveBeenCalledTimes(1);

      discardPeriodicTasks();
    };

    const interactingYetAgainShouldResetTimeToWaitExpectation =
      'interacting yet again with the component should essentially reset the time to wait for no interaction';
    const interactingYetAgainShouldResetTimeToWait = () => {
      component = TestBed.inject(CvTestimonialsComponent);

      tick(timeInterval - 1);
      expect(nextSpy)
        .withContext('should not go next for some time at first')
        .not.toHaveBeenCalled();

      component.interacted = true;
      expect(component.isWaitingForNoInteraction)
        .withContext('isWaitingForNoInteraction should be false at first')
        .toBeFalse();

      tick(2);
      expect(nextSpy)
        .withContext(
          'should not have been called after being interacted with and after the time interval - 2'
        )
        .not.toHaveBeenCalled();
      expect(component.interacted)
        .withContext('interacted should be false')
        .toBeFalse();
      expect(component.isWaitingForNoInteraction)
        .withContext('isWaitingForNoInteraction should be true')
        .toBeTrue();

      component.interacted = true;

      tick(timeInterval - 2);
      expect(nextSpy)
        .withContext('should not have been called again for some time')
        .not.toHaveBeenCalled();

      tick(2);
      expect(nextSpy)
        .withContext(
          'should not have been called while waiting for no interactions'
        )
        .not.toHaveBeenCalled();
      expect(component.interacted)
        .withContext('interacted should be false - 2')
        .toBeFalse();
      expect(component.isWaitingForNoInteraction)
        .withContext('isWaitingForNoInteraction should be true - 2')
        .toBeTrue();

      tick(timeInterval - 2);
      expect(nextSpy)
        .withContext('should not have been called again for some time - 2')
        .not.toHaveBeenCalled();

      tick(2);
      expect(nextSpy)
        .withContext(
          'should not have been called while waiting for no interactions'
        )
        .not.toHaveBeenCalled();
      expect(component.interacted)
        .withContext('interacted should be false - 3')
        .toBeFalse();
      expect(component.isWaitingForNoInteraction)
        .withContext('isWaitingForNoInteraction should be false')
        .toBeFalse();

      tick(timeInterval - 2);
      expect(nextSpy)
        .withContext('should not have been called again for some time - 3')
        .not.toHaveBeenCalled();

      tick(2);
      expect(nextSpy)
        .withContext(
          'should have been called after being interacted with and then not interacted with for some time'
        )
        .toHaveBeenCalledTimes(1);
      discardPeriodicTasks();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        nextSpy = jasmine.createSpy('spy');
        CvTestimonialsComponent.prototype.next = nextSpy;

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
      });
      afterEach(() => {
        CvTestimonialsComponent.prototype.next = actualNext;
      });
      it(shouldGoToNextExpectation, fakeAsync(shouldGoToNext));
      it(
        shouldNotGoToNextWhenInteractedExpectation,
        fakeAsync(shouldNotGoToNextWhenInteracted)
      );
      it(
        shouldGoToNextAfterInteractionThenNoInteractionExpectation,
        fakeAsync(shouldGoToNextAfterInteractionThenNoInteraction)
      );
      it(
        interactingYetAgainShouldResetTimeToWaitExpectation,
        fakeAsync(interactingYetAgainShouldResetTimeToWait)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        nextSpy = jasmine.createSpy('spy');
        CvTestimonialsComponent.prototype.next = nextSpy;

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
      });
      afterEach(() => {
        CvTestimonialsComponent.prototype.next = actualNext;
      });
      it(shouldGoToNextExpectation, fakeAsync(shouldGoToNext));
      it(
        shouldNotGoToNextWhenInteractedExpectation,
        fakeAsync(shouldNotGoToNextWhenInteracted)
      );
      it(
        shouldGoToNextAfterInteractionThenNoInteractionExpectation,
        fakeAsync(shouldGoToNextAfterInteractionThenNoInteraction)
      );
      it(
        interactingYetAgainShouldResetTimeToWaitExpectation,
        fakeAsync(interactingYetAgainShouldResetTimeToWait)
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        nextSpy = jasmine.createSpy('spy');
        CvTestimonialsComponent.prototype.next = nextSpy;

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
      });
      afterEach(() => {
        CvTestimonialsComponent.prototype.next = actualNext;
      });
      it(shouldGoToNextExpectation, fakeAsync(shouldGoToNext));
      it(
        shouldNotGoToNextWhenInteractedExpectation,
        fakeAsync(shouldNotGoToNextWhenInteracted)
      );
      it(
        shouldGoToNextAfterInteractionThenNoInteractionExpectation,
        fakeAsync(shouldGoToNextAfterInteractionThenNoInteraction)
      );
      it(
        interactingYetAgainShouldResetTimeToWaitExpectation,
        fakeAsync(interactingYetAgainShouldResetTimeToWait)
      );
    });
  });

  describe('onDoubleImgLoad method', () => {
    const shouldSetDoubleImgDisplayToNoneExpectation =
      "should set doubleImgDisplay to 'none'";
    const shouldSetDoubleImgDisplayToNone = () => {
      component.onDoubleImgLoad();

      expect(component.doubleImgDisplay)
        .withContext("doubleImgDisplay should be 'none'")
        .toBe('none');
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(
        shouldSetDoubleImgDisplayToNoneExpectation,
        shouldSetDoubleImgDisplayToNone
      );
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(
        shouldSetDoubleImgDisplayToNoneExpectation,
        shouldSetDoubleImgDisplayToNone
      );
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(
        shouldSetDoubleImgDisplayToNoneExpectation,
        shouldSetDoubleImgDisplayToNone
      );
    });
  });

  describe('onClickNext method', () => {
    const shouldSetInteractedToTrueExpectation =
      'should set interacted to true';
    const shouldSetInteractedToTrue = () => {
      spyOn(component, 'next');
      expect(component.interacted)
        .withContext('interacted should be false before')
        .toBeFalse();
      component.onClickNext();
      expect(component.interacted)
        .withContext('interacted should be true after')
        .toBeTrue();
    };
    const shouldCallNextExpectation = 'should call next';
    const shouldCallNext = () => {
      spyOn(component, 'next');
      component.onClickNext();

      expect(component.next)
        .withContext('next should have been called')
        .toHaveBeenCalledTimes(1);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetInteractedToTrueExpectation, shouldSetInteractedToTrue);
      it(shouldCallNextExpectation, shouldCallNext);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetInteractedToTrueExpectation, shouldSetInteractedToTrue);
      it(shouldCallNextExpectation, shouldCallNext);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetInteractedToTrueExpectation, shouldSetInteractedToTrue);
      it(shouldCallNextExpectation, shouldCallNext);
    });
  });

  describe('next method', () => {
    const shouldSetIndexToNextExpectation = 'should increment index';
    const shouldSetIndexToNext = () => {
      spyOn(component, 'onSlideChange');
      component.currentIndex = 0;

      component.next();
      expect(component.currentIndex)
        .withContext('current index should be incremented')
        .toBe(1);
    };
    const shouldSetIndexToFirstWhenAtLastPositionExpectation =
      'should set index to 0 when at last position';
    const shouldSetIndexToFirstWhenAtLastPosition = () => {
      spyOn(component, 'onSlideChange');
      component.currentIndex = component.nbrOfTestimonials - 1;

      component.next();
      expect(component.currentIndex)
        .withContext('current index should be set to 0')
        .toBe(0);
    };
    const shouldCallOnSlideChangeExpectation = 'should call onSlideChange';
    const shouldCallOnSlideChange = () => {
      spyOn(component, 'onSlideChange');
      component.next();

      expect(component.onSlideChange)
        .withContext('next should have been called')
        .toHaveBeenCalledTimes(1);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetIndexToNextExpectation, shouldSetIndexToNext);
      it(
        shouldSetIndexToFirstWhenAtLastPositionExpectation,
        shouldSetIndexToFirstWhenAtLastPosition
      );
      it(shouldCallOnSlideChangeExpectation, shouldCallOnSlideChange);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetIndexToNextExpectation, shouldSetIndexToNext);
      it(
        shouldSetIndexToFirstWhenAtLastPositionExpectation,
        shouldSetIndexToFirstWhenAtLastPosition
      );
      it(shouldCallOnSlideChangeExpectation, shouldCallOnSlideChange);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetIndexToNextExpectation, shouldSetIndexToNext);
      it(
        shouldSetIndexToFirstWhenAtLastPositionExpectation,
        shouldSetIndexToFirstWhenAtLastPosition
      );
      it(shouldCallOnSlideChangeExpectation, shouldCallOnSlideChange);
    });
  });

  describe('onClickPrev method', () => {
    const shouldSetInteractedToTrueExpectation =
      'should set interacted to true';
    const shouldSetInteractedToTrue = () => {
      spyOn(component, 'prev');
      expect(component.interacted)
        .withContext('interacted should be false before')
        .toBeFalse();
      component.onClickPrev();
      expect(component.interacted)
        .withContext('interacted should be true after')
        .toBeTrue();
    };
    const shouldCallPrevExpectation = 'should call prev';
    const shouldCallPrev = () => {
      spyOn(component, 'prev');
      component.onClickPrev();

      expect(component.prev)
        .withContext('prev should have been called')
        .toHaveBeenCalledTimes(1);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetInteractedToTrueExpectation, shouldSetInteractedToTrue);
      it(shouldCallPrevExpectation, shouldCallPrev);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetInteractedToTrueExpectation, shouldSetInteractedToTrue);
      it(shouldCallPrevExpectation, shouldCallPrev);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetInteractedToTrueExpectation, shouldSetInteractedToTrue);
      it(shouldCallPrevExpectation, shouldCallPrev);
    });
  });

  describe('prev method', () => {
    const shouldSetIndexToPreviousExpectation = 'should decrement index';
    const shouldSetIndexToPrevious = () => {
      spyOn(component, 'onSlideChange');
      component.currentIndex = 1;

      component.prev();
      expect(component.currentIndex)
        .withContext('current index should be decremented')
        .toBe(0);
    };
    const shouldSetIndexToLastWhenAtFirstPositionExpectation =
      'should set index to last position when at first position';
    const shouldSetIndexToLastWhenAtFirstPosition = () => {
      spyOn(component, 'onSlideChange');
      component.currentIndex = 0;

      component.prev();
      expect(component.currentIndex)
        .withContext('current index should be set to last')
        .toBe(component.nbrOfTestimonials - 1);
    };
    const shouldCallOnSlideChangeExpectation =
      'should call shouldCallOnSlideChange';
    const shouldCallOnSlideChange = () => {
      spyOn(component, 'onSlideChange');
      component.prev();

      expect(component.onSlideChange)
        .withContext('next should have been called')
        .toHaveBeenCalledTimes(1);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetIndexToPreviousExpectation, shouldSetIndexToPrevious);
      it(
        shouldSetIndexToLastWhenAtFirstPositionExpectation,
        shouldSetIndexToLastWhenAtFirstPosition
      );
      it(shouldCallOnSlideChangeExpectation, shouldCallOnSlideChange);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetIndexToPreviousExpectation, shouldSetIndexToPrevious);
      it(
        shouldSetIndexToLastWhenAtFirstPositionExpectation,
        shouldSetIndexToLastWhenAtFirstPosition
      );
      it(shouldCallOnSlideChangeExpectation, shouldCallOnSlideChange);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetIndexToPreviousExpectation, shouldSetIndexToPrevious);
      it(
        shouldSetIndexToLastWhenAtFirstPositionExpectation,
        shouldSetIndexToLastWhenAtFirstPosition
      );
      it(shouldCallOnSlideChangeExpectation, shouldCallOnSlideChange);
    });
  });

  describe('onSlideChange method', () => {
    const transitionTime = 200;

    const shouldSetOpacityToZeroExpectation = 'should set opacity to zero';
    const shouldSetOpacityToZero = () => {
      component.opacity = 1;

      component.onSlideChange();

      expect(component.opacity)
        .withContext('opacity should be set to 0')
        .toBe(0);
    };

    const shouldCallQueryTextsForNewIndexesExpectation =
      'should call queryTexts for new indexes';
    const shouldCallQueryTextsForNewIndexes = () => {
      component.indexQueried = [];
      component.currentIndex = 0;

      component.onSlideChange();

      expect(component.queryTexts)
        .withContext('queryTexts should have been called')
        .toHaveBeenCalledTimes(1);
    };

    const shouldNotCallQueryTextsForQueriedIndexesExpectation =
      'should not call queryTexts for queried indexes';
    const shouldNotCallQueryTextsForQueriedIndexes = () => {
      component.indexQueried = [0, 1, 2, 3];
      component.currentIndex = 2;

      component.onSlideChange();

      expect(component.queryTexts)
        .withContext('queryTexts should not have been called')
        .not.toHaveBeenCalled();
    };

    const shouldSetValuesForQueriedIndexesExpectation =
      'should set the previously loaded value for queried indexes';
    const shouldSetValuesForQueriedIndexes = () => {
      component.indexQueried = [0, 1, 2];
      component.currentIndex = 1;

      component.actualNames = ['test-name-1', 'test-name-2', 'test-name-3'];
      component.actualComments = [
        'test-comment-1',
        'test-comment-2',
        'test-comment-3',
      ];
      component.actualCourses = [
        'test-course-1',
        'test-course-2',
        'test-course-3',
      ];

      component.onSlideChange();

      expect(component.name).withContext('name should be set').toBe('');
      expect(component.comment).withContext('comment should be set').toBe('');
      expect(component.grade).withContext('grade should be set').toBe(5);
      expect(component.date)
        .withContext('date should be set')
        .toBeCloseTo(new Date().getTime(), -2);
      expect(component.course).withContext('course should be set').toBe('');

      tick(transitionTime);

      expect(component.name)
        .withContext('name should be set after')
        .toBe('test-name-2');
      expect(component.comment)
        .withContext('comment should be set after')
        .toBe('test-comment-2');
      expect(component.grade)
        .withContext('grade should be set after')
        .toBe(component.grades[1]);
      expect(component.date)
        .withContext('date should be set after')
        .toBe(component.dates[1]);
      expect(component.course)
        .withContext('course should be set after')
        .toBe('test-course-2');
      flush();
    };

    const shouldSetOpacityToOneForQueriedIndexesExpectation =
      'should set the opacity to 1 after the transition time for queried indexes';
    const shouldSetOpacityToOneForQueriedIndexes = () => {
      component.indexQueried = [0, 1, 2];
      component.currentIndex = 1;

      component.actualNames = ['test-name-1', 'test-name-2', 'test-name-3'];
      component.actualComments = [
        'test-comment-1',
        'test-comment-2',
        'test-comment-3',
      ];
      component.actualCourses = [
        'test-course-1',
        'test-course-2',
        'test-course-3',
      ];

      component.onSlideChange();

      expect(component.opacity).withContext('opacity should be set').toBe(0);

      tick(transitionTime);

      expect(component.opacity)
        .withContext('opacity should be set after')
        .toBe(1);
      flush();
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(CvTestimonialsComponent);
        spyOn(component, 'queryTexts');
      });
      it(shouldSetOpacityToZeroExpectation, shouldSetOpacityToZero);
      it(
        shouldCallQueryTextsForNewIndexesExpectation,
        shouldCallQueryTextsForNewIndexes
      );
      it(
        shouldNotCallQueryTextsForQueriedIndexesExpectation,
        shouldNotCallQueryTextsForQueriedIndexes
      );
      it(
        shouldSetValuesForQueriedIndexesExpectation,
        fakeAsync(shouldSetValuesForQueriedIndexes)
      );
      it(
        shouldSetOpacityToOneForQueriedIndexesExpectation,
        fakeAsync(shouldSetOpacityToOneForQueriedIndexes)
      );
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(CvTestimonialsComponent);
        spyOn(component, 'queryTexts');
      });
      it(shouldSetOpacityToZeroExpectation, shouldSetOpacityToZero);
      it(
        shouldCallQueryTextsForNewIndexesExpectation,
        shouldCallQueryTextsForNewIndexes
      );
      it(
        shouldNotCallQueryTextsForQueriedIndexesExpectation,
        shouldNotCallQueryTextsForQueriedIndexes
      );
      it(
        shouldSetValuesForQueriedIndexesExpectation,
        fakeAsync(shouldSetValuesForQueriedIndexes)
      );
      it(
        shouldSetOpacityToOneForQueriedIndexesExpectation,
        fakeAsync(shouldSetOpacityToOneForQueriedIndexes)
      );
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(CvTestimonialsComponent);
        spyOn(component, 'queryTexts');
      });
      it(shouldSetOpacityToZeroExpectation, shouldSetOpacityToZero);
      it(
        shouldCallQueryTextsForNewIndexesExpectation,
        shouldCallQueryTextsForNewIndexes
      );
      it(
        shouldNotCallQueryTextsForQueriedIndexesExpectation,
        shouldNotCallQueryTextsForQueriedIndexes
      );
      it(
        shouldSetValuesForQueriedIndexesExpectation,
        fakeAsync(shouldSetValuesForQueriedIndexes)
      );
      it(
        shouldSetOpacityToOneForQueriedIndexesExpectation,
        fakeAsync(shouldSetOpacityToOneForQueriedIndexes)
      );
    });
  });

  describe('queryTexts method', () => {
    const waitTime = 200;
    const indexToTest = 0;
    let expectedNameSelector: string;
    let expectedCommentSelector: string;
    let expectedCourseSelector: string;

    const shouldCallTextServiceExpectation = 'should call the textService';
    const shouldCallTextService = () => {
      component.updateTexts();
      expect(textServiceSpy.getMulti)
        .withContext(
          'getMulti should have been called 1 time with proper arguments'
        )
        .toHaveBeenCalledOnceWith([
          expectedNameSelector,
          expectedCommentSelector,
          expectedCourseSelector,
        ]);
    };

    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
      const expectedName = 'test-name';
      const expectedComment = 'test-comment';
      const expectedCourse = 'test-course';

      textServiceSpy.getMulti.and.returnValues(
        of([expectedName, expectedComment, expectedCourse])
      );
      component.updateTexts();

      expect(component.name).withContext('name should not be set').toBe('');
      expect(component.comment)
        .withContext('comment should not be set')
        .toBe('');
      expect(component.course).withContext('course should not be set').toBe('');

      tick(waitTime);

      expect(component.name)
        .withContext('name should be set')
        .toBe(expectedName);
      expect(component.comment)
        .withContext('comment should be set')
        .toBe(expectedComment);
      expect(component.course)
        .withContext('course should be set')
        .toBe(expectedCourse);
    };

    const shouldSetOpacityToOneExpectation = 'should set the popacity to one';
    const shouldSetOpacityToOne = () => {
      component.opacity = 0;

      component.updateTexts();

      expect(component.opacity)
        .withContext('opacity should set to 0 before')
        .toBe(0);

      tick(waitTime);

      expect(component.opacity).withContext('opacity should be set').toBe(1);
    };

    const shouldSetActualValuesToArraysExpectation =
      'should set the actual values to the arrays, to remember them and not query them later';
    const shouldSetActualValuesToArrays = () => {
      const expectedName = 'test-name';
      const expectedComment = 'test-comment';
      const expectedCourse = 'test-course';

      textServiceSpy.getMulti.and.returnValues(
        of([expectedName, expectedComment, expectedCourse])
      );
      component.updateTexts();

      expect(component.actualNames[indexToTest])
        .withContext('name should not be set')
        .toBe('');
      expect(component.actualComments[indexToTest])
        .withContext('comment should not be set')
        .toBe('');
      expect(component.actualCourses[indexToTest])
        .withContext('course should not be set')
        .toBe('');

      tick(waitTime);

      expect(component.actualNames[indexToTest])
        .withContext('name should be set')
        .toBe('test-name');
      expect(component.actualComments[indexToTest])
        .withContext('comment should be set')
        .toBe('test-comment');
      expect(component.actualCourses[indexToTest])
        .withContext('course should be set')
        .toBe('test-course');
    };

    const shouldPushIndexToArrayExpectation =
      'should push the queried index to the array, to keep track of the indexes queried';
    const shouldPushIndexToArray = () => {
      component.updateTexts();

      expect(component.indexQueried)
        .withContext('index should not be pushed before')
        .toEqual([]);

      tick(waitTime);

      expect(component.indexQueried)
        .withContext('index should be pushed')
        .toEqual([indexToTest]);
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
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

        textServiceSpy.getMulti.and.returnValues(
          of(['sample-name', 'sample-comment', 'sample-course'])
        );

        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
        component.currentIndex = indexToTest;
        expectedNameSelector = component.namesSelectors[indexToTest];
        expectedCommentSelector = component.commentsSelectors[indexToTest];
        expectedCourseSelector = component.coursesSelectors[indexToTest];
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        fakeAsync(shouldSetPropertiesToTheServiceResult)
      );
      it(shouldSetOpacityToOneExpectation, fakeAsync(shouldSetOpacityToOne));
      it(
        shouldSetActualValuesToArraysExpectation,
        fakeAsync(shouldSetActualValuesToArrays)
      );
      it(shouldPushIndexToArrayExpectation, fakeAsync(shouldPushIndexToArray));
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

        textServiceSpy.getMulti.and.returnValues(
          of(['sample-name', 'sample-comment', 'sample-course'])
        );

        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
        component.currentIndex = indexToTest;
        expectedNameSelector = component.namesSelectors[indexToTest];
        expectedCommentSelector = component.commentsSelectors[indexToTest];
        expectedCourseSelector = component.coursesSelectors[indexToTest];
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        fakeAsync(shouldSetPropertiesToTheServiceResult)
      );
      it(shouldSetOpacityToOneExpectation, fakeAsync(shouldSetOpacityToOne));
      it(
        shouldSetActualValuesToArraysExpectation,
        fakeAsync(shouldSetActualValuesToArrays)
      );
      it(shouldPushIndexToArrayExpectation, fakeAsync(shouldPushIndexToArray));
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

        textServiceSpy.getMulti.and.returnValues(
          of(['sample-name', 'sample-comment', 'sample-course'])
        );

        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
        component.currentIndex = indexToTest;
        expectedNameSelector = component.namesSelectors[indexToTest];
        expectedCommentSelector = component.commentsSelectors[indexToTest];
        expectedCourseSelector = component.coursesSelectors[indexToTest];
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        fakeAsync(shouldSetPropertiesToTheServiceResult)
      );
      it(shouldSetOpacityToOneExpectation, fakeAsync(shouldSetOpacityToOne));
      it(
        shouldSetActualValuesToArraysExpectation,
        fakeAsync(shouldSetActualValuesToArrays)
      );
      it(shouldPushIndexToArrayExpectation, fakeAsync(shouldPushIndexToArray));
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
  });

  describe('updateTexts method', () => {
    const shouldSetOpacityToZeroExpectation = 'should set opacity to 0';
    const shouldSetOpacityToZero = () => {
      spyOn(component, 'queryTexts');
      component.opacity = 1;

      component.updateTexts();
      expect(component.opacity)
        .withContext('opacity should be set to 0')
        .toBe(0);
    };
    const shouldResetIndexQueriedExpectation =
      'should reset index queried array';
    const shouldResetIndexQueried = () => {
      spyOn(component, 'queryTexts');
      component.indexQueried = [0, 1, 2];

      component.updateTexts();

      expect(component.indexQueried)
        .withContext('indexQueried should be reset')
        .toEqual([]);
    };
    const shouldCallQueryTextsMethodExpectation =
      'should call queryTexts method';
    const shouldCallQueryTextsMethod = () => {
      spyOn(component, 'queryTexts');
      component.updateTexts();

      expect(component.queryTexts)
        .withContext('queryTexts should have been called')
        .toHaveBeenCalledTimes(1);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetOpacityToZeroExpectation, shouldSetOpacityToZero);
      it(shouldResetIndexQueriedExpectation, shouldResetIndexQueried);
      it(shouldCallQueryTextsMethodExpectation, shouldCallQueryTextsMethod);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetOpacityToZeroExpectation, shouldSetOpacityToZero);
      it(shouldResetIndexQueriedExpectation, shouldResetIndexQueried);
      it(shouldCallQueryTextsMethodExpectation, shouldCallQueryTextsMethod);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldSetOpacityToZeroExpectation, shouldSetOpacityToZero);
      it(shouldResetIndexQueriedExpectation, shouldResetIndexQueried);
      it(shouldCallQueryTextsMethodExpectation, shouldCallQueryTextsMethod);
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
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
  });

  describe('getElement', () => {
    const shouldReturnElementExpectation = 'should return the element';
    const shouldReturnElement = () => {
      const expected = new ElementRef(document.createElement('div'));
      component.mainDiv = expected;
      const actual = component.getElement();
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
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
            CvTestimonialsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
  });
});
