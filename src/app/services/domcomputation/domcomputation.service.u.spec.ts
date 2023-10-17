import { ElementRef } from '@angular/core';
import { DOMComputationService } from './domcomputation.service';

let domComputationService: DOMComputationService;

describe('DOMComputationService', () => {
  beforeEach(() => {
    domComputationService = new DOMComputationService();
  });

  describe('getActualWidth method', () => {
    it('should return the actual width of an element', () => {
      const elToTest = document.createElement('div');
      document.getElementsByTagName('body').item(0)?.appendChild(elToTest);

      const expected = 50;
      elToTest.style.width = expected.toString() + 'px';
      elToTest.style.paddingLeft = '10px';
      elToTest.style.paddingRight = '10px';
      elToTest.style.borderLeftWidth = '10px';
      elToTest.style.borderRightWidth = '10px';

      const actual = domComputationService.getActualWidth(elToTest);
      expect(actual).withContext('width should be correct - 1').toBe(expected);

      elToTest.style.boxSizing = 'border-box';
      elToTest.style.width = (expected + 20).toString() + 'px';
      elToTest.style.paddingLeft = '10px';
      elToTest.style.paddingRight = '10px';

      const actual2 = domComputationService.getActualWidth(elToTest);
      expect(actual2).withContext('width should be correct - 2').toBe(expected);
    });
  });
  describe('getActualHeight method', () => {
    it('should return the actual width of an element', () => {
      const elToTest = document.createElement('div');
      document.getElementsByTagName('body').item(0)?.appendChild(elToTest);

      const expected = 50;
      elToTest.style.height = expected.toString() + 'px';
      elToTest.style.paddingTop = '10px';
      elToTest.style.paddingBottom = '10px';
      elToTest.style.borderTopWidth = '10px';
      elToTest.style.borderBottomWidth = '10px';

      const actual = domComputationService.getActualHeight(elToTest);
      expect(actual).withContext('width should be correct - 1').toBe(expected);

      elToTest.style.boxSizing = 'border-box';
      elToTest.style.height = (expected + 20).toString() + 'px';
      elToTest.style.paddingTop = '10px';
      elToTest.style.paddingBottom = '10px';

      const actual2 = domComputationService.getActualHeight(elToTest);
      expect(actual2).withContext('width should be correct - 2').toBe(expected);
    });
  });
  describe('isIntoView method', () => {
    it('should return false if the element is falsy', () => {
      const actual = domComputationService.isIntoView(
        {} as ElementRef<HTMLElement>
      );

      expect(actual).withContext('should be false').toBeFalse();
    });
    it("should return false if the element's nativeElement is null or undefined", () => {
      const actual = domComputationService.isIntoView({
        nativeElement: null,
      } as unknown as ElementRef<HTMLElement>);

      expect(actual).withContext('should be false').toBeFalse();
    });
    it('should return true if the top is shown and the left is shown, without buffers', () => {
      const elementSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const nativeElementSpy = jasmine.createSpyObj('HTMLElement', [
        'getBoundingClientRect',
      ]);
      (
        Object.getOwnPropertyDescriptor(elementSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(nativeElementSpy);

      const rectTop = 100;
      const rectBottom = 300;
      const rectLeft = 50;
      const rectRight = 200;

      const oldHeight = window.innerHeight;
      const oldWidth = window.innerWidth;

      window.innerHeight = 200;
      window.innerWidth = 100;
      nativeElementSpy.getBoundingClientRect.and.returnValue({
        top: rectTop,
        bottom: rectBottom,
        left: rectLeft,
        right: rectRight,
      });

      const actual = domComputationService.isIntoView(elementSpy);
      expect(actual).withContext('should be true').toBeTrue();

      window.innerHeight = oldHeight;
      window.innerWidth = oldWidth;
    });
    it('should return true if the top is shown and the right is shown, without buffers', () => {
      const elementSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const nativeElementSpy = jasmine.createSpyObj('HTMLElement', [
        'getBoundingClientRect',
      ]);
      (
        Object.getOwnPropertyDescriptor(elementSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(nativeElementSpy);

      const rectTop = 100;
      const rectBottom = 300;
      const rectLeft = -50;
      const rectRight = 50;

      const oldHeight = window.innerHeight;
      const oldWidth = window.innerWidth;

      window.innerHeight = 200;
      window.innerWidth = 100;
      nativeElementSpy.getBoundingClientRect.and.returnValue({
        top: rectTop,
        bottom: rectBottom,
        left: rectLeft,
        right: rectRight,
      });

      const actual = domComputationService.isIntoView(elementSpy);
      expect(actual).withContext('should be true').toBeTrue();

      window.innerHeight = oldHeight;
      window.innerWidth = oldWidth;
    });
    it('should return true if the bottom is shown and the left is shown, without buffers', () => {
      const elementSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const nativeElementSpy = jasmine.createSpyObj('HTMLElement', [
        'getBoundingClientRect',
      ]);
      (
        Object.getOwnPropertyDescriptor(elementSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(nativeElementSpy);

      const rectTop = -100;
      const rectBottom = 100;
      const rectLeft = 50;
      const rectRight = 200;

      const oldHeight = window.innerHeight;
      const oldWidth = window.innerWidth;

      window.innerHeight = 200;
      window.innerWidth = 100;
      nativeElementSpy.getBoundingClientRect.and.returnValue({
        top: rectTop,
        bottom: rectBottom,
        left: rectLeft,
        right: rectRight,
      });

      const actual = domComputationService.isIntoView(elementSpy);
      expect(actual).withContext('should be true').toBeTrue();

      window.innerHeight = oldHeight;
      window.innerWidth = oldWidth;
    });
    it('should return true if the bottom is shown and the right is shown, without buffers', () => {
      const elementSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const nativeElementSpy = jasmine.createSpyObj('HTMLElement', [
        'getBoundingClientRect',
      ]);
      (
        Object.getOwnPropertyDescriptor(elementSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(nativeElementSpy);

      const rectTop = -100;
      const rectBottom = 100;
      const rectLeft = -50;
      const rectRight = 50;

      const oldHeight = window.innerHeight;
      const oldWidth = window.innerWidth;

      window.innerHeight = 200;
      window.innerWidth = 100;
      nativeElementSpy.getBoundingClientRect.and.returnValue({
        top: rectTop,
        bottom: rectBottom,
        left: rectLeft,
        right: rectRight,
      });

      const actual = domComputationService.isIntoView(elementSpy);
      expect(actual).withContext('should be true').toBeTrue();

      window.innerHeight = oldHeight;
      window.innerWidth = oldWidth;
    });
    it('should return true if the top is shown and the left is shown, with buffers', () => {
      const elementSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const nativeElementSpy = jasmine.createSpyObj('HTMLElement', [
        'getBoundingClientRect',
      ]);
      (
        Object.getOwnPropertyDescriptor(elementSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(nativeElementSpy);

      const rectTop = -100;
      const rectBottom = 300;
      const rectLeft = 150;
      const rectRight = 300;

      const bufferHeight = 2;
      const bufferWidth = 1;

      const oldHeight = window.innerHeight;
      const oldWidth = window.innerWidth;

      window.innerHeight = 200;
      window.innerWidth = 100;
      nativeElementSpy.getBoundingClientRect.and.returnValue({
        top: rectTop,
        bottom: rectBottom,
        left: rectLeft,
        right: rectRight,
      });

      const actual = domComputationService.isIntoView(
        elementSpy,
        bufferHeight,
        bufferWidth
      );
      expect(actual).withContext('should be true').toBeTrue();

      window.innerHeight = oldHeight;
      window.innerWidth = oldWidth;
    });
    it('should return true if the top is shown and the right is shown, with buffers', () => {
      const elementSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const nativeElementSpy = jasmine.createSpyObj('HTMLElement', [
        'getBoundingClientRect',
      ]);
      (
        Object.getOwnPropertyDescriptor(elementSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(nativeElementSpy);

      const rectTop = -100;
      const rectBottom = 300;
      const rectLeft = -150;
      const rectRight = 150;

      const bufferHeight = 2;
      const bufferWidth = 1;

      const oldHeight = window.innerHeight;
      const oldWidth = window.innerWidth;

      window.innerHeight = 200;
      window.innerWidth = 100;
      nativeElementSpy.getBoundingClientRect.and.returnValue({
        top: rectTop,
        bottom: rectBottom,
        left: rectLeft,
        right: rectRight,
      });

      const actual = domComputationService.isIntoView(
        elementSpy,
        bufferHeight,
        bufferWidth
      );
      expect(actual).withContext('should be true').toBeTrue();

      window.innerHeight = oldHeight;
      window.innerWidth = oldWidth;
    });
    it('should return true if the bottom is shown and the left is shown, with buffers', () => {
      const elementSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const nativeElementSpy = jasmine.createSpyObj('HTMLElement', [
        'getBoundingClientRect',
      ]);
      (
        Object.getOwnPropertyDescriptor(elementSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(nativeElementSpy);

      const rectTop = -500;
      const rectBottom = 500;
      const rectLeft = 150;
      const rectRight = 300;

      const bufferHeight = 2;
      const bufferWidth = 1;

      const oldHeight = window.innerHeight;
      const oldWidth = window.innerWidth;

      window.innerHeight = 200;
      window.innerWidth = 100;
      nativeElementSpy.getBoundingClientRect.and.returnValue({
        top: rectTop,
        bottom: rectBottom,
        left: rectLeft,
        right: rectRight,
      });

      const actual = domComputationService.isIntoView(
        elementSpy,
        bufferHeight,
        bufferWidth
      );
      expect(actual).withContext('should be true').toBeTrue();

      window.innerHeight = oldHeight;
      window.innerWidth = oldWidth;
    });
    it('should return true if the bottom is shown and the right is shown, with buffers', () => {
      const elementSpy = jasmine.createSpyObj(
        'ElementRef',
        [],
        ['nativeElement']
      );
      const nativeElementSpy = jasmine.createSpyObj('HTMLElement', [
        'getBoundingClientRect',
      ]);
      (
        Object.getOwnPropertyDescriptor(elementSpy, 'nativeElement')
          ?.get as jasmine.Spy<() => HTMLElement>
      ).and.returnValue(nativeElementSpy);

      const rectTop = -500;
      const rectBottom = 500;
      const rectLeft = -150;
      const rectRight = 150;

      const bufferHeight = 2;
      const bufferWidth = 1;

      const oldHeight = window.innerHeight;
      const oldWidth = window.innerWidth;

      window.innerHeight = 200;
      window.innerWidth = 100;
      nativeElementSpy.getBoundingClientRect.and.returnValue({
        top: rectTop,
        bottom: rectBottom,
        left: rectLeft,
        right: rectRight,
      });

      const actual = domComputationService.isIntoView(
        elementSpy,
        bufferHeight,
        bufferWidth
      );
      expect(actual).withContext('should be true').toBeTrue();

      window.innerHeight = oldHeight;
      window.innerWidth = oldWidth;
    });
  });
});
