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
      expect(textParagraphComponent)
        .withContext('component should create')
        .toBeTruthy();
    });

    it('should set default values', () => {
      expect(textParagraphComponent)
        .withContext('component should create')
        .toBeTruthy();

      expect(textParagraphComponent.paragraph)
        .withContext('paragraph should be defined')
        .toBeTruthy();
      expect(textParagraphComponent.paragraph)
        .withContext('paragraph should be empty')
        .toEqual(new Paragraph([]));
    });
  });
});
