import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';
import { LinkBarOnHoverComponent } from './link-bar-on-hover.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('LinkBarOnHoverComponent - dom unit', () => {
  let fixture: ComponentFixture<LinkBarOnHoverComponent>;
  let componentInstance: LinkBarOnHoverComponent;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  beforeEach(waitForAsync(() => {
    logServiceGlobalSpy = jasmine.createSpyObj('LogService', ['withClassName']);
    logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
    logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

    TestBed.configureTestingModule({
      imports: [LinkBarOnHoverComponent],
      providers: [
        DOMComputationService,
        { provide: LogService, useValue: logServiceGlobalSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkBarOnHoverComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  it('should have input textColor', () => {
    const expected = 'red';
    componentInstance.textColor = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('a'));

    expect(linkDebugEl.styles['color']).toBe(expected);
  });
  it('should have input lineColor', () => {
    const expected = 'red';
    componentInstance.lineColor = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('div'));

    expect(linkDebugEl.styles['background-color']).toBe(expected);
  });
  it('should have input link', () => {
    const expected = 'this.is.a.test.com';
    componentInstance.link = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('a'));

    expect(linkDebugEl.properties['href']).toBe(expected);
  });
  it('should have input text', () => {
    const expected = 'this is a test';
    componentInstance.text = of(expected);
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('a'));

    expect(linkDebugEl.nativeElement.textContent.trim()).toBe(expected);
  });
  it('should have input aStyle', () => {
    const expectedBgColor = 'blue';
    const expectedTxtDecoration = 'none';
    const input = `background-color: ${expectedBgColor}; text-decoration:${expectedTxtDecoration}`;
    componentInstance.aStyle = input;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('a'));

    expect(linkDebugEl.styles['background-color']).toBe(expectedBgColor);
    expect(linkDebugEl.styles['text-decoration']).toBe(expectedTxtDecoration);
  });
  it('should have input lineStyle', () => {
    const expectedBgColor = 'blue';
    const expectedTxtDecoration = 'none';
    const input = `background-color: ${expectedBgColor}; text-decoration:${expectedTxtDecoration}`;
    componentInstance.lineStyle = input;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div')).query(By.css('div'));

    expect(linkDebugEl.styles['background-color']).toBe(expectedBgColor);
    expect(linkDebugEl.styles['text-decoration']).toBe(expectedTxtDecoration);
  });
  it('should have input globalStyle', () => {
    const expectedBgColor = 'blue';
    const expectedTxtDecoration = 'none';
    const input = `background-color: ${expectedBgColor}; text-decoration:${expectedTxtDecoration}`;
    componentInstance.globalStyle = input;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const linkDebugEl = debugEl.query(By.css('div'));

    expect(linkDebugEl.styles['background-color']).toBe(expectedBgColor);
    expect(linkDebugEl.styles['text-decoration']).toBe(expectedTxtDecoration);
  });
  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children.length).toBe(2);
    expect(firstDivEl.children[0].nativeElement.tagName).toBe('A');
    expect(firstDivEl.children[1].nativeElement.tagName).toBe('DIV');
  });

  describe('a element', () => {
    let aDebugEl: DebugElement;
    beforeEach(() => {
      spyOn(componentInstance, 'lineDisappears');
      spyOn(componentInstance, 'lineAppears');
      aDebugEl = fixture.debugElement.children[0].children[0];
    });
    it('should call lineDisappears on click event', () => {
      aDebugEl.triggerEventHandler('click');

      expect(componentInstance.lineDisappears).toHaveBeenCalledTimes(1);
    });
    it('should call lineDisappears on touchend event', () => {
      aDebugEl.triggerEventHandler('touchend');

      expect(componentInstance.lineDisappears).toHaveBeenCalledTimes(1);
    });
    it('should call lineDisappears on mouseleave event', () => {
      aDebugEl.triggerEventHandler('mouseleave');

      expect(componentInstance.lineDisappears).toHaveBeenCalledTimes(1);
    });
    it('should call lineAppears on touchstart event', () => {
      const expectedEvent = new Event('touchstart');
      aDebugEl.triggerEventHandler('touchstart', expectedEvent);

      expect(componentInstance.lineAppears).toHaveBeenCalledOnceWith(
        expectedEvent
      );
    });
    it('should call lineAppears on mouseenter event', () => {
      const expectedEvent = new Event('mouseenter');
      aDebugEl.triggerEventHandler('mouseenter', expectedEvent);

      expect(componentInstance.lineAppears).toHaveBeenCalledOnceWith(
        expectedEvent
      );
    });
  });
});
