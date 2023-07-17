import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { BehaviorSubject, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { CvAboutMeComponent } from './cv-about-me.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { TextParagraphSetComponent } from '../../common/text-paragraph-set/text-paragraph-set.component';
import { TextParagraphComponent } from '../../common/text-paragraph/text-paragraph.component';
import { TextSubParagraphComponent } from '../../common/text-sub-paragraph/text-sub-paragraph.component';

describe('CvAboutMeComponent - dom unit', () => {
  let fixture: ComponentFixture<CvAboutMeComponent>;
  let componentInstance: CvAboutMeComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;
  const expectedTitle = 'test title';
  const expectedPdfName = 'this.is.a.test.pdf';
  let expectedParagraphs: Paragraph[] = [];

  beforeEach(waitForAsync(() => {
    expectedParagraphs = [
      new Paragraph([
        new SubParagraph(SubParagraphRoot.SPAN, 'test span'),
        new SubParagraph(SubParagraphRoot.STRONG_EM, 'test strong em'),
      ]),
      new Paragraph([]),
      new Paragraph([
        new SubParagraph(SubParagraphRoot.SPAN, 'test span'),
        new SubParagraph(SubParagraphRoot.STRONG_EM, 'test strong em'),
      ]),
      new Paragraph([
        new SubParagraph(SubParagraphRoot.SPAN, 'test span'),
        new SubParagraph(SubParagraphRoot.STRONG_EM, 'test strong em'),
      ]),
      new Paragraph([
        new SubParagraph(SubParagraphRoot.SPAN, 'test span'),
        new SubParagraph(SubParagraphRoot.STRONG_EM, 'test strong em'),
      ]),
      new Paragraph([
        new SubParagraph(SubParagraphRoot.SPAN, 'test span'),
        new SubParagraph(SubParagraphRoot.STRONG_EM, 'test strong em'),
      ]),
      new Paragraph([
        new SubParagraph(SubParagraphRoot.SPAN, 'test span'),
        new SubParagraph(SubParagraphRoot.STRONG_EM, 'test strong em'),
      ]),
    ];

    preloaderServiceSpy = jasmine.createSpyObj(
      'PreloaderService',
      [],
      ['statusAnyLoading']
    );
    (
      Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
        ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
    ).and.returnValue(new BehaviorSubject<boolean | null>(null));
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get', 'getSplit']);
    textServiceSpy.get.and.returnValues(of(expectedTitle), of(expectedPdfName));
    textServiceSpy.getSplit.and.returnValue(of(expectedParagraphs));
    logServiceGlobalSpy = jasmine.createSpyObj('LogService', ['withClassName']);
    logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
    logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);
    TestBed.configureTestingModule({
      declarations: [
        CvAboutMeComponent,
        TextParagraphSetComponent,
        TextParagraphComponent,
        TextSubParagraphComponent,
      ],
      providers: [
        { provide: PreloaderService, useValue: preloaderServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
        { provide: LogService, useValue: logServiceGlobalSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvAboutMeComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  describe('onResize method', () => {
    it('should be called on window resize event', () => {
      spyOn(componentInstance, 'onResize');

      window.dispatchEvent(new Event('resize'));

      expect(componentInstance.onResize).toHaveBeenCalledTimes(1);
    });
  });
  describe('onScroll method', () => {
    it('should be called on window scroll event', () => {
      spyOn(componentInstance, 'onScroll');

      window.dispatchEvent(new Event('scroll'));

      expect(componentInstance.onScroll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getElPos method', () => {
    it('should set the min and max position of the element in the page', () => {
      componentInstance.getElPos();

      // an e2e test would be more appropriate to check the accuracy of the values
      //   const expectedPosElementMin = 0;
      //   const expectedPosElementMax = 0;

      const actualPosElementMin = componentInstance.posElementMin;
      const actualPosElementMax = componentInstance.posElementMax;

      //   expect(actualPosElementMin).toBe(expectedPosElementMin);
      //   expect(actualPosElementMax).toBe(expectedPosElementMax);

      expect(actualPosElementMax > actualPosElementMin).toBeTrue();
    });
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children.length).toBe(2);
    expect(firstDivEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(firstDivEl.children[1].nativeElement.tagName).toBe(
      'APP-TEXT-PARAGRAPH-SET'
    );

    // title
    let secondDivEl: DebugElement = firstDivEl.children[0];
    expect(secondDivEl.children.length).toBe(1);
    expect(secondDivEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(secondDivEl.children[0].children.length).toBe(2);

    expect(secondDivEl.children[0].children[0].nativeElement.tagName).toBe(
      'H2'
    );
    expect(secondDivEl.children[0].children[0].children.length).toBe(0);
    expect(secondDivEl.children[0].children[1].nativeElement.tagName).toBe(
      'SPAN'
    );
    expect(secondDivEl.children[0].children[1].children.length).toBe(0);

    // content
    secondDivEl = firstDivEl.children[1];
    expect(secondDivEl.children.length).toBe(8);
    expect(
      (secondDivEl.componentInstance as TextParagraphSetComponent).paragraphs
    ).toBe(expectedParagraphs);
  });

  it('should set title', () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const secondDivEl: DebugElement = firstDivEl.children[0];
    const thirdDivEl: DebugElement = secondDivEl.children[0];
    const titleH2El: DebugElement = thirdDivEl.children[0];

    const actual = titleH2El.nativeElement.innerHTML;

    expect(actual).toBe(expectedTitle);
  });

  it('should display paragraphs', () => {
    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];
    const secondEl: DebugElement = firstDivEl.children[1];
    expect(
      (secondEl.componentInstance as TextParagraphSetComponent).paragraphs
    ).toBe(expectedParagraphs);
  });

  it('should set bar width', () => {
    componentInstance.updateWidth();
    const widthProperty = componentInstance.width;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const secondDivEl: DebugElement = firstDivEl.children[0];
    const thirdDivEl: DebugElement = secondDivEl.children[0];
    const barDivEl: DebugElement = thirdDivEl.children[1];

    const actual = barDivEl.styles['width'];

    expect(actual).toBe(
      widthProperty.endsWith('%') ? widthProperty : widthProperty + 'px'
    );
  });
});
