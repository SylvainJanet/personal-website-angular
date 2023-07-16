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
import { CvSkillsComponent } from './cv-skills.component';

describe('CvSkillsComponent - integration', () => {
  let cvSkillsComponent: CvSkillsComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;
  const expectedSkills = 'test skills';
  const expectedJava = 'test java';
  const expectedCsharp = 'test csharp';
  const expectedPython = 'test python';
  const expectedJsts = 'test jsts';
  const expectedSql = 'test sql';
  const expectedHtml = 'test html';
  const expectedLatex = 'test latex';
  beforeEach(() => {
    const expectedSkillsDto = of({ message: expectedSkills });
    const expectedJavaDto = of({ message: expectedJava });
    const expectedCsharpDto = of({ message: expectedCsharp });
    const expectedPythonDto = of({ message: expectedPython });
    const expectedJstsDto = of({ message: expectedJsts });
    const expectedSqlDto = of({ message: expectedSql });
    const expectedHtmlDto = of({ message: expectedHtml });
    const expectedLatexDto = of({ message: expectedLatex });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValues(
      expectedSkillsDto,
      expectedJavaDto,
      expectedCsharpDto,
      expectedPythonDto,
      expectedJstsDto,
      expectedSqlDto,
      expectedHtmlDto,
      expectedLatexDto
    );
  });

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(cvSkillsComponent).toBeTruthy();
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        cvSkillsComponent = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        cvSkillsComponent = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        cvSkillsComponent = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      const actualSkillsObs = cvSkillsComponent.skills;
      const actualJavaObs = cvSkillsComponent.java;
      const actualCsharpObs = cvSkillsComponent.csharp;
      const actualPythonDevObs = cvSkillsComponent.python;
      const actualJstsObs = cvSkillsComponent.jsts;
      const actualSqlObs = cvSkillsComponent.sql;
      const actualHtmlObs = cvSkillsComponent.html;
      const actualLatexObs = cvSkillsComponent.latex;

      actualSkillsObs.subscribe((s) => {
        expect(s).toBe(expectedSkills);
      });
      actualJavaObs.subscribe((s) => {
        expect(s).toBe(expectedJava);
      });
      actualCsharpObs.subscribe((s) => {
        expect(s).toBe(expectedCsharp);
      });
      actualPythonDevObs.subscribe((s) => {
        expect(s).toBe(expectedPython);
      });
      actualJstsObs.subscribe((s) => {
        expect(s).toBe(expectedJsts);
      });
      actualSqlObs.subscribe((s) => {
        expect(s).toBe(expectedSql);
      });
      actualHtmlObs.subscribe((s) => {
        expect(s).toBe(expectedHtml);
      });
      actualLatexObs.subscribe((s) => {
        expect(s).toBe(expectedLatex);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        cvSkillsComponent = TestBed.inject(CvSkillsComponent);
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
            CvSkillsComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        cvSkillsComponent = TestBed.inject(CvSkillsComponent);
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
            CvSkillsComponent,
            LanguageService,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        cvSkillsComponent = TestBed.inject(CvSkillsComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
