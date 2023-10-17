import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EMPTY, Observable, fromEvent, map, share } from 'rxjs';

/**
 * Service responsible for providing an observable emitting the scroll value
 * each time the scroll event fires.
 */
@Injectable({
  providedIn: 'root',
})
export class WindowScrollService {
  /** Observable emitting the scroll value each time the scroll event fires. */
  scroll: Observable<number>;

  /**
   * Window scroll service constructor
   *
   * @param document The document
   * @param platformId The platform ID
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.scroll = fromEvent(window, 'scroll').pipe(
        map(() => {
          return window.scrollY || this.document.documentElement.scrollTop;
        }),
        share()
      );
    } else {
      //in non-browser environments, provide an empty observable so you can safely subscribe to scroll$
      this.scroll = EMPTY;
    }
  }
}
