import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CvSkillsComponent } from './cv-skills.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { BehaviorSubject, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { CvSkillBarComponent } from '../cv-skill-bar/cv-skill-bar.component';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';

describe('CvSkillsComponent - dom unit', () => {
  let fixture: ComponentFixture<CvSkillsComponent>;
  let componentInstance: CvSkillsComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  const expectedSkills = 'test skills';
  const expectedJava = 'test java';
  const expectedCsharp = 'test csharp';
  const expectedPython = 'test python';
  const expectedJsts = 'test jsts';
  const expectedSql = 'test sql';
  const expectedHtml = 'test html';
  const expectedLatex = 'test latex';

  beforeEach(waitForAsync(() => {
    preloaderServiceSpy = jasmine.createSpyObj(
      'PreloaderService',
      [],
      ['statusAnyLoading']
    );
    (
      Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
        ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
    ).and.returnValue(new BehaviorSubject<boolean | null>(null));
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);

    const skillsObs = of(expectedSkills);
    const javaObs = of(expectedJava);
    const csharpObs = of(expectedCsharp);
    const pythonDevObs = of(expectedPython);
    const jstsObs = of(expectedJsts);
    const sqlObs = of(expectedSql);
    const htmlObs = of(expectedHtml);
    const latexObs = of(expectedLatex);
    textServiceSpy.get.and.returnValues(
      skillsObs,
      javaObs,
      csharpObs,
      pythonDevObs,
      jstsObs,
      sqlObs,
      htmlObs,
      latexObs
    );
    TestBed.configureTestingModule({
      declarations: [CvSkillsComponent, CvSkillBarComponent],
      providers: [
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
        { provide: PreloaderService, useValue: preloaderServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvSkillsComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(componentInstance).toBeTruthy();
    });
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children.length).toBe(8);
    expect(firstDivEl.children[0].nativeElement.tagName).toBe('STRONG');
    expect(firstDivEl.children[1].nativeElement.tagName).toBe(
      'APP-CV-SKILL-BAR'
    );
    expect(firstDivEl.children[2].nativeElement.tagName).toBe(
      'APP-CV-SKILL-BAR'
    );
    expect(firstDivEl.children[3].nativeElement.tagName).toBe(
      'APP-CV-SKILL-BAR'
    );
    expect(firstDivEl.children[4].nativeElement.tagName).toBe(
      'APP-CV-SKILL-BAR'
    );
    expect(firstDivEl.children[5].nativeElement.tagName).toBe(
      'APP-CV-SKILL-BAR'
    );
    expect(firstDivEl.children[6].nativeElement.tagName).toBe(
      'APP-CV-SKILL-BAR'
    );
    expect(firstDivEl.children[7].nativeElement.tagName).toBe(
      'APP-CV-SKILL-BAR'
    );
  });

  it('should have content set by textService', async () => {
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
  });
});
