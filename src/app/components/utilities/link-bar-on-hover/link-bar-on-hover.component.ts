import { Component, Input } from '@angular/core';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';

@Component({
  selector: 'app-link-bar-on-hover',
  templateUrl: './link-bar-on-hover.component.html',
  styleUrls: ['./link-bar-on-hover.component.css'],
})
export class LinkBarOnHoverComponent {
  lineWidth = '0%';
  @Input() textColor = 'white';
  @Input() lineColor = 'white';
  @Input() link = 'https://sylvainjanet.fr';
  @Input() text = 'Sylvain Janet';
  @Input() aStyle = '';
  @Input() lineStyle = '';
  @Input() globalStyle = '';
  domcomputation: DOMComputationService;
  constructor(domcomputation: DOMComputationService) {
    this.domcomputation = domcomputation;
    this.lineDisappears();
  }

  lineAppears(event: Event) {
    const width = this.domcomputation.getActualWidth(event.target);
    this.lineWidth = (75 * width) / 100 + 'px';
  }

  lineDisappears() {
    this.lineWidth = '0%';
  }
}
