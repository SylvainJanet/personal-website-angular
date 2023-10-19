import { TestBed } from '@angular/core/testing';
import { CvContactInfoComponent } from './cv-contact-info.component';
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
  let component: CvContactInfoComponent;
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
    const expectedMessagesDto = of({
      messages: [
        expectedName,
        expectedSj,
        expectedProfile,
        expectedFsDev,
        expectedEmail,
        expectedPhone,
      ],
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
            CvContactInfoComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(CvContactInfoComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(CvContactInfoComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(CvContactInfoComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      component.updateTexts();

      const actualNameObs = component.name;
      const actualSjObs = component.sj;
      const actualProfileObs = component.profile;
      const actualFsDevObs = component.fsDev;
      const actualEmailObs = component.email;
      const actualPhoneObs = component.phone;

      actualNameObs.subscribe((s) => {
        expect(s).withContext('name should be set').toBe(expectedName);
      });
      actualSjObs.subscribe((s) => {
        expect(s).withContext('sj should be set').toBe(expectedSj);
      });
      actualProfileObs.subscribe((s) => {
        expect(s).withContext('profile should be set').toBe(expectedProfile);
      });
      actualFsDevObs.subscribe((s) => {
        expect(s).withContext('fsDev should be set').toBe(expectedFsDev);
      });
      actualEmailObs.subscribe((s) => {
        expect(s).withContext('email should be set').toBe(expectedEmail);
      });
      actualPhoneObs.subscribe((s) => {
        expect(s).withContext('phone should be set').toBe(expectedPhone);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvContactInfoComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(CvContactInfoComponent);
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
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(CvContactInfoComponent);
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
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(CvContactInfoComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
