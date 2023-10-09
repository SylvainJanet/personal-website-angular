import { TestBed } from '@angular/core/testing';
import { ImageService } from 'src/app/services/image/image.service';
import { ImgLoadDirective } from './img-load.directive';
import { ElementRef, SimpleChange } from '@angular/core';

describe('ImgLoadDirective - unit', () => {
  let imgLoadDirective: ImgLoadDirective;
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
    imgLoadDirective = TestBed.inject(ImgLoadDirective);
  });

  describe('constructor', () => {
    it('should create', () => {
      expect(imgLoadDirective)
        .withContext('component should create')
        .toBeTruthy();
    });

    it('should set default values', () => {
      expect(imgLoadDirective)
        .withContext('component should create')
        .toBeTruthy();

      expect(imgLoadDirective.appImgLoad)
        .withContext('appImgLoad should be set')
        .toEqual([]);

      expect(imgLoadDirective.isLoadedOrError)
        .withContext('isLoadedOrError should be set')
        .toBeFalse();
    });
  });

  describe('ngOnChanges method', () => {
    it('should notify the imageService when the directive value is injected and isLoadedOrError is false', () => {
      imgLoadDirective.isLoadedOrError = false;
      const change = new SimpleChange(undefined, imgLoadDirective, false);
      const changes = { appImgLoad: change };

      imgLoadDirective.ngOnChanges(changes);

      expect(imageServiceSpy.imageLoading)
        .withContext('imageLoading should have been called')
        .toHaveBeenCalledOnceWith(
          elementRefSpy.nativeElement,
          imgLoadDirective.appImgLoad
        );
    });
    it('should not notify the imageService if isLoadedOrError is true', () => {
      imgLoadDirective.isLoadedOrError = true;
      const change = new SimpleChange(undefined, imgLoadDirective, false);
      const changes = { appImgLoad: change };

      imgLoadDirective.ngOnChanges(changes);

      expect(imageServiceSpy.imageLoading)
        .withContext('imageLoading should not have been called')
        .not.toHaveBeenCalled();
    });
  });

  describe('onLoad method', () => {
    it('should call the loadOrError method', () => {
      spyOn(imgLoadDirective, 'loadOrError');
      imgLoadDirective.onLoad();

      expect(imgLoadDirective.loadOrError)
        .withContext('loadOrError should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('onError method', () => {
    it('should call the loadOrError method', () => {
      spyOn(imgLoadDirective, 'loadOrError');
      imgLoadDirective.onError();

      expect(imgLoadDirective.loadOrError)
        .withContext('loadOrError should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('loadOrError method', () => {
    it('should notify the service if isLoadedOrError is false', () => {
      imgLoadDirective.isLoadedOrError = false;

      imgLoadDirective.loadOrError();

      expect(imageServiceSpy.imageLoadedOrError)
        .withContext('imageLoadedOrError should have been called')
        .toHaveBeenCalledOnceWith(
          elementRefSpy.nativeElement,
          imgLoadDirective.appImgLoad
        );
    });
    it('should change isLoadedOrError to true if it is false', () => {
      imgLoadDirective.isLoadedOrError = false;

      imgLoadDirective.loadOrError();

      expect(imgLoadDirective.isLoadedOrError)
        .withContext('isLoadedOrError should be set')
        .toBeTrue();
    });
    it('should not notify the service if isLoadedOrError is true', () => {
      imgLoadDirective.isLoadedOrError = true;

      imgLoadDirective.loadOrError();

      expect(imageServiceSpy.imageLoadedOrError)
        .withContext('imageLoadedOrError should not have been called')
        .not.toHaveBeenCalled();
    });
  });
});
