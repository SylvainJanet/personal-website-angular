import { TextService } from 'src/app/services/db/text/text.service';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Preloaders } from 'src/app/services/preloader/preloaders/preloaders';
import { FooterComponent } from './footer.component';
import { ENV } from 'src/environments/injectionToken/environment-provider';
import { environment as developmentEnvironment } from 'src/environments/environment';
import { environment as stagingEnvironment } from 'src/environments/environment.staging';
import { environment as productionEnvironment } from 'src/environments/environment.prod';
import { VisibleToLoadTextService } from 'src/app/services/visibletoloadtext/visible-to-load-text.service';
import { ElementRef } from '@angular/core';

const devEnv = developmentEnvironment;
const stagingEnv = stagingEnvironment;
const prodEnv = productionEnvironment;

describe('FooterComponent - unit', () => {
  let component: FooterComponent;
  let visibleToLoadTextServiceSpy: jasmine.SpyObj<VisibleToLoadTextService>;
  let textServiceSpy: jasmine.SpyObj<TextService>;

  const expectedBannerUrl = '/assets/img/overlay-bg.jpg';
  const retrievedFooterText = 'test footer text';
  const expectedFooterText = retrievedFooterText + ' - ';
  const expectedFooterLink = 'test footer link';
  const expectedFooterHref = 'https://www.' + expectedFooterLink;

  const footerTextSelector = 'sylvain-janet';
  const footerLinkSelector = 'website';

  describe('constructor', () => {
    const shouldCreateExpectation = 'should create';
    const shouldCreate = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
    };

    const shouldSetDefaultValuesExpectation = 'should set default values';
    const shouldSetDefaultValues = () => {
      expect(component)
        .withContext('component should create')
        .toEqual(jasmine.anything());
      expect(component.preloaders)
        .withContext('preloaders should be set')
        .toEqual([Preloaders.MAIN]);

      expect(component.doubleImgDisplay)
        .withContext('doubleImgDisplay should be set')
        .toBe('block');
      component.footerText.subscribe((s) => {
        expect(s).withContext('footerText should be set').toBe('');
      });
      component.footerLink.subscribe((s) => {
        expect(s).withContext('footerLink should be set').toBe('');
      });
      component.footerHref.subscribe((s) => {
        expect(s).withContext('footerHref should be set').toBe('');
      });

      expect(component.footerSrc)
        .withContext('footerSrc should be set')
        .toEqual(expectedBannerUrl);
    };

    const shouldSubscribeToVisibleToLoadTextServiceExpectation =
      'should subscribe to the languageService';
    const shouldSubscribeToVisibleToLoadTextService = (done: DoneFn) => {
      setTimeout(() => {
        expect(visibleToLoadTextServiceSpy.subscribe)
          .withContext('subscribe should have been called')
          .toHaveBeenCalledOnceWith(component);
        done();
      });
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        spyOn(FooterComponent.prototype, 'updateTexts');
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        spyOn(FooterComponent.prototype, 'updateTexts');
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        spyOn(FooterComponent.prototype, 'updateTexts');
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(shouldCreateExpectation, shouldCreate);
      it(shouldSetDefaultValuesExpectation, shouldSetDefaultValues);
      it(
        shouldSubscribeToVisibleToLoadTextServiceExpectation,
        shouldSubscribeToVisibleToLoadTextService
      );
    });
  });

  describe('updateTexts', () => {
    const shouldCallTextServiceExpectation = 'should call the textService';
    const shouldCallTextService = () => {
      component.updateTexts();

      expect(textServiceSpy.getMulti)
        .withContext(
          'getMulti should have been called 1 time with proper arguments'
        )
        .toHaveBeenCalledOnceWith([footerTextSelector, footerLinkSelector]);
    };

    const shouldSetPropertiesToTextServiceResultExpectation =
      'should set the properties to the textService result';
    const shouldSetPropertiesToTextServiceResult = () => {
      component.updateTexts();

      const actualFooterText = component.footerText;
      const actualFooterLink = component.footerLink;
      const actualFooterHref = component.footerHref;

      actualFooterText.subscribe((s) => {
        expect(s)
          .withContext('footerText should be set')
          .toBe(expectedFooterText);
      });
      actualFooterLink.subscribe((s) => {
        expect(s)
          .withContext('footerLink should be set')
          .toBe(expectedFooterLink);
      });
      actualFooterHref.subscribe((s) => {
        expect(s)
          .withContext('footerHref should be set')
          .toBe(expectedFooterHref);
      });
    };

    const shouldCallVisibleToLoadTextServiceExpectation =
      'should call the visibleToLoadTextService';
    const shouldCallVisibleToLoadTextService = () => {
      component.updateTexts();

      expect(visibleToLoadTextServiceSpy.textLoaded)
        .withContext('should call the service')
        .toHaveBeenCalledOnceWith(component);
    };

    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTextServiceResultExpectation,
        shouldSetPropertiesToTextServiceResult
      );
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTextServiceResultExpectation,
        shouldSetPropertiesToTextServiceResult
      );
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe', 'textLoaded']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(shouldCallTextServiceExpectation, shouldCallTextService);
      it(
        shouldSetPropertiesToTextServiceResultExpectation,
        shouldSetPropertiesToTextServiceResult
      );
      it(
        shouldCallVisibleToLoadTextServiceExpectation,
        shouldCallVisibleToLoadTextService
      );
    });
  });

  describe('ngOnDestroy', () => {
    const shouldUnsubscribeFromLanguageServiceExpectation =
      'should unsubscribe from the languageService';
    const shouldUnsubscribeFromLanguageService = () => {
      component.ngOnDestroy();
      expect(visibleToLoadTextServiceSpy.unsubscribe)
        .withContext('unsubscribe should have been called')
        .toHaveBeenCalledOnceWith(component);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(
        shouldUnsubscribeFromLanguageServiceExpectation,
        shouldUnsubscribeFromLanguageService
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(
        shouldUnsubscribeFromLanguageServiceExpectation,
        shouldUnsubscribeFromLanguageService
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(
        shouldUnsubscribeFromLanguageServiceExpectation,
        shouldUnsubscribeFromLanguageService
      );
    });
  });

  describe('onDoubleImgLoad method', () => {
    const shouldSetDoubleImgDisplayToNoneExpectation =
      "should set doubleImgDisplay to 'none'";
    const shouldSetDoubleImgDisplayToNone = () => {
      component.onDoubleImgLoad();

      expect(component.doubleImgDisplay)
        .withContext("doubleImgDisplay should be 'none'")
        .toBe('none');
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(
        shouldSetDoubleImgDisplayToNoneExpectation,
        shouldSetDoubleImgDisplayToNone
      );
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(
        shouldSetDoubleImgDisplayToNoneExpectation,
        shouldSetDoubleImgDisplayToNone
      );
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        textServiceSpy.getMulti.and.returnValues(
          of([retrievedFooterText, expectedFooterLink])
        );
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });
        component = TestBed.inject(FooterComponent);
      });
      it(
        shouldSetDoubleImgDisplayToNoneExpectation,
        shouldSetDoubleImgDisplayToNone
      );
    });
  });

  describe('getElement', () => {
    const shouldReturnElementExpectation = 'should return the element';
    const shouldReturnElement = () => {
      const expected = new ElementRef(document.createElement('section'));
      component.mainSection = expected;

      const actual = component.getElement();

      expect(actual).toEqual(jasmine.anything());
      expect(actual).toEqual(expected);
    };
    describe('in dev environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: devEnv },
          ],
        });

        component = TestBed.inject(FooterComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
    describe('in staging environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: stagingEnv },
          ],
        });

        component = TestBed.inject(FooterComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
    describe('in prod environment', () => {
      beforeEach(() => {
        visibleToLoadTextServiceSpy = jasmine.createSpyObj(
          'VisibleToLoadTextService',
          ['subscribe', 'unsubscribe']
        );
        textServiceSpy = jasmine.createSpyObj('TextService', ['getMulti']);
        TestBed.configureTestingModule({
          providers: [
            FooterComponent,
            {
              provide: VisibleToLoadTextService,
              useValue: visibleToLoadTextServiceSpy,
            },
            { provide: TextService, useValue: textServiceSpy },
            { provide: ENV, useValue: prodEnv },
          ],
        });

        component = TestBed.inject(FooterComponent);
      });
      it(shouldReturnElementExpectation, shouldReturnElement);
    });
  });
});
