import { Component, Input } from '@angular/core';
import { Paragraph } from '../../classes/paragraph/paragraph';
import { TextSubParagraphComponent } from '../text-sub-paragraph/text-sub-paragraph.component';
import { CommonModule } from '@angular/common';

/** Component used to display a {@link Paragraph} entity. */
@Component({
  selector: 'app-text-paragraph',
  templateUrl: './text-paragraph.component.html',
  styleUrls: ['./text-paragraph.component.css'],
  standalone: true,
  imports: [CommonModule, TextSubParagraphComponent],
})
export class TextParagraphComponent {
  /** The {@link Paragraph} entity to display. */
  @Input() paragraph: Paragraph = new Paragraph([]);
}
