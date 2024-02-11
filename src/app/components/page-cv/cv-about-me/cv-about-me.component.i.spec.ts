import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { CvAboutMeComponent } from './cv-about-me.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { HttpClient } from '@angular/common/http';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { of } from 'rxjs';

describe('CvAboutMeComponent - integration', () => {
  let component: CvAboutMeComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let elementRefSpy: jasmine.SpyObj<ElementRef>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;
  const expectedTitle = 'test title';
  const expectedPdfName = 'this.is.a.test.pdf';
  let expectedParagraphs: Paragraph[] = [];

  beforeEach(() => {
    expectedParagraphs = [
      new Paragraph([new SubParagraph(SubParagraphRoot.SPAN, 'Test')], 'lead'),
      new Paragraph([], 'lead'),
      new Paragraph([new SubParagraph(SubParagraphRoot.SPAN, 'Test')], 'lead'),
      new Paragraph([new SubParagraph(SubParagraphRoot.SPAN, 'Test')], 'lead'),
      new Paragraph([new SubParagraph(SubParagraphRoot.SPAN, 'Test')], 'lead'),
      new Paragraph([new SubParagraph(SubParagraphRoot.SPAN, 'Test')], 'lead'),
      new Paragraph([new SubParagraph(SubParagraphRoot.SPAN, 'Test')], 'lead'),
      new Paragraph(
        [
          new SubParagraph(SubParagraphRoot.SPAN, 'Test'),
          new SubParagraph(
            SubParagraphRoot.A_ASSET,
            'Test',
            'pdf/' + expectedPdfName
          ),
        ],
        'lead'
      ),
    ];
    elementRefSpy = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const expectedMessagesDto = of({
      messages: [
        expectedTitle,
        expectedPdfName,
        'Test' +
          '[[]]' +
          'Test' +
          '[[]]' +
          'Test' +
          '[[]]' +
          'Test' +
          '[[]]' +
          'Test' +
          '[[]]' +
          'Test' +
          '[[]]' +
          'Test[[a_asset,Test]]',
      ],
    });
    httpClientSpy.get.and.returnValues(expectedMessagesDto);
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            PreloaderService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            PreloaderService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            PreloaderService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(CvAboutMeComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = (done: DoneFn) => {
      component.updateTexts();

      setTimeout(() => {
        const actualTitleObs = component.aboutMe;
        const actualPdfLink = component.linkToCv;
        const actualParagraphs = component.paragraphs;

        actualTitleObs.subscribe((s) => {
          expect(s).withContext('title should be set').toBe(expectedTitle);
        });
        expect(actualPdfLink)
          .withContext('pdf link should be set')
          .toBe('pdf/' + expectedPdfName);
        expect(actualParagraphs)
          .withContext('paragraphs should be set')
          .toEqual(expectedParagraphs);
        done();
      }, 2);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            PreloaderService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(CvAboutMeComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            PreloaderService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(CvAboutMeComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvAboutMeComponent,
            PreloaderService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ElementRef, useValue: elementRefSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(CvAboutMeComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
