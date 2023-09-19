import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { TextSubParagraphComponent } from '../text-sub-paragraph/text-sub-paragraph.component';
import { TextParagraphSetComponent } from './text-paragraph-set.component';
import { TextParagraphComponent } from '../text-paragraph/text-paragraph.component';

describe('TextParagraphSetComponent - dom unit', () => {
  let fixture: ComponentFixture<TextParagraphSetComponent>;
  let componentInstance: TextParagraphSetComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TextParagraphSetComponent,
        TextParagraphComponent,
        TextSubParagraphComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextParagraphSetComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  describe('should have proper dom structure', () => {
    it('with empty paragraph', () => {
      componentInstance.paragraphs = [];
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).toBe(0);
    });
    it('with paragraphs', () => {
      componentInstance.paragraphs = [
        new Paragraph([
          new SubParagraph(SubParagraphRoot.BR, ''),
          new SubParagraph(
            SubParagraphRoot.A_ASSET,
            'this is a test',
            'this/is/a/test'
          ),
          new SubParagraph(SubParagraphRoot.SPAN, 'this is a test'),
          new SubParagraph(SubParagraphRoot.STRONG_EM, 'this is a test'),
        ]),
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, 'last paragraph of test'),
        ]),
      ];
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).toBe(2);
      expect(debugEl.children[0].nativeElement.tagName).toBe(
        'APP-TEXT-PARAGRAPH'
      );
      expect(debugEl.children[1].nativeElement.tagName).toBe(
        'APP-TEXT-PARAGRAPH'
      );
    });
  });
});
