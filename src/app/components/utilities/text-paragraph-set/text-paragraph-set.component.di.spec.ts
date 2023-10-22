import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { TextSubParagraphComponent } from '../text-sub-paragraph/text-sub-paragraph.component';
import { TextParagraphSetComponent } from './text-paragraph-set.component';
import { TextParagraphComponent } from '../text-paragraph/text-paragraph.component';

describe('TextParagraphSetComponent - dom integration', () => {
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
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  });

  describe('should have proper dom structure', () => {
    it('with empty paragraph', () => {
      componentInstance.paragraphs = [];
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length)
        .withContext('there should be no element')
        .toBe(0);
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

      expect(debugEl.children.length)
        .withContext('there should be 2 elements')
        .toBe(2);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('el 1 should be APP-TEXT-PARAGRAPH')
        .toBe('APP-TEXT-PARAGRAPH');
      expect(debugEl.children[1].nativeElement.tagName)
        .withContext('el 2 should be APP-TEXT-PARAGRAPH')
        .toBe('APP-TEXT-PARAGRAPH');

      // 1st paragraph

      let paragraphDebugEl = debugEl.children[0];
      expect(paragraphDebugEl.children.length)
        .withContext('paragraph 1 should have 1 child')
        .toBe(1);
      expect(paragraphDebugEl.children[0].nativeElement.tagName)
        .withContext('child 1 of paragraph 1 should be P')
        .toBe('P');
      expect(paragraphDebugEl.children[0].children.length)
        .withContext('p should have 4 children')
        .toBe(4);

      // 1st el
      let childDebugEl = paragraphDebugEl.children[0].children[0];
      expect(childDebugEl.children.length)
        .withContext('el 1 should have 1 child')
        .toBe(1);
      expect(childDebugEl.children[0].nativeElement.tagName)
        .withContext('child 1 of el 1 should be BR')
        .toBe('BR');

      // 2nd el
      childDebugEl = paragraphDebugEl.children[0].children[1];
      expect(childDebugEl.children.length)
        .withContext('el 2 should have 1 child')
        .toBe(1);
      expect(childDebugEl.children[0].nativeElement.tagName)
        .withContext('child 1 of el 2 should be A')
        .toBe('A');
      const actualAText = childDebugEl.children[0].nativeElement.innerHTML;

      expect(actualAText)
        .withContext('a text should be set')
        .toBe(expectedAText);

      const expectedAHref = 'assets/' + expectedAHrefParam;
      const actualAHref = childDebugEl.children[0].properties['href'];

      expect(actualAHref)
        .withContext('a href should be set')
        .toBe(expectedAHref);

      // 3rd el
      childDebugEl = paragraphDebugEl.children[0].children[2];
      expect(childDebugEl.children.length)
        .withContext('el 3 should have 1 child')
        .toBe(1);
      expect(childDebugEl.children[0].nativeElement.tagName)
        .withContext('child 1 of el 3 should be SPAN')
        .toBe('SPAN');
      const actualSpanText = childDebugEl.children[0].nativeElement.innerHTML;

      expect(actualSpanText)
        .withContext('span text should be set')
        .toBe(expectedSpanText);

      // 4th el
      childDebugEl = paragraphDebugEl.children[0].children[3];
      expect(childDebugEl.children[0].nativeElement.tagName)
        .withContext('first element of strongem subpar should be STRONG')
        .toBe('STRONG');

      expect(childDebugEl.children[0].children[0].nativeElement.tagName)
        .withContext(
          'first element of strong child strongem subpar should be EM'
        )
        .toBe('EM');

      expect(childDebugEl.children[0].children[0].nativeElement.innerHTML)
        .withContext('strong em text should be set')
        .toBe(expectedStrongEmTextParam);

      // 2nd paragraph

      paragraphDebugEl = debugEl.children[1];
      expect(paragraphDebugEl.children.length)
        .withContext('paragraph 2 should have 1 child')
        .toBe(1);
      expect(paragraphDebugEl.children[0].nativeElement.tagName)
        .withContext('child 1 of paragraph 2 should be P')
        .toBe('P');
      expect(paragraphDebugEl.children[0].children.length)
        .withContext('p of paragraph 2 should have 1 child')
        .toBe(1);

      // 1st el
      childDebugEl = paragraphDebugEl.children[0].children[0];
      expect(childDebugEl.children.length)
        .withContext('first p of paragraph 2 should have 1 child')
        .toBe(1);
      expect(childDebugEl.children[0].nativeElement.tagName)
        .withContext('child 1 of first p of paragraph 2 should be SPAN')
        .toBe('SPAN');
      const actualLastParagraphSpanText =
        childDebugEl.children[0].nativeElement.innerHTML;

      expect(actualLastParagraphSpanText)
        .withContext('last paragraph span text should be set')
        .toBe(expectedLastParagraphSpanText);
    });
  });
});
