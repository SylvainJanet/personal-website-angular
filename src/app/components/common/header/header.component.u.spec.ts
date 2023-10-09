import { TestBed } from '@angular/core/testing';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { HeaderComponent } from './header.component';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { of } from 'rxjs';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { Languages } from 'src/app/enums/languages';

describe('HeaderComponent - unit', () => {
  let headerComponent: HeaderComponent;
  let DOMComputationServiceSpy: jasmine.SpyObj<DOMComputationService>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  const myNameSelector = 'sylvain-janet';
  const expectedName = 'test title';
  const expectedOtherLanguage = 'test other language';
  const expectedActualHeight = 18;

  const headerStateLight = scriptVar.headerStateLight;
  const headerStateDark = scriptVar.headerStateDark;

  const cssDarkClass = scriptVar.cssHeaderDarkClass;
  const cssLightClass = scriptVar.cssHeaderLightClass;
  const cssContentDarkClass = scriptVar.cssHeaderContentDarkClass;
  const cssContentLightClass = scriptVar.cssHeaderContentLightClass;

  beforeEach(() => {
    DOMComputationServiceSpy = jasmine.createSpyObj('DOMComputationService', [
      'getActualHeight',
    ]);
    DOMComputationServiceSpy.getActualHeight.and.returnValues(
      expectedActualHeight,
      expectedActualHeight,
      expectedActualHeight,
      expectedActualHeight
    );
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
      'current',
      'set',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', [
      'get',
      'getOtherLanguage',
    ]);
    textServiceSpy.get.and.returnValues(of(expectedName));
    textServiceSpy.getOtherLanguage.and.returnValues(of(expectedOtherLanguage));
    logServiceGlobalSpy = jasmine.createSpyObj('LogService', ['withClassName']);
    logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
    logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);
    TestBed.configureTestingModule({
      providers: [
        HeaderComponent,
        { provide: DOMComputationService, useValue: DOMComputationServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
        { provide: LogService, useValue: logServiceGlobalSpy },
      ],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      spyOn(HeaderComponent.prototype, 'updateTexts');
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should create', () => {
      expect(headerComponent)
        .withContext('component should create')
        .toBeTruthy();
    });

    it('should set default values', () => {
      expect(headerComponent)
        .withContext('component should create')
        .toBeTruthy();
      expect(headerComponent.logger)
        .withContext('logger should be set')
        .toBe(logServiceSpy);

      expect(headerComponent.trigger)
        .withContext('trigger should be set')
        .toBe(0);
      expect(headerComponent.headerState)
        .withContext('headerState should be set')
        .toBe('');
      headerComponent.myName.subscribe((s) => {
        expect(s).withContext('myName should be set').toBe('');
      });
      headerComponent.otherLanguage.subscribe((s) => {
        expect(s).withContext('otherLanguage should be set').toBe('');
      });
    });

    it('should set proper logger', () => {
      const expected = 'HeaderComponent';
      expect(logServiceGlobalSpy.withClassName)
        .withContext('withClassName should have been called')
        .toHaveBeenCalledOnceWith(expected);
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe)
        .withContext('withContext should have been called')
        .toHaveBeenCalledOnceWith(headerComponent);
    });

    it('should update the texts', () => {
      expect(headerComponent.updateTexts)
        .withContext('updateTexts should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get)
        .withContext('get should have been called')
        .toHaveBeenCalledTimes(1);
      expect(textServiceSpy.get)
        .withContext('get should have been called with the proper arguments')
        .toHaveBeenCalledWith(myNameSelector);

      expect(textServiceSpy.getOtherLanguage)
        .withContext('getOtherLanguage should have been called')
        .toHaveBeenCalledTimes(1);
    });
    it('should set the properties to the textService result', () => {
      const actualMyNameObs = headerComponent.myName;
      const actualOtherLanguageObs = headerComponent.otherLanguage;

      actualMyNameObs.subscribe((s) => {
        expect(s).withContext('myName should be set').toBe(expectedName);
      });
      actualOtherLanguageObs.subscribe((s) => {
        expect(s)
          .withContext('otherLanguage should be set')
          .toBe(expectedOtherLanguage);
      });
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should unsubscribe from the languageService', () => {
      headerComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(headerComponent);
    });
  });

  describe('onResize method', () => {
    beforeEach(() => {
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should call updateTrigger method', () => {
      spyOn(headerComponent, 'updateTrigger');
      const eventInput = {
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event;

      headerComponent.onResize(eventInput);

      expect(headerComponent.updateTrigger)
        .withContext('updateTrigger should have been called')
        .toHaveBeenCalledOnceWith(eventInput);
    });
  });

  describe('ngOnInit method', () => {
    beforeEach(() => {
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should call updateTrigger method', () => {
      spyOn(headerComponent, 'updateTrigger');

      headerComponent.ngOnInit();

      expect(headerComponent.updateTrigger)
        .withContext('updateTrigger should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTrigger method', () => {
    beforeEach(() => {
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should set trigger to the height of the banner', () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      const actualTrigger = headerComponent.trigger;

      expect(DOMComputationServiceSpy.getActualHeight)
        .withContext(
          'getActualHeight should have been called once with the proper arguments'
        )
        .toHaveBeenCalledOnceWith(
          document.getElementsByClassName('banner').item(0)
        );

      expect(actualTrigger)
        .withContext('trigger should be set')
        .toBe(expectedActualHeight);
    });
    it('should switch header state from light to dark when appropriate', () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark initially')
        .toBe(headerStateDark);

      // trigger is now set

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be light')
        .toBe(headerStateLight);

      // state is now light

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark')
        .toBe(headerStateDark);
    });
    it('should switch header state from dark to light when appropriate', () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark after an update')
        .toBe(headerStateDark);

      // trigger is now set

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be light')
        .toBe(headerStateLight);

      // state is now light

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark')
        .toBe(headerStateDark);
    });
    it('should call updateHeader when there is a change', () => {
      spyOn(headerComponent, 'updateHeader');
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called 1 time')
        .toHaveBeenCalledTimes(1);

      // trigger is now set

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called 2 times')
        .toHaveBeenCalledTimes(2);

      // state is now light

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called 3 times')
        .toHaveBeenCalledTimes(3);

      // state has not changed

      headerComponent.updateTrigger({
        currentTarget: { scrollY: headerComponent.trigger - 2 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called 3 times')
        .toHaveBeenCalledTimes(3);
    });
  });

  describe('changeEveryClass method', () => {
    beforeEach(() => {
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should select using the old class selector', () => {
      const oldClass = 'old-class-test';
      const newClass = 'new-class-test';

      const newDiv1 = document.createElement('div');
      const newDiv2 = document.createElement('div');
      const newSpan = document.createElement('span');

      newDiv1.classList.add(oldClass);
      newDiv2.classList.add(oldClass);
      newSpan.classList.add(oldClass);

      document.querySelector('html')?.appendChild(newDiv1);
      document.querySelector('html')?.appendChild(newDiv2);
      document.querySelector('html')?.appendChild(newSpan);

      const elements = document.querySelectorAll('.' + oldClass);
      expect(elements.length)
        .withContext('elements should be non empty')
        .toBeGreaterThan(0);
      spyOn(document, 'querySelectorAll').and.returnValue(elements);

      headerComponent.changeEveryClass(oldClass, newClass);

      expect(document.querySelectorAll)
        .withContext('elements with the appropriate class should be queried')
        .toHaveBeenCalledOnceWith('.' + oldClass);
    });
    it('should change the classes of the elements', () => {
      const oldClass = 'old-class-test-test-test';
      const newClass = 'new-class-test-test-test';

      const newDiv1 = document.createElement('div');
      const newDiv2 = document.createElement('div');
      const newSpan = document.createElement('span');

      newDiv1.classList.add(oldClass);
      newDiv2.classList.add(oldClass);
      newSpan.classList.add(oldClass);

      document.querySelector('html')?.appendChild(newDiv1);
      document.querySelector('html')?.appendChild(newDiv2);
      document.querySelector('html')?.appendChild(newSpan);

      const elements = document.querySelectorAll('.' + oldClass);
      expect(elements.length)
        .withContext('elements should be non empty')
        .toBeGreaterThan(0);
      spyOn(document, 'querySelectorAll').and.returnValue(elements);

      headerComponent.changeEveryClass(oldClass, newClass);

      expect(document.querySelectorAll)
        .withContext('elements with the appropriate class should be queried')
        .toHaveBeenCalledOnceWith('.' + oldClass);

      for (let i = 0; i < elements.length; i++) {
        const el = elements.item(i);
        expect(el.classList.contains(oldClass))
          .withContext('element i=' + i + ' should not have old css class')
          .toBeFalse();
        expect(el.classList.contains(newClass))
          .withContext('element i=' + i + ' should have new css class')
          .toBeTrue();
      }
    });
  });

  describe('updateHeader method', () => {
    beforeEach(() => {
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should change every dark class to light class when appropriate', () => {
      spyOn(headerComponent, 'changeEveryClass');
      headerComponent.headerState = 'light';

      headerComponent.updateHeader();

      expect(headerComponent.changeEveryClass)
        .withContext('changeEveryClass should have been called 2 times')
        .toHaveBeenCalledTimes(2);
      expect(headerComponent.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(cssDarkClass, cssLightClass);
      expect(headerComponent.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(cssContentDarkClass, cssContentLightClass);
    });
    it('should change every light class to dark class when appropriate', () => {
      spyOn(headerComponent, 'changeEveryClass');
      headerComponent.headerState = 'dark';

      headerComponent.updateHeader();

      expect(headerComponent.changeEveryClass)
        .withContext('changeEveryClass should have been called 2 times')
        .toHaveBeenCalledTimes(2);
      expect(headerComponent.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(cssLightClass, cssDarkClass);
      expect(headerComponent.changeEveryClass)
        .withContext(
          'changeEveryClass should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(cssContentLightClass, cssContentDarkClass);
    });
  });

  describe('onScroll method', () => {
    beforeEach(() => {
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should switch state to light', () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      headerComponent.headerState = headerStateDark;
      headerComponent.onScroll({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be light')
        .toBe(headerStateLight);
    });
    it('should switch state to dark', () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      headerComponent.headerState = headerStateLight;
      headerComponent.onScroll({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.headerState)
        .withContext('headerState should be dark')
        .toBe(headerStateDark);
    });
    it('should call updateHeader when switching state to light', () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      spyOn(headerComponent, 'updateHeader');
      headerComponent.headerState = headerStateDark;
      headerComponent.onScroll({
        currentTarget: { scrollY: headerComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called')
        .toHaveBeenCalledTimes(1);
    });
    it('should call updateHeader when switching state to dark', () => {
      headerComponent.updateTrigger({
        currentTarget: { scrollY: 0 } as Window,
      } as unknown as Event);

      spyOn(headerComponent, 'updateHeader');
      headerComponent.headerState = headerStateLight;
      headerComponent.onScroll({
        currentTarget: { scrollY: headerComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(headerComponent.updateHeader)
        .withContext('updateHeader should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('languageChange method', () => {
    beforeEach(() => {
      headerComponent = TestBed.inject(HeaderComponent);
    });
    it('should switch language from ENGLISH to FRENCH', () => {
      languageServiceSpy.current.and.returnValue(Languages.ENGLISH);

      headerComponent.languageChange();

      expect(languageServiceSpy.set)
        .withContext('set should have been called')
        .toHaveBeenCalledOnceWith(Languages.FRENCH);
    });
    it('should switch language from FRENCH to ENGLISH', () => {
      languageServiceSpy.current.and.returnValue(Languages.FRENCH);

      headerComponent.languageChange();

      expect(languageServiceSpy.set)
        .withContext('set should have been called')
        .toHaveBeenCalledOnceWith(Languages.ENGLISH);
    });
  });
});
