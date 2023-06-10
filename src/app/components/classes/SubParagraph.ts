import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';

/**
 * SubParagraph class.
 *
 * Used to dynamically create different elements to be nested inside a paragraph
 * with an html root `<p>` `</p>`. Those elements can be `<strong><em>`
 * `</em></strong>` elements, `<br>` elements, `<a/>` elements, or any
 * {@link SubParagraphRoot}.
 *
 * Do note that those elements are designed with the existence of code injection
 * in mind and/or malicious content in mind. For instance, `<a\>` links are
 * designed to be always prefixed by the asset folder path and hence avoid any
 * kind of attacks and injection of link to another domain (or even the same
 * domain but with an unexpected path).
 */
export class SubParagraph {
  /**
   * The root element of the subparagraph. Can be any defined in
   * {@link SubParagraphRoot}.
   */
  root: SubParagraphRoot;
  /** Text content of the subparagraph. */
  content: string;
  /**
   * Only useful when using {@link SubParagraphRoot} representing a link, and
   * this represent the href to the asset the node should link to. Do note that
   * it is necessarily a link to an asset and will, in fine, be prefixed by the
   * asset folder. This prevents any unwanted link to another domain, or to an
   * unwanted route.
   */
  assetHref: string;

  /**
   * SubPparagraph constructor.
   *
   * @param root The root element of the subparagraph. Can be any defined in
   *   {@link SubParagraphRoot}.
   * @param content Text content of the subparagraph.
   * @param assetHref Only useful when using {@link SubParagraphRoot}
   *   representing a link, and this represent the href to the asset the node
   *   should link to.
   */
  constructor(root: SubParagraphRoot, content: string, assetHref = '') {
    this.root = root;
    this.content = content;
    this.assetHref = assetHref;
  }
}
