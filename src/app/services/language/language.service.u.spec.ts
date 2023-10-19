import { Languages } from 'src/app/enums/languages';
import { LanguageService } from './language.service';
import { TestBed } from '@angular/core/testing';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { ENV } from 'src/environments/injectionToken/environment-provider';

let service: LanguageService;
const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('LanguageService - unit', () => {
  afterEach(() => {
    localStorage.removeItem('language');
  });

  const shouldSetDefaultLanguageToEnglishByDefaultExpectation =
    'should set the language to english by default';
  const shouldSetDefaultLanguageToEnglishByDefault = () => {
    service = TestBed.inject(LanguageService);

    const expected = Languages.ENGLISH;
    const actual = service.language;

    expect(actual).withContext('language should be english').toBe(expected);
  };

  const shouldSetLanguageToEnglishByDefaultInLocalStorageExpectation =
    'should set the language to english in localStorage by default';
  const shouldSetLanguageToEnglishByDefaultInLocalStorage = () => {
    spyOn(Storage.prototype, 'setItem');

    localStorage.removeItem('language');
    service = TestBed.inject(LanguageService);

    expect(window.localStorage.setItem)
      .withContext('setItem should have been called once with proper arguments')
      .toHaveBeenCalledOnceWith('language', Languages[Languages.ENGLISH]);
  };

  const shouldSetLanguageToTheOneInLocalStorageExpectation =
    'should set the language to the one in localStorage if there is one';
  const shouldSetLanguageToTheOneInLocalStorage = () => {
    localStorage.setItem('language', Languages[Languages.FRENCH]);

    service = TestBed.inject(LanguageService);

    const expected = Languages.FRENCH;
    const actual = service.language;

    expect(actual).withContext('language should be as expected').toBe(expected);
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      localStorage.removeItem('language');

      TestBed.configureTestingModule({
        providers: [{ provide: ENV, useValue: devEnv }],
      });
    });
    it(
      shouldSetDefaultLanguageToEnglishByDefaultExpectation,
      shouldSetDefaultLanguageToEnglishByDefault
    );
    it(
      shouldSetLanguageToEnglishByDefaultInLocalStorageExpectation,
      shouldSetLanguageToEnglishByDefaultInLocalStorage
    );
    it(
      shouldSetLanguageToTheOneInLocalStorageExpectation,
      shouldSetLanguageToTheOneInLocalStorage
    );
  });

  describe('in staging environment', () => {
    beforeEach(() => {
      localStorage.removeItem('language');

      TestBed.configureTestingModule({
        providers: [{ provide: ENV, useValue: stagingEnv }],
      });
    });
    it(
      shouldSetDefaultLanguageToEnglishByDefaultExpectation,
      shouldSetDefaultLanguageToEnglishByDefault
    );
    it(
      shouldSetLanguageToEnglishByDefaultInLocalStorageExpectation,
      shouldSetLanguageToEnglishByDefaultInLocalStorage
    );
    it(
      shouldSetLanguageToTheOneInLocalStorageExpectation,
      shouldSetLanguageToTheOneInLocalStorage
    );
  });

  describe('in prod environment', () => {
    beforeEach(() => {
      localStorage.removeItem('language');

      TestBed.configureTestingModule({
        providers: [{ provide: ENV, useValue: prodEnv }],
      });
    });
    it(
      shouldSetDefaultLanguageToEnglishByDefaultExpectation,
      shouldSetDefaultLanguageToEnglishByDefault
    );
    it(
      shouldSetLanguageToEnglishByDefaultInLocalStorageExpectation,
      shouldSetLanguageToEnglishByDefaultInLocalStorage
    );
    it(
      shouldSetLanguageToTheOneInLocalStorageExpectation,
      shouldSetLanguageToTheOneInLocalStorage
    );
  });

  describe('current method', () => {
    const shouldReturnTheCurrentLanguageExpectation =
      'should return the current language';
    const shouldReturnTheCurrentLanguage = () => {
      const expected = Languages.ENGLISH;
      const actual = service.current();

      expect(actual)
        .withContext('language should be as expected - 1')
        .toBe(expected);

      const expected2 = Languages.FRENCH;
      service.language = expected2;
      const actual2 = service.current();

      expect(actual2)
        .withContext('language should be as expected - 2')
        .toBe(expected2);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        localStorage.removeItem('language');

        TestBed.configureTestingModule({
          providers: [{ provide: ENV, useValue: devEnv }],
        });
        service = TestBed.inject(LanguageService);
      });
      it(
        shouldReturnTheCurrentLanguageExpectation,
        shouldReturnTheCurrentLanguage
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        localStorage.removeItem('language');

        TestBed.configureTestingModule({
          providers: [{ provide: ENV, useValue: stagingEnv }],
        });
        service = TestBed.inject(LanguageService);
      });
      it(
        shouldReturnTheCurrentLanguageExpectation,
        shouldReturnTheCurrentLanguage
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        localStorage.removeItem('language');

        TestBed.configureTestingModule({
          providers: [{ provide: ENV, useValue: prodEnv }],
        });
        service = TestBed.inject(LanguageService);
      });
      it(
        shouldReturnTheCurrentLanguageExpectation,
        shouldReturnTheCurrentLanguage
      );
    });
  });

  describe('set method', () => {
    const shouldSetCurrentLanguageExpectation =
      'should set the current language';
    const shouldSetCurrentLanguage = () => {
      const expected = Languages.ENGLISH;
      const actual = service.language;

      expect(actual)
        .withContext('language should be as expected - 1')
        .toBe(expected);

      const expected2 = Languages.FRENCH;
      service.set(expected2);
      const actual2 = service.current();

      expect(actual2)
        .withContext('language should be as expected - 2')
        .toBe(expected2);
    };

    const shouldSetCurrentLanguageInLocalStorageExpectation =
      'should set the current language in localStorage';
    const shouldSetCurrentLanguageInLocalStorage = () => {
      spyOn(Storage.prototype, 'setItem');

      const newLanguage = Languages.FRENCH;
      service.set(newLanguage);

      expect(window.localStorage.setItem)
        .withContext(
          'setItem should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith('language', Languages[newLanguage]);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        localStorage.removeItem('language');

        TestBed.configureTestingModule({
          providers: [{ provide: ENV, useValue: devEnv }],
        });
        service = TestBed.inject(LanguageService);
      });
      it(shouldSetCurrentLanguageExpectation, shouldSetCurrentLanguage);
      it(
        shouldSetCurrentLanguageInLocalStorageExpectation,
        shouldSetCurrentLanguageInLocalStorage
      );
    });

    describe('in staging environment', () => {
      beforeEach(() => {
        localStorage.removeItem('language');

        TestBed.configureTestingModule({
          providers: [{ provide: ENV, useValue: stagingEnv }],
        });
        service = TestBed.inject(LanguageService);
      });
      it(shouldSetCurrentLanguageExpectation, shouldSetCurrentLanguage);
      it(
        shouldSetCurrentLanguageInLocalStorageExpectation,
        shouldSetCurrentLanguageInLocalStorage
      );
    });

    describe('in prod environment', () => {
      beforeEach(() => {
        localStorage.removeItem('language');

        TestBed.configureTestingModule({
          providers: [{ provide: ENV, useValue: prodEnv }],
        });
        service = TestBed.inject(LanguageService);
      });
      it(shouldSetCurrentLanguageExpectation, shouldSetCurrentLanguage);
      it(
        shouldSetCurrentLanguageInLocalStorageExpectation,
        shouldSetCurrentLanguageInLocalStorage
      );
    });
  });
});
