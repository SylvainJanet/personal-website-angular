import { TestBed } from '@angular/core/testing';
import { LanguageModalRowComponent } from './language-modal-row.component';

describe('LinkBarOnHoverComponent - unit', () => {
  let languageModalRowComponent: LanguageModalRowComponent;
  describe('constructor', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LanguageModalRowComponent],
      });

      languageModalRowComponent = TestBed.inject(LanguageModalRowComponent);
    });
    it('should create', () => {
      expect(languageModalRowComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      expect(languageModalRowComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(languageModalRowComponent.languageName)
        .withContext('languageName should be set')
        .toBe('NO LANGUAGE');
      expect(languageModalRowComponent.flagSelectors)
        .withContext('flagSelectors should be set')
        .toEqual(['xx']);
      expect(languageModalRowComponent.isCurrent)
        .withContext('isCurrent should be set')
        .toBeFalse();
      expect(languageModalRowComponent.isFirstRow)
        .withContext('isFirstRow should be set')
        .toBeFalse();
      expect(languageModalRowComponent.isLastRow)
        .withContext('isLastRow should be set')
        .toBeFalse();
    });
  });
});
