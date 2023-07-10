import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { LinkBarOnHoverComponent } from './link-bar-on-hover.component';
import { DebugElement } from '@angular/core';

describe('LinkBarOnHoverComponent - dom integration', () => {
  let fixture: ComponentFixture<LinkBarOnHoverComponent>;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;
  let DOMComputationServiceSpy: jasmine.SpyObj<DOMComputationService>;

  beforeEach(waitForAsync(() => {
    logServiceGlobalSpy = jasmine.createSpyObj('LogService', ['withClassName']);
    logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
    logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

    DOMComputationServiceSpy = jasmine.createSpyObj('DOMComputationService', [
      'getActualWidth',
    ]);

    TestBed.configureTestingModule({
      declarations: [LinkBarOnHoverComponent],
      providers: [
        {
          provide: DOMComputationService,
          useValue: DOMComputationServiceSpy,
        },
        { provide: LogService, useValue: logServiceGlobalSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkBarOnHoverComponent);
    fixture.detectChanges();
  });

  describe('a element', () => {
    let aDebugEl: DebugElement;
    let lineDebugEl: DebugElement;
    beforeEach(() => {
      aDebugEl = fixture.debugElement.children[0].children[0];
      lineDebugEl = fixture.debugElement.children[0].children[1];
    });
    it('should make the line disappear on click event', () => {
      aDebugEl.triggerEventHandler('click');

      expect(lineDebugEl.styles['width']).toBe('0%');
    });
    it('should make the line disappear on touchend event', () => {
      aDebugEl.triggerEventHandler('touchend');

      expect(lineDebugEl.styles['width']).toBe('0%');
    });
    it('should make the line disappear on mouseleave event', () => {
      aDebugEl.triggerEventHandler('mouseleave');

      expect(lineDebugEl.styles['width']).toBe('0%');
    });
    it('should make the line appear on touchstart event', () => {
      const expectedEvent = new Event('touchstart');
      const length = 200;
      const expectedLength = (75 / 100) * length;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      aDebugEl.triggerEventHandler('touchstart', expectedEvent);
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).toBe(expectedLength + 'px');
    });
    it('should make the line appear on mouseenter event', () => {
      const expectedEvent = new Event('mouseenter');
      const length = 200;
      const expectedLength = (75 / 100) * length;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      aDebugEl.triggerEventHandler('mouseenter', expectedEvent);
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).toBe(expectedLength + 'px');
    });
  });
});
