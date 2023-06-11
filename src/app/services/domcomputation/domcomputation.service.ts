import { ElementRef, Injectable } from '@angular/core';

/** DOM Computation service. */
@Injectable({
  providedIn: 'root',
})
export class DOMComputationService {
  /**
   * Gets the actual width of an element
   *
   * @param {ElementRef} element The element
   * @returns The actual width
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActualWidth(element: ElementRef) {
    // https://stackoverflow.com/a/32637350
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://stackoverflow.com/a/63622682
    // https://stackoverflow.com/a/29881817
    const rec = element.nativeElement.getBoundingClientRect();
    let width = rec.width;
    const cs = getComputedStyle(element.nativeElement);
    const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const borderX =
      parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    width -= paddingX + borderX;
    return width;
  }

  /**
   * Gets the actual height of an element
   *
   * @param {ElementRef} element The element
   * @returns The actual height
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActualHeight(element: ElementRef) {
    // https://stackoverflow.com/a/32637350
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://stackoverflow.com/a/63622682
    // https://stackoverflow.com/a/29881817
    const rec = element.nativeElement.getBoundingClientRect();
    let height = rec.height;
    const cs = getComputedStyle(element.nativeElement);
    const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const borderY =
      parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    height -= paddingY + borderY;
    return height;
  }
}
