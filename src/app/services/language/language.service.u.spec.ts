import { Languages } from 'src/app/enums/languages';
import { LanguageService } from './language.service';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';

let languageService: LanguageService;

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.removeItem('language');
    languageService = new LanguageService();
  });
  afterEach(() => {
    localStorage.removeItem('language');
  });

  it('should set the language to english by default', () => {
    const expected = Languages.ENGLISH;
    const actual = languageService.language;

    expect(actual).withContext('language should be english').toBe(expected);
  });

  it('should set the language to english in localStorage by default', () => {
    spyOn(Storage.prototype, 'setItem');

    localStorage.removeItem('language');
    languageService = new LanguageService();

    expect(window.localStorage.setItem)
      .withContext('setItem should have been called once with proper arguments')
      .toHaveBeenCalledOnceWith('language', Languages[Languages.ENGLISH]);
  });

  it('should set the language to the one in localStorage if there is one', () => {
    localStorage.setItem('language', Languages[Languages.FRENCH]);

    languageService = new LanguageService();

    const expected = Languages.FRENCH;
    const actual = languageService.language;

    expect(actual).withContext('language should be as expected').toBe(expected);
  });

  describe('current method', () => {
    it('should return the current language', () => {
      const expected = Languages.ENGLISH;
      const actual = languageService.current();

      expect(actual)
        .withContext('language should be as expected - 1')
        .toBe(expected);

      const expected2 = Languages.FRENCH;
      languageService.language = expected2;
      const actual2 = languageService.current();

      expect(actual2)
        .withContext('language should be as expected - 2')
        .toBe(expected2);
    });
  });

  describe('set method', () => {
    it('should set the current language', () => {
      const expected = Languages.ENGLISH;
      const actual = languageService.language;

      expect(actual)
        .withContext('language should be as expected - 1')
        .toBe(expected);

      const expected2 = Languages.FRENCH;
      languageService.set(expected2);
      const actual2 = languageService.current();

      expect(actual2)
        .withContext('language should be as expected - 2')
        .toBe(expected2);
    });

    it('should set the current language in localStorage', () => {
      spyOn(Storage.prototype, 'setItem');

      const newLanguage = Languages.FRENCH;
      languageService.set(newLanguage);

      expect(window.localStorage.setItem)
        .withContext(
          'setItem should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith('language', Languages[newLanguage]);
    });

    it('should notify all subscribers of the language change', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      languageService.subscribers.push(subscriber1);
      languageService.subscribers.push(subscriber2);

      spyOn(subscriber1, 'updateTexts');
      spyOn(subscriber2, 'updateTexts');

      const newLanguage = Languages.FRENCH;
      languageService.set(newLanguage);

      expect(subscriber1.updateTexts)
        .withContext('updateTexts should have been called once - subscriber 1')
        .toHaveBeenCalledTimes(1);
      expect(subscriber2.updateTexts)
        .withContext('updateTexts should have been called once - subscriber 2')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('subscribe method', () => {
    it('should subscribe a component with text to the service', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(languageService.subscribers.length)
        .withContext('there should be no subscribers')
        .toBe(0);

      languageService.subscribe(subscriber);

      expect(languageService.subscribers.length)
        .withContext('there should be 1 subscriber')
        .toBe(1);
      expect(languageService.subscribers[0])
        .withContext('the subscriber should be as expected')
        .toBe(subscriber);
    });
  });

  describe('unsubscribe method', () => {
    it('should unsubscribe a component with text to the service', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(languageService.subscribers.length)
        .withContext('there should be no subscribers')
        .toBe(0);

      languageService.subscribe(subscriber1);
      languageService.subscribe(subscriber2);

      expect(languageService.subscribers.length)
        .withContext('there should be 2 subscribers')
        .toBe(2);
      expect(languageService.subscribers[0])
        .withContext('the first subscriber should be as expected')
        .toBe(subscriber1);
      expect(languageService.subscribers[1])
        .withContext('the second subscriber should be as expected')
        .toBe(subscriber2);

      languageService.unsubscribe(subscriber1);

      expect(languageService.subscribers.length)
        .withContext('there should be 1 subscriber')
        .toBe(1);
      expect(languageService.subscribers[0])
        .withContext(
          "the only subscriber left should be the one which didn't unsubscribe"
        )
        .toBe(subscriber2);
    });
  });
});
