import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { HeaderComponent } from './header.component';

describe('HeaderComponent - integration', () => {
  let headerComponent: HeaderComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const expectedName = 'test title';
  const expectedOtherLanguage = 'test other language';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const expectedNameDto = of({ message: expectedName });
    const expectedOtherLanguageDto = of({ message: expectedOtherLanguage });
    httpClientSpy.get.and.returnValues(
      expectedNameDto,
      expectedOtherLanguageDto
    );
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(headerComponent).toBeTruthy();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            DOMComputationService,
            LanguageService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            DOMComputationService,
            LanguageService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            DOMComputationService,
            LanguageService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      const actualMyNameObs = headerComponent.myName;
      const actualOtherLanguageObs = headerComponent.otherLanguage;

      actualMyNameObs.subscribe((s) => {
        expect(s).toBe(expectedName);
      });
      actualOtherLanguageObs.subscribe((s) => {
        expect(s).toBe(expectedOtherLanguage);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            HeaderComponent,
            DOMComputationService,
            LanguageService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        headerComponent = TestBed.inject(HeaderComponent);
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
            HeaderComponent,
            DOMComputationService,
            LanguageService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        headerComponent = TestBed.inject(HeaderComponent);
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
            HeaderComponent,
            DOMComputationService,
            LanguageService,
            TextService,
            LogService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        headerComponent = TestBed.inject(HeaderComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
