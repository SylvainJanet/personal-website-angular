import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BannerComponent } from './banner.component';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
describe('BannerComponent - integration', () => {
  let bannerComponent: BannerComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const expectedFsDev = 'test fs dev';
  const expectedTrainer = 'test trainer';
  const expectedMath = 'test math';
  const expectedMusic = 'test music';
  const expectedTitle = 'test title';

  const expectedMessagesDto = of({
    messages: [
      expectedFsDev,
      expectedTrainer,
      expectedMath,
      expectedMusic,
      expectedTitle,
    ],
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValues(expectedMessagesDto);
  });
  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(bannerComponent)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });
  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      bannerComponent.updateTexts();

      const actualMessages = bannerComponent.messages;
      const actualIAmMe = bannerComponent.iAmMe;

      expect(actualMessages.length)
        .withContext('there should be 4 messages')
        .toBe(4);

      actualMessages[0].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 1')
          .toBe(expectedFsDev);
      });
      actualMessages[1].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 2')
          .toBe(expectedTrainer);
      });
      actualMessages[2].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 3')
          .toBe(expectedMath);
      });
      actualMessages[3].subscribe((s) => {
        expect(s)
          .withContext('message should be the correct one - 4')
          .toBe(expectedMusic);
      });
      actualIAmMe.subscribe((s) => {
        expect(s).withContext('iAmMe should be set').toBe(expectedTitle);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            BannerComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        bannerComponent = TestBed.inject(BannerComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
