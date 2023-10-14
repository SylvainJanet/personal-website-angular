import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ImageService } from 'src/app/services/image/image.service';
import { DebugElement } from '@angular/core';
import { FooterComponent } from './footer.component';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';

const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('FooterComponent - dom unit', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let componentInstance: FooterComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const retrievedFooterText = 'test footer text';
  const expectedFooterText = retrievedFooterText + ' - ';
  const expectedFooterLink = 'test footer link';
  const expectedFooterHref = 'https://www.' + expectedFooterLink;

  beforeEach(waitForAsync(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    imageServiceSpy = jasmine.createSpyObj('ImageService', [
      'imageLoading',
      'imageLoadedOrError',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
    textServiceSpy.getMulti.and.returnValues(
      of([retrievedFooterText, expectedFooterLink])
    );
  }));

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance)
      .withContext('component should create')
      .toBeTruthy();
  };

  const shouldHaveProperDomStructureExpectation =
    'should have proper dom structure';
  const shouldHaveProperDomStructure = () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).withContext('2 children at root').toBe(2);
    expect(debugEl.children[0].nativeElement.tagName)
      .withContext('child 1 at root is DIV')
      .toBe('DIV');
    expect(debugEl.children[1].nativeElement.tagName)
      .withContext('child 2 at root is SECTION')
      .toBe('SECTION');

    // img
    const imgDivEl = debugEl.children[0];
    expect(imgDivEl.children.length)
      .withContext('child 1 at root should have 1 child')
      .toBe(1);
    expect(imgDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of child 1 at root should be IMG')
      .toBe('IMG');

    // section
    const sectionEl = debugEl.children[1];
    expect(sectionEl.children.length)
      .withContext('SECTION at root should have 1 child')
      .toBe(1);
    expect(sectionEl.children[0].nativeElement.tagName)
      .withContext('child 1 of SECTION at root should be DIV')
      .toBe('DIV');

    const sectionDivEl = sectionEl.children[0];
    expect(sectionDivEl.children.length)
      .withContext('SECTION-DIV should have 1 child')
      .toBe(1);
    expect(sectionDivEl.children[0].nativeElement.tagName)
      .withContext('child 1 of SECTION-DIV should be FOOTER')
      .toBe('FOOTER');

    const sectionFooterEl = sectionDivEl.children[0];
    expect(sectionFooterEl.children.length)
      .withContext('footer should have 2 children')
      .toBe(2);
    expect(sectionFooterEl.children[0].nativeElement.tagName)
      .withContext('child 1 of footer should be P')
      .toBe('P');
    expect(sectionFooterEl.children[1].nativeElement.tagName)
      .withContext('child 2 of footer should be P')
      .toBe('P');

    const sectionPEl = sectionFooterEl.children[0];
    expect(sectionPEl.children.length)
      .withContext('child 1 of footer should have 2 children')
      .toBe(2);
    expect(sectionPEl.children[0].nativeElement.tagName)
      .withContext('child 1 of child 1 of footer should be SPAN')
      .toBe('SPAN');
    expect(sectionPEl.children[1].nativeElement.tagName)
      .withContext('child 2 of child 1 of footer should be A')
      .toBe('A');

    const sectionP2El = sectionFooterEl.children[1];
    expect(sectionP2El.children.length)
      .withContext('child 2 of footer should have no children')
      .toBe(0);
  };

  const shouldSetFooterTextExpectation = 'should set footer text';
  const shouldSetFooterText = () => {
    const debugEl: DebugElement = fixture.debugElement;

    // section
    const sectionEl = debugEl.children[1];
    const sectionDivEl = sectionEl.children[0];
    const sectionFooterEl = sectionDivEl.children[0];
    const sectionPEl = sectionFooterEl.children[0];
    const spanEl = sectionPEl.children[0];

    const actual = spanEl.nativeElement.innerHTML;
    expect(actual)
      .withContext('footer text should be set')
      .toBe(expectedFooterText);
  };

  const shouldSetFooterLinkExpectation = 'should set footer link';
  const shouldSetFooterLink = () => {
    const debugEl: DebugElement = fixture.debugElement;

    // section
    const sectionEl = debugEl.children[1];
    const sectionDivEl = sectionEl.children[0];
    const sectionFooterEl = sectionDivEl.children[0];
    const sectionPEl = sectionFooterEl.children[0];
    const aEl = sectionPEl.children[1];

    const actualText = aEl.nativeElement.innerHTML;
    expect(actualText)
      .withContext('footer link should be set')
      .toBe(expectedFooterLink);
    const actualHref = aEl.attributes['href'];
    expect(actualHref)
      .withContext('footer href should be set')
      .toBe(expectedFooterHref);
  };

  const shouldNotHidImgAtFirstExpectation = 'should not hide img at first';
  const shouldNotHidImgAtFirst = () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];

    const actual = firstDivEl.styles['display'];
    expect(actual).withContext("display should be 'block'").toBe('block');
  };

  const shouldCallOnDoubleImgLoadWhenImgLoadedExpectation =
    'should call onDoubleImgLoad when img is loaded';
  const shouldCallOnDoubleImgLoadWhenImgLoaded = () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const imgEl = firstDivEl.children[0];

    spyOn(componentInstance, 'onDoubleImgLoad');
    imgEl.triggerEventHandler('load');

    expect(componentInstance.onDoubleImgLoad)
      .withContext('onDoubleImgLoad should have been called')
      .toHaveBeenCalled();
  };

  const shouldHideImgOnceLoadedExpectation = 'should hide img once loaded';
  const shouldHideImgOnceLoaded = () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];

    const imgEl = firstDivEl.children[0];
    imgEl.triggerEventHandler('load');
    fixture.detectChanges();

    const actual = firstDivEl.styles['display'];
    expect(actual).withContext("display should be 'none'").toBe('none');
  };

  describe('in dev environment', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FooterComponent, ImgLoadDirective],
        providers: [
          { provide: LanguageService, useValue: languageServiceSpy },
          { provide: ImageService, useValue: imageServiceSpy },
          { provide: TextService, useValue: textServiceSpy },
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(FooterComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
    it(shouldSetFooterTextExpectation, shouldSetFooterText);
    it(shouldSetFooterLinkExpectation, shouldSetFooterLink);
    it(shouldNotHidImgAtFirstExpectation, shouldNotHidImgAtFirst);
    it(
      shouldCallOnDoubleImgLoadWhenImgLoadedExpectation,
      shouldCallOnDoubleImgLoadWhenImgLoaded
    );
    it(shouldHideImgOnceLoadedExpectation, shouldHideImgOnceLoaded);
  });
  describe('in staging environment', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FooterComponent, ImgLoadDirective],
        providers: [
          { provide: LanguageService, useValue: languageServiceSpy },
          { provide: ImageService, useValue: imageServiceSpy },
          { provide: TextService, useValue: textServiceSpy },
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(FooterComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
    it(shouldSetFooterTextExpectation, shouldSetFooterText);
    it(shouldSetFooterLinkExpectation, shouldSetFooterLink);
    it(shouldNotHidImgAtFirstExpectation, shouldNotHidImgAtFirst);
    it(
      shouldCallOnDoubleImgLoadWhenImgLoadedExpectation,
      shouldCallOnDoubleImgLoadWhenImgLoaded
    );
    it(shouldHideImgOnceLoadedExpectation, shouldHideImgOnceLoaded);
  });
  describe('in prod environment', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FooterComponent, ImgLoadDirective],
        providers: [
          { provide: LanguageService, useValue: languageServiceSpy },
          { provide: ImageService, useValue: imageServiceSpy },
          { provide: TextService, useValue: textServiceSpy },
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(FooterComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
    it(shouldSetFooterTextExpectation, shouldSetFooterText);
    it(shouldSetFooterLinkExpectation, shouldSetFooterLink);
    it(shouldNotHidImgAtFirstExpectation, shouldNotHidImgAtFirst);
    it(
      shouldCallOnDoubleImgLoadWhenImgLoadedExpectation,
      shouldCallOnDoubleImgLoadWhenImgLoaded
    );
    it(shouldHideImgOnceLoadedExpectation, shouldHideImgOnceLoaded);
  });
});
