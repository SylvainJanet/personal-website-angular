import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { SubParagraph } from '../subparagraph/subParagraph';
import { Paragraph } from './paragraph';

describe('Paragraph', () => {
  describe('constructor', () => {
    const elsToTest = [
      new SubParagraph(SubParagraphRoot.SPAN, 'test'),
      new SubParagraph(SubParagraphRoot.A_ASSET, 'test', 'this/is/a/test'),
    ];
    const cssClassToTest = 'this-is-a-test';
    let paragraph: Paragraph;
    it('should set elements', () => {
      paragraph = new Paragraph(elsToTest, cssClassToTest);

      expect(paragraph.els).withContext('els should be set').toBe(elsToTest);
    });
    it('should set cssClass', () => {
      paragraph = new Paragraph(elsToTest, cssClassToTest);

      expect(paragraph.cssClass)
        .withContext('cssClass should be set')
        .toBe(cssClassToTest);
    });
    it('should set cssClass to empty string by default', () => {
      paragraph = new Paragraph(elsToTest);

      expect(paragraph.cssClass)
        .withContext('cssClass should be set to an empty string by default')
        .toBe('');
    });
  });
});
