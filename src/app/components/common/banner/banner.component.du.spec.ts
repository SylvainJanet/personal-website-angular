import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { TypedAnimatedTextComponent } from '../../utilities/typed-animated-text/typed-animated-text.component';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ImageService } from 'src/app/services/image/image.service';
import { DebugElement } from '@angular/core';

describe('BannerComponent - dom unit', () => {
  let fixture: ComponentFixture<BannerComponent>;
  let componentInstance: BannerComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const expectedFsDev = 'test fs dev';
  const expectedTrainer = 'test trainer';
  const expectedMath = 'test math';
  const expectedMusic = 'test music';
  const expectedTitle = 'test title';

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
    textServiceSpy.get.and.returnValues(
      of(expectedFsDev),
      of(expectedTrainer),
      of(expectedMath),
      of(expectedMusic),
      of(expectedTitle)
    );

    TestBed.configureTestingModule({
      declarations: [
        BannerComponent,
        TypedAnimatedTextComponent,
        ImgLoadDirective,
      ],
      providers: [
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(1);
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');

    const firstDivEl: DebugElement = debugEl.children[0];

    expect(firstDivEl.children.length).toBe(2);
    expect(firstDivEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(firstDivEl.children[1].nativeElement.tagName).toBe('DIV');

    // img
    const imgDivEl = firstDivEl.children[0];
    expect(imgDivEl.children.length).toBe(1);
    expect(imgDivEl.children[0].nativeElement.tagName).toBe('IMG');

    // banner
    const bannerDiv = firstDivEl.children[1];
    expect(bannerDiv.children.length).toBe(1);
    expect(bannerDiv.children[0].nativeElement.tagName).toBe('DIV');
    const bannerContainerDiv = bannerDiv.children[0];
    expect(bannerContainerDiv.children.length).toBe(1);
    expect(bannerContainerDiv.children[0].nativeElement.tagName).toBe('DIV');
    const bannerPageTitleDiv = bannerContainerDiv.children[0];
    expect(bannerPageTitleDiv.children.length).toBe(1);
    expect(bannerPageTitleDiv.children[0].nativeElement.tagName).toBe('DIV');
    const bannerPageTitleDivDiv = bannerPageTitleDiv.children[0];
    expect(bannerPageTitleDivDiv.children.length).toBe(1);
    expect(bannerPageTitleDivDiv.children[0].nativeElement.tagName).toBe('H2');
    const bannerH2Div = bannerPageTitleDivDiv.children[0];
    expect(bannerH2Div.children.length).toBe(2);
    expect(bannerH2Div.children[0].nativeElement.tagName).toBe('SPAN');
    expect(bannerH2Div.children[1].nativeElement.tagName).toBe(
      'APP-TYPED-ANIMATED-TEXT'
    );

    const bannerSpan = bannerH2Div.children[0];
    expect(bannerSpan.children.length).toBe(0);
  });

  it('should set title', () => {
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

    expect(actual).toBe(expectedTitle);
  });

  it('should set messages', () => {
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

    expect(actual.length).toBe(4);
    actual[0].subscribe((s) => {
      expect(s).toBe(expectedFsDev);
    });
    actual[1].subscribe((s) => {
      expect(s).toBe(expectedTrainer);
    });
    actual[2].subscribe((s) => {
      expect(s).toBe(expectedMath);
    });
    actual[3].subscribe((s) => {
      expect(s).toBe(expectedMusic);
    });
  });

  it('should not hide img at first', () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const imgDivEl = firstDivEl.children[0];

    const actual = imgDivEl.styles['display'];
    expect(actual).toBe('block');
  });

  it('should call onDoubleImgLoad when img is loaded', () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const imgDivEl = firstDivEl.children[0];

    const imgEl = imgDivEl.children[0];
    spyOn(componentInstance, 'onDoubleImgLoad');
    imgEl.triggerEventHandler('load');

    expect(componentInstance.onDoubleImgLoad).toHaveBeenCalled();
  });

  it('should hide img once loaded', () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const imgDivEl = firstDivEl.children[0];

    const imgEl = imgDivEl.children[0];
    imgEl.triggerEventHandler('load');
    fixture.detectChanges();

    const actual = imgDivEl.styles['display'];
    expect(actual).toBe('none');
  });
});
