import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatasourceService } from 'src/app/services/db/datasource/datasource.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { ParagraphDecoderService } from 'src/app/services/paragraphdecoder/paragraph-decoder.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { CvTestimonialsComponent } from './cv-testimonials.component';
import { DebugElement } from '@angular/core';

describe('CvTestimonialsComponent - dom integration', () => {
  let fixture: ComponentFixture<CvTestimonialsComponent>;
  let componentInstance: CvTestimonialsComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const expectedName = 'test-name';
  const expectedComment = 'test-comment';
  const expectedCourse = 'test-course';
  const transitionTime = 200;
  beforeEach(() => {
    const expectedMessagesDto = of({
      messages: [expectedName, expectedComment, expectedCourse],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(expectedMessagesDto);
  });

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
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

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvTestimonialsComponent],
        providers: [
          TextService,
          PreloaderService,
          DatasourceService,
          ParagraphDecoderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvTestimonialsComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldSetValuesExpectation, fakeAsync(shouldSetValues));
  });

  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvTestimonialsComponent],
        providers: [
          TextService,
          PreloaderService,
          DatasourceService,
          ParagraphDecoderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvTestimonialsComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldSetValuesExpectation, fakeAsync(shouldSetValues));
  });

  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvTestimonialsComponent],
        providers: [
          TextService,
          PreloaderService,
          DatasourceService,
          ParagraphDecoderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvTestimonialsComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldSetValuesExpectation, fakeAsync(shouldSetValues));
  });
});
