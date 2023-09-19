import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PreloaderService } from './services/preloader/preloader.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent - dom unit', () => {
  let fixture: ComponentFixture<AppComponent>;
  let componentInstance: AppComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  beforeEach(() => {
    preloaderServiceSpy = jasmine.createSpyObj('PreloaderService', [
      'isAnyLoading',
      'getProgressionPercent',
      'toLoad',
    ]);
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
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');

    // loading
    preloaderServiceSpy.isAnyLoading.and.returnValue(true);
    fixture.detectChanges();

    const mainDivEl = debugEl.children[0];
    expect(mainDivEl.children.length).toBe(6);
    expect(mainDivEl.children[0].nativeElement.tagName).toBe(
      'MAT-PROGRESS-SPINNER'
    );
    expect(mainDivEl.children[1].nativeElement.tagName).toBe('APP-HEADER');
    expect(mainDivEl.children[2].nativeElement.tagName).toBe('APP-BANNER');
    expect(mainDivEl.children[3].nativeElement.tagName).toBe(
      'APP-PAGE-CONTENT'
    );
    expect(mainDivEl.children[4].nativeElement.tagName).toBe('APP-FOOTER');
    expect(mainDivEl.children[5].nativeElement.tagName).toBe('APP-BACK-TO-TOP');

    expect(mainDivEl.children[1].classes['hide']).toBeTrue();
    expect(mainDivEl.children[2].classes['hide']).toBeTrue();
    expect(mainDivEl.children[3].classes['hide']).toBeTrue();
    expect(mainDivEl.children[4].classes['hide']).toBeTrue();
    expect(mainDivEl.children[5].classes['hide']).toBeTrue();

    // not loading
    preloaderServiceSpy.isAnyLoading.and.returnValue(false);
    fixture.detectChanges();

    expect(mainDivEl.children.length).toBe(5);
    expect(mainDivEl.children[0].nativeElement.tagName).toBe('APP-HEADER');
    expect(mainDivEl.children[1].nativeElement.tagName).toBe('APP-BANNER');
    expect(mainDivEl.children[2].nativeElement.tagName).toBe(
      'APP-PAGE-CONTENT'
    );
    expect(mainDivEl.children[3].nativeElement.tagName).toBe('APP-FOOTER');
    expect(mainDivEl.children[4].nativeElement.tagName).toBe('APP-BACK-TO-TOP');

    expect(mainDivEl.children[0].classes['hide']).toBeUndefined();
    expect(mainDivEl.children[1].classes['hide']).toBeUndefined();
    expect(mainDivEl.children[2].classes['hide']).toBeUndefined();
    expect(mainDivEl.children[3].classes['hide']).toBeUndefined();
    expect(mainDivEl.children[4].classes['hide']).toBeUndefined();
  };

  const shouldUseProgressionPercentForProgressSpinnerExpectation =
    'should use progression percent for progress spinner';
  const shouldUseProgressionPercentForProgressSpinner = () => {
    const expectedPercent = 48;
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');

    // loading
    preloaderServiceSpy.isAnyLoading.and.returnValue(true);
    preloaderServiceSpy.getProgressionPercent.and.returnValue(expectedPercent);
    fixture.detectChanges();

    const mainDivEl = debugEl.children[0];
    const progressSpinner: MatProgressSpinner =
      mainDivEl.children[0].componentInstance;
    const actual = progressSpinner.value;
    expect(actual).toBe(expectedPercent);
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MatProgressSpinner],
        providers: [
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: PreloaderService, useValue: preloaderServiceSpy },
          { provide: ENV, useValue: devEnv },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
    it(
      shouldUseProgressionPercentForProgressSpinnerExpectation,
      shouldUseProgressionPercentForProgressSpinner
    );
  });
  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MatProgressSpinner],
        providers: [
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: PreloaderService, useValue: preloaderServiceSpy },
          { provide: ENV, useValue: stagingEnv },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
    it(
      shouldUseProgressionPercentForProgressSpinnerExpectation,
      shouldUseProgressionPercentForProgressSpinner
    );
  });
  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MatProgressSpinner],
        providers: [
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: PreloaderService, useValue: preloaderServiceSpy },
          { provide: ENV, useValue: prodEnv },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveProperDomStructureExpectation, shouldHaveProperDomStructure);
    it(
      shouldUseProgressionPercentForProgressSpinnerExpectation,
      shouldUseProgressionPercentForProgressSpinner
    );
  });
});
