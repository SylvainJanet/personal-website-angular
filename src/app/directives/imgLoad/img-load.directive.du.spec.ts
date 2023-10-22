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
  let directive: ImgLoadDirective;
  let fixture: ComponentFixture<TestComponent>;
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
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    directive = fixture.debugElement.children[0].injector.get(ImgLoadDirective);
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
        .toEqual([Preloaders.MAIN]);

      expect(directive.isLoadedOrError)
        .withContext('isLoadedOrError should be set')
        .toBeFalse();
    });
  });

  describe('ngOnChanges method', () => {
    it('should notify the imageService when the directive value is injected', (done: DoneFn) => {
      setTimeout(() => {
        expect(imageServiceSpy.imageLoading)
          .withContext('imageLoading should have been called')
          .toHaveBeenCalledOnceWith(
            fixture.debugElement.children[0].nativeElement,
            directive.appImgLoad
          );
        done();
      }, 2);
    });
    it('should not notify the imageService if isLoadedOrError is true', (done: DoneFn) => {
      setTimeout(() => {
        expect(imageServiceSpy.imageLoading)
          .withContext('imageLoading should have been called')
          .toHaveBeenCalledOnceWith(
            fixture.debugElement.children[0].nativeElement,
            directive.appImgLoad
          );
        expect(imageServiceSpy.imageLoading)
          .withContext('imageLoading should have been called - 1')
          .toHaveBeenCalledTimes(1);
        directive.isLoadedOrError = true;
        const change = new SimpleChange(undefined, directive, false);
        const changes = { appImgLoad: change };

        directive.ngOnChanges(changes);

        expect(imageServiceSpy.imageLoading)
          .withContext('imageLoading should have been called - 2')
          .toHaveBeenCalledTimes(1);
        done();
      }, 2);
    });
  });

  describe('onLoad method', () => {
    it('should trigger on load event', () => {
      spyOn(directive, 'loadOrError');
      fixture.debugElement.children[0].nativeElement.dispatchEvent(
        new Event('load')
      );
      expect(directive.loadOrError)
        .withContext('loadOrError should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('onError method', () => {
    it('should trigger on error event', () => {
      spyOn(directive, 'loadOrError');
      fixture.debugElement.children[0].nativeElement.dispatchEvent(
        new Event('error')
      );
      expect(directive.loadOrError)
        .withContext('loadOrError should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });
});
