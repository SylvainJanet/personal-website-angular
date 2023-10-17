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
      expect(textParagraphSetComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      expect(textParagraphSetComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(textParagraphSetComponent.paragraphs)
        .withContext('paragraphs should be defined')
        .toEqual(jasmine.anything());
      expect(textParagraphSetComponent.paragraphs)
        .withContext('paragraphs should be empty')
        .toEqual([]);
    });
  });
});
