import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { CvImgComponent } from './cv-img.component';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ImageService } from 'src/app/services/image/image.service';

describe('CvImgComponent - dom unit', () => {
  let fixture: ComponentFixture<CvImgComponent>;
  let componentInstance: CvImgComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  const expectedAltText = 'test alt text';

  beforeEach(waitForAsync(() => {
    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'subscribe',
      'unsubscribe',
    ]);
    textServiceSpy = jasmine.createSpyObj('TextService', ['get']);
    imageServiceSpy = jasmine.createSpyObj('ImageService', [
      'imageLoading',
      'imageLoadedOrError',
    ]);

    const altTextObs = of(expectedAltText);
    textServiceSpy.get.and.returnValues(altTextObs);
    TestBed.configureTestingModule({
      declarations: [CvImgComponent, ImgLoadDirective],
      providers: [
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvImgComponent);
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

    expect(firstDivEl.children.length).toBe(1);
    expect(firstDivEl.children[0].nativeElement.tagName).toBe('IMG');
  });

  it('should have proper class', () => {
    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    const actual = firstDivEl.classes['about-img'];
    expect(actual).toBe(true);
  });
  it('should have proper src', () => {
    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    const imgEl: DebugElement = firstDivEl.children[0];

    const actual = imgEl.properties['src'] as string;
    expect(actual.endsWith('assets/img/cv-pic.jpg')).toBe(true);
  });
  it('should use appImgLoad directive with preloaders', () => {
    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    const imgEl: DebugElement = firstDivEl.children[0];

    const dir = imgEl.injector.get(ImgLoadDirective);
    expect(dir.appImgLoad).toEqual(componentInstance.preloaders);
  });

  it('should have altText set by textService', () => {
    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    const imgEl: DebugElement = firstDivEl.children[0];

    const actual = imgEl.properties['alt'];
    expect(actual).toBe(expectedAltText);
  });
});
