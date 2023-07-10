import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { SubParagraph } from './subParagraph';

describe('Paragraph', () => {
  describe('constructor', () => {
    const rootToTest = SubParagraphRoot.STRONG_EM;
    const contentToTest = 'this is a test';
    const assetHrefToTest = 'this/is/a/test';
    let subParagraph: SubParagraph;
    it('should set root', () => {
      subParagraph = new SubParagraph(
        rootToTest,
        contentToTest,
        assetHrefToTest
      );

      expect(subParagraph.root).toBe(rootToTest);
    });
    it('should set content', () => {
      subParagraph = new SubParagraph(
        rootToTest,
        contentToTest,
        assetHrefToTest
      );

      expect(subParagraph.content).toBe(contentToTest);
    });
    it('should set assetHref', () => {
      subParagraph = new SubParagraph(
        rootToTest,
        contentToTest,
        assetHrefToTest
      );

      expect(subParagraph.assetHref).toBe(assetHrefToTest);
    });
    it('should set assetHref to empty string by default', () => {
      subParagraph = new SubParagraph(rootToTest, contentToTest);

      expect(subParagraph.assetHref).toBe('');
    });
  });
});
