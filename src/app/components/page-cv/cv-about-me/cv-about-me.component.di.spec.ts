import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { CvAboutMeComponent } from './cv-about-me.component';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { LogService } from 'src/app/services/log/log.service';
import { TextParagraphComponent } from '../../utilities/text-paragraph/text-paragraph.component';
import { TextSubParagraphComponent } from '../../utilities/text-sub-paragraph/text-sub-paragraph.component';
import { TextParagraphSetComponent } from '../../utilities/text-paragraph-set/text-paragraph-set.component';

describe('CvAboutMeComponent - dom integration', () => {
  let fixture: ComponentFixture<CvAboutMeComponent>;
  let componentInstance: CvAboutMeComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
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
    httpClientSpy.get.and.returnValue(expectedMessagesDto);
  });

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  };

  const shouldHaveContentSetByServiceExpectation =
    'should have content set by textService';
  const shouldHaveContentSetByService = (done: DoneFn) => {
    componentInstance.updateTexts();

    setTimeout(() => {
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];
      const secondDivEl: DebugElement = firstDivEl.children[0];
      const thirdDivEl: DebugElement = secondDivEl.children[0];
      const titleH2El: DebugElement = thirdDivEl.children[0];

      const actual = titleH2El.nativeElement.innerHTML;

      expect(actual).withContext('title should be set').toBe(expectedTitle);

      const secondEl: DebugElement = firstDivEl.children[1];
      expect(
        (secondEl.componentInstance as TextParagraphSetComponent).paragraphs
      )
        .withContext('paragraphs should be set')
        .toEqual(expectedParagraphs);
      done();
    }, 2);
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          CvAboutMeComponent,
          TextParagraphSetComponent,
          TextParagraphComponent,
          TextSubParagraphComponent,
        ],
        providers: [
          PreloaderService,
          TextService,
          LogService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvAboutMeComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          CvAboutMeComponent,
          TextParagraphSetComponent,
          TextParagraphComponent,
          TextSubParagraphComponent,
        ],
        providers: [
          PreloaderService,
          TextService,
          LogService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvAboutMeComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          CvAboutMeComponent,
          TextParagraphSetComponent,
          TextParagraphComponent,
          TextSubParagraphComponent,
        ],
        providers: [
          PreloaderService,
          TextService,
          LogService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvAboutMeComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });
});
