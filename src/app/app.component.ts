import { PreloaderService } from './services/preloader/preloader.service';
import { AfterViewInit, Component } from '@angular/core';
import { Preloaders } from './services/preloader/preloaders/preloaders';

/** Main app component. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  /** Main loader, so that this {@link Preloaders} can be binded to in HTML */
  mainLoader = Preloaders.MAIN;
  /** Text loader, so that this {@link Preloaders} can be binded to in HTML */
  loaderTexts = Preloaders.TEXTS;
  /** Opacity, used to smoothly make the page appear on first load */
  opacity = 0;

  /**
   * Main app component constructor.
   *
   * @param preloader The {@link PreloaderService}
   * @param cd The `ChangeDetectorRef`
   */
  constructor(public preloader: PreloaderService) {
    this.increaseOpacity(0, 10, 10);
  }

  /** Used to set a css variable representing the scroll bar width. */
  ngAfterViewInit() {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth + 'px';
    document.documentElement.style.setProperty(
      '--scroll-bar-width',
      scrollbarWidth
    );
  }

  /**
   * Increases opacity of the page from 0 to 1 in N steps at a certain speed.
   *
   * @param {any} i Current step. Starts at 0
   * @param {any} N Max number of step
   * @param {any} step Duration of a step in millisecond
   */
  increaseOpacity(i: number, N: number, step: number) {
    setTimeout(() => {
      this.opacity = (i + 1) / N;
      if (i < N - 1) {
        this.increaseOpacity(i + 1, N, step);
      }
    }, step);
  }
}
