import { TestBed } from '@angular/core/testing';
import { LanguageModalRowComponent } from './language-modal-row.component';

describe('LanguageModalRowComponent - unit', () => {
  let component: LanguageModalRowComponent;
  describe('constructor', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LanguageModalRowComponent],
      });

      component = TestBed.inject(LanguageModalRowComponent);
    });
    it('should create', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(component.languageName)
        .withContext('languageName should be set')
        .toBe('NO LANGUAGE');
      expect(component.flagSelectors)
        .withContext('flagSelectors should be set')
        .toEqual(['xx']);
      expect(component.isCurrent)
        .withContext('isCurrent should be set')
        .toBeFalse();
      expect(component.isFirstRow)
        .withContext('isFirstRow should be set')
        .toBeFalse();
      expect(component.isLastRow)
        .withContext('isLastRow should be set')
        .toBeFalse();
    });
  });
});
