import { Component, Input } from '@angular/core';
import { Paragraph } from '../../classes/Paragraph';

/** Component used to display a {@link Paragraph} entity. */
@Component({
  selector: 'app-text-paragraph',
  templateUrl: './text-paragraph.component.html',
  styleUrls: ['./text-paragraph.component.css'],
})
export class TextParagraphComponent {
  /** The {@link Paragraph} entity to display. */
  @Input() paragraph: Paragraph = new Paragraph([]);
}
