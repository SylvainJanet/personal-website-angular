import { Component, Input } from '@angular/core';

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
  /**
   * Gets the actual width of an element
   * @param {*} element the element
   * @returns the actual width
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActualWidth(element: any) {
    // https://stackoverflow.com/a/32637350
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://stackoverflow.com/a/63622682
    // https://stackoverflow.com/a/29881817
    const rec = element.getBoundingClientRect();
    let width = rec.width;
    const cs = getComputedStyle(element);
    const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const borderX =
      parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    width -= paddingX + borderX;
    return width;
  }

  lineAppears(event: Event) {
    const width = this.getActualWidth(event.target);
    this.lineWidth = (75 * width) / 100 + 'px';
  }

  lineDisappears() {
    this.lineWidth = '0%';
  }
}
