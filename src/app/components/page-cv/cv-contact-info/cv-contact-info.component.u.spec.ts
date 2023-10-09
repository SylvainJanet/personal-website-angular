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
      expect(cvContactInfoComponent)
        .withContext('component should create')
        .toBeTruthy();
    });

    it('should set default values', () => {
      expect(cvContactInfoComponent)
        .withContext('component should create')
        .toBeTruthy();

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
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe)
        .withContext('subscribe should have been called')
        .toHaveBeenCalledOnceWith(cvContactInfoComponent);
    });

    it('should update the texts', () => {
      expect(cvContactInfoComponent.updateTexts)
        .withContext('updateTexts should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get)
        .withContext('get should have been called 6 times')
        .toHaveBeenCalledTimes(6);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 1')
        .toHaveBeenCalledWith(nameSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 2')
        .toHaveBeenCalledWith(sjSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 3')
        .toHaveBeenCalledWith(profileSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 4')
        .toHaveBeenCalledWith(fsDevSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 5')
        .toHaveBeenCalledWith(emailSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 6')
        .toHaveBeenCalledWith(phoneSelector);

      cvContactInfoComponent.updateTexts();

      expect(textServiceSpy.get)
        .withContext('get should have been called 12 times')
        .toHaveBeenCalledTimes(12);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 7')
        .toHaveBeenCalledWith(nameSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 8')
        .toHaveBeenCalledWith(sjSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 9')
        .toHaveBeenCalledWith(profileSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 10')
        .toHaveBeenCalledWith(fsDevSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 11')
        .toHaveBeenCalledWith(emailSelector);
      expect(textServiceSpy.get)
        .withContext('get should have been called with proper arguments - 12')
        .toHaveBeenCalledWith(phoneSelector);
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

      expect(actualNameObs)
        .withContext('name obs should be set')
        .toBe(expectedNameObs);
      expect(actualSjObs)
        .withContext('sj obs should be set')
        .toBe(expectedSjObs);
      expect(actualProfileObs)
        .withContext('profile obs should be set')
        .toBe(expectedProfileObs);
      expect(actualFsDevObs)
        .withContext('fsdev obs should be set')
        .toBe(expectedFsDevObs);
      expect(actualEmailObs)
        .withContext('email obs should be set')
        .toBe(expectedEmailObs);
      expect(actualPhoneObs)
        .withContext('phone obs should be set')
        .toBe(expectedPhoneObs);
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
    });
    it('should unsubscribe from the languageService', () => {
      cvContactInfoComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(cvContactInfoComponent);
    });
  });
});
