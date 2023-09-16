import { TestBed } from '@angular/core/testing';
import { CvContactInfoComponent } from './cv-contact-info.component';
import { LanguageService } from 'src/app/services/language/language.service';
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

describe('CvContactInfoComponent - integration', () => {
  let cvContactInfoComponent: CvContactInfoComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;
  const expectedName = 'test name';
  const expectedSj = 'test sj';
  const expectedProfile = 'test profile';
  const expectedFsDev = 'test fsDev';
  const expectedEmail = 'test email';
  const expectedPhone = 'test phone';
  beforeEach(() => {
    const expectedNameDto = of({ message: expectedName });
    const expectedSjDto = of({ message: expectedSj });
    const expectedProfileDto = of({ message: expectedProfile });
    const expectedFsDevDto = of({ message: expectedFsDev });
    const expectedEmailDto = of({ message: expectedEmail });
    const expectedPhoneDto = of({ message: expectedPhone });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValues(
      expectedNameDto,
      expectedSjDto,
      expectedProfileDto,
      expectedFsDevDto,
      expectedEmailDto,
      expectedPhoneDto
    );
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(cvContactInfoComponent).toBeTruthy();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      const actualNameObs = cvContactInfoComponent.name;
      const actualSjObs = cvContactInfoComponent.sj;
      const actualProfileObs = cvContactInfoComponent.profile;
      const actualFsDevObs = cvContactInfoComponent.fsDev;
      const actualEmailObs = cvContactInfoComponent.email;
      const actualPhoneObs = cvContactInfoComponent.phone;

      actualNameObs.subscribe((s) => {
        expect(s).toBe(expectedName);
      });
      actualSjObs.subscribe((s) => {
        expect(s).toBe(expectedSj);
      });
      actualProfileObs.subscribe((s) => {
        expect(s).toBe(expectedProfile);
      });
      actualFsDevObs.subscribe((s) => {
        expect(s).toBe(expectedFsDev);
      });
      actualEmailObs.subscribe((s) => {
        expect(s).toBe(expectedEmail);
      });
      actualPhoneObs.subscribe((s) => {
        expect(s).toBe(expectedPhone);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
            CvContactInfoComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
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
            CvContactInfoComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        cvContactInfoComponent = TestBed.inject(CvContactInfoComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
