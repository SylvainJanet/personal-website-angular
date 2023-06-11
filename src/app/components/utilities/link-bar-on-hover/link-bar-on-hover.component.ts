import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DOMComputationService } from 'src/app/services/domcomputation/domcomputation.service';
import { LogService } from 'src/app/services/log/log.service';

/**
 * Component displaying a link with a bar that will be animated to appear on
 * hover (or mobile equivalent) and to disapear once the over stops (or mobile
 * equivalent).
 */
@Component({
  selector: 'app-link-bar-on-hover',
  templateUrl: './link-bar-on-hover.component.html',
  styleUrls: ['./link-bar-on-hover.component.css'],
})
export class LinkBarOnHoverComponent {
  /**
   * Line width. Initialy 0, will be set to 75% when the link is hovered and set
   * back to 0 once it's not the case anymore.
   */
  lineWidth = '0%';
  /** Text color of the button link */
  @Input() textColor = 'white';
  /** Line color. */
  @Input() lineColor = 'white';
  /** Text to be displayed in the link. */
  @Input() link = 'https://sylvainjanet.fr';
  /** Text to be displayed in the link, as an `Observable<string>` */
  @Input() text: Observable<string> = of('Sylvain Janet');
  /** Input can be provided to apply more style to the link */
  @Input() aStyle = '';
  /** Input can be provided to apply more style to the line */
  @Input() lineStyle = '';
  /** Input can be given to apply more style to the entire component */
  @Input() globalStyle = '';
  /** Logger. See {@link LogService} */
  logger: LogService;

  /**
   * Button with bar on hover component constructor
   *
   * @param logService The {@link LogService}
   * @param domcomputation The {@link DOMComputationService}
   */
  constructor(
    private domcomputation: DOMComputationService,
    logService: LogService
  ) {
    this.logger = logService.withClassName('LinkBarOnHoverComponent');
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
}
