import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { DebugElement } from '@angular/core';
import { ButtonBarOnHoverComponent } from './button-bar-on-hover.component';
import { first } from 'rxjs';

describe('ButtonBarOnHoverComponent - dom integration', () => {
  let fixture: ComponentFixture<ButtonBarOnHoverComponent>;
  let componentInstance: ButtonBarOnHoverComponent;
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
      imports: [ButtonBarOnHoverComponent],
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
    fixture = TestBed.createComponent(ButtonBarOnHoverComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('button element', () => {
    let buttonDebugEl: DebugElement;
    let lineDebugEl: DebugElement;
    beforeEach(() => {
      buttonDebugEl = fixture.debugElement.children[0].children[0];
      lineDebugEl = fixture.debugElement.children[0].children[1];
    });
    it('should make the line disappear on click event', () => {
      const expectedEvent = new Event('mouseenter');
      const length = 200;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      buttonDebugEl.triggerEventHandler('mouseenter', expectedEvent);
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).not.toBe('0%');

      buttonDebugEl.triggerEventHandler('click');
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).toBe('0%');
    });
    it('should make the line disappear on touchend event', () => {
      const expectedEvent = new Event('mouseenter');
      const length = 200;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      buttonDebugEl.triggerEventHandler('mouseenter', expectedEvent);
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).not.toBe('0%');

      buttonDebugEl.triggerEventHandler('touchend');
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).toBe('0%');
    });
    it('should make the line disappear on mouseleave event', () => {
      const expectedEvent = new Event('mouseenter');
      const length = 200;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      buttonDebugEl.triggerEventHandler('mouseenter', expectedEvent);
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).not.toBe('0%');

      buttonDebugEl.triggerEventHandler('mouseleave');
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).toBe('0%');
    });
    it('should make the line appear on touchstart event', () => {
      buttonDebugEl.triggerEventHandler('click');
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).toBe('0%');

      const expectedEvent = new Event('touchstart');
      const length = 200;
      const expectedLength = (75 / 100) * length;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      buttonDebugEl.triggerEventHandler('touchstart', expectedEvent);
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).toBe(expectedLength + 'px');
    });
    it('should make the line appear on mouseenter event', () => {
      buttonDebugEl.triggerEventHandler('click');
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).toBe('0%');

      const expectedEvent = new Event('mouseenter');
      const length = 200;
      const expectedLength = (75 / 100) * length;
      DOMComputationServiceSpy.getActualWidth.and.returnValue(length);

      buttonDebugEl.triggerEventHandler('mouseenter', expectedEvent);
      fixture.detectChanges();

      expect(lineDebugEl.styles['width']).toBe(expectedLength + 'px');
    });
    it('should emit press event on click event', () => {
      const expectedEvent = new Event('click');
      let emitted: Event | undefined;

      componentInstance.press
        .pipe(first())
        .subscribe((e: Event) => (emitted = e));

      buttonDebugEl.triggerEventHandler('click', expectedEvent);

      expect(emitted).toBe(expectedEvent);
    });
  });
});
