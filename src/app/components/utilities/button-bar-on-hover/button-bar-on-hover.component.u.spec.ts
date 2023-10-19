import { TestBed } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { ButtonBarOnHoverComponent } from './button-bar-on-hover.component';
import { EventEmitter } from '@angular/core';

describe('ButtonBarOnHoverComponent - unit', () => {
  let component: ButtonBarOnHoverComponent;
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

      component = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should create', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
      expect(component.logger)
        .withContext('logger should be set')
        .toBe(logServiceSpy);
    });

    it('should set default values', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(component.lineWidth)
        .withContext('lineWidth should be set')
        .toBe('0%');
      expect(component.textColor)
        .withContext('textColor should be set')
        .toBe('white');
      expect(component.lineColor)
        .withContext('lineColor should be set')
        .toBe('white');
      expect(component.press)
        .withContext('press should be defined')
        .toEqual(jasmine.anything());
      expect(component.press)
        .withContext('press should be an event emitter')
        .toBeInstanceOf(EventEmitter<Event>);
      component.text.subscribe({
        next: (t) => {
          expect(t).withContext('text should be set').toBe('Action');
        },
      });
      expect(component.buttonStyle)
        .withContext('buttonStyle should be set')
        .toBe('');
      expect(component.lineStyle)
        .withContext('lineStyle should be set')
        .toBe('');
      expect(component.globalStyle)
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
      expect(component.lineDisappears)
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

      component = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should change the lineWidth', () => {
      component.mainButton = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const length = 200;
      const expectedLength = (75 / 100) * length;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      component.lineAppears();

      expect(component.lineWidth)
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

      component = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should change the lineWidth', () => {
      component.mainButton = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const length = 200;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      component.lineAppears();

      component.lineDisappears();

      expect(component.lineWidth)
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

      component = TestBed.inject(ButtonBarOnHoverComponent);
    });
    it('should call lineDisappears method', () => {
      component.mainButton = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      spyOn(component, 'lineDisappears');

      component.doAction();

      expect(component.lineDisappears)
        .withContext('lineDisappears should have been called')
        .toHaveBeenCalledTimes(1);
    });
    it('should emit press event', () => {
      component.mainButton = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const pressSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
      component.press = pressSpy;
      spyOn(component, 'lineDisappears');

      component.doAction();

      expect(pressSpy.emit)
        .withContext('emit should have been called')
        .toHaveBeenCalledOnceWith();
    });
  });
});
