import { Injectable } from '@angular/core';
import { Paragraph } from 'src/app/components/classes/Paragraph';
import { SubParagraph } from 'src/app/components/classes/SubParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';

/**
 * Paragraph decoder service, used to convert a string to an array of
 * {@link Paragraph}.
 *
 * In the text, use `[[]]` to create new paragraph, use `[[br]]` to create a
 * `<br>` element, use `[[a_asset, link/to/asset.jpg]]` to create an `<a>` with
 * href to assets/link/to/asset.jpg (see {@link TextSubParagraphComponent}), use
 * `[[, some text]]` to create `<strong><em>some text</em></strong>`
 *
 * Do note that those elements are designed with the existence of code injection
 * in mind and/or malicious content in mind. For instance, `<a\>` links are
 * designed to be always prefixed by the asset folder path and hence avoid any
 * kind of attacks and injection of link to another domain (or even the same
 * domain but with an unexpected path).
 */
@Injectable({
  providedIn: 'root',
})
export class ParagraphDecoderService {
  /**
   * Creates a `<span></span>` {@link SubParagraph}
   *
   * @param input The text
   * @returns The {@link SubParagraph}
   */
  private decodeSubParagraphSpan(input: string): SubParagraph {
    return new SubParagraph(SubParagraphRoot.SPAN, input);
  }

  /**
   * Creates a `<br>` {@link SubParagraph}
   *
   * @returns The {@link SubParagraph}
   */
  private decodeSubParagraphBr(): SubParagraph {
    return new SubParagraph(SubParagraphRoot.BR, '');
  }

  /**
   * Creates a `<a></a>` {@link SubParagraph}
   *
   * @param input The text
   * @returns The {@link SubParagraph}
   */
  private decodeSubParagraphAasset(input: string): SubParagraph {
    const split = input.split(',');
    split.splice(0, 1);
    return new SubParagraph(SubParagraphRoot.A_ASSET, split.join(','));
  }

  /**
   * Creates a `<strong><em></em></strong>` {@link SubParagraph}
   *
   * @param input The text
   * @returns The {@link SubParagraph}
   */
  private decodeSubParagraphStrongEm(input: string): SubParagraph {
    const split = input.split(',');
    split.splice(0, 1);
    return new SubParagraph(SubParagraphRoot.STRONG_EM, split.join(','));
  }

  /**
   * Decodes a {@link SubParagraph}. Since it is based on a split of `[[X,Y]]`,
   * even positions always are `<span></span>` {@link SubParagraph}. Odd position
   * nature depends on the value of `X`
   *
   * @param position The {@link SubParagraph} position in the split
   * @param input The text
   * @returns The {@link SubParagraph}
   */
  private decodeSubParagraph(position: number, input: string): SubParagraph {
    if (position % 2 == 0) {
      return this.decodeSubParagraphSpan(input);
    }
    const ref = input.split(',')[0];
    if (ref == 'br') {
      return this.decodeSubParagraphBr();
    }
    if (ref == 'a_asset') {
      return this.decodeSubParagraphAasset(input);
    }
    return this.decodeSubParagraphStrongEm(input);
  }

  /**
   * Dcodes a {@link Paragraph}. It is based on a split of `[[]]`. It is composed
   * of {@link SubParagraph} defined by `[[X,Y]]`.
   *
   * @param input The string
   * @returns The {@link Paragraph}
   */
  private decodeParagraph(input: string): Paragraph {
    const split = input.split(/\[\[|\]\]/);
    const p = new Paragraph([]);
    for (let i = 0; i < split.length; i++) {
      if (split[i]) p.els.push(this.decodeSubParagraph(i, split[i]));
    }
    return p;
  }

  /**
   * Decodes a set string into an array of paragraphs.
   *
   * @param input The string
   * @returns The array of {@link Paragraph}
   */
  decode(input: string): Paragraph[] {
    const res = [];
    const paragraphs = input.split(/\[\[\]\]/);
    for (const paragraph of paragraphs) {
      res.push(this.decodeParagraph(paragraph));
    }
    return res;
  }
}
