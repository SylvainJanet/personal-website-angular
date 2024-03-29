import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PreloaderService } from './services/preloader/preloader.service';
import { Preloaders } from './services/preloader/preloaders/preloaders';

describe('AppComponent - unit', () => {
  let component: AppComponent;
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
      component = TestBed.inject(AppComponent);
    });
    it('should create', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
      expect(component.mainLoader)
        .withContext('mainLoader should be set')
        .toEqual(Preloaders.MAIN);
      expect(component.loaderTexts)
        .withContext('loaderTexts should be set')
        .toEqual(Preloaders.TEXTS);

      expect(component.opacity).withContext('opacity should be set').toBe(0);
    });

    it('should call increaseOpacity method', () => {
      expect(component.increaseOpacity)
        .withContext(
          'increaseOpacity should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith(0, 40, 10);
    });
  });

  describe('ngOnInit method', () => {
    beforeEach(() => {
      component = TestBed.inject(AppComponent);
    });
    it('should set css variable --scroll-bar-width value', () => {
      component.ngOnInit();

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
      component = TestBed.inject(AppComponent);
    });
    it('should increase the opacity progressively', fakeAsync(() => {
      const testStepsNumber = 5;
      const testStepsDuration = 20;

      const opacityBefore = component.opacity;
      expect(opacityBefore)
        .withContext('opacity should be set to 0 at first')
        .toBe(0);

      component.increaseOpacity(0, testStepsNumber, testStepsDuration);

      for (let i = 0; i < testStepsNumber; i++) {
        tick(testStepsDuration);
        const opacityDuring = component.opacity;
        expect(opacityDuring)
          .withContext('opacity should be incremented - step ' + i)
          .toBe((i + 1) / testStepsNumber);
      }

      tick(testStepsNumber * testStepsDuration);
      const opacityAfter = component.opacity;
      expect(opacityAfter)
        .withContext('opacity should be set to 1 at the end')
        .toBe(1);
    }));
  });
});
