import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EMPTY, Observable, fromEvent, map, share } from 'rxjs';

/**
 * Service responsible for providing an observable emitting the window width and
 * height value each time the resize event fires.
 */
@Injectable({
  providedIn: 'root',
})
export class WindowResizeService {
  /**
   * Observable emitting the window width and height value each time the resize
   * event fires.
   */
  resize: Observable<number[]>;

  /**
   * Window resize service constructor
   *
   * @param platformId The platform ID
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.resize = fromEvent(window, 'resize').pipe(
        map(() => {
          const x = window.innerWidth;
          const y = window.innerHeight;
          return [x, y];
        }),
        share()
      );
    } else {
      //in non-browser environments, provide an empty observable so you can safely subscribe to scroll$
      this.resize = EMPTY;
    }
  }
}
