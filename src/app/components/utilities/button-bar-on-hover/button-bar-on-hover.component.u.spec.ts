import { TestBed } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { ButtonBarOnHoverComponent } from './button-bar-on-hover.component';
import { EventEmitter } from '@angular/core';

describe('LinkBarOnHoverComponent - unit', () => {
  let buttonBarOnHoverComponent: ButtonBarOnHoverComponent;
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

      buttonBarOnHoverComponent = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should create', () => {
      expect(buttonBarOnHoverComponent).toBeTruthy();
      expect(buttonBarOnHoverComponent.logger).toBe(logServiceSpy);
    });

    it('should set default values', () => {
      expect(buttonBarOnHoverComponent).toBeTruthy();

      expect(buttonBarOnHoverComponent.lineWidth).toBe('0%');
      expect(buttonBarOnHoverComponent.textColor).toBe('white');
      expect(buttonBarOnHoverComponent.lineColor).toBe('white');
      expect(buttonBarOnHoverComponent.press).toBeTruthy();
      expect(buttonBarOnHoverComponent.press).toBeInstanceOf(
        EventEmitter<Event>
      );
      buttonBarOnHoverComponent.text.subscribe({
        next: (t) => {
          expect(t).toBe('Action');
        },
      });
      expect(buttonBarOnHoverComponent.buttonStyle).toBe('');
      expect(buttonBarOnHoverComponent.lineStyle).toBe('');
      expect(buttonBarOnHoverComponent.globalStyle).toBe('');
    });

    it('should set proper logger', () => {
      const expected = 'ButtonBarOnHoverComponent';
      expect(logServiceGlobalSpy.withClassName).toHaveBeenCalledOnceWith(
        expected
      );
    });

    it('should make the line disappear on creation', () => {
      expect(buttonBarOnHoverComponent.lineDisappears).toHaveBeenCalledTimes(1);
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

      buttonBarOnHoverComponent = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should change the lineWidth', () => {
      const eventSpy = jasmine.createSpyObj(Event, ['']);
      const length = 200;
      const expectedLength = (75 / 100) * length;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      buttonBarOnHoverComponent.lineAppears(eventSpy);

      expect(buttonBarOnHoverComponent.lineWidth).toBe(expectedLength + 'px');
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

      buttonBarOnHoverComponent = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should change the lineWidth', () => {
      const eventSpy = jasmine.createSpyObj(Event, ['']);
      const length = 200;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      buttonBarOnHoverComponent.lineAppears(eventSpy);

      buttonBarOnHoverComponent.lineDisappears();

      expect(buttonBarOnHoverComponent.lineWidth).toBe('0%');
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

      buttonBarOnHoverComponent = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should call lineDisappears method', () => {
      const expectedEvent = new Event('click');
      spyOn(buttonBarOnHoverComponent, 'lineDisappears');

      buttonBarOnHoverComponent.doAction(expectedEvent);

      expect(buttonBarOnHoverComponent.lineDisappears).toHaveBeenCalledTimes(1);
    });
    it('should emit press event', () => {
      const pressSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
      buttonBarOnHoverComponent.press = pressSpy;
      const expectedEvent = new Event('click');
      spyOn(buttonBarOnHoverComponent, 'lineDisappears');

      buttonBarOnHoverComponent.doAction(expectedEvent);

      expect(pressSpy.emit).toHaveBeenCalledOnceWith(expectedEvent);
    });
  });
});
