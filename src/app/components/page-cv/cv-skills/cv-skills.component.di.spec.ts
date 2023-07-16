import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatasourceService } from 'src/app/services/db/datasource/datasource.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { ParagraphDecoderService } from 'src/app/services/paragraphdecoder/paragraph-decoder.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { CvSkillsComponent } from './cv-skills.component';
import { CvSkillBarComponent } from '../cv-skill-bar/cv-skill-bar.component';

describe('CvSkillsComponent - dom integration', () => {
  let fixture: ComponentFixture<CvSkillsComponent>;
  let componentInstance: CvSkillsComponent;
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

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  };

  const shouldHaveContentSetByServiceExpectation =
    'should have content set by textService';
  const shouldHaveContentSetByService = () => {
    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    let childEl: DebugElement = firstDivEl.children[0];
    const actualSkills = childEl.nativeElement.innerHTML;
    expect(actualSkills).toBe(expectedSkills);

    childEl = firstDivEl.children[1];
    let actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
      .skillName;
    actualSkillName.subscribe((s) => {
      expect(s).toBe(expectedJava);
    });
    let actualPercent = (childEl.componentInstance as CvSkillBarComponent)
      .percent;
    expect(actualPercent).toBe(90);

    childEl = firstDivEl.children[2];
    actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
      .skillName;
    actualSkillName.subscribe((s) => {
      expect(s).toBe(expectedCsharp);
    });
    actualPercent = (childEl.componentInstance as CvSkillBarComponent).percent;
    expect(actualPercent).toBe(90);

    childEl = firstDivEl.children[3];
    actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
      .skillName;
    actualSkillName.subscribe((s) => {
      expect(s).toBe(expectedPython);
    });
    actualPercent = (childEl.componentInstance as CvSkillBarComponent).percent;
    expect(actualPercent).toBe(85);

    childEl = firstDivEl.children[4];
    actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
      .skillName;
    actualSkillName.subscribe((s) => {
      expect(s).toBe(expectedJsts);
    });
    actualPercent = (childEl.componentInstance as CvSkillBarComponent).percent;
    expect(actualPercent).toBe(85);

    childEl = firstDivEl.children[5];
    actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
      .skillName;
    actualSkillName.subscribe((s) => {
      expect(s).toBe(expectedSql);
    });
    actualPercent = (childEl.componentInstance as CvSkillBarComponent).percent;
    expect(actualPercent).toBe(80);

    childEl = firstDivEl.children[6];
    actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
      .skillName;
    actualSkillName.subscribe((s) => {
      expect(s).toBe(expectedHtml);
    });
    actualPercent = (childEl.componentInstance as CvSkillBarComponent).percent;
    expect(actualPercent).toBe(75);

    childEl = firstDivEl.children[7];
    actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
      .skillName;
    actualSkillName.subscribe((s) => {
      expect(s).toBe(expectedLatex);
    });
    actualPercent = (childEl.componentInstance as CvSkillBarComponent).percent;
    expect(actualPercent).toBe(65);
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CvSkillsComponent, CvSkillBarComponent],
        providers: [
          LanguageService,
          TextService,
          PreloaderService,
          DatasourceService,
          ParagraphDecoderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvSkillsComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CvSkillsComponent, CvSkillBarComponent],
        providers: [
          LanguageService,
          TextService,
          PreloaderService,
          DatasourceService,
          ParagraphDecoderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvSkillsComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CvSkillsComponent, CvSkillBarComponent],
        providers: [
          LanguageService,
          TextService,
          PreloaderService,
          DatasourceService,
          ParagraphDecoderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvSkillsComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });
});
