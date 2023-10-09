import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CvSkillBarComponent } from './cv-skill-bar.component';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { BehaviorSubject, of } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('CvSkillBarComponent - dom unit', () => {
  let fixture: ComponentFixture<CvSkillBarComponent>;
  let componentInstance: CvSkillBarComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;

  beforeEach(waitForAsync(() => {
    preloaderServiceSpy = jasmine.createSpyObj(
      'PreloaderService',
      [],
      ['statusAnyLoading']
    );
    (
      Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
        ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
    ).and.returnValue(new BehaviorSubject<boolean | null>(null));
    TestBed.configureTestingModule({
      imports: [CvSkillBarComponent],
      providers: [{ provide: PreloaderService, useValue: preloaderServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvSkillBarComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance)
      .withContext('component should create')
      .toBeTruthy();
  });

  describe('onResize method', () => {
    it('should be called on window resize event', () => {
      spyOn(componentInstance, 'onResize');

      window.dispatchEvent(new Event('resize'));

      expect(componentInstance.onResize)
        .withContext('onResize should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });
  describe('onScroll method', () => {
    it('should be called on window scroll event', () => {
      spyOn(componentInstance, 'onScroll');

      window.dispatchEvent(new Event('scroll'));

      expect(componentInstance.onScroll)
        .withContext('onScroll should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('getElPos method', () => {
    it('should set the min and max position of the element in the page', () => {
      componentInstance.getElPos();

      // an e2e test would be more appropriate to check the accuracy of the values

      const actualPosElementMin = componentInstance.posElementMin;
      const actualPosElementMax = componentInstance.posElementMax;

      expect(actualPosElementMax > actualPosElementMin)
        .withContext('min < max')
        .toBeTrue();
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
      .withContext('child 1 at root should have 2 children')
      .toBe(2);
    expect(firstDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of child 1 at root should be DIV')
      .toBe('DIV');
    expect(firstDivEl.children[1].nativeElement.tagName)
      .withContext('child 2 of child 1 at root should be DIV')
      .toBe('DIV');

    // skill name
    let secondDivEl: DebugElement = firstDivEl.children[0];
    expect(secondDivEl.children.length)
      .withContext('skill name should have 1 child')
      .toBe(1);
    expect(secondDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of skill name should be DIV')
      .toBe('DIV');
    expect(secondDivEl.children[0].children.length)
      .withContext('skill name - div should have 2 children')
      .toBe(2);

    expect(secondDivEl.children[0].children[0].nativeElement.tagName)
      .withContext('child 1 of skill name - div should be DIV')
      .toBe('DIV');
    expect(secondDivEl.children[0].children[0].children.length)
      .withContext('child 1 of skill name - div should have no children')
      .toBe(0);
    expect(secondDivEl.children[0].children[1].nativeElement.tagName)
      .withContext('child 2 of skill name - div should be DIV')
      .toBe('DIV');
    expect(secondDivEl.children[0].children[1].children.length)
      .withContext('child 2 of skill name - div should have no children')
      .toBe(0);

    // progress
    secondDivEl = firstDivEl.children[1];
    expect(secondDivEl.children.length)
      .withContext('progress should have 1 child')
      .toBe(1);
    expect(secondDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of progress should be DIV')
      .toBe('DIV');
    expect(secondDivEl.children[0].children.length)
      .withContext('child 1 of progress should have no children')
      .toBe(0);
  });

  it('should set skillName', () => {
    const expected = 'THIS IS A TEST';
    componentInstance.skillName = of(expected);
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const secondDivEl: DebugElement = firstDivEl.children[0];
    const thirdDivEl: DebugElement = secondDivEl.children[0];
    const skillNameDivEl: DebugElement = thirdDivEl.children[0];

    const actual = skillNameDivEl.nativeElement.innerHTML;

    expect(actual).withContext('skill name should be set').toBe(expected);
  });
  it('should set percent', () => {
    const expected = 40;
    componentInstance.percent = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const secondDivEl: DebugElement = firstDivEl.children[0];
    const thirdDivEl: DebugElement = secondDivEl.children[0];
    const percentDivEl: DebugElement = thirdDivEl.children[1];

    const actual = percentDivEl.nativeElement.innerHTML;

    expect(actual)
      .withContext('percent should be set')
      .toBe(expected + '%');
  });
  it('should set progress bar width', () => {
    componentInstance.updateWidth();
    const widthProperty = componentInstance.width;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const secondDivEl: DebugElement = firstDivEl.children[1];
    const progressBarDivEl: DebugElement = secondDivEl.children[0];

    const actual = progressBarDivEl.styles['width'];

    expect(actual)
      .withContext('width should be set')
      .toBe(widthProperty.endsWith('%') ? widthProperty : widthProperty + 'px');
  });
});
