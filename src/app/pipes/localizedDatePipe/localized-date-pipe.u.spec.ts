import { LocalizedDatePipe } from './localized-date-pipe';
import { locales } from 'src/app/enums/locales';
import { Languages } from 'src/app/enums/languages';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

describe('LocalizedDatePipe', () => {
  registerLocaleData(localeFr, 'fr-FR');

  const textServiceSpy = jasmine.createSpyObj('LanguageService', [
    'currentLocale',
  ]);

  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new LocalizedDatePipe(textServiceSpy);

  describe('for string input', () => {
    it('should transform for french locale - default pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.FRENCH]);

      const input = '01/02/2021';

      const expected = '2 janv. 2021';
      const actual = pipe.transform(input);

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });
    it('should transform for english locale - default pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.ENGLISH]);

      const input = '01/02/2021';

      const expected = 'Jan 2, 2021';
      const actual = pipe.transform(input);

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });

    it('should transform for french locale - shortDate pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.FRENCH]);

      const input = '01/02/2021';

      const expected = '02/01/2021';
      const actual = pipe.transform(input, 'shortDate');

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });
    it('should transform for english locale - shortDate pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.ENGLISH]);

      const input = '01/02/2021';

      const expected = '1/2/21';
      const actual = pipe.transform(input, 'shortDate');

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });
  });

  describe('for number input', () => {
    it('should transform for french locale - default pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.FRENCH]);

      const input = 912345678900;

      const expected = '29 nov. 1998';
      const actual = pipe.transform(input);

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });
    it('should transform for english locale - default pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.ENGLISH]);

      const input = 912345678900;

      const expected = 'Nov 29, 1998';
      const actual = pipe.transform(input);

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });

    it('should transform for french locale - shortDate pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.FRENCH]);

      const input = 912345678900;

      const expected = '29/11/1998';
      const actual = pipe.transform(input, 'shortDate');

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });
    it('should transform for english locale - shortDate pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.ENGLISH]);

      const input = 912345678900;

      const expected = '11/29/98';
      const actual = pipe.transform(input, 'shortDate');

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });
  });

  describe('for date input', () => {
    it('should transform for french locale - default pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.FRENCH]);

      const input = new Date(2024, 1, 10, 22, 34, 42);

      const expected = '10 févr. 2024';
      const actual = pipe.transform(input);

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });
    it('should transform for english locale - default pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.ENGLISH]);

      const input = new Date(2024, 1, 10, 22, 34, 42);

      const expected = 'Feb 10, 2024';
      const actual = pipe.transform(input);

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });

    it('should transform for french locale - shortDate pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.FRENCH]);

      const input = new Date(2024, 1, 10, 22, 34, 42);

      const expected = '10/02/2024';
      const actual = pipe.transform(input, 'shortDate');

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });
    it('should transform for english locale - shortDate pattern', () => {
      textServiceSpy.currentLocale.and.returnValue(locales[Languages.ENGLISH]);

      const input = new Date(2024, 1, 10, 22, 34, 42);

      const expected = '2/10/24';
      const actual = pipe.transform(input, 'shortDate');

      expect(actual)
        .withContext('transformation should be as expected')
        .toBe(expected);
    });
  });
});
