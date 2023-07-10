import { TestBed } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { ButtonBarOnHoverComponent } from './button-bar-on-hover.component';
import { EventEmitter } from '@angular/core';

describe('LinkBarOnHoverComponent - unit', () => {
  let linkBarOnHoverComponent: ButtonBarOnHoverComponent;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;
  let DOMComputationServiceSpy: jasmine.SpyObj<DOMComputationService>;

  describe('constructor', () => {
    beforeEach(() => {
      logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
        'withClassName',
      ]);
      logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
      logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

      DOMComputationServiceSpy = jasmine.createSpyObj('DOMComputationService', [
        'getActualWidth',
      ]);

      spyOn(ButtonBarOnHoverComponent.prototype, 'lineDisappears');

      TestBed.configureTestingModule({
        providers: [
          ButtonBarOnHoverComponent,
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          { provide: LogService, useValue: logServiceGlobalSpy },
        ],
      });

      linkBarOnHoverComponent = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should created', () => {
      expect(linkBarOnHoverComponent).toBeTruthy();
      expect(linkBarOnHoverComponent.logger).toBe(logServiceSpy);
    });

    it('should set default values', () => {
      expect(linkBarOnHoverComponent).toBeTruthy();

      expect(linkBarOnHoverComponent.lineWidth).toBe('0%');
      expect(linkBarOnHoverComponent.textColor).toBe('white');
      expect(linkBarOnHoverComponent.lineColor).toBe('white');
      expect(linkBarOnHoverComponent.press).toBeTruthy();
      expect(linkBarOnHoverComponent.press).toBeInstanceOf(EventEmitter<Event>);
      linkBarOnHoverComponent.text.subscribe({
        next: (t) => {
          expect(t).toBe('Action');
        },
      });
      expect(linkBarOnHoverComponent.buttonStyle).toBe('');
      expect(linkBarOnHoverComponent.lineStyle).toBe('');
      expect(linkBarOnHoverComponent.globalStyle).toBe('');
    });

    it('should set proper logger', () => {
      const expected = 'ButtonBarOnHoverComponent';
      expect(logServiceGlobalSpy.withClassName).toHaveBeenCalledOnceWith(
        expected
      );
    });

    it('should make the line disappear on creation', () => {
      expect(linkBarOnHoverComponent.lineDisappears).toHaveBeenCalledTimes(1);
    });
  });

  describe('lineAppears method', () => {
    beforeEach(() => {
      logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
        'withClassName',
      ]);
      logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
      logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

      DOMComputationServiceSpy = jasmine.createSpyObj('DOMComputationService', [
        'getActualWidth',
      ]);

      TestBed.configureTestingModule({
        providers: [
          ButtonBarOnHoverComponent,
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          { provide: LogService, useValue: logServiceGlobalSpy },
        ],
      });

      linkBarOnHoverComponent = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should change the lineWidth', () => {
      const eventSpy = jasmine.createSpyObj(Event, ['']);
      const length = 200;
      const expectedLength = (75 / 100) * length;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      linkBarOnHoverComponent.lineAppears(eventSpy);

      expect(linkBarOnHoverComponent.lineWidth).toBe(expectedLength + 'px');
    });
  });

  describe('lineDisappears method', () => {
    beforeEach(() => {
      logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
        'withClassName',
      ]);
      logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
      logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

      DOMComputationServiceSpy = jasmine.createSpyObj('DOMComputationService', [
        'getActualWidth',
      ]);

      TestBed.configureTestingModule({
        providers: [
          ButtonBarOnHoverComponent,
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          { provide: LogService, useValue: logServiceGlobalSpy },
        ],
      });

      linkBarOnHoverComponent = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should change the lineWidth', () => {
      const eventSpy = jasmine.createSpyObj(Event, ['']);
      const length = 200;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      linkBarOnHoverComponent.lineAppears(eventSpy);

      linkBarOnHoverComponent.lineDisappears();

      expect(linkBarOnHoverComponent.lineWidth).toBe('0%');
    });
  });

  describe('doAction method', () => {
    beforeEach(() => {
      logServiceGlobalSpy = jasmine.createSpyObj('LogService', [
        'withClassName',
      ]);
      logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
      logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

      DOMComputationServiceSpy = jasmine.createSpyObj('DOMComputationService', [
        'getActualWidth',
      ]);

      TestBed.configureTestingModule({
        providers: [
          ButtonBarOnHoverComponent,
          DOMComputationService,
          { provide: LogService, useValue: logServiceGlobalSpy },
        ],
      });

      linkBarOnHoverComponent = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should call lineDisappears method', () => {
      const expectedEvent = new Event('click');
      spyOn(linkBarOnHoverComponent, 'lineDisappears');

      linkBarOnHoverComponent.doAction(expectedEvent);

      expect(linkBarOnHoverComponent.lineDisappears).toHaveBeenCalledTimes(1);
    });
    it('should emit press event', () => {
      const pressSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
      linkBarOnHoverComponent.press = pressSpy;
      const expectedEvent = new Event('click');
      spyOn(linkBarOnHoverComponent, 'lineDisappears');

      linkBarOnHoverComponent.doAction(expectedEvent);

      expect(pressSpy.emit).toHaveBeenCalledOnceWith(expectedEvent);
    });
  });
});
