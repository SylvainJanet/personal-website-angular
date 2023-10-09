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
      expect(cvImgComponent)
        .withContext('component should create')
        .toBeTruthy();
    });

    it('should set default values', () => {
      expect(cvImgComponent)
        .withContext('component should create')
        .toBeTruthy();

      expect(cvImgComponent.preloaders)
        .withContext('preloaders should be set')
        .toEqual([Preloaders.MAIN]);

      cvImgComponent.altTxt.subscribe((s) =>
        expect(s).withContext('altTxt should be set').toBe('')
      );
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe)
        .withContext('languageService should have been called')
        .toHaveBeenCalledOnceWith(cvImgComponent);
    });

    it('should update the texts', () => {
      expect(cvImgComponent.updateTexts)
        .withContext('updateTexts should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      cvImgComponent = TestBed.inject(CvImgComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get)
        .withContext('get should have been called once')
        .toHaveBeenCalledTimes(1);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(altTextSelector);

      cvImgComponent.updateTexts();

      expect(textServiceSpy.get)
        .withContext('get should have been called twice')
        .toHaveBeenCalledTimes(2);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(altTextSelector);
    });
    it('should set the properties to the textService result', () => {
      const expectedaltTextObs = of('alt text test');
      textServiceSpy.get.and.returnValues(expectedaltTextObs);

      cvImgComponent.updateTexts();

      const actualNameObs = cvImgComponent.altTxt;

      expect(actualNameObs)
        .withContext('altTxt should be set')
        .toBe(expectedaltTextObs);
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      cvImgComponent = TestBed.inject(CvImgComponent);
    });
    it('should unsubscribe from the languageService', () => {
      cvImgComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(cvImgComponent);
    });
  });
});
