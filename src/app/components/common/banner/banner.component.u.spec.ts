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
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
    textServiceSpy.get.and.returnValues(
      of(expectedFsDev),
      of(expectedTrainer),
      of(expectedMath),
      of(expectedMusic),
      of(expectedTitle)
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
      expect(bannerComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(bannerComponent).toBeTruthy();
      expect(bannerComponent.preloaders).toEqual([Preloaders.MAIN]);

      expect(bannerComponent.bannerSrc).toBe(expectedBannerUrl);
      expect(bannerComponent.messages).toEqual([]);
      bannerComponent.iAmMe.subscribe((s) => {
        expect(s).toBe('');
      });
      expect(bannerComponent.doubleImgDisplay).toBe('block');
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe).toHaveBeenCalledOnceWith(
        bannerComponent
      );
    });

    it('should update the texts', () => {
      expect(bannerComponent.updateTexts).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      bannerComponent = TestBed.inject(BannerComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get).toHaveBeenCalledTimes(5);
      expect(textServiceSpy.get).toHaveBeenCalledWith(fsDevSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(trainerSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(mathSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(musicSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(titleSelector);
    });
    it('should set the properties to the textService result', () => {
      const actualMessages = bannerComponent.messages;
      const actualIAmMe = bannerComponent.iAmMe;

      expect(actualMessages.length).toBe(4);

      actualMessages[0].subscribe((s) => {
        expect(s).toBe(expectedFsDev);
      });
      actualMessages[1].subscribe((s) => {
        expect(s).toBe(expectedTrainer);
      });
      actualMessages[2].subscribe((s) => {
        expect(s).toBe(expectedMath);
      });
      actualMessages[3].subscribe((s) => {
        expect(s).toBe(expectedMusic);
      });
      actualIAmMe.subscribe((s) => {
        expect(s).toBe(expectedTitle);
      });
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      bannerComponent = TestBed.inject(BannerComponent);
    });
    it('should unsubscribe from the languageService', () => {
      bannerComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe).toHaveBeenCalledOnceWith(
        bannerComponent
      );
    });
  });

  describe('onDoubleImgLoad method', () => {
    beforeEach(() => {
      bannerComponent = TestBed.inject(BannerComponent);
    });
    it("shouldset doubleImgDisplay to 'none'", () => {
      bannerComponent.onDoubleImgLoad();

      expect(bannerComponent.doubleImgDisplay).toBe('none');
    });
  });
});
