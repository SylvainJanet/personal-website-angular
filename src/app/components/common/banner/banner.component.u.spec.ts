import { LanguageService } from 'src/app/services/language/language.service';
import { BannerComponent } from './banner.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';

describe('BannerComponent - unit', () => {
  let bannerComponent: BannerComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

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

  beforeEach(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
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
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      spyOn(BannerComponent.prototype, 'updateTexts');
      bannerComponent = TestBed.inject(BannerComponent);
    });
    it('should create', () => {
      expect(bannerComponent)
        .withContext('component should create')
        .toBeTruthy();
    });

    it('should set default values', () => {
      expect(bannerComponent)
        .withContext('component should create')
        .toBeTruthy();
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
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe)
        .withContext('subscribe should have been called')
        .toHaveBeenCalledOnceWith(bannerComponent);
    });

    it('should update the texts', () => {
      expect(bannerComponent.updateTexts)
        .withContext('updateTexts should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      bannerComponent = TestBed.inject(BannerComponent);
    });
    it('should call the textService', () => {
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
    });
    it('should set the properties to the textService result', () => {
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
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      bannerComponent = TestBed.inject(BannerComponent);
    });
    it('should unsubscribe from the languageService', () => {
      bannerComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(bannerComponent);
    });
  });

  describe('onDoubleImgLoad method', () => {
    beforeEach(() => {
      bannerComponent = TestBed.inject(BannerComponent);
    });
    it("shouldset doubleImgDisplay to 'none'", () => {
      bannerComponent.onDoubleImgLoad();

      expect(bannerComponent.doubleImgDisplay)
        .withContext("doubleImgDisplay should be 'none'")
        .toBe('none');
    });
  });
});
