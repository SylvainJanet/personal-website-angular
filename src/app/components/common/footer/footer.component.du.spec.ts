import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';

const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('FooterComponent - dom unit', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let componentInstance: FooterComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const retrievedFooterText = 'test footer text';
  const expectedFooterText = retrievedFooterText + ' - ';
  const expectedFooterLink = 'test footer link';
  const expectedFooterHref = 'https://www.' + expectedFooterLink;

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
      .toEqual(jasmine.anything());
  };

  const shouldHaveProperDomStructureExpectation =
    'should have proper dom structure';
  const shouldHaveProperDomStructure = () => {
    // loaded
    componentInstance.updateTexts();
    fixture.detectChanges();

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

    //loading
    visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(false);
    preloaderServiceSpy.isLoading.and.returnValue(true);
    fixture.detectChanges();

    const debugElLoading: DebugElement = fixture.debugElement;

    expect(debugElLoading.children.length)
      .withContext('2 children at root')
      .toBe(2);
    expect(debugElLoading.children[0].nativeElement.tagName)
      .withContext('child 1 at root is DIV')
      .toBe('DIV');
    expect(debugElLoading.children[1].nativeElement.tagName)
      .withContext('child 2 at root is SECTION')
      .toBe('SECTION');

    // img
    const imgDivElLoading = debugElLoading.children[0];
    expect(imgDivElLoading.children.length)
      .withContext('child 1 at root should have 1 child')
      .toBe(1);
    expect(imgDivElLoading.children[0].nativeElement.tagName)
      .withContext('child 1 of child 1 at root should be IMG')
      .toBe('IMG');

    // section
    const sectionElLoading = debugElLoading.children[1];
    expect(sectionElLoading.children.length)
      .withContext('SECTION at root should have 1 child')
      .toBe(1);
    expect(sectionElLoading.children[0].nativeElement.tagName)
      .withContext('child 1 of SECTION at root should be DIV')
      .toBe('DIV');

    const sectionDivElLoading = sectionElLoading.children[0];
    expect(sectionDivElLoading.children.length)
      .withContext('SECTION-DIV should have 1 child')
      .toBe(1);
    expect(sectionDivElLoading.children[0].nativeElement.tagName)
      .withContext('child 1 of SECTION-DIV should be FOOTER')
      .toBe('FOOTER');

    const sectionFooterElLoading = sectionDivElLoading.children[0];
    expect(sectionFooterElLoading.children.length)
      .withContext('footer should have 3 children')
      .toBe(3);
    expect(sectionFooterElLoading.children[0].nativeElement.tagName)
      .withContext('child 1 of footer should be MAT-PROGRESS-SPINNER')
      .toBe('MAT-PROGRESS-SPINNER');
    expect(sectionFooterElLoading.children[1].nativeElement.tagName)
      .withContext('child 2 of footer should be P')
      .toBe('P');
    expect(sectionFooterElLoading.children[2].nativeElement.tagName)
      .withContext('child 3 of footer should be P')
      .toBe('P');

    const sectionPElLoading = sectionFooterElLoading.children[1];
    expect(sectionPElLoading.children.length)
      .withContext('child 1 of footer should have 2 children')
      .toBe(2);
    expect(sectionPElLoading.children[0].nativeElement.tagName)
      .withContext('child 1 of child 1 of footer should be SPAN')
      .toBe('SPAN');
    expect(sectionPElLoading.children[1].nativeElement.tagName)
      .withContext('child 2 of child 1 of footer should be A')
      .toBe('A');

    const sectionP2ElLoading = sectionFooterElLoading.children[2];
    expect(sectionP2ElLoading.children.length)
      .withContext('child 2 of footer should have no children')
      .toBe(0);
  };

  const shouldSetFooterTextExpectation = 'should set footer text';
  const shouldSetFooterText = () => {
    componentInstance.updateTexts();
    fixture.detectChanges();

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
    componentInstance.updateTexts();
    fixture.detectChanges();

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
          { provide: PreloaderService, useValue: preloaderServiceSpy },
          {
            provide: VisibleToLoadTextService,
            useValue: visibleToLoadTextServiceSpy,
          },
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
          { provide: PreloaderService, useValue: preloaderServiceSpy },
          {
            provide: VisibleToLoadTextService,
            useValue: visibleToLoadTextServiceSpy,
          },
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
          { provide: PreloaderService, useValue: preloaderServiceSpy },
          {
            provide: VisibleToLoadTextService,
            useValue: visibleToLoadTextServiceSpy,
          },
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
