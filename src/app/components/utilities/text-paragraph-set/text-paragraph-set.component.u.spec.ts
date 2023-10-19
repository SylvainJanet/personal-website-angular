import { TestBed } from '@angular/core/testing';
import { TextParagraphSetComponent } from './text-paragraph-set.component';

describe('TextParagraphSetComponent - unit', () => {
  let component: TextParagraphSetComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextParagraphSetComponent],
    });
    component = TestBed.inject(TextParagraphSetComponent);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(component.paragraphs)
        .withContext('paragraphs should be defined')
        .toEqual(jasmine.anything());
      expect(component.paragraphs)
        .withContext('paragraphs should be empty')
        .toEqual([]);
    });
  });
});
