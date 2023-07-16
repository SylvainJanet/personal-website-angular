import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { DebugElement, Renderer2 } from '@angular/core';
import { TextSubParagraphComponent } from './text-sub-paragraph.component';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';

describe('TextSubParagraphComponent - dom unit', () => {
  let fixture: ComponentFixture<TextSubParagraphComponent>;
  let componentInstance: TextSubParagraphComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextSubParagraphComponent],
      providers: [DOMComputationService, Renderer2],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSubParagraphComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  describe('should have proper dom structure', () => {
    it('with SPAN subParagraph', () => {
      componentInstance.subPar = new SubParagraph(
        SubParagraphRoot.SPAN,
        'this is a test'
      );
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).toBe(1);
      expect(debugEl.children[0].nativeElement.tagName).toBe('SPAN');
    });
    it('with BR subParagraph', () => {
      componentInstance.subPar = new SubParagraph(SubParagraphRoot.BR, '');
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).toBe(1);
      expect(debugEl.children[0].nativeElement.tagName).toBe('BR');
    });
    it('with STRONG_EM subParagraph', () => {
      componentInstance.subPar = new SubParagraph(
        SubParagraphRoot.STRONG_EM,
        'this is a test'
      );
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).toBe(1);
      expect(debugEl.children[0].nativeElement.tagName).toBe('STRONG');

      expect(debugEl.children[0].children.length).toBe(1);
      expect(debugEl.children[0].children[0].nativeElement.tagName).toBe('EM');
    });
    it('with A_ASSET subParagraph', () => {
      componentInstance.subPar = new SubParagraph(
        SubParagraphRoot.A_ASSET,
        'this is a test',
        'this/is/a/test'
      );
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).toBe(1);
      expect(debugEl.children[0].nativeElement.tagName).toBe('A');
    });
  });
  it('should have proper SPAN subParagraph', () => {
    const expected = 'this is a test';
    componentInstance.subPar = new SubParagraph(
      SubParagraphRoot.SPAN,
      expected
    );
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const actual = debugEl.children[0].nativeElement.innerHTML;

    expect(actual).toBe(expected);
  });
  it('should have proper BR subParagraph', () => {
    componentInstance.subPar = new SubParagraph(SubParagraphRoot.BR, '');
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children[0].nativeElement.tagName).toBe('BR');
  });
  it('should have proper STRONG_EM subParagraph', () => {
    const expectedText = 'this is a test';
    componentInstance.subPar = new SubParagraph(
      SubParagraphRoot.STRONG_EM,
      expectedText
    );
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const expected = '<em>' + expectedText + '</em>';
    const actual = debugEl.children[0].nativeElement.innerHTML;

    expect(actual).toBe(expected);
  });
  it('should have proper A_ASSET subParagraph', () => {
    const expectedText = 'this is a test';
    const expectedAssetHref = 'this/is/a/test';
    componentInstance.subPar = new SubParagraph(
      SubParagraphRoot.A_ASSET,
      expectedText,
      expectedAssetHref
    );
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const actualText = debugEl.children[0].nativeElement.innerHTML;

    expect(actualText).toBe(expectedText);

    const expectedHref = 'assets/' + expectedAssetHref;
    const actualHref = debugEl.children[0].properties['href'];

    expect(actualHref).toBe(expectedHref);
  });
});
