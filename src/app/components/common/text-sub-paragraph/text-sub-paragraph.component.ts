import { Component, Input } from '@angular/core';
import { SubParagraph } from '../../classes/SubParagraph';
import { SubParagraphRoot } from 'src/app/enums/subParagraphRoot';

@Component({
  selector: 'app-text-sub-paragraph',
  templateUrl: './text-sub-paragraph.component.html',
  styleUrls: ['./text-sub-paragraph.component.css'],
})
export class TextSubParagraphComponent {
  @Input() subPar: SubParagraph = new SubParagraph(SubParagraphRoot.BR, '');
  SubParagraphRoot = SubParagraphRoot;
}
