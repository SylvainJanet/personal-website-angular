import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { TextSubParagraphComponent } from '../text-sub-paragraph/text-sub-paragraph.component';
import { TextParagraphSetComponent } from './text-paragraph-set.component';
import { TextParagraphComponent } from '../text-paragraph/text-paragraph.component';

describe('TextParagraphComponent - dom integration', () => {
  let fixture: ComponentFixture<TextParagraphSetComponent>;
  let componentInstance: TextParagraphSetComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    it('with full subParagraph', () => {
      const expectedAText = 'this is a test';
      const expectedAHrefParam = 'this/is/a/test';
      const expectedSpanText = 'this is also a test';
      const expectedStrongEmTextParam = 'this is again a test';
      const expectedLastParagraphSpanText = 'last paragraph of test';
      componentInstance.paragraphs = [
        new Paragraph([
          new SubParagraph(SubParagraphRoot.BR, ''),
          new SubParagraph(
            SubParagraphRoot.A_ASSET,
            expectedAText,
            expectedAHrefParam
          ),
          new SubParagraph(SubParagraphRoot.SPAN, expectedSpanText),
          new SubParagraph(
            SubParagraphRoot.STRONG_EM,
            expectedStrongEmTextParam
          ),
        ]),
        new Paragraph([
          new SubParagraph(
            SubParagraphRoot.SPAN,
            expectedLastParagraphSpanText
          ),
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

      // 1st paragraph

      let paragraphDebugEl = debugEl.children[0];
      expect(paragraphDebugEl.children.length).toBe(1);
      expect(paragraphDebugEl.children[0].nativeElement.tagName).toBe('P');
      expect(paragraphDebugEl.children[0].children.length).toBe(4);

      // 1st el
      let childDebugEl = paragraphDebugEl.children[0].children[0];
      expect(childDebugEl.children.length).toBe(1);
      expect(childDebugEl.children[0].nativeElement.tagName).toBe('BR');

      // 2nd el
      childDebugEl = paragraphDebugEl.children[0].children[1];
      expect(childDebugEl.children.length).toBe(1);
      expect(childDebugEl.children[0].nativeElement.tagName).toBe('A');
      const actualAText = childDebugEl.children[0].nativeElement.innerHTML;

      expect(actualAText).toBe(expectedAText);

      const expectedAHref = 'assets/' + expectedAHrefParam;
      const actualAHref = childDebugEl.children[0].properties['href'];

      expect(actualAHref).toBe(expectedAHref);

      // 3rd el
      childDebugEl = paragraphDebugEl.children[0].children[2];
      expect(childDebugEl.children.length).toBe(1);
      expect(childDebugEl.children[0].nativeElement.tagName).toBe('SPAN');
      const actualSpanText = childDebugEl.children[0].nativeElement.innerHTML;

      expect(actualSpanText).toBe(expectedSpanText);

      // 4th el
      childDebugEl = paragraphDebugEl.children[0].children[3];
      const expectedStrongEmText = '<em>' + expectedStrongEmTextParam + '</em>';
      const actualStrongEmText =
        childDebugEl.children[0].nativeElement.innerHTML;

      expect(actualStrongEmText).toBe(expectedStrongEmText);

      // 2nd paragraph

      paragraphDebugEl = debugEl.children[1];
      expect(paragraphDebugEl.children.length).toBe(1);
      expect(paragraphDebugEl.children[0].nativeElement.tagName).toBe('P');
      expect(paragraphDebugEl.children[0].children.length).toBe(1);

      // 1st el
      childDebugEl = paragraphDebugEl.children[0].children[0];
      expect(childDebugEl.children.length).toBe(1);
      expect(childDebugEl.children[0].nativeElement.tagName).toBe('SPAN');
      const actualLastParagraphSpanText =
        childDebugEl.children[0].nativeElement.innerHTML;

      expect(actualLastParagraphSpanText).toBe(expectedLastParagraphSpanText);
    });
  });
});
