import { Component, Input } from '@angular/core';
import { Paragraph } from '../../classes/Paragraph';

@Component({
  selector: 'app-text-paragraph-set',
  templateUrl: './text-paragraph-set.component.html',
  styleUrls: [],
})
export class TextParagraphSetComponent {
  @Input() paragraphs: Paragraph[] = [];
}
