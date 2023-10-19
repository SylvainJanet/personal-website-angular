import { TestBed } from '@angular/core/testing';
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
import { LanguageModalComponent } from './language-modal.component';

describe('LanguageModalComponent - integration', () => {
  let languageModalComponent: LanguageModalComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const expectedEnglishName = 'test english name';
  const expectedFrenchName = 'test french name';

  beforeEach(() => {
    const expectedMessageDto1 = of({
      message: expectedEnglishName,
    });
    const expectedMessageDto2 = of({
      message: expectedFrenchName,
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValues(
      expectedMessageDto1,
      expectedMessageDto2
    );
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(languageModalComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        languageModalComponent = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        languageModalComponent = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        languageModalComponent = TestBed.inject(LanguageModalComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      languageModalComponent.updateTexts();

      const actualEnglishName = languageModalComponent.englishName;
      const actualFrenchName = languageModalComponent.frenchName;

      expect(actualEnglishName)
        .withContext('english name should be set')
        .toBe(expectedEnglishName);
      expect(actualFrenchName)
        .withContext('french name should be set')
        .toBe(expectedFrenchName);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            LanguageModalComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        languageModalComponent = TestBed.inject(LanguageModalComponent);
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
            LanguageModalComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        languageModalComponent = TestBed.inject(LanguageModalComponent);
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
            LanguageModalComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        languageModalComponent = TestBed.inject(LanguageModalComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
