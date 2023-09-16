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
import { TextParagraphSetComponent } from '../../common/text-paragraph-set/text-paragraph-set.component';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';

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
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  };

  const shouldHaveProperDomStructureExpectation =
    'should have proper dom structure';
  const shouldHaveProperDomStructure = () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('SECTION');

    const sectionEl = debugEl.children[0];
    expect(sectionEl.children.length).toBe(1);
    expect(sectionEl.children[0].nativeElement.tagName).toBe('DIV');

    const firstDivEl = sectionEl.children[0];
    expect(firstDivEl.children.length).toBe(1);
    expect(firstDivEl.children[0].nativeElement.tagName).toBe('DIV');

    const secondDivEl = firstDivEl.children[0];
    expect(secondDivEl.children.length).toBe(1);
    expect(secondDivEl.children[0].nativeElement.tagName).toBe('DIV');

    const thirdDivEl = secondDivEl.children[0];
    expect(thirdDivEl.children.length).toBe(1);
    expect(thirdDivEl.children[0].nativeElement.tagName).toBe('DIV');

    const rowEl = thirdDivEl.children[0];
    expect(rowEl.children.length).toBe(2);
    expect(rowEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(rowEl.children[1].nativeElement.tagName).toBe('DIV');

    // first col

    const firstColEl = rowEl.children[0];
    expect(firstColEl.children.length).toBe(1);
    expect(firstColEl.children[0].nativeElement.tagName).toBe('DIV');

    const firstColSecondEl = firstColEl.children[0];
    expect(firstColSecondEl.children.length).toBe(2);
    expect(firstColSecondEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(firstColSecondEl.children[1].nativeElement.tagName).toBe('DIV');

    // cv img and contact info row

    const imgAndContactInfoRowEl = firstColSecondEl.children[0];
    expect(imgAndContactInfoRowEl.children.length).toBe(2);
    expect(imgAndContactInfoRowEl.children[0].nativeElement.tagName).toBe(
      'DIV'
    );
    const cvImgParentDivEl = imgAndContactInfoRowEl.children[0];
    expect(cvImgParentDivEl.children.length).toBe(1);
    expect(cvImgParentDivEl.children[0].nativeElement.tagName).toBe(
      'APP-CV-IMG'
    );

    expect(imgAndContactInfoRowEl.children[1].nativeElement.tagName).toBe(
      'DIV'
    );
    const cvContactInfoParentDivEl = imgAndContactInfoRowEl.children[1];
    expect(cvContactInfoParentDivEl.children.length).toBe(1);
    expect(cvContactInfoParentDivEl.children[0].nativeElement.tagName).toBe(
      'APP-CV-CONTACT-INFO'
    );

    // skills row

    const skillsRowEl = firstColSecondEl.children[1];
    expect(skillsRowEl.children.length).toBe(1);
    expect(skillsRowEl.children[0].nativeElement.tagName).toBe('APP-CV-SKILLS');

    // second col

    const secondColEl = rowEl.children[1];
    expect(secondColEl.children.length).toBe(1);
    expect(secondColEl.children[0].nativeElement.tagName).toBe(
      'APP-CV-ABOUT-ME'
    );

    const aboutMeEl = secondColEl.children[0];
    expect(aboutMeEl.componentInstance as CvAboutMeComponent).toBeTruthy();
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
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
        declarations: [
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
        declarations: [
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
