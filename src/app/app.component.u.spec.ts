import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PreloaderService } from './services/preloader/preloader.service';
import { Preloaders } from './services/preloader/preloaders/preloaders';

describe('AppComponent - unit', () => {
  let appComponent: AppComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;

  beforeEach(() => {
    preloaderServiceSpy = jasmine.createSpyObj('PreloaderService', [
      'isAnyLoading',
      'getProgressionPercent',
    ]);
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        { provide: PreloaderService, useValue: preloaderServiceSpy },
      ],
    });
  });

  describe('constructor', () => {
    beforeEach(() => {
      spyOn(AppComponent.prototype, 'increaseOpacity');
      appComponent = TestBed.inject(AppComponent);
    });
    it('should create', () => {
      expect(appComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(appComponent).toBeTruthy();
      expect(appComponent.mainLoader).toEqual(Preloaders.MAIN);
      expect(appComponent.loaderTexts).toEqual(Preloaders.TEXTS);

      expect(appComponent.opacity).toBe(0);
    });

    it('should call increaseOpacity method', () => {
      expect(appComponent.increaseOpacity).toHaveBeenCalledOnceWith(0, 10, 10);
    });
  });

  describe('ngOnInit method', () => {
    beforeEach(() => {
      appComponent = TestBed.inject(AppComponent);
    });
    it('should set css variable --scroll-bar-width value', () => {
      appComponent.ngOnInit();

      const after =
        document.documentElement.style.getPropertyValue('--scroll-bar-width');

      expect(after).toMatch(/^[0-9]+px$/);

      const value = window.innerWidth - document.body.clientWidth;
      expect(after).toBe(value + 'px');
    });
  });

  describe('increaseOpacity method', () => {
    beforeEach(() => {
      appComponent = TestBed.inject(AppComponent);
    });
    it('should increase the opacity progressively', fakeAsync(() => {
      const testStepsNumber = 5;
      const testStepsDuration = 20;

      const opacityBefore = appComponent.opacity;
      expect(opacityBefore).toBe(0);

      appComponent.increaseOpacity(0, testStepsNumber, testStepsDuration);

      for (let i = 0; i < testStepsNumber; i++) {
        tick(testStepsDuration);
        const opacityDuring = appComponent.opacity;
        expect(opacityDuring).toBe((i + 1) / testStepsNumber);
      }

      tick(testStepsNumber * testStepsDuration);
      const opacityAfter = appComponent.opacity;
      expect(opacityAfter).toBe(1);
    }));
  });
});
