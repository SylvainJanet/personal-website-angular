import { Component, Input } from '@angular/core';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
  selector: 'app-button-bar-on-hover',
  templateUrl: './button-bar-on-hover.component.html',
  styleUrls: ['./button-bar-on-hover.component.css'],
})
export class ButtonBarOnHoverComponent {
  lineWidth = '0%';
  @Input() textColor = 'white';
  @Input() lineColor = 'white';
  @Input() text = 'Action';
  @Input() buttonStyle = '';
  @Input() lineStyle = '';
  @Input() globalStyle = '';
  @Input() action: (args: Event) => void;

  logger: LogService;
  domcomputation: DOMComputationService;

  constructor(logService: LogService, domcomputation: DOMComputationService) {
    this.logger = logService.withClassName('ButtonBarOnHoverComponent');
    this.action = () => {
      this.logger.debug('No action binded');
    };
    this.domcomputation = domcomputation;
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

  doAction(event: Event) {
    this.logger.log('Do action');
    // this.lineDisappears();
    this.action(event);
  }
}
