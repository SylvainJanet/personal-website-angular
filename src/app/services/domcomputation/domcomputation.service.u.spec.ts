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
      expect(actual).toBe(expected);

      elToTest.style.boxSizing = 'border-box';
      elToTest.style.width = (expected + 20).toString() + 'px';
      elToTest.style.paddingLeft = '10px';
      elToTest.style.paddingRight = '10px';

      const actual2 = domComputationService.getActualWidth(elToTest);
      expect(actual2).toBe(expected);
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
      expect(actual).toBe(expected);

      elToTest.style.boxSizing = 'border-box';
      elToTest.style.height = (expected + 20).toString() + 'px';
      elToTest.style.paddingTop = '10px';
      elToTest.style.paddingBottom = '10px';

      const actual2 = domComputationService.getActualHeight(elToTest);
      expect(actual2).toBe(expected);
    });
  });
});
