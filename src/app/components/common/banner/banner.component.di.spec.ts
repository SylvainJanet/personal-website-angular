import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
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

describe('BannerComponent - dom integration', () => {
  let fixture: ComponentFixture<BannerComponent>;
  let componentInstance: BannerComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const expectedFsDev = 'test fs dev';
  const expectedTrainer = 'test trainer';
  const expectedMath = 'test math';
  const expectedMusic = 'test music';
  const expectedTitle = 'test title';

  const expectedFsDevDto = of({ message: expectedFsDev });
  const expectedTrainerDto = of({ message: expectedTrainer });
  const expectedMathDto = of({ message: expectedMath });
  const expectedMusicDto = of({ message: expectedMusic });
  const expectedTitleDto = of({ message: expectedTitle });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    httpClientSpy.get.and.returnValues(
      expectedFsDevDto,
      expectedTrainerDto,
      expectedMathDto,
      expectedMusicDto,
      expectedTitleDto
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
    const firstDivEl: DebugElement = debugEl.children[0];

    // banner
    const bannerDiv = firstDivEl.children[1];
    const bannerContainerDiv = bannerDiv.children[0];
    const bannerPageTitleDiv = bannerContainerDiv.children[0];
    const bannerPageTitleDivDiv = bannerPageTitleDiv.children[0];
    const bannerH2Div = bannerPageTitleDivDiv.children[0];
    const bannerSpan = bannerH2Div.children[0];

    const actualTitle = bannerSpan.nativeElement.innerHTML;

    expect(actualTitle).toBe(expectedTitle);

    const bannerTypedAnimatedText = bannerH2Div.children[1];

    const instance: TypedAnimatedTextComponent =
      bannerTypedAnimatedText.componentInstance;
    const actualMessages = instance.inputArray;

    expect(actualMessages.length).toBe(4);
    actualMessages[0].subscribe((s) => {
      expect(s).toBe(expectedFsDev);
    });
    actualMessages[1].subscribe((s) => {
      expect(s).toBe(expectedTrainer);
    });
    actualMessages[2].subscribe((s) => {
      expect(s).toBe(expectedMath);
    });
    actualMessages[3].subscribe((s) => {
      expect(s).toBe(expectedMusic);
    });
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          BannerComponent,
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
      fixture = TestBed.createComponent(BannerComponent);
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
          BannerComponent,
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
      fixture = TestBed.createComponent(BannerComponent);
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
          BannerComponent,
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
      fixture = TestBed.createComponent(BannerComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });
});