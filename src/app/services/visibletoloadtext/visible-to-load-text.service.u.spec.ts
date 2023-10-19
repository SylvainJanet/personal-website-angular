import { TestBed } from '@angular/core/testing';

import { VisibleToLoadTextService } from './visible-to-load-text.service';
import { WindowScrollService } from '../windowScrollService/window-scroll.service';
import { WindowResizeService } from '../windowResizeService/window-resize.service';
import { DOMComputationService } from '../domcomputation/domcomputation.service';
import { ElementRef, PLATFORM_ID } from '@angular/core';
import { ComponentWithText } from 'src/app/interfaces/ComponentWithText';
import { Observable } from 'rxjs';

let service: VisibleToLoadTextService;
let windowScrollService: WindowScrollService;
let windowResizeService: WindowResizeService;
let domComputationService: DOMComputationService;

const expectedBufferHeight = 0.5;
const expectedBufferWidth = 0.25;

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
    service = new VisibleToLoadTextService(
      windowScrollService,
      windowResizeService,
      domComputationService
    );
    expect(service)
      .withContext('service should create')
      .toEqual(jasmine.anything());
  });

  describe('constructor', () => {
    it('should have correct initial parameters', () => {
      service = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );

      expect(service.subscribers)
        .withContext('subscribers should be set')
        .toEqual([]);
      expect(service.visibility)
        .withContext('visibility should be set')
        .toEqual(new Map<ComponentWithText, boolean>());
      expect(service.loaded)
        .withContext('loaded should be set')
        .toEqual(new Map<ComponentWithText, boolean>());
      expect(service.loading)
        .withContext('loading should be set')
        .toEqual(new Map<ComponentWithText, boolean>());
      expect(service.toReload)
        .withContext('toReload should be set')
        .toEqual(new Map<ComponentWithText, boolean>());
      expect(service.onlyOnce)
        .withContext('onlyOnce should be set')
        .toEqual(new Map<ComponentWithText, boolean>());
      expect(service.scroll)
        .withContext('scroll should be set')
        .toEqual(jasmine.anything());
      expect(service.resize)
        .withContext('resize should be set')
        .toEqual(jasmine.anything());
      expect(service.bufferFactorHeight)
        .withContext('bufferFactorHeight should be set')
        .toBe(expectedBufferHeight);
      expect(service.bufferFactorWidth)
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
      service = new VisibleToLoadTextService(
        windowScrollServiceSpy,
        windowResizeService,
        domComputationService
      );

      expect(windowScrollServiceSpy.scroll.subscribe)
        .withContext('subscribe method should have been called')
        .toHaveBeenCalledTimes(1);

      spyOn(VisibleToLoadTextService.prototype, 'loadNewTexts');
      service = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );

      expect(service.loadNewTexts)
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

      expect(service.loadNewTexts)
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
      service = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeServiceSpy,
        domComputationService
      );

      expect(windowResizeServiceSpy.resize.subscribe)
        .withContext('subscribe method should have been called')
        .toHaveBeenCalledTimes(1);

      spyOn(VisibleToLoadTextService.prototype, 'loadNewTexts');
      service = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );

      expect(service.loadNewTexts)
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

      expect(service.loadNewTexts)
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
      service = new VisibleToLoadTextService(
        windowScrollServiceSpy,
        windowResizeService,
        domComputationService
      );
      expect(subscriptionSpy.unsubscribe)
        .withContext('unsubscribe method should not have been called before')
        .not.toHaveBeenCalled();

      service.ngOnDestroy();

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
      service = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeServiceSpy,
        domComputationService
      );
      expect(subscriptionSpy.unsubscribe)
        .withContext('unsubscribe method should not have been called before')
        .not.toHaveBeenCalled();

      service.ngOnDestroy();

      expect(subscriptionSpy.unsubscribe)
        .withContext('should call unsubscribe method')
        .toHaveBeenCalled();
    });
  });

  describe('subscribe method', () => {
    beforeEach(() => {
      spyOn(VisibleToLoadTextService.prototype, 'loadNewTextsOf');
      service = new VisibleToLoadTextService(
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

      expect(service.subscribers.length)
        .withContext('there should be no subscribers')
        .toBe(0);

      service.subscribe(subscriber);

      expect(service.subscribers.length)
        .withContext('there should be 1 subscriber')
        .toBe(1);
      expect(service.subscribers[0])
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

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be undefined for the subscriber at first')
        .toBeUndefined();

      service.subscribe(subscriber);

      expect(service.loaded.get(subscriber))
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

      expect(service.loading.get(subscriber))
        .withContext('loading should be undefined for the subscriber at first')
        .toBeUndefined();

      service.subscribe(subscriber);

      expect(service.loading.get(subscriber))
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

      expect(service.toReload.get(subscriber))
        .withContext('toReload should be undefined for the subscriber at first')
        .toBeUndefined();

      service.subscribe(subscriber);

      expect(service.toReload.get(subscriber))
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

      expect(service.loadNewTextsOf)
        .withContext('loadNewTextsOf should not have been called at first')
        .not.toHaveBeenCalled();

      service.subscribe(subscriber);

      expect(service.loadNewTextsOf)
        .withContext(
          'loadNewTextsOf should have been called after the subscription'
        )
        .toHaveBeenCalledOnceWith(subscriber);
    });
    it('should set onlyOnce to false by default', () => {
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

      expect(service.onlyOnce.get(subscriber))
        .withContext('onlyOnce should be undefined for the subscriber at first')
        .toBeUndefined();

      service.subscribe(subscriber);

      expect(service.onlyOnce.get(subscriber))
        .withContext('onlyOnce should be set to false')
        .toBeFalse();
    });
    it('should set onlyOnce to false', () => {
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

      expect(service.onlyOnce.get(subscriber))
        .withContext('onlyOnce should be undefined for the subscriber at first')
        .toBeUndefined();

      service.subscribe(subscriber, false);

      expect(service.onlyOnce.get(subscriber))
        .withContext('onlyOnce should be set to false')
        .toBeFalse();
    });
    it('should set onlyOnce to true', () => {
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

      expect(service.onlyOnce.get(subscriber))
        .withContext('onlyOnce should be undefined for the subscriber at first')
        .toBeUndefined();

      service.subscribe(subscriber, true);

      expect(service.onlyOnce.get(subscriber))
        .withContext('onlyOnce should be set to true')
        .toBeTrue();
    });
  });

  describe('unsubscribe method', () => {
    beforeEach(() => {
      service = new VisibleToLoadTextService(
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

      expect(service.subscribers.length)
        .withContext('there should be no subscribers')
        .toBe(0);

      service.subscribe(subscriber1);
      service.subscribe(subscriber2);

      expect(service.subscribers.length)
        .withContext('there should be 2 subscribers')
        .toBe(2);
      expect(service.subscribers[0])
        .withContext('the first subscriber should be as expected')
        .toBe(subscriber1);
      expect(service.subscribers[1])
        .withContext('the second subscriber should be as expected')
        .toBe(subscriber2);

      service.unsubscribe(subscriber1);

      expect(service.subscribers.length)
        .withContext('there should be 1 subscriber')
        .toBe(1);
      expect(service.subscribers[0])
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

      expect(service.visibility.get(subscriber1))
        .withContext(
          'visibility should be undefined for the subscriber at first - 1'
        )
        .toBeUndefined();
      expect(service.visibility.get(subscriber2))
        .withContext(
          'visibility should be undefined for the subscriber at first - 2'
        )
        .toBeUndefined();

      service.subscribe(subscriber1);
      service.subscribe(subscriber2);

      expect(service.visibility.get(subscriber1))
        .withContext('visibility should be set to false - 1')
        .toBeFalse();

      expect(service.visibility.get(subscriber2))
        .withContext('visibility should be set to false - 2')
        .toBeFalse();

      service.unsubscribe(subscriber1);

      expect(service.visibility.get(subscriber1))
        .withContext('visibility should undefined after')
        .toBeUndefined();

      expect(service.visibility.get(subscriber2))
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

      expect(service.loaded.get(subscriber1))
        .withContext(
          'loaded should be undefined for the subscriber at first - 1'
        )
        .toBeUndefined();
      expect(service.loaded.get(subscriber2))
        .withContext(
          'loaded should be undefined for the subscriber at first - 2'
        )
        .toBeUndefined();

      service.subscribe(subscriber1);
      service.subscribe(subscriber2);

      expect(service.loaded.get(subscriber1))
        .withContext('loaded should be set to false - 1')
        .toBeFalse();

      expect(service.loaded.get(subscriber2))
        .withContext('loaded should be set to false - 2')
        .toBeFalse();

      service.unsubscribe(subscriber1);

      expect(service.loaded.get(subscriber1))
        .withContext('loaded should undefined after')
        .toBeUndefined();

      expect(service.loaded.get(subscriber2))
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

      expect(service.loading.get(subscriber1))
        .withContext(
          'loading should be undefined for the subscriber at first - 1'
        )
        .toBeUndefined();
      expect(service.loading.get(subscriber2))
        .withContext(
          'loading should be undefined for the subscriber at first - 2'
        )
        .toBeUndefined();

      service.subscribe(subscriber1);
      service.subscribe(subscriber2);

      expect(service.loading.get(subscriber1))
        .withContext('loading should be set to false - 1')
        .toBeFalse();

      expect(service.loading.get(subscriber2))
        .withContext('loading should be set to false - 2')
        .toBeFalse();

      service.unsubscribe(subscriber1);

      expect(service.loading.get(subscriber1))
        .withContext('loading should undefined after')
        .toBeUndefined();

      expect(service.loading.get(subscriber2))
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
      service = new VisibleToLoadTextService(
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

      service['updateVisibilityOf'](subscriber);

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

      expect(service.visibility.get(subscriber))
        .withContext('visibility should be undefined before')
        .toBeUndefined();

      domComputationServiceSpy.isIntoView.and.returnValue(true);

      service['updateVisibilityOf'](subscriber);

      expect(service.visibility.get(subscriber))
        .withContext('visibility should be set after - true')
        .toBeTrue();

      domComputationServiceSpy.isIntoView.and.returnValue(false);

      service['updateVisibilityOf'](subscriber);

      expect(service.visibility.get(subscriber))
        .withContext('visibility should be set after - false')
        .toBeFalse();
    });
  });

  describe('updateVisibility method', () => {
    beforeEach(() => {
      service = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'updateVisibilityOf');
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
      service.subscribers.push(subscriber1);
      service.subscribers.push(subscriber2);

      expect(service['updateVisibilityOf'])
        .withContext('visibility should have not been updated before')
        .not.toHaveBeenCalled();

      service.updateVisibility();

      expect(service['updateVisibilityOf'])
        .withContext('updateVisibilityOf should have been called twice')
        .toHaveBeenCalledTimes(2);
      expect(service['updateVisibilityOf'])
        .withContext(
          'updateVisibilityOf should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(subscriber1);
      expect(service['updateVisibilityOf'])
        .withContext(
          'updateVisibilityOf should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(subscriber2);
    });
  });

  describe('textLoaded method', () => {
    beforeEach(() => {
      service = new VisibleToLoadTextService(
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

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be undefined at first')
        .toBeUndefined();

      service.subscribe(subscriber);

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be false after subscription')
        .toBeFalse();

      service.textLoaded(subscriber);

      expect(service.loaded.get(subscriber))
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

      expect(service.loading.get(subscriber))
        .withContext('loading should be undefined at first')
        .toBeUndefined();

      service.subscribe(subscriber);

      expect(service.loading.get(subscriber))
        .withContext('loading should be false after subscription')
        .toBeFalse();

      // assume the text loads
      service.loading.set(subscriber, true);

      service.textLoaded(subscriber);

      expect(service.loading.get(subscriber))
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

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be undefined at first')
        .toBeUndefined();

      service.subscribe(subscriber);
      service.toReload.set(subscriber, true);

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be false after subscription')
        .toBeFalse();

      service.loaded.set(subscriber, true);
      expect(service.loaded.get(subscriber))
        .withContext('loaded should be true before')
        .toBeTrue();

      service.textLoaded(subscriber);

      expect(service.loaded.get(subscriber))
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

      expect(service.loading.get(subscriber))
        .withContext('loading should be undefined at first')
        .toBeUndefined();

      service.subscribe(subscriber);
      service.toReload.set(subscriber, true);

      expect(service.loading.get(subscriber))
        .withContext('loading should be false after subscription')
        .toBeFalse();

      service.textLoaded(subscriber);

      expect(service.loading.get(subscriber))
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

      expect(service.toReload.get(subscriber))
        .withContext('toReload should be undefined at first')
        .toBeUndefined();

      service.subscribe(subscriber);
      service.toReload.set(subscriber, true);

      expect(service.toReload.get(subscriber))
        .withContext('toReload should be true before')
        .toBeTrue();

      service.textLoaded(subscriber);

      expect(service.toReload.get(subscriber))
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

      service.subscribe(subscriber);
      service.toReload.set(subscriber, true);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      service.textLoaded(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('hasTextLoaded method', () => {
    beforeEach(() => {
      service = new VisibleToLoadTextService(
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

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be undefined at first')
        .toBeUndefined();
      expect(service.hasTextLoaded(subscriber))
        .withContext('returns undefined at first')
        .toBeUndefined();

      service.subscribe(subscriber);

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be false after subscription')
        .toBeFalse();
      expect(service.hasTextLoaded(subscriber))
        .withContext('returns false')
        .toBeFalse();

      service.textLoaded(subscriber);

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be true after')
        .toBeTrue();
      expect(service.hasTextLoaded(subscriber))
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
      service = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'updateVisibilityOf');
      spyOn(subscriber, 'updateTexts');
      // not subscribe method since it also calls updateVisibiliyOf and would mess with the future checks
      service.subscribers.push(subscriber);
    });
    it('should call the updateVisibilityOf method', () => {
      expect(service['updateVisibilityOf'])
        .withContext('should not have been called at first')
        .not.toHaveBeenCalled();

      service.loadNewTextsOf(subscriber);

      expect(service['updateVisibilityOf'])
        .withContext('should have been called after')
        .toHaveBeenCalledOnceWith(subscriber);
    });
    it('should update the text when appropriate', () => {
      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, false);
      service.loading.set(subscriber, false);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      service.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should have been called after')
        .toHaveBeenCalledTimes(1);
    });
    it('should set the loading map to true for the component when appropriate', () => {
      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, false);
      service.loading.set(subscriber, false);

      expect(service.loading.get(subscriber))
        .withContext('should be false before')
        .toBeFalse();

      service.loadNewTextsOf(subscriber);

      expect(service.loading.get(subscriber))
        .withContext('should be true after')
        .toBeTrue();
    });
    it('should not update the text when the component is not visible', () => {
      service.visibility.set(subscriber, false);
      service.loaded.set(subscriber, false);
      service.loading.set(subscriber, false);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      service.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called after')
        .not.toHaveBeenCalled();
    });
    it('should not set the loading map to true for the component when the component is not visible', () => {
      service.visibility.set(subscriber, false);
      service.loaded.set(subscriber, false);
      service.loading.set(subscriber, false);

      expect(service.loading.get(subscriber))
        .withContext('should be false before')
        .toBeFalse();

      service.loadNewTextsOf(subscriber);

      expect(service.loading.get(subscriber))
        .withContext('should be false after')
        .toBeFalse();
    });
    it('should not update the text when the component is loaded', () => {
      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, true);
      service.loading.set(subscriber, false);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      service.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called after')
        .not.toHaveBeenCalled();
    });
    it('should not set the loading map to true for the component when the component is loaded', () => {
      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, true);
      service.loading.set(subscriber, false);

      expect(service.loading.get(subscriber))
        .withContext('should be false before')
        .toBeFalse();

      service.loadNewTextsOf(subscriber);

      expect(service.loading.get(subscriber))
        .withContext('should be false after')
        .toBeFalse();
    });
    it('should not update the text when the component is loading', () => {
      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, false);
      service.loading.set(subscriber, true);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      service.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called after')
        .not.toHaveBeenCalled();
    });
    it('should not set the loading map to true for the component when the component is loading', () => {
      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, false);
      service.loading.set(subscriber, true);

      expect(service.loading.get(subscriber))
        .withContext('should be true before')
        .toBeTrue();

      service.loadNewTextsOf(subscriber);

      expect(service.loading.get(subscriber))
        .withContext('should be true after')
        .toBeTrue();
    });

    it('should not update visibility when onlyOnce and loaded or loading', () => {
      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, false);
      service.loading.set(subscriber, true);
      service.onlyOnce.set(subscriber, true);

      expect(service['updateVisibilityOf'])
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      service.loadNewTextsOf(subscriber);

      expect(service['updateVisibilityOf'])
        .withContext('should not have been called after - 1')
        .not.toHaveBeenCalled();

      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, true);
      service.loading.set(subscriber, false);
      service.onlyOnce.set(subscriber, true);

      service.loadNewTextsOf(subscriber);

      expect(service['updateVisibilityOf'])
        .withContext('should not have been called after - 2')
        .not.toHaveBeenCalled();
    });
    it('should not update the text when onlyOnce and loaded or loading', () => {
      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, false);
      service.loading.set(subscriber, true);
      service.onlyOnce.set(subscriber, true);

      expect(subscriber.updateTexts)
        .withContext('should not have been called before')
        .not.toHaveBeenCalled();

      service.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called after - 1')
        .not.toHaveBeenCalled();

      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, true);
      service.loading.set(subscriber, false);
      service.onlyOnce.set(subscriber, true);

      service.loadNewTextsOf(subscriber);

      expect(subscriber.updateTexts)
        .withContext('should not have been called after - 2')
        .not.toHaveBeenCalled();
    });
    it('should not set the loading map to true for the component when onlyOnce and loaded or loading', () => {
      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, false);
      service.loading.set(subscriber, true);
      service.onlyOnce.set(subscriber, true);

      expect(service.loading.get(subscriber))
        .withContext('should be true before')
        .toBeTrue();

      service.loadNewTextsOf(subscriber);

      expect(service.loading.get(subscriber))
        .withContext('should be true after - 1')
        .toBeTrue();

      service.visibility.set(subscriber, true);
      service.loaded.set(subscriber, true);
      service.loading.set(subscriber, false);
      service.onlyOnce.set(subscriber, true);

      service.loadNewTextsOf(subscriber);

      expect(service.loading.get(subscriber))
        .withContext('should be false after - 2')
        .toBeFalse();
    });
  });

  describe('loadNewTexts method', () => {
    beforeEach(() => {
      service = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(service, 'loadNewTextsOf');
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
      service.subscribers.push(subscriber1);
      service.subscribers.push(subscriber2);

      expect(service['loadNewTextsOf'])
        .withContext('visibility should not have been updated before')
        .not.toHaveBeenCalled();

      service.loadNewTexts();

      expect(service['loadNewTextsOf'])
        .withContext('loadNewTextsOf should have been called twice')
        .toHaveBeenCalledTimes(2);
      expect(service['loadNewTextsOf'])
        .withContext(
          'loadNewTextsOf should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(subscriber1);
      expect(service['loadNewTextsOf'])
        .withContext(
          'loadNewTextsOf should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(subscriber2);
    });
  });

  describe('languageChange method', () => {
    beforeEach(() => {
      spyOn(VisibleToLoadTextService.prototype, 'loadNewTexts');
      service = new VisibleToLoadTextService(
        windowScrollService,
        windowResizeService,
        domComputationService
      );
    });
    it('should call loadNewTexts components', () => {
      expect(service.loadNewTexts)
        .withContext('should not have been called at first')
        .not.toHaveBeenCalled();

      service.languageChange();

      expect(service.loadNewTexts)
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

      service.subscribe(subscriber1);
      service.subscribe(subscriber2);

      service.loading.set(subscriber1, true);
      service.loading.set(subscriber2, true);

      expect(service.loading.get(subscriber1))
        .withContext('loading should be true before - 1')
        .toBeTrue();
      expect(service.loading.get(subscriber2))
        .withContext('loading should be true before - 2')
        .toBeTrue();

      service.languageChange();

      expect(service.loading.get(subscriber1))
        .withContext('loading should be false after - 1')
        .toBeFalse();
      expect(service.loading.get(subscriber2))
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

      service.subscribe(subscriber1);
      service.subscribe(subscriber2);

      service.loaded.set(subscriber1, true);
      service.loaded.set(subscriber2, true);

      expect(service.loaded.get(subscriber1))
        .withContext('loaded should be true before - 1')
        .toBeTrue();
      expect(service.loaded.get(subscriber2))
        .withContext('loaded should be true before - 2')
        .toBeTrue();

      service.languageChange();

      expect(service.loaded.get(subscriber1))
        .withContext('loaded should be false after - 1')
        .toBeFalse();
      expect(service.loaded.get(subscriber2))
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

      service.subscribe(subscriber1);
      service.subscribe(subscriber2);

      service.loading.set(subscriber1, true);
      service.loading.set(subscriber2, true);

      expect(service.toReload.get(subscriber1))
        .withContext('toReload should be false before - 1')
        .toBeFalse();
      expect(service.toReload.get(subscriber2))
        .withContext('toReload should be false before - 2')
        .toBeFalse();

      service.languageChange();

      expect(service.toReload.get(subscriber1))
        .withContext('toReload should be true after - 1')
        .toBeTrue();
      expect(service.toReload.get(subscriber2))
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

      service.subscribe(subscriber1);
      service.subscribe(subscriber2);

      service.loading.set(subscriber1, true);
      service.loading.set(subscriber2, false);

      expect(service.toReload.get(subscriber1))
        .withContext('toReload should be false before - 1')
        .toBeFalse();
      expect(service.toReload.get(subscriber2))
        .withContext('toReload should be false before - 2')
        .toBeFalse();

      service.languageChange();

      expect(service.toReload.get(subscriber1))
        .withContext('toReload should be true after')
        .toBeTrue();
      expect(service.toReload.get(subscriber2))
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

      service.subscribe(subscriber1);
      service.subscribe(subscriber2);

      service.loading.set(subscriber1, true);
      service.loading.set(subscriber2, false);
      service.loaded.set(subscriber2, true);

      expect(service.toReload.get(subscriber1))
        .withContext('toReload should be false before - 1')
        .toBeFalse();
      expect(service.toReload.get(subscriber2))
        .withContext('toReload should be false before - 2')
        .toBeFalse();

      service.languageChange();

      expect(service.toReload.get(subscriber1))
        .withContext('toReload should be true after')
        .toBeTrue();
      expect(service.toReload.get(subscriber2))
        .withContext('toReload should be false after')
        .toBeFalse();
    });

    it('should not set loading map to false when onlyOnce', () => {
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

      service.subscribe(subscriber);

      service.loading.set(subscriber, true);
      service.onlyOnce.set(subscriber, true);

      expect(service.loading.get(subscriber))
        .withContext('loading should be true before')
        .toBeTrue();

      service.languageChange();

      expect(service.loading.get(subscriber))
        .withContext('loading should be true after')
        .toBeTrue();
    });

    it('should not set loaded map to false when onlyOnce', () => {
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

      service.subscribe(subscriber);

      service.loaded.set(subscriber, true);
      service.onlyOnce.set(subscriber, true);

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be true before')
        .toBeTrue();

      service.languageChange();

      expect(service.loaded.get(subscriber))
        .withContext('loaded should be true after')
        .toBeTrue();
    });
  });
});
