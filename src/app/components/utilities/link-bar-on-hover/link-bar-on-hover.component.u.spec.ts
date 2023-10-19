import { TestBed } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { LinkBarOnHoverComponent } from './link-bar-on-hover.component';

describe('LinkBarOnHoverComponent - unit', () => {
  let component: LinkBarOnHoverComponent;
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

      component = TestBed.inject(LinkBarOnHoverComponent);
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
      expect(component.link)
        .withContext('link should be set')
        .toBe('https://sylvainjanet.fr');
      component.text.subscribe({
        next: (t) => {
          expect(t).withContext('text should be set').toBe('Sylvain Janet');
        },
      });
      expect(component.aStyle).withContext('aStyle should be set').toBe('');
      expect(component.lineStyle)
        .withContext('lineStyle should be set')
        .toBe('');
      expect(component.globalStyle)
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
      expect(component.lineDisappears)
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

      component = TestBed.inject(LinkBarOnHoverComponent);
    });
    it('should change the lineWidth', () => {
      component.mainLink = jasmine.createSpyObj(
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
          LinkBarOnHoverComponent,
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          { provide: LogService, useValue: logServiceGlobalSpy },
        ],
      });

      component = TestBed.inject(LinkBarOnHoverComponent);
    });
    it('should change the lineWidth', () => {
      component.mainLink = jasmine.createSpyObj(
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
});
