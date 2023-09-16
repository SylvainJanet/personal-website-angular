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
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
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
      expect(cvSkillsComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(cvSkillsComponent).toBeTruthy();

      cvSkillsComponent.skills.subscribe((s) => expect(s).toBe(''));
      cvSkillsComponent.java.subscribe((s) => expect(s).toBe(''));
      cvSkillsComponent.csharp.subscribe((s) => expect(s).toBe(''));
      cvSkillsComponent.python.subscribe((s) => expect(s).toBe(''));
      cvSkillsComponent.jsts.subscribe((s) => expect(s).toBe(''));
      cvSkillsComponent.sql.subscribe((s) => expect(s).toBe(''));
      cvSkillsComponent.html.subscribe((s) => expect(s).toBe(''));
      cvSkillsComponent.latex.subscribe((s) => expect(s).toBe(''));
    });

    it('should subscribe to the languageService', () => {
      expect(languageServiceSpy.subscribe).toHaveBeenCalledOnceWith(
        cvSkillsComponent
      );
    });

    it('should update the texts', () => {
      expect(cvSkillsComponent.updateTexts).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTexts', () => {
    beforeEach(() => {
      cvSkillsComponent = TestBed.inject(CvSkillsComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get).toHaveBeenCalledTimes(8);
      expect(textServiceSpy.get).toHaveBeenCalledWith(skillsSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(javaSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(csharpSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(pythonSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(jstsSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(sqlSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(htmlSelector);
      expect(textServiceSpy.get).toHaveBeenCalledWith(latexSelector);

      cvSkillsComponent.updateTexts();

      expect(textServiceSpy.get).toHaveBeenCalledTimes(16);
    });
    it('should set the properties to the textService result', () => {
      const expectedSkillsObs = of('test skills');
      const expectedJavaObs = of('test java');
      const expectedCsharpObs = of('test csharp');
      const expectedPythonDevObs = of('test python');
      const expectedJstsObs = of('test jsts');
      const expectedSqlObs = of('test sql');
      const expectedHtmlObs = of('test html');
      const expectedLatexObs = of('test latex');
      textServiceSpy.get.and.returnValues(
        expectedSkillsObs,
        expectedJavaObs,
        expectedCsharpObs,
        expectedPythonDevObs,
        expectedJstsObs,
        expectedSqlObs,
        expectedHtmlObs,
        expectedLatexObs
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

      expect(actualSkillsObs).toBe(expectedSkillsObs);
      expect(actualJavaObs).toBe(expectedJavaObs);
      expect(actualCsharpObs).toBe(expectedCsharpObs);
      expect(actualPythonDevObs).toBe(expectedPythonDevObs);
      expect(actualJstsObs).toBe(expectedJstsObs);
      expect(actualSqlObs).toBe(expectedSqlObs);
      expect(actualHtmlObs).toBe(expectedHtmlObs);
      expect(actualLatexObs).toBe(expectedLatexObs);
    });
  });
});
