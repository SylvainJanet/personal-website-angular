import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { ParagraphDecoderService } from './paragraph-decoder.service';
import { SubParagraph } from 'src/app/components/classes/subparagraph/subParagraph';
import { Paragraph } from 'src/app/components/classes/paragraph/paragraph';

let paragraphDecoderService: ParagraphDecoderService;

describe('ParagraphDecoderService', () => {
  beforeEach(() => {
    paragraphDecoderService = new ParagraphDecoderService();
  });
  describe('decodeSubParagraphSpan method', () => {
    it('should decode a span subparagraph', () => {
      const textInput = 'this is a test';
      const expected = new SubParagraph(SubParagraphRoot.SPAN, textInput);

      const actual =
        paragraphDecoderService['decodeSubParagraphSpan'](textInput);

      expect(actual)
        .withContext('span subparagraph should be decoded')
        .toEqual(expected);
    });
  });
  describe('decodeSubParagraphBr method', () => {
    it('should decode a br subparagraph', () => {
      const expected = new SubParagraph(SubParagraphRoot.BR, '');

      const actual = paragraphDecoderService['decodeSubParagraphBr']();

      expect(actual)
        .withContext('br subparagraph should be decoded')
        .toEqual(expected);
    });
  });
  describe('decodeSubParagraphAasset method', () => {
    it('should decode a link for assets subparagraph', () => {
      const linkToAsset = 'link to asset text, some other text';
      const textInput = 'a_asset,' + linkToAsset;
      const expected = new SubParagraph(SubParagraphRoot.A_ASSET, linkToAsset);

      const actual =
        paragraphDecoderService['decodeSubParagraphAasset'](textInput);

      expect(actual)
        .withContext('link for assets subparagraph should be decoded')
        .toEqual(expected);
    });
  });
  describe('decodeSubParagraphStrongEm method', () => {
    it('should decode a strong em subparagraph', () => {
      const content = 'this is a test, some other text';
      const textInput = ',' + content;
      const expected = new SubParagraph(SubParagraphRoot.STRONG_EM, content);

      const actual =
        paragraphDecoderService['decodeSubParagraphStrongEm'](textInput);

      expect(actual)
        .withContext('strong em subparagraph should be decoded')
        .toEqual(expected);
    });
  });

  describe('decodeSubParagraph method', () => {
    it('should decode a span subparagraph, at even positions', () => {
      const textInput = 'this is a test';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(paragraphDecoderService, 'decodeSubParagraphSpan');

      paragraphDecoderService['decodeSubParagraph'](0, textInput);

      expect(paragraphDecoderService['decodeSubParagraphSpan'])
        .withContext(
          'decodeSubParagraphSpan should have been called once with proper arguments'
        )
        .toHaveBeenCalledOnceWith(textInput);

      paragraphDecoderService['decodeSubParagraph'](4, textInput);

      expect(paragraphDecoderService['decodeSubParagraphSpan'])
        .withContext('decodeSubParagraphSpan should have been called twice')
        .toHaveBeenCalledTimes(2);
    });
    it('should decode a br subparagraph, at odd positions', () => {
      const input = 'br';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(paragraphDecoderService, 'decodeSubParagraphBr');

      paragraphDecoderService['decodeSubParagraph'](1, input);

      expect(paragraphDecoderService['decodeSubParagraphBr'])
        .withContext('decodeSubParagraphBr should have been called once')
        .toHaveBeenCalledOnceWith();

      paragraphDecoderService['decodeSubParagraph'](5, input);

      expect(paragraphDecoderService['decodeSubParagraphBr'])
        .withContext('decodeSubParagraphBr should have been called twice')
        .toHaveBeenCalledTimes(2);
    });
    it('should decode an a link for assets subparagraph, at odd positions', () => {
      const linkToAsset = 'link to asset text, some other text';
      const textInput = 'a_asset,' + linkToAsset;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(paragraphDecoderService, 'decodeSubParagraphAasset');

      paragraphDecoderService['decodeSubParagraph'](1, textInput);

      expect(paragraphDecoderService['decodeSubParagraphAasset'])
        .withContext(
          'decodeSubParagraphAasset should have been called once with the proper arguments'
        )
        .toHaveBeenCalledOnceWith(textInput);

      paragraphDecoderService['decodeSubParagraph'](5, textInput);

      expect(paragraphDecoderService['decodeSubParagraphAasset'])
        .withContext('decodeSubParagraphAasset should have been called twice')
        .toHaveBeenCalledTimes(2);
    });
    it('should decode a strong em subparagraph, at odd positions', () => {
      const content = 'this is a test, some other text';
      const textInput = ',' + content;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(paragraphDecoderService, 'decodeSubParagraphStrongEm');

      paragraphDecoderService['decodeSubParagraph'](1, textInput);

      expect(paragraphDecoderService['decodeSubParagraphStrongEm'])
        .withContext(
          'decodeSubParagraphStrongEm should have been called once with the proper arguments'
        )
        .toHaveBeenCalledOnceWith(textInput);

      paragraphDecoderService['decodeSubParagraph'](5, textInput);

      expect(paragraphDecoderService['decodeSubParagraphStrongEm'])
        .withContext('decodeSubParagraphStrongEm should have been called twice')
        .toHaveBeenCalledTimes(2);
    });
  });
  describe('decodeParagraph method', () => {
    it('should use the private methode decodeSubParagraph', () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(
        paragraphDecoderService,
        'decodeSubParagraph'
      ).and.returnValues(
        expectedSubPar1,
        expectedSubPar2,
        expectedSubPar3,
        expectedSubPar4,
        expectedSubPar5,
        expectedSubPar6,
        expectedSubPar7
      );
      const actual = paragraphDecoderService['decodeParagraph'](input);

      expect(paragraphDecoderService['decodeSubParagraph'])
        .withContext(
          'decodeSubParagraph should have been called the correct amount of times'
        )
        .toHaveBeenCalledTimes(7);

      expect(paragraphDecoderService['decodeSubParagraph'])
        .withContext(
          'decodeSubParagraph should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(0, spanContent1);

      expect(paragraphDecoderService['decodeSubParagraph'])
        .withContext(
          'decodeSubParagraph should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(1, br);

      expect(paragraphDecoderService['decodeSubParagraph'])
        .withContext(
          'decodeSubParagraph should have been called with the proper arguments - 3'
        )
        .toHaveBeenCalledWith(2, spanContent2);

      expect(paragraphDecoderService['decodeSubParagraph'])
        .withContext(
          'decodeSubParagraph should have been called with the proper arguments - 4'
        )
        .toHaveBeenCalledWith(3, a);

      expect(paragraphDecoderService['decodeSubParagraph'])
        .withContext(
          'decodeSubParagraph should have been called with the proper arguments - 5'
        )
        .toHaveBeenCalledWith(4, spanContent3);

      expect(paragraphDecoderService['decodeSubParagraph'])
        .withContext(
          'decodeSubParagraph should have been called with the proper arguments - 6'
        )
        .toHaveBeenCalledWith(5, strongEm);

      expect(paragraphDecoderService['decodeSubParagraph'])
        .withContext(
          'decodeSubParagraph should have been called with the proper arguments - 7'
        )
        .toHaveBeenCalledWith(6, spanContent4);

      expect(actual.els)
        .withContext('subparagraphs should be decoded')
        .toEqual([
          expectedSubPar1,
          expectedSubPar2,
          expectedSubPar3,
          expectedSubPar4,
          expectedSubPar5,
          expectedSubPar6,
          expectedSubPar7,
        ]);
    });
  });
  describe('decode method', () => {
    it('should use the private methode decodeParagraph', () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spyOn<any>(paragraphDecoderService, 'decodeParagraph').and.returnValues(
        expectedPar1,
        expectedPar2
      );

      const actual = paragraphDecoderService.decode(input);

      expect(paragraphDecoderService['decodeParagraph'])
        .withContext(
          'decodeParagraph should have been called the correct amount of times'
        )
        .toHaveBeenCalledTimes(2);

      expect(paragraphDecoderService['decodeParagraph'])
        .withContext(
          'decodeParagraph should have been called with the proper arguments - 1'
        )
        .toHaveBeenCalledWith(par1);

      expect(paragraphDecoderService['decodeParagraph'])
        .withContext(
          'decodeParagraph should have been called with the proper arguments - 2'
        )
        .toHaveBeenCalledWith(par2);

      expect(actual)
        .withContext('paragraphs should be decoded')
        .toEqual([expectedPar1, expectedPar2]);
    });
  });
});
