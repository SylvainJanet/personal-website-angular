import { DatasourceService } from '../datasource/datasource.service';
import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../language/language.service';
import { PreloaderService } from '../../preloader/preloader.service';
import { TextService } from './text.service';
import { Languages } from 'src/app/enums/languages';
import { StringDto } from 'src/app/interfaces/StringDto';
import { of, throwError } from 'rxjs';
import { SubParagraph } from 'src/app/components/classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { Paragraph } from 'src/app/components/classes/paragraph/paragraph';
import { ParagraphDecoderService } from '../../paragraphdecoder/paragraph-decoder.service';
import { HttpClient } from '@angular/common/http';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { ListStringDto } from 'src/app/interfaces/ListStringDto';

let service: TextService;
let httpClientSpy: jasmine.SpyObj<HttpClient>;
let languageServiceSpy: jasmine.SpyObj<LanguageService>;
const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;
const EXPECTED_TEXT_ERROR_MESSAGE = 'error';

describe('TextService - integration', () => {
  describe('getText method', () => {
    const shouldReturnMessageExpectation =
      'should return an observable of the message';
    const shouldReturnMessage = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      const languageToTest = Languages.ENGLISH;
      const expectedMessage = 'this is a test';

      httpClientSpy.get.and.returnValue(
        of<StringDto>({ message: expectedMessage })
      );

      service['getText'](selectorToTest, languageToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toBe(expectedMessage);
          done();
        },
        error: done.fail,
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
  });

  describe('get method', () => {
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const selectorToTest = 'test-selector';

      httpClientSpy.get.and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toBe(EXPECTED_TEXT_ERROR_MESSAGE);
          done();
        },
        error: done.fail,
      });
    };

    const shouldReturnMessageExpectation = 'should return the text';
    const shouldReturnMessage = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      const expectedMessage = 'this is a test';

      httpClientSpy.get.and.returnValue(
        of<StringDto>({ message: expectedMessage })
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toBe(expectedMessage);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: LanguageService, useValue: languageServiceSpy },
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: LanguageService, useValue: languageServiceSpy },
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: LanguageService, useValue: languageServiceSpy },
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
  });

  describe('getTextInLanguage method', () => {
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const selectorToTest = 'test-selector';

      httpClientSpy.get.and.returnValue(
        throwError(() => new Error('this is a test error'))
      );

      service.getTextInLanguage(selectorToTest, Languages.ENGLISH).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toBe(EXPECTED_TEXT_ERROR_MESSAGE);
          done();
        },
        error: done.fail,
      });
    };

    const shouldReturnMessageExpectation = 'should return the text';
    const shouldReturnMessage = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      const expectedMessage = 'this is a test';

      httpClientSpy.get.and.returnValue(
        of<StringDto>({ message: expectedMessage })
      );

      service.getTextInLanguage(selectorToTest, Languages.ENGLISH).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toBe(expectedMessage);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: LanguageService, useValue: languageServiceSpy },
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: LanguageService, useValue: languageServiceSpy },
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: LanguageService, useValue: languageServiceSpy },
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
  });

  describe('getSplit method', () => {
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      httpClientSpy.get.and.returnValue(
        throwError(() => new Error('this is a test error'))
      );

      service.getSplit(selectorToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('error message should be as expected')
            .toEqual([
              new Paragraph([
                new SubParagraph(
                  SubParagraphRoot.SPAN,
                  EXPECTED_TEXT_ERROR_MESSAGE
                ),
              ]),
            ]);
          done();
        },
        error: done.fail,
      });
    };
    const shouldReturnParagraphsExpectation = 'should return the paragraphs';
    const shouldReturnParagraphs = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      const spanContent1 = 'This is a test';
      const spanContent2 = 'this should be decoded';
      const spanContent3 = 'and this should be';
      const spanContent4 = 'and this should be the end';
      const br = 'br';
      const aText = 'text of link, right here';
      const a = `a_asset,${aText}`;
      const strongEmText = 'in bold, in strong and em subparagraph';
      const strongEm = `,${strongEmText}`;
      const spanContent5 = 'This is a new paragraph';
      const par1 =
        spanContent1 +
        `[[${br}]]` +
        spanContent2 +
        `[[${a}]]` +
        spanContent3 +
        `[[${strongEm}]]` +
        spanContent4;
      const par2 = spanContent5;
      const text = par1 + '[[]]' + par2;

      const expectedSubPar1 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent1
      );

      const expectedSubPar2 = new SubParagraph(SubParagraphRoot.BR, '');

      const expectedSubPar3 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent2
      );

      const expectedSubPar4 = new SubParagraph(SubParagraphRoot.A_ASSET, aText);

      const expectedSubPar5 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent3
      );

      const expectedSubPar6 = new SubParagraph(
        SubParagraphRoot.STRONG_EM,
        strongEmText
      );

      const expectedSubPar7 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent4
      );

      const expectedPar1 = new Paragraph([
        expectedSubPar1,
        expectedSubPar2,
        expectedSubPar3,
        expectedSubPar4,
        expectedSubPar5,
        expectedSubPar6,
        expectedSubPar7,
      ]);

      const expectedSubPar8 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent5
      );

      const expectedPar2 = new Paragraph([expectedSubPar8]);

      const expected = [expectedPar1, expectedPar2];
      httpClientSpy.get.and.returnValue(of<StringDto>({ message: text }));

      service.getSplit(selectorToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('paragraphs should be as expected')
            .toEqual(expected);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
  });

  describe('getMultiText method', () => {
    const shouldReturnMessageExpectation =
      'should return an observable of the messages';
    const shouldReturnMessage = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const languageToTest = Languages.ENGLISH;
      const expectedMessages = ['this is a test', 'this is another test'];

      httpClientSpy.get.and.returnValue(
        of<ListStringDto>({
          messages: expectedMessages,
        })
      );

      service['getMultiText'](selectorsToTest, languageToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toBe(expectedMessages);
          done();
        },
        error: done.fail,
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
  });

  describe('getMulti method', () => {
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];

      httpClientSpy.get.and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMulti(selectorsToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toEqual([
              EXPECTED_TEXT_ERROR_MESSAGE,
              EXPECTED_TEXT_ERROR_MESSAGE,
            ]);
          done();
        },
        error: done.fail,
      });
    };

    const shouldReturnMessageExpectation = 'should return the text';
    const shouldReturnMessage = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const expectedMessages = ['this is a test', 'this is another test'];

      httpClientSpy.get.and.returnValue(
        of<ListStringDto>({ messages: expectedMessages })
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMulti(selectorsToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toEqual(expectedMessages);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: LanguageService, useValue: languageServiceSpy },
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: LanguageService, useValue: languageServiceSpy },
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: LanguageService, useValue: languageServiceSpy },
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnMessageExpectation, shouldReturnMessage);
    });
  });

  describe('getMultiAllSplit method', () => {
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      httpClientSpy.get.and.returnValue(
        throwError(() => new Error('this is a test error'))
      );

      service.getMultiAllSplit(selectorsToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('error message should be as expected')
            .toEqual([
              [
                new Paragraph([
                  new SubParagraph(
                    SubParagraphRoot.SPAN,
                    EXPECTED_TEXT_ERROR_MESSAGE
                  ),
                ]),
              ],
              [
                new Paragraph([
                  new SubParagraph(
                    SubParagraphRoot.SPAN,
                    EXPECTED_TEXT_ERROR_MESSAGE
                  ),
                ]),
              ],
            ]);
          done();
        },
        error: done.fail,
      });
    };
    const shouldReturnParagraphsExpectation = 'should return the paragraphs';
    const shouldReturnParagraphs = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const spanContent1 = 'This is a test';
      const spanContent2 = 'this should be decoded';
      const spanContent3 = 'and this should be';
      const spanContent4 = 'and this should be the end';
      const br = 'br';
      const aText = 'text of link, right here';
      const a = `a_asset,${aText}`;
      const strongEmText = 'in bold, in strong and em subparagraph';
      const strongEm = `,${strongEmText}`;
      const spanContent5 = 'This is a new paragraph';
      const par1 =
        spanContent1 +
        `[[${br}]]` +
        spanContent2 +
        `[[${a}]]` +
        spanContent3 +
        `[[${strongEm}]]` +
        spanContent4;
      const par2 = spanContent5;
      const text = par1 + '[[]]' + par2;
      const text2 = 'this is for the second selector';

      const expectedSubPar1 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent1
      );

      const expectedSubPar2 = new SubParagraph(SubParagraphRoot.BR, '');

      const expectedSubPar3 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent2
      );

      const expectedSubPar4 = new SubParagraph(SubParagraphRoot.A_ASSET, aText);

      const expectedSubPar5 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent3
      );

      const expectedSubPar6 = new SubParagraph(
        SubParagraphRoot.STRONG_EM,
        strongEmText
      );

      const expectedSubPar7 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent4
      );

      const expectedPar1 = new Paragraph([
        expectedSubPar1,
        expectedSubPar2,
        expectedSubPar3,
        expectedSubPar4,
        expectedSubPar5,
        expectedSubPar6,
        expectedSubPar7,
      ]);

      const expectedSubPar8 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent5
      );

      const expectedPar2 = new Paragraph([expectedSubPar8]);

      const expected1 = [expectedPar1, expectedPar2];

      const expectedOtherPar = new Paragraph([
        new SubParagraph(SubParagraphRoot.SPAN, text2),
      ]);

      const expected2 = [expectedOtherPar];

      const expected = [expected1, expected2];
      httpClientSpy.get.and.returnValue(
        of<ListStringDto>({ messages: [text, text2] })
      );

      service.getMultiAllSplit(selectorsToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('paragraphs should be as expected')
            .toEqual(expected);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
  });

  describe('getMultiSomeBooleanSplit method', () => {
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const isSplitInput = [true, false];
      httpClientSpy.get.and.returnValue(
        throwError(() => new Error('this is a test error'))
      );

      service['getMultiSomeBooleanSplit'](
        selectorsToTest,
        isSplitInput
      ).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('error message should be as expected')
            .toEqual([
              [
                new Paragraph([
                  new SubParagraph(
                    SubParagraphRoot.SPAN,
                    EXPECTED_TEXT_ERROR_MESSAGE
                  ),
                ]),
              ],
              EXPECTED_TEXT_ERROR_MESSAGE,
            ]);
          done();
        },
        error: done.fail,
      });
    };
    const shouldReturnParagraphsExpectation = 'should return the paragraphs';
    const shouldReturnParagraphs = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const spanContent1 = 'This is a test';
      const spanContent2 = 'this should be decoded';
      const spanContent3 = 'and this should be';
      const spanContent4 = 'and this should be the end';
      const br = 'br';
      const aText = 'text of link, right here';
      const a = `a_asset,${aText}`;
      const strongEmText = 'in bold, in strong and em subparagraph';
      const strongEm = `,${strongEmText}`;
      const spanContent5 = 'This is a new paragraph';
      const par1 =
        spanContent1 +
        `[[${br}]]` +
        spanContent2 +
        `[[${a}]]` +
        spanContent3 +
        `[[${strongEm}]]` +
        spanContent4;
      const par2 = spanContent5;
      const text = par1 + '[[]]' + par2;
      const text2 = 'this is for the second selector';
      const isSplitInput = [true, false];

      const expectedSubPar1 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent1
      );

      const expectedSubPar2 = new SubParagraph(SubParagraphRoot.BR, '');

      const expectedSubPar3 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent2
      );

      const expectedSubPar4 = new SubParagraph(SubParagraphRoot.A_ASSET, aText);

      const expectedSubPar5 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent3
      );

      const expectedSubPar6 = new SubParagraph(
        SubParagraphRoot.STRONG_EM,
        strongEmText
      );

      const expectedSubPar7 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent4
      );

      const expectedPar1 = new Paragraph([
        expectedSubPar1,
        expectedSubPar2,
        expectedSubPar3,
        expectedSubPar4,
        expectedSubPar5,
        expectedSubPar6,
        expectedSubPar7,
      ]);

      const expectedSubPar8 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent5
      );

      const expectedPar2 = new Paragraph([expectedSubPar8]);

      const expected1 = [expectedPar1, expectedPar2];

      const expected = [expected1, text2];
      httpClientSpy.get.and.returnValue(
        of<ListStringDto>({ messages: [text, text2] })
      );

      service['getMultiSomeBooleanSplit'](
        selectorsToTest,
        isSplitInput
      ).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('paragraphs should be as expected')
            .toEqual(expected);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
  });

  describe('getMultiSomeSplit method', () => {
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const input = [
        { selector: 'test-selector', isSplit: true },
        { selector: 'other-test-selector', isSplit: false },
      ];
      httpClientSpy.get.and.returnValue(
        throwError(() => new Error('this is a test error'))
      );

      service.getMultiSomeSplit(input).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('error message should be as expected')
            .toEqual([
              [
                new Paragraph([
                  new SubParagraph(
                    SubParagraphRoot.SPAN,
                    EXPECTED_TEXT_ERROR_MESSAGE
                  ),
                ]),
              ],
              EXPECTED_TEXT_ERROR_MESSAGE,
            ]);
          done();
        },
        error: done.fail,
      });
    };
    const shouldReturnParagraphsExpectation = 'should return the paragraphs';
    const shouldReturnParagraphs = (done: DoneFn) => {
      const input = [
        { selector: 'test-selector', isSplit: true },
        { selector: 'other-test-selector', isSplit: false },
      ];
      const spanContent1 = 'This is a test';
      const spanContent2 = 'this should be decoded';
      const spanContent3 = 'and this should be';
      const spanContent4 = 'and this should be the end';
      const br = 'br';
      const aText = 'text of link, right here';
      const a = `a_asset,${aText}`;
      const strongEmText = 'in bold, in strong and em subparagraph';
      const strongEm = `,${strongEmText}`;
      const spanContent5 = 'This is a new paragraph';
      const par1 =
        spanContent1 +
        `[[${br}]]` +
        spanContent2 +
        `[[${a}]]` +
        spanContent3 +
        `[[${strongEm}]]` +
        spanContent4;
      const par2 = spanContent5;
      const text = par1 + '[[]]' + par2;
      const text2 = 'this is for the second selector';

      const expectedSubPar1 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent1
      );

      const expectedSubPar2 = new SubParagraph(SubParagraphRoot.BR, '');

      const expectedSubPar3 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent2
      );

      const expectedSubPar4 = new SubParagraph(SubParagraphRoot.A_ASSET, aText);

      const expectedSubPar5 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent3
      );

      const expectedSubPar6 = new SubParagraph(
        SubParagraphRoot.STRONG_EM,
        strongEmText
      );

      const expectedSubPar7 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent4
      );

      const expectedPar1 = new Paragraph([
        expectedSubPar1,
        expectedSubPar2,
        expectedSubPar3,
        expectedSubPar4,
        expectedSubPar5,
        expectedSubPar6,
        expectedSubPar7,
      ]);

      const expectedSubPar8 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent5
      );

      const expectedPar2 = new Paragraph([expectedSubPar8]);

      const expected1 = [expectedPar1, expectedPar2];

      const expected = [expected1, text2];
      httpClientSpy.get.and.returnValue(
        of<ListStringDto>({ messages: [text, text2] })
      );

      service.getMultiSomeSplit(input).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('paragraphs should be as expected')
            .toEqual(expected);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
          providers: [
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            LanguageService,
            PreloaderService,
            ParagraphDecoderService,
            TextService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnParagraphsExpectation, shouldReturnParagraphs);
    });
  });
});
