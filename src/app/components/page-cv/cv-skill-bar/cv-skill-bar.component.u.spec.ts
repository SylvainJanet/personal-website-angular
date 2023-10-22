import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { CvSkillBarComponent } from './cv-skill-bar.component';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { BehaviorSubject } from 'rxjs';

describe('CvSkillBarComponent - unit', () => {
  let component: CvSkillBarComponent;
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
    component = TestBed.inject(CvSkillBarComponent);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      component.skillName.subscribe((s) => {
        expect(s).withContext('skill name should be set').toBe('SKILL');
      });

      expect(component.percent).withContext('percent should be set').toBe(50);
      expect(component.width).withContext('width should be set').toBe('0');
      expect(component.posElementMin)
        .withContext('posElementMin should be set')
        .toBe(0);
      expect(component.posElementMax)
        .withContext('posElementMax should be set')
        .toBe(0);
    });
  });

  describe('ngOnChanges method', () => {
    it('should call getElPos method', () => {
      spyOn(component, 'getElPos');
      spyOn(component, 'updateWidth');

      component.ngOnChanges();

      expect(component.getElPos)
        .withContext('getElPos should have been called')
        .toHaveBeenCalledTimes(1);
    });
    it('should call updateWidth method', () => {
      spyOn(component, 'getElPos');
      spyOn(component, 'updateWidth');

      component.ngOnChanges();

      expect(component.updateWidth)
        .withContext('updateWidth should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('onResize method', () => {
    it('should call updateAnimation method', () => {
      spyOn(component, 'updateAnimation');

      component.onResize();

      expect(component.updateAnimation)
        .withContext('updateAnimation should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('updateWidth method', () => {
    it('should set to 0 if scrollY is less than min', () => {
      component.posElementMin = 10;
      component.posElementMax = 20;

      scrollY = 5;

      component.updateWidth();
      expect(component.width).withContext('width should be set').toBe('0');
    });
    it('should set to 0 if scrollY is more than max', () => {
      component.posElementMin = 10;
      component.posElementMax = 20;

      scrollY = 25;

      component.updateWidth();
      expect(component.width).withContext('width should be set').toBe('0');
    });
    it('should set to percent % if scrollY is between min and max', () => {
      component.posElementMin = 10;
      component.posElementMax = 20;

      scrollY = 15;

      component.updateWidth();
      expect(component.width)
        .withContext('width should be set')
        .toBe(component.percent + '%');
    });
  });

  describe('updateAnimation method', () => {
    it('should call getElPos and UpdateWidth', () => {
      spyOn(component, 'getElPos');
      spyOn(component, 'updateWidth');

      component.updateAnimation();

      expect(component.getElPos)
        .withContext('getElPos should have been called')
        .toHaveBeenCalledOnceWith();
      expect(component.updateWidth)
        .withContext('updateWidth should have been called')
        .toHaveBeenCalledOnceWith();
    });
  });

  describe('onScroll method', () => {
    it('should call updateAnimation method', () => {
      spyOn(component, 'updateAnimation');

      component.onScroll();

      expect(component.updateAnimation)
        .withContext('updateAnimation should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });
});
