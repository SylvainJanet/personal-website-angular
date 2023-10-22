import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { LanguageModalComponent } from './language-modal.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { LanguageModalRowComponent } from '../language-modal-row/language-modal-row.component';

describe('LanguageModalComponent - dom integration', () => {
  let fixture: ComponentFixture<LanguageModalComponent>;
  let componentInstance: LanguageModalComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;
  const expectedEnglishName = 'test english name';
  const expectedFrenchName = 'test french name';
  beforeEach(() => {
    const expectedMessageDto1 = of({
      message: expectedEnglishName,
    });
    const expectedMessageDto2 = of({
      message: expectedFrenchName,
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValues(
      expectedMessageDto1,
      expectedMessageDto2
    );
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
    setTimeout(() => {
      fixture.detectChanges();

      const debugEl: DebugElement = fixture.debugElement;

      const modalDivEl: DebugElement = debugEl.children[4];
      const modalContent = modalDivEl.children[0];
      const modalConainer = modalContent.children[0];

      const row1El = modalConainer.children[0];
      const row2El = modalConainer.children[1];

      const row1Comp = row1El.componentInstance as LanguageModalRowComponent;
      const row2Comp = row2El.componentInstance as LanguageModalRowComponent;

      expect(row1Comp.languageName)
        .withContext('english should be set')
        .toBe(expectedEnglishName);
      expect(row2Comp.languageName)
        .withContext('french should be set')
        .toBe(expectedFrenchName);
      done();
    }, 100);
  };

  describe('in dev environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          TextService,
          PreloaderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: devEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(LanguageModalComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in staging environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          TextService,
          PreloaderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: stagingEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(LanguageModalComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });

  describe('in prod environment', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          TextService,
          PreloaderService,
          { provide: HttpClient, useValue: httpClientSpy },
          { provide: ENV, useValue: prodEnv },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(LanguageModalComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
    });
    it(shouldCreateExpectation, shouldCreate);
    it(shouldHaveContentSetByServiceExpectation, shouldHaveContentSetByService);
  });
});
