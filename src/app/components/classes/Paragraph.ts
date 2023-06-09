import { SubParagraph } from './SubParagraph';

export class Paragraph {
  els: SubParagraph[];
  cssClass: string;
  constructor(els: SubParagraph[], cssClass = '') {
    this.els = els;
    this.cssClass = cssClass;
  }
}
