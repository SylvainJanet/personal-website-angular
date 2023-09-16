import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { FooterComponent } from './footer.component';

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
    TestBed.configureTestingModule({
      providers: [
        FooterComponent,
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      spyOn(FooterComponent.prototype, 'updateTexts');
      footerComponent = TestBed.inject(FooterComponent);
    });
    it('should create', () => {
      expect(footerComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(footerComponent).toBeTruthy();
      expect(footerComponent.preloaders).toEqual([Preloaders.MAIN]);

      expect(footerComponent.doubleImgDisplay).toBe('block');
      footerComponent.footerText.subscribe((s) => {
        expect(s).toBe('');
      });
      footerComponent.footerLink.subscribe((s) => {
        expect(s).toBe('');
      });
      footerComponent.footerHref.subscribe((s) => {
        expect(s).toBe('');
      });

      expect(footerComponent.footerSrc).toEqual(expectedBannerUrl);
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe).toHaveBeenCalledOnceWith(
        footerComponent
      );
    });

    it('should update the texts', () => {
      expect(footerComponent.updateTexts).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      footerComponent = TestBed.inject(FooterComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get).toHaveBeenCalledTimes(2);
      expect(textServiceSpy.get).toHaveBeenCalledWith(footerTextSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(footerLinkSelector);
    });
    it('should set the properties to the textService result', () => {
      const actualFooterText = footerComponent.footerText;
      const actualFooterLink = footerComponent.footerLink;
      const actualFooterHref = footerComponent.footerHref;

      actualFooterText.subscribe((s) => {
        expect(s).toBe(expectedFooterText);
      });
      actualFooterLink.subscribe((s) => {
        expect(s).toBe(expectedFooterLink);
      });
      actualFooterHref.subscribe((s) => {
        expect(s).toBe(expectedFooterHref);
      });
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      footerComponent = TestBed.inject(FooterComponent);
    });
    it('should unsubscribe from the languageService', () => {
      footerComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe).toHaveBeenCalledOnceWith(
        footerComponent
      );
    });
  });

  describe('onDoubleImgLoad method', () => {
    beforeEach(() => {
      footerComponent = TestBed.inject(FooterComponent);
    });
    it("shouldset doubleImgDisplay to 'none'", () => {
      footerComponent.onDoubleImgLoad();

      expect(footerComponent.doubleImgDisplay).toBe('none');
    });
  });
});
