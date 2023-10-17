import { TestBed } from '@angular/core/testing';
import { CvContactInfoComponent } from './cv-contact-info.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { ElementRef } from '@angular/core';

describe('CvContactInfoComponent - unit', () => {
  let cvContactInfoComponent: CvContactInfoComponent;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const nameSelector = 'about-name-field';
  const sjSelector = 'sylvain-janet';
  const profileSelector = 'about-profile-field';
  const fsDevSelector = 'occupation-fullstack-dev';
  const emailSelector = 'about-email-field';
  const phoneSelector = 'about-phone-field';

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(cvContactInfoComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(cvContactInfoComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      cvContactInfoComponent.name.subscribe((s) =>
        expect(s).withContext('name should be set').toBe('')
      );
      cvContactInfoComponent.sj.subscribe((s) =>
        expect(s).withContext('sj should be set').toBe('')
      );
      cvContactInfoComponent.profile.subscribe((s) =>
        expect(s).withContext('profile should be set').toBe('')
      );
      cvContactInfoComponent.fsDev.subscribe((s) =>
        expect(s).withContext('fsDev should be set').toBe('')
      );
      cvContactInfoComponent.email.subscribe((s) =>
        expect(s).withContext('email should be set').toBe('')
      );
      cvContactInfoComponent.phone.subscribe((s) =>
        expect(s).withContext('phone should be set').toBe('')
      );
    };

    const shouldSubscribeToVisibleToLoadTextServiceExpectation =
      'should subscribe to the visibleToLoadTextService';
    const shouldSubscribeToVisibleToLoadTextService = (done: DoneFn) => {
      setTimeout(() => {
        expect(visibleToLoadTextServiceSpy.subscribe)
          .withContext('subscribe should have been called')
          .toHaveBeenCalledOnceWith(cvContactInfoComponent);
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
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
    const name = 'test name';
    const sj = 'test sj';
    const profile = 'test profile';
    const fsDev = 'test fsDev';
    const email = 'test email';
    const phone = 'test phone';

    const shouldCallTextServiceExpectation = 'should call the textService';
    const shouldCallTextService = () => {
      cvContactInfoComponent.updateTexts();
      expect(textServiceSpy.getMulti)
        .withContext(
          'getMulti should have been called 1 time with proper arguments'
        )
        .toHaveBeenCalledOnceWith([
          nameSelector,
          sjSelector,
          profileSelector,
          fsDevSelector,
          emailSelector,
          phoneSelector,
        ]);
    };
    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
      const expectedName = 'other test name';
      const expectedSj = 'other test sj';
      const expectedProfile = 'other test profile';
      const expectedFsDev = 'other test fsDev';
      const expectedEmail = 'other test email';
      const expectedPhone = 'other test phone';
      textServiceSpy.getMulti.and.returnValues(
        of([
          expectedName,
          expectedSj,
          expectedProfile,
          expectedFsDev,
          expectedEmail,
          expectedPhone,
        ])
      );

      cvContactInfoComponent.updateTexts();

      const actualNameObs = cvContactInfoComponent.name;
      const actualSjObs = cvContactInfoComponent.sj;
      const actualProfileObs = cvContactInfoComponent.profile;
      const actualFsDevObs = cvContactInfoComponent.fsDev;
      const actualEmailObs = cvContactInfoComponent.email;
      const actualPhoneObs = cvContactInfoComponent.phone;

      actualNameObs.subscribe((s) => {
        expect(s).withContext('name should be set').toBe(expectedName);
      });
      actualSjObs.subscribe((s) => {
        expect(s).withContext('sj should be set').toBe(expectedSj);
      });
      actualProfileObs.subscribe((s) => {
        expect(s)
          .withContext('expectedProfileObs should be set')
          .toBe(expectedProfile);
      });
      actualFsDevObs.subscribe((s) => {
        expect(s).withContext('fsdev should be set').toBe(expectedFsDev);
      });
      actualEmailObs.subscribe((s) => {
        expect(s).withContext('email should be set').toBe(expectedEmail);
      });
      actualPhoneObs.subscribe((s) => {
        expect(s).withContext('phone should be set').toBe(expectedPhone);
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

        textServiceSpy.getMulti.and.returnValues(
          of([name, sj, profile, fsDev, email, phone])
        );

        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

        textServiceSpy.getMulti.and.returnValues(
          of([name, sj, profile, fsDev, email, phone])
        );

        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

        textServiceSpy.getMulti.and.returnValues(
          of([name, sj, profile, fsDev, email, phone])
        );

        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
      cvContactInfoComponent.ngOnDestroy();
      expect(visibleToLoadTextServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(cvContactInfoComponent);
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
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
  });

  describe('getElement', () => {
    const shouldReturnElementExpectation = 'should return the element';
    const shouldReturnElement = () => {
      const expected = new ElementRef(document.createElement('div'));
      cvContactInfoComponent.mainDiv = expected;

      const actual = cvContactInfoComponent.getElement();

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
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
            CvContactInfoComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
  });
});
