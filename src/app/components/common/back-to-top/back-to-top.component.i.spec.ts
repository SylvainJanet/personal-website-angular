import { HttpClient } from '@angular/common/http';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { BackToTopComponent } from './back-to-top.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';

describe('BackToTopComponent - integration', () => {
  let backToTopComponent: BackToTopComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;
  const expectedBackToTopAlt = 'this is a test';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const expectedBackToTopAltDto = of({ message: expectedBackToTopAlt });
    httpClientSpy.get.and.returnValues(expectedBackToTopAltDto);
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(backToTopComponent).toBeTruthy();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      const actualAltTxtObs = backToTopComponent.altTxt;

      actualAltTxtObs.subscribe((s) => {
        expect(s).toBe(expectedBackToTopAlt);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BackToTopComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        backToTopComponent = TestBed.inject(BackToTopComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
