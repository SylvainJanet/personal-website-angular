import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { LogService } from 'src/app/services/log/log.service';
import { LinkBarOnHoverComponent } from '../../utilities/link-bar-on-hover/link-bar-on-hover.component';
import { ButtonBarOnHoverComponent } from '../../utilities/button-bar-on-hover/button-bar-on-hover.component';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('HeaderComponent - dom unit', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let componentInstance: HeaderComponent;
  let DOMComputationServiceSpy: jasmine.SpyObj<DOMComputationService>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let logServiceGlobalSpy: jasmine.SpyObj<LogService>;
  let logServiceSpy: jasmine.SpyObj<LogService>;

  const expectedName = 'test title';
  const expectedOtherLanguage = 'test other language';

  beforeEach(waitForAsync(() => {
    DOMComputationServiceSpy = jasmine.createSpyObj('DOMComputationService', [
      'getActualHeight',
    ]);

    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
      'current',
      'set',
    ]);

    textServiceSpy = jasmine.createSpyObj('TextService', [
      'get',
      'getOtherLanguage',
    ]);
    textServiceSpy.get.and.returnValues(of(expectedName));
    textServiceSpy.getOtherLanguage.and.returnValue(of(expectedOtherLanguage));

    logServiceGlobalSpy = jasmine.createSpyObj('LogService', ['withClassName']);
    logServiceSpy = jasmine.createSpyObj('LogService', ['debug']);
    logServiceGlobalSpy.withClassName.and.returnValue(logServiceSpy);

    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        LinkBarOnHoverComponent,
        ButtonBarOnHoverComponent,
      ],
      providers: [
        { provide: DOMComputationService, useValue: DOMComputationServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
        { provide: LogService, useValue: logServiceGlobalSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  describe('onResize method', () => {
    it('should be called on window resize event', () => {
      spyOn(componentInstance, 'onResize');

      window.dispatchEvent(new Event('resize'));

      expect(componentInstance.onResize).toHaveBeenCalledTimes(1);
    });
  });
  describe('onScroll method', () => {
    it('should be called on window scroll event', () => {
      spyOn(componentInstance, 'onScroll');

      window.dispatchEvent(new Event('scroll'));

      expect(componentInstance.onScroll).toHaveBeenCalledTimes(1);
    });
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');

    const headerEl: DebugElement = debugEl.children[0];

    expect(headerEl.children.length).toBe(1);
    expect(headerEl.children[0].nativeElement.tagName).toBe('DIV');

    const headerContainerEl: DebugElement = headerEl.children[0];

    expect(headerContainerEl.children.length).toBe(3);
    expect(headerContainerEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(headerContainerEl.children[1].nativeElement.tagName).toBe('DIV');
    expect(headerContainerEl.children[2].nativeElement.tagName).toBe('DIV');

    // left-header
    const leftHeaderEl: DebugElement = headerContainerEl.children[0];

    expect(leftHeaderEl.children.length).toBe(1);
    expect(leftHeaderEl.children[0].nativeElement.tagName).toBe(
      'APP-LINK-BAR-ON-HOVER'
    );

    // right-header
    const rightHeaderEl: DebugElement = headerContainerEl.children[1];

    expect(rightHeaderEl.children.length).toBe(1);
    expect(rightHeaderEl.children[0].nativeElement.tagName).toBe(
      'APP-BUTTON-BAR-ON-HOVER'
    );

    // collapsed-header
    const collapsedHeaderEl: DebugElement = headerContainerEl.children[2];

    expect(collapsedHeaderEl.children.length).toBe(1);
    expect(collapsedHeaderEl.children[0].nativeElement.tagName).toBe('DIV');

    const deroulantEl: DebugElement = collapsedHeaderEl.children[0];

    expect(deroulantEl.children.length).toBe(2);
    expect(deroulantEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(deroulantEl.children[1].nativeElement.tagName).toBe('UL');

    // collapsed-header deroulant div

    const deroulantDivEl: DebugElement = deroulantEl.children[0];

    expect(deroulantDivEl.children.length).toBe(1);
    expect(deroulantDivEl.children[0].nativeElement.tagName).toBe('DIV');

    const deroulantDivDivEl: DebugElement = deroulantDivEl.children[0];

    expect(deroulantDivDivEl.children.length).toBe(3);
    expect(deroulantDivDivEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(deroulantDivDivEl.children[1].nativeElement.tagName).toBe('DIV');
    expect(deroulantDivDivEl.children[2].nativeElement.tagName).toBe('DIV');

    // collapsed-header deroulant ul

    const deroulantUlEl: DebugElement = deroulantEl.children[1];

    expect(deroulantUlEl.children.length).toBe(2);
    expect(deroulantUlEl.children[0].nativeElement.tagName).toBe('LI');
    expect(deroulantUlEl.children[1].nativeElement.tagName).toBe('LI');

    // collapsed-header deroulant ul li 1

    const deroulantUlLi1El: DebugElement = deroulantUlEl.children[0];

    expect(deroulantUlLi1El.children.length).toBe(1);
    expect(deroulantUlLi1El.children[0].nativeElement.tagName).toBe(
      'APP-LINK-BAR-ON-HOVER'
    );

    // collapsed-header deroulant ul li 2

    const deroulantUlLi2El: DebugElement = deroulantUlEl.children[1];

    expect(deroulantUlLi2El.children.length).toBe(1);
    expect(deroulantUlLi2El.children[0].nativeElement.tagName).toBe(
      'APP-BUTTON-BAR-ON-HOVER'
    );
  });

  it('should set myName', () => {
    const debugEl: DebugElement = fixture.debugElement;

    const headerEl: DebugElement = debugEl.children[0];

    const headerContainerEl: DebugElement = headerEl.children[0];

    // left-header
    const leftHeaderEl: DebugElement = headerContainerEl.children[0];
    const leftLinkEl: DebugElement = leftHeaderEl.children[0];

    const leftLinkComp: LinkBarOnHoverComponent = leftLinkEl.componentInstance;
    leftLinkComp.text.subscribe((s) => {
      expect(s).toBe(expectedName);
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
      expect(s).toBe(expectedName);
    });
  });

  it('should set otherLanguage', () => {
    const debugEl: DebugElement = fixture.debugElement;

    const headerEl: DebugElement = debugEl.children[0];

    const headerContainerEl: DebugElement = headerEl.children[0];

    // right-header
    const rightHeaderEl: DebugElement = headerContainerEl.children[1];
    const rightLinkEl: DebugElement = rightHeaderEl.children[0];

    const rightLinkComp: LinkBarOnHoverComponent =
      rightLinkEl.componentInstance;
    rightLinkComp.text.subscribe((s) => {
      expect(s).toBe(expectedOtherLanguage);
    });

    // collapsed-header
    const collapsedHeaderEl: DebugElement = headerContainerEl.children[2];

    const deroulantEl: DebugElement = collapsedHeaderEl.children[0];

    // collapsed-header deroulant ul

    const deroulantUlEl: DebugElement = deroulantEl.children[1];

    // collapsed-header deroulant ul li 2

    const deroulantUlLi2El: DebugElement = deroulantUlEl.children[1];
    const collapsedLink2El: DebugElement = deroulantUlLi2El.children[0];

    const collapsedLink2Comp: LinkBarOnHoverComponent =
      collapsedLink2El.componentInstance;
    collapsedLink2Comp.text.subscribe((s) => {
      expect(s).toBe(expectedOtherLanguage);
    });
  });
});
