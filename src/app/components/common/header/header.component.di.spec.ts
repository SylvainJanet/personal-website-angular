import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { LinkBarOnHoverComponent } from '../../utilities/link-bar-on-hover/link-bar-on-hover.component';
import { ButtonBarOnHoverComponent } from '../../utilities/button-bar-on-hover/button-bar-on-hover.component';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { DebugElement } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';

describe('HeaderComponent - dom integration', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let componentInstance: HeaderComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let DOMComputationServiceSpy: jasmine.SpyObj<DOMComputationService>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const expectedName = 'test title';
  const expectedSetLanguage = '\xa0🌐\xa0';

  beforeEach(() => {
    DOMComputationServiceSpy = jasmine.createSpyObj('DOMComputationService', [
      'getActualHeight',
    ]);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const expectedNameDto = of({ message: expectedName });

    httpClientSpy.get.and.returnValues(expectedNameDto);
  });

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  };

  const shouldHaveContentSetByServiceExpectation =
    'should have content set by textService';
  const shouldHaveContentSetByService = () => {
    componentInstance.updateTexts();
    fixture.detectChanges();

    // myName

    const debugEl: DebugElement = fixture.debugElement;

    const headerEl: DebugElement = debugEl.children[1];

    const headerContainerEl: DebugElement = headerEl.children[0];

    // left-header
    const leftHeaderEl: DebugElement = headerContainerEl.children[0];
    const leftLinkEl: DebugElement = leftHeaderEl.children[0];

    const leftLinkComp: LinkBarOnHoverComponent = leftLinkEl.componentInstance;
    leftLinkComp.text.subscribe((s) => {
      expect(s)
        .withContext('left link text should be set - name')
        .toBe(expectedName);
    });

    // collapsed-header
    const collapsedHeaderEl: DebugElement = headerContainerEl.children[2];

    const deroulantEl: DebugElement = collapsedHeaderEl.children[0];

    // collapsed-header deroulant ul

    const deroulantUlEl: DebugElement = deroulantEl.children[1];

    // collapsed-header deroulant ul li 1

    const deroulantUlLi1El: DebugElement = deroulantUlEl.children[0];
    const collapsedLink1El: DebugElement = deroulantUlLi1El.children[0];

    const collapsedLink1Comp: LinkBarOnHoverComponent =
      collapsedLink1El.componentInstance;
    collapsedLink1Comp.text.subscribe((s) => {
      expect(s)
        .withContext('collapsed link text should be set - name')
        .toBe(expectedName);
    });

    // setLanguage

    // right-header
    const rightHeaderEl: DebugElement = headerContainerEl.children[1];
    const rightLinkEl: DebugElement = rightHeaderEl.children[0];

    const rightLinkComp: LinkBarOnHoverComponent =
      rightLinkEl.componentInstance;
    rightLinkComp.text.subscribe((s) => {
      expect(s)
        .withContext('right link text should be set - set language')
        .toBe(expectedSetLanguage);
    });

    // collapsed-header deroulant ul li 2

    const deroulantUlLi2El: DebugElement = deroulantUlEl.children[1];
    const collapsedLink2El: DebugElement = deroulantUlLi2El.children[0];

    const collapsedLink2Comp: LinkBarOnHoverComponent =
      collapsedLink2El.componentInstance;
    collapsedLink2Comp.text.subscribe((s) => {
      expect(s)
        .withContext('collapsed link text should be set - set language')
        .toBe(expectedSetLanguage);
    });
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HeaderComponent,
          LinkBarOnHoverComponent,
          ButtonBarOnHoverComponent,
        ],
        providers: [
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          TextService,
          LanguageService,
          VisibleToLoadTextService,
          LogService,
          PreloaderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HeaderComponent,
          LinkBarOnHoverComponent,
          ButtonBarOnHoverComponent,
        ],
        providers: [
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          TextService,
          LanguageService,
          VisibleToLoadTextService,
          LogService,
          PreloaderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HeaderComponent,
          LinkBarOnHoverComponent,
          ButtonBarOnHoverComponent,
        ],
        providers: [
          {
            provide: DOMComputationService,
            useValue: DOMComputationServiceSpy,
          },
          TextService,
          LanguageService,
          VisibleToLoadTextService,
          LogService,
          PreloaderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });
});
