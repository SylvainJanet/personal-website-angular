import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BackToTopComponent } from './back-to-top.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ImgLoadDirective } from 'src/app/directives/imgLoad/img-load.directive';
import { TextService } from 'src/app/services/db/text/text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { DebugElement } from '@angular/core';

describe('BackToTopComponent - dom integration', () => {
  let fixture: ComponentFixture<BackToTopComponent>;
  let componentInstance: BackToTopComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;
  const expectedBackToTopAlt = 'this is a test';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const expectedBackToTopAltDto = of({ message: expectedBackToTopAlt });
    httpClientSpy.get.and.returnValue(expectedBackToTopAltDto);
  });

  const shouldCreateExpectation = 'should create';
  const shouldCreate = () => {
    expect(componentInstance)
      .withContext('component should create')
      .toEqual(jasmine.anything());
  };

  const shouldHaveContentSetByServiceExpectation =
    'should have content set by textService';
  const shouldHaveContentSetByService = (done: DoneFn) => {
    componentInstance.updateTexts();

    const debugEl: DebugElement = fixture.debugElement;
    const aEl: DebugElement = debugEl.children[0];
    const imgEl: DebugElement = aEl.children[0];

    setTimeout(() => {
      fixture.detectChanges();

      const actual = imgEl.attributes['alt'];
      expect(actual)
        .withContext('alt should be set')
        .toBe(expectedBackToTopAlt);
      done();
    }, 1);
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BackToTopComponent, ImgLoadDirective],
        providers: [
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BackToTopComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BackToTopComponent, ImgLoadDirective],
        providers: [
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BackToTopComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BackToTopComponent, ImgLoadDirective],
        providers: [
          TextService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BackToTopComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });
});
