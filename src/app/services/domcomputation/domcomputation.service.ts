import { ElementRef, Injectable } from '@angular/core';

/** DOM Computation service. */
@Injectable({
  providedIn: 'root',
})
export class DOMComputationService {
  /**
   * Gets the actual width of an element
   *
   * @param {any} element The element
   * @returns The actual width
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

  /**
   * Gets the actual height of an element
   *
   * @param {any} element The element
   * @returns The actual height
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActualHeight(element: any) {
    // https://stackoverflow.com/a/32637350
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://stackoverflow.com/a/63622682
    // https://stackoverflow.com/a/29881817
    const rec = element.getBoundingClientRect();
    let height = rec.height;
    const cs = getComputedStyle(element);
    const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const borderY =
      parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    height -= paddingY + borderY;
    return height;
  }

  /**
   * Checks whether or not an element is into view, with an optional buffer for
   * the viewport.
   *
   * @param element The element.
   * @param bufferFactorHeight Buffer factor for the height. For instance, a
   *   buffer factor of 0 means no buffer, a buffer factor of 1 means that the
   *   viewport height is extended (both up and down) by another viewport
   *   height.
   * @param bufferFactorWidth Buffer factor for the width. For instance, a
   *   buffer factor of 0 means no buffer, a buffer factor of 1 means that the
   *   viewport width is extended (both left and right) by another viewport
   *   width.
   * @returns
   */
  isIntoView(
    element: ElementRef<HTMLElement>,
    bufferFactorHeight = 0,
    bufferFactorWidth = 0
  ) {
    if (!element || !element.nativeElement) {
      return false;
    }

    const rect = element.nativeElement.getBoundingClientRect();

    const topShown =
      rect.top >= -bufferFactorHeight * window.innerHeight &&
      rect.top <= (bufferFactorHeight + 1) * window.innerHeight;
    const bottomShown =
      rect.bottom >= -bufferFactorHeight * window.innerHeight &&
      rect.bottom <= (bufferFactorHeight + 1) * window.innerHeight;

    const leftShown =
      rect.left >= -bufferFactorWidth * window.innerWidth &&
      rect.left <= (bufferFactorWidth + 1) * window.innerWidth;
    const rightShown =
      rect.right >= -bufferFactorWidth * window.innerWidth &&
      rect.right <= (bufferFactorWidth + 1) * window.innerWidth;

    return (topShown || bottomShown) && (leftShown || rightShown);
  }
}
