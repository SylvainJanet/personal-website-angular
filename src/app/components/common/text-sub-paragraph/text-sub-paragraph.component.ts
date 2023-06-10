import { Component, Input } from '@angular/core';
import { SubParagraph } from '../../classes/SubParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';

/** Component used to display a {@link SubParagraph} entity. */
@Component({
  selector: 'app-text-sub-paragraph',
  templateUrl: './text-sub-paragraph.component.html',
  styleUrls: [],
})
export class TextSubParagraphComponent {
  /** The {@link SubParagraph} entity to display. */
  @Input() subPar: SubParagraph = new SubParagraph(SubParagraphRoot.BR, '');
  /**
   * The {@link SubParagraphRoot} enumeration, in a variable so that it can be
   * used in html template.
   */
  SubParagraphRoot = SubParagraphRoot;
}
