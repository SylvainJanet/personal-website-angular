import { TestBed } from '@angular/core/testing';
import { CvSkillsComponent } from './cv-skills.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';

describe('CvSkillsComponent - unit', () => {
  let cvSkillsComponent: CvSkillsComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  const skillsSelector = 'skills-title';
  const javaSelector = 'java-language';
  const csharpSelector = 'csharp-language';
  const pythonSelector = 'python-language';
  const jstsSelector = 'js-ts-language';
  const sqlSelector = 'sql-language';
  const htmlSelector = 'html-language';
  const latexSelector = 'latex-language';

  beforeEach(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
    TestBed.configureTestingModule({
      providers: [
        CvSkillsComponent,
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      spyOn(CvSkillsComponent.prototype, 'updateTexts');
      cvSkillsComponent = TestBed.inject(CvSkillsComponent);
    });
    it('should create', () => {
      expect(cvSkillsComponent)
        .withContext('component should create')
        .toBeTruthy();
    });

    it('should set default values', () => {
      expect(cvSkillsComponent)
        .withContext('component should create')
        .toBeTruthy();

      cvSkillsComponent.skills.subscribe((s) =>
        expect(s).withContext('skills should be set').toBe('')
      );
      cvSkillsComponent.java.subscribe((s) =>
        expect(s).withContext('java should be set').toBe('')
      );
      cvSkillsComponent.csharp.subscribe((s) =>
        expect(s).withContext('csharp should be set').toBe('')
      );
      cvSkillsComponent.python.subscribe((s) =>
        expect(s).withContext('python should be set').toBe('')
      );
      cvSkillsComponent.jsts.subscribe((s) =>
        expect(s).withContext('jsts should be set').toBe('')
      );
      cvSkillsComponent.sql.subscribe((s) =>
        expect(s).withContext('sql should be set').toBe('')
      );
      cvSkillsComponent.html.subscribe((s) =>
        expect(s).withContext('html should be set').toBe('')
      );
      cvSkillsComponent.latex.subscribe((s) =>
        expect(s).withContext('latex should be set').toBe('')
      );
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe)
        .withContext('subscribe should have been called')
        .toHaveBeenCalledOnceWith(cvSkillsComponent);
    });

    it('should update the texts', () => {
      expect(cvSkillsComponent.updateTexts)
        .withContext('updateTexts should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    const skills = 'test skills';
    const java = 'test java';
    const csharp = 'test csharp';
    const pythonDev = 'test python';
    const jsts = 'test jsts';
    const sql = 'test sql';
    const html = 'test html';
    const latex = 'test latex';

    beforeEach(() => {
      textServiceSpy.getMulti.and.returnValues(
        of([skills, java, csharp, pythonDev, jsts, sql, html, latex])
      );
      cvSkillsComponent = TestBed.inject(CvSkillsComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.getMulti)
        .withContext(
          'getMulti should have been called 1 time with proper arguments'
        )
        .toHaveBeenCalledOnceWith([
          skillsSelector,
          javaSelector,
          csharpSelector,
          pythonSelector,
          jstsSelector,
          sqlSelector,
          htmlSelector,
          latexSelector,
        ]);
    });
    it('should set the properties to the textService result', () => {
      const expectedSkills = 'other test skills';
      const expectedJava = 'other test java';
      const expectedCsharp = 'other test csharp';
      const expectedPythonDev = 'other test python';
      const expectedJsts = 'other test jsts';
      const expectedSql = 'other test sql';
      const expectedHtml = 'other test html';
      const expectedLatex = 'other test latex';

      textServiceSpy.getMulti.and.returnValues(
        of([
          expectedSkills,
          expectedJava,
          expectedCsharp,
          expectedPythonDev,
          expectedJsts,
          expectedSql,
          expectedHtml,
          expectedLatex,
        ])
      );
      cvSkillsComponent.updateTexts();

      const actualSkillsObs = cvSkillsComponent.skills;
      const actualJavaObs = cvSkillsComponent.java;
      const actualCsharpObs = cvSkillsComponent.csharp;
      const actualPythonDevObs = cvSkillsComponent.python;
      const actualJstsObs = cvSkillsComponent.jsts;
      const actualSqlObs = cvSkillsComponent.sql;
      const actualHtmlObs = cvSkillsComponent.html;
      const actualLatexObs = cvSkillsComponent.latex;

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
        expect(s).withContext('python should be set').toBe(expectedPythonDev);
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
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      spyOn(CvSkillsComponent.prototype, 'updateTexts');
      cvSkillsComponent = TestBed.inject(CvSkillsComponent);
    });
    it('should unsubscribe from the languageService', () => {
      cvSkillsComponent.ngOnDestroy();
      expect(languageServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(cvSkillsComponent);
    });
  });
});
