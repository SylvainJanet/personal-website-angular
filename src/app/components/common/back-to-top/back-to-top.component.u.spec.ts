import { LanguageService } from 'src/app/services/language/language.service';
import { BackToTopComponent } from './back-to-top.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { scriptVar } from 'src/scripts/template/tools/setUp';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';

describe('BackToTopComponent - unit', () => {
  let backToTopComponent: BackToTopComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  const backToTopAltSelector = 'back-to-top-alt';
  const expectedBackToTopAlt = 'this is a test';

  const visibleState = scriptVar.backToTopVisibleState;
  const invisibleState = scriptVar.backToTopInvisibleState;

  beforeEach(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
    textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

    TestBed.configureTestingModule({
      providers: [
        BackToTopComponent,
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      spyOn(BackToTopComponent.prototype, 'updateTexts');
      backToTopComponent = TestBed.inject(BackToTopComponent);
    });
    it('should create', () => {
      expect(backToTopComponent)
        .withContext('component should create')
        .toBeTruthy();
    });

    it('should set default values', () => {
      expect(backToTopComponent)
        .withContext('component should create')
        .toBeTruthy();
      expect(backToTopComponent.trigger)
        .withContext('trigger should be set')
        .toBeGreaterThan(0);

      expect(backToTopComponent.iconOpacity)
        .withContext('iconOpacity should be set')
        .toBe('0');
      expect(backToTopComponent.iconPointerEvent)
        .withContext('iconPointerEvent should be set')
        .toBe('none');
      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be set')
        .toBe(invisibleState);
      backToTopComponent.altTxt.subscribe((s) => {
        expect(s).withContext('altTxt should be set').toBe('');
      });
      expect(backToTopComponent.preloaders)
        .withContext('preloaders should be set')
        .toEqual([Preloaders.MAIN]);
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe)
        .withContext('subscribe should have been called')
        .toHaveBeenCalledOnceWith(backToTopComponent);
    });

    it('should update the texts', () => {
      expect(backToTopComponent.updateTexts)
        .withContext('updateTexts should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      backToTopComponent = TestBed.inject(BackToTopComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get)
        .withContext('get should have been called one time')
        .toHaveBeenCalledTimes(1);
      expect(textServiceSpy.get)
        .withContext('get should have been called with the correct arguments')
        .toHaveBeenCalledWith(backToTopAltSelector);
    });
    it('should set the properties to the textService result', () => {
      const actualAltObs = backToTopComponent.altTxt;

      actualAltObs.subscribe((s) => {
        expect(s)
          .withContext('altTxt should be set')
          .toBe(expectedBackToTopAlt);
      });
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      backToTopComponent = TestBed.inject(BackToTopComponent);
    });
    it('should unsubscribe from the languageService', () => {
      backToTopComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(backToTopComponent);
    });
  });

  describe('onScroll method', () => {
    beforeEach(() => {
      backToTopComponent = TestBed.inject(BackToTopComponent);
    });
    it('should call updateAfterLoaded method from invisible to visible', () => {
      expect(backToTopComponent.backToTopState)
        .withContext('altTxt should be set')
        .toBe(invisibleState);
      spyOn(backToTopComponent, 'updateBackToTop');

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.updateBackToTop)
        .withContext('updateBackToTop should have been called')
        .toHaveBeenCalledTimes(1);
    });
    it('should call updateAfterLoaded method from visible to invisible', () => {
      spyOn(backToTopComponent, 'updateBackToTop');

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.updateBackToTop)
        .withContext('updateBackToTop should have been called - 1')
        .toHaveBeenCalledTimes(1);

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.updateBackToTop)
        .withContext('updateBackToTop should have been called - 2')
        .toHaveBeenCalledTimes(2);
    });
    it('should change from invisible to visible', () => {
      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be invisible')
        .toBe(invisibleState);
      spyOn(backToTopComponent, 'updateBackToTop');

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be visible')
        .toBe(visibleState);
    });
    it('should change from visible to invisible', () => {
      spyOn(backToTopComponent, 'updateBackToTop');

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger + 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be visible')
        .toBe(visibleState);

      backToTopComponent.onScroll({
        currentTarget: { scrollY: backToTopComponent.trigger - 1 } as Window,
      } as unknown as Event);

      expect(backToTopComponent.backToTopState)
        .withContext('backToTopState should be invisible')
        .toBe(invisibleState);
    });
  });

  describe('onClick method', () => {
    beforeEach(() => {
      backToTopComponent = TestBed.inject(BackToTopComponent);
    });
    // it('should scroll to top smoothly', () => {});
    it('should prevent default behaviour of the link', () => {
      const eventSpy: jasmine.SpyObj<Event> = jasmine.createSpyObj('Event', [
        'preventDefault',
      ]);

      backToTopComponent.onClick(eventSpy);

      expect(eventSpy.preventDefault)
        .withContext('preventDefault should have been called')
        .toHaveBeenCalledOnceWith();
    });
  });

  describe('updateBackToTop', () => {
    beforeEach(() => {
      backToTopComponent = TestBed.inject(BackToTopComponent);
    });
    it('set icon opacity when invisible', () => {
      const expected = '0';

      backToTopComponent.backToTopState = invisibleState;
      backToTopComponent.updateBackToTop();

      const actual = backToTopComponent.iconOpacity;

      expect(actual).withContext('opacity should be set').toBe(expected);
    });
    it('set pointer event when invisible', () => {
      const expected = 'none';

      backToTopComponent.backToTopState = invisibleState;
      backToTopComponent.updateBackToTop();

      const actual = backToTopComponent.iconPointerEvent;

      expect(actual).withContext('pointer event should be set').toBe(expected);
    });
    it('set icon opacity when visible', () => {
      const expected = '1';

      backToTopComponent.backToTopState = visibleState;
      backToTopComponent.updateBackToTop();

      const actual = backToTopComponent.iconOpacity;

      expect(actual).withContext('opacity should be set').toBe(expected);
    });
    it('set pointer event when visible', () => {
      const expected = 'all';

      backToTopComponent.backToTopState = visibleState;
      backToTopComponent.updateBackToTop();

      const actual = backToTopComponent.iconPointerEvent;

      expect(actual).withContext('pointer event should be set').toBe(expected);
    });
  });
});
