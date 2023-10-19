import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TextService } from 'src/app/services/db/text/text.service';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { FooterComponent } from './footer.component';

describe('FooterComponent - integration', () => {
  let component: FooterComponent;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const devEnv = developmentEnvironment;
  const stagingEnv = stagingEnvironment;
  const prodEnv = productionEnvironment;

  const retrievedFooterText = 'test footer text';
  const expectedFooterText = retrievedFooterText + ' - ';
  const expectedFooterLink = 'test footer link';
  const expectedFooterHref = 'https://www.' + expectedFooterLink;

  const expectedMessagesDto = of({
    messages: [retrievedFooterText, expectedFooterLink],
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValues(expectedMessagesDto);
  });
  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
    });
  });
  describe('updateTexts', () => {
    const shouldSetPropertiesTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesTextServiceResult = () => {
      component.updateTexts();

      const actualText = component.footerText;
      const actualLink = component.footerLink;
      const actualFooterHref = component.footerHref;

      actualText.subscribe((s) => {
        expect(s)
          .withContext('footer text should be set')
          .toBe(expectedFooterText);
      });
      actualLink.subscribe((s) => {
        expect(s)
          .withContext('footer link should be set')
          .toBe(expectedFooterLink);
      });
      actualFooterHref.subscribe((s) => {
        expect(s)
          .withContext('footer href should be set')
          .toBe(expectedFooterHref);
      });
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
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
            FooterComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
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
            FooterComponent,
            TextService,
            { provide: HttpClient, useValue: httpClientSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(
        shouldSetPropertiesTextServiceResultExpectation,
        shouldSetPropertiesTextServiceResult
      );
    });
  });
});
