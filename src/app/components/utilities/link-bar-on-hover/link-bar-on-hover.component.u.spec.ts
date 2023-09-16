import { TestBed } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { LinkBarOnHoverComponent } from './link-bar-on-hover.component';

describe('LinkBarOnHoverComponent - unit', () => {
  let linkBarOnHoverComponent: LinkBarOnHoverComponent;
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

      spyOn(LinkBarOnHoverComponent.prototype, 'lineDisappears');

      TestBed.configureTestingModule({
        providers: [
          LinkBarOnHoverComponent,
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          { provide: LogService, useValue: logServiceGlobalSpy },
        ],
      });

      linkBarOnHoverComponent = TestBed.inject(LinkBarOnHoverComponent);
    });
    it('should create', () => {
      expect(linkBarOnHoverComponent).toBeTruthy();
      expect(linkBarOnHoverComponent.logger).toBe(logServiceSpy);
    });

    it('should set default values', () => {
      expect(linkBarOnHoverComponent).toBeTruthy();

      expect(linkBarOnHoverComponent.lineWidth).toBe('0%');
      expect(linkBarOnHoverComponent.textColor).toBe('white');
      expect(linkBarOnHoverComponent.lineColor).toBe('white');
      expect(linkBarOnHoverComponent.link).toBe('https://sylvainjanet.fr');
      linkBarOnHoverComponent.text.subscribe({
        next: (t) => {
          expect(t).toBe('Sylvain Janet');
        },
      });
      expect(linkBarOnHoverComponent.aStyle).toBe('');
      expect(linkBarOnHoverComponent.lineStyle).toBe('');
      expect(linkBarOnHoverComponent.globalStyle).toBe('');
    });

    it('should set proper logger', () => {
      const expected = 'LinkBarOnHoverComponent';
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
          LinkBarOnHoverComponent,
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          { provide: LogService, useValue: logServiceGlobalSpy },
        ],
      });

      linkBarOnHoverComponent = TestBed.inject(LinkBarOnHoverComponent);
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
          LinkBarOnHoverComponent,
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          { provide: LogService, useValue: logServiceGlobalSpy },
        ],
      });

      linkBarOnHoverComponent = TestBed.inject(LinkBarOnHoverComponent);
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
});
