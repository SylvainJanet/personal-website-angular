import { TestBed } from '@angular/core/testing';
import { WindowScrollService } from './window-scroll.service';
import { PLATFORM_ID } from '@angular/core';
import { EMPTY } from 'rxjs';

let service: WindowScrollService;

describe('WindowScrollService - unit', () => {
  const shouldBeDefinedExpectation =
    'should be defined and have a defined scroll property';
  const shouldBeDefined = () => {
    expect(service)
      .withContext('service should create')
      .toEqual(jasmine.anything());
    expect(service.scroll)
      .withContext('scroll property should create')
      .toEqual(jasmine.anything());
  };

  describe('on browser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: PLATFORM_ID,
            useValue: 'browser',
          },
        ],
      });
      service = TestBed.inject(WindowScrollService);
    });
    it(shouldBeDefinedExpectation, shouldBeDefined);
    describe('scroll property', () => {
      it('should be an observable sending the scrollY values', () => {
        const scrollEvent = new CustomEvent('scroll', {
          bubbles: false,
          cancelable: false,
          detail: null,
        });

        document.body.style.minHeight = '1000px';
        document.body.style.height = 'auto !important;';

        const expectedScrollValue = 123;
        window.scrollY = expectedScrollValue;
        dispatchEvent(scrollEvent);

        const withScrollY = service.scroll.subscribe((v) => {
          expect(v)
            .withContext('emitted value should be the expected scrollY value')
            .toBe(expectedScrollValue);
        });

        window.scrollY = expectedScrollValue;
        dispatchEvent(scrollEvent);

        withScrollY.unsubscribe();

        const nullScrollValue = 0;
        const expectedScrollTopValue = 12;
        window.scrollY = nullScrollValue;
        document.documentElement.scrollTop = expectedScrollTopValue;
        dispatchEvent(scrollEvent);

        const withScrollTop = service.scroll.subscribe((v) => {
          expect(v)
            .withContext('emitted value should be the expected scrollTop value')
            .toBe(expectedScrollTopValue);
        });

        window.scrollY = nullScrollValue;
        document.documentElement.scrollTop = expectedScrollTopValue;
        dispatchEvent(scrollEvent);

        withScrollTop.unsubscribe();
      });
    });
  });
  describe('on non browser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: PLATFORM_ID,
            useValue: 'server',
          },
        ],
      });
      service = TestBed.inject(WindowScrollService);
    });
    it(shouldBeDefinedExpectation, shouldBeDefined);
    describe('scroll property', () => {
      it('should be the EMPTY observable', () => {
        expect(service.scroll)
          .withContext('scroll observable should be EMPTY')
          .toBe(EMPTY);
      });
    });
  });
});
