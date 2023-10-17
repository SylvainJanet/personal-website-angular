import { TestBed } from '@angular/core/testing';

import { VisibleToLoadTextService } from './visible-to-load-text.service';
import { WindowScrollService } from '../windowScrollService/window-scroll.service';
import { WindowResizeService } from '../windowResizeService/window-resize.service';
import { DOMComputationService } from '../domcomputation/domcomputation.service';
import { ElementRef, PLATFORM_ID } from '@angular/core';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { Observable } from 'rxjs';

let visibleToLoadTextService: VisibleToLoadTextService;
let windowScrollService: WindowScrollService;
let windowResizeService: WindowResizeService;
let domComputationService: DOMComputationService;

const expectedBufferHeight = 2;
const expectedBufferWidth = 1;

describe('VisibleToLoadTextService - unit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PLATFORM_ID,
          useValue: 'browser',
        },
      ],
    });
    windowScrollService = TestBed.inject(WindowScrollService);
    windowResizeService = TestBed.inject(WindowResizeService);
    domComputationService = new DOMComputationService();
  });

  it('should be defined', () => {
    visibleToLoadTextService = new VisibleToLoadTextService(
      windowScrollService,
      windowResizeService,
      domComputationService
    );
    expect(visibleToLoadTextService)
      .withContext('service should create')
      .toEqual(jasmine.anything());
  });

  describe('constructor', () => {
    it('should have correct initial parameters', () => {
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );

      expect(visibleToLoadTextService.subscribers)
        .withContext('subscribers should be set')
        .toEqual([]);
      expect(visibleToLoadTextService.visibility)
        .withContext('visibility should be set')
        .toEqual(new Map<ComponentWithText, boolean>());
      expect(visibleToLoadTextService.loaded)
        .withContext('loaded should be set')
        .toEqual(new Map<ComponentWithText, boolean>());
      expect(visibleToLoadTextService.loading)
        .withContext('loading should be set')
        .toEqual(new Map<ComponentWithText, boolean>());
      expect(visibleToLoadTextService.toReload)
        .withContext('toReload should be set')
        .toEqual(new Map<ComponentWithText, boolean>());
      expect(visibleToLoadTextService.scroll)
        .withContext('scroll should be set')
        .toEqual(jasmine.anything());
      expect(visibleToLoadTextService.resize)
        .withContext('resize should be set')
        .toEqual(jasmine.anything());
      expect(visibleToLoadTextService.bufferFactorHeight)
        .withContext('bufferFactorHeight should be set')
        .toBe(expectedBufferHeight);
      expect(visibleToLoadTextService.bufferFactorWidth)
        .withContext('bufferFactorWidth should be set')
        .toBe(expectedBufferWidth);
    });
    it('should subscribe to the scroll observable', () => {
      const windowScrollServiceSpy = jasmine.createSpyObj(
        'WindowScrollService',
        [],
        ['scroll']
      );
      const scrollObsSpy = jasmine.createSpyObj('Observable', ['subscribe']);
      (
        Object.getOwnPropertyDescriptor(windowScrollServiceSpy, 'scroll')
          ?.get as jasmine.Spy<() => Observable<number>>
      ).and.returnValue(scrollObsSpy);
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollServiceSpy,
        windowResizeService,
        domComputationService
      );

      expect(windowScrollServiceSpy.scroll.subscribe)
        .withContext('subscribe method should have been called')
        .toHaveBeenCalledTimes(1);

      spyOn(VisibleToLoadTextService.prototype, 'loadNewTexts');
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );

      expect(visibleToLoadTextService.loadNewTexts)
        .withContext(
          'before scroll obs emits, loadNewTexts should not have been called'
        )
        .not.toHaveBeenCalled();

      const scrollEvent = new CustomEvent('scroll', {
        bubbles: false,
        cancelable: false,
        detail: null,
      });
      dispatchEvent(scrollEvent);

      expect(visibleToLoadTextService.loadNewTexts)
        .withContext(
          'after scroll obs emits, loadNewTexts should have been called'
        )
        .toHaveBeenCalled();
    });
    it('should subscribe to the resize observable', () => {
      const windowResizeServiceSpy = jasmine.createSpyObj(
        'WindowResizeService',
        [],
        ['resize']
      );
      const resizeObsSpy = jasmine.createSpyObj('Observable', ['subscribe']);
      (
        Object.getOwnPropertyDescriptor(windowResizeServiceSpy, 'resize')
          ?.get as jasmine.Spy<() => Observable<number[]>>
      ).and.returnValue(resizeObsSpy);
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeServiceSpy,
        domComputationService
      );

      expect(windowResizeServiceSpy.resize.subscribe)
        .withContext('subscribe method should have been called')
        .toHaveBeenCalledTimes(1);

      spyOn(VisibleToLoadTextService.prototype, 'loadNewTexts');
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );

      expect(visibleToLoadTextService.loadNewTexts)
        .withContext(
          'before resize obs emits, loadNewTexts should not have been called'
        )
        .not.toHaveBeenCalled();

      const scrollEvent = new CustomEvent('resize', {
        bubbles: false,
        cancelable: false,
        detail: null,
      });
      dispatchEvent(scrollEvent);

      expect(visibleToLoadTextService.loadNewTexts)
        .withContext(
          'after resize obs emits, loadNewTexts should have been called'
        )
        .toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy method', () => {
    it('should unsubscribe from scroll observable', () => {
      const windowScrollServiceSpy = jasmine.createSpyObj(
        'WindowScrollService',
        [],
        ['scroll']
      );
      const scrollObsSpy = jasmine.createSpyObj('Observable', ['subscribe']);
      const subscriptionSpy = jasmine.createSpyObj('Subscription', [
        'unsubscribe',
      ]);
      scrollObsSpy.subscribe.and.returnValue(subscriptionSpy);
      (
        Object.getOwnPropertyDescriptor(windowScrollServiceSpy, 'scroll')
          ?.get as jasmine.Spy<() => Observable<number>>
      ).and.returnValue(scrollObsSpy);
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollServiceSpy,
        windowResizeService,
        domComputationService
      );
      expect(subscriptionSpy.unsubscribe)
        .withContext('unsubscribe method should not have been called before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.ngOnDestroy();

      expect(subscriptionSpy.unsubscribe)
        .withContext('should call unsubscribe method')
        .toHaveBeenCalled();
    });
    it('should unsubscribe from resize observable', () => {
      const windowResizeServiceSpy = jasmine.createSpyObj(
        'WindowResizeService',
        [],
        ['resize']
      );
      const scrollObsSpy = jasmine.createSpyObj('Observable', ['subscribe']);
      const subscriptionSpy = jasmine.createSpyObj('Subscription', [
        'unsubscribe',
      ]);
      scrollObsSpy.subscribe.and.returnValue(subscriptionSpy);
      (
        Object.getOwnPropertyDescriptor(windowResizeServiceSpy, 'resize')
          ?.get as jasmine.Spy<() => Observable<number[]>>
      ).and.returnValue(scrollObsSpy);
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeServiceSpy,
        domComputationService
      );
      expect(subscriptionSpy.unsubscribe)
        .withContext('unsubscribe method should not have been called before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.ngOnDestroy();

      expect(subscriptionSpy.unsubscribe)
        .withContext('should call unsubscribe method')
        .toHaveBeenCalled();
    });
  });

  describe('subscribe method', () => {
    beforeEach(() => {
      spyOn(VisibleToLoadTextService.prototype, 'loadNewTextsOf');
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
    });
    it('should subscribe a component with text to the service', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.subscribers.length)
        .withContext('there should be no subscribers')
        .toBe(0);

      visibleToLoadTextService.subscribe(subscriber);

      expect(visibleToLoadTextService.subscribers.length)
        .withContext('there should be 1 subscriber')
        .toBe(1);
      expect(visibleToLoadTextService.subscribers[0])
        .withContext('the subscriber should be as expected')
        .toBe(subscriber);
    });
    it('should set loaded to false', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be undefined for the subscriber at first')
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber);

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be set to false')
        .toBeFalse();
    });
    it('should set loading to false', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('loading should be undefined for the subscriber at first')
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('loading should be set to false')
        .toBeFalse();
    });
    it('should set toReload to false', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.toReload.get(subscriber))
        .withContext('toReload should be undefined for the subscriber at first')
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber);

      expect(visibleToLoadTextService.toReload.get(subscriber))
        .withContext('toReload should be set to false')
        .toBeFalse();
    });
    it('should load the text of the component with text', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loadNewTextsOf)
        .withContext('loadNewTextsOf should not have been called at first')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.subscribe(subscriber);

      expect(visibleToLoadTextService.loadNewTextsOf)
        .withContext(
          'loadNewTextsOf should have been called after the subscription'
        )
        .toHaveBeenCalledOnceWith(subscriber);
    });
  });

  describe('unsubscribe method', () => {
    beforeEach(() => {
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
    });
    it('should unsubscribe a component with text to the service', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.subscribers.length)
        .withContext('there should be no subscribers')
        .toBe(0);

      visibleToLoadTextService.subscribe(subscriber1);
      visibleToLoadTextService.subscribe(subscriber2);

      expect(visibleToLoadTextService.subscribers.length)
        .withContext('there should be 2 subscribers')
        .toBe(2);
      expect(visibleToLoadTextService.subscribers[0])
        .withContext('the first subscriber should be as expected')
        .toBe(subscriber1);
      expect(visibleToLoadTextService.subscribers[1])
        .withContext('the second subscriber should be as expected')
        .toBe(subscriber2);

      visibleToLoadTextService.unsubscribe(subscriber1);

      expect(visibleToLoadTextService.subscribers.length)
        .withContext('there should be 1 subscriber')
        .toBe(1);
      expect(visibleToLoadTextService.subscribers[0])
        .withContext(
          "the only subscriber left should be the one which didn't unsubscribe"
        )
        .toBe(subscriber2);
    });
    it('should delete the component with text from the visibility map', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.visibility.get(subscriber1))
        .withContext(
          'visibility should be undefined for the subscriber at first - 1'
        )
        .toBeUndefined();
      expect(visibleToLoadTextService.visibility.get(subscriber2))
        .withContext(
          'visibility should be undefined for the subscriber at first - 2'
        )
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber1);
      visibleToLoadTextService.subscribe(subscriber2);

      expect(visibleToLoadTextService.visibility.get(subscriber1))
        .withContext('visibility should be set to false - 1')
        .toBeFalse();

      expect(visibleToLoadTextService.visibility.get(subscriber2))
        .withContext('visibility should be set to false - 2')
        .toBeFalse();

      visibleToLoadTextService.unsubscribe(subscriber1);

      expect(visibleToLoadTextService.visibility.get(subscriber1))
        .withContext('visibility should undefined after')
        .toBeUndefined();

      expect(visibleToLoadTextService.visibility.get(subscriber2))
        .withContext('visibility should be set to false - 3')
        .toBeFalse();
    });
    it('should delete the component with text from the loaded map', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loaded.get(subscriber1))
        .withContext(
          'loaded should be undefined for the subscriber at first - 1'
        )
        .toBeUndefined();
      expect(visibleToLoadTextService.loaded.get(subscriber2))
        .withContext(
          'loaded should be undefined for the subscriber at first - 2'
        )
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber1);
      visibleToLoadTextService.subscribe(subscriber2);

      expect(visibleToLoadTextService.loaded.get(subscriber1))
        .withContext('loaded should be set to false - 1')
        .toBeFalse();

      expect(visibleToLoadTextService.loaded.get(subscriber2))
        .withContext('loaded should be set to false - 2')
        .toBeFalse();

      visibleToLoadTextService.unsubscribe(subscriber1);

      expect(visibleToLoadTextService.loaded.get(subscriber1))
        .withContext('loaded should undefined after')
        .toBeUndefined();

      expect(visibleToLoadTextService.loaded.get(subscriber2))
        .withContext('loaded should be set to false - 3')
        .toBeFalse();
    });
    it('should delete the component with text from the loading map', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loading.get(subscriber1))
        .withContext(
          'loading should be undefined for the subscriber at first - 1'
        )
        .toBeUndefined();
      expect(visibleToLoadTextService.loading.get(subscriber2))
        .withContext(
          'loading should be undefined for the subscriber at first - 2'
        )
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber1);
      visibleToLoadTextService.subscribe(subscriber2);

      expect(visibleToLoadTextService.loading.get(subscriber1))
        .withContext('loading should be set to false - 1')
        .toBeFalse();

      expect(visibleToLoadTextService.loading.get(subscriber2))
        .withContext('loading should be set to false - 2')
        .toBeFalse();

      visibleToLoadTextService.unsubscribe(subscriber1);

      expect(visibleToLoadTextService.loading.get(subscriber1))
        .withContext('loading should undefined after')
        .toBeUndefined();

      expect(visibleToLoadTextService.loading.get(subscriber2))
        .withContext('loading should be set to false - 3')
        .toBeFalse();
    });
  });

  describe('updateVisibilityOf method', () => {
    let domComputationServiceSpy: jasmine.SpyObj<DOMComputationService>;
    beforeEach(() => {
      domComputationServiceSpy = jasmine.createSpyObj('DOMComputationService', [
        'isIntoView',
      ]);
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationServiceSpy
      );
    });
    it('should call the domComputationService', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(domComputationServiceSpy.isIntoView)
        .withContext('domComputationService should not have been called before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService['updateVisibilityOf'](subscriber);

      expect(domComputationServiceSpy.isIntoView)
        .withContext('domComputationService should have been called after')
        .toHaveBeenCalledOnceWith(
          subscriber.getElement(),
          expectedBufferHeight,
          expectedBufferWidth
        );
    });
    it('should set the visibility of the component', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.visibility.get(subscriber))
        .withContext('visibility should be undefined before')
        .toBeUndefined();

      domComputationServiceSpy.isIntoView.and.returnValue(true);

      visibleToLoadTextService['updateVisibilityOf'](subscriber);

      expect(visibleToLoadTextService.visibility.get(subscriber))
        .withContext('visibility should be set after - true')
        .toBeTrue();

      domComputationServiceSpy.isIntoView.and.returnValue(false);

      visibleToLoadTextService['updateVisibilityOf'](subscriber);

      expect(visibleToLoadTextService.visibility.get(subscriber))
        .withContext('visibility should be set after - false')
        .toBeFalse();
    });
  });

  describe('updateVisibility method', () => {
    beforeEach(() => {
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(visibleToLoadTextService, 'updateVisibilityOf');
    });
    it('should set the visibility of all components', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      // not a subscribe() call since it already updates the visibility of components
      visibleToLoadTextService.subscribers.push(subscriber1);
      visibleToLoadTextService.subscribers.push(subscriber2);

      expect(visibleToLoadTextService['updateVisibilityOf'])
        .withContext('visibility should have not been updated before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.updateVisibility();

      expect(visibleToLoadTextService['updateVisibilityOf'])
        .withContext('updateVisibilityOf should have been called twice')
        .toHaveBeenCalledTimes(2);
      expect(visibleToLoadTextService['updateVisibilityOf'])
        .withContext(
          'updateVisibilityOf should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(subscriber1);
      expect(visibleToLoadTextService['updateVisibilityOf'])
        .withContext(
          'updateVisibilityOf should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(subscriber2);
    });
  });

  describe('textLoaded method', () => {
    beforeEach(() => {
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
    });
    it('(no reload) should set the loaded map for the component to true', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be undefined at first')
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber);

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be false after subscription')
        .toBeFalse();

      visibleToLoadTextService.textLoaded(subscriber);

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be true after')
        .toBeTrue();
    });
    it('(no reload) should set the loading map for the component to false', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('loading should be undefined at first')
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('loading should be false after subscription')
        .toBeFalse();

      // assume the text loads
      visibleToLoadTextService.loading.set(subscriber, true);

      visibleToLoadTextService.textLoaded(subscriber);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('loading should be false after')
        .toBeFalse();
    });
    it('(reload) should set the loaded map for the component to false', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be undefined at first')
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber);
      visibleToLoadTextService.toReload.set(subscriber, true);

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be false after subscription')
        .toBeFalse();

      visibleToLoadTextService.loaded.set(subscriber, true);
      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be true before')
        .toBeTrue();

      visibleToLoadTextService.textLoaded(subscriber);

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be true false')
        .toBeFalse();
    });
    it('(reload) should set the loading map for the component to true', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('loading should be undefined at first')
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber);
      visibleToLoadTextService.toReload.set(subscriber, true);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('loading should be false after subscription')
        .toBeFalse();

      visibleToLoadTextService.textLoaded(subscriber);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('loading should be true after')
        .toBeTrue();
    });
    it('(reload) should set the toReload map for the component to false', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.toReload.get(subscriber))
        .withContext('toReload should be undefined at first')
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber);
      visibleToLoadTextService.toReload.set(subscriber, true);

      expect(visibleToLoadTextService.toReload.get(subscriber))
        .withContext('toReload should be true before')
        .toBeTrue();

      visibleToLoadTextService.textLoaded(subscriber);

      expect(visibleToLoadTextService.toReload.get(subscriber))
        .withContext('toReload should be false after')
        .toBeFalse();
    });
    it('(reload) should call updateTexts for the component', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      spyOn(subscriber, 'updateTexts');

      expect(subscriber.updateTexts)
        .withContext('should not have been called at first')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.subscribe(subscriber);
      visibleToLoadTextService.toReload.set(subscriber, true);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.textLoaded(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('hasTextLoaded method', () => {
    beforeEach(() => {
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
    });
    it('should get the loaded map value for the component', () => {
      const subscriber: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be undefined at first')
        .toBeUndefined();
      expect(visibleToLoadTextService.hasTextLoaded(subscriber))
        .withContext('returns undefined at first')
        .toBeUndefined();

      visibleToLoadTextService.subscribe(subscriber);

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be false after subscription')
        .toBeFalse();
      expect(visibleToLoadTextService.hasTextLoaded(subscriber))
        .withContext('returns false')
        .toBeFalse();

      visibleToLoadTextService.textLoaded(subscriber);

      expect(visibleToLoadTextService.loaded.get(subscriber))
        .withContext('loaded should be true after')
        .toBeTrue();
      expect(visibleToLoadTextService.hasTextLoaded(subscriber))
        .withContext('returns true')
        .toBeTrue();
    });
  });

  describe('loadNewTextsOf method', () => {
    const subscriber: ComponentWithText = {
      updateTexts: function (): void {
        //
      },
      getElement: function (): ElementRef<HTMLElement> {
        return {} as ElementRef<HTMLElement>;
      },
      ngOnDestroy: function (): void {
        //
      },
    };
    beforeEach(() => {
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(visibleToLoadTextService, 'updateVisibilityOf');
      spyOn(subscriber, 'updateTexts');
      // not subscribe method since it also calls updateVisibiliyOf and would mess with the future checks
      visibleToLoadTextService.subscribers.push(subscriber);
    });
    it('should call the updateVisibilityOf method', () => {
      expect(visibleToLoadTextService['updateVisibilityOf'])
        .withContext('should not have been called at first')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.loadNewTextsOf(subscriber);

      expect(visibleToLoadTextService['updateVisibilityOf'])
        .withContext('should have been called after')
        .toHaveBeenCalledOnceWith(subscriber);
    });
    it('should update the text when appropriate', () => {
      visibleToLoadTextService.visibility.set(subscriber, true);
      visibleToLoadTextService.loaded.set(subscriber, false);
      visibleToLoadTextService.loading.set(subscriber, false);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should have been called after')
        .toHaveBeenCalledTimes(1);
    });
    it('should set the loading map to true for the component when appropriate', () => {
      visibleToLoadTextService.visibility.set(subscriber, true);
      visibleToLoadTextService.loaded.set(subscriber, false);
      visibleToLoadTextService.loading.set(subscriber, false);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('should be false before')
        .toBeFalse();

      visibleToLoadTextService.loadNewTextsOf(subscriber);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('should be true after')
        .toBeTrue();
    });
    it('should not update the text when the component is not visible', () => {
      visibleToLoadTextService.visibility.set(subscriber, false);
      visibleToLoadTextService.loaded.set(subscriber, false);
      visibleToLoadTextService.loading.set(subscriber, false);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called after')
        .not.toHaveBeenCalled();
    });
    it('should not set the loading map to true for the component when the component is not visible', () => {
      visibleToLoadTextService.visibility.set(subscriber, false);
      visibleToLoadTextService.loaded.set(subscriber, false);
      visibleToLoadTextService.loading.set(subscriber, false);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('should be false before')
        .toBeFalse();

      visibleToLoadTextService.loadNewTextsOf(subscriber);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('should be false after')
        .toBeFalse();
    });
    it('should not update the text when the component is loaded', () => {
      visibleToLoadTextService.visibility.set(subscriber, true);
      visibleToLoadTextService.loaded.set(subscriber, true);
      visibleToLoadTextService.loading.set(subscriber, false);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called after')
        .not.toHaveBeenCalled();
    });
    it('should not set the loading map to true for the component when the component is loaded', () => {
      visibleToLoadTextService.visibility.set(subscriber, true);
      visibleToLoadTextService.loaded.set(subscriber, true);
      visibleToLoadTextService.loading.set(subscriber, false);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('should be false before')
        .toBeFalse();

      visibleToLoadTextService.loadNewTextsOf(subscriber);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('should be false after')
        .toBeFalse();
    });
    it('should not update the text when the component is loading', () => {
      visibleToLoadTextService.visibility.set(subscriber, true);
      visibleToLoadTextService.loaded.set(subscriber, false);
      visibleToLoadTextService.loading.set(subscriber, true);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called after')
        .not.toHaveBeenCalled();
    });
    it('should not set the loading map to true for the component when the component is loading', () => {
      visibleToLoadTextService.visibility.set(subscriber, true);
      visibleToLoadTextService.loaded.set(subscriber, false);
      visibleToLoadTextService.loading.set(subscriber, true);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('should be true before')
        .toBeTrue();

      visibleToLoadTextService.loadNewTextsOf(subscriber);

      expect(visibleToLoadTextService.loading.get(subscriber))
        .withContext('should be true after')
        .toBeTrue();
    });
  });

  describe('loadNewTexts method', () => {
    beforeEach(() => {
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(visibleToLoadTextService, 'loadNewTextsOf');
    });
    it('should load the new texts for every components', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      // not a subscribe() call since it already loads the texts of components
      visibleToLoadTextService.subscribers.push(subscriber1);
      visibleToLoadTextService.subscribers.push(subscriber2);

      expect(visibleToLoadTextService['loadNewTextsOf'])
        .withContext('visibility should not have been updated before')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.loadNewTexts();

      expect(visibleToLoadTextService['loadNewTextsOf'])
        .withContext('loadNewTextsOf should have been called twice')
        .toHaveBeenCalledTimes(2);
      expect(visibleToLoadTextService['loadNewTextsOf'])
        .withContext(
          'loadNewTextsOf should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(subscriber1);
      expect(visibleToLoadTextService['loadNewTextsOf'])
        .withContext(
          'loadNewTextsOf should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(subscriber2);
    });
  });

  describe('languageChange method', () => {
    beforeEach(() => {
      spyOn(VisibleToLoadTextService.prototype, 'loadNewTexts');
      visibleToLoadTextService = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
    });
    it('should call loadNewTexts components', () => {
      expect(visibleToLoadTextService.loadNewTexts)
        .withContext('should not have been called at first')
        .not.toHaveBeenCalled();

      visibleToLoadTextService.languageChange();

      expect(visibleToLoadTextService.loadNewTexts)
        .withContext('should have been called after')
        .toHaveBeenCalled();
    });
    it('should reset the loading status of the component', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      visibleToLoadTextService.subscribe(subscriber1);
      visibleToLoadTextService.subscribe(subscriber2);

      visibleToLoadTextService.loading.set(subscriber1, true);
      visibleToLoadTextService.loading.set(subscriber2, true);

      expect(visibleToLoadTextService.loading.get(subscriber1))
        .withContext('loading should be true before - 1')
        .toBeTrue();
      expect(visibleToLoadTextService.loading.get(subscriber2))
        .withContext('loading should be true before - 2')
        .toBeTrue();

      visibleToLoadTextService.languageChange();

      expect(visibleToLoadTextService.loading.get(subscriber1))
        .withContext('loading should be false after - 1')
        .toBeFalse();
      expect(visibleToLoadTextService.loading.get(subscriber2))
        .withContext('loading should be false after - 2')
        .toBeFalse();
    });
    it('should reset the loaded status of the component', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      visibleToLoadTextService.subscribe(subscriber1);
      visibleToLoadTextService.subscribe(subscriber2);

      visibleToLoadTextService.loaded.set(subscriber1, true);
      visibleToLoadTextService.loaded.set(subscriber2, true);

      expect(visibleToLoadTextService.loaded.get(subscriber1))
        .withContext('loaded should be true before - 1')
        .toBeTrue();
      expect(visibleToLoadTextService.loaded.get(subscriber2))
        .withContext('loaded should be true before - 2')
        .toBeTrue();

      visibleToLoadTextService.languageChange();

      expect(visibleToLoadTextService.loaded.get(subscriber1))
        .withContext('loaded should be false after - 1')
        .toBeFalse();
      expect(visibleToLoadTextService.loaded.get(subscriber2))
        .withContext('loaded should be false after - 2')
        .toBeFalse();
    });

    it('should set toReload map to true when appropriate', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      visibleToLoadTextService.subscribe(subscriber1);
      visibleToLoadTextService.subscribe(subscriber2);

      visibleToLoadTextService.loading.set(subscriber1, true);
      visibleToLoadTextService.loading.set(subscriber2, true);

      expect(visibleToLoadTextService.toReload.get(subscriber1))
        .withContext('toReload should be false before - 1')
        .toBeFalse();
      expect(visibleToLoadTextService.toReload.get(subscriber2))
        .withContext('toReload should be false before - 2')
        .toBeFalse();

      visibleToLoadTextService.languageChange();

      expect(visibleToLoadTextService.toReload.get(subscriber1))
        .withContext('toReload should be true after - 1')
        .toBeTrue();
      expect(visibleToLoadTextService.toReload.get(subscriber2))
        .withContext('toReload should be true after - 2')
        .toBeTrue();
    });

    it('should not set toReload map to true when not loading', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      visibleToLoadTextService.subscribe(subscriber1);
      visibleToLoadTextService.subscribe(subscriber2);

      visibleToLoadTextService.loading.set(subscriber1, true);
      visibleToLoadTextService.loading.set(subscriber2, false);

      expect(visibleToLoadTextService.toReload.get(subscriber1))
        .withContext('toReload should be false before - 1')
        .toBeFalse();
      expect(visibleToLoadTextService.toReload.get(subscriber2))
        .withContext('toReload should be false before - 2')
        .toBeFalse();

      visibleToLoadTextService.languageChange();

      expect(visibleToLoadTextService.toReload.get(subscriber1))
        .withContext('toReload should be true after')
        .toBeTrue();
      expect(visibleToLoadTextService.toReload.get(subscriber2))
        .withContext('toReload should be false after')
        .toBeFalse();
    });

    it('should not set toReload map to true when loaded', () => {
      const subscriber1: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };
      const subscriber2: ComponentWithText = {
        updateTexts: function (): void {
          //
        },
        getElement: function (): ElementRef<HTMLElement> {
          return {} as ElementRef<HTMLElement>;
        },
        ngOnDestroy: function (): void {
          //
        },
      };

      visibleToLoadTextService.subscribe(subscriber1);
      visibleToLoadTextService.subscribe(subscriber2);

      visibleToLoadTextService.loading.set(subscriber1, true);
      visibleToLoadTextService.loading.set(subscriber2, false);
      visibleToLoadTextService.loaded.set(subscriber2, true);

      expect(visibleToLoadTextService.toReload.get(subscriber1))
        .withContext('toReload should be false before - 1')
        .toBeFalse();
      expect(visibleToLoadTextService.toReload.get(subscriber2))
        .withContext('toReload should be false before - 2')
        .toBeFalse();

      visibleToLoadTextService.languageChange();

      expect(visibleToLoadTextService.toReload.get(subscriber1))
        .withContext('toReload should be true after')
        .toBeTrue();
      expect(visibleToLoadTextService.toReload.get(subscriber2))
        .withContext('toReload should be false after')
        .toBeFalse();
    });
  });
});
