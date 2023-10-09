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
      expect(buttonBarOnHoverComponent)
        .withContext('component should create')
        .toBeTruthy();
      expect(buttonBarOnHoverComponent.logger)
        .withContext('logger should be set')
        .toBe(logServiceSpy);
    });

    it('should set default values', () => {
      expect(buttonBarOnHoverComponent)
        .withContext('component should create')
        .toBeTruthy();

      expect(buttonBarOnHoverComponent.lineWidth)
        .withContext('lineWidth should be set')
        .toBe('0%');
      expect(buttonBarOnHoverComponent.textColor)
        .withContext('textColor should be set')
        .toBe('white');
      expect(buttonBarOnHoverComponent.lineColor)
        .withContext('lineColor should be set')
        .toBe('white');
      expect(buttonBarOnHoverComponent.press)
        .withContext('press should be defined')
        .toBeTruthy();
      expect(buttonBarOnHoverComponent.press)
        .withContext('press should be an event emitter')
        .toBeInstanceOf(EventEmitter<Event>);
      buttonBarOnHoverComponent.text.subscribe({
        next: (t) => {
          expect(t).withContext('text should be set').toBe('Action');
        },
      });
      expect(buttonBarOnHoverComponent.buttonStyle)
        .withContext('buttonStyle should be set')
        .toBe('');
      expect(buttonBarOnHoverComponent.lineStyle)
        .withContext('lineStyle should be set')
        .toBe('');
      expect(buttonBarOnHoverComponent.globalStyle)
        .withContext('globalStyle should be set')
        .toBe('');
    });

    it('should set proper logger', () => {
      const expected = 'ButtonBarOnHoverComponent';
      expect(logServiceGlobalSpy.withClassName)
        .withContext('withClassName should be defined')
        .toHaveBeenCalledOnceWith(expected);
    });

    it('should make the line disappear on creation', () => {
      expect(buttonBarOnHoverComponent.lineDisappears)
        .withContext('lineDisappears should be defined')
        .toHaveBeenCalledTimes(1);
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

      expect(buttonBarOnHoverComponent.lineWidth)
        .withContext('lineWidth should be set')
        .toBe(expectedLength + 'px');
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

      expect(buttonBarOnHoverComponent.lineWidth)
        .withContext('lineWidth should be set')
        .toBe('0%');
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

      expect(buttonBarOnHoverComponent.lineDisappears)
        .withContext('lineDisappears should have been called')
        .toHaveBeenCalledTimes(1);
    });
    it('should emit press event', () => {
      const pressSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
      buttonBarOnHoverComponent.press = pressSpy;
      const expectedEvent = new Event('click');
      spyOn(buttonBarOnHoverComponent, 'lineDisappears');

      buttonBarOnHoverComponent.doAction(expectedEvent);

      expect(pressSpy.emit)
        .withContext('emit should have been called')
        .toHaveBeenCalledOnceWith(expectedEvent);
    });
  });
});
