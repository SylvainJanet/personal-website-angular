import { TestBed } from '@angular/core/testing';
import { CvContactInfoComponent } from './cv-contact-info.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';

describe('CvContactInfoComponent - unit', () => {
  let cvContactInfoComponent: CvContactInfoComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  const nameSelector = 'about-name-field';
  const sjSelector = 'sylvain-janet';
  const profileSelector = 'about-profile-field';
  const fsDevSelector = 'occupation-fullstack-dev';
  const emailSelector = 'about-email-field';
  const phoneSelector = 'about-phone-field';

  beforeEach(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
    TestBed.configureTestingModule({
      providers: [
        CvContactInfoComponent,
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      spyOn(CvContactInfoComponent.prototype, 'updateTexts');
      cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
    });
    it('should create', () => {
      expect(cvContactInfoComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(cvContactInfoComponent).toBeTruthy();

      cvContactInfoComponent.name.subscribe((s) => expect(s).toBe(''));
      cvContactInfoComponent.sj.subscribe((s) => expect(s).toBe(''));
      cvContactInfoComponent.profile.subscribe((s) => expect(s).toBe(''));
      cvContactInfoComponent.fsDev.subscribe((s) => expect(s).toBe(''));
      cvContactInfoComponent.email.subscribe((s) => expect(s).toBe(''));
      cvContactInfoComponent.phone.subscribe((s) => expect(s).toBe(''));
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe).toHaveBeenCalledOnceWith(
        cvContactInfoComponent
      );
    });

    it('should update the texts', () => {
      expect(cvContactInfoComponent.updateTexts).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get).toHaveBeenCalledTimes(6);
      expect(textServiceSpy.get).toHaveBeenCalledWith(nameSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(sjSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(profileSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(fsDevSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(emailSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(phoneSelector);

      cvContactInfoComponent.updateTexts();

      expect(textServiceSpy.get).toHaveBeenCalledTimes(12);
      expect(textServiceSpy.get).toHaveBeenCalledWith(nameSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(sjSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(profileSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(fsDevSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(emailSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(phoneSelector);
    });
    it('should set the properties to the textService result', () => {
      const expectedNameObs = of('test name');
      const expectedSjObs = of('test sj');
      const expectedProfileObs = of('test profile');
      const expectedFsDevObs = of('test fsDev');
      const expectedEmailObs = of('test email');
      const expectedPhoneObs = of('test phone');
      textServiceSpy.get.and.returnValues(
        expectedNameObs,
        expectedSjObs,
        expectedProfileObs,
        expectedFsDevObs,
        expectedEmailObs,
        expectedPhoneObs
      );

      cvContactInfoComponent.updateTexts();

      const actualNameObs = cvContactInfoComponent.name;
      const actualSjObs = cvContactInfoComponent.sj;
      const actualProfileObs = cvContactInfoComponent.profile;
      const actualFsDevObs = cvContactInfoComponent.fsDev;
      const actualEmailObs = cvContactInfoComponent.email;
      const actualPhoneObs = cvContactInfoComponent.phone;

      expect(actualNameObs).toBe(expectedNameObs);
      expect(actualSjObs).toBe(expectedSjObs);
      expect(actualProfileObs).toBe(expectedProfileObs);
      expect(actualFsDevObs).toBe(expectedFsDevObs);
      expect(actualEmailObs).toBe(expectedEmailObs);
      expect(actualPhoneObs).toBe(expectedPhoneObs);
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
    });
    it('should unsubscribe from the languageService', () => {
      cvContactInfoComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe).toHaveBeenCalledOnceWith(
        cvContactInfoComponent
      );
    });
  });
});
