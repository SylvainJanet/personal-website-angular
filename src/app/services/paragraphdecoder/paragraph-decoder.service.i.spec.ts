import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { ParagraphDecoderService } from './paragraph-decoder.service';
import { SubParagraph } from 'src/app/components/classes/subparagraph/subParagraph';
import { Paragraph } from 'src/app/components/classes/paragraph/paragraph';

let service: ParagraphDecoderService;
describe('ParagraphDecoderService - integration', () => {
  beforeEach(() => {
    service = new ParagraphDecoderService();
  });
  describe('decodeSubParagraph method', () => {
    it('should decode a span subparagraph, at even positions', () => {
      const textInput = 'this is a test';
      const expected = new SubParagraph(SubParagraphRoot.SPAN, textInput);

      const actual = service['decodeSubParagraph'](0, textInput);

      expect(actual)
        .withContext('should decode a span subparagraph - position 0')
        .toEqual(expected);

      const otherActual = service['decodeSubParagraph'](4, textInput);

      expect(otherActual)
        .withContext('should decode a span subparagraph - position 4')
        .toEqual(expected);
    });
    it('should decode a br subparagraph, at odd positions', () => {
      const input = 'br';
      const expected = new SubParagraph(SubParagraphRoot.BR, '');

      const actual = service['decodeSubParagraph'](1, input);

      expect(actual)
        .withContext('should decode a br subparagraph - position 1')
        .toEqual(expected);

      const otherActual = service['decodeSubParagraph'](5, input);

      expect(otherActual)
        .withContext('should decode a br subparagraph - position 5')
        .toEqual(expected);
    });
    it('should decode an a link for assets subparagraph, at odd positions', () => {
      const linkToAsset = 'link to asset text, some other text';
      const textInput = 'a_asset,' + linkToAsset;
      const expected = new SubParagraph(SubParagraphRoot.A_ASSET, linkToAsset);

      const actual = service['decodeSubParagraph'](1, textInput);

      expect(actual)
        .withContext('should decode a link to asset subparagraph - position 1')
        .toEqual(expected);

      const otherActual = service['decodeSubParagraph'](5, textInput);

      expect(otherActual)
        .withContext('should decode a link to asset subparagraph - position 5')
        .toEqual(expected);
    });
    it('should decode a strong em subparagraph, at odd positions', () => {
      const content = 'this is a test, some other text';
      const textInput = ',' + content;
      const expected = new SubParagraph(SubParagraphRoot.STRONG_EM, content);

      const actual = service['decodeSubParagraph'](1, textInput);

      expect(actual)
        .withContext('should decode a strong em subparagraph - position 1')
        .toEqual(expected);

      const otherActual = service['decodeSubParagraph'](5, textInput);

      expect(otherActual)
        .withContext('should decode a strong em subparagraph - position 5')
        .toEqual(expected);
    });
  });

  describe('decodeParagraph method', () => {
    it('should return the decoded paragraph', () => {
      const spanContent1 = 'This is a test';
      const spanContent2 = 'this should be decoded';
      const spanContent3 = 'and this should be';
      const spanContent4 = 'and this should be the end';
      const br = 'br';
      const aText = 'text of link, right here';
      const a = `a_asset,${aText}`;
      const strongEmText = 'in bold, in strong and em subparagraph';
      const strongEm = `,${strongEmText}`;
      const input =
        spanContent1 +
        `[[${br}]]` +
        spanContent2 +
        `[[${a}]]` +
        spanContent3 +
        `[[${strongEm}]]` +
        spanContent4;

      const expectedSubPar1 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent1
      );

      const expectedSubPar2 = new SubParagraph(SubParagraphRoot.BR, '');

      const expectedSubPar3 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent2
      );

      const expectedSubPar4 = new SubParagraph(SubParagraphRoot.A_ASSET, aText);

      const expectedSubPar5 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent3
      );

      const expectedSubPar6 = new SubParagraph(
        SubParagraphRoot.STRONG_EM,
        strongEmText
      );

      const expectedSubPar7 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent4
      );

      const expectedPar = new Paragraph([
        expectedSubPar1,
        expectedSubPar2,
        expectedSubPar3,
        expectedSubPar4,
        expectedSubPar5,
        expectedSubPar6,
        expectedSubPar7,
      ]);

      const actual = service['decodeParagraph'](input);
      expect(actual)
        .withContext('paragraph should be decoded')
        .toEqual(expectedPar);
    });
  });

  describe('decode method', () => {
    it('should return the decoded paragraphs', () => {
      const spanContent1 = 'This is a test';
      const spanContent2 = 'this should be decoded';
      const spanContent3 = 'and this should be';
      const spanContent4 = 'and this should be the end';
      const br = 'br';
      const aText = 'text of link, right here';
      const a = `a_asset,${aText}`;
      const strongEmText = 'in bold, in strong and em subparagraph';
      const strongEm = `,${strongEmText}`;
      const spanContent5 = 'This is a new paragraph';
      const par1 =
        spanContent1 +
        `[[${br}]]` +
        spanContent2 +
        `[[${a}]]` +
        spanContent3 +
        `[[${strongEm}]]` +
        spanContent4;
      const par2 = spanContent5;
      const input = par1 + '[[]]' + par2;

      const expectedSubPar1 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent1
      );

      const expectedSubPar2 = new SubParagraph(SubParagraphRoot.BR, '');

      const expectedSubPar3 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent2
      );

      const expectedSubPar4 = new SubParagraph(SubParagraphRoot.A_ASSET, aText);

      const expectedSubPar5 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent3
      );

      const expectedSubPar6 = new SubParagraph(
        SubParagraphRoot.STRONG_EM,
        strongEmText
      );

      const expectedSubPar7 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent4
      );

      const expectedPar1 = new Paragraph([
        expectedSubPar1,
        expectedSubPar2,
        expectedSubPar3,
        expectedSubPar4,
        expectedSubPar5,
        expectedSubPar6,
        expectedSubPar7,
      ]);

      const expectedSubPar8 = new SubParagraph(
        SubParagraphRoot.SPAN,
        spanContent5
      );

      const expectedPar2 = new Paragraph([expectedSubPar8]);

      const expected = [expectedPar1, expectedPar2];

      const actual = service.decode(input);

      expect(actual)
        .withContext('paragraphs should be decoded')
        .toEqual(expected);
    });
  });
});
