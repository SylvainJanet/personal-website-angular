import { Component, Input } from '@angular/core';
import { SubParagraph } from '../../classes/subparagraph/subParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';
import { CommonModule } from '@angular/common';

/**
 * Component used to display a {@link SubParagraph} entity.
 *
 * Do note that those elements are designed with the existence of code injection
 * in mind and/or malicious content in mind. For instance, `<a\>` links are
 * designed to be always prefixed by the asset folder path and hence avoid any
 * kind of attacks and injection of link to another domain (or even the same
 * domain but with an unexpected path).
 */
@Component({
  selector: 'app-text-sub-paragraph',
  templateUrl: './text-sub-paragraph.component.html',
  styleUrls: ['./text-sub-paragraph.component.css'],
  standalone: true,
  imports: [CommonModule],
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
