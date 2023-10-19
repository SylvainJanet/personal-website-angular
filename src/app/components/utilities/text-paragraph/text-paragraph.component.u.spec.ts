import { TestBed } from '@angular/core/testing';
import { TextParagraphComponent } from './text-paragraph.component';
import { Paragraph } from '../../classes/paragraph/paragraph';

describe('TextParagraphComponent - unit', () => {
  let component: TextParagraphComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextParagraphComponent],
    });
    component = TestBed.inject(TextParagraphComponent);
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

      expect(component.paragraph)
        .withContext('paragraph should be defined')
        .toEqual(jasmine.anything());
      expect(component.paragraph)
        .withContext('paragraph should be empty')
        .toEqual(new Paragraph([]));
    });
  });
});
