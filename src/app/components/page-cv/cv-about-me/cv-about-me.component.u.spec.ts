import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { BehaviorSubject, of } from 'rxjs';
import { CvAboutMeComponent } from './cv-about-me.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';

describe('CvAboutMeComponent - unit', () => {
  let cvAboutMeComponent: CvAboutMeComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let elementRefSpy: jasmine.SpyObj<ElementRef>;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const titleSelector = 'about-me-title';
  const cvFileNameSelector = 'cv-file-name';
  const aboutMeContentSelector = 'about-me-content';
  const expectedTitle = 'test title';
  const expectedPdfName = 'this.is.a.test.pdf';
  let expectedParagraphs: Paragraph[];

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
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(cvAboutMeComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(cvAboutMeComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
      expect(cvAboutMeComponent.logger)
        .withContext('logger should be set')
        .toBe(logServiceSpy);

      expect(cvAboutMeComponent.width)
        .withContext('width should be set')
        .toBe('0');
      expect(cvAboutMeComponent.posElementMin)
        .withContext('posElementMin should be set')
        .toBe(0);
      expect(cvAboutMeComponent.posElementMax)
        .withContext('posElementMax should be set')
        .toBe(0);
      cvAboutMeComponent.aboutMe.subscribe((s) => {
        expect(s).withContext('aboutMe should be set').toBe('');
      });
      expect(cvAboutMeComponent.linkToCv)
        .withContext('linkToCv should be set')
        .toBe('');
      expect(cvAboutMeComponent.paragraphs)
        .withContext('paragraphs should be set')
        .toEqual([]);
    };

    const shouldSetProperLoggerExpectation = 'should set proper logger';
    const shouldSetProperLogger = () => {
      const expected = 'CvAboutMeComponent';
      expect(logServiceGlobalSpy.withClassName)
        .withContext('withClassName should have been called')
        .toHaveBeenCalledOnceWith(expected);
    };

    const shouldSubscribeToVisibleToLoadTextServiceExpectation =
      'should subscribe to the visibleToLoadTextService';
    const shouldSubscribeToVisibleToLoadTextService = (done: DoneFn) => {
      setTimeout(() => {
        expect(visibleToLoadTextServiceSpy.subscribe)
          .withContext('subscribe should have been called')
          .toHaveBeenCalledOnceWith(cvAboutMeComponent);
        done();
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(shouldSetProperLoggerExpectation, shouldSetProperLogger);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(shouldSetProperLoggerExpectation, shouldSetProperLogger);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(shouldSetProperLoggerExpectation, shouldSetProperLogger);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
  });

  describe('updateTexts', () => {
    const shouldCallTextServiceExpectation = 'should call the textService';
    const shouldCallTextService = () => {
      cvAboutMeComponent.updateTexts();
      expect(textServiceSpy.getMultiSomeSplit)
        .withContext(
          'getMultiSomeSplit should have been called 1 time with proper arguments'
        )
        .toHaveBeenCalledOnceWith([
          { selector: titleSelector, isSplit: false },
          { selector: cvFileNameSelector, isSplit: false },
          { selector: aboutMeContentSelector, isSplit: true },
        ]);
    };

    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
      cvAboutMeComponent.updateTexts();

      const actualTitleObs = cvAboutMeComponent.aboutMe;
      const actualCvFileName = cvAboutMeComponent.linkToCv;
      const actualAboutMeContent = cvAboutMeComponent.paragraphs;

      actualTitleObs.subscribe((s) => {
        expect(s).withContext('width should be set').toBe(expectedTitle);
      });
      expect(actualCvFileName)
        .withContext('cv file name should be set')
        .toBe('pdf/' + expectedPdfName);
      expect(actualAboutMeContent)
        .withContext('about me content should be set')
        .toBe(expectedParagraphs);
    };

    const shouldInsertNewParagraphAtIndex1Expectation =
      'should insert a new paragraph at index 1';
    const shouldInsertNewParagraphAtIndex1 = () => {
      cvAboutMeComponent.updateTexts();

      const actualAboutMeContent = cvAboutMeComponent.paragraphs;
      expect(actualAboutMeContent[1].els.length)
        .withContext('first paragraph should have no elements')
        .toBe(0);
    };

    const shouldAddCssClassToParagraphsExpectation =
      'should add cssClass to all paragraphs';
    const shouldAddCssClassToParagraphs = () => {
      cvAboutMeComponent.updateTexts();

      const actualAboutMeContent = cvAboutMeComponent.paragraphs;
      expect(actualAboutMeContent.length)
        .withContext('there should be paragraphs')
        .not.toBe(0);
      actualAboutMeContent.forEach((p) => {
        expect(p.cssClass)
          .withContext("cssClass should be 'lead'")
          .toBe('lead');
      });
    };

    const shouldAddLinkToCvExpectation =
      'should add link to cv to the proper paragraph';
    const shouldAddLinkToCv = () => {
      cvAboutMeComponent.updateTexts();

      const actualAboutMeContent = cvAboutMeComponent.paragraphs;
      expect(actualAboutMeContent[6].els[1].assetHref)
        .withContext('assetHref should be set')
        .toBe('pdf/' + expectedPdfName);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
      it(
        shouldInsertNewParagraphAtIndex1Expectation,
        shouldInsertNewParagraphAtIndex1
      );
      it(
        shouldAddCssClassToParagraphsExpectation,
        shouldAddCssClassToParagraphs
      );
      it(shouldAddLinkToCvExpectation, shouldAddLinkToCv);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
      it(
        shouldInsertNewParagraphAtIndex1Expectation,
        shouldInsertNewParagraphAtIndex1
      );
      it(
        shouldAddCssClassToParagraphsExpectation,
        shouldAddCssClassToParagraphs
      );
      it(shouldAddLinkToCvExpectation, shouldAddLinkToCv);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
      it(
        shouldInsertNewParagraphAtIndex1Expectation,
        shouldInsertNewParagraphAtIndex1
      );
      it(
        shouldAddCssClassToParagraphsExpectation,
        shouldAddCssClassToParagraphs
      );
      it(shouldAddLinkToCvExpectation, shouldAddLinkToCv);
    });
  });

  describe('ngOnDestroy', () => {
    const shouldUnsubscribeExpectation =
      'should unsubscribe from the visibleToLoadTextService';
    const shouldUnsubscribe = () => {
      cvAboutMeComponent.ngOnDestroy();
      expect(visibleToLoadTextServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(cvAboutMeComponent);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
  });

  describe('updateWidth method', () => {
    const shouldSetTo0IfScrollYLessThanMinExpectation =
      'should set to 0 if scrollY is less than min';
    const shouldSetTo0IfScrollYLessThanMin = () => {
      cvAboutMeComponent.posElementMin = 10;
      cvAboutMeComponent.posElementMax = 20;

      scrollY = 5;

      cvAboutMeComponent.updateWidth();
      expect(cvAboutMeComponent.width)
        .withContext('width should be set')
        .toBe('0');
    };

    const shouldSetTo0IfScrollYMoreThanMaxExpectation =
      'should set to 0 if scrollY is more than max';
    const shouldSetTo0IfScrollYMoreThanMax = () => {
      cvAboutMeComponent.posElementMin = 10;
      cvAboutMeComponent.posElementMax = 20;

      scrollY = 25;

      cvAboutMeComponent.updateWidth();
      expect(cvAboutMeComponent.width)
        .withContext('width should be set')
        .toBe('0');
    };
    const shouldSetTo75IfScrollYBetweenMinMaxExpectation =
      'should set to 75% if scrollY is between min and max';
    const shouldSetTo75IfScrollYBetweenMinMax = () => {
      cvAboutMeComponent.posElementMin = 10;
      cvAboutMeComponent.posElementMax = 20;

      scrollY = 15;

      cvAboutMeComponent.updateWidth();
      expect(cvAboutMeComponent.width)
        .withContext('width should be set')
        .toBe('75%');
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(
        shouldSetTo0IfScrollYLessThanMinExpectation,
        shouldSetTo0IfScrollYLessThanMin
      );
      it(
        shouldSetTo0IfScrollYMoreThanMaxExpectation,
        shouldSetTo0IfScrollYMoreThanMax
      );
      it(
        shouldSetTo75IfScrollYBetweenMinMaxExpectation,
        shouldSetTo75IfScrollYBetweenMinMax
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(
        shouldSetTo0IfScrollYLessThanMinExpectation,
        shouldSetTo0IfScrollYLessThanMin
      );
      it(
        shouldSetTo0IfScrollYMoreThanMaxExpectation,
        shouldSetTo0IfScrollYMoreThanMax
      );
      it(
        shouldSetTo75IfScrollYBetweenMinMaxExpectation,
        shouldSetTo75IfScrollYBetweenMinMax
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(
        shouldSetTo0IfScrollYLessThanMinExpectation,
        shouldSetTo0IfScrollYLessThanMin
      );
      it(
        shouldSetTo0IfScrollYMoreThanMaxExpectation,
        shouldSetTo0IfScrollYMoreThanMax
      );
      it(
        shouldSetTo75IfScrollYBetweenMinMaxExpectation,
        shouldSetTo75IfScrollYBetweenMinMax
      );
    });
  });

  describe('onResize method', () => {
    const shouldCallUpdateAfterLoadedExpectation =
      'should call updateAfterLoaded method';
    const shouldCallUpdateAfterLoaded = () => {
      spyOn(cvAboutMeComponent, 'updateAfterLoaded');

      cvAboutMeComponent.onResize();

      expect(cvAboutMeComponent.updateAfterLoaded)
        .withContext('updateAfterLoaded should have been called')
        .toHaveBeenCalledTimes(1);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallUpdateAfterLoadedExpectation, shouldCallUpdateAfterLoaded);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallUpdateAfterLoadedExpectation, shouldCallUpdateAfterLoaded);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallUpdateAfterLoadedExpectation, shouldCallUpdateAfterLoaded);
    });
  });

  describe('onScroll method', () => {
    const shouldCallUpdateAfterLoadedExpectation =
      'should call updateAfterLoaded method';
    const shouldCallUpdateAfterLoaded = () => {
      spyOn(cvAboutMeComponent, 'updateAfterLoaded');

      cvAboutMeComponent.onScroll();

      expect(cvAboutMeComponent.updateAfterLoaded)
        .withContext('updateAfterLoaded should have been called')
        .toHaveBeenCalledTimes(1);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallUpdateAfterLoadedExpectation, shouldCallUpdateAfterLoaded);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallUpdateAfterLoadedExpectation, shouldCallUpdateAfterLoaded);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallUpdateAfterLoadedExpectation, shouldCallUpdateAfterLoaded);
    });
  });

  describe('updateAfterLoaded method', () => {
    const shouldCallPreloaderServiceExpectation =
      'should call preloaderService';
    const shouldCallPreloaderService = () => {
      const bs = jasmine.createSpyObj('BehaviorSubject<boolean | null>', [
        'subscribe',
      ]);
      (
        Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
          ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
      ).and.returnValue(bs);

      cvAboutMeComponent.updateAfterLoaded();

      expect(preloaderServiceSpy.statusAnyLoading.subscribe)
        .withContext('subscribe should have been called')
        .toHaveBeenCalledTimes(1);
    };
    const shouldCallMethodsWhenAssetsAreLoadedExpectation =
      'should call getElPos and UpdateWidth when all assets are loaded';
    const shouldCallMethodsWhenAssetsAreLoaded = () => {
      spyOn(cvAboutMeComponent, 'getElPos');
      spyOn(cvAboutMeComponent, 'updateWidth');

      const bs = new BehaviorSubject<boolean | null>(null);
      (
        Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
          ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
      ).and.returnValue(bs);

      cvAboutMeComponent.updateAfterLoaded();

      expect(cvAboutMeComponent.getElPos)
        .withContext('getElPos should not have been called - 1')
        .not.toHaveBeenCalled();
      expect(cvAboutMeComponent.updateWidth)
        .withContext('updateWidth should not have been called - 1')
        .not.toHaveBeenCalled();

      bs.next(true);
      expect(cvAboutMeComponent.getElPos)
        .withContext('getElPos should not have been called - 2')
        .not.toHaveBeenCalled();
      expect(cvAboutMeComponent.updateWidth)
        .withContext('updateWidth should not have been called - 2')
        .not.toHaveBeenCalled();

      bs.next(false);
      expect(cvAboutMeComponent.getElPos)
        .withContext('getElPos should have been called once')
        .toHaveBeenCalledTimes(1);
      expect(cvAboutMeComponent.updateWidth)
        .withContext('updateWidth should have been called once')
        .toHaveBeenCalledTimes(1);

      bs.next(false);
      expect(cvAboutMeComponent.getElPos)
        .withContext('getElPos should have been called twice')
        .toHaveBeenCalledTimes(2);
      expect(cvAboutMeComponent.updateWidth)
        .withContext('updateWidth should have been called twice')
        .toHaveBeenCalledTimes(2);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: devEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallPreloaderServiceExpectation, shouldCallPreloaderService);
      it(
        shouldCallMethodsWhenAssetsAreLoadedExpectation,
        shouldCallMethodsWhenAssetsAreLoaded
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallPreloaderServiceExpectation, shouldCallPreloaderService);
      it(
        shouldCallMethodsWhenAssetsAreLoadedExpectation,
        shouldCallMethodsWhenAssetsAreLoaded
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        preloaderServiceSpy = jasmine.createSpyObj(
          'PreloaderService',
          [],
          ['statusAnyLoading']
        );
        (
          Object.getOwnPropertyDescriptor(
            preloaderServiceSpy,
            'statusAnyLoading'
          )?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
        ).and.returnValue(new BehaviorSubject<boolean | null>(null));
        elementRefSpy = jasmine.createSpyObj(
          'ElementRef',
          [],
          ['nativeElement']
        );

        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getMultiSomeSplit',
        ]);
        textServiceSpy.getMultiSomeSplit.and.returnValue(
          of([expectedTitle, expectedPdfName, expectedParagraphs])
        );
        logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
          'withClassName',
        ]);
        logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
        logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );

        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: LogService, useValue: logServiceGlobalSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        cvAboutMeComponent = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCallPreloaderServiceExpectation, shouldCallPreloaderService);
      it(
        shouldCallMethodsWhenAssetsAreLoadedExpectation,
        shouldCallMethodsWhenAssetsAreLoaded
      );
    });
  });
});
