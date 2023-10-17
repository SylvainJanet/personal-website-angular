import { DatasourceService } from '../datasource/datasource.service';
import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../language/language.service';
import { PreloaderService } from '../../preloader/preloader.service';
import { TextService } from './text.service';
import { Languages } from 'src/app/enums/languages';
import { StringDto } from 'src/app/interfaces/StringDto';
import { of, throwError } from 'rxjs';
import { Preloaders } from '../../preloader/preloaders/preloaders';
import { SubParagraph } from 'src/app/components/classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { Paragraph } from 'src/app/components/classes/paragraph/paragraph';
import { ParagraphDecoderService } from '../../paragraphdecoder/paragraph-decoder.service';
import { ListStringDto } from 'src/app/interfaces/ListStringDto';

let textService: TextService;
let datasourceServiceSpy: jasmine.SpyObj<DatasourceService>;
let languageServiceSpy: jasmine.SpyObj<LanguageService>;
let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
let paragraphDecoderServiceSpy: jasmine.SpyObj<ParagraphDecoderService>;
const API_TEXT_PATH = 'text';
const API_MULTI_TEXT_PATH = 'multi-text';
const API_SELECTOR_PARAM = 'selector';
const API_MULTI_SELECTOR_PARAM = 'selectors';
const API_LANGUAGE_PARAM = 'language';
const EXPECTED_TEXT_ERROR_MESSAGE = 'error';
const ENGLISH_LANGUAGE_NAME_SELECTOR = 'english-language-name';
const FRENCH_LANGUAGE_NAME_SELECTOR = 'french-language-name';

describe('TextService - unit', () => {
  beforeEach(() => {
    datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', ['get']);
    languageServiceSpy = jasmine.createSpyObj('LanguageService', ['current']);
    preloaderServiceSpy = jasmine.createSpyObj('PreloaderService', [
      'toLoad',
      'loaded',
    ]);
    paragraphDecoderServiceSpy = jasmine.createSpyObj(
      'ParagraphDecoderService',
      ['decode']
    );
    TestBed.configureTestingModule({
      providers: [
        { provide: DatasourceService, useValue: datasourceServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: PreloaderService, useValue: preloaderServiceSpy },
        {
          provide: ParagraphDecoderService,
          useValue: paragraphDecoderServiceSpy,
        },
        TextService,
      ],
    });

    textService = TestBed.inject(TextService);
  });
  describe('getText method', () => {
    it('should use the datasource correctly', () => {
      const selectorToTest = 'test-selector';
      const languageToTest = Languages.ENGLISH;

      datasourceServiceSpy.get.and.returnValue(
        of<StringDto>({ message: 'this is a test' })
      );

      textService['getText'](selectorToTest, languageToTest);

      expect(datasourceServiceSpy.get)
        .withContext('get should have been called')
        .toHaveBeenCalledOnceWith(API_TEXT_PATH, jasmine.any(Object));

      expect(datasourceServiceSpy.get.calls.mostRecent().args[1])
        .withContext(
          'get should have been called with the proper arguments - 1'
        )
        .toEqual(jasmine.anything());
      expect(
        datasourceServiceSpy.get.calls
          .mostRecent()
          .args[1]?.get(API_SELECTOR_PARAM)
      )
        .withContext(
          'get should have been called with the proper arguments - 2'
        )
        .toEqual(jasmine.anything());
      expect(
        datasourceServiceSpy.get.calls
          .mostRecent()
          .args[1]?.get(API_SELECTOR_PARAM)
      )
        .withContext(
          'get should have been called with the proper arguments - 3'
        )
        .toBe(selectorToTest);
      expect(
        datasourceServiceSpy.get.calls
          .mostRecent()
          .args[1]?.get(API_LANGUAGE_PARAM)
      )
        .withContext(
          'get should have been called with the proper arguments - 4'
        )
        .toEqual(jasmine.anything());
      expect(
        datasourceServiceSpy.get.calls
          .mostRecent()
          .args[1]?.get(API_LANGUAGE_PARAM)
      )
        .withContext(
          'get should have been called with the proper arguments - 5'
        )
        .toBe(Languages[languageToTest]);
    });
    it('should return an observable of the message', (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      const languageToTest = Languages.ENGLISH;
      const expectedMessage = 'this is a test';

      datasourceServiceSpy.get.and.returnValue(
        of<StringDto>({ message: expectedMessage })
      );

      textService['getText'](selectorToTest, languageToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toBe(expectedMessage);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('get method', () => {
    it('should notify the TEXTS preloader that a text has to load on subscription', () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of('this is a test'));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.get(selectorToTest).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should not notify the TEXTS preloader that a text has to load without subscribers', () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of('this is a test'));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.get(selectorToTest);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    });
    it('should call getText method', () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of('this is a test'));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.get(selectorToTest);

      expect(textService['getText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(selectorToTest, languageServiceSpy.current());
    });
    it('should notify the TEXTS preloader that a text has loaded', () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of('this is a test'));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.get(selectorToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should notify the TEXTS preloader that a text has loaded on error', () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.get(selectorToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should return an error message on error', (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.get(selectorToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('error message should be as expected')
            .toBe(EXPECTED_TEXT_ERROR_MESSAGE);
          done();
        },
        error: done.fail,
      });
    });
    it('should return the text', (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      const expectedMessage = 'this is a test';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of(expectedMessage));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.get(selectorToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('text should be as expected')
            .toBe(expectedMessage);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('getOtherLanguage method', () => {
    it('should call getText correctly when the current language is FRENCH', () => {
      languageServiceSpy.current.and.returnValue(Languages.FRENCH);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of('this is a test'));

      textService.getOtherLanguage();

      expect(textService['getText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(
          ENGLISH_LANGUAGE_NAME_SELECTOR,
          Languages.ENGLISH
        );
    });
    it('should call getText correctly when the current language is ENGLISH', () => {
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of('this is a test'));

      textService.getOtherLanguage();

      expect(textService['getText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(
          FRENCH_LANGUAGE_NAME_SELECTOR,
          Languages.FRENCH
        );
    });
    it('should return the other language when the current language is FRENCH', (done: DoneFn) => {
      const expectedText = 'this is a test';
      languageServiceSpy.current.and.returnValue(Languages.FRENCH);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of(expectedText));

      textService.getOtherLanguage().subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('other language should be as expected')
            .toBe(expectedText);
          done();
        },
        error: done.fail,
      });
    });
    it('should return the other language when the current language is ENGLISH', (done: DoneFn) => {
      const expectedText = 'this is a test';
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of(expectedText));

      textService.getOtherLanguage().subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('other language should be as expected')
            .toBe(expectedText);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('getSplit method', () => {
    it('should notify the TEXTS preloader that a text has to load on subscription', () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getSplit(selectorToTest).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should not notify the TEXTS preloader that a text has to load without subscribers', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getSplit(selectorToTest);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    });
    it('should call getText method', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getSplit(selectorToTest);

      expect(textService['getText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(selectorToTest, languageServiceSpy.current());
    });
    it('should notify the TEXTS preloader that a text has loaded', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getSplit(selectorToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should notify the TEXTS preloader that a text has loaded on error', () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getSplit(selectorToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should return an error message on error', (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValue([
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, EXPECTED_TEXT_ERROR_MESSAGE),
        ]),
      ]);

      textService.getSplit(selectorToTest).subscribe({
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
    });
    it('should return the paragraphs', (done: DoneFn) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValue(expected);

      textService.getSplit(selectorToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('paragraphs should be as expected')
            .toEqual(expected);
          done();
        },
        error: done.fail,
      });
    });
    it('should use the paragraph decoder service', () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getSplit(selectorToTest).subscribe({
        next: () => {
          expect(paragraphDecoderServiceSpy.decode)
            .withContext('decode should have been called')
            .toHaveBeenCalledOnceWith(text);
        },
      });
    });
  });

  describe('getMultiText method', () => {
    it('should use the datasource correctly', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const languageToTest = Languages.ENGLISH;

      datasourceServiceSpy.get.and.returnValue(
        of<ListStringDto>({
          messages: ['this is a test', 'this is another test'],
        })
      );

      textService['getMultiText'](selectorsToTest, languageToTest);

      expect(datasourceServiceSpy.get)
        .withContext('get should have been called')
        .toHaveBeenCalledOnceWith(API_MULTI_TEXT_PATH, jasmine.any(Object));

      expect(datasourceServiceSpy.get.calls.mostRecent().args[1])
        .withContext(
          'get should have been called with the proper arguments - 1'
        )
        .toEqual(jasmine.anything());
      expect(
        datasourceServiceSpy.get.calls
          .mostRecent()
          .args[1]?.getAll(API_MULTI_SELECTOR_PARAM)
      )
        .withContext(
          'get should have been called with the proper arguments - 2'
        )
        .toEqual(jasmine.anything());
      expect(
        datasourceServiceSpy.get.calls
          .mostRecent()
          .args[1]?.getAll(API_MULTI_SELECTOR_PARAM)
      )
        .withContext(
          'get should have been called with the proper arguments - 3'
        )
        .toEqual(selectorsToTest);
      expect(
        datasourceServiceSpy.get.calls
          .mostRecent()
          .args[1]?.get(API_LANGUAGE_PARAM)
      )
        .withContext(
          'get should have been called with the proper arguments - 4'
        )
        .toEqual(jasmine.anything());
      expect(
        datasourceServiceSpy.get.calls
          .mostRecent()
          .args[1]?.get(API_LANGUAGE_PARAM)
      )
        .withContext(
          'get should have been called with the proper arguments - 5'
        )
        .toBe(Languages[languageToTest]);
    });
    it('should return an observable of the message', (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const languageToTest = Languages.ENGLISH;
      const expectedMessages = ['this is a test', 'this is another test'];

      datasourceServiceSpy.get.and.returnValue(
        of<ListStringDto>({
          messages: expectedMessages,
        })
      );

      textService['getMultiText'](selectorsToTest, languageToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('message should be as expected')
            .toBe(expectedMessages);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('getMulti method', () => {
    it('should notify the TEXTS preloader that a text has to load on subscription', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of(['this is a test', 'this is another test'])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMulti(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should not notify the TEXTS preloader that a text has to load without subscribers', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of(['this is a test', 'this is another test'])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMulti(selectorsToTest);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    });
    it('should call getMultiText method', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of(['this is a test', 'this is another test'])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMulti(selectorsToTest);

      expect(textService['getMultiText'])
        .withContext('getMultiText should have been called')
        .toHaveBeenCalledOnceWith(
          selectorsToTest,
          languageServiceSpy.current()
        );
    });
    it('should notify the TEXTS preloader that a text has loaded', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of(['this is a test', 'this is another test'])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMulti(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should notify the TEXTS preloader that a text has loaded on error', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMulti(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should return an error message on error', (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMulti(selectorsToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('error message should be as expected')
            .toEqual([
              EXPECTED_TEXT_ERROR_MESSAGE,
              EXPECTED_TEXT_ERROR_MESSAGE,
            ]);
          done();
        },
        error: done.fail,
      });
    });
    it('should return the text', (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const expectedMessages = ['this is a test', 'this is another test'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of(expectedMessages)
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMulti(selectorsToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('text should be as expected')
            .toEqual(expectedMessages);
          done();
        },
        error: done.fail,
      });
    });
  });

  describe('getMultiAllSplit method', () => {
    it('should notify the TEXTS preloader that a text has to load on subscription', () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMultiAllSplit(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should not notify the TEXTS preloader that a text has to load without subscribers', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMultiAllSplit(selectorsToTest);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    });
    it('should call getMultiText method', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMultiAllSplit(selectorsToTest);

      expect(textService['getMultiText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(
          selectorsToTest,
          languageServiceSpy.current()
        );
    });
    it('should notify the TEXTS preloader that a text has loaded', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMultiAllSplit(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should notify the TEXTS preloader that a text has loaded on error', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMultiAllSplit(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should return an error message on error', (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValue([
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, EXPECTED_TEXT_ERROR_MESSAGE),
        ]),
      ]);

      textService.getMultiAllSplit(selectorsToTest).subscribe({
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
    });
    it('should return the paragraphs', (done: DoneFn) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValues(expected1, expected2);

      textService.getMultiAllSplit(selectorsToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('paragraphs should be as expected')
            .toEqual(expected);
          done();
        },
        error: done.fail,
      });
    });
    it('should use the paragraph decoder service', () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService.getMultiAllSplit(selectorsToTest).subscribe({
        next: () => {
          expect(paragraphDecoderServiceSpy.decode)
            .withContext('decode should have been called')
            .toHaveBeenCalledTimes(2);
          expect(paragraphDecoderServiceSpy.decode)
            .withContext(
              'decode should have been called with proper arguments - 1'
            )
            .toHaveBeenCalledWith(text);
          expect(paragraphDecoderServiceSpy.decode)
            .withContext(
              'decode should have been called with proper arguments - 1'
            )
            .toHaveBeenCalledWith(text2);
        },
      });
    });
  });

  describe('getMultiSomeBooleanSplit method', () => {
    it('should notify the TEXTS preloader that a text has to load on subscription', () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService['getMultiSomeBooleanSplit'](
        selectorsToTest,
        isSplitInput
      ).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should not notify the TEXTS preloader that a text has to load without subscribers', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService['getMultiSomeBooleanSplit'](selectorsToTest, isSplitInput);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    });
    it('should call getMultiText method', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService['getMultiSomeBooleanSplit'](selectorsToTest, isSplitInput);

      expect(textService['getMultiText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(
          selectorsToTest,
          languageServiceSpy.current()
        );
    });
    it('should notify the TEXTS preloader that a text has loaded', () => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService['getMultiSomeBooleanSplit'](
        selectorsToTest,
        isSplitInput
      ).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should notify the TEXTS preloader that a text has loaded on error', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const isSplitInput = [true, false];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService['getMultiSomeBooleanSplit'](
        selectorsToTest,
        isSplitInput
      ).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(Preloaders.TEXTS, 1);
    });
    it('should return an error message on error', (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const isSplitInput = [true, false];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValue([
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, EXPECTED_TEXT_ERROR_MESSAGE),
        ]),
      ]);

      textService['getMultiSomeBooleanSplit'](
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
    });
    it('should return the paragraphs', (done: DoneFn) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValues(expected1);

      textService['getMultiSomeBooleanSplit'](
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
    });
    it('should use the paragraph decoder service', () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiText').and.returnValue(
        of([text, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      textService['getMultiSomeBooleanSplit'](
        selectorsToTest,
        isSplitInput
      ).subscribe({
        next: () => {
          expect(paragraphDecoderServiceSpy.decode)
            .withContext('decode should have been called')
            .toHaveBeenCalledTimes(1);
          expect(paragraphDecoderServiceSpy.decode)
            .withContext('decode should have been called with proper arguments')
            .toHaveBeenCalledWith(text);
        },
      });
    });

    it('should throw error when the array length are different', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const isSplitInput = [true];

      expect(() =>
        textService['getMultiSomeBooleanSplit'](selectorsToTest, isSplitInput)
      )
        .withContext('should throw error')
        .toThrow(
          new Error(
            'Invalid parameters for getMultiSomeBooleanSplit - arrays should be of the same length'
          )
        );
    });
  });

  describe('getMultiSomeSplit method', () => {
    it('should call getMultiSomeBooleanSplit method', () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const spanContent1 = 'This is a test';
      const spanContent2 = 'this should be decoded';
      const spanContent3 = 'and this should be';
      const spanContent4 = 'and this should be the end';
      const aText = 'text of link, right here';
      const strongEmText = 'in bold, in strong and em subparagraph';
      const spanContent5 = 'This is a new paragraph';
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

      const input = [
        { selector: selectorsToTest[0], isSplit: isSplitInput[0] },
        { selector: selectorsToTest[1], isSplit: isSplitInput[1] },
      ];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(textService, 'getMultiSomeBooleanSplit').and.returnValue(
        of(expected)
      );

      textService.getMultiSomeSplit(input);

      expect(textService['getMultiSomeBooleanSplit'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(selectorsToTest, isSplitInput);
    });
  });
});
