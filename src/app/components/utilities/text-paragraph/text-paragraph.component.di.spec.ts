import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { TextParagraphComponent } from './text-paragraph.component';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { TextSubParagraphComponent } from '../text-sub-paragraph/text-sub-paragraph.component';

describe('TextParagraphComponent - dom integration', () => {
  let fixture: ComponentFixture<TextParagraphComponent>;
  let componentInstance: TextParagraphComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TextParagraphComponent, TextSubParagraphComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextParagraphComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance)
      .withContext('component should create')
      .toBeTruthy();
  });

  describe('should have proper dom structure', () => {
    it('with empty paragraph', () => {
      componentInstance.paragraph = new Paragraph([]);
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).withContext('1 child at root').toBe(1);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is P')
        .toBe('P');

      expect(debugEl.children[0].children.length)
        .withContext('p should have no children')
        .toBe(0);
    });
    it('with full subParagraph', () => {
      const expectedAText = 'this is a test';
      const expectedAHrefParam = 'this/is/a/test';
      const expectedSpanText = 'this is also a test';
      const expectedStrongEmTextParam = 'this is again a test';
      componentInstance.paragraph = new Paragraph([
        new SubParagraph(SubParagraphRoot.BR, ''),
        new SubParagraph(
          SubParagraphRoot.A_ASSET,
          expectedAText,
          expectedAHrefParam
        ),
        new SubParagraph(SubParagraphRoot.SPAN, expectedSpanText),
        new SubParagraph(SubParagraphRoot.STRONG_EM, expectedStrongEmTextParam),
      ]);
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).withContext('1 child at root').toBe(1);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is P')
        .toBe('P');

      expect(debugEl.children[0].children.length)
        .withContext('p should have 4 children')
        .toBe(4);
      expect(debugEl.children[0].children[0].nativeElement.tagName)
        .withContext('child 1 of p should be APP-TEXT-SUB-PARAGRAPH')
        .toBe('APP-TEXT-SUB-PARAGRAPH');
      expect(debugEl.children[0].children[1].nativeElement.tagName)
        .withContext('child 2 of p should be APP-TEXT-SUB-PARAGRAPH')
        .toBe('APP-TEXT-SUB-PARAGRAPH');
      expect(debugEl.children[0].children[2].nativeElement.tagName)
        .withContext('child 3 of p should be APP-TEXT-SUB-PARAGRAPH')
        .toBe('APP-TEXT-SUB-PARAGRAPH');
      expect(debugEl.children[0].children[3].nativeElement.tagName)
        .withContext('child 4 of p should be APP-TEXT-SUB-PARAGRAPH')
        .toBe('APP-TEXT-SUB-PARAGRAPH');

      // 1st el
      let childDebugEl = debugEl.children[0].children[0];
      expect(childDebugEl.children.length)
        .withContext('el 1 should have 1 child')
        .toBe(1);
      expect(childDebugEl.children[0].nativeElement.tagName)
        .withContext('child 1 of el 1 should be BR')
        .toBe('BR');

      // 2nd el
      childDebugEl = debugEl.children[0].children[1];
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
      childDebugEl = debugEl.children[0].children[2];
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
      childDebugEl = debugEl.children[0].children[3];
      const expectedStrongEmText = '<em>' + expectedStrongEmTextParam + '</em>';
      const actualStrongEmText =
        childDebugEl.children[0].nativeElement.innerHTML;

      expect(actualStrongEmText)
        .withContext('strong em text should be set')
        .toBe(expectedStrongEmText);
    });
  });
});
