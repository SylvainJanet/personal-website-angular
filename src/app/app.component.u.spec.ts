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
      expect(appComponent).withContext('component should create').toBeTruthy();
    });

    it('should set default values', () => {
      expect(appComponent).withContext('component should create').toBeTruthy();
      expect(appComponent.mainLoader)
        .withContext('mainLoader should be set')
        .toEqual(Preloaders.MAIN);
      expect(appComponent.loaderTexts)
        .withContext('loaderTexts should be set')
        .toEqual(Preloaders.TEXTS);

      expect(appComponent.opacity).withContext('opacity should be set').toBe(0);
    });

    it('should call increaseOpacity method', () => {
      expect(appComponent.increaseOpacity)
        .withContext(
          'increaseOpacity should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith(0, 10, 10);
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

      expect(after)
        .withContext('width should be set in the correct format')
        .toMatch(/^[0-9]+px$/);

      const value = window.innerWidth - document.body.clientWidth;
      expect(after)
        .withContext('width should be set with the correct value')
        .toBe(value + 'px');
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
      expect(opacityBefore)
        .withContext('opacity should be set to 0 at first')
        .toBe(0);

      appComponent.increaseOpacity(0, testStepsNumber, testStepsDuration);

      for (let i = 0; i < testStepsNumber; i++) {
        tick(testStepsDuration);
        const opacityDuring = appComponent.opacity;
        expect(opacityDuring)
          .withContext('opacity should be incremented - step ' + i)
          .toBe((i + 1) / testStepsNumber);
      }

      tick(testStepsNumber * testStepsDuration);
      const opacityAfter = appComponent.opacity;
      expect(opacityAfter)
        .withContext('opacity should be set to 1 at the end')
        .toBe(1);
    }));
  });
});
