import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { TextParagraphComponent } from './text-paragraph.component';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { TextSubParagraphComponent } from '../text-sub-paragraph/text-sub-paragraph.component';

describe('TextParagraphComponent - dom unit', () => {
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
      componentInstance.paragraph = new Paragraph([
        new SubParagraph(SubParagraphRoot.BR, ''),
        new SubParagraph(
          SubParagraphRoot.A_ASSET,
          'this is a test',
          'this/is/a/test'
        ),
        new SubParagraph(SubParagraphRoot.SPAN, 'this is a test'),
        new SubParagraph(SubParagraphRoot.STRONG_EM, 'this is a test'),
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
    });
  });
  it('should have proper cssClass', () => {
    const expectedClass = 'this-is-a-test';
    componentInstance.paragraph = new Paragraph([], expectedClass);
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const actual = debugEl.children[0].classes[expectedClass];

    expect(actual).withContext('cssClass should be set').toBe(true);
  });
});
