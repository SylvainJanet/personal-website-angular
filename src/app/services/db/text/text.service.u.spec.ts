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
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { IEnvironment } from 'src/environments/interface/ienvironment';

let service: TextService;
let datasourceServiceSpy: jasmine.SpyObj<DatasourceService>;
let languageServiceSpy: jasmine.SpyObj<LanguageService>;
let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
let paragraphDecoderServiceSpy: jasmine.SpyObj<ParagraphDecoderService>;

const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

const API_TEXT_PATH = 'text-management/text';
const API_MULTI_TEXT_PATH = 'text-management/multi-text';
const API_SELECTOR_PARAM = 'selector';
const API_MULTI_SELECTOR_PARAM = 'selectors';
const API_LANGUAGE_PARAM = 'language';
const EXPECTED_TEXT_ERROR_MESSAGE = 'error';

describe('TextService - unit', () => {
  describe('getText method', () => {
    const shouldUseDatasourceCorrectlyExpectation =
      'should use the datasource correctly';
    const shouldUseDatasourceCorrectly = () => {
      const selectorToTest = 'test-selector';
      const languageToTest = Languages.ENGLISH;

      datasourceServiceSpy.get.and.returnValue(
        of<StringDto>({ message: 'this is a test' })
      );

      service['getText'](selectorToTest, languageToTest);

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
    };

    const shouldReturnMessageObsExpectation =
      'should return an observable of the message';
    const shouldReturnMessageObs = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      const languageToTest = Languages.ENGLISH;
      const expectedMessage = 'this is a test';

      datasourceServiceSpy.get.and.returnValue(
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
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldUseDatasourceCorrectlyExpectation, shouldUseDatasourceCorrectly);
      it(shouldReturnMessageObsExpectation, shouldReturnMessageObs);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldUseDatasourceCorrectlyExpectation, shouldUseDatasourceCorrectly);
      it(shouldReturnMessageObsExpectation, shouldReturnMessageObs);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldUseDatasourceCorrectlyExpectation, shouldUseDatasourceCorrectly);
      it(shouldReturnMessageObsExpectation, shouldReturnMessageObs);
    });
  });

  describe('get method', () => {
    const shouldCallTextInLanguageMethodExpectation =
      'should call the getTextInLanguage method';
    const shouldCallTextInLanguageMethod = () => {
      spyOn(service, 'getTextInLanguage');
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      const selectorToTest = 'test-selector';
      service.get(selectorToTest);

      expect(service.getTextInLanguage)
        .withContext('method should have been called')
        .toHaveBeenCalledOnceWith(
          selectorToTest,
          Languages.ENGLISH,
          Preloaders.TEXTS
        );
    };

    const shouldNotifyPreloaderThatTextHasToLoadExpectation =
      'should notify the TEXTS preloader that a text has to load on subscription';
    const shouldNotifyPreloaderThatTextHasToLoad = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of('this is a test'));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getTextInLanguageToLoadMessage'](
            selectorToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getTextInLanguageMessageWithPreloaderTot'](),
          service['getTextInLanguageMessageWithTot']()
        );
    };

    const shouldNotNotifyPreloaderWithoutSubscribersExpectation =
      'should not notify the TEXTS preloader that a text has to load without subscribers';
    const shouldNotNotifyPreloaderWithoutSubscribers = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of('this is a test'));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    };

    const shouldCallGetTextExpectation = 'should call getText method';
    const shouldCallGetText = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of('this is a test'));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest);

      expect(service['getText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(selectorToTest, languageServiceSpy.current());
    };

    const shouldNotifyPreloaderThatTextHasLoadedExpectation =
      'should notify the TEXTS preloader that a text has loaded';
    const shouldNotifyPreloaderThatTextHasLoaded = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of('this is a test'));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getTextInLanguageLoadedMessage'](
            'this is a ...',
            selectorToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getTextInLanguageMessageWithPreloaderTot'](),
          service['getTextInLanguageMessageWithTot']()
        );
    };

    const shouldNotifyPreloaderOnErrorExpectation =
      'should notify the TEXTS preloader that a text has loaded on error';
    const shouldNotifyPreloaderOnError = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getTextInLanguageLoadedMessage'](
            EXPECTED_TEXT_ERROR_MESSAGE,
            selectorToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getTextInLanguageMessageWithPreloaderTot'](),
          service['getTextInLanguageMessageWithTot']()
        );
    };

    const shouldReturnErrorMessageOnErrorExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessageOnError = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('error message should be as expected')
            .toBe(EXPECTED_TEXT_ERROR_MESSAGE);
          done();
        },
        error: done.fail,
      });
    };

    const shouldReturnTheTextExpectation = 'should return the text';
    const shouldReturnTheText = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      const expectedMessage = 'this is a test';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of(expectedMessage));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('text should be as expected')
            .toBe(expectedMessage);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldCallTextInLanguageMethodExpectation,
        shouldCallTextInLanguageMethod
      );
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetTextExpectation, shouldCallGetText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(
        shouldReturnErrorMessageOnErrorExpectation,
        shouldReturnErrorMessageOnError
      );
      it(shouldReturnTheTextExpectation, shouldReturnTheText);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldCallTextInLanguageMethodExpectation,
        shouldCallTextInLanguageMethod
      );
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetTextExpectation, shouldCallGetText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(
        shouldReturnErrorMessageOnErrorExpectation,
        shouldReturnErrorMessageOnError
      );
      it(shouldReturnTheTextExpectation, shouldReturnTheText);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldCallTextInLanguageMethodExpectation,
        shouldCallTextInLanguageMethod
      );
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetTextExpectation, shouldCallGetText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(
        shouldReturnErrorMessageOnErrorExpectation,
        shouldReturnErrorMessageOnError
      );
      it(shouldReturnTheTextExpectation, shouldReturnTheText);
    });
  });

  describe('getTextInLanguage method', () => {
    const shouldNotifyPreloaderThatTextHasToLoadExpectation =
      'should notify the TEXTS preloader that a text has to load on subscription';
    const shouldNotifyPreloaderThatTextHasToLoad = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of('this is a test'));

      service.getTextInLanguage(selectorToTest, Languages.ENGLISH).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getTextInLanguageToLoadMessage'](
            selectorToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getTextInLanguageMessageWithPreloaderTot'](),
          service['getTextInLanguageMessageWithTot']()
        );
    };
    const shouldNotNotifyPreloaderWithoutSubscribersExpectation =
      'should not notify the TEXTS preloader that a text has to load without subscribers';
    const shouldNotNotifyPreloaderWithoutSubscribers = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of('this is a test'));

      service.getTextInLanguage(selectorToTest, Languages.ENGLISH);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    };
    const shouldCallGetTextExpectation = 'should call getText method';
    const shouldCallGetText = () => {
      const selectorToTest = 'test-selector';
      const languageToTest = Languages.ENGLISH;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of('this is a test'));

      service.getTextInLanguage(selectorToTest, languageToTest);

      expect(service['getText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(selectorToTest, languageToTest);
    };
    const shouldNotifyPreloaderThatTextHasLoadedExpectation =
      'should notify the TEXTS preloader that a text has loaded';
    const shouldNotifyPreloaderThatTextHasLoaded = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of('this is a test'));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.get(selectorToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getTextInLanguageLoadedMessage'](
            'this is a test',
            selectorToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getTextInLanguageMessageWithPreloaderTot'](),
          service['getTextInLanguageMessageWithTot']()
        );
    };
    const shouldNotifyPreloaderOnErrorExpectation =
      'should notify the TEXTS preloader that a text has loaded on error';
    const shouldNotifyPreloaderOnError = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );

      service.getTextInLanguage(selectorToTest, Languages.ENGLISH).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getTextInLanguageLoadedMessage'](
            EXPECTED_TEXT_ERROR_MESSAGE,
            selectorToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getTextInLanguageMessageWithPreloaderTot'](),
          service['getTextInLanguageMessageWithTot']()
        );
    };
    const shouldReturnErrorMessageOnErrorExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessageOnError = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );

      service.getTextInLanguage(selectorToTest, Languages.ENGLISH).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('error message should be as expected')
            .toBe(EXPECTED_TEXT_ERROR_MESSAGE);
          done();
        },
        error: done.fail,
      });
    };
    const shouldReturnTheTextExpectation = 'should return the text';
    const shouldReturnTheText = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      const expectedMessage = 'this is a test';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of(expectedMessage));

      service.getTextInLanguage(selectorToTest, Languages.ENGLISH).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('text should be as expected')
            .toBe(expectedMessage);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetTextExpectation, shouldCallGetText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(
        shouldReturnErrorMessageOnErrorExpectation,
        shouldReturnErrorMessageOnError
      );
      it(shouldReturnTheTextExpectation, shouldReturnTheText);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetTextExpectation, shouldCallGetText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(
        shouldReturnErrorMessageOnErrorExpectation,
        shouldReturnErrorMessageOnError
      );
      it(shouldReturnTheTextExpectation, shouldReturnTheText);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetTextExpectation, shouldCallGetText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(
        shouldReturnErrorMessageOnErrorExpectation,
        shouldReturnErrorMessageOnError
      );
      it(shouldReturnTheTextExpectation, shouldReturnTheText);
    });
  });

  describe('getSplit method', () => {
    const shouldNotifyPreloaderThatTextHasToLoadExpectation =
      'should notify the TEXTS preloader that a text has to load on subscription';
    const shouldNotifyPreloaderThatTextHasToLoad = () => {
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

      paragraphDecoderServiceSpy.decode.and.returnValue(expected);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getSplit(selectorToTest).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getSplitToLoadMessage'](
            selectorToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getSplitMessageWithPreloaderTot'](),
          service['getSplitMessageWithTot']()
        );
    };
    const shouldNotNotifyPreloaderWithoutSubscribersExpectation =
      'should not notify the TEXTS preloader that a text has to load without subscribers';
    const shouldNotNotifyPreloaderWithoutSubscribers = () => {
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
      spyOn<any>(service, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getSplit(selectorToTest);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    };
    const shouldCallGetTextExpectation = 'should call getText method';
    const shouldCallGetText = () => {
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
      spyOn<any>(service, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getSplit(selectorToTest);

      expect(service['getText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(selectorToTest, languageServiceSpy.current());
    };
    const shouldNotifyPreloaderThatTextHasLoadedExpectation =
      'should notify the TEXTS preloader that a text has loaded';
    const shouldNotifyPreloaderThatTextHasLoaded = () => {
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

      paragraphDecoderServiceSpy.decode.and.returnValue(expected);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getSplit(selectorToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getSplitLoadedMessage'](
            expected,
            selectorToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getSplitMessageWithPreloaderTot'](),
          service['getSplitMessageWithTot']()
        );
    };
    const shouldNotifyPreloaderOnErrorExpectation =
      'should notify the TEXTS preloader that a text has loaded on error';
    const shouldNotifyPreloaderOnError = () => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      const expectedPar = [
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, 'this is a test error'),
        ]),
      ];
      paragraphDecoderServiceSpy.decode.and.returnValue(expectedPar);

      service.getSplit(selectorToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getSplitLoadedMessage'](
            expectedPar,
            selectorToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getSplitMessageWithPreloaderTot'](),
          service['getSplitMessageWithTot']()
        );
    };
    const shouldReturnErrorMessageOnErrorExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessageOnError = (done: DoneFn) => {
      const selectorToTest = 'test-selector';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValue([
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, EXPECTED_TEXT_ERROR_MESSAGE),
        ]),
      ]);

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
    const shouldReturnTheParagraphsExpectation = 'should return the paragraphs';
    const shouldReturnTheParagraphs = (done: DoneFn) => {
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
      spyOn<any>(service, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValue(expected);

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

    const shouldUseParagraphDecoderServiceExpectation =
      'should use the paragraph decoder service';
    const shouldUseParagraphDecoderService = () => {
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

      paragraphDecoderServiceSpy.decode.and.returnValue(expected);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getText').and.returnValue(of(text));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getSplit(selectorToTest).subscribe({
        next: () => {
          expect(paragraphDecoderServiceSpy.decode)
            .withContext('decode should have been called')
            .toHaveBeenCalledWith(text);
          expect(paragraphDecoderServiceSpy.decode)
            .withContext('decode should have been called once')
            .toHaveBeenCalledWith(text);
        },
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetTextExpectation, shouldCallGetText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(
        shouldReturnErrorMessageOnErrorExpectation,
        shouldReturnErrorMessageOnError
      );
      it(shouldReturnTheParagraphsExpectation, shouldReturnTheParagraphs);
      it(
        shouldUseParagraphDecoderServiceExpectation,
        shouldUseParagraphDecoderService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetTextExpectation, shouldCallGetText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(
        shouldReturnErrorMessageOnErrorExpectation,
        shouldReturnErrorMessageOnError
      );
      it(shouldReturnTheParagraphsExpectation, shouldReturnTheParagraphs);
      it(
        shouldUseParagraphDecoderServiceExpectation,
        shouldUseParagraphDecoderService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetTextExpectation, shouldCallGetText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(
        shouldReturnErrorMessageOnErrorExpectation,
        shouldReturnErrorMessageOnError
      );
      it(shouldReturnTheParagraphsExpectation, shouldReturnTheParagraphs);
      it(
        shouldUseParagraphDecoderServiceExpectation,
        shouldUseParagraphDecoderService
      );
    });
  });

  describe('getMultiText method', () => {
    const shouldUseDatasourceCorrectlyExpectation =
      'should use the datasource correctly';
    const shouldUseDatasourceCorrectly = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const languageToTest = Languages.ENGLISH;

      datasourceServiceSpy.get.and.returnValue(
        of<ListStringDto>({
          messages: ['this is a test', 'this is another test'],
        })
      );

      service['getMultiText'](selectorsToTest, languageToTest);

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
    };
    const shouldReturnMessageObsExpectation =
      'should return an observable of the message';
    const shouldReturnMessageObs = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const languageToTest = Languages.ENGLISH;
      const expectedMessages = ['this is a test', 'this is another test'];

      datasourceServiceSpy.get.and.returnValue(
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
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldUseDatasourceCorrectlyExpectation, shouldUseDatasourceCorrectly);
      it(shouldReturnMessageObsExpectation, shouldReturnMessageObs);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldUseDatasourceCorrectlyExpectation, shouldUseDatasourceCorrectly);
      it(shouldReturnMessageObsExpectation, shouldReturnMessageObs);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldUseDatasourceCorrectlyExpectation, shouldUseDatasourceCorrectly);
      it(shouldReturnMessageObsExpectation, shouldReturnMessageObs);
    });
  });

  describe('getMulti method', () => {
    const shouldNotifyPreloaderThatTextHasToLoadExpectation =
      'should notify the TEXTS preloader that a text has to load on subscription';
    const shouldNotifyPreloaderThatTextHasToLoad = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        of(['this is a test', 'this is another test'])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMulti(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getMultiToLoadMessage'](
            selectorsToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getMultiMessageWithPreloaderTot'](),
          service['getMultiMessageWithTot']()
        );
    };
    const shouldNotNotifyPreloaderWithoutSubscribersExpectation =
      'should not notify the TEXTS preloader that a text has to load without subscribers';
    const shouldNotNotifyPreloaderWithoutSubscribers = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        of(['this is a test', 'this is another test'])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMulti(selectorsToTest);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    };
    const shouldCallGetMultiTextExpectation = 'should call getMultiText method';
    const shouldCallGetMultiText = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        of(['this is a test', 'this is another test'])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMulti(selectorsToTest);

      expect(service['getMultiText'])
        .withContext('getMultiText should have been called')
        .toHaveBeenCalledOnceWith(
          selectorsToTest,
          languageServiceSpy.current()
        );
    };
    const shouldNotifyPreloaderThatTextHasLoadedExpectation =
      'should notify the TEXTS preloader that a text has loaded';
    const shouldNotifyPreloaderThatTextHasLoaded = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        of(['this is a test', 'this is another test'])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMulti(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getMultiLoadedMessage'](
            ['this is a test', 'this is another test'],
            selectorsToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getMultiMessageWithPreloaderTot'](),
          service['getMultiMessageWithTot']()
        );
    };
    const shouldNotifyPreloaderOnErrorExpectation =
      'should notify the TEXTS preloader that a text has loaded on error';
    const shouldNotifyPreloaderOnError = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMulti(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getMultiLoadedMessage'](
            [EXPECTED_TEXT_ERROR_MESSAGE, EXPECTED_TEXT_ERROR_MESSAGE],
            selectorsToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getMultiMessageWithPreloaderTot'](),
          service['getMultiMessageWithTot']()
        );
    };
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMulti(selectorsToTest).subscribe({
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
    };
    const shouldReturnTheTextExpectation = 'should return the text';
    const shouldReturnTheText = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const expectedMessages = ['this is a test', 'this is another test'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(of(expectedMessages));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMulti(selectorsToTest).subscribe({
        next: (actual) => {
          expect(actual)
            .withContext('text should be as expected')
            .toEqual(expectedMessages);
          done();
        },
        error: done.fail,
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetMultiTextExpectation, shouldCallGetMultiText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnTheTextExpectation, shouldReturnTheText);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetMultiTextExpectation, shouldCallGetMultiText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnTheTextExpectation, shouldReturnTheText);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetMultiTextExpectation, shouldCallGetMultiText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnTheTextExpectation, shouldReturnTheText);
    });
  });

  describe('getMultiAllSplit method', () => {
    const shouldNotifyPreloaderThatTextHasToLoadExpectation =
      'should notify the TEXTS preloader that a text has to load on subscription';
    const shouldNotifyPreloaderThatTextHasToLoad = () => {
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

      const expected = [expectedPar1, expectedPar2];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValue(expected);

      service.getMultiAllSplit(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getMultiAllSplitToLoadMessage'](
            selectorsToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getMultiAllSplitMessageWithPreloaderTot'](),
          service['getMultiAllSplitMessageWithTot']()
        );
    };
    const shouldNotNotifyPreloaderWithoutSubscribersExpectation =
      'should not notify the TEXTS preloader that a text has to load without subscribers';
    const shouldNotNotifyPreloaderWithoutSubscribers = () => {
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
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMultiAllSplit(selectorsToTest);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    };
    const shouldCallGetMultiTextExpectation = 'should call getMultiText method';
    const shouldCallGetMultiText = () => {
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
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMultiAllSplit(selectorsToTest);

      expect(service['getMultiText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(
          selectorsToTest,
          languageServiceSpy.current()
        );
    };
    const shouldNotifyPreloaderThatTextHasLoadedExpectation =
      'should notify the TEXTS preloader that a text has loaded';
    const shouldNotifyPreloaderThatTextHasLoaded = () => {
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

      paragraphDecoderServiceSpy.decode.and.returnValues(expected1, expected2);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMultiAllSplit(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getMultiAllSplitLoadedMessage'](
            expected,
            selectorsToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getMultiAllSplitMessageWithPreloaderTot'](),
          service['getMultiAllSplitMessageWithTot']()
        );
    };
    const shouldNotifyPreloaderOnErrorExpectation =
      'should notify the TEXTS preloader that a text has loaded on error';
    const shouldNotifyPreloaderOnError = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      const expected = [
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, EXPECTED_TEXT_ERROR_MESSAGE),
        ]),
      ];

      paragraphDecoderServiceSpy.decode.and.returnValue(expected);

      service.getMultiAllSplit(selectorsToTest).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getMultiAllSplitLoadedMessage'](
            [expected, expected],
            selectorsToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getMultiAllSplitMessageWithPreloaderTot'](),
          service['getMultiAllSplitMessageWithTot']()
        );
    };
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValue([
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, EXPECTED_TEXT_ERROR_MESSAGE),
        ]),
      ]);

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
    const shouldReturnTheParagraphsExpectation = 'should return the paragraphs';
    const shouldReturnTheParagraphs = (done: DoneFn) => {
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
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValues(expected1, expected2);

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
    const shouldUseParagraphDecoderServiceExpectation =
      'should use the paragraph decoder service';
    const shouldUseParagraphDecoderService = () => {
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

      paragraphDecoderServiceSpy.decode.and.returnValues(expected1, expected2);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service.getMultiAllSplit(selectorsToTest).subscribe({
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
              'decode should have been called with proper arguments - 2'
            )
            .toHaveBeenCalledWith(text2);
        },
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetMultiTextExpectation, shouldCallGetMultiText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnTheParagraphsExpectation, shouldReturnTheParagraphs);
      it(
        shouldUseParagraphDecoderServiceExpectation,
        shouldUseParagraphDecoderService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetMultiTextExpectation, shouldCallGetMultiText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnTheParagraphsExpectation, shouldReturnTheParagraphs);
      it(
        shouldUseParagraphDecoderServiceExpectation,
        shouldUseParagraphDecoderService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetMultiTextExpectation, shouldCallGetMultiText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnTheParagraphsExpectation, shouldReturnTheParagraphs);
      it(
        shouldUseParagraphDecoderServiceExpectation,
        shouldUseParagraphDecoderService
      );
    });
  });

  describe('getMultiSomeBooleanSplit method', () => {
    const shouldNotifyPreloaderThatTextHasToLoadExpectation =
      'should notify the TEXTS preloader that a text has to load on subscription';
    const shouldNotifyPreloaderThatTextHasToLoad = () => {
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
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service['getMultiSomeBooleanSplit'](
        selectorsToTest,
        isSplitInput
      ).subscribe();

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getMultiSomeBooleanSplitToLoadMessage'](
            selectorsToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getMultiSomeBooleanSplitMessageWithPreloaderTot'](),
          service['getMultiSomeBooleanSplitMessageWithTot']()
        );
    };
    const shouldNotNotifyPreloaderWithoutSubscribersExpectation =
      'should not notify the TEXTS preloader that a text has to load without subscribers';
    const shouldNotNotifyPreloaderWithoutSubscribers = () => {
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
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service['getMultiSomeBooleanSplit'](selectorsToTest, isSplitInput);

      expect(preloaderServiceSpy.toLoad)
        .withContext('toLoad should not have been called')
        .not.toHaveBeenCalled();
    };
    const shouldCallGetMultiTextExpectation = 'should call getMultiText method';
    const shouldCallGetMultiText = () => {
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
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service['getMultiSomeBooleanSplit'](selectorsToTest, isSplitInput);

      expect(service['getMultiText'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(
          selectorsToTest,
          languageServiceSpy.current()
        );
    };
    const shouldNotifyPreloaderThatTextHasLoadedExpectation =
      'should notify the TEXTS preloader that a text has loaded';
    const shouldNotifyPreloaderThatTextHasLoaded = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const spanContent1 = 'This is a test';
      const spanContent2 = 'this should be decoded';
      const spanContent3 = 'and this should be';
      const spanContent4 = 'and this should be the end';
      //   const br = 'br';
      const aText = 'text of link, right here';
      //   const a = `a_asset,${aText}`;
      const strongEmText = 'in bold, in strong and em subparagraph';
      //   const strongEm = `,${strongEmText}`;
      const spanContent5 = 'This is a new paragraph';
      //   const par1 =
      //     spanContent1 +
      //     `[[${br}]]` +
      //     spanContent2 +
      //     `[[${a}]]` +
      //     spanContent3 +
      //     `[[${strongEm}]]` +
      //     spanContent4;
      //   const par2 = spanContent5;
      //   const text = par1 + '[[]]' + par2;
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
      spyOn<any>(service, 'getMultiText').and.returnValue(
        of([expected1, text2])
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service['getMultiSomeBooleanSplit'](
        selectorsToTest,
        isSplitInput
      ).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getMultiSomeBooleanSplitLoadedMessage'](
            expected,
            selectorsToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getMultiSomeBooleanSplitMessageWithPreloaderTot'](),
          service['getMultiSomeBooleanSplitMessageWithTot']()
        );
    };
    const shouldNotifyPreloaderOnErrorExpectation =
      'should notify the TEXTS preloader that a text has loaded on error';
    const shouldNotifyPreloaderOnError = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const isSplitInput = [true, false];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service['getMultiSomeBooleanSplit'](
        selectorsToTest,
        isSplitInput
      ).subscribe();

      expect(preloaderServiceSpy.loaded)
        .withContext('loaded should have been called')
        .toHaveBeenCalledOnceWith(
          Preloaders.TEXTS,
          1,
          service['getMultiSomeBooleanSplitLoadedMessage'](
            [EXPECTED_TEXT_ERROR_MESSAGE, EXPECTED_TEXT_ERROR_MESSAGE],
            selectorsToTest,
            Languages.ENGLISH,
            Preloaders.TEXTS
          ),
          service['getMultiSomeBooleanSplitMessageWithPreloaderTot'](),
          service['getMultiSomeBooleanSplitMessageWithTot']()
        );
    };
    const shouldReturnErrorMessageExpectation =
      'should return an error message on error';
    const shouldReturnErrorMessage = (done: DoneFn) => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const isSplitInput = [true, false];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'getMultiText').and.returnValue(
        throwError(() => new Error('this is a test error'))
      );
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValue([
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, EXPECTED_TEXT_ERROR_MESSAGE),
        ]),
      ]);

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
    const shouldReturnTheParagraphsExpectation = 'should return the paragraphs';
    const shouldReturnTheParagraphs = (done: DoneFn) => {
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
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);
      paragraphDecoderServiceSpy.decode.and.returnValues(expected1);

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
    const shouldUseParagraphDecoderServiceExpectation =
      'should use the paragraph decoder service';
    const shouldUseParagraphDecoderService = () => {
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
      spyOn<any>(service, 'getMultiText').and.returnValue(of([text, text2]));
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      service['getMultiSomeBooleanSplit'](
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
    };
    const shouldThrowIfArrayLengthAreDifferentExpectation =
      'should throw error when the array length are different';
    const shouldThrowIfArrayLengthAreDifferent = () => {
      const selectorsToTest = ['test-selector', 'other-test-selector'];
      const isSplitInput = [true];

      expect(() =>
        service['getMultiSomeBooleanSplit'](selectorsToTest, isSplitInput)
      )
        .withContext('should throw error')
        .toThrow(
          new Error(
            'Invalid parameters for getMultiSomeBooleanSplit - arrays should be of the same length'
          )
        );
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetMultiTextExpectation, shouldCallGetMultiText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnTheParagraphsExpectation, shouldReturnTheParagraphs);
      it(
        shouldUseParagraphDecoderServiceExpectation,
        shouldUseParagraphDecoderService
      );
      it(
        shouldThrowIfArrayLengthAreDifferentExpectation,
        shouldThrowIfArrayLengthAreDifferent
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetMultiTextExpectation, shouldCallGetMultiText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnTheParagraphsExpectation, shouldReturnTheParagraphs);
      it(
        shouldUseParagraphDecoderServiceExpectation,
        shouldUseParagraphDecoderService
      );
      it(
        shouldThrowIfArrayLengthAreDifferentExpectation,
        shouldThrowIfArrayLengthAreDifferent
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldNotifyPreloaderThatTextHasToLoadExpectation,
        shouldNotifyPreloaderThatTextHasToLoad
      );
      it(
        shouldNotNotifyPreloaderWithoutSubscribersExpectation,
        shouldNotNotifyPreloaderWithoutSubscribers
      );
      it(shouldCallGetMultiTextExpectation, shouldCallGetMultiText);
      it(
        shouldNotifyPreloaderThatTextHasLoadedExpectation,
        shouldNotifyPreloaderThatTextHasLoaded
      );
      it(shouldNotifyPreloaderOnErrorExpectation, shouldNotifyPreloaderOnError);
      it(shouldReturnErrorMessageExpectation, shouldReturnErrorMessage);
      it(shouldReturnTheParagraphsExpectation, shouldReturnTheParagraphs);
      it(
        shouldUseParagraphDecoderServiceExpectation,
        shouldUseParagraphDecoderService
      );
      it(
        shouldThrowIfArrayLengthAreDifferentExpectation,
        shouldThrowIfArrayLengthAreDifferent
      );
    });
  });

  describe('getMultiSomeSplit method', () => {
    const shouldCallGetMultiSomeBooleanSplitExpectation =
      'should call getMultiSomeBooleanSplit method';
    const shouldCallGetMultiSomeBooleanSplit = () => {
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
      spyOn<any>(service, 'getMultiSomeBooleanSplit').and.returnValue(
        of(expected)
      );

      service.getMultiSomeSplit(input);

      expect(service['getMultiSomeBooleanSplit'])
        .withContext('getText should have been called')
        .toHaveBeenCalledOnceWith(
          selectorsToTest,
          isSplitInput,
          Preloaders.TEXTS
        );
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldCallGetMultiSomeBooleanSplitExpectation,
        shouldCallGetMultiSomeBooleanSplit
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldCallGetMultiSomeBooleanSplitExpectation,
        shouldCallGetMultiSomeBooleanSplit
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(
        shouldCallGetMultiSomeBooleanSplitExpectation,
        shouldCallGetMultiSomeBooleanSplit
      );
    });
  });

  describe('getTextInLanguageToLoadMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const selector = 'this-is-a-test';
      const language = Languages.FRENCH;

      const actual = service['getTextInLanguageToLoadMessage'](
        selector,
        language
      );
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('to load message should be returned - long')
          .toBe('Loading text - this-is-a-test - in FRENCH - TEXTS');
      } else {
        expect(actual)
          .withContext('to load message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getTextInLanguageLoadedMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const text = 'this is a test';
      const selector = 'this-is-a-test';
      const language = Languages.FRENCH;

      const actual = service['getTextInLanguageLoadedMessage'](
        text,
        selector,
        language
      );
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('loaded message should be returned - long')
          .toBe(
            'Text Loaded - this-is-a-test - in FRENCH : this is a ... - TEXTS'
          );
      } else {
        expect(actual)
          .withContext('loaded message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getTextInLanguageMessageWithPreloaderTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['getTextInLanguageMessageWithPreloaderTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('getTextInLanguageMessageWithTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['getTextInLanguageMessageWithTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('getMultiToLoadMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const selectors = ['this-is-a-test', 'another-test'];
      const language = Languages.FRENCH;

      const actual = service['getMultiToLoadMessage'](selectors, language);
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('to load message should be returned - long')
          .toBe(
            'Loading text - this-is-a-test,another-test - in FRENCH - TEXTS'
          );
      } else {
        expect(actual)
          .withContext('to load message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getMultiLoadedMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const texts = ['this is a test', 'another test'];
      const selectors = ['this-is-a-test', 'another-test'];
      const language = Languages.FRENCH;

      const actual = service['getMultiLoadedMessage'](
        texts,
        selectors,
        language
      );
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('loaded message should be returned - long')
          .toBe(
            'Text Loaded - this-is-a-test,another-test - in FRENCH : this is a ...,another te... - TEXTS'
          );
      } else {
        expect(actual)
          .withContext('loaded message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getMultiMessageWithPreloaderTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['getMultiMessageWithPreloaderTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('getMultiMessageWithTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['getMultiMessageWithTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('getSplitToLoadMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const selector = 'this-is-a-test';
      const language = Languages.FRENCH;

      const actual = service['getSplitToLoadMessage'](selector, language);
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('to load message should be returned - long')
          .toBe('Loading text - this-is-a-test - in FRENCH - TEXTS');
      } else {
        expect(actual)
          .withContext('to load message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getSplitLoadedMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const paragraphs = [
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, 'Test'),
          new SubParagraph(SubParagraphRoot.SPAN, 'Another subpar'),
        ]),
      ];
      const selector = 'this-is-a-test';
      const language = Languages.FRENCH;

      const actual = service['getSplitLoadedMessage'](
        paragraphs,
        selector,
        language
      );
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('loaded message should be returned - long')
          .toBe('Text Loaded - this-is-a-test - in FRENCH : Test... - TEXTS');
      } else {
        expect(actual)
          .withContext('loaded message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getSplitMessageWithPreloaderTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['getTextInLanguageMessageWithPreloaderTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('getSplitMessageWithTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['getTextInLanguageMessageWithTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('getMultiAllSplitToLoadMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const selectors = ['this-is-a-test', 'another-test'];
      const language = Languages.FRENCH;

      const actual = service['getMultiAllSplitToLoadMessage'](
        selectors,
        language
      );
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('to load message should be returned - long')
          .toBe(
            'Loading text - this-is-a-test,another-test - in FRENCH - TEXTS'
          );
      } else {
        expect(actual)
          .withContext('to load message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getMultiAllSplitLoadedMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const paragraphs1 = [
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, 'Test'),
          new SubParagraph(SubParagraphRoot.SPAN, 'Another subpar'),
        ]),
      ];
      const paragraphs2 = [
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, 'Other'),
          new SubParagraph(SubParagraphRoot.SPAN, 'And again'),
        ]),
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, 'Last'),
          new SubParagraph(SubParagraphRoot.SPAN, 'Real last'),
        ]),
      ];
      const selectors = ['this-is-a-test', 'another-test'];
      const language = Languages.FRENCH;

      const actual = service['getMultiAllSplitLoadedMessage'](
        [paragraphs1, paragraphs2],
        selectors,
        language
      );
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('loaded message should be returned - long')
          .toBe(
            'Text Loaded - this-is-a-test,another-test - in FRENCH : Test...,Other...,Last... - TEXTS'
          );
      } else {
        expect(actual)
          .withContext('loaded message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getMultiAllSplitMessageWithPreloaderTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['getTextInLanguageMessageWithPreloaderTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('getMultiAllSplitMessageWithTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['getTextInLanguageMessageWithTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('getMultiSomeBooleanSplitToLoadMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const selectors = ['this-is-a-test', 'another-test'];
      const language = Languages.FRENCH;

      const actual = service['getMultiSomeBooleanSplitToLoadMessage'](
        selectors,
        language
      );
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('to load message should be returned - long')
          .toBe(
            'Loading text - this-is-a-test,another-test - in FRENCH - TEXTS'
          );
      } else {
        expect(actual)
          .withContext('to load message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnvironment },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getMultiSomeBooleanSplitLoadedMessage method', () => {
    const shouldReturnMessageExpectation = 'should return message';
    const shouldReturnMessage = (env: IEnvironment) => {
      const paragraphs1 = [
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, 'Test'),
          new SubParagraph(SubParagraphRoot.SPAN, 'Another subpar'),
        ]),
      ];
      const text = 'Test string right here';
      const paragraphs2 = [
        new Paragraph([
          new SubParagraph(SubParagraphRoot.SPAN, 'Other'),
          new SubParagraph(SubParagraphRoot.SPAN, 'And again'),
        ]),
        new Paragraph([new SubParagraph(SubParagraphRoot.SPAN, 'Last')]),
      ];
      const selectors = ['this-is-a-test', 'another-test', 'last-one'];
      const language = Languages.FRENCH;

      const actual = service['getMultiSomeBooleanSplitLoadedMessage'](
        [paragraphs1, text, paragraphs2],
        selectors,
        language
      );
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('loaded message should be returned - long')
          .toBe(
            'Text Loaded - this-is-a-test,another-test,last-one - in FRENCH : Test...,Test strin...,Other...,Last - TEXTS'
          );
      } else {
        expect(actual)
          .withContext('loaded message should be returned - short')
          .toBe('Loading text...');
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnMessageExpectation, () => shouldReturnMessage(prodEnv));
    });
  });

  describe('getMultiSomeBooleanSplitMessageWithPreloaderTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual =
        service['getMultiSomeBooleanSplitMessageWithPreloaderTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });

  describe('getMultiSomeBooleanSplitMessageWithTot method', () => {
    const shouldReturnExpectation = 'should return expected';
    const shouldReturn = (env: IEnvironment) => {
      const actual = service['getMultiSomeBooleanSplitMessageWithTot']();
      if (!env.production && env.fullLoadingMessages) {
        expect(actual)
          .withContext('message with preloader tot should be returned - dev')
          .toBeTrue();
      } else {
        expect(actual)
          .withContext('message with preloader tot should be returned - prod')
          .toBeFalse();
      }
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: devEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(devEnv));
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(stagingEnv));
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        datasourceServiceSpy = jasmine.createSpyObj('DatasourceService', [
          'get',
        ]);
        languageServiceSpy = jasmine.createSpyObj('LanguageService', [
          'current',
        ]);
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
            { provide: ENV, useValue: prodEnv },
          ],
        });

        service = TestBed.inject(TextService);
      });
      it(shouldReturnExpectation, () => shouldReturn(prodEnv));
    });
  });
});
