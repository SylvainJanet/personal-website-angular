import { Component, Input } from '@angular/core';
import { Paragraph } from '../../classes/Paragraph';

@Component({
  selector: 'app-text-paragraph',
  templateUrl: './text-paragraph.component.html',
  styleUrls: ['./text-paragraph.component.css'],
})
export class TextParagraphComponent {
  @Input() paragraph: Paragraph = new Paragraph([]);
}
