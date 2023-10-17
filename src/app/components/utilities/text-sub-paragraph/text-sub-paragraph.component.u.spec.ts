import { TestBed } from '@angular/core/testing';
import { TextSubParagraphComponent } from './text-sub-paragraph.component';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';

describe('TextSubParagraphComponent - unit', () => {
  let textSubParagraphComponent: TextSubParagraphComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextSubParagraphComponent],
    });
    textSubParagraphComponent = TestBed.inject(TextSubParagraphComponent);
  });

  it('should have SubParagraphRoot property', () => {
    expect(textSubParagraphComponent.SubParagraphRoot)
      .withContext('SubParagraphRoot should be defined')
      .toEqual(jasmine.anything());
    expect(textSubParagraphComponent.SubParagraphRoot)
      .withContext('SubParagraphRoot should be the correct value')
      .toBe(SubParagraphRoot);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(textSubParagraphComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      expect(textSubParagraphComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(textSubParagraphComponent.subPar)
        .withContext('subPar should be defined')
        .toEqual(jasmine.anything());
      expect(textSubParagraphComponent.subPar)
        .withContext('subPar should be empty BR')
        .toEqual(new SubParagraph(SubParagraphRoot.BR, ''));
    });
  });
});
