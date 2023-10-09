import { TestBed } from '@angular/core/testing';
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
import { CvImgComponent } from './cv-img.component';

describe('CvImgComponent - integration', () => {
  let cvImgComponent: CvImgComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;
  const expectedAltText = 'test alt text';
  beforeEach(() => {
    const expectedAltTextDto = of({ message: expectedAltText });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValues(expectedAltTextDto);
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(cvImgComponent)
        .withContext('component should create')
        .toBeTruthy();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvImgComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        cvImgComponent = TestBed.inject(CvImgComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvImgComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        cvImgComponent = TestBed.inject(CvImgComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvImgComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        cvImgComponent = TestBed.inject(CvImgComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      const actualAltTextObs = cvImgComponent.altTxt;

      actualAltTextObs.subscribe((s) => {
        expect(s).withContext('altTxt should be set').toBe(expectedAltText);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvImgComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        cvImgComponent = TestBed.inject(CvImgComponent);
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
            CvImgComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        cvImgComponent = TestBed.inject(CvImgComponent);
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
            CvImgComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        cvImgComponent = TestBed.inject(CvImgComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
