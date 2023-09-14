import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { of } from 'rxjs';
import { TypedAnimatedTextComponent } from '../../utilities/typed-animated-text/typed-animated-text.component';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { LanguageService } from 'src/app/services/language/language.service';
import { TextService } from 'src/app/services/db/text/text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { DebugElement } from '@angular/core';
import { FooterComponent } from './footer.component';

describe('BannerComponent - dom integration', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let componentInstance: FooterComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const retrievedFooterText = 'test footer text';
  const expectedFooterText = retrievedFooterText + ' - ';
  const expectedFooterLink = 'test footer link';
  const expectedFooterHref = 'https://www.' + expectedFooterLink;

  const expectedFooterTextDto = of({ message: retrievedFooterText });
  const expectedFooterLinkDto = of({ message: expectedFooterLink });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    httpClientSpy.get.and.returnValues(
      expectedFooterTextDto,
      expectedFooterLinkDto
    );
  });

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance).toBeTruthy();
  };

  const shouldHaveContentSetByServiceExpectation =
    'should have content set by textService';
  const shouldHaveContentSetByService = () => {
    const debugEl: DebugElement = fixture.debugElement;

    // section
    const sectionEl = debugEl.children[1];
    const sectionDivEl = sectionEl.children[0];
    const sectionFooterEl = sectionDivEl.children[0];
    const sectionPEl = sectionFooterEl.children[0];
    expect(sectionPEl.children.length).toBe(2);
    expect(sectionPEl.children[0].nativeElement.tagName).toBe('SPAN');
    expect(sectionPEl.children[1].nativeElement.tagName).toBe('A');

    const spanEl = sectionPEl.children[0];
    const aEl = sectionPEl.children[1];

    const actualText = spanEl.nativeElement.innerHTML;
    expect(actualText).toBe(expectedFooterText);

    const actualLink = aEl.nativeElement.innerHTML;
    expect(actualLink).toBe(expectedFooterLink);

    const actualHref = aEl.attributes['href'];
    expect(actualHref).toBe(expectedFooterHref);
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          FooterComponent,
          TypedAnimatedTextComponent,
          ImgLoadDirective,
        ],
        providers: [
          LanguageService,
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(FooterComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          FooterComponent,
          TypedAnimatedTextComponent,
          ImgLoadDirective,
        ],
        providers: [
          LanguageService,
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(FooterComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          FooterComponent,
          TypedAnimatedTextComponent,
          ImgLoadDirective,
        ],
        providers: [
          LanguageService,
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(FooterComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });
});
