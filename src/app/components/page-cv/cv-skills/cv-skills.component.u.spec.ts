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
    beforeEach(() => {
      cvSkillsComponent = TestBed.inject(CvSkillsComponent);
    });
    it('should call the textService', () => {
      expect(textServiceSpy.get)
        .withContext('get should have been called 8 times')
        .toHaveBeenCalledTimes(8);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(skillsSelector);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(javaSelector);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 3'
        )
        .toHaveBeenCalledWith(csharpSelector);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 4'
        )
        .toHaveBeenCalledWith(pythonSelector);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 5'
        )
        .toHaveBeenCalledWith(jstsSelector);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 6'
        )
        .toHaveBeenCalledWith(sqlSelector);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 7'
        )
        .toHaveBeenCalledWith(htmlSelector);
      expect(textServiceSpy.get)
        .withContext(
          'get should have been called with the proper arguments - 8'
        )
        .toHaveBeenCalledWith(latexSelector);

      cvSkillsComponent.updateTexts();

      expect(textServiceSpy.get)
        .withContext('get should have been called 16 times')
        .toHaveBeenCalledTimes(16);
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

      expect(actualSkillsObs)
        .withContext('skills obs should be set')
        .toBe(expectedSkillsObs);
      expect(actualJavaObs)
        .withContext('java obs should be set')
        .toBe(expectedJavaObs);
      expect(actualCsharpObs)
        .withContext('csharp obs should be set')
        .toBe(expectedCsharpObs);
      expect(actualPythonDevObs)
        .withContext('python obs should be set')
        .toBe(expectedPythonDevObs);
      expect(actualJstsObs)
        .withContext('jsts obs should be set')
        .toBe(expectedJstsObs);
      expect(actualSqlObs)
        .withContext('sql obs should be set')
        .toBe(expectedSqlObs);
      expect(actualHtmlObs)
        .withContext('html obs should be set')
        .toBe(expectedHtmlObs);
      expect(actualLatexObs)
        .withContext('latex obs should be set')
        .toBe(expectedLatexObs);
    });
  });
});
