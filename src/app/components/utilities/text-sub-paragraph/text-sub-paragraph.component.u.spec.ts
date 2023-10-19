import { TestBed } from '@angular/core/testing';
import { TextSubParagraphComponent } from './text-sub-paragraph.component';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';

describe('TextSubParagraphComponent - unit', () => {
  let component: TextSubParagraphComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextSubParagraphComponent],
    });
    component = TestBed.inject(TextSubParagraphComponent);
  });

  it('should have SubParagraphRoot property', () => {
    expect(component.SubParagraphRoot)
      .withContext('SubParagraphRoot should be defined')
      .toEqual(jasmine.anything());
    expect(component.SubParagraphRoot)
      .withContext('SubParagraphRoot should be the correct value')
      .toBe(SubParagraphRoot);
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

      expect(component.subPar)
        .withContext('subPar should be defined')
        .toEqual(jasmine.anything());
      expect(component.subPar)
        .withContext('subPar should be empty BR')
        .toEqual(new SubParagraph(SubParagraphRoot.BR, ''));
    });
  });
});
