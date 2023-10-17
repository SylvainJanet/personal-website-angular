import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { CvAboutMeComponent } from './cv-about-me.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { TextParagraphComponent } from '../../utilities/text-paragraph/text-paragraph.component';
import { TextSubParagraphComponent } from '../../utilities/text-sub-paragraph/text-sub-paragraph.component';
import { TextParagraphSetComponent } from '../../utilities/text-paragraph-set/text-paragraph-set.component';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';

describe('CvAboutMeComponent - dom unit', () => {
  let fixture: ComponentFixture<CvAboutMeComponent>;
  let componentInstance: CvAboutMeComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
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
      ['isLoading'],
      []
    );

    visibleToLoadTextServiceSpy = jasmine.createSpyObj(
      'VisibleToLoadTextServiceSpy',
      ['hasTextLoaded', 'subscribe', 'unsubscribe', 'textLoaded'],
      []
    );
    textServiceSpy = jasmine.createSpyObj('TextService', ['getMultiSomeSplit']);
    textServiceSpy.getMultiSomeSplit.and.returnValue(
      of([expectedTitle, expectedPdfName, expectedParagraphs])
    );
    logServiceGlobalSpy = jasmine.createSpyObj('LogService', ['withClassName']);
    logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
    logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);
    TestBed.configureTestingModule({
      imports: [
        CvAboutMeComponent,
        TextParagraphSetComponent,
        TextParagraphComponent,
        TextSubParagraphComponent,
      ],
      providers: [
        { provide: PreloaderService, useValue: preloaderServiceSpy },
        {
          provide: VisibleToLoadTextService,
          useValue: visibleToLoadTextServiceSpy,
        },
        { provide: TextService, useValue: textServiceSpy },
        { provide: LogService, useValue: logServiceGlobalSpy },
      ],
    }).compileComponents();
  }));

  describe('constructor', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(CvAboutMeComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(componentInstance)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });
  });

  describe('onResize method', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(CvAboutMeComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should be called on window resize event', () => {
      spyOn(componentInstance, 'onResize');

      window.dispatchEvent(new Event('resize'));

      expect(componentInstance.onResize)
        .withContext('onResize should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });
  describe('onScroll method', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(CvAboutMeComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should be called on window scroll event', () => {
      spyOn(componentInstance, 'onScroll');

      window.dispatchEvent(new Event('scroll'));

      expect(componentInstance.onScroll)
        .withContext('onScroll should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('getElPos method', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(CvAboutMeComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should set the min and max position of the element in the page', () => {
      componentInstance.getElPos();

      // an e2e test would be more appropriate to check the accuracy of the values
      //   const expectedPosElementMin = 0;
      //   const expectedPosElementMax = 0;

      const actualPosElementMin = componentInstance.posElementMin;
      const actualPosElementMax = componentInstance.posElementMax;

      //   expect.(actualPosElementMin).toBe(expectedPosElementMin);
      //   expect.(actualPosElementMax).toBe(expectedPosElementMax);

      expect(actualPosElementMax > actualPosElementMin)
        .withContext('min < max')
        .toBeTrue();
    });
    it('should not set the min and max position of the element in the page while loading', () => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(false);
      preloaderServiceSpy.isLoading.and.returnValue(true);
      fixture.detectChanges();

      const posElementMinBefore = componentInstance.posElementMin;
      const posElementMaxBefore = componentInstance.posElementMax;

      componentInstance.getElPos();

      const actualPosElementMin = componentInstance.posElementMin;
      const actualPosElementMax = componentInstance.posElementMax;

      expect(actualPosElementMin)
        .withContext('min should not be changed')
        .toBe(posElementMinBefore);
      expect(actualPosElementMax)
        .withContext('max should not be changed')
        .toBe(posElementMaxBefore);
    });
  });

  describe('DOM', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(CvAboutMeComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should have proper dom structure', () => {
      // loaded
      componentInstance.updateTexts();
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).withContext('1 child at root').toBe(1);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is DIV')
        .toBe('DIV');

      const firstDivEl: DebugElement = debugEl.children[0];

      expect(firstDivEl.children.length)
        .withContext('child 1 at root should have 2 children')
        .toBe(2);
      expect(firstDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of child 1 at root should be DIV')
        .toBe('DIV');
      expect(firstDivEl.children[1].nativeElement.tagName)
        .withContext(
          'child 2 of child 1 at root should be APP-TEXT-PARAGRAPH-SET'
        )
        .toBe('APP-TEXT-PARAGRAPH-SET');

      // title
      let secondDivEl: DebugElement = firstDivEl.children[0];
      expect(secondDivEl.children.length)
        .withContext('title div should have 1 child')
        .toBe(1);
      expect(secondDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of title div should be DIV')
        .toBe('DIV');
      expect(secondDivEl.children[0].children.length)
        .withContext('child 1 of title div should have 2 children')
        .toBe(2);

      expect(secondDivEl.children[0].children[0].nativeElement.tagName)
        .withContext('child 1 of child 1 of title div should be H2')
        .toBe('H2');
      expect(secondDivEl.children[0].children[0].children.length)
        .withContext('child 1 of title H2 should have no children')
        .toBe(0);
      expect(secondDivEl.children[0].children[1].nativeElement.tagName)
        .withContext('child 2 of child 1 of title div should be SPAN')
        .toBe('SPAN');
      expect(secondDivEl.children[0].children[1].children.length)
        .withContext('child 2 of title H2 should have no children')
        .toBe(0);

      // content
      secondDivEl = firstDivEl.children[1];
      expect(secondDivEl.children.length)
        .withContext('paragraphs div should have 8 children')
        .toBe(8);
      expect(
        (secondDivEl.componentInstance as TextParagraphSetComponent).paragraphs
      )
        .withContext('paragraphs should be set')
        .toBe(expectedParagraphs);

      //loading
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(false);
      preloaderServiceSpy.isLoading.and.returnValue(true);
      fixture.detectChanges();

      expect(debugEl.children.length).withContext('2 children at root').toBe(2);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');

      expect(debugEl.children[1].nativeElement.tagName)
        .withContext('child 2 at root is DIV')
        .toBe('DIV');

      const firstDivElLoading: DebugElement = debugEl.children[1];

      expect(firstDivElLoading.children.length)
        .withContext('child 1 at root should have 2 children')
        .toBe(2);
      expect(firstDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of child 1 at root should be DIV')
        .toBe('DIV');
      expect(firstDivElLoading.children[1].nativeElement.tagName)
        .withContext(
          'child 2 of child 1 at root should be APP-TEXT-PARAGRAPH-SET'
        )
        .toBe('APP-TEXT-PARAGRAPH-SET');

      // title
      let secondDivElLoading: DebugElement = firstDivElLoading.children[0];
      expect(secondDivElLoading.children.length)
        .withContext('title div should have 1 child')
        .toBe(1);
      expect(secondDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of title div should be DIV')
        .toBe('DIV');
      expect(secondDivElLoading.children[0].children.length)
        .withContext('child 1 of title div should have 2 children')
        .toBe(2);

      expect(secondDivElLoading.children[0].children[0].nativeElement.tagName)
        .withContext('child 1 of child 1 of title div should be H2')
        .toBe('H2');
      expect(secondDivElLoading.children[0].children[0].children.length)
        .withContext('child 1 of title H2 should have no children')
        .toBe(0);
      expect(secondDivElLoading.children[0].children[1].nativeElement.tagName)
        .withContext('child 2 of child 1 of title div should be SPAN')
        .toBe('SPAN');
      expect(secondDivElLoading.children[0].children[1].children.length)
        .withContext('child 2 of title H2 should have no children')
        .toBe(0);

      // content
      secondDivElLoading = firstDivElLoading.children[1];
      expect(secondDivEl.children.length)
        .withContext('paragraphs div should have 8 children')
        .toBe(8);
      expect(
        (secondDivEl.componentInstance as TextParagraphSetComponent).paragraphs
      )
        .withContext('paragraphs should be set')
        .toBe(expectedParagraphs);
    });

    it('should set title', () => {
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];
      const secondDivEl: DebugElement = firstDivEl.children[0];
      const thirdDivEl: DebugElement = secondDivEl.children[0];
      const titleH2El: DebugElement = thirdDivEl.children[0];

      const actual = titleH2El.nativeElement.innerHTML;

      expect(actual).withContext('title should be set').toBe(expectedTitle);
    });

    it('should display paragraphs', () => {
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      const firstDivEl: DebugElement = debugEl.children[0];
      const secondEl: DebugElement = firstDivEl.children[1];
      expect(
        (secondEl.componentInstance as TextParagraphSetComponent).paragraphs
      )
        .withContext('paragraphs should be set')
        .toBe(expectedParagraphs);
    });

    it('should set bar width', () => {
      componentInstance.updateTexts();
      fixture.detectChanges();

      componentInstance.updateWidth();
      const widthProperty = componentInstance.width;
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];
      const secondDivEl: DebugElement = firstDivEl.children[0];
      const thirdDivEl: DebugElement = secondDivEl.children[0];
      const barDivEl: DebugElement = thirdDivEl.children[1];

      const actual = barDivEl.styles['width'];

      expect(actual)
        .withContext('width should be set')
        .toBe(
          widthProperty.endsWith('%') ? widthProperty : widthProperty + 'px'
        );
    });
  });
});
