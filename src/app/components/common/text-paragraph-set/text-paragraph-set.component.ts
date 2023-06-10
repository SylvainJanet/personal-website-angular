import { Component, Input } from '@angular/core';
import { Paragraph } from '../../classes/Paragraph';

/** Component used to display an array of {@link Paragraph} entities. */
@Component({
  selector: 'app-text-paragraph-set',
  templateUrl: './text-paragraph-set.component.html',
  styleUrls: [],
})
export class TextParagraphSetComponent {
  /** The array of {@link Paragraph} entities to display. */
  @Input() paragraphs: Paragraph[] = [];
}
