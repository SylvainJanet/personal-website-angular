import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { SubParagraph } from './subParagraph';

describe('SubParagraph', () => {
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

      expect(subParagraph.root)
        .withContext('root should be set')
        .toBe(rootToTest);
    });
    it('should set content', () => {
      subParagraph = new SubParagraph(
        rootToTest,
        contentToTest,
        assetHrefToTest
      );

      expect(subParagraph.content)
        .withContext('content should be set')
        .toBe(contentToTest);
    });
    it('should set assetHref', () => {
      subParagraph = new SubParagraph(
        rootToTest,
        contentToTest,
        assetHrefToTest
      );

      expect(subParagraph.assetHref)
        .withContext('assetHref should be set')
        .toBe(assetHrefToTest);
    });
    it('should set assetHref to empty string by default', () => {
      subParagraph = new SubParagraph(rootToTest, contentToTest);

      expect(subParagraph.assetHref)
        .withContext('assetHref should be set to an empty string by default')
        .toBe('');
    });
  });
});
