import { Component, Input } from '@angular/core';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';

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
  logger: LogService;

  constructor(domcomputation: DOMComputationService, logService: LogService) {
    this.domcomputation = domcomputation;
    this.logger = logService.withClassName('LinkBarOnHoverComponent');
    this.lineDisappears();
  }

  lineAppears(event: Event) {
    this.logger.log('Line appears');
    const width = this.domcomputation.getActualWidth(event.target);
    this.lineWidth = (75 * width) / 100 + 'px';
  }

  lineDisappears() {
    this.logger.log('Line disappears');
    this.lineWidth = '0%';
  }
}
