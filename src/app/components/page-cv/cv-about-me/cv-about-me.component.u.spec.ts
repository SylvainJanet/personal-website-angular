import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { BehaviorSubject, of } from 'rxjs';
import { CvAboutMeComponent } from './cv-about-me.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';

describe('CvAboutMeComponent - unit', () => {
  let cvAboutMeComponent: CvAboutMeComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let elementRefSpy: jasmine.SpyObj<ElementRef>;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;
  const titleSelector = 'about-me-title';
  const cvFileNameSelector = 'cv-file-name';
  const aboutMeContentSelector = 'about-me-content';
  const expectedTitle = 'test title';
  const expectedPdfName = 'this.is.a.test.pdf';
  let expectedParagraphs: Paragraph[] = [];

  beforeEach(() => {
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
    elementRefSpy = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
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
      providers: [
        CvAboutMeComponent,
        { provide: PreloaderService, useValue: preloaderServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
        { provide: ElementRef, useValue: elementRefSpy },
        { provide: LogService, useValue: logServiceGlobalSpy },
      ],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      spyOn(CvAboutMeComponent.prototype, 'updateTexts');
      cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
    });
    it('should create', () => {
      expect(cvAboutMeComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(cvAboutMeComponent).toBeTruthy();
      expect(cvAboutMeComponent.logger).toBe(logServiceSpy);

      expect(cvAboutMeComponent.width).toBe('0');
      expect(cvAboutMeComponent.posElementMin).toBe(0);
      expect(cvAboutMeComponent.posElementMax).toBe(0);
      cvAboutMeComponent.aboutMe.subscribe((s) => {
        expect(s).toBe('');
      });
      expect(cvAboutMeComponent.linkToCv).toBe('');
      expect(cvAboutMeComponent.paragraphs).toEqual([]);
    });

    it('should set proper logger', () => {
      const expected = 'CvAboutMeComponent';
      expect(logServiceGlobalSpy.withClassName).toHaveBeenCalledOnceWith(
        expected
      );
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe).toHaveBeenCalledOnceWith(
        cvAboutMeComponent
      );
    });

    it('should update the texts', () => {
      expect(cvAboutMeComponent.updateTexts).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get).toHaveBeenCalledTimes(2);
      expect(textServiceSpy.get).toHaveBeenCalledWith(titleSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(cvFileNameSelector);
      expect(textServiceSpy.getSplit).toHaveBeenCalledTimes(1);
      expect(textServiceSpy.getSplit).toHaveBeenCalledWith(
        aboutMeContentSelector
      );
    });
    it('should set the properties to the textService result', () => {
      const actualTitleObs = cvAboutMeComponent.aboutMe;
      const actualCvFileName = cvAboutMeComponent.linkToCv;
      const actualAboutMeContent = cvAboutMeComponent.paragraphs;

      actualTitleObs.subscribe((s) => {
        expect(s).toBe(expectedTitle);
      });
      expect(actualCvFileName).toBe('pdf/' + expectedPdfName);
      expect(actualAboutMeContent).toBe(expectedParagraphs);
    });
    it('should insert a new paragraph at index 1', () => {
      const actualAboutMeContent = cvAboutMeComponent.paragraphs;
      expect(actualAboutMeContent[1].els.length).toBe(0);
    });
    it('should add cssClass to all paragraphs', () => {
      const actualAboutMeContent = cvAboutMeComponent.paragraphs;
      actualAboutMeContent.forEach((p) => {
        expect(p.cssClass).toBe('lead');
      });
    });
    it('should add link to cv to the proper paragraph', () => {
      const actualAboutMeContent = cvAboutMeComponent.paragraphs;
      expect(actualAboutMeContent[6].els[1].assetHref).toBe(
        'pdf/' + expectedPdfName
      );
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
    });
    it('should unsubscribe from the languageService', () => {
      cvAboutMeComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe).toHaveBeenCalledOnceWith(
        cvAboutMeComponent
      );
    });
  });

  describe('updateWidth method', () => {
    beforeEach(() => {
      cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
    });
    it('should set to 0 if scrollY is less than min', () => {
      cvAboutMeComponent.posElementMin = 10;
      cvAboutMeComponent.posElementMax = 20;

      scrollY = 5;

      cvAboutMeComponent.updateWidth();
      expect(cvAboutMeComponent.width).toBe('0');
    });
    it('should set to 0 if scrollY is more than max', () => {
      cvAboutMeComponent.posElementMin = 10;
      cvAboutMeComponent.posElementMax = 20;

      scrollY = 25;

      cvAboutMeComponent.updateWidth();
      expect(cvAboutMeComponent.width).toBe('0');
    });
    it('should set to 75% if scrollY is between min and max', () => {
      cvAboutMeComponent.posElementMin = 10;
      cvAboutMeComponent.posElementMax = 20;

      scrollY = 15;

      cvAboutMeComponent.updateWidth();
      expect(cvAboutMeComponent.width).toBe('75%');
    });
  });

  describe('onResize method', () => {
    beforeEach(() => {
      cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
    });
    it('should call updateAfterLoaded method', () => {
      spyOn(cvAboutMeComponent, 'updateAfterLoaded');

      cvAboutMeComponent.onResize();

      expect(cvAboutMeComponent.updateAfterLoaded).toHaveBeenCalledTimes(1);
    });
  });

  describe('onScroll method', () => {
    beforeEach(() => {
      cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
    });
    it('should call updateAfterLoaded method', () => {
      spyOn(cvAboutMeComponent, 'updateAfterLoaded');

      cvAboutMeComponent.onScroll();

      expect(cvAboutMeComponent.updateAfterLoaded).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateAfterLoaded method', () => {
    beforeEach(() => {
      cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
    });
    it('should call preloaderService', () => {
      const bs = jasmine.createSpyObj('BehaviorSubject<boolean | null>', [
        'subscribe',
      ]);
      (
        Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
          ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
      ).and.returnValue(bs);

      cvAboutMeComponent.updateAfterLoaded();

      expect(
        preloaderServiceSpy.statusAnyLoading.subscribe
      ).toHaveBeenCalledTimes(1);
    });
    it('should call getElPos and UpdateWidth when all assets are loaded', () => {
      spyOn(cvAboutMeComponent, 'getElPos');
      spyOn(cvAboutMeComponent, 'updateWidth');

      const bs = new BehaviorSubject<boolean | null>(null);
      (
        Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
          ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
      ).and.returnValue(bs);

      cvAboutMeComponent.updateAfterLoaded();

      expect(cvAboutMeComponent.getElPos).not.toHaveBeenCalled();
      expect(cvAboutMeComponent.updateWidth).not.toHaveBeenCalled();

      bs.next(true);
      expect(cvAboutMeComponent.getElPos).not.toHaveBeenCalled();
      expect(cvAboutMeComponent.updateWidth).not.toHaveBeenCalled();

      bs.next(false);
      expect(cvAboutMeComponent.getElPos).toHaveBeenCalledTimes(1);
      expect(cvAboutMeComponent.updateWidth).toHaveBeenCalledTimes(1);

      bs.next(false);
      expect(cvAboutMeComponent.getElPos).toHaveBeenCalledTimes(2);
      expect(cvAboutMeComponent.updateWidth).toHaveBeenCalledTimes(2);
    });
  });

  // describe('ngAfterContentInit method', () => {
  //   beforeEach(() => {
  //     cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
  //   });
  //   it('should call updateAfterLoaded method', () => {
  //     spyOn(cvAboutMeComponent, 'updateAfterLoaded');

  //     cvAboutMeComponent.ngAfterContentInit();

  //     expect(cvAboutMeComponent.updateAfterLoaded).toHaveBeenCalledTimes(1);
  //   });
  // });
});
