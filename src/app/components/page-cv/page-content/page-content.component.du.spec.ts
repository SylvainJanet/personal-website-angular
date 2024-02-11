import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageContentComponent } from './page-content.component';
import { DebugElement } from '@angular/core';
import { CvImgComponent } from '../cv-img/cv-img.component';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { ParagraphDecoderService } from 'src/app/services/paragraphdecoder/paragraph-decoder.service';
import { of } from 'rxjs';
import { CvContactInfoComponent } from '../cv-contact-info/cv-contact-info.component';
import { CvSkillsComponent } from '../cv-skills/cv-skills.component';
import { CvSkillBarComponent } from '../cv-skill-bar/cv-skill-bar.component';
import { CvAboutMeComponent } from '../cv-about-me/cv-about-me.component';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { TextParagraphSetComponent } from '../../utilities/text-paragraph-set/text-paragraph-set.component';

describe('PageContentComponent - dom unit', () => {
  let fixture: ComponentFixture<PageContentComponent>;
  let componentInstance: PageContentComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(of({}));
  });

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  };

  const shouldHaveProperDomStructureExpectation =
    'should have proper dom structure';
  const shouldHaveProperDomStructure = () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).withContext('1 child at root').toBe(1);
    expect(debugEl.children[0].nativeElement.tagName)
      .withContext('child 1 at root is SECTION')
      .toBe('SECTION');

    const sectionEl = debugEl.children[0];
    expect(sectionEl.children.length)
      .withContext('section should have 1 child')
      .toBe(1);
    expect(sectionEl.children[0].nativeElement.tagName)
      .withContext('child 1 of section should be DIV')
      .toBe('DIV');

    const firstDivEl = sectionEl.children[0];
    expect(firstDivEl.children.length)
      .withContext('section - div should have 1 child')
      .toBe(1);
    expect(firstDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of section - div should be DIV')
      .toBe('DIV');

    const secondDivEl = firstDivEl.children[0];
    expect(secondDivEl.children.length)
      .withContext('section - div - div should have 2 children')
      .toBe(2);
    expect(secondDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of section - div - div should be DIV')
      .toBe('DIV');

    const thirdDivEl = secondDivEl.children[0];
    // Code to uncomment when only 1 about me is present (9 are temporary to test the loading texts in staging)
    // expect(thirdDivEl.children.length)
    //   .withContext('section - div - div - div should have 1 child')
    //   .toBe(1);
    expect(thirdDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of section - div - div - div should be DIV')
      .toBe('DIV');

    const rowEl = thirdDivEl.children[0];
    expect(rowEl.children.length)
      .withContext('row should have 2 children')
      .toBe(2);
    expect(rowEl.children[0].nativeElement.tagName)
      .withContext('child 1 of row should be DIV')
      .toBe('DIV');
    expect(rowEl.children[1].nativeElement.tagName)
      .withContext('child 2 of row should be DIV')
      .toBe('DIV');

    // first col

    const firstColEl = rowEl.children[0];
    expect(firstColEl.children.length)
      .withContext('first col should have 1 child')
      .toBe(1);
    expect(firstColEl.children[0].nativeElement.tagName)
      .withContext('child 1 of first col should be DIV')
      .toBe('DIV');

    const firstColSecondEl = firstColEl.children[0];
    expect(firstColSecondEl.children.length)
      .withContext('child 1 of first col should have 2 children')
      .toBe(2);
    expect(firstColSecondEl.children[0].nativeElement.tagName)
      .withContext('child 1 of child 1 of first col should be DIV')
      .toBe('DIV');
    expect(firstColSecondEl.children[1].nativeElement.tagName)
      .withContext('child 2 of child 1 of first col should be DIV')
      .toBe('DIV');

    // cv img and contact info row

    const imgAndContactInfoRowEl = firstColSecondEl.children[0];
    expect(imgAndContactInfoRowEl.children.length)
      .withContext('img and contact info should have 2 children')
      .toBe(2);
    expect(imgAndContactInfoRowEl.children[0].nativeElement.tagName)
      .withContext('child 1 of img and contact info should be DIV')
      .toBe('DIV');
    const cvImgParentDivEl = imgAndContactInfoRowEl.children[0];
    expect(cvImgParentDivEl.children.length)
      .withContext('child 1 of img and contact info should have 1 child')
      .toBe(1);
    expect(cvImgParentDivEl.children[0].nativeElement.tagName)
      .withContext(
        'child 1 of child 1 of img and contact info should be APP-CV-IMG'
      )
      .toBe('APP-CV-IMG');

    expect(imgAndContactInfoRowEl.children[1].nativeElement.tagName)
      .withContext('child 2 of img and contact info should be DIV')
      .toBe('DIV');
    const cvContactInfoParentDivEl = imgAndContactInfoRowEl.children[1];
    expect(cvContactInfoParentDivEl.children.length)
      .withContext('child 2 of img and contact info should have 1 child')
      .toBe(1);
    expect(cvContactInfoParentDivEl.children[0].nativeElement.tagName)
      .withContext(
        'child 1 of child 2 of img and contact info should be APP-CV-CONTACT-INFO'
      )
      .toBe('APP-CV-CONTACT-INFO');

    // skills row

    const skillsRowEl = firstColSecondEl.children[1];
    expect(skillsRowEl.children.length)
      .withContext('skills row should have 1 child')
      .toBe(1);
    expect(skillsRowEl.children[0].nativeElement.tagName)
      .withContext('child 1 of skills row should have be APP-CV-SKILLS')
      .toBe('APP-CV-SKILLS');

    // second col

    const secondColEl = rowEl.children[1];
    expect(secondColEl.children.length)
      .withContext('second col should have 1 child')
      .toBe(1);
    expect(secondColEl.children[0].nativeElement.tagName)
      .withContext('child 1 of second col should be APP-CV-ABOUT-ME')
      .toBe('APP-CV-ABOUT-ME');

    const aboutMeEl = secondColEl.children[0];
    expect(aboutMeEl.componentInstance as CvAboutMeComponent)
      .withContext('CvAboutMeComponent should create')
      .toEqual(jasmine.anything());

    // testimonials

    expect(secondDivEl.children[1].nativeElement.tagName)
      .withContext(
        'child 2 of section - div - div should be APP-CV-TESTIMONIALS'
      )
      .toBe('APP-CV-TESTIMONIALS');
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          PageContentComponent,
          CvImgComponent,
          CvContactInfoComponent,
          CvSkillsComponent,
          CvSkillBarComponent,
          CvAboutMeComponent,
          TextParagraphSetComponent,
          ImgLoadDirective,
        ],
        providers: [
          LanguageService,
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          PreloaderService,
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(PageContentComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
  });
  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          PageContentComponent,
          CvImgComponent,
          CvContactInfoComponent,
          CvSkillsComponent,
          CvSkillBarComponent,
          CvAboutMeComponent,
          TextParagraphSetComponent,
          ImgLoadDirective,
        ],
        providers: [
          LanguageService,
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          PreloaderService,
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(PageContentComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
  });
  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          PageContentComponent,
          CvImgComponent,
          CvContactInfoComponent,
          CvSkillsComponent,
          CvSkillBarComponent,
          CvAboutMeComponent,
          TextParagraphSetComponent,
          ImgLoadDirective,
        ],
        providers: [
          LanguageService,
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          PreloaderService,
          ParagraphDecoderService,
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(PageContentComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
  });
});
