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
      expect(linkBarOnHoverComponent)
        .withContext('component should create')
        .toBeTruthy();
      expect(linkBarOnHoverComponent.logger)
        .withContext('logger should be set')
        .toBe(logServiceSpy);
    });

    it('should set default values', () => {
      expect(linkBarOnHoverComponent)
        .withContext('component should create')
        .toBeTruthy();

      expect(linkBarOnHoverComponent.lineWidth)
        .withContext('lineWidth should be set')
        .toBe('0%');
      expect(linkBarOnHoverComponent.textColor)
        .withContext('textColor should be set')
        .toBe('white');
      expect(linkBarOnHoverComponent.lineColor)
        .withContext('lineColor should be set')
        .toBe('white');
      expect(linkBarOnHoverComponent.link)
        .withContext('link should be set')
        .toBe('https://sylvainjanet.fr');
      linkBarOnHoverComponent.text.subscribe({
        next: (t) => {
          expect(t).withContext('text should be set').toBe('Sylvain Janet');
        },
      });
      expect(linkBarOnHoverComponent.aStyle)
        .withContext('aStyle should be set')
        .toBe('');
      expect(linkBarOnHoverComponent.lineStyle)
        .withContext('lineStyle should be set')
        .toBe('');
      expect(linkBarOnHoverComponent.globalStyle)
        .withContext('globalStyle should be set')
        .toBe('');
    });

    it('should set proper logger', () => {
      const expected = 'LinkBarOnHoverComponent';
      expect(logServiceGlobalSpy.withClassName)
        .withContext('withClassName should have been called')
        .toHaveBeenCalledOnceWith(expected);
    });

    it('should make the line disappear on creation', () => {
      expect(linkBarOnHoverComponent.lineDisappears)
        .withContext('lineDisappears should have been called')
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

      expect(linkBarOnHoverComponent.lineWidth)
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

      expect(linkBarOnHoverComponent.lineWidth)
        .withContext('lineWidth should be set')
        .toBe('0%');
    });
  });
});
