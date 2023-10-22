import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
    httpClientSpy.get.and.returnValue(expectedMessagesDto);
  });

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  };

  const shouldHaveContentSetByServiceExpectation =
    'should have content set by textService';
  const shouldHaveContentSetByService = (done: DoneFn) => {
    componentInstance.updateTexts();

    setTimeout(() => {
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      const firstDivEl: DebugElement = debugEl.children[0];

      let childEl: DebugElement = firstDivEl.children[0];
      const actualSkills = childEl.nativeElement.innerHTML;
      expect(actualSkills)
        .withContext('skills should be set')
        .toBe(expectedSkills);

      childEl = firstDivEl.children[1];
      let actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name java should be set')
          .toBe(expectedJava);
      });
      let actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent java should be set')
        .toBe(90);

      childEl = firstDivEl.children[2];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name csharp should be set')
          .toBe(expectedCsharp);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent csharp should be set')
        .toBe(90);

      childEl = firstDivEl.children[3];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name python should be set')
          .toBe(expectedPython);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent python should be set')
        .toBe(85);

      childEl = firstDivEl.children[4];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name jsts should be set')
          .toBe(expectedJsts);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent jsts should be set')
        .toBe(85);

      childEl = firstDivEl.children[5];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s).withContext('skill name sql should be set').toBe(expectedSql);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent sql should be set')
        .toBe(80);

      childEl = firstDivEl.children[6];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name html should be set')
          .toBe(expectedHtml);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent html should be set')
        .toBe(75);

      childEl = firstDivEl.children[7];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name latex should be set')
          .toBe(expectedLatex);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent latex should be set')
        .toBe(65);
      done();
    }, 2);
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvSkillsComponent, CvSkillBarComponent],
        providers: [
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
        imports: [CvSkillsComponent, CvSkillBarComponent],
        providers: [
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
        imports: [CvSkillsComponent, CvSkillBarComponent],
        providers: [
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
