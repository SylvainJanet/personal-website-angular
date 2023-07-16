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
      declarations: [CvSkillBarComponent],
      providers: [{ provide: PreloaderService, useValue: preloaderServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvSkillBarComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  describe('onResize method', () => {
    it('should be called on window resize event', () => {
      spyOn(componentInstance, 'onResize');

      window.dispatchEvent(new Event('resize'));

      expect(componentInstance.onResize).toHaveBeenCalledTimes(1);
    });
  });
  describe('onScroll method', () => {
    it('should be called on window scroll event', () => {
      spyOn(componentInstance, 'onScroll');

      window.dispatchEvent(new Event('scroll'));

      expect(componentInstance.onScroll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getElPos method', () => {
    it('should set the min and max position of the element in the page', () => {
      componentInstance.getElPos();

      // an e2e test would be more appropriate to check the accuracy of the values
      //   const expectedPosElementMin = 0;
      //   const expectedPosElementMax = 0;

      const actualPosElementMin = componentInstance.posElementMin;
      const actualPosElementMax = componentInstance.posElementMax;

      //   expect(actualPosElementMin).toBe(expectedPosElementMin);
      //   expect(actualPosElementMax).toBe(expectedPosElementMax);

      expect(actualPosElementMax > actualPosElementMin).toBeTrue();
    });
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children.length).toBe(2);
    expect(firstDivEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(firstDivEl.children[1].nativeElement.tagName).toBe('DIV');

    // skill name
    let secondDivEl: DebugElement = firstDivEl.children[0];
    expect(secondDivEl.children.length).toBe(1);
    expect(secondDivEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(secondDivEl.children[0].children.length).toBe(2);

    expect(secondDivEl.children[0].children[0].nativeElement.tagName).toBe(
      'DIV'
    );
    expect(secondDivEl.children[0].children[0].children.length).toBe(0);
    expect(secondDivEl.children[0].children[1].nativeElement.tagName).toBe(
      'DIV'
    );
    expect(secondDivEl.children[0].children[1].children.length).toBe(0);

    // progress
    secondDivEl = firstDivEl.children[1];
    expect(secondDivEl.children.length).toBe(1);
    expect(secondDivEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(secondDivEl.children[0].children.length).toBe(0);
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

    expect(actual).toBe(expected);
  });
  it('should set percent', () => {
    const expected = 40;
    componentInstance.percent = expected;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const secondDivEl: DebugElement = firstDivEl.children[0];
    const thirdDivEl: DebugElement = secondDivEl.children[0];
    const skillNameDivEl: DebugElement = thirdDivEl.children[1];

    const actual = skillNameDivEl.nativeElement.innerHTML;

    expect(actual).toBe(expected + '%');
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

    expect(actual).toBe(
      widthProperty.endsWith('%') ? widthProperty : widthProperty + 'px'
    );
  });
});
