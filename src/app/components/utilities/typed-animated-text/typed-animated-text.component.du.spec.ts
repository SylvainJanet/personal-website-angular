import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement, Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TypedAnimatedTextComponent } from './typed-animated-text.component';

describe('TypedAnimatedTextComponent - dom unit', () => {
  let fixture: ComponentFixture<TypedAnimatedTextComponent>;
  let componentInstance: TypedAnimatedTextComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TypedAnimatedTextComponent],
      providers: [Renderer2],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypedAnimatedTextComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance)
      .withContext('component should create')
      .toBeTruthy();
  });

  describe('textElement', () => {
    it('should have color', () => {
      const expected = 'red';
      componentInstance.textColor = expected;
      fixture.detectChanges();
      componentInstance.ngOnChanges({});

      const debugEl: DebugElement = fixture.debugElement;

      const linkDebugEl = debugEl.query(By.css('div')).query(By.css('span'));

      expect(linkDebugEl.styles['color'])
        .withContext('color should be set')
        .toBe(expected);
    });
    it('should have font-size', () => {
      const expected = '2em';
      componentInstance.fontSize = expected;
      fixture.detectChanges();
      componentInstance.ngOnChanges({});

      const debugEl: DebugElement = fixture.debugElement;

      const linkDebugEl = debugEl.query(By.css('div')).query(By.css('span'));

      expect(linkDebugEl.styles['font-size'])
        .withContext('font-size should be set')
        .toBe(expected);
    });
    it('should have padding', () => {
      const expected = '0.1em';
      fixture.detectChanges();
      componentInstance.ngOnChanges({});

      const debugEl: DebugElement = fixture.debugElement;

      const linkDebugEl = debugEl.query(By.css('div')).query(By.css('span'));

      expect(linkDebugEl.styles['padding'])
        .withContext('padding should be set')
        .toBe(expected);
    });
  });

  describe('blinkElement', () => {
    it('should have border-right-width', () => {
      const expected = '3px';
      componentInstance.blinkWidth = expected;
      fixture.detectChanges();
      componentInstance.ngOnChanges({});

      const debugEl: DebugElement = fixture.debugElement;

      const linkDebugEl = debugEl
        .query(By.css('div'))
        .queryAll(By.css('span'))[1];

      expect(linkDebugEl.styles['border-right-width'])
        .withContext('border-right-width should be set')
        .toBe(expected);
    });
    it('should have border-right-color', () => {
      const expected = 'red';
      componentInstance.textColor = expected;
      fixture.detectChanges();
      componentInstance.ngOnChanges({});

      const debugEl: DebugElement = fixture.debugElement;

      const linkDebugEl = debugEl
        .query(By.css('div'))
        .queryAll(By.css('span'))[1];

      expect(linkDebugEl.styles['border-right-color'])
        .withContext('border-right-color should be set')
        .toBe(expected);
    });
    it('should have font-size', () => {
      const expected = '2em';
      componentInstance.fontSize = expected;
      fixture.detectChanges();
      componentInstance.ngOnChanges({});

      const debugEl: DebugElement = fixture.debugElement;

      const linkDebugEl = debugEl
        .query(By.css('div'))
        .queryAll(By.css('span'))[1];

      expect(linkDebugEl.styles['font-size'])
        .withContext('font-size should be set')
        .toBe(expected);
    });
  });

  it('should have proper dom structure', () => {
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
      .withContext('child 1 of div should be SPAN')
      .toBe('SPAN');
    expect(firstDivEl.children[1].nativeElement.tagName)
      .withContext('child 2 of div should be SPAN')
      .toBe('SPAN');
  });
});
