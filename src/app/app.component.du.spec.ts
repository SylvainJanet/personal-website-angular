import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PreloaderService } from './services/preloader/preloader.service';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

describe('AppComponent - dom unit', () => {
  let fixture: ComponentFixture<AppComponent>;
  let componentInstance: AppComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;

  beforeEach(waitForAsync(() => {
    preloaderServiceSpy = jasmine.createSpyObj('PreloaderService', [
      'isAnyLoading',
      'getProgressionPercent',
    ]);

    TestBed.configureTestingModule({
      declarations: [AppComponent, MatProgressSpinner],
      providers: [{ provide: PreloaderService, useValue: preloaderServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  it('should have proper dom structure', () => {
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
  });

  it('should use progression percent for progress spinner', () => {
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
  });
});
