import { TestBed } from '@angular/core/testing';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { CvImgComponent } from './cv-img.component';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';

describe('CvImgComponent - unit', () => {
  let cvImgComponent: CvImgComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  const altTextSelector = 'cv-img-alt';

  beforeEach(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        CvImgComponent,
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      spyOn(CvImgComponent.prototype, 'updateTexts');
      cvImgComponent = TestBed.inject(CvImgComponent);
    });
    it('should create', () => {
      expect(cvImgComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(cvImgComponent).toBeTruthy();

      expect(cvImgComponent.preloaders).toEqual([Preloaders.MAIN]);

      cvImgComponent.altTxt.subscribe((s) => expect(s).toBe(''));
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe).toHaveBeenCalledOnceWith(
        cvImgComponent
      );
    });

    it('should update the texts', () => {
      expect(cvImgComponent.updateTexts).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      cvImgComponent = TestBed.inject(CvImgComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get).toHaveBeenCalledTimes(1);
      expect(textServiceSpy.get).toHaveBeenCalledWith(altTextSelector);

      cvImgComponent.updateTexts();

      expect(textServiceSpy.get).toHaveBeenCalledTimes(2);
      expect(textServiceSpy.get).toHaveBeenCalledWith(altTextSelector);
    });
    it('should set the properties to the textService result', () => {
      const expectedaltTextObs = of('alt text test');
      textServiceSpy.get.and.returnValues(expectedaltTextObs);

      cvImgComponent.updateTexts();

      const actualNameObs = cvImgComponent.altTxt;

      expect(actualNameObs).toBe(expectedaltTextObs);
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      cvImgComponent = TestBed.inject(CvImgComponent);
    });
    it('should unsubscribe from the languageService', () => {
      cvImgComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe).toHaveBeenCalledOnceWith(
        cvImgComponent
      );
    });
  });
});
