import { TestBed } from '@angular/core/testing';

import { WindowResizeService } from './window-resize.service';
import { PLATFORM_ID } from '@angular/core';
import { EMPTY } from 'rxjs';

let windowResizeService: WindowResizeService;

describe('WindowResizeService - unit', () => {
  const shouldBeDefinedExpectation =
    'should be defined and have a defined scroll property';
  const shouldBeDefined = () => {
    expect(windowResizeService)
      .withContext('service should create')
      .toEqual(jasmine.anything());
    expect(windowResizeService.resize)
      .withContext('resize property should create')
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
      windowResizeService = TestBed.inject(WindowResizeService);
    });
    it(shouldBeDefinedExpectation, shouldBeDefined);
    describe('resize property', () => {
      it('should be an observable sending the width and height values', () => {
        const resizeEvent = new CustomEvent('resize', {
          bubbles: false,
          cancelable: false,
          detail: null,
        });

        document.body.style.minHeight = '1000px';
        document.body.style.height = 'auto !important;';

        const expectedWidth = 2345;
        const expectedHeight = 1234;

        window.innerWidth = expectedWidth;
        window.innerHeight = expectedHeight;
        dispatchEvent(resizeEvent);

        windowResizeService.resize.subscribe((v) => {
          expect(v)
            .withContext(
              'emitted value should be the expected width and height value'
            )
            .toEqual([expectedWidth, expectedHeight]);
        });

        window.innerWidth = expectedWidth;
        window.innerHeight = expectedHeight;
        dispatchEvent(resizeEvent);
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
      windowResizeService = TestBed.inject(WindowResizeService);
    });
    it(shouldBeDefinedExpectation, shouldBeDefined);
    describe('scroll property', () => {
      it('should be the EMPTY observable', () => {
        expect(windowResizeService.resize)
          .withContext('resize observable should be EMPTY')
          .toBe(EMPTY);
      });
    });
  });
});
