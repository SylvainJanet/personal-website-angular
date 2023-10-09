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
    expect(componentInstance)
      .withContext('component should create')
      .toBeTruthy();
  };

  const shouldHaveProperDomStructureExpectation =
    'should have proper dom structure';
  const shouldHaveProperDomStructure = () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).withContext('1 child at root').toBe(1);
    expect(debugEl.children[0].nativeElement.tagName)
      .withContext('child 1 at root is DIV')
      .toBe('DIV');

    // loading
    preloaderServiceSpy.isAnyLoading.and.returnValue(true);
    fixture.detectChanges();

    const mainDivEl = debugEl.children[0];
    expect(mainDivEl.children.length)
      .withContext('(while loading) main div should have 6 children')
      .toBe(6);
    expect(mainDivEl.children[0].nativeElement.tagName)
      .withContext(
        '(while loading) child 1 of main div should be MAT-PROGRESS-SPINNER'
      )
      .toBe('MAT-PROGRESS-SPINNER');
    expect(mainDivEl.children[1].nativeElement.tagName)
      .withContext('(while loading) child 2 of main div should be APP-HEADER')
      .toBe('APP-HEADER');
    expect(mainDivEl.children[2].nativeElement.tagName)
      .withContext('(while loading) child 3 of main div should be APP-BANNER')
      .toBe('APP-BANNER');
    expect(mainDivEl.children[3].nativeElement.tagName)
      .withContext(
        '(while loading) child 4 of main div should be APP-PAGE-CONTENT'
      )
      .toBe('APP-PAGE-CONTENT');
    expect(mainDivEl.children[4].nativeElement.tagName)
      .withContext('(while loading) child 5 of main div should be APP-FOOTER')
      .toBe('APP-FOOTER');
    expect(mainDivEl.children[5].nativeElement.tagName)
      .withContext(
        '(while loading) child 6 of main div should be APP-BACK-TO-TOP'
      )
      .toBe('APP-BACK-TO-TOP');

    expect(mainDivEl.children[1].classes['hide'])
      .withContext('(while loading) child 2 of main div should have class hide')
      .toBeTrue();
    expect(mainDivEl.children[2].classes['hide'])
      .withContext('(while loading) child 3 of main div should have class hide')
      .toBeTrue();
    expect(mainDivEl.children[3].classes['hide'])
      .withContext('(while loading) child 4 of main div should have class hide')
      .toBeTrue();
    expect(mainDivEl.children[4].classes['hide'])
      .withContext('(while loading) child 5 of main div should have class hide')
      .toBeTrue();
    expect(mainDivEl.children[5].classes['hide'])
      .withContext('(while loading) child 6 of main div should have class hide')
      .toBeTrue();

    // not loading
    preloaderServiceSpy.isAnyLoading.and.returnValue(false);
    fixture.detectChanges();

    expect(mainDivEl.children.length)
      .withContext('(loaded) main div should have 5 children')
      .toBe(5);
    expect(mainDivEl.children[0].nativeElement.tagName)
      .withContext('(loaded) child 1 of main div should be APP-HEADER')
      .toBe('APP-HEADER');
    expect(mainDivEl.children[1].nativeElement.tagName)
      .withContext('(loaded) child 2 of main div should be APP-BANNER')
      .toBe('APP-BANNER');
    expect(mainDivEl.children[2].nativeElement.tagName)
      .withContext('(loaded) child 3 of main div should be APP-PAGE-CONTENT')
      .toBe('APP-PAGE-CONTENT');
    expect(mainDivEl.children[3].nativeElement.tagName)
      .withContext('(loaded) child 4 of main div should be APP-FOOTER')
      .toBe('APP-FOOTER');
    expect(mainDivEl.children[4].nativeElement.tagName)
      .withContext('(loaded) child 5 of main div should be APP-BACK-TO-TOP')
      .toBe('APP-BACK-TO-TOP');

    expect(mainDivEl.children[0].classes['hide'])
      .withContext('(loaded) child 1 of main div should have class hide')
      .toBeUndefined();
    expect(mainDivEl.children[1].classes['hide'])
      .withContext('(loaded) child 2 of main div should have class hide')
      .toBeUndefined();
    expect(mainDivEl.children[2].classes['hide'])
      .withContext('(loaded) child 3 of main div should have class hide')
      .toBeUndefined();
    expect(mainDivEl.children[3].classes['hide'])
      .withContext('(loaded) child 4 of main div should have class hide')
      .toBeUndefined();
    expect(mainDivEl.children[4].classes['hide'])
      .withContext('(loaded) child 5 of main div should have class hide')
      .toBeUndefined();
  };

  const shouldUseProgressionPercentForProgressSpinnerExpectation =
    'should use progression percent for progress spinner';
  const shouldUseProgressionPercentForProgressSpinner = () => {
    const expectedPercent = 48;
    const debugEl: DebugElement = fixture.debugElement;

    // loading
    preloaderServiceSpy.isAnyLoading.and.returnValue(true);
    preloaderServiceSpy.getProgressionPercent.and.returnValue(expectedPercent);
    fixture.detectChanges();

    const mainDivEl = debugEl.children[0];
    const progressSpinner: MatProgressSpinner =
      mainDivEl.children[0].componentInstance;
    const actual = progressSpinner.value;
    expect(actual)
      .withContext('percent progression should be used')
      .toBe(expectedPercent);
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
