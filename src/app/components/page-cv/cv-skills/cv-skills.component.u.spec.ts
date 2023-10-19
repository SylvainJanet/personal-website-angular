import { TestBed } from '@angular/core/testing';
import { CvSkillsComponent } from './cv-skills.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { ElementRef } from '@angular/core';

describe('CvSkillsComponent - unit', () => {
  let component: CvSkillsComponent;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const skillsSelector = 'skills-title';
  const javaSelector = 'java-language';
  const csharpSelector = 'csharp-language';
  const pythonSelector = 'python-language';
  const jstsSelector = 'js-ts-language';
  const sqlSelector = 'sql-language';
  const htmlSelector = 'html-language';
  const latexSelector = 'latex-language';

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      component.skills.subscribe((s) =>
        expect(s).withContext('skills should be set').toBe('')
      );
      component.java.subscribe((s) =>
        expect(s).withContext('java should be set').toBe('')
      );
      component.csharp.subscribe((s) =>
        expect(s).withContext('csharp should be set').toBe('')
      );
      component.python.subscribe((s) =>
        expect(s).withContext('python should be set').toBe('')
      );
      component.jsts.subscribe((s) =>
        expect(s).withContext('jsts should be set').toBe('')
      );
      component.sql.subscribe((s) =>
        expect(s).withContext('sql should be set').toBe('')
      );
      component.html.subscribe((s) =>
        expect(s).withContext('html should be set').toBe('')
      );
      component.latex.subscribe((s) =>
        expect(s).withContext('latex should be set').toBe('')
      );
    };
    const shouldSubscribeToVisibleToLoadTextServiceExpectation =
      'should subscribe to the visibleToLoadTextService';
    const shouldSubscribeToVisibleToLoadTextService = (done: DoneFn) => {
      setTimeout(() => {
        expect(visibleToLoadTextServiceSpy.subscribe)
          .withContext('subscribe should have been called')
          .toHaveBeenCalledOnceWith(component);
        done();
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
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

    const shouldCallTextServiceExpectation = 'should call the textService';
    const shouldCallTextService = () => {
      component.updateTexts();
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
    };

    const shouldSetPropertiesToTheServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTheServiceResult = () => {
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
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

        textServiceSpy.getMulti.and.returnValues(
          of([skills, java, csharp, pythonDev, jsts, sql, html, latex])
        );

        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

        textServiceSpy.getMulti.and.returnValues(
          of([skills, java, csharp, pythonDev, jsts, sql, html, latex])
        );

        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

        textServiceSpy.getMulti.and.returnValues(
          of([skills, java, csharp, pythonDev, jsts, sql, html, latex])
        );

        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTheServiceResultExpectation,
        shouldSetPropertiesToTheServiceResult
      );
    });
  });

  describe('ngOnDestroy', () => {
    const shouldUnsubscribeExpectation =
      'should unsubscribe from the visibleToLoadTextService';
    const shouldUnsubscribe = () => {
      component.ngOnDestroy();
      expect(visibleToLoadTextServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(component);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldUnsubscribeExpectation, shouldUnsubscribe);
    });
  });

  describe('getElement', () => {
    const shouldReturnElementExpectation = 'should return the element';
    const shouldReturnElement = () => {
      const expected = new ElementRef(document.createElement('div'));
      component.mainDiv = expected;
      const actual = component.getElement();
      expect(actual).toEqual(jasmine.anything());
      expect(actual).toEqual(expected);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            CvSkillsComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(CvSkillsComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
  });
});
