import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';

export class SubParagraph {
  root: SubParagraphRoot;
  content: string;
  assetHref: string;

  constructor(root: SubParagraphRoot, content: string, assetHref = '') {
    this.root = root;
    this.content = content;
    this.assetHref = assetHref;
  }
}
