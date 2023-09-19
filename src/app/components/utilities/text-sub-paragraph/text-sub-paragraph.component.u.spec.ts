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
    expect(textSubParagraphComponent.SubParagraphRoot).toBeTruthy();
    expect(textSubParagraphComponent.SubParagraphRoot).toBe(SubParagraphRoot);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(textSubParagraphComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(textSubParagraphComponent).toBeTruthy();

      expect(textSubParagraphComponent.subPar).toBeTruthy();
      expect(textSubParagraphComponent.subPar).toEqual(
        new SubParagraph(SubParagraphRoot.BR, '')
      );
    });
  });
});
