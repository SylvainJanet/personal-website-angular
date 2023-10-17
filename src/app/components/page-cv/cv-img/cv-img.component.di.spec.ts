import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatasourceService } from 'src/app/services/db/datasource/datasource.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { ParagraphDecoderService } from 'src/app/services/paragraphdecoder/paragraph-decoder.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { CvImgComponent } from './cv-img.component';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';

describe('CvImgComponent - dom integration', () => {
  let fixture: ComponentFixture<CvImgComponent>;
  let componentInstance: CvImgComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;
  const expectedAltText = 'test alt text';
  beforeEach(() => {
    const expectedAltTextDto = of({ message: expectedAltText });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValues(expectedAltTextDto);
  });

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  };

  const shouldHaveContentSetByServiceExpectation =
    'should have altText set by textService';
  const shouldHaveContentSetByService = () => {
    componentInstance.updateTexts();
    fixture.detectChanges();

    const debugEl: DebugElement = fixture.debugElement;

    const firstDivEl: DebugElement = debugEl.children[0];

    const imgEl: DebugElement = firstDivEl.children[0];
    expect(imgEl.properties['alt'])
      .withContext('alt should be set')
      .toBe(expectedAltText);
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvImgComponent, ImgLoadDirective],
        providers: [
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          DatasourceService,
          PreloaderService,
          ParagraphDecoderService,
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvImgComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvImgComponent, ImgLoadDirective],
        providers: [
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          DatasourceService,
          PreloaderService,
          ParagraphDecoderService,
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvImgComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvImgComponent, ImgLoadDirective],
        providers: [
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          DatasourceService,
          PreloaderService,
          ParagraphDecoderService,
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CvImgComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });
});
