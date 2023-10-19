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
import { CvSkillsComponent } from './cv-skills.component';

describe('CvSkillsComponent - integration', () => {
  let component: CvSkillsComponent;
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
    const expectedMessagesDto = of({
      messages: [
        expectedSkills,
        expectedJava,
        expectedCsharp,
        expectedPython,
        expectedJsts,
        expectedSql,
        expectedHtml,
        expectedLatex,
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
            CvSkillsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });

  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      component.updateTexts();

      const actualSkillsObs = component.skills;
      const actualJavaObs = component.java;
      const actualCsharpObs = component.csharp;
      const actualPythonDevObs = component.python;
      const actualJstsObs = component.jsts;
      const actualSqlObs = component.sql;
      const actualHtmlObs = component.html;
      const actualLatexObs = component.latex;

      actualSkillsObs.subscribe((s) => {
        expect(s).withContext('skills should be set').toBe(expectedSkills);
      });
      actualJavaObs.subscribe((s) => {
        expect(s).withContext('java should be set').toBe(expectedJava);
      });
      actualCsharpObs.subscribe((s) => {
        expect(s).withContext('csharp should be set').toBe(expectedCsharp);
      });
      actualPythonDevObs.subscribe((s) => {
        expect(s).withContext('python should be set').toBe(expectedPython);
      });
      actualJstsObs.subscribe((s) => {
        expect(s).withContext('jsts should be set').toBe(expectedJsts);
      });
      actualSqlObs.subscribe((s) => {
        expect(s).withContext('sql should be set').toBe(expectedSql);
      });
      actualHtmlObs.subscribe((s) => {
        expect(s).withContext('html should be set').toBe(expectedHtml);
      });
      actualLatexObs.subscribe((s) => {
        expect(s).withContext('latex should be set').toBe(expectedLatex);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(CvSkillsComponent);
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
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(CvSkillsComponent);
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
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            DatasourceService,
            PreloaderService,
            ParagraphDecoderService,
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(CvSkillsComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
