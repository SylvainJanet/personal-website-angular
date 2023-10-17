import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { TypedAnimatedTextComponent } from '../../utilities/typed-animated-text/typed-animated-text.component';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ImageService } from 'src/app/services/image/image.service';
import { DebugElement } from '@angular/core';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';

describe('BannerComponent - dom unit', () => {
  let fixture: ComponentFixture<BannerComponent>;
  let componentInstance: BannerComponent;
  let preloaderServiceSpy: jasmine.SpyObj<PreloaderService>;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const expectedFsDev = 'test fs dev';
  const expectedTrainer = 'test trainer';
  const expectedMath = 'test math';
  const expectedMusic = 'test music';
  const expectedTitle = 'test title';

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
    textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
    textServiceSpy.getMulti.and.returnValues(
      of([
        expectedFsDev,
        expectedTrainer,
        expectedMath,
        expectedMusic,
        expectedTitle,
      ])
    );

    TestBed.configureTestingModule({
      imports: [BannerComponent, TypedAnimatedTextComponent, ImgLoadDirective],
      providers: [
        { provide: PreloaderService, useValue: preloaderServiceSpy },
        {
          provide: VisibleToLoadTextService,
          useValue: visibleToLoadTextServiceSpy,
        },
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    }).compileComponents();
  }));

  describe('constructor', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(BannerComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(componentInstance)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    });
  });

  describe('DOM', () => {
    beforeEach(() => {
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(true);
      preloaderServiceSpy.isLoading.and.returnValue(false);
      fixture = TestBed.createComponent(BannerComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should have proper dom structure', () => {
      // loaded
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      expect(debugEl.children.length).withContext('1 child at root').toBe(1);
      expect(debugEl.children[0].nativeElement.tagName)
        .withContext('child 1 at root is DIV')
        .toBe('DIV');

      const firstDivEl: DebugElement = debugEl.children[0];

      expect(firstDivEl.children.length)
        .withContext('main DIV should have 2 children')
        .toBe(2);
      expect(firstDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of main DIV is DIV')
        .toBe('DIV');
      expect(firstDivEl.children[1].nativeElement.tagName)
        .withContext('child 2 of main DIV is DIV')
        .toBe('DIV');

      // img
      const imgDivEl = firstDivEl.children[0];
      expect(imgDivEl.children.length)
        .withContext('main DIV - first DIV child - should have 1 child')
        .toBe(1);
      expect(imgDivEl.children[0].nativeElement.tagName)
        .withContext('child 1 of main DIV - first DIV child - is IMG')
        .toBe('IMG');

      // banner
      const bannerDiv = firstDivEl.children[1];
      expect(bannerDiv.children.length)
        .withContext('main DIV - second DIV child - should have 1 child')
        .toBe(1);
      expect(bannerDiv.children[0].nativeElement.tagName)
        .withContext('child 1 of main DIV - second DIV child - is DIV')
        .toBe('DIV');
      const bannerContainerDiv = bannerDiv.children[0];
      expect(bannerContainerDiv.children.length)
        .withContext('bannerContainerDiv should have 1 child')
        .toBe(1);
      expect(bannerContainerDiv.children[0].nativeElement.tagName)
        .withContext('child 1 of bannerContainerDiv is DIV')
        .toBe('DIV');
      const bannerPageTitleDiv = bannerContainerDiv.children[0];
      expect(bannerPageTitleDiv.children.length)
        .withContext('bannerPageTitleDiv should have 1 child')
        .toBe(1);
      expect(bannerPageTitleDiv.children[0].nativeElement.tagName)
        .withContext('child 1 of bannerPageTitleDiv is DIV')
        .toBe('DIV');
      const bannerPageTitleDivDiv = bannerPageTitleDiv.children[0];
      expect(bannerPageTitleDivDiv.children.length)
        .withContext('bannerPageTitleDivDiv should have 1 child')
        .toBe(1);
      expect(bannerPageTitleDivDiv.children[0].nativeElement.tagName)
        .withContext('child 1 of bannerPageTitleDivDiv is H2')
        .toBe('H2');
      const bannerH2Div = bannerPageTitleDivDiv.children[0];
      expect(bannerH2Div.children.length)
        .withContext('bannerH2Div should have 2 children')
        .toBe(2);
      expect(bannerH2Div.children[0].nativeElement.tagName)
        .withContext('child 1 of bannerH2Div is SPAN')
        .toBe('SPAN');
      expect(bannerH2Div.children[1].nativeElement.tagName)
        .withContext('child 2 of bannerH2Div is APP-TYPED-ANIMATED-TEXT')
        .toBe('APP-TYPED-ANIMATED-TEXT');

      const bannerSpan = bannerH2Div.children[0];
      expect(bannerSpan.children.length)
        .withContext('bannerSpan should have 0 children')
        .toBe(0);

      //loading
      visibleToLoadTextServiceSpy.hasTextLoaded.and.returnValue(false);
      preloaderServiceSpy.isLoading.and.returnValue(true);
      fixture.detectChanges();

      const debugElLoading: DebugElement = fixture.debugElement;

      expect(debugElLoading.children.length)
        .withContext('1 child at root')
        .toBe(1);
      expect(debugElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 at root is DIV')
        .toBe('DIV');

      const firstDivElLoading: DebugElement = debugElLoading.children[0];

      expect(firstDivElLoading.children.length)
        .withContext('main DIV should have 2 children')
        .toBe(2);
      expect(firstDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of main DIV is DIV')
        .toBe('DIV');
      expect(firstDivElLoading.children[1].nativeElement.tagName)
        .withContext('child 2 of main DIV is DIV')
        .toBe('DIV');

      // img
      const imgDivElLoading = firstDivEl.children[0];
      expect(imgDivElLoading.children.length)
        .withContext('main DIV - first DIV child - should have 1 child')
        .toBe(1);
      expect(imgDivElLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of main DIV - first DIV child - is IMG')
        .toBe('IMG');

      // banner
      const bannerDivLoading = firstDivElLoading.children[1];
      expect(bannerDivLoading.children.length)
        .withContext('main DIV - second DIV child - should have 1 child')
        .toBe(1);
      expect(bannerDivLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of main DIV - second DIV child - is DIV')
        .toBe('DIV');
      const bannerContainerDivLoading = bannerDivLoading.children[0];
      expect(bannerContainerDivLoading.children.length)
        .withContext('bannerContainerDiv should have 1 child')
        .toBe(1);
      expect(bannerContainerDivLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of bannerContainerDiv is DIV')
        .toBe('DIV');
      const bannerPageTitleDivLoading = bannerContainerDivLoading.children[0];
      expect(bannerPageTitleDivLoading.children.length)
        .withContext('bannerPageTitleDiv should have 1 child')
        .toBe(1);
      expect(bannerPageTitleDivLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of bannerPageTitleDiv is DIV')
        .toBe('DIV');
      const bannerPageTitleDivDivLoading =
        bannerPageTitleDivLoading.children[0];
      expect(bannerPageTitleDivDivLoading.children.length)
        .withContext('bannerPageTitleDivDiv should have 2 children')
        .toBe(2);
      expect(bannerPageTitleDivDivLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of bannerPageTitleDivDiv is MAT-PROGRESS-SPINNER')
        .toBe('MAT-PROGRESS-SPINNER');
      expect(bannerPageTitleDivDivLoading.children[1].nativeElement.tagName)
        .withContext('child 2 of bannerPageTitleDivDiv is H2')
        .toBe('H2');
      const bannerH2DivLoading = bannerPageTitleDivDivLoading.children[1];
      expect(bannerH2DivLoading.children.length)
        .withContext('bannerH2Div should have 2 children')
        .toBe(2);
      expect(bannerH2DivLoading.children[0].nativeElement.tagName)
        .withContext('child 1 of bannerH2Div is SPAN')
        .toBe('SPAN');
      expect(bannerH2DivLoading.children[1].nativeElement.tagName)
        .withContext('child 2 of bannerH2Div is APP-TYPED-ANIMATED-TEXT')
        .toBe('APP-TYPED-ANIMATED-TEXT');

      const bannerSpanLoading = bannerH2DivLoading.children[0];
      expect(bannerSpanLoading.children.length)
        .withContext('bannerSpan should have 0 children')
        .toBe(0);
    });

    it('should set title', () => {
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];

      // banner
      const bannerDiv = firstDivEl.children[1];
      const bannerContainerDiv = bannerDiv.children[0];
      const bannerPageTitleDiv = bannerContainerDiv.children[0];
      const bannerPageTitleDivDiv = bannerPageTitleDiv.children[0];
      const bannerH2Div = bannerPageTitleDivDiv.children[0];
      const bannerSpan = bannerH2Div.children[0];

      const actual = bannerSpan.nativeElement.innerHTML;

      expect(actual).withContext('title should be set').toBe(expectedTitle);
    });

    it('should set messages', () => {
      componentInstance.updateTexts();
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];

      // banner
      const bannerDiv = firstDivEl.children[1];
      const bannerContainerDiv = bannerDiv.children[0];
      const bannerPageTitleDiv = bannerContainerDiv.children[0];
      const bannerPageTitleDivDiv = bannerPageTitleDiv.children[0];
      const bannerH2Div = bannerPageTitleDivDiv.children[0];
      const bannerTypedAnimatedText = bannerH2Div.children[1];

      const instance: TypedAnimatedTextComponent =
        bannerTypedAnimatedText.componentInstance;
      const actual = instance.inputArray;

      expect(actual.length).withContext('there should be 4 messages').toBe(4);
      actual[0].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 1')
          .toBe(expectedFsDev);
      });
      actual[1].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 2')
          .toBe(expectedTrainer);
      });
      actual[2].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 3')
          .toBe(expectedMath);
      });
      actual[3].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 4')
          .toBe(expectedMusic);
      });
    });

    it('should not hide img at first', () => {
      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];
      const imgDivEl = firstDivEl.children[0];

      const actual = imgDivEl.styles['display'];
      expect(actual).withContext("display should be 'block'").toBe('block');
    });

    it('should call onDoubleImgLoad when img is loaded', () => {
      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];
      const imgDivEl = firstDivEl.children[0];

      const imgEl = imgDivEl.children[0];
      spyOn(componentInstance, 'onDoubleImgLoad');
      imgEl.triggerEventHandler('load');

      expect(componentInstance.onDoubleImgLoad)
        .withContext('onDoubleImgLoad should have been called')
        .toHaveBeenCalled();
    });

    it('should hide img once loaded', () => {
      const debugEl: DebugElement = fixture.debugElement;
      const firstDivEl: DebugElement = debugEl.children[0];
      const imgDivEl = firstDivEl.children[0];

      const imgEl = imgDivEl.children[0];
      imgEl.triggerEventHandler('load');
      fixture.detectChanges();

      const actual = imgDivEl.styles['display'];
      expect(actual).withContext("display should be 'none'").toBe('none');
    });
  });
});
