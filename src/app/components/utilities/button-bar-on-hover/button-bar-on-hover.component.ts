import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';

/**
 * Component displaying a button with a bar that will be animated to appear on
 * hover (or mobile equivalent) and to disapear once the over stops (or mobile
 * equivalent).
 */
@Component({
  selector: 'app-button-bar-on-hover',
  templateUrl: './button-bar-on-hover.component.html',
  styleUrls: ['./button-bar-on-hover.component.css'],
})
export class ButtonBarOnHoverComponent {
  /**
   * Line width. Initialy 0, will be set to 75% when the button is hovered and
   * set back to 0 once it's not the case anymore.
   */
  lineWidth = '0%';
  /** Text color of the button content */
  @Input() textColor = 'white';
  /** Line color. */
  @Input() lineColor = 'white';
  /** Text to be displayed in the button, as an `Observable<string>` */
  @Input() text: Observable<string> = of('Action');
  /** Input can be provided to apply more style to the button */
  @Input() buttonStyle = '';
  /** Input can be provided to apply more style to the line */
  @Input() lineStyle = '';
  /** Input can be given to apply more style to the entire component */
  @Input() globalStyle = '';
  /** When the button is cliqued, the event press is emited. */
  @Output() press = new EventEmitter<Event>();
  /** Logger. See {@link LogService} */
  logger: LogService;

  /**
   * Button with bar on hover component constructor
   *
   * @param logService The {@link LogService}
   * @param domcomputation The {@link DOMComputationService}
   */
  constructor(
    logService: LogService,
    private domcomputation: DOMComputationService
  ) {
    this.logger = logService.withClassName('ButtonBarOnHoverComponent');
    this.lineDisappears();
  }

  /**
   * Make line appear. Is binded to the proper hover event (or mobile
   * equivalent)
   */
  lineAppears(event: Event) {
    this.logger.debug('Line appears');
    const width = this.domcomputation.getActualWidth(event.target);
    this.lineWidth = (75 * width) / 100 + 'px';
  }

  /**
   * Make line appear. Is binded to the proper hover event (or mobile
   * equivalent)
   */
  lineDisappears() {
    this.logger.debug('Line disappears');
    this.lineWidth = '0%';
  }

  /**
   * Emits the press envent when the button is pressed
   *
   * @param event The button press event
   */
  doAction(event: Event) {
    this.logger.debug('Do action');
    this.press.emit(event);
  }
}
