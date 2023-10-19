import { TestBed } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { ElementRef, EventEmitter } from '@angular/core';
import { LanguageModalComponent } from './language-modal.component';
import { Languages } from 'src/app/enums/languages';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { LanguageService } from 'src/app/services/language/language.service';

describe('LanguageModalComponent - unit', () => {
  let component: LanguageModalComponent;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const englishNameSelector = 'english-language-name';
  const frenchNameSelector = 'french-language-name';

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(component.isOpen).withContext('isOpen should be set').toBeFalse();

      expect(component.closed)
        .withContext('closed should be set')
        .toEqual(new EventEmitter<boolean>());

      expect(component.Languages)
        .withContext('Languages should be set')
        .toBe(Languages);

      expect(component.englishName)
        .withContext('englishName should be set')
        .toBe('');

      expect(component.frenchName)
        .withContext('frenchName should be set')
        .toBe('');

      expect(component.loaderTexts)
        .withContext('loaderTexts should be set')
        .toBe(Preloaders.TEXTS);

      expect(component.doubleImgDisplay)
        .withContext('doubleImgDisplay should be set')
        .toBe('block');

      expect(component.flagSrcs)
        .withContext('flagSrcs should be set')
        .toEqual([
          '../../../../assets/flags/fr.svg',
          '../../../../assets/flags/gb.svg',
          '../../../../assets/flags/us.svg',
          '../../../../assets/flags/xx.svg',
        ]);

      expect(component.flagSelectors)
        .withContext('flagSelectors should be set')
        .toEqual(['fr', 'gb', 'us', 'xx']);

      expect(component.preloaders)
        .withContext('preloaders should be set')
        .toEqual([Preloaders.MAIN]);
    };
    const shouldSubscribeToVisibleToLoadTextServiceExpectation =
      'should subscribe to the visibleToLoadTextService';
    const shouldSubscribeToVisibleToLoadTextService = (done: DoneFn) => {
      setTimeout(() => {
        expect(visibleToLoadTextServiceSpy.subscribe)
          .withContext('subscribe should have been called')
          .toHaveBeenCalledOnceWith(component, true);
        done();
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
  });

  describe('updateTexts method', () => {
    const english = 'test english';
    const french = 'test français';

    const shouldCallTextServiceExpectation = 'should call the textService';
    const shouldCallTextService = () => {
      component.updateTexts();
      expect(textServiceSpy.getTextInLanguage)
        .withContext('getTextInLanguage should have been called twice')
        .toHaveBeenCalledTimes(2);
      expect(textServiceSpy.getTextInLanguage)
        .withContext(
          'getTextInLanguage should have been called with proper arguments - 1'
        )
        .toHaveBeenCalledWith(englishNameSelector, Languages.ENGLISH);
      expect(textServiceSpy.getTextInLanguage)
        .withContext(
          'getTextInLanguage should have been called with proper arguments - 2'
        )
        .toHaveBeenCalledWith(frenchNameSelector, Languages.FRENCH);
    };

    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
      textServiceSpy.getTextInLanguage.and.returnValues(
        of(english),
        of(french)
      );
      component.updateTexts();

      const actualEnglish = component.englishName;
      const actualFrench = component.frenchName;

      expect(actualEnglish)
        .withContext('should set english language name')
        .toBe(english);
      expect(actualFrench)
        .withContext('should set french language name')
        .toBe(french);
    };

    const shouldCallVisibleToLoadTextServiceExpectation =
      'should call the visibleToLoadTextService';
    const shouldCallVisibleToLoadTextService = () => {
      component.updateTexts();

      expect(visibleToLoadTextServiceSpy.textLoaded)
        .withContext('should call the service twice')
        .toHaveBeenCalledTimes(2);

      expect(visibleToLoadTextServiceSpy.textLoaded)
        .withContext('should call the service with proper arguments')
        .toHaveBeenCalledWith(component);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);

        textServiceSpy.getTextInLanguage.and.returnValues(
          of(english),
          of(french)
        );

        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);

        textServiceSpy.getTextInLanguage.and.returnValues(
          of(english),
          of(french)
        );

        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);

        textServiceSpy.getTextInLanguage.and.returnValues(
          of(english),
          of(french)
        );

        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
  });

  describe('ngOnDestroy method', () => {
    const shouldUnsubscribeExpectation =
      'should unsubscribe from the visibleToLoadTextService';
    const shouldUnsubscribe = () => {
      component.ngOnDestroy();
      expect(visibleToLoadTextServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(component);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
  });

  describe('getElement method', () => {
    const shouldReturnElementExpectation = 'should return the element';
    const shouldReturnElement = () => {
      const expected = new ElementRef(document.createElement('div'));
      component.mainDiv = expected;
      const actual = component.getElement();
      expect(actual)
        .withContext('should return something')
        .toEqual(jasmine.anything());
      expect(actual).withContext('should return the element').toEqual(expected);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
  });

  describe('onDoubleImgLoad method', () => {
    const shouldSetDoublieImgDisplayToNoneExpectation =
      "should set doubleImgDisplay to 'none'";
    const shouldSetDoublieImgDisplayToNone = () => {
      component.onDoubleImgLoad();

      expect(component.doubleImgDisplay)
        .withContext("doubleImgDisplay should be 'none'")
        .toBe('none');
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(
        shouldSetDoublieImgDisplayToNoneExpectation,
        shouldSetDoublieImgDisplayToNone
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(
        shouldSetDoublieImgDisplayToNoneExpectation,
        shouldSetDoublieImgDisplayToNone
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(
        shouldSetDoublieImgDisplayToNoneExpectation,
        shouldSetDoublieImgDisplayToNone
      );
    });
  });

  describe('closeModal method', () => {
    const shouldSetIsOpenExpectation = 'should set isOpen to false';
    const shouldSetIsOpen = () => {
      component.isOpen = true;

      const actualBefore = component.isOpen;
      expect(actualBefore).withContext('should be true before').toBeTrue();

      component.closeModal();

      const actualAfter = component.isOpen;
      expect(actualAfter).withContext('should be false after').toBeFalse();
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldSetIsOpenExpectation, shouldSetIsOpen);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldSetIsOpenExpectation, shouldSetIsOpen);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldSetIsOpenExpectation, shouldSetIsOpen);
    });
  });

  describe('changeLanguage method', () => {
    const shouldCloseModalExpectation = 'should close the modal';
    const shouldCloseModal = () => {
      spyOn(component, 'closeModal');

      expect(component.closeModal)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      languageServiceSpy.current.and.returnValue(Languages.FRENCH);
      component.changeLanguage(Languages.FRENCH);

      expect(component.closeModal)
        .withContext('should have been called after - 1')
        .toHaveBeenCalledOnceWith();

      component.isOpen = true;

      languageServiceSpy.current.and.returnValue(Languages.FRENCH);
      component.changeLanguage(Languages.ENGLISH);

      expect(component.closeModal)
        .withContext('should have been called after - 2')
        .toHaveBeenCalledTimes(2);
    };

    const shouldChangeLanguageExpectation = 'should change the language';
    const shouldChangeLanguage = () => {
      expect(languageServiceSpy.set)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      languageServiceSpy.current.and.returnValue(Languages.FRENCH);
      component.changeLanguage(Languages.FRENCH);

      expect(languageServiceSpy.set)
        .withContext('should not have been called after')
        .not.toHaveBeenCalled();

      component.isOpen = true;

      languageServiceSpy.current.and.returnValue(Languages.FRENCH);
      component.changeLanguage(Languages.ENGLISH);

      expect(languageServiceSpy.set)
        .withContext('should have been called after')
        .toHaveBeenCalledOnceWith(Languages.ENGLISH);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'languageChange']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        languageServiceSpy = jasmine.createSpyObj('TextService', [
          'current',
          'set',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCloseModalExpectation, shouldCloseModal);
      it(shouldChangeLanguageExpectation, shouldChangeLanguage);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'languageChange']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        languageServiceSpy = jasmine.createSpyObj('TextService', [
          'current',
          'set',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCloseModalExpectation, shouldCloseModal);
      it(shouldChangeLanguageExpectation, shouldChangeLanguage);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'languageChange']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        languageServiceSpy = jasmine.createSpyObj('TextService', [
          'current',
          'set',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCloseModalExpectation, shouldCloseModal);
      it(shouldChangeLanguageExpectation, shouldChangeLanguage);
    });
  });

  describe('onClick method', () => {
    const shouldCloseModalExpectation = 'should close modal';
    const shouldCloseModal = () => {
      spyOn(component, 'closeModal');

      const clickedElSpy = jasmine.createSpyObj(HTMLElement, ['contains']);
      component.clickedEl = clickedElSpy;

      const modalContentDivSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const modalNativeSpy = jasmine.createSpyObj(HTMLElement, ['contains']);
      (
        Object.getOwnPropertyDescriptor(modalContentDivSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(modalNativeSpy);
      component.modalContent = modalContentDivSpy;

      component.isOpen = true;
      clickedElSpy.contains.and.returnValue(false);
      modalNativeSpy.contains.and.returnValue(false);

      component.onClick({
        target: null as unknown as HTMLElement,
      } as unknown as Event);

      expect(component.closeModal)
        .withContext('should be called')
        .toHaveBeenCalledOnceWith();
    };

    const shouldNotCloseModalIfNotOpenExpectation =
      'should not close modal if not open';
    const shouldNotCloseModalIfNotOpen = () => {
      spyOn(component, 'closeModal');

      const clickedElSpy = jasmine.createSpyObj(HTMLElement, ['contains']);
      component.clickedEl = clickedElSpy;

      const modalContentDivSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const modalNativeSpy = jasmine.createSpyObj(HTMLElement, ['contains']);
      (
        Object.getOwnPropertyDescriptor(modalContentDivSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(modalNativeSpy);
      component.modalContent = modalContentDivSpy;

      component.isOpen = false;
      clickedElSpy.contains.and.returnValue(false);
      modalNativeSpy.contains.and.returnValue(false);

      component.onClick({
        target: null as unknown as HTMLElement,
      } as unknown as Event);

      expect(component.closeModal)
        .withContext('should be called')
        .not.toHaveBeenCalled();
    };

    const shouldNotCloseModalIfOpeningModalExpectation =
      'should not close modal if modal is opening';
    const shouldNotCloseModalIfOpeningModal = () => {
      spyOn(component, 'closeModal');

      const clickedElSpy = jasmine.createSpyObj(HTMLElement, ['contains']);
      component.clickedEl = clickedElSpy;

      const modalContentDivSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const modalNativeSpy = jasmine.createSpyObj(HTMLElement, ['contains']);
      (
        Object.getOwnPropertyDescriptor(modalContentDivSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(modalNativeSpy);
      component.modalContent = modalContentDivSpy;

      component.isOpen = true;
      clickedElSpy.contains.and.returnValue(true);
      modalNativeSpy.contains.and.returnValue(false);

      component.onClick({
        target: null as unknown as HTMLElement,
      } as unknown as Event);

      expect(component.closeModal)
        .withContext('should be called')
        .not.toHaveBeenCalled();
    };

    const shouldNotCloseModalIfClickOnModalExpectation =
      'should not close modal if modal is clicked';
    const shouldNotCloseModalIfClickOnModal = () => {
      spyOn(component, 'closeModal');

      const clickedElSpy = jasmine.createSpyObj(HTMLElement, ['contains']);
      component.clickedEl = clickedElSpy;

      const modalContentDivSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const modalNativeSpy = jasmine.createSpyObj(HTMLElement, ['contains']);
      (
        Object.getOwnPropertyDescriptor(modalContentDivSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(modalNativeSpy);
      component.modalContent = modalContentDivSpy;

      component.isOpen = true;
      clickedElSpy.contains.and.returnValue(false);
      modalNativeSpy.contains.and.returnValue(true);

      component.onClick({
        target: null as unknown as HTMLElement,
      } as unknown as Event);

      expect(component.closeModal)
        .withContext('should be called')
        .not.toHaveBeenCalled();
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        languageServiceSpy = jasmine.createSpyObj('TextService', [
          'current',
          'set',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: LanguageService, useValue: languageServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCloseModalExpectation, shouldCloseModal);
      it(shouldNotCloseModalIfNotOpenExpectation, shouldNotCloseModalIfNotOpen);
      it(
        shouldNotCloseModalIfOpeningModalExpectation,
        shouldNotCloseModalIfOpeningModal
      );
      it(
        shouldNotCloseModalIfClickOnModalExpectation,
        shouldNotCloseModalIfClickOnModal
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        languageServiceSpy = jasmine.createSpyObj('TextService', [
          'current',
          'set',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCloseModalExpectation, shouldCloseModal);
      it(shouldNotCloseModalIfNotOpenExpectation, shouldNotCloseModalIfNotOpen);
      it(
        shouldNotCloseModalIfOpeningModalExpectation,
        shouldNotCloseModalIfOpeningModal
      );
      it(
        shouldNotCloseModalIfClickOnModalExpectation,
        shouldNotCloseModalIfClickOnModal
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', [
          'getTextInLanguage',
        ]);
        languageServiceSpy = jasmine.createSpyObj('TextService', [
          'current',
          'set',
        ]);
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCloseModalExpectation, shouldCloseModal);
      it(shouldNotCloseModalIfNotOpenExpectation, shouldNotCloseModalIfNotOpen);
      it(
        shouldNotCloseModalIfOpeningModalExpectation,
        shouldNotCloseModalIfOpeningModal
      );
      it(
        shouldNotCloseModalIfClickOnModalExpectation,
        shouldNotCloseModalIfClickOnModal
      );
    });
  });
});
