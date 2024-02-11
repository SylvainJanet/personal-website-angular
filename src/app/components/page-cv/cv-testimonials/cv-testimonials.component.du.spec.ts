import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { CvTestimonialsComponent } from './cv-testimonials.component';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { DebugElement } from '@angular/core';

describe('CvTestimonialsComponent - dom unit', () => {
  let fixture: ComponentFixture<CvTestimonialsComponent>;
  let componentInstance: CvTestimonialsComponent;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const expectedName = 'test-name';
  const expectedComment = 'test-comment';
  const expectedCourse = 'test-course';
  const transitionTime = 200;

  beforeEach(waitForAsync(() => {
    preloaderServiceSpy = jasmine.createSpyObj(
      'PreloaderService',
      ['isLoading'],
      []
    );
    visibleToLoadTextServiceSpy = jasmine.createSpyObj(
      'VisibleToLoadTextServiceSpy',
      ['hasTextLoaded', 'subscribe', 'unsubscribe', 'textLoaded'],
      []
    );
    textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

    const expectedMessages = of([
      expectedName,
      expectedComment,
      expectedCourse,
    ]);
    textServiceSpy.getMulti.and.returnValue(expectedMessages);
  }));

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(componentInstance)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [CvTestimonialsComponent],
          providers: [
            { provide: TextService, useValue: textServiceSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: devEnv },
          ],
        }).compileComponents();

        visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
        preloaderServiceSpy.isLoading.and.returnValue(false);
        fixture = TestBed.createComponent(CvTestimonialsComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [CvTestimonialsComponent],
          providers: [
            { provide: TextService, useValue: textServiceSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: stagingEnv },
          ],
        }).compileComponents();

        visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
        preloaderServiceSpy.isLoading.and.returnValue(false);
        fixture = TestBed.createComponent(CvTestimonialsComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [CvTestimonialsComponent],
          providers: [
            { provide: TextService, useValue: textServiceSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: prodEnv },
          ],
        }).compileComponents();

        visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
        preloaderServiceSpy.isLoading.and.returnValue(false);
        fixture = TestBed.createComponent(CvTestimonialsComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('DOM', () => {
    const shouldHaveProperDomStructureExpectation =
      'should have proper dom structure';
    const shouldHaveProperDomStructure = () => {
      // loaded
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).withContext('2 children at root').toBe(2);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is DIV')
        .toBe('DIV');
      expect(debugEl.children[1].nativeElement.tagName)
        .withContext('child 2 at root is DIV')
        .toBe('DIV');

      // img
      const imgDivEl = debugEl.children[0];
      expect(imgDivEl.children.length)
        .withContext('child 1 at root should have 1 child')
        .toBe(1);
      expect(imgDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of child 1 at root should be IMG')
        .toBe('IMG');

      // slider
      const sliderEl: DebugElement = debugEl.children[1];
      expect(sliderEl.children.length)
        .withContext('slider should have 3 children')
        .toBe(3);
      expect(sliderEl.children[0].nativeElement.tagName)
        .withContext('first child of slider should be DIV')
        .toBe('DIV');
      expect(sliderEl.children[1].nativeElement.tagName)
        .withContext('second child of slider should be BUTTON')
        .toBe('BUTTON');
      expect(sliderEl.children[2].nativeElement.tagName)
        .withContext('third child of slider should be BUTTON')
        .toBe('BUTTON');

      const rowEl: DebugElement = sliderEl.children[0];

      expect(rowEl.children.length)
        .withContext('div should have 3 children')
        .toBe(3);
      expect(rowEl.children[0].nativeElement.tagName)
        .withContext('first child of row shoulb be DIV')
        .toBe('DIV');
      expect(rowEl.children[1].nativeElement.tagName)
        .withContext('second child of row shoulb be DIV')
        .toBe('DIV');
      expect(rowEl.children[2].nativeElement.tagName)
        .withContext('third child of row shoulb be DIV')
        .toBe('DIV');

      const firstColEl: DebugElement = rowEl.children[0];
      expect(firstColEl.children.length)
        .withContext('cold 1 should have no children')
        .toBe(0);
      const secondColEl: DebugElement = rowEl.children[1];
      expect(secondColEl.children.length)
        .withContext('col 2 should have 1 child')
        .toBe(1);
      expect(secondColEl.children[0].nativeElement.tagName)
        .withContext('child of col 2 should be APP-CV-TESTIMONIAL')
        .toBe('APP-CV-TESTIMONIAL');
      const thirdColEl: DebugElement = rowEl.children[2];
      expect(thirdColEl.children.length)
        .withContext('col 3 should have no children')
        .toBe(0);

      const button1El: DebugElement = sliderEl.children[1];
      expect(button1El.children.length)
        .withContext('button 1 should have no children')
        .toBe(0);
      const button2El: DebugElement = sliderEl.children[2];
      expect(button2El.children.length)
        .withContext('button 1 should have no children')
        .toBe(0);
    };

    const shouldSetValuesExpectation =
      'should set values given by the text service';
    const shouldSetValues = () => {
      const expectedGrade = componentInstance.grades[0];
      const expectedDate = componentInstance.dates[0];
      const expectedOpacity = 1;
      componentInstance.updateTexts();
      fixture.detectChanges();

      tick(transitionTime);
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      const sliderEl: DebugElement = debugEl.children[1];
      const rowEl: DebugElement = sliderEl.children[0];
      const secondColEl: DebugElement = rowEl.children[1];

      const testimonialComponent: CvTestimonialsComponent =
        secondColEl.children[0].componentInstance;

      expect(testimonialComponent.name)
        .withContext('name should be set')
        .toBe(expectedName);
      expect(testimonialComponent.comment)
        .withContext('comment should be set')
        .toBe(expectedComment);
      expect(testimonialComponent.grade)
        .withContext('grade should be set')
        .toBe(expectedGrade);
      expect(testimonialComponent.date)
        .withContext('date should be set')
        .toBe(expectedDate);
      expect(testimonialComponent.course)
        .withContext('course should be set')
        .toBe(expectedCourse);
      expect(testimonialComponent.opacity)
        .withContext('opacity should be set')
        .toBe(expectedOpacity);
    };

    const shouldNotHidImgAtFirstExpectation = 'should not hide img at first';
    const shouldNotHidImgAtFirst = () => {
      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];

      const actual = firstDivEl.styles['display'];
      expect(actual).withContext("display should be 'block'").toBe('block');
    };

    const shouldCallOnDoubleImgLoadWhenImgLoadedExpectation =
      'should call onDoubleImgLoad when img is loaded';
    const shouldCallOnDoubleImgLoadWhenImgLoaded = () => {
      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];
      const imgEl = firstDivEl.children[0];

      spyOn(componentInstance, 'onDoubleImgLoad');
      imgEl.triggerEventHandler('load');

      expect(componentInstance.onDoubleImgLoad)
        .withContext('onDoubleImgLoad should have been called')
        .toHaveBeenCalled();
    };

    const shouldHideImgOnceLoadedExpectation = 'should hide img once loaded';
    const shouldHideImgOnceLoaded = () => {
      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];

      const imgEl = firstDivEl.children[0];
      imgEl.triggerEventHandler('load');
      fixture.detectChanges();

      const actual = firstDivEl.styles['display'];
      expect(actual).withContext("display should be 'none'").toBe('none');
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [CvTestimonialsComponent],
          providers: [
            { provide: TextService, useValue: textServiceSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: devEnv },
          ],
        }).compileComponents();

        fixture = TestBed.createComponent(CvTestimonialsComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
      });
      it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
      it(shouldSetValuesExpectation, fakeAsync(shouldSetValues));
      it(shouldNotHidImgAtFirstExpectation, shouldNotHidImgAtFirst);
      it(
        shouldCallOnDoubleImgLoadWhenImgLoadedExpectation,
        shouldCallOnDoubleImgLoadWhenImgLoaded
      );
      it(shouldHideImgOnceLoadedExpectation, shouldHideImgOnceLoaded);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [CvTestimonialsComponent],
          providers: [
            { provide: TextService, useValue: textServiceSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: stagingEnv },
          ],
        }).compileComponents();

        fixture = TestBed.createComponent(CvTestimonialsComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
      });
      it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
      it(shouldSetValuesExpectation, fakeAsync(shouldSetValues));
      it(shouldNotHidImgAtFirstExpectation, shouldNotHidImgAtFirst);
      it(
        shouldCallOnDoubleImgLoadWhenImgLoadedExpectation,
        shouldCallOnDoubleImgLoadWhenImgLoaded
      );
      it(shouldHideImgOnceLoadedExpectation, shouldHideImgOnceLoaded);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [CvTestimonialsComponent],
          providers: [
            { provide: TextService, useValue: textServiceSpy },
            { provide: PreloaderService, useValue: preloaderServiceSpy },
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: ENV, useValue: prodEnv },
          ],
        }).compileComponents();

        fixture = TestBed.createComponent(CvTestimonialsComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
      });
      it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
      it(shouldSetValuesExpectation, fakeAsync(shouldSetValues));
      it(shouldNotHidImgAtFirstExpectation, shouldNotHidImgAtFirst);
      it(
        shouldCallOnDoubleImgLoadWhenImgLoadedExpectation,
        shouldCallOnDoubleImgLoadWhenImgLoaded
      );
      it(shouldHideImgOnceLoadedExpectation, shouldHideImgOnceLoaded);
    });
  });
});
