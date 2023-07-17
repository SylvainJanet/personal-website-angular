import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { CvSkillBarComponent } from './cv-skill-bar.component';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { BehaviorSubject } from 'rxjs';

describe('CvSkillBarComponent - unit', () => {
  let cvSkillBarComponent: CvSkillBarComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let elementRefSpy: jasmine.SpyObj<ElementRef>;

  beforeEach(() => {
    preloaderServiceSpy = jasmine.createSpyObj(
      'PreloaderService',
      [],
      ['statusAnyLoading']
    );
    (
      Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
        ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
    ).and.returnValue(new BehaviorSubject<boolean | null>(null));
    elementRefSpy = jasmine.createSpyObj('ElementRef', [], ['nativeElement']);
    TestBed.configureTestingModule({
      providers: [
        CvSkillBarComponent,
        { provide: PreloaderService, useValue: preloaderServiceSpy },
        { provide: ElementRef, useValue: elementRefSpy },
      ],
    });
    cvSkillBarComponent = TestBed.inject(CvSkillBarComponent);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(cvSkillBarComponent).toBeTruthy();
    });

    it('should set default values', () => {
      expect(cvSkillBarComponent).toBeTruthy();

      cvSkillBarComponent.skillName.subscribe((s) => {
        expect(s).toBe('SKILL');
      });

      expect(cvSkillBarComponent.percent).toBe(50);
      expect(cvSkillBarComponent.width).toBe('0');
      expect(cvSkillBarComponent.posElementMin).toBe(0);
      expect(cvSkillBarComponent.posElementMax).toBe(0);
    });
  });

  describe('onResize method', () => {
    it('should call updateAfterLoaded method', () => {
      spyOn(cvSkillBarComponent, 'updateAfterLoaded');

      cvSkillBarComponent.onResize();

      expect(cvSkillBarComponent.updateAfterLoaded).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateWidth method', () => {
    it('should set to 0 if scrollY is less than min', () => {
      cvSkillBarComponent.posElementMin = 10;
      cvSkillBarComponent.posElementMax = 20;

      scrollY = 5;

      cvSkillBarComponent.updateWidth();
      expect(cvSkillBarComponent.width).toBe('0');
    });
    it('should set to 0 if scrollY is more than max', () => {
      cvSkillBarComponent.posElementMin = 10;
      cvSkillBarComponent.posElementMax = 20;

      scrollY = 25;

      cvSkillBarComponent.updateWidth();
      expect(cvSkillBarComponent.width).toBe('0');
    });
    it('should set to percent % if scrollY is between min and max', () => {
      cvSkillBarComponent.posElementMin = 10;
      cvSkillBarComponent.posElementMax = 20;

      scrollY = 15;

      cvSkillBarComponent.updateWidth();
      expect(cvSkillBarComponent.width).toBe(cvSkillBarComponent.percent + '%');
    });
  });

  describe('updateAfterLoaded method', () => {
    it('should call preloaderService', () => {
      const bs = jasmine.createSpyObj('BehaviorSubject<boolean | null>', [
        'subscribe',
      ]);
      (
        Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
          ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
      ).and.returnValue(bs);

      cvSkillBarComponent.updateAfterLoaded();

      expect(
        preloaderServiceSpy.statusAnyLoading.subscribe
      ).toHaveBeenCalledTimes(1);
    });
    it('should call getElPos and UpdateWidth when all assets are loaded', () => {
      spyOn(cvSkillBarComponent, 'getElPos');
      spyOn(cvSkillBarComponent, 'updateWidth');

      const bs = new BehaviorSubject<boolean | null>(null);
      (
        Object.getOwnPropertyDescriptor(preloaderServiceSpy, 'statusAnyLoading')
          ?.get as jasmine.Spy<() => BehaviorSubject<boolean | null>>
      ).and.returnValue(bs);

      cvSkillBarComponent.updateAfterLoaded();

      expect(cvSkillBarComponent.getElPos).not.toHaveBeenCalled();
      expect(cvSkillBarComponent.updateWidth).not.toHaveBeenCalled();

      bs.next(true);
      expect(cvSkillBarComponent.getElPos).not.toHaveBeenCalled();
      expect(cvSkillBarComponent.updateWidth).not.toHaveBeenCalled();

      bs.next(false);
      expect(cvSkillBarComponent.getElPos).toHaveBeenCalledTimes(1);
      expect(cvSkillBarComponent.updateWidth).toHaveBeenCalledTimes(1);

      bs.next(false);
      expect(cvSkillBarComponent.getElPos).toHaveBeenCalledTimes(2);
      expect(cvSkillBarComponent.updateWidth).toHaveBeenCalledTimes(2);
    });
  });

  describe('onScroll method', () => {
    it('should call updateAfterLoaded method', () => {
      spyOn(cvSkillBarComponent, 'updateAfterLoaded');

      cvSkillBarComponent.onScroll();

      expect(cvSkillBarComponent.updateAfterLoaded).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngAfterContentInit method', () => {
    it('should call updateAfterLoaded method', () => {
      spyOn(cvSkillBarComponent, 'updateAfterLoaded');

      cvSkillBarComponent.ngAfterContentInit();

      expect(cvSkillBarComponent.updateAfterLoaded).toHaveBeenCalledTimes(1);
    });
  });
});
