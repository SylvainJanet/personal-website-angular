import { BannerComponent } from './banner.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';

describe('BannerComponent - unit', () => {
  let bannerComponent: BannerComponent;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const expectedBannerUrl = '/assets/img/intro-bg2.jpg';
  const expectedFsDev = 'test fs dev';
  const expectedTrainer = 'test trainer';
  const expectedMath = 'test math';
  const expectedMusic = 'test music';
  const expectedTitle = 'test title';

  const fsDevSelector = 'occupation-fullstack-dev';
  const trainerSelector = 'occupation-trainer';
  const mathSelector = 'occupation-mathematician';
  const musicSelector = 'occupation-musician';
  const titleSelector = 'main-title';

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(bannerComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(bannerComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
      expect(bannerComponent.preloaders)
        .withContext('preloaders should be set')
        .toEqual([Preloaders.MAIN]);

      expect(bannerComponent.bannerSrc)
        .withContext('bannerSrc should be set')
        .toBe(expectedBannerUrl);
      expect(bannerComponent.messages)
        .withContext('messages should be set')
        .toEqual([]);
      bannerComponent.iAmMe.subscribe((s) => {
        expect(s).withContext('iAmMe should be set').toBe('');
      });
      expect(bannerComponent.doubleImgDisplay)
        .withContext('doubleImgDisplay should be set')
        .toBe('block');
    };

    const shouldSubscribeToVisibleToLoadTextServiceExpectation =
      'should subscribe to the visibleToLoadTextService';
    const shouldSubscribeToVisibleToLoadTextService = (done: DoneFn) => {
      setTimeout(() => {
        expect(visibleToLoadTextServiceSpy.subscribe)
          .withContext('subscribe should have been called')
          .toHaveBeenCalledOnceWith(bannerComponent);
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
        textServiceSpy.getMulti.and.returnValues(
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
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
        textServiceSpy.getMulti.and.returnValues(
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
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
        textServiceSpy.getMulti.and.returnValues(
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
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
      bannerComponent.updateTexts();

      expect(textServiceSpy.getMulti)
        .withContext(
          'getMulti should have been called 1 time with proper arguments'
        )
        .toHaveBeenCalledOnceWith([
          fsDevSelector,
          trainerSelector,
          mathSelector,
          musicSelector,
          titleSelector,
        ]);
    };
    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
      bannerComponent.updateTexts();

      const actualMessages = bannerComponent.messages;
      const actualIAmMe = bannerComponent.iAmMe;

      expect(actualMessages.length)
        .withContext('there should be 4 messages')
        .toBe(4);

      actualMessages[0].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 1')
          .toBe(expectedFsDev);
      });
      actualMessages[1].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 2')
          .toBe(expectedTrainer);
      });
      actualMessages[2].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 3')
          .toBe(expectedMath);
      });
      actualMessages[3].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 4')
          .toBe(expectedMusic);
      });
      actualIAmMe.subscribe((s) => {
        expect(s).withContext('iAmMe should be set').toBe(expectedTitle);
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
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
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
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
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
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
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
      bannerComponent.ngOnDestroy();
      expect(visibleToLoadTextServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(bannerComponent);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
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
        textServiceSpy.getMulti.and.returnValues(
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
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
        textServiceSpy.getMulti.and.returnValues(
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
  });

  describe('onDoubleImgLoad method', () => {
    const shouldSetDoublieImgDisplayToNoneExpectation =
      "should set doubleImgDisplay to 'none'";
    const shouldSetDoublieImgDisplayToNone = () => {
      bannerComponent.onDoubleImgLoad();

      expect(bannerComponent.doubleImgDisplay)
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
        textServiceSpy.getMulti.and.returnValues(
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(
        shouldSetDoublieImgDisplayToNoneExpectation,
        shouldSetDoublieImgDisplayToNone
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(
        shouldSetDoublieImgDisplayToNoneExpectation,
        shouldSetDoublieImgDisplayToNone
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([
            expectedFsDev,
            expectedTrainer,
            expectedMath,
            expectedMusic,
            expectedTitle,
          ])
        );
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(
        shouldSetDoublieImgDisplayToNoneExpectation,
        shouldSetDoublieImgDisplayToNone
      );
    });
  });
});
