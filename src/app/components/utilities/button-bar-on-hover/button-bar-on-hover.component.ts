import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  @Input() text: Observable<string> = of('Action');
  @Input() buttonStyle = '';
  @Input() lineStyle = '';
  @Input() globalStyle = '';
  @Output() press = new EventEmitter<Event>();

  logger: LogService;
  domcomputation: DOMComputationService;

  constructor(logService: LogService, domcomputation: DOMComputationService) {
    this.logger = logService.withClassName('ButtonBarOnHoverComponent');
    this.domcomputation = domcomputation;
    this.lineDisappears();
  }

  lineAppears(event: Event) {
    this.logger.debug('Line appears');
    const width = this.domcomputation.getActualWidth(event.target);
    this.lineWidth = (75 * width) / 100 + 'px';
  }

  lineDisappears() {
    this.logger.debug('Line disappears');
    this.lineWidth = '0%';
  }

  doAction(event: Event) {
    this.logger.debug('Do action');
    this.press.emit(event);
  }
}
