import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatasourceService } from 'src/app/services/db/datasource/datasource.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { CvTestimonialsComponent } from './cv-testimonials.component';

describe('CvTestimonialsComponent - integration', () => {
  let component: CvTestimonialsComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const expectedName = 'test-name';
  const expectedComment = 'test-comment';
  const expectedCourse = 'test-course';
  beforeEach(() => {
    const expectedMessagesDto = of({
      messages: [expectedName, expectedComment, expectedCourse],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValues(expectedMessagesDto);
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(CvTestimonialsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('queryTexts method', () => {
    const waitTime = 200;
    const indexToTest = 0;

    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
      component.updateTexts();

      expect(component.name).withContext('name should not be set').toBe('');
      expect(component.comment)
        .withContext('comment should not be set')
        .toBe('');
      expect(component.course).withContext('course should not be set').toBe('');

      tick(waitTime);

      expect(component.name)
        .withContext('name should be set')
        .toBe(expectedName);
      expect(component.comment)
        .withContext('comment should be set')
        .toBe(expectedComment);
      expect(component.course)
        .withContext('course should be set')
        .toBe(expectedCourse);
    };

    const shouldSetActualValuesToArraysExpectation =
      'should set the actual values to the arrays, to remember them and not query them later';
    const shouldSetActualValuesToArrays = () => {
      component.updateTexts();

      expect(component.actualNames[indexToTest])
        .withContext('name should not be set')
        .toBe('');
      expect(component.actualComments[indexToTest])
        .withContext('comment should not be set')
        .toBe('');
      expect(component.actualCourses[indexToTest])
        .withContext('course should not be set')
        .toBe('');

      tick(waitTime);

      expect(component.actualNames[indexToTest])
        .withContext('name should be set')
        .toBe(expectedName);
      expect(component.actualComments[indexToTest])
        .withContext('comment should be set')
        .toBe(expectedComment);
      expect(component.actualCourses[indexToTest])
        .withContext('course should be set')
        .toBe(expectedCourse);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
        component.currentIndex = indexToTest;
      });
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        fakeAsync(shouldSetPropertiesToTheServiceResult)
      );
      it(
        shouldSetActualValuesToArraysExpectation,
        fakeAsync(shouldSetActualValuesToArrays)
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
        component.currentIndex = indexToTest;
      });
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        fakeAsync(shouldSetPropertiesToTheServiceResult)
      );
      it(
        shouldSetActualValuesToArraysExpectation,
        fakeAsync(shouldSetActualValuesToArrays)
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvTestimonialsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(CvTestimonialsComponent);
        component.currentIndex = indexToTest;
      });
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        fakeAsync(shouldSetPropertiesToTheServiceResult)
      );
      it(
        shouldSetActualValuesToArraysExpectation,
        fakeAsync(shouldSetActualValuesToArrays)
      );
    });
  });
});
