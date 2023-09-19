import { Component, Input } from '@angular/core';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { TextParagraphComponent } from '../text-paragraph/text-paragraph.component';
import { CommonModule } from '@angular/common';

/** Component used to display an array of {@link Paragraph} entities. */
@Component({
  selector: 'app-text-paragraph-set',
  templateUrl: './text-paragraph-set.component.html',
  styleUrls: [],
  standalone: true,
  imports: [CommonModule, TextParagraphComponent],
})
export class TextParagraphSetComponent {
  /** The array of {@link Paragraph} entities to display. */
  @Input() paragraphs: Paragraph[] = [];
}
