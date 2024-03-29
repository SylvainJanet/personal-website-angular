import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CvSkillsComponent } from './cv-skills.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { CvSkillBarComponent } from '../cv-skill-bar/cv-skill-bar.component';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';

describe('CvSkillsComponent - dom unit', () => {
  let fixture: ComponentFixture<CvSkillsComponent>;
  let componentInstance: CvSkillsComponent;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
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
      ['isLoading'],
      []
    );
    visibleToLoadTextServiceSpy = jasmine.createSpyObj(
      'VisibleToLoadTextServiceSpy',
      ['hasTextLoaded', 'subscribe', 'unsubscribe', 'textLoaded'],
      []
    );
    textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);

    const expectedMessages = of([
      expectedSkills,
      expectedJava,
      expectedCsharp,
      expectedPython,
      expectedJsts,
      expectedSql,
      expectedHtml,
      expectedLatex,
    ]);
    textServiceSpy.getMulti.and.returnValue(expectedMessages);
    TestBed.configureTestingModule({
      imports: [CvSkillsComponent, CvSkillBarComponent],
      providers: [
        { provide: TextService, useValue: textServiceSpy },
        { provide: PreloaderService, useValue: preloaderServiceSpy },
        {
          provide: VisibleToLoadTextService,
          useValue: visibleToLoadTextServiceSpy,
        },
      ],
    }).compileComponents();
  }));

  describe('constructor', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(CvSkillsComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(componentInstance)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });
  });

  describe('DOM', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(CvSkillsComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have proper dom structure', () => {
      // loaded
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).withContext('1 child at root').toBe(1);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is DIV')
        .toBe('DIV');

      const firstDivEl: DebugElement = debugEl.children[0];

      expect(firstDivEl.children.length)
        .withContext('div should have 8 children')
        .toBe(8);
      expect(firstDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of div should be STRONG')
        .toBe('STRONG');
      expect(firstDivEl.children[1].nativeElement.tagName)
        .withContext('child 2 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[2].nativeElement.tagName)
        .withContext('child 3 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[3].nativeElement.tagName)
        .withContext('child 4 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[4].nativeElement.tagName)
        .withContext('child 5 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[5].nativeElement.tagName)
        .withContext('child 6 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[6].nativeElement.tagName)
        .withContext('child 7 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[7].nativeElement.tagName)
        .withContext('child 8 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');

      //loading
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(false);
      preloaderServiceSpy.isLoading.and.returnValue(true);
      fixture.detectChanges();

      expect(debugEl.children.length).withContext('1 child at root').toBe(1);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is DIV')
        .toBe('DIV');

      expect(firstDivEl.children.length)
        .withContext('div should have 16 children')
        .toBe(16);
      expect(firstDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of div should be MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');
      expect(firstDivEl.children[1].nativeElement.tagName)
        .withContext('child 2 of div should be STRONG')
        .toBe('STRONG');
      expect(firstDivEl.children[1].nativeElement.classList.contains('hide'))
        .withContext('child 2 of div should have css class HIDE')
        .toBeTrue();
      expect(firstDivEl.children[2].nativeElement.tagName)
        .withContext('child 3 of div should be MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');
      expect(firstDivEl.children[3].nativeElement.tagName)
        .withContext('child 4 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[3].nativeElement.classList.contains('hide'))
        .withContext('child 4 of div should have css class HIDE')
        .toBeTrue();
      expect(firstDivEl.children[4].nativeElement.tagName)
        .withContext('child 5 of div should be MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');
      expect(firstDivEl.children[5].nativeElement.tagName)
        .withContext('child 6 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[5].nativeElement.classList.contains('hide'))
        .withContext('child 6 of div should have css class HIDE')
        .toBeTrue();
      expect(firstDivEl.children[6].nativeElement.tagName)
        .withContext('child 7 of div should be MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');
      expect(firstDivEl.children[7].nativeElement.tagName)
        .withContext('child 8 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[7].nativeElement.classList.contains('hide'))
        .withContext('child 8 of div should have css class HIDE')
        .toBeTrue();
      expect(firstDivEl.children[8].nativeElement.tagName)
        .withContext('child 9 of div should be MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');
      expect(firstDivEl.children[9].nativeElement.tagName)
        .withContext('child 10 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[9].nativeElement.classList.contains('hide'))
        .withContext('child 10 of div should have css class HIDE')
        .toBeTrue();
      expect(firstDivEl.children[10].nativeElement.tagName)
        .withContext('child 11 of div should be MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');
      expect(firstDivEl.children[11].nativeElement.tagName)
        .withContext('child 12 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[11].nativeElement.classList.contains('hide'))
        .withContext('child 12 of div should have css class HIDE')
        .toBeTrue();
      expect(firstDivEl.children[12].nativeElement.tagName)
        .withContext('child 13 of div should be MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');
      expect(firstDivEl.children[13].nativeElement.tagName)
        .withContext('child 14 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[13].nativeElement.classList.contains('hide'))
        .withContext('child 14 of div should have css class HIDE')
        .toBeTrue();
      expect(firstDivEl.children[14].nativeElement.tagName)
        .withContext('child 15 of div should be MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');
      expect(firstDivEl.children[15].nativeElement.tagName)
        .withContext('child 16 of div should be APP-CV-SKILL-BAR')
        .toBe('APP-CV-SKILL-BAR');
      expect(firstDivEl.children[15].nativeElement.classList.contains('hide'))
        .withContext('child 16 of div should have css class HIDE')
        .toBeTrue();
    });

    it('should have content set by textService', async () => {
      componentInstance.updateTexts();
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
          .withContext('skill name should be set - 1')
          .toBe(expectedJava);
      });
      let actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent should be set - 1')
        .toBe(90);

      childEl = firstDivEl.children[2];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name should be set - 2')
          .toBe(expectedCsharp);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent should be set - 2')
        .toBe(90);

      childEl = firstDivEl.children[3];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name should be set - 3')
          .toBe(expectedPython);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent should be set - 3')
        .toBe(85);

      childEl = firstDivEl.children[4];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name should be set - 4')
          .toBe(expectedJsts);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent should be set - 4')
        .toBe(85);

      childEl = firstDivEl.children[5];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s).withContext('skill name should be set - 5').toBe(expectedSql);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent should be set - 5')
        .toBe(80);

      childEl = firstDivEl.children[6];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name should be set - 6')
          .toBe(expectedHtml);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent should be set - 6')
        .toBe(75);

      childEl = firstDivEl.children[7];
      actualSkillName = (childEl.componentInstance as CvSkillBarComponent)
        .skillName;
      actualSkillName.subscribe((s) => {
        expect(s)
          .withContext('skill name should be set - 7')
          .toBe(expectedLatex);
      });
      actualPercent = (childEl.componentInstance as CvSkillBarComponent)
        .percent;
      expect(actualPercent)
        .withContext('skill percent should be set - 7')
        .toBe(65);
    });
  });
});
