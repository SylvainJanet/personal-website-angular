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
    textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
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
    const name = 'test name';
    const sj = 'test sj';
    const profile = 'test profile';
    const fsDev = 'test fsDev';
    const email = 'test email';
    const phone = 'test phone';

    beforeEach(() => {
      textServiceSpy.getMulti.and.returnValues(
        of([name, sj, profile, fsDev, email, phone])
      );
      cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
    });
    it('should call the textService', () => {
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
    });
    it('should set the properties to the textService result', () => {
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
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      spyOn(CvContactInfoComponent.prototype, 'updateTexts');
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
