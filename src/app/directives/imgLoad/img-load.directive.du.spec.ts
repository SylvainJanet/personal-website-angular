import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { ImageService } from 'src/app/services/image/image.service';
import { ImgLoadDirective } from './img-load.directive';
import { Component, SimpleChange } from '@angular/core';

@Component({
  template: `<img [appImgLoad]="preloaders" />`,
})
class TestComponent {
  preloaders = [Preloaders.MAIN];
}

describe('ImgLoadDirective - dom unit', () => {
  let imgLoadDirective: ImgLoadDirective;
  let testComponentFixture: ComponentFixture<TestComponent>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;

  beforeEach(waitForAsync(() => {
    imageServiceSpy = jasmine.createSpyObj('ImageService', [
      'imageLoading',
      'imageLoadedOrError',
    ]);
    TestBed.configureTestingModule({
      imports: [ImgLoadDirective],
      declarations: [TestComponent],
      providers: [{ provide: ImageService, useValue: imageServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    testComponentFixture = TestBed.createComponent(TestComponent);
    testComponentFixture.detectChanges();
    imgLoadDirective =
      testComponentFixture.debugElement.children[0].injector.get(
        ImgLoadDirective
      );
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
        .toEqual([Preloaders.MAIN]);

      expect(imgLoadDirective.isLoadedOrError)
        .withContext('isLoadedOrError should be set')
        .toBeFalse();
    });
  });

  describe('ngOnChanges method', () => {
    it('should notify the imageService when the directive value is injected', () => {
      expect(imageServiceSpy.imageLoading)
        .withContext('imageLoading should have been called')
        .toHaveBeenCalledOnceWith(
          testComponentFixture.debugElement.children[0].nativeElement,
          imgLoadDirective.appImgLoad
        );
    });
    it('should not notify the imageService if isLoadedOrError is true', () => {
      expect(imageServiceSpy.imageLoading)
        .withContext('imageLoading should have been called - 1')
        .toHaveBeenCalledTimes(1);
      imgLoadDirective.isLoadedOrError = true;
      const change = new SimpleChange(undefined, imgLoadDirective, false);
      const changes = { appImgLoad: change };

      imgLoadDirective.ngOnChanges(changes);

      expect(imageServiceSpy.imageLoading)
        .withContext('imageLoading should have been called - 2')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('onLoad method', () => {
    it('should trigger on load event', () => {
      spyOn(imgLoadDirective, 'loadOrError');
      testComponentFixture.debugElement.children[0].nativeElement.dispatchEvent(
        new Event('load')
      );
      expect(imgLoadDirective.loadOrError)
        .withContext('loadOrError should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('onError method', () => {
    it('should trigger on error event', () => {
      spyOn(imgLoadDirective, 'loadOrError');
      testComponentFixture.debugElement.children[0].nativeElement.dispatchEvent(
        new Event('error')
      );
      expect(imgLoadDirective.loadOrError)
        .withContext('loadOrError should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });
});
