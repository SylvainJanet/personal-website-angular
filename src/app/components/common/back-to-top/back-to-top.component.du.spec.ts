import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BackToTopComponent } from './back-to-top.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ImageService } from 'src/app/services/image/image.service';
import { DebugElement } from '@angular/core';

describe('BackToTopComponent - dom unit', () => {
  let fixture: ComponentFixture<BackToTopComponent>;
  let componentInstance: BackToTopComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const expectedBackToTopAlt = 'this is a test';

  beforeEach(waitForAsync(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    imageServiceSpy = jasmine.createSpyObj('ImageService', [
      'imageLoading',
      'imageLoadedOrError',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
    textServiceSpy.get.and.returnValues(of(expectedBackToTopAlt));

    TestBed.configureTestingModule({
      imports: [BackToTopComponent, ImgLoadDirective],
      providers: [
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToTopComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  describe('onScroll method', () => {
    it('should be called on window scroll event', () => {
      spyOn(componentInstance, 'onScroll');

      window.dispatchEvent(new Event('scroll'));

      expect(componentInstance.onScroll).toHaveBeenCalledTimes(1);
    });
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('A');

    const aEl: DebugElement = debugEl.children[0];

    expect(aEl.children.length).toBe(1);
    expect(aEl.children[0].nativeElement.tagName).toBe('IMG');
  });

  it('should set alt img text', () => {
    const debugEl: DebugElement = fixture.debugElement;
    const aEl: DebugElement = debugEl.children[0];
    const imgEl: DebugElement = aEl.children[0];

    const actual = imgEl.attributes['alt'];

    expect(actual).toBe(expectedBackToTopAlt);
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

    expect(actualAOpacity).toBe(opacityValueToTest);
    expect(actualImgOpacity).toBe(opacityValueToTest);
  });

  it('should set the icon opacity', () => {
    // all
    let pointerEventToTest = 'all';
    componentInstance.iconPointerEvent = pointerEventToTest;
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;
    const aEl: DebugElement = debugEl.children[0];
    const imgEl: DebugElement = aEl.children[0];

    let actualAOpacity = aEl.styles['pointerEvents'];
    let actualImgOpacity = imgEl.styles['pointerEvents'];

    expect(actualAOpacity).toBe(pointerEventToTest);
    expect(actualImgOpacity).toBe(pointerEventToTest);

    // none
    pointerEventToTest = 'none';
    componentInstance.iconPointerEvent = pointerEventToTest;
    fixture.detectChanges();

    actualAOpacity = aEl.styles['pointerEvents'];
    actualImgOpacity = imgEl.styles['pointerEvents'];

    expect(actualAOpacity).toBe(pointerEventToTest);
    expect(actualImgOpacity).toBe(pointerEventToTest);
  });
});
