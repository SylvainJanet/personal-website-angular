import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { ImageService } from 'src/app/services/image/image.service';
import { DebugElement } from '@angular/core';
import { FooterComponent } from './footer.component';

describe('FooterComponent - dom unit', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let componentInstance: FooterComponent;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const retrievedFooterText = 'test footer text';
  const expectedFooterText = retrievedFooterText + ' - ';
  const expectedFooterLink = 'test footer link';
  const expectedFooterHref = 'https://www.' + expectedFooterLink;

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
      of(retrievedFooterText),
      of(expectedFooterLink)
    );

    TestBed.configureTestingModule({
      declarations: [FooterComponent, ImgLoadDirective],
      providers: [
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: TextService, useValue: textServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  });

  it('should have proper dom structure', () => {
    const debugEl: DebugElement = fixture.debugElement;

    expect(debugEl.children.length).toBe(2);
    expect(debugEl.children[0].nativeElement.tagName).toBe('DIV');
    expect(debugEl.children[1].nativeElement.tagName).toBe('SECTION');

    // img
    const imgDivEl = debugEl.children[0];
    expect(imgDivEl.children.length).toBe(1);
    expect(imgDivEl.children[0].nativeElement.tagName).toBe('IMG');

    // section
    const sectionEl = debugEl.children[1];
    expect(sectionEl.children.length).toBe(1);
    expect(sectionEl.children[0].nativeElement.tagName).toBe('DIV');

    const sectionDivEl = sectionEl.children[0];
    expect(sectionDivEl.children.length).toBe(1);
    expect(sectionDivEl.children[0].nativeElement.tagName).toBe('FOOTER');

    const sectionFooterEl = sectionDivEl.children[0];
    expect(sectionFooterEl.children.length).toBe(1);
    expect(sectionFooterEl.children[0].nativeElement.tagName).toBe('P');

    const sectionPEl = sectionFooterEl.children[0];
    expect(sectionPEl.children.length).toBe(2);
    expect(sectionPEl.children[0].nativeElement.tagName).toBe('SPAN');
    expect(sectionPEl.children[1].nativeElement.tagName).toBe('A');
  });

  it('should set footer text', () => {
    const debugEl: DebugElement = fixture.debugElement;

    // section
    const sectionEl = debugEl.children[1];
    const sectionDivEl = sectionEl.children[0];
    const sectionFooterEl = sectionDivEl.children[0];
    const sectionPEl = sectionFooterEl.children[0];
    const spanEl = sectionPEl.children[0];

    const actual = spanEl.nativeElement.innerHTML;
    expect(actual).toBe(expectedFooterText);
  });

  it('should set footer link', () => {
    const debugEl: DebugElement = fixture.debugElement;

    // section
    const sectionEl = debugEl.children[1];
    const sectionDivEl = sectionEl.children[0];
    const sectionFooterEl = sectionDivEl.children[0];
    const sectionPEl = sectionFooterEl.children[0];
    const aEl = sectionPEl.children[1];

    const actualText = aEl.nativeElement.innerHTML;
    expect(actualText).toBe(expectedFooterLink);
    const actualHref = aEl.attributes['href'];
    expect(actualHref).toBe(expectedFooterHref);
  });

  it('should not hide img at first', () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];

    const actual = firstDivEl.styles['display'];
    expect(actual).toBe('block');
  });

  it('should call onDoubleImgLoad when img is loaded', () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];
    const imgEl = firstDivEl.children[0];

    spyOn(componentInstance, 'onDoubleImgLoad');
    imgEl.triggerEventHandler('load');

    expect(componentInstance.onDoubleImgLoad).toHaveBeenCalled();
  });

  it('should hide img once loaded', () => {
    const debugEl: DebugElement = fixture.debugElement;
    const firstDivEl: DebugElement = debugEl.children[0];

    const imgEl = firstDivEl.children[0];
    imgEl.triggerEventHandler('load');
    fixture.detectChanges();

    const actual = firstDivEl.styles['display'];
    expect(actual).toBe('none');
  });
});
