import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BackToTopComponent } from './back-to-top.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ImageService } from 'src/app/services/image/image.service';
import { DebugElement } from '@angular/core';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';

describe('BackToTopComponent - dom unit', () => {
  let fixture: ComponentFixture<BackToTopComponent>;
  let componentInstance: BackToTopComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const expectedBackToTopAlt = 'this is a test';

  beforeEach(waitForAsync(() => {
    preloaderServiceSpy = jasmine.createSpyObj(
      'PreloaderService',
      ['isLoading'],
      []
    );
    visibleToLoadTextServiceSpy = jasmine.createSpyObj(
      'VisibleToLoadTextServiceSpy',
      ['hasTextLoaded', 'subscribe', 'unsubscribe', 'textLoaded'],
      []
    );
    imageServiceSpy = jasmine.createSpyObj('ImageService', [
      'imageLoading',
      'imageLoadedOrError',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
    textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

    TestBed.configureTestingModule({
      imports: [BackToTopComponent, ImgLoadDirective],
      providers: [
        {
          provide: VisibleToLoadTextService,
          useValue: visibleToLoadTextServiceSpy,
        },
        { provide: PreloaderService, useValue: preloaderServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    }).compileComponents();
  }));

  describe('constructor', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(BackToTopComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(componentInstance)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });
  });

  describe('onScroll method', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(BackToTopComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should be called on window scroll event', () => {
      spyOn(componentInstance, 'onScroll');

      window.dispatchEvent(new Event('scroll'));

      expect(componentInstance.onScroll)
        .withContext('onScroll should have been called')
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('DOM', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(BackToTopComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have proper dom structure', () => {
      const debugEl: DebugElement = fixture.debugElement;
      expect(debugEl.children.length).withContext('1 child at root').toBe(1);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is A')
        .toBe('A');
      const aEl: DebugElement = debugEl.children[0];
      expect(aEl.children.length).withContext('1 child at A').toBe(1);
      expect(aEl.children[0].nativeElement.tagName)
        .withContext('child 1 at A is IMG')
        .toBe('IMG');
    });
    it('should set alt img text', () => {
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;
      const aEl: DebugElement = debugEl.children[0];
      const imgEl: DebugElement = aEl.children[0];
      const actual = imgEl.attributes['alt'];
      expect(actual)
        .withContext('alt should be set')
        .toBe(expectedBackToTopAlt);
    });
    it('should set the icon opacity', () => {
      const opacityValueToTest = '67';
      componentInstance.iconOpacity = opacityValueToTest;
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement;
      const aEl: DebugElement = debugEl.children[0];
      const imgEl: DebugElement = aEl.children[0];
      const actualAOpacity = aEl.styles['opacity'];
      const actualImgOpacity = imgEl.styles['opacity'];
      expect(actualAOpacity)
        .withContext('A opacity should be set')
        .toBe(opacityValueToTest);
      expect(actualImgOpacity)
        .withContext('IMG opacity should be set')
        .toBe(opacityValueToTest);
    });
    it('should set the icon opacity', () => {
      // all
      let pointerEventToTest = 'all';
      componentInstance.iconPointerEvent = pointerEventToTest;
      fixture.detectChanges();
      const debugEl: DebugElement = fixture.debugElement;
      const aEl: DebugElement = debugEl.children[0];
      const imgEl: DebugElement = aEl.children[0];
      let actualAPointerEvent = aEl.styles['pointerEvents'];
      let actualImgPointerEvent = imgEl.styles['pointerEvents'];
      expect(actualAPointerEvent)
        .withContext('A pointer event should be set - all')
        .toBe(pointerEventToTest);
      expect(actualImgPointerEvent)
        .withContext('IMG pointer event should be set - all')
        .toBe(pointerEventToTest);
      // none
      pointerEventToTest = 'none';
      componentInstance.iconPointerEvent = pointerEventToTest;
      fixture.detectChanges();
      actualAPointerEvent = aEl.styles['pointerEvents'];
      actualImgPointerEvent = imgEl.styles['pointerEvents'];
      expect(actualAPointerEvent)
        .withContext('A pointer event should be set - none')
        .toBe(pointerEventToTest);
      expect(actualImgPointerEvent)
        .withContext('IMG pointer event should be set - none')
        .toBe(pointerEventToTest);
    });
  });
});
