import { TestBed } from '@angular/core/testing';
import { TextParagraphComponent } from './text-paragraph.component';
import { Paragraph } from '../../classes/paragraph/paragraph';

describe('TextParagraphComponent - unit', () => {
  let textParagraphComponent: TextParagraphComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextParagraphComponent],
    });
    textParagraphComponent = TestBed.inject(TextParagraphComponent);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(textParagraphComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(textParagraphComponent).toBeTruthy();

      expect(textParagraphComponent.paragraph).toBeTruthy();
      expect(textParagraphComponent.paragraph).toEqual(new Paragraph([]));
    });
  });
});
