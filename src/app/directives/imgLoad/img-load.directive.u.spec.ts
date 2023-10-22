import { TestBed } from '@angular/core/testing';
import { ImageService } from 'src/app/services/image/image.service';
import { ImgLoadDirective } from './img-load.directive';
import { ElementRef, SimpleChange } from '@angular/core';

describe('ImgLoadDirective - unit', () => {
  let directive: ImgLoadDirective;
  let elementRefSpy: jasmine.SpyObj<ElementRef>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;

  beforeEach(() => {
    imageServiceSpy = jasmine.createSpyObj('ImageService', [
      'imageLoading',
      'imageLoadedOrError',
    ]);
    elementRefSpy = jasmine.createSpyObj(
      'ElementRef',
      {},
      { nativeElement: document.createElement('IMG') }
    );
    TestBed.configureTestingModule({
      providers: [
        ImgLoadDirective,
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: ElementRef, useValue: elementRefSpy },
      ],
    });
    directive = TestBed.inject(ImgLoadDirective);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(directive)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });

    it('should set default values', () => {
      expect(directive)
        .withContext('component should create')
        .toEqual(jasmine.anything());

      expect(directive.appImgLoad)
        .withContext('appImgLoad should be set')
        .toEqual([]);

      expect(directive.isLoadedOrError)
        .withContext('isLoadedOrError should be set')
        .toBeFalse();
    });
  });

  describe('ngOnChanges method', () => {
    it('should notify the imageService when the directive value is injected and isLoadedOrError is false', (done: DoneFn) => {
      directive.isLoadedOrError = false;
      const change = new SimpleChange(undefined, directive, false);
      const changes = { appImgLoad: change };

      directive.ngOnChanges(changes);

      setTimeout(() => {
        expect(imageServiceSpy.imageLoading)
          .withContext('imageLoading should have been called')
          .toHaveBeenCalledOnceWith(
            elementRefSpy.nativeElement,
            directive.appImgLoad
          );
        done();
      }, 2);
    });
    it('should not notify the imageService if isLoadedOrError is true', (done: DoneFn) => {
      directive.isLoadedOrError = true;
      const change = new SimpleChange(undefined, directive, false);
      const changes = { appImgLoad: change };

      directive.ngOnChanges(changes);

      setTimeout(() => {
        expect(imageServiceSpy.imageLoading)
          .withContext('imageLoading should not have been called')
          .not.toHaveBeenCalled();
        done();
      }, 2);
    });
  });

  describe('onLoad method', () => {
    it('should call the loadOrError method', () => {
      spyOn(directive, 'loadOrError');
      directive.onLoad();

      expect(directive.loadOrError)
        .withContext('loadOrError should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('onError method', () => {
    it('should call the loadOrError method', () => {
      spyOn(directive, 'loadOrError');
      directive.onError();

      expect(directive.loadOrError)
        .withContext('loadOrError should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('loadOrError method', () => {
    it('should notify the service if isLoadedOrError is false', () => {
      directive.isLoadedOrError = false;

      directive.loadOrError();

      expect(imageServiceSpy.imageLoadedOrError)
        .withContext('imageLoadedOrError should have been called')
        .toHaveBeenCalledOnceWith(
          elementRefSpy.nativeElement,
          directive.appImgLoad
        );
    });
    it('should change isLoadedOrError to true if it is false', () => {
      directive.isLoadedOrError = false;

      directive.loadOrError();

      expect(directive.isLoadedOrError)
        .withContext('isLoadedOrError should be set')
        .toBeTrue();
    });
    it('should not notify the service if isLoadedOrError is true', () => {
      directive.isLoadedOrError = true;

      directive.loadOrError();

      expect(imageServiceSpy.imageLoadedOrError)
        .withContext('imageLoadedOrError should not have been called')
        .not.toHaveBeenCalled();
    });
  });
});
