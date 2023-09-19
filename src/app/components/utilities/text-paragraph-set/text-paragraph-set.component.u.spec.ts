import { TestBed } from '@angular/core/testing';
import { TextParagraphSetComponent } from './text-paragraph-set.component';

describe('TextParagraphSetComponent - unit', () => {
  let textParagraphSetComponent: TextParagraphSetComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextParagraphSetComponent],
    });
    textParagraphSetComponent = TestBed.inject(TextParagraphSetComponent);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(textParagraphSetComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(textParagraphSetComponent).toBeTruthy();

      expect(textParagraphSetComponent.paragraphs).toBeTruthy();
      expect(textParagraphSetComponent.paragraphs).toEqual([]);
    });
  });
});
