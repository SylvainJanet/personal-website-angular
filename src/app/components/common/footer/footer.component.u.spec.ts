import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { FooterComponent } from './footer.component';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';

const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('FooterComponent - unit', () => {
  let footerComponent: FooterComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const expectedBannerUrl = '/assets/img/overlay-bg.jpg';
  const retrievedFooterText = 'test footer text';
  const expectedFooterText = retrievedFooterText + ' - ';
  const expectedFooterLink = 'test footer link';
  const expectedFooterHref = 'https://www.' + expectedFooterLink;

  const footerTextSelector = 'sylvain-janet';
  const footerLinkSelector = 'website';
  beforeEach(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
    textServiceSpy.get.and.returnValues(
      of(retrievedFooterText),
      of(expectedFooterLink)
    );
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(footerComponent)
        .withContext('component should create')
        .toBeTruthy();
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(footerComponent)
        .withContext('component should create')
        .toBeTruthy();
      expect(footerComponent.preloaders)
        .withContext('preloaders should be set')
        .toEqual([Preloaders.MAIN]);

      expect(footerComponent.doubleImgDisplay)
        .withContext('doubleImgDisplay should be set')
        .toBe('block');
      footerComponent.footerText.subscribe((s) => {
        expect(s).withContext('footerText should be set').toBe('');
      });
      footerComponent.footerLink.subscribe((s) => {
        expect(s).withContext('footerLink should be set').toBe('');
      });
      footerComponent.footerHref.subscribe((s) => {
        expect(s).withContext('footerHref should be set').toBe('');
      });

      expect(footerComponent.footerSrc)
        .withContext('footerSrc should be set')
        .toEqual(expectedBannerUrl);
    };

    const shouldSubscribeToLanguageServiceExpectation =
      'should subscribe to the languageService';
    const shouldSubscribeToLanguageService = () => {
      expect(languageServiceSpy.subscribe)
        .withContext('subscribe should have been called')
        .toHaveBeenCalledOnceWith(footerComponent);
    };

    const shouldUpdateTheTextsExpectation = 'should update the texts';
    const shouldUpdateTheTexts = () => {
      expect(footerComponent.updateTexts)
        .withContext('updateTexts should have been called')
        .toHaveBeenCalledTimes(1);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        spyOn(FooterComponent.prototype, 'updateTexts');
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToLanguageServiceExpectation,
        shouldSubscribeToLanguageService
      );
      it(shouldUpdateTheTextsExpectation, shouldUpdateTheTexts);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        spyOn(FooterComponent.prototype, 'updateTexts');
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToLanguageServiceExpectation,
        shouldSubscribeToLanguageService
      );
      it(shouldUpdateTheTextsExpectation, shouldUpdateTheTexts);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        spyOn(FooterComponent.prototype, 'updateTexts');
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToLanguageServiceExpectation,
        shouldSubscribeToLanguageService
      );
      it(shouldUpdateTheTextsExpectation, shouldUpdateTheTexts);
    });
  });

  describe('updateTexts', () => {
    const shouldCallTextServiceExpectation = 'should call the textService';
    const shouldCallTextService = () => {
      expect(textServiceSpy.get)
        .withContext('get should have been called 2 times')
        .toHaveBeenCalledTimes(2);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 1')
        .toHaveBeenCalledWith(footerTextSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 2')
        .toHaveBeenCalledWith(footerLinkSelector);
    };

    const shouldSetPropertiesToTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTextServiceResult = () => {
      const actualFooterText = footerComponent.footerText;
      const actualFooterLink = footerComponent.footerLink;
      const actualFooterHref = footerComponent.footerHref;

      actualFooterText.subscribe((s) => {
        expect(s)
          .withContext('footerText should be set')
          .toBe(expectedFooterText);
      });
      actualFooterLink.subscribe((s) => {
        expect(s)
          .withContext('footerLink should be set')
          .toBe(expectedFooterLink);
      });
      actualFooterHref.subscribe((s) => {
        expect(s)
          .withContext('footerHref should be set')
          .toBe(expectedFooterHref);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTextServiceResultExpectation,
        shouldSetPropertiesToTextServiceResult
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTextServiceResultExpectation,
        shouldSetPropertiesToTextServiceResult
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTextServiceResultExpectation,
        shouldSetPropertiesToTextServiceResult
      );
    });
  });

  describe('ngOnDestroy', () => {
    const shouldUnsubscribeFromLanguageServiceExpectation =
      'should unsubscribe from the languageService';
    const shouldUnsubscribeFromLanguageService = () => {
      footerComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(footerComponent);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(
        shouldUnsubscribeFromLanguageServiceExpectation,
        shouldUnsubscribeFromLanguageService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(
        shouldUnsubscribeFromLanguageServiceExpectation,
        shouldUnsubscribeFromLanguageService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(
        shouldUnsubscribeFromLanguageServiceExpectation,
        shouldUnsubscribeFromLanguageService
      );
    });
  });

  describe('onDoubleImgLoad method', () => {
    const shouldSetDoubleImgDisplayToNoneExpectation =
      "should set doubleImgDisplay to 'none'";
    const shouldSetDoubleImgDisplayToNone = () => {
      footerComponent.onDoubleImgLoad();

      expect(footerComponent.doubleImgDisplay)
        .withContext("doubleImgDisplay should be 'none'")
        .toBe('none');
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(
        shouldSetDoubleImgDisplayToNoneExpectation,
        shouldSetDoubleImgDisplayToNone
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(
        shouldSetDoubleImgDisplayToNoneExpectation,
        shouldSetDoubleImgDisplayToNone
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        footerComponent = TestBed.inject(FooterComponent);
      });
      it(
        shouldSetDoubleImgDisplayToNoneExpectation,
        shouldSetDoubleImgDisplayToNone
      );
    });
  });
});
