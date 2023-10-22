import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CvContactInfoComponent } from './cv-contact-info.component';
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

describe('CvContactInfoComponent - dom integration', () => {
  let fixture: ComponentFixture<CvContactInfoComponent>;
  let componentInstance: CvContactInfoComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;
  const expectedName = 'test name';
  const expectedSj = 'test sj';
  const expectedProfile = 'test profile';
  const expectedFsDev = 'test fsDev';
  const expectedEmail = 'test email';
  const expectedPhone = 'test phone';
  const expectedEmailAddress = 'contact@sylvainjanet.fr';
  const expectedPhoneNumber = '06&nbsp;62&nbsp;02&nbsp;14&nbsp;12';
  beforeEach(() => {
    const expectedMessagesDto = of({
      messages: [
        expectedName,
        expectedSj,
        expectedProfile,
        expectedFsDev,
        expectedEmail,
        expectedPhone,
      ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(expectedMessagesDto);
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

    setTimeout(() => {
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      const firstDivEl: DebugElement = debugEl.children[0];

      let pEl: DebugElement = firstDivEl.children[0];
      expect(pEl.children.length)
        .withContext('p should have 2 children - 1')
        .toBe(2);
      expect(pEl.children[0].nativeElement.innerHTML)
        .withContext('name should be set')
        .toBe(expectedName + ': ');
      expect(pEl.children[1].nativeElement.innerHTML)
        .withContext('sj should be set')
        .toBe(expectedSj);

      pEl = firstDivEl.children[1];
      expect(pEl.children.length)
        .withContext('p should have 2 children - 2')
        .toBe(2);
      expect(pEl.children[0].nativeElement.innerHTML)
        .withContext('profile should be set')
        .toBe(expectedProfile + ': ');
      expect(pEl.children[1].nativeElement.innerHTML)
        .withContext('fsdev should be set')
        .toBe(expectedFsDev);

      pEl = firstDivEl.children[2];
      expect(pEl.children.length)
        .withContext('p should have 2 children - 3')
        .toBe(2);
      expect(pEl.children[0].nativeElement.innerHTML)
        .withContext('email should be set')
        .toBe(expectedEmail + ': ');
      expect(pEl.children[1].nativeElement.innerHTML)
        .withContext('email address should be set')
        .toBe(expectedEmailAddress);

      pEl = firstDivEl.children[3];
      expect(pEl.children.length)
        .withContext('p should have 2 children - 4')
        .toBe(2);
      expect(pEl.children[0].nativeElement.innerHTML)
        .withContext('phone should be set')
        .toBe(expectedPhone + ': ');
      expect(pEl.children[1].nativeElement.innerHTML)
        .withContext('phone number should be set')
        .toBe(expectedPhoneNumber);

      done();
    }, 2);
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvContactInfoComponent],
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
      fixture = TestBed.createComponent(CvContactInfoComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvContactInfoComponent],
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
      fixture = TestBed.createComponent(CvContactInfoComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CvContactInfoComponent],
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
      fixture = TestBed.createComponent(CvContactInfoComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });
});
