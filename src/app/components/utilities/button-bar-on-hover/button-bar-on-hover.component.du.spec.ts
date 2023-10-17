import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { DebugElement, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ButtonBarOnHoverComponent } from './button-bar-on-hover.component';

describe('ButtonBarOnHoverComponent - dom unit', () => {
  let fixture: ComponentFixture<ButtonBarOnHoverComponent>;
  let componentInstance: ButtonBarOnHoverComponent;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  beforeEach(waitForAsync(() => {
    logServiceGlobalSpy = jasmine.createSpyObj('LogService', ['withClassName']);
    logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
    logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

    TestBed.configureTestingModule({
      imports: [ButtonBarOnHoverComponent],
      providers: [
        DOMComputationService,
        { provide: LogService, useValue: logServiceGlobalSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonBarOnHoverComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  });

  it('should have input textColor', () => {
    const expected = 'red';
    componentInstance.textColor = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('button'));

    expect(linkDebugEl.styles['color'])
      .withContext('color should be set')
      .toBe(expected);
  });
  it('should have input lineColor', () => {
    const expected = 'red';
    componentInstance.lineColor = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('div'));

    expect(linkDebugEl.styles['background-color'])
      .withContext('background-color should be set')
      .toBe(expected);
  });
  it('should have input text', () => {
    const expected = 'this is a test';
    componentInstance.text = of(expected);
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('button'));

    expect(linkDebugEl.nativeElement.textContent.trim())
      .withContext('text should be set')
      .toBe(expected);
  });
  it('should have input buttonStyle', () => {
    const expectedBgColor = 'blue';
    const expectedTxtDecoration = 'none';
    const input = `background-color: ${expectedBgColor}; text-decoration:${expectedTxtDecoration}`;
    componentInstance.buttonStyle = input;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('button'));

    expect(linkDebugEl.styles['background-color'])
      .withContext('background-color should be set')
      .toBe(expectedBgColor);
    expect(linkDebugEl.styles['text-decoration'])
      .withContext('text-decoration should be set')
      .toBe(expectedTxtDecoration);
  });
  it('should have input lineStyle', () => {
    const expectedBgColor = 'blue';
    const expectedTxtDecoration = 'none';
    const input = `background-color: ${expectedBgColor}; text-decoration:${expectedTxtDecoration}`;
    componentInstance.lineStyle = input;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('div'));

    expect(linkDebugEl.styles['background-color'])
      .withContext('background-color should be set')
      .toBe(expectedBgColor);
    expect(linkDebugEl.styles['text-decoration'])
      .withContext('text-decoration should be set')
      .toBe(expectedTxtDecoration);
  });
  it('should have input globalStyle', () => {
    const expectedBgColor = 'blue';
    const expectedTxtDecoration = 'none';
    const input = `background-color: ${expectedBgColor}; text-decoration:${expectedTxtDecoration}`;
    componentInstance.globalStyle = input;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div'));

    expect(linkDebugEl.styles['background-color'])
      .withContext('background-color should be set')
      .toBe(expectedBgColor);
    expect(linkDebugEl.styles['text-decoration'])
      .withContext('text-decoration should be set')
      .toBe(expectedTxtDecoration);
  });
  it('sould have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).withContext('1 child at root').toBe(1);
    expect(debugEl.children[0].nativeElement.tagName)
      .withContext('child 1 at root is DIV')
      .toBe('DIV');

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children.length)
      .withContext('div should have 2 children')
      .toBe(2);
    expect(firstDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of div should be BUTTON')
      .toBe('BUTTON');
    expect(firstDivEl.children[1].nativeElement.tagName)
      .withContext('child 2 of div should be DIV')
      .toBe('DIV');
  });

  describe('button element', () => {
    let aDebugEl: DebugElement;
    let pressSpy: jasmine.SpyObj<EventEmitter<Event>>;
    beforeEach(() => {
      pressSpy = jasmine.createSpyObj('EventEmitter', ['emit']);
      spyOn(componentInstance, 'lineDisappears');
      spyOn(componentInstance, 'lineAppears');
      aDebugEl = fixture.debugElement.children[0].children[0];
      componentInstance.press = pressSpy;
    });
    it('should call lineDisappears on click event', () => {
      aDebugEl.triggerEventHandler('click');

      expect(componentInstance.lineDisappears)
        .withContext('lineDisappears should have been called')
        .toHaveBeenCalledTimes(1);
    });
    it('should call lineDisappears on touchend event', () => {
      aDebugEl.triggerEventHandler('touchend');

      expect(componentInstance.lineDisappears)
        .withContext('lineDisappears should have been called')
        .toHaveBeenCalledTimes(1);
    });
    it('should call lineDisappears on mouseleave event', () => {
      aDebugEl.triggerEventHandler('mouseleave');

      expect(componentInstance.lineDisappears)
        .withContext('lineDisappears should have been called')
        .toHaveBeenCalledTimes(1);
    });
    it('should call lineAppears on touchstart event', () => {
      const expectedEvent = new Event('touchstart');
      aDebugEl.triggerEventHandler('touchstart', expectedEvent);

      expect(componentInstance.lineAppears)
        .withContext('lineAppears should have been called')
        .toHaveBeenCalledOnceWith(expectedEvent);
    });
    it('should call lineAppears on mouseenter event', () => {
      const expectedEvent = new Event('mouseenter');
      aDebugEl.triggerEventHandler('mouseenter', expectedEvent);

      expect(componentInstance.lineAppears)
        .withContext('lineAppears should have been called')
        .toHaveBeenCalledOnceWith(expectedEvent);
    });
    it('should emit press event on click event', () => {
      const expectedEvent = new Event('click');
      aDebugEl.triggerEventHandler('click', expectedEvent);

      expect(pressSpy.emit)
        .withContext('emit should have been called')
        .toHaveBeenCalledOnceWith(expectedEvent);
    });
  });
});
