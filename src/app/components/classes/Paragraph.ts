import { SubParagraph } from './SubParagraph';

/**
 * Paragraph class.
 *
 * Used to dynamically create `<p>` `</p>` elements with different structures
 * inside, such as `<strong><em>` `</em></strong>` elements, `<br>` elements,
 * `<a/>` elements, or any {@link SubParagraphRoot}.
 *
 * Do note that those elements are designed with the existence of code injection
 * in mind and/or malicious content in mind. For instance, `<a\>` links are
 * designed to be always prefixed by the asset folder path and hence avoid any
 * kind of attacks and injection of link to another domain (or even the same
 * domain but with an unexpected path).
 */
export class Paragraph {
  /**
   * Subparagraph elements. Represents the different elements contained inside
   * the paragraph. Will most likely be a series of `<span>` `</span>` with some
   * other elements in between. See {@link SubParagraph} and
   * {@link SubParagraphRoot} to see the elements suported.
   */
  els: SubParagraph[];
  /**
   * Used to apply style to a paragraph element by specifying which css class it
   * has to have.
   */
  cssClass: string;

  /**
   * Paragraph constructor.
   *
   * @param els {@link Subparagraph} elements. Represents the different elements
   *   contained inside the paragraph.
   * @param cssClass Used to apply style to a paragraph element by specifying
   *   which css class it has to have.
   */
  constructor(els: SubParagraph[], cssClass = '') {
    this.els = els;
    this.cssClass = cssClass;
  }
}
